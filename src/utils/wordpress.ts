import he from 'he';

/**
 * Decodes HTML entities and strips HTML tags from WordPress content
 */
export function decodeAndStripHtml(html: string): string {
  if (!html) return '';
  
  // First strip HTML tags
  const withoutTags = html.replace(/<[^>]+>/g, '');
  
  // Then decode HTML entities like &amp;#8211; to proper characters
  return he.decode(withoutTags);
}

/**
 * Truncates text to specified length and adds ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (!text) return '';
  
  const decoded = decodeAndStripHtml(text);
  return decoded.length > maxLength 
    ? decoded.substring(0, maxLength) + '...' 
    : decoded;
}