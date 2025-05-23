'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

const ProductsContext = createContext([]);

export const ProductsProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://cms.vegnar.com/wp-json/wp/v2/product?per_page=100&_embed')
      .then((res) => res.json())
      .then(setProducts)
      .catch(console.error);
  }, []);

  return (
    <ProductsContext.Provider value={products}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
