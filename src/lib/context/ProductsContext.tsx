'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface Product {
  name: string;
  description: string;
  image: string;
}

interface ProductsContextType {
  categoryProducts: Record<string, Product[]>;
  loading: boolean;
}

const ProductsContext = createContext<ProductsContextType>({
  categoryProducts: {},
  loading: true
});

const categories = [
  'Bowls',
  'Clamshells', 
  'Meal Trays',
  'Round Plates',
  'Sipper Lid',
  'Takeaway Container',
  'Tray'
];

export const ProductsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [categoryProducts, setCategoryProducts] = useState<Record<string, Product[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const categoriesResponse = await fetch('https://cms.vegnar.com/wp-json/wp/v2/product_category');
        const allCategories = categoriesResponse.ok ? await categoriesResponse.json() : [];
        
        const products: Record<string, Product[]> = {};
        for (const category of categories) {
          const categoryData = allCategories.find((cat: any) => cat.name === category);
          if (categoryData) {
            const response = await fetch(`https://cms.vegnar.com/wp-json/wp/v2/products?product_category=${categoryData.id}&_embed`);
            if (response.ok) {
              const data = await response.json();
              products[category] = data.slice(0, 3).map((product: any) => ({
                name: product.title?.rendered?.replace(/&amp;/g, '&').replace(/&#8211;/g, '–').replace(/&#8217;/g, "'") || 'Untitled',
                description: product.excerpt?.rendered?.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&#8211;/g, '–') || '',
                image: product._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/assets/img/placeholder.jpg'
              }));
            } else {
              products[category] = [];
            }
          } else {
            products[category] = [];
          }
        }
        setCategoryProducts(products);
      } catch (error) {
        console.error('Error fetching category products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ categoryProducts, loading }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);