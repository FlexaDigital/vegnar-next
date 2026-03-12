/**
 * Utility function to generate canonical URLs for all pages
 */

const BASE_URL = 'https://www.vegnar.com';

export function getCanonicalUrl(path: string): string {
  // Remove leading slash if present and ensure clean path
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Return base URL for home page
  if (!cleanPath || cleanPath === '') {
    return BASE_URL;
  }
  
  // Return full canonical URL
  return `${BASE_URL}/${cleanPath}`;
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