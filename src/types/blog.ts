export interface Post {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt?: { rendered: string };
  content: { rendered: string };
  date: string;
  modified: string;
  categories: number[];
  tags?: Array<{ name: string }>;
  rank_math_seo?: {
    title?: string;
    description?: string;
    opengraph_image?: string;
    [key: string]: any;
  };
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
    }>;
    'wp:term'?: Array<Array<{ name: string; slug: string }>>;
    author?: Array<{
      name: string;
      avatar_urls?: {
        [key: string]: string;
      };
    }>;
  };
} 