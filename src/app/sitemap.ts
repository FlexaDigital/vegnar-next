import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/constants';

interface Product {
  id: number;
  slug: string;
  modified: string;
  product_category?: number[];
}

interface Category {
  id: number;
  slug: string;
  parent: number;
}

interface BlogPost {
  id: number;
  slug: string;
  modified: string;
}

/* 
   FETCH FUNCTIONS
 */

async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await fetch(
      'https://cms.vegnar.com/wp-json/wp/v2/products?status=publish&per_page=100&_fields=id,slug,modified,product_category',
      { next: { revalidate: 3600 } }
    );
    return res.ok ? res.json() : [];
  } catch {
    return [];
  }
}

async function fetchCategories(): Promise<Category[]> {
  try {
    const res = await fetch(
      'https://cms.vegnar.com/wp-json/wp/v2/product_category?per_page=100&_fields=id,slug,parent',
      { next: { revalidate: 3600 } }
    );
    return res.ok ? res.json() : [];
  } catch {
    return [];
  }
}

async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch(
      'https://cms.vegnar.com/wp-json/wp/v2/posts?status=publish&per_page=100&_fields=id,slug,modified',
      { next: { revalidate: 3600 } }
    );
    return res.ok ? res.json() : [];
  } catch {
    return [];
  }
}

/*  SITEMAP */

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, categories, blogPosts] = await Promise.all([
    fetchProducts(),
    fetchCategories(),
    fetchBlogPosts(),
  ]);

  const baseUrl = SITE_CONFIG.BASE_URL;

  // 🔒 Static pages should NOT use current date
  const STATIC_LAST_MODIFIED = new Date('2025-01-01');

  // Fast category lookup
  const categoryMap = new Map<number, Category>();
  categories.forEach(cat => categoryMap.set(cat.id, cat));

  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/manufacturing`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/export`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/career`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/partner`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/payments`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/shipping-policy`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/return-cancellation`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/quote`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sustainability/eco-initiatives`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/sustainability/eco-activities`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/products/bagasse-products`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  /*     CATEGORY URLs   */

  categories.forEach(category => {
    const parent = categoryMap.get(category.parent);

    routes.push({
      url: parent
        ? `${baseUrl}/products/${parent.slug}/${category.slug}`
        : `${baseUrl}/products/${category.slug}`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  });

  /*     PRODUCT URLs */

  products.forEach(product => {
    const categoryId = product.product_category?.[0];
    if (!categoryId) return;

    const category = categoryMap.get(categoryId);
    if (!category) return;

    const parent = categoryMap.get(category.parent);
    const categoryPath = parent
      ? `${parent.slug}/${category.slug}`
      : category.slug;

    routes.push({
      url: `${baseUrl}/products/${categoryPath}/${product.slug}`,
      lastModified: new Date(product.modified),
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  });

  /* BLOG URLs */

  blogPosts.forEach(post => {
    routes.push({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.modified),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

  return routes;
}
