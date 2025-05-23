'use client';

import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRulerCombined } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import he from 'he';

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
  const image = product._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.jpg';

  const isBioBagsCategory = product.product_category.some((catId) => {
    const cat = allCategories.find((c) => c.id === catId);
    return cat?.slug === 'bio-bags';
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
        <img
          src={image}
          alt={decodedTitle}
          className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
          onError={(e) => {
            e.currentTarget.src = '/placeholder.jpg';
            setImageLoading(false);
          }}
          onLoad={() => setImageLoading(false)}
        />
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
          {!disableViewProduct && (
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
