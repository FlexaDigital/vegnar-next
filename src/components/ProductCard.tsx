'use client';

import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRulerCombined } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import he from 'he';
import PlaceholderImage from './PlaceholderImage';

interface Category {
  id: number;
  name: string;
  slug: string;
  parent: number;
}

interface Product {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  product_category: number[];
  acf?: { product_size?: string };
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url?: string }>;
  };
}

interface ProductCardProps {
  product: Product;
  allCategories: Category[];
  disableViewProduct: boolean;
}

const decodeAndStripHtml = (html: string) => {
  const withoutTags = html.replace(/<[^>]+>/g, '');
  return he.decode(withoutTags);
};

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  allCategories,
  disableViewProduct = false,
}) => {
  const [categoryName, setCategoryName] = useState<string>('Loading...');
  const [imageLoading, setImageLoading] = useState(true);

  const decodedTitle = decodeAndStripHtml(product.title.rendered);
  const decodedDescription = decodeAndStripHtml(product.content.rendered);
  const shortDescription = decodedDescription.length > 100
    ? decodedDescription.substring(0, 100) + "..."
    : decodedDescription;
  const size = product.acf?.product_size || 'Size not specified';
  const image = product._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/images/placeholder-product.jpg';

  // Check if product belongs to paper-cups or bio-bags category
  const isRestrictedCategory = product.product_category.some((catId) => {
    const cat = allCategories.find((c) => c.id === catId);
    const parentCat = cat?.parent ? allCategories.find((c) => c.id === cat.parent) : null;
    return (
      cat?.slug === 'paper-cups' || 
      cat?.slug === 'bio-bags' ||
      parentCat?.slug === 'paper-cups' ||
      parentCat?.slug === 'bio-bags'
    );
  });

  const generateProductUrl = (product: Product): string => {
    if (!product.product_category || !allCategories || allCategories.length === 0) {
      return `/products/uncategorized/${product.slug}`;
    }

    const categoryIds = product.product_category;
    const subCategory = allCategories.find((cat) => categoryIds.includes(cat.id));

    if (!subCategory) return `/products/uncategorized/${product.slug}`;

    const parentCategory = allCategories.find((cat) => cat.id === subCategory.parent);

    if (parentCategory) {
      return `/products/${parentCategory.slug}/${product.slug}`;
    } else {
      return `/products/${subCategory.slug}/${product.slug}`;
    }
  };

  useEffect(() => {
    const fetchCategoryName = async () => {
      if (product.product_category && product.product_category.length > 0) {
        try {
          const categoryId = product.product_category[0];
          const response = await fetch(
            `https://cms.vegnar.com/wp-json/wp/v2/product_category/${categoryId}`
          );
          if (response.ok) {
            const categoryData = await response.json();
            setCategoryName(categoryData.name);
          } else {
            setCategoryName('Category Unavailable');
          }
        } catch (error) {
          setCategoryName('Category Unavailable');
        }
      } else {
        setCategoryName('No Category');
      }
    };

    fetchCategoryName();
  }, [product.product_category]);

  return (
    <div className="relative aspect-square rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-shadow duration-300">
      {/* Image Container */}
      <div className="w-full h-full">
        {imageLoading && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        {!product._embedded?.['wp:featuredmedia']?.[0]?.source_url ? (
          <PlaceholderImage />
        ) : (
          <img
            src={image}
            alt={decodedTitle}
            className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
            onError={(e) => {
              setImageLoading(false);
              e.currentTarget.style.display = 'none';
              const placeholder = document.createElement('div');
              placeholder.className = 'w-full h-full';
              placeholder.innerHTML = '<div class="w-full h-full bg-gray-100 flex items-center justify-center"><div class="text-center p-4"><svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg><p class="text-gray-500 text-sm">No Image Available</p></div></div>';
              e.currentTarget.parentElement?.appendChild(placeholder);
            }}
            onLoad={() => setImageLoading(false)}
          />
        )}
      </div>

      {/* Title - Always Visible */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 text-white">
        <h3 className="text-lg font-semibold">{decodedTitle}</h3>
      </div>

      {/* Hover Content */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 p-4 flex flex-col justify-end text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
          {size && (
            <div className="flex items-center text-sm mb-2">
              <FontAwesomeIcon icon={faRulerCombined} className="mr-2" />
              <span>{size}</span>
            </div>
          )}
          <p className="text-sm mb-4 line-clamp-3">{shortDescription}</p>
          {!isRestrictedCategory && !disableViewProduct && (
            <Link
              href={generateProductUrl(product)}
              className="inline-block w-full bg-green-600 text-white text-center px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors duration-200"
            >
              View Product
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
