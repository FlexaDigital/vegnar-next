'use client';

import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { DomesticProduct as Product } from '@/types/product';

import { intToDomImageMap } from '@/utils/product-mapping';

export interface CartItem {
  product: Product;
  quantity: number;
  unit: 'pieces' | 'cartons';
}

interface ProductsContextType {
  wpProducts: any[];
  wpImageMap: Record<string, string>;
  loading: boolean;
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (itemCode: string) => void;
  updateCartQuantity: (itemCode: string, quantity: number) => void;
  updateCartUnit: (itemCode: string, unit: 'pieces' | 'cartons') => void;
  clearCart: () => void;
}

const ProductsContext = createContext<ProductsContextType>({
  wpProducts: [],
  wpImageMap: {},
  loading: true,
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateCartQuantity: () => {},
  updateCartUnit: () => {},
  clearCart: () => {},
});

export const ProductsProvider = ({ children }: { children: React.ReactNode }) => {
  const [wpProducts, setWpProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('vegnar_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart from localStorage', e);
      }
    }
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem('vegnar_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    fetch('https://cms.vegnar.com/wp-json/wp/v2/products?per_page=100&_embed')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setWpProducts(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching WordPress products:', err);
        setLoading(false);
      });
  }, []);

  const wpImageMap = useMemo(() => {
    const map: Record<string, string> = {};
    wpProducts.forEach((p) => {
      if (p.acf && p.acf.item_code) {
        const imageUrl = p._embedded?.['wp:featuredmedia']?.[0]?.source_url;
        if (imageUrl) {
          map[p.acf.item_code] = imageUrl;
        }
      }
    });

    // Map international product codes to domestic counterparts to retrieve their images
    Object.entries(intToDomImageMap).forEach(([intCode, domCode]) => {
      if (map[domCode]) {
        map[intCode] = map[domCode];
      }
    });

    return map;
  }, [wpProducts]);

  const addToCart = React.useCallback((product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.item_code === product.item_code);
      if (existing) {
        return prev.map(item => 
          item.product.item_code === product.item_code 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1, unit: 'cartons' }];
    });
  }, []);

  const removeFromCart = React.useCallback((itemCode: string) => {
    setCart(prev => prev.filter(item => item.product.item_code !== itemCode));
  }, []);

  const updateCartQuantity = React.useCallback((itemCode: string, quantity: number) => {
    setCart(prev => prev.map(item => 
      item.product.item_code === itemCode 
        ? { ...item, quantity: Math.max(1, quantity) }
        : item
    ));
  }, []);

  const updateCartUnit = React.useCallback((itemCode: string, unit: 'pieces' | 'cartons') => {
    setCart(prev => prev.map(item => 
      item.product.item_code === itemCode 
        ? { ...item, unit }
        : item
    ));
  }, []);

  const clearCart = React.useCallback(() => setCart([]), []);

  return (
    <ProductsContext.Provider value={{ 
      wpProducts, 
      wpImageMap, 
      loading, 
      cart, 
      addToCart, 
      removeFromCart, 
      updateCartQuantity, 
      updateCartUnit,
      clearCart
    }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
