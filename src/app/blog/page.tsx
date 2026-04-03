import { metadata } from './metadata';
import Script from 'next/script';
import BlogPage from '@/components/Blog/BlogPage';

export { metadata };

export default function Page() {
  return (
    <>
      <Script
        id="blog-json-ld-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Blog",
                "url": "https://www.vegnar.com/blog",
                "name": "Green Insights — Biodegradable Living Blog by Vegnar Green",
                "description": "Tips, trends and guides on biodegradable products, bagasse tableware and eco-conscious business decisions.",
                "publisher": {
                  "@type": "Organization",
                  "name": "Vegnar Green",
                  "url": "https://www.vegnar.com",
                  "logo": "https://www.vegnar.com/_next/static/media/vegnar-green.b7f80c51.png"
                },
                "breadcrumb": {
                  "@type": "BreadcrumbList",
                  "itemListElement": [
                    {
                      "@type": "ListItem",
                      "position": 1,
                      "name": "Home",
                      "item": "https://www.vegnar.com/"
                    },
                    {
                      "@type": "ListItem",
                      "position": 2,
                      "name": "Blog",
                      "item": "https://www.vegnar.com/blog"
                    }
                  ]
                }
              }
            ]
          })
        }}
      />
      <BlogPage />
    </>
  );
}

