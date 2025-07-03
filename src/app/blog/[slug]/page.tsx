import { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import BlogArticle from '@/components/Blog/BlogArticle';
import { Post } from '@/types/blog';

interface PageProps {
  params: {
    slug: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#ffffff',
};

const PUBLIC_SITE_URL = 'https://www.vegnar.com';

async function fetchPost(slug: string): Promise<Post | null> {
  try {
    const res = await fetch(`https://cms.vegnar.com/wp-json/wp/v2/posts?slug=${slug}&_embed`, {
      next: { revalidate: 60 },
    });
    const data = await res.json();
    return data?.length > 0 ? data[0] : null;
  } catch (err) {
    console.error('Error fetching post:', err);
    return null;
  }
}

async function fetchRelatedPosts(categoryId: number, excludeId: number): Promise<Post[]> {
  try {
    const res = await fetch(
      `https://cms.vegnar.com/wp-json/wp/v2/posts?categories=${categoryId}&_embed&per_page=3&exclude=${excludeId}`,
      { next: { revalidate: 60 } }
    );
    return await res.json();
  } catch (err) {
    console.error('Error fetching related posts:', err);
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await fetchPost(params.slug);
  if (!post) {
    return {
      title: 'Article Not Found | Vegnar Green',
      description: 'The requested article could not be found.',
    };
  }

  // Fetch SEO data from custom endpoint
  let seoData = null;
  try {
    const seoRes = await fetch(`https://cms.vegnar.com/wp-json/custom/v1/seo/${post.id}`, {
      next: { revalidate: 60 }
    });
    if (seoRes.ok) {
      seoData = await seoRes.json();
    }
  } catch (err) {
    console.error('Error fetching SEO data:', err);
  }

  const titleTemplate = seoData?.seo_title || "%title% | Vegnar Green";
  const title = titleTemplate
    .replace("%title%", post.title.rendered)
    .replace("%sep%", "|");

  const description = seoData?.seo_description || post?.excerpt?.rendered?.replace(/<[^>]*>?/gm, "").slice(0, 160);
  const keywords = seoData?.seo_keywords?.split(",") || [];

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: seoData?.link || `${PUBLIC_SITE_URL}/blog/${params.slug}`,
    },
    openGraph: {
      title,
      description,
      url: seoData?.link || `${PUBLIC_SITE_URL}/blog/${params.slug}`,
      type: 'article',
      siteName: 'Vegnar Green',
      images: [
        {
          url: post?._embedded?.['wp:featuredmedia']?.[0]?.source_url || "/default-og.jpg",
          width: 1200,
          height: 630,
          alt: post?.title?.rendered,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [post?._embedded?.['wp:featuredmedia']?.[0]?.source_url || "/default-og.jpg"],
      creator: '@VegnarGreens',
      site: '@VegnarGreens'
    },
    authors: [{ name: post?._embedded?.author?.[0]?.name || 'Vegnar Green' }],
    robots: { index: true, follow: true }
  };
}

function generateSchemaOrgData(post: Post) {
  const rm = post.rank_math_seo || {};
  const slug = post.slug;
  const title = rm.title || post.title?.rendered?.replace(/(<([^>]+)>)/gi, '');
  const description =
    rm.description || post.content?.rendered?.replace(/(<([^>]+)>)/gi, '').slice(0, 160);
  const image =
    rm.opengraph_image || post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: description,
    image: image,
    datePublished: post.date,
    dateModified: post.modified || post.date,
    author: {
      '@type': 'Organization',
      name: 'Vegnar Green',
      url: PUBLIC_SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Vegnar Green',
      logo: {
        '@type': 'ImageObject',
        url: `${PUBLIC_SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${PUBLIC_SITE_URL}/blog/${slug}`,
    },
  };
}

export default async function BlogArticlePage({ params }: PageProps) {
  const post = await fetchPost(params.slug);
  if (!post) notFound();

  const relatedPosts =
    post.categories?.length > 0
      ? await fetchRelatedPosts(post.categories[0], post.id)
      : [];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateSchemaOrgData(post)),
        }}
      />
      <BlogArticle post={post} relatedPosts={relatedPosts} />
    </>
  );
}
