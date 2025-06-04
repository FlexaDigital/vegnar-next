const fs = require('fs');
const https = require('https');

const SITE_URL = 'https://www.vegnar.com';
const WORDPRESS_API = 'https://cms.vegnar.com/wp-json/wp/v2';

// Helper function to make HTTPS requests
function httpsGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (resp) => {
      let data = '';
      resp.on('data', (chunk) => { data += chunk; });
      resp.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

// Generate sitemap XML
async function generateSitemap() {
  try {
    // Fetch all products
    const products = await httpsGet(`${WORDPRESS_API}/products?per_page=100&_embed`);
    
    // Fetch all product categories
    const categories = await httpsGet(`${WORDPRESS_API}/product_category?per_page=100`);
    
    // Fetch all blog posts
    const posts = await httpsGet(`${WORDPRESS_API}/posts?per_page=100`);

    // Start XML content
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Static Pages -->
  <url>
    <loc>${SITE_URL}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${SITE_URL}/about-us</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${SITE_URL}/contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${SITE_URL}/blog</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${SITE_URL}/products</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${SITE_URL}/partner</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Product Categories -->
`;

    // Add product categories
    categories.forEach(category => {
      xml += `  <url>
    <loc>${SITE_URL}/products/${category.slug}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
    });

    // Add individual products
    products.forEach(product => {
      // Find the product's category
      const category = categories.find(cat => product.product_category.includes(cat.id));
      const categorySlug = category ? category.slug : 'uncategorized';
      
      xml += `  <url>
    <loc>${SITE_URL}/products/${categorySlug}/${product.slug}</loc>
    <lastmod>${product.modified.split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
`;
    });

    // Add blog posts
    posts.forEach(post => {
      xml += `  <url>
    <loc>${SITE_URL}/blog/${post.slug}</loc>
    <lastmod>${post.modified.split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`;
    });

    // Close XML
    xml += '</urlset>';

    // Write to file
    fs.writeFileSync('public/sitemap.xml', xml);
    console.log('Sitemap generated successfully!');

  } catch (error) {
    console.error('Error generating sitemap:', error);
    process.exit(1);
  }
}

// Run the generator
generateSitemap(); 