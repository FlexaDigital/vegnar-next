// src/app/products/[categorySlug]/[productSlug]/utils.ts

import * as he from 'he'; // Import the 'he' library

/**
 * Decodes HTML entities and strips HTML tags from a string.
 * This function now uses 'he' for robust server-side entity decoding.
 * @param html The HTML string to decode and strip.
 * @returns The plain text string.
 */
export const decodeAndStripHtml = (html: string): string => {
  if (typeof document === 'undefined') {
    // Server-side: Decode entities first, then strip tags
    const decodedHtml = he.decode(html);
    return decodedHtml.replace(/<[^>]*>?/gm, '');
  }
  // Client-side: Use DOM manipulation
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || "";
};

/**
 * Decodes HTML entities from a string.
 * This function now uses 'he' for robust server-side entity decoding.
 * @param str The string with HTML entities to decode.
 * @returns The string with decoded HTML.
 */
export function decodeHtmlEntities(str: string): string {
  if (typeof document === 'undefined') {
    // Server-side: Use 'he' for full HTML entity decoding
    return he.decode(str);
  }
  // Client-side: Use DOM manipulation
  const txt = document.createElement("textarea");
  txt.innerHTML = str;
  return txt.value;
}