import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link'; 

import ProductCard from '@/components/ProductCard';

import { decodeAndStripHtml, decodeHtmlEntities } from './utils';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTemperatureHigh,
  faTint,
  faSnowflake,
  faCheckCircle,
  faEnvelope,
  faLeaf,
} from "@fortawesome/free-solid-svg-icons";

// --- TypeScript Interfaces ---
interface Product {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  acf?: {
    product_size?: string;
    pscPerPack?: string;
    packPerBox?: string;
    box_dimension?: string;
  };
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url: string }>;
  };
  featured_media?: number;
  product_category?: number[]; // Array of category IDs
}

interface Category {
  id: number;
  name: string;
  slug: string;
  parent: number; // 0 if it's a top-level category
}

interface PageProps {
  params: {
    categorySlug: string; // This is the slug from the URL, which could be parent or sub
    productSlug: string;
  };
}

// --- Server-Side Data Fetching Functions ---

/**
 * Fetches a single product by its slug.
 * @param slug The product slug.
 * @returns The product data or null if not found/error.
 */
async function getProduct(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(
      `https://cms.vegnar.com/wp-json/wp/v2/products?slug=${slug}&_embed`,
      { next: { revalidate: 3600 } } // Revalidate data every hour
    );

    if (!res.ok) {
      console.error(`Failed to fetch product for slug: ${slug}, Status: ${res.status}`);
      return null;
    }

    const data: Product[] = await res.json();
    return data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

/**
 * Fetches all product categories.
 * @returns An array of category data.
 */
async function getAllCategories(): Promise<Category[]> {
  try {
    const res = await fetch(
      "https://cms.vegnar.com/wp-json/wp/v2/product_category",
      { next: { revalidate: 3600 } } // Revalidate data every hour
    );
    if (!res.ok) {
      console.error("Failed to fetch categories. Status:", res.status);
      return [];
    }
    const data: Category[] = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching all categories:", error);
    return [];
  }
}

/**
 * Fetches related products based on a category ID, excluding a specific product.
 * @param categoryId The ID of the category to fetch related products from.
 * @param excludeProductId The ID of the product to exclude from the results.
 * @returns An array of related product data.
 */
async function getRelatedProducts(
  categoryId: number,
  excludeProductId: number
): Promise<Product[]> {
  try {
    const res = await fetch(
      `https://cms.vegnar.com/wp-json/wp/v2/products?product_category=${categoryId}&_embed&exclude=${excludeProductId}`,
      { next: { revalidate: 3600 } } // Revalidate data every hour
    );
    if (!res.ok) {
      console.error(`Failed to fetch related products for category ${categoryId}. Status: ${res.status}`);
      return [];
    }
    const data: Product[] = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching related products:", error);
    return [];
  }
}

// --- Main Server Component ---
const SingleProductPage = async ({ params }: PageProps) => {
  const { productSlug, categorySlug } = params; // categorySlug from URL

  // Fetch all data concurrently on the server
  const productPromise = getProduct(productSlug);
  const categoriesPromise = getAllCategories();

  const [product, allCategories] = await Promise.all([
    productPromise,
    categoriesPromise,
  ]);

  if (!product) {
    notFound(); // Render 404 page if product not found
  }

  // Determine featured image URL
  const featuredImageUrl =
    product._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    "https://placehold.co/500x500/e0e0e0/ffffff?text=No+Image"; // Fallback placeholder

  // --- Breadcrumb Logic ---
  let subCategory: Category | undefined;
  let parentCategory: Category | undefined;
  let relatedProducts: Product[] = [];

  if (product.product_category && product.product_category.length > 0) {
    // The product_category array usually contains the most specific category ID.
    const productCategoryId = product.product_category[0];
    subCategory = allCategories.find((cat) => cat.id === productCategoryId);

    if (subCategory && subCategory.parent !== 0) {
      parentCategory = allCategories.find((cat) => cat.id === subCategory?.parent);
    }

    // Fetch related products based on the subCategory's ID
    if (subCategory) {
      relatedProducts = await getRelatedProducts(subCategory.id, product.id);
    }
  }

  const acf = product.acf || {};

  return (
    <div>
      <section className='pt-[50px]'>
        <div className="bg-white text-gray-700 font-sans">
          <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
            {/* Breadcrumb Section */}
            <nav className="text-sm text-gray-500 mb-6 select-none">
              <ol className="list-reset flex flex-wrap gap-1">
                <li>
                  <Link className="hover:underline" href="/">
                    Home
                  </Link>
                </li>
                {parentCategory && (
                  <>
                    <li>&gt;</li>
                    <li>
                      <Link className="hover:underline" href={`/products/${parentCategory.slug}`}>
                        {parentCategory.name}
                      </Link>
                    </li>
                  </>
                )}
                {subCategory && (
                  <>
                    <li>&gt;</li>
                    <li>
                      {/*
                        Corrected Link to the subcategory page:
                        If there's a parent, use /products/parent-slug/sub-slug
                        If no parent (subcategory is top-level), use /products/sub-slug
                      */}
                      <Link
                        className="hover:underline"
                        href={parentCategory
                          ? `/products/${parentCategory.slug}/${subCategory.slug}`
                          : `/products/${subCategory.slug}`
                        }
                      >
                        {subCategory.name}
                      </Link>
                    </li>
                  </>
                )}
                <li>&gt;</li>
                <li>
                  {/* Current Product Name (not a link) */}
                  <span className="font-semibold text-green-800">
                    {decodeHtmlEntities(
                      decodeAndStripHtml(product.title.rendered)
                    )}
                  </span>
                </li>
              </ol>
            </nav>

            {/* Main Product Details Section - Added mt-8 for top margin */}
            <div className="flex flex-col md:flex-row md:space-x-12 mt-8">
              <div className="md:flex-shrink-0 md:w-[400px]">
                <img
                  alt={product.title.rendered}
                  className="rounded-lg w-full object-cover"
                  height={500}
                  src={featuredImageUrl}
                  width={500}
                />
              </div>
              <div className="flex-1 mt-8 md:mt-0">
                <h1 className="text-2xl font-extrabold text-gray-900 mb-1">
                  {decodeHtmlEntities(
                    decodeAndStripHtml(product.title.rendered)
                  )}
                </h1>
                <p className="text-sm text-gray-600 mb-6">
                  Size: {acf.product_size}
                </p>
                <div
                  className="text-sm leading-relaxed mb-8 max-w-xl"
                  dangerouslySetInnerHTML={{
                    __html: product.content.rendered,
                  }}
                />
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  <div className="flex flex-col items-center bg-green-50 border border-green-200 rounded-md p-3 text-center text-green-800 text-xs">
                    <FontAwesomeIcon
                      icon={faTemperatureHigh}
                      className="text-base mb-1"
                    />
                    <span className="font-semibold">Oven Safe</span>
                    <span className="mt-1 text-[9px] text-green-700">
                      Up to 220°F (105°C)
                    </span>
                  </div>
                  <div className="flex flex-col items-center bg-green-50 border border-green-200 rounded-md p-3 text-center text-green-800 text-xs">
                    <FontAwesomeIcon icon={faTint} className="text-base mb-1" />
                    <span className="font-semibold">
                      Water &amp; Oil Resistant
                    </span>
                    <span className="mt-1 text-[9px] text-green-700">
                      No leaks or sogginess
                    </span>
                  </div>
                  <div className="flex flex-col items-center bg-green-50 border border-green-200 rounded-md p-3 text-center text-green-800 text-xs">
                    <FontAwesomeIcon
                      icon={faSnowflake}
                      className="text-base mb-1"
                    />
                    <span className="font-semibold">Freezer Safe</span>
                    <span className="mt-1 text-[9px] text-green-700">
                      Down to -20°F (-29°C)
                    </span>
                  </div>
                  <div className="flex flex-col items-center bg-green-50 border border-green-200 rounded-md p-3 text-center text-green-800 text-xs">
                    <FontAwesomeIcon icon={faLeaf} className="text-base mb-1" />
                    <span className="font-semibold">
                      Compostable & Biodegradable Verified
                    </span>
                    <span className="mt-1 text-[9px] text-green-700">
                      Compost in 90 days
                    </span>
                  </div>
                </div>
                <div className="mb-6">
                  <h2 className="text-sm font-semibold text-gray-900 mb-2">
                    Certifications
                  </h2>
                  <div className="flex flex-wrap gap-2 text-xs text-green-800">
                    <span className="flex items-center space-x-1 bg-green-100 border border-green-300 rounded-full px-3 py-1">
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="text-[10px]"
                      />
                      <span>SGS Tested</span>
                    </span>
                    <span className="flex items-center space-x-1 bg-green-100 border border-green-300 rounded-full px-3 py-1">
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="text-[10px]"
                      />
                      <span>FDA Approved</span>
                    </span>
                    <span className="flex items-center space-x-1 bg-green-100 border border-green-300 rounded-full px-3 py-1">
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="text-[10px]"
                      />
                      <span>OKComposite</span>
                    </span>
                    <span className="flex items-center space-x-1 bg-green-100 border border-green-300 rounded-full px-3 py-1">
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="text-[10px]"
                      />
                      <span>ISO 14001</span>
                    </span>
                  </div>
                </div>
                <div className="mb-6">
                  <h2 className="text-sm font-semibold text-gray-900 mb-2">
                    Packing Details
                  </h2>
                  <table className="w-full text-xs text-gray-600 border border-gray-200 rounded-md overflow-hidden">
                    <thead className="bg-green-50 text-gray-500">
                      <tr>
                        <th className="text-left px-3 py-1 border-b border-gray-200 uppercase font-normal">
                          Pieces / Case
                        </th>
                        <th className="text-left px-3 py-1 border-b border-gray-200 uppercase font-normal">
                          Cases / Cartoon
                        </th>
                        <th className="text-left px-3 py-1 border-b border-gray-200 uppercase font-normal">
                          Pieces / Carton
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200">
                        <td className="px-3 py-1">{acf.pscPerPack}</td>
                        <td className="px-3 py-1">{acf.packPerBox}</td>
                        <td className="px-3 py-1">
                          {acf.pscPerPack && acf.packPerBox
                            ? parseInt(acf.pscPerPack) * parseInt(acf.packPerBox)
                            : 'N/A'}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
       
                <p className="text-center text-xs text-gray-400 mt-3 max-w-xl mx-auto">
                  Bulk orders available with customization options
                </p>
              </div>
            </div>

            {/* Related Products Section - Updated for 4 per row and horizontal scrolling */}
            {relatedProducts.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Similar Products
                </h2>
                <div className="flex overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 scrollbar-hide">
                  {relatedProducts.map((relatedProduct) => {
                    // Check if we're on paper-cups or bio-bags page
                    const shouldDisableViewProduct = params.categorySlug === 'paper-cups' || params.categorySlug === 'bio-bags';

                    return (
                      <div key={relatedProduct.id} className="flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 snap-start">
                        <ProductCard
                          product={{
                            ...relatedProduct,
                            product_category: relatedProduct.product_category || []
                          }}
                          allCategories={allCategories}
                          disableViewProduct={shouldDisableViewProduct}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      <section>
        {/* FAQs Section - Client Component */}
        
      </section>
    </div>
  );
};

export default SingleProductPage;