import { NextResponse } from 'next/server';

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

export async function GET() {
  const [products, categories, blogPosts] = await Promise.all([
    fetchProducts(),
    fetchCategories(),
    fetchBlogPosts()
  ]);

  const baseUrl = 'https://www.vegnar.com';
  const currentDate = new Date().toISOString().split('T')[0];

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <lastmod>${currentDate}</lastmod>
  </url>
  <url>
    <loc>${baseUrl}/about-us</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <lastmod>${currentDate}</lastmod>
  </url>
  <url>
    <loc>${baseUrl}/contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <lastmod>${currentDate}</lastmod>
  </url>
  <url>
    <loc>${baseUrl}/blog</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
    <lastmod>${currentDate}</lastmod>
  </url>
  <url>
    <loc>${baseUrl}/products</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
    <lastmod>${currentDate}</lastmod>
  </url>
  <url>
    <loc>${baseUrl}/partner</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <lastmod>${currentDate}</lastmod>
  </url>
  <url>
    <loc>${baseUrl}/quote</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <lastmod>${currentDate}</lastmod>
  </url>`;

  // Add category URLs
  categories.forEach(category => {
    const lastmod = new Date().toISOString().split('T')[0];
    const parentCategory = categories.find(cat => cat.id === category.parent);
    
    if (parentCategory) {
      sitemap += `
  <url>
    <loc>${baseUrl}/products/${parentCategory.slug}/${category.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    } else {
      sitemap += `
  <url>
    <loc>${baseUrl}/products/${category.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    }
  });

  // Add product URLs
  products.forEach(product => {
    const lastmod = new Date(product.modified).toISOString().split('T')[0];
    const productCategory = product.product_category?.[0];
    const category = categories.find(cat => cat.id === productCategory);
    
    if (category) {
      const parentCategory = categories.find(cat => cat.id === category.parent);
      const categoryPath = parentCategory 
        ? `${parentCategory.slug}/${category.slug}`
        : category.slug;
      
      sitemap += `
  <url>
    <loc>${baseUrl}/products/${categoryPath}/${product.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
    }
  });

  // Add blog post URLs
  blogPosts.forEach(post => {
    const lastmod = new Date(post.modified).toISOString().split('T')[0];
    sitemap += `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
  });

  sitemap += `
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    }
  });
}