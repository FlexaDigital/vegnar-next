/**
 * Utility function to generate canonical URLs for all pages
 */

const BASE_URL = 'https://www.vegnar.com';

/**
 * Map of duplicate product URLs to their canonical versions
 */
const PRODUCT_URL_MAPPING: Record<string, string> = {
  // Map old bagasse-products URLs to new category URLs
  '/products/bagasse-products/bowl-650-ml-22-oz': '/products/bowls/bowl-650-ml-22-oz',
  '/products/bagasse-products/bowl-500-ml-16-oz': '/products/bowls/bowl-500-ml-16-oz',
  '/products/bagasse-products/bowl-350-ml-12-oz': '/products/bowls/bowl-350-ml-12-oz',
  // Add more mappings as needed
};

export function getCanonicalUrl(path: string): string {
  // Remove leading slash if present and ensure clean path
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const fullPath = `/${cleanPath}`;
  
  // Check if this is a duplicate product URL that needs canonical mapping
  if (PRODUCT_URL_MAPPING[fullPath]) {
    return `${BASE_URL}${PRODUCT_URL_MAPPING[fullPath]}`;
  }
  
  // Return base URL for home page
  if (!cleanPath || cleanPath === '') {
    return BASE_URL;
  }
  
  // Return full canonical URL
  return `${BASE_URL}/${cleanPath}`;
}

/**
 * Get the preferred canonical URL for product pages
 */
export function getProductCanonicalUrl(slug: string, category?: string): string {
  // Default to bowls category if not specified
  const productCategory = category || 'bowls';
  return `${BASE_URL}/products/${productCategory}/${slug}`;
}

/**
 * Common canonical URLs for static pages
 */
export const CANONICAL_URLS = {
  HOME: BASE_URL,
  ABOUT: `${BASE_URL}/about-us`,
  CONTACT: `${BASE_URL}/contact`,
  PRODUCTS: `${BASE_URL}/products`,
  EXPORT: `${BASE_URL}/export`,
  QUOTE: `${BASE_URL}/quote`,
  CAREER: `${BASE_URL}/career`,
  PARTNER: `${BASE_URL}/partner`,
  MANUFACTURING: `${BASE_URL}/manufacturing`,
  PAYMENTS: `${BASE_URL}/payments`,
  SHIPPING_POLICY: `${BASE_URL}/shipping-policy`,
  RETURN_CANCELLATION: `${BASE_URL}/return-cancellation`,
  SEARCH: `${BASE_URL}/search`,
  TEAM: `${BASE_URL}/team`,
  SUSTAINABILITY: `${BASE_URL}/sustainability`,
  ECO_ACTIVITIES: `${BASE_URL}/sustainability/eco-activities`,
  ECO_INITIATIVES: `${BASE_URL}/sustainability/eco-initiatives`,
} as const;