const WORDPRESS_API_URL = 'https://cms.vegnar.com/wp-json';

export interface Product {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  slug: string;
  featured_media: number;
  categories: number[];
  _embedded?: {
    'wp:term'?: Array<Array<{ name: string; slug: string }>>;
    'wp:featuredmedia'?: Array<{ source_url: string; alt_text: string }>;
  };
}

export interface SearchResponse {
  products: Product[];
  totalPages: number;
  totalResults: number;
}

export const searchProducts = async (
  query: string,
  page: number = 1,
  perPage: number = 12
): Promise<SearchResponse> => {
  try {
    const response = await fetch(
      `${WORDPRESS_API_URL}/wp/v2/products?search=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}&_embed=wp:term,wp:featuredmedia`,
      {
        next: { revalidate: 300 }, // Cache for 5 minutes
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const products = await response.json();
    const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '1');
    const totalResults = parseInt(response.headers.get('X-WP-Total') || '0');

    return {
      products,
      totalPages,
      totalResults,
    };
  } catch (error) {
    console.error('Error searching products:', error);
    return {
      products: [],
      totalPages: 1,
      totalResults: 0,
    };
  }
};

export const getProductBySlug = async (slug: string): Promise<Product | null> => {
  try {
    const response = await fetch(
      `${WORDPRESS_API_URL}/wp/v2/products?slug=${slug}&_embed=wp:term,wp:featuredmedia`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const products = await response.json();
    return products.length > 0 ? products[0] : null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
};