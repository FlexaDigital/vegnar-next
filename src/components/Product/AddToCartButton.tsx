'use client';

import React, { useState } from 'react';
import { useProducts } from '@/lib/products-context';
import { DomesticProduct as Product } from '@/types/product';
import Link from 'next/link';
import { ShoppingCart, Check, X } from 'lucide-react';

interface AddToCartButtonProps {
  product: Product;
  className?: string;
}

export default function AddToCartButton({ product, className }: AddToCartButtonProps) {
  const { addToCart, cart } = useProducts();
  const [showPopup, setShowPopup] = useState(false);

  const isInCart = cart.some(item => item.product.item_code === product.item_code);

  const handleClick = () => {
    if (!isInCart) addToCart(product);
    setShowPopup(true);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={className || "inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"}
      >
        <ShoppingCart className="w-5 h-5 mr-2" />
        {isInCart ? 'Added to Quote' : 'Add to Quote'}
      </button>

      {showPopup && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowPopup(false)}>
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-green-700">
                <Check className="w-5 h-5" />
                <span className="font-semibold text-lg">Added to Quote!</span>
              </div>
              <button onClick={() => setShowPopup(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-5">
              <span className="font-medium text-gray-800">{product.product}</span> has been added to your quote cart.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowPopup(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Continue Shopping
              </button>
              <Link
                href="/quote?checkout=1"
                className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium text-center transition-colors"
              >
                Request Quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
