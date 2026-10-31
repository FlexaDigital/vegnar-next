import { Suspense } from 'react';
import { metadata } from './metadata';
import Script from 'next/script';
import BlogPage, { Article, Category } from '@/components/Blog/BlogPage';
import { SITE_CONFIG } from '@/lib/constants';
import { decodeAndStripHtml } from '@/utils/wordpress';

export { metadata };

interface PageProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }> | { [key: string]: string | string[] | undefined };
}

async function getInitialBlogData(): Promise<{ categories: Category[]; articles: Article[] }> {
  const timeout = 25000;
  let categories: Category[] = [];
  let articles: Article[] = [];

  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    const [catRes, postRes] = await Promise.allSettled([
      fetch('https://cms.vegnar.com/wp-json/wp/v2/categories?per_page=100', {
        signal: controller.signal,
        next: { revalidate: 300 }, // Cache on server for 5 minutes
      }),
      fetch('https://cms.vegnar.com/wp-json/wp/v2/posts?_embed=wp:featuredmedia,wp:term&_fields=id,slug,title,excerpt,date,_links,_embedded&per_page=100', {
        signal: controller.signal,
        next: { revalidate: 300 }, // Cache on server for 5 minutes
      }),
    ]);

    clearTimeout(id);

    if (catRes.status === 'fulfilled' && catRes.value.ok) {
      const data = await catRes.value.json();
      categories = data.filter((cat: Category) => cat.count > 0);
    }

    if (postRes.status === 'fulfilled' && postRes.value.ok) {
      const data = await postRes.value.json();
      articles = data.map((post: any) => ({
        id: post.id,
        title: decodeAndStripHtml(post.title?.rendered || ''),
        summary: decodeAndStripHtml(post.excerpt?.rendered || '').slice(0, 120) + '...',
        url: `/blog/${post.slug}`,
        image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://placehold.co/400x240/cccccc/333333?text=Vegnar+Blog',
        alt: decodeAndStripHtml(post.title?.rendered || 'Blog article'),
        tag: post._embedded?.['wp:term']?.[0]?.[0]?.name || 'Blog',
        readTime: '3 min read',
        slug: post.slug,
      }));
    }
  } catch (err) {
    console.error('Error prefetching blog data on server:', err);
  }

  return { categories, articles };
}

export default async function Page({ searchParams }: PageProps) {
  const resolvedSearchParams = searchParams ? await Promise.resolve(searchParams) : {};
  const initialPage = typeof resolvedSearchParams?.page === 'string' ? parseInt(resolvedSearchParams.page, 10) : 1;
  const initialTag = typeof resolvedSearchParams?.category === 'string' ? resolvedSearchParams.category : '';
  const initialSearch = typeof resolvedSearchParams?.q === 'string' ? resolvedSearchParams.q : '';

  const { categories, articles } = await getInitialBlogData();

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
                "url": `${SITE_CONFIG.BASE_URL}/blog`,
                "name": "Green Insights — Biodegradable Living Blog by Vegnar Green",
                "description": "Tips, trends and guides on biodegradable products, bagasse tableware and eco-conscious business decisions.",
                "publisher": {
                  "@type": "Organization",
                  "name": "Vegnar Green",
                  "url": SITE_CONFIG.BASE_URL,
                  "logo": "https://www.vegnar.com/_next/static/media/vegnar-green.b7f80c51.png"
                },
                "breadcrumb": {
                  "@type": "BreadcrumbList",
                  "itemListElement": [
                    {
                      "@type": "ListItem",
                      "position": 1,
                      "name": "Home",
                      "item": `${SITE_CONFIG.BASE_URL}/`
                    },
                    {
                      "@type": "ListItem",
                      "position": 2,
                      "name": "Blog",
                      "item": `${SITE_CONFIG.BASE_URL}/blog`
                    }
                  ]
                }
              }
            ]
          })
        }}
      />
      <Suspense fallback={null}>
        <BlogPage
          initialArticles={articles}
          initialCategories={categories}
          initialPage={initialPage > 0 ? initialPage : 1}
          initialTag={initialTag}
          initialSearch={initialSearch}
        />
      </Suspense>
    </>
  );
}

