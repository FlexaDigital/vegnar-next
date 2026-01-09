import { MetadataRoute } from 'next';

interface Product {
  id: number;
  slug: string;
  modified: string;
  product_category?: number[];
}

interface Category {
  id: number;
  name: string;
  slug: string;
  parent: number;
}

interface BlogPost {
  id: number;
  slug: string;
  modified: string;
}

async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await fetch('https://cms.vegnar.com/wp-json/wp/v2/products?per_page=100&_fields=id,slug,modified,product_category', {
      next: { revalidate: 3600 }
    });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

async function fetchCategories(): Promise<Category[]> {
  try {
    const res = await fetch('https://cms.vegnar.com/wp-json/wp/v2/product_category?per_page=100&_fields=id,name,slug,parent', {
      next: { revalidate: 3600 }
    });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch('https://cms.vegnar.com/wp-json/wp/v2/posts?per_page=100&_fields=id,slug,modified', {
      next: { revalidate: 3600 }
    });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, categories, blogPosts] = await Promise.all([
    fetchProducts(),
    fetchCategories(),
    fetchBlogPosts()
  ]);

  const baseUrl = 'https://www.vegnar.com';
  const currentDate = new Date();

  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/partner`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/quote`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // Add category URLs
  categories.forEach(category => {
    const parentCategory = categories.find(cat => cat.id === category.parent);
    
    if (parentCategory) {
      routes.push({
        url: `${baseUrl}/products/${parentCategory.slug}/${category.slug}`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    } else {
      routes.push({
        url: `${baseUrl}/products/${category.slug}`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    }
  });

  // Add product URLs
  products.forEach(product => {
    const productCategory = product.product_category?.[0];
    const category = categories.find(cat => cat.id === productCategory);
    
    if (category) {
      const parentCategory = categories.find(cat => cat.id === category.parent);
      const categoryPath = parentCategory 
        ? `${parentCategory.slug}/${category.slug}`
        : category.slug;
      
      routes.push({
        url: `${baseUrl}/products/${categoryPath}/${product.slug}`,
        lastModified: new Date(product.modified),
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    }
  });

  // Add blog post URLs
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