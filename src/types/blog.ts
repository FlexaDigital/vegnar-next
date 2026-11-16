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
  author?: number;
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
      id?: number;
      name: string;
      slug?: string;
      url?: string;
      description?: string;
      avatar_urls?: {
        [key: string]: string;
      };
    }>;
  };
} 