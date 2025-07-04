import { NextResponse } from 'next/server';

const SITE_URL = 'https://www.vegnar.com';
const WORDPRESS_API = 'https://cms.vegnar.com/wp-json/wp/v2';

async function fetchData(endpoint: string) {
  try {
    const res = await fetch(`${WORDPRESS_API}${endpoint}`, { next: { revalidate: 3600 } });
    return res.ok ? await res.json() : [];
  } catch {
    return [];
  }
}

export async function GET() {
  try {
    const [products, categories, posts] = await Promise.all([
      fetchData('/products?per_page=100&_embed'),
      fetchData('/product_category?per_page=100'),
      fetchData('/posts?per_page=100')
    ]);

    const staticCategories = ['bowls', 'clamshells', 'meal-trays', 'round-plates', 'sipper-lid', 'takeaway-container', 'tray'];
    const currentDate = new Date().toISOString().split('T')[0];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${SITE_URL}/</loc><changefreq>daily</changefreq><priority>1.0</priority></url>
  <url><loc>${SITE_URL}/about-us</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${SITE_URL}/contact</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${SITE_URL}/blog</loc><changefreq>daily</changefreq><priority>0.9</priority></url>
  <url><loc>${SITE_URL}/products</loc><changefreq>daily</changefreq><priority>0.9</priority></url>
  <url><loc>${SITE_URL}/partner</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
`;

    // Add categories
    (categories.length > 0 ? categories : staticCategories.map(slug => ({ slug }))).forEach((cat: any) => {
      xml += `  <url><loc>${SITE_URL}/products/${cat.slug}</loc><lastmod>${currentDate}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>
`;
    });

    // Add products
    products.forEach((product: any) => {
      const category = categories.find((cat: any) => product.product_category?.includes(cat.id));
      const categorySlug = category?.slug || 'uncategorized';
      const lastmod = product.modified?.split('T')[0] || currentDate;
      xml += `  <url><loc>${SITE_URL}/products/${categorySlug}/${product.slug}</loc><lastmod>${lastmod}</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>
`;
    });

    // Add blog posts
    posts.forEach((post: any) => {
      const lastmod = post.modified?.split('T')[0] || currentDate;
      xml += `  <url><loc>${SITE_URL}/blog/${post.slug}</loc><lastmod>${lastmod}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>
`;
    });

    xml += '</urlset>';

    return new NextResponse(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}