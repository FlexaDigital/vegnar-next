import React from 'react';
import { Metadata } from 'next';
import { fetchAllProductCategories } from '@/lib/api';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTemperatureHigh,
  faWater,
  faSnowflake,
  faCheckCircle,
  faLeaf,
} from "@fortawesome/free-solid-svg-icons";
import ProductCard from '@/components/ProductCard';
import { decodeAndStripHtml, decodeHtmlEntities } from './utils';
import ProductImageGallery from '@/components/Product/ProductImageGallery';
import productsData from '@/data/products.json';
import { DomesticProduct, WpProduct as Product, Category } from '@/types/product';
import AddToCartButton from '@/components/Product/AddToCartButton';

interface PageProps {
  params: Promise<{
    categorySlug: string; 
    productSlug: string;
  }>;
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
  const { productSlug, categorySlug } = await params;

  // Fetch all data concurrently on the server
  const productPromise = getProduct(productSlug);
  const categoriesPromise = fetchAllProductCategories();

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

  // Build gallery images array: featured image + ACF gallery images (deduplicated)
  const acfGalleryImages: string[] = [];
  if (product._embedded?.["acf:attachment"]) {
    for (const attachment of product._embedded["acf:attachment"]) {
      const url =
        attachment.media_details?.sizes?.large?.source_url ||
        attachment.media_details?.sizes?.medium_large?.source_url ||
        attachment.source_url;
      if (url && !acfGalleryImages.includes(url)) {
        acfGalleryImages.push(url);
      }
    }
  }

  // Combine: start with featured image, add gallery images that aren't duplicates
  const allProductImages: string[] = [featuredImageUrl];
  for (const url of acfGalleryImages) {
    if (!allProductImages.includes(url)) {
      allProductImages.push(url);
    }
  }

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

  // Find matching domestic product for quote functionality
  const domesticProduct = (productsData as DomesticProduct[]).find(
    p => p.item_code === acf.item_code
  );

  return (
    <div>
      <section className='pt-[20px] relative'>
        <div className="absolute inset-0 bg-[url('/assets/bg-green.png')] bg-repeat opacity-15 pointer-events-none" style={{backgroundSize: '200px'}}></div>
        <div className="relative text-gray-700 font-sans">
          <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
            {/* Breadcrumb Section */}
            <nav className="text-sm text-gray-500 mb-4 select-none">
              <ol className="list-reset flex flex-wrap gap-1">
                <li>
                  <Link className=" " href="/">
                    Home
                  </Link>
                </li>
                {parentCategory && (
                  <>
                    <li>&gt;</li>
                    <li>
                      <Link className=" " href={`/products/${parentCategory.slug}`}>
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
                        className=" "
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

            {/* Main Product Details Section */}
            <div className="flex flex-col md:flex-row md:space-x-12 overflow-visible">
              {/* Image Gallery - Amazon/Flipkart style */}
              <ProductImageGallery
                images={allProductImages}
                productName={decodeHtmlEntities(decodeAndStripHtml(product.title.rendered))}
              />
              <div className="flex-1 md:mt-0">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
                  {decodeHtmlEntities(
                    decodeAndStripHtml(product.title.rendered)
                  )}
                </h1>
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    100% Biodegradable
                  </span>
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    FDA Approved
                  </span>
                  <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    Compostable
                  </span>
                </div>
                <p className="text-lg text-gray-700 mb-6">
                  Premium eco-friendly {acf.product_size} made from sustainable{" "}
                  <Link href="/products/bagasse-products" className="text-green-700 font-semibold transition-all">
                    sugarcane bagasse
                  </Link>. Perfect for restaurants, catering, and eco-conscious consumers. Available for{" "}
                  <Link href="/quote" className="text-green-700 font-semibold transition-all">
                    bulk wholesale orders
                  </Link>{" "}
                  with competitive pricing.
                </p>
                <div
                  className="text-sm leading-relaxed mb-8 max-w-xl prose prose-sm"
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
                    <FontAwesomeIcon icon={faWater} className="text-base mb-1" />
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
                    Product Details
                  </h2>
                  <div className="flex gap-6 mb-4 text-sm">
                    {acf.item_code && (
                      <div>
                        <span className="text-gray-600">SKU: </span>
                        <span className="font-semibold text-gray-900">{acf.item_code}</span>
                      </div>
                    )}
                    {acf.color && (
                      <div>
                        <span className="text-gray-600">Color: </span>
                        <span className="font-semibold text-gray-900">{acf.color}</span>
                      </div>
                    )}
                    {acf.product_weight && (
                      <div>
                        <span className="text-gray-600">Weight: </span>
                        <span className="font-semibold text-gray-900">{acf.product_weight}g</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Packing Details</h3>
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
       
                <div className="text-center mt-6">
                  <p className="text-xs text-gray-400 mb-4 max-w-xl mx-auto">
                    Bulk orders available with customization options. Visit our{" "}
                    <Link href="/manufacturing" className="text-green-600 ">
                      manufacturing facility
                    </Link>{" "}
                    page to learn about our quality processes, or explore our{" "}
                    <Link href="/export" className="text-green-600 ">
                      international shipping options
                    </Link>.
                  </p>
                  {domesticProduct ? (
                    <AddToCartButton product={domesticProduct} />
                  ) : (
                    <Link href="/quote" className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors">
                      Get Quote
                    </Link>
                  )}
                </div>
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
                    const shouldDisableViewProduct = categorySlug === 'paper-cups' || categorySlug === 'bio-bags';

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
      {/* Enhanced Product Information */}
      <section className="relative bg-gray-50 py-12">
        <div className="absolute inset-0 bg-[url('/assets/bg-green.png')] bg-repeat opacity-15 pointer-events-none" style={{backgroundSize: '200px'}}></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Why Choose This Product */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Our {decodeHtmlEntities(decodeAndStripHtml(product.title.rendered))}?</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <FontAwesomeIcon icon={faLeaf} className="w-3 h-3 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">100% Natural & Safe</h3>
                    <p className="text-gray-600 text-sm">Made from{" "}
                      <Link href="/products/bagasse-products" className="text-green-700 ">
                        sugarcane bagasse
                      </Link>{" "}
                      with no harmful chemicals or plastic coatings.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <FontAwesomeIcon icon={faCheckCircle} className="w-3 h-3 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Durable & Functional</h3>
                    <p className="text-gray-600 text-sm">Heat resistant up to 220°F, microwave safe, and leak-proof design.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <FontAwesomeIcon icon={faTemperatureHigh} className="w-3 h-3 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Eco-Friendly Disposal</h3>
                    <p className="text-gray-600 text-sm">Composts completely in 90 days, leaving no toxic residue.</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Applications */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Perfect For</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-2">Restaurants</h3>
                  <p className="text-gray-600 text-sm">Enhance your eco-friendly dining experience</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-2">Catering</h3>
                  <p className="text-gray-600 text-sm">Professional events and large gatherings</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-2">Takeaway</h3>
                  <p className="text-gray-600 text-sm">Food delivery and packaging solutions</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-2">Home Use</h3>
                  <p className="text-gray-600 text-sm">Parties, picnics, and everyday meals</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQs Section */}
      <section className="relative py-12">
        <div className="absolute inset-0 bg-[url('/assets/bg-green.png')] bg-repeat opacity-15 pointer-events-none" style={{backgroundSize: '200px'}}></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <details className="group border border-gray-200 rounded-lg">
              <summary className="flex justify-between items-center cursor-pointer p-6 font-semibold text-gray-900 hover:bg-gray-50">
                <span>Is this product microwave safe?</span>
                <span className="transform group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 pb-6 text-gray-600">
                <p>Yes, our {decodeHtmlEntities(decodeAndStripHtml(product.title.rendered))} is microwave safe up to 220°F (105°C). It's perfect for reheating food without any harmful chemical leaching.</p>
              </div>
            </details>
            
            <details className="group border border-gray-200 rounded-lg">
              <summary className="flex justify-between items-center cursor-pointer p-6 font-semibold text-gray-900 hover:bg-gray-50">
                <span>How long does it take to compost?</span>
                <span className="transform group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 pb-6 text-gray-600">
                <p>Our products are certified compostable and break down completely within 90 days in industrial composting facilities. In home composting, it may take 6-12 months depending on conditions.</p>
              </div>
            </details>
            
            <details className="group border border-gray-200 rounded-lg">
              <summary className="flex justify-between items-center cursor-pointer p-6 font-semibold text-gray-900 hover:bg-gray-50">
                <span>What certifications do you have?</span>
                <span className="transform group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 pb-6 text-gray-600">
                <p>We hold multiple certifications including FDA approval for food contact, SGS testing for safety, OKComposite certification for compostability, and ISO 14001 for environmental management. Learn more about our{" "}
                  <Link href="/manufacturing" className="text-green-700 ">
                    quality certifications and manufacturing standards
                  </Link>.
                </p>
              </div>
            </details>
            
            <details className="group border border-gray-200 rounded-lg">
              <summary className="flex justify-between items-center cursor-pointer p-6 font-semibold text-gray-900 hover:bg-gray-50">
                <span>Can I customize this product with my logo?</span>
                <span className="transform group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 pb-6 text-gray-600">
                <p>Yes! We offer custom printing and branding options for bulk orders.{" "}
                  <Link href="/contact" className="text-green-700 ">
                    Contact our team
                  </Link>{" "}
                  to discuss your customization requirements and minimum order quantities.
                </p>
              </div>
            </details>
            
            <details className="group border border-gray-200 rounded-lg">
              <summary className="flex justify-between items-center cursor-pointer p-6 font-semibold text-gray-900 hover:bg-gray-50">
                <span>What's the minimum order quantity?</span>
                <span className="transform group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 pb-6 text-gray-600">
                <p>Minimum order quantities vary by product and customization requirements. For standard products, we typically require 1 carton minimum. Contact us for specific MOQ details and bulk pricing.</p>
              </div>
            </details>
            
            <details className="group border border-gray-200 rounded-lg">
              <summary className="flex justify-between items-center cursor-pointer p-6 font-semibold text-gray-900 hover:bg-gray-50">
                <span>Do you ship internationally?</span>
                <span className="transform group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 pb-6 text-gray-600">
                <p>Yes, we export to over 15 countries worldwide. We handle all export documentation and can arrange shipping via sea or air freight. Visit our{" "}
                  <Link href="/export" className="text-green-700 ">
                    export page
                  </Link>{" "}
                  for more details or{" "}
                  <Link href="/contact" className="text-green-700 ">
                    contact us
                  </Link>{" "}
                  for international shipping quotes and lead times.
                </p>
              </div>
            </details>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SingleProductPage;

export async function generateMetadata({ params }: { params: Promise<{ categorySlug: string; productSlug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.productSlug);
  if (!product) {
    return {
      title: 'Product Not Found | Vegnar Green',
      description: 'The requested product could not be found.',
    };
  }

  // Fetch SEO data from custom endpoint
  let seoData = null;
  try {
    const seoRes = await fetch(`https://cms.vegnar.com/wp-json/custom/v1/seo/${product.id}`, {
      next: { revalidate: 60 }
    });
    if (seoRes.ok) {
      seoData = await seoRes.json();
    }
  } catch (err) {
    console.error('Error fetching product SEO data:', err);
  }

  const productTitle = decodeHtmlEntities(decodeAndStripHtml(product.title.rendered));
  const title = `${productTitle} Wholesale India | Biodegradable Sugarcane ${productTitle} Manufacturer | Vegnar Green`;

  const description = seoData?.seo_description || `Premium ${productTitle} made from sugarcane bagasse. Eco-friendly, biodegradable tableware perfect for restaurants, catering, and sustainable dining solutions.`;
  
  const defaultKeywords = [
    productTitle,
    `${productTitle} bagasse`,
    `sugarcane bagasse ${productTitle.toLowerCase()}`,
    'biodegradable tableware',
    'eco-friendly tableware',
    'compostable tableware',
    'sustainable tableware',
    'bagasse products',
    'sugarcane bagasse products',
    'restaurant tableware',
    'takeaway containers',
    'food packaging',
    'microwave safe tableware',
    'Vegnar Green products',
    'wholesale tableware',
    'bulk tableware'
  ];
  const keywords = defaultKeywords;
  const featuredImageUrl = product?._embedded?.["wp:featuredmedia"]?.[0]?.source_url || 'https://www.vegnar.com/images/default-product.jpg';

  return {
    title,
    description,
    keywords: keywords.join(', '),
    alternates: {
      canonical: seoData?.link || `https://www.vegnar.com/products/${resolvedParams.categorySlug}/${resolvedParams.productSlug}`,
    },
    openGraph: {
      title,
      description,
      url: seoData?.link || `https://www.vegnar.com/products/${resolvedParams.categorySlug}/${resolvedParams.productSlug}`,
      type: 'article',
      siteName: 'Vegnar Green',
      images: [
        {
          url: featuredImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [featuredImageUrl],
      creator: '@VegnarGreens',
      site: '@VegnarGreens'
    },
    robots: { 
      index: true, 
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    authors: [{ name: 'Vegnar Green' }],
    publisher: 'Vegnar Green'
  };
}