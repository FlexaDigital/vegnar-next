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

// Add viewport export
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#ffffff',
};

async function fetchPost(slug: string): Promise<Post | null> {
  try {
    const response = await fetch(
      `https://cms.vegnar.com/wp-json/wp/v2/posts?slug=${slug}&_embed`,
      { next: { revalidate: 60 } }
    );
    const posts = await response.json();
    return posts.length > 0 ? posts[0] : null;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

async function fetchRelatedPosts(categoryId: number, excludeId: number): Promise<Post[]> {
  try {
    const response = await fetch(
      `https://cms.vegnar.com/wp-json/wp/v2/posts?categories=${categoryId}&_embed&per_page=3&exclude=${excludeId}`,
      { next: { revalidate: 60 } }
    );
    return await response.json();
  } catch (error) {
    console.error('Error fetching related posts:', error);
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

  const title = post.title.rendered.replace(/(<([^>]+)>)/gi, '');
  const description = post.content.rendered
    .replace(/(<([^>]+)>)/gi, '')
    .slice(0, 160);

  // Get the featured image URL or use a default
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/img/default-blog.jpg';
  
  // Get the author information
  const author = post._embedded?.author?.[0] || { name: 'Vegnar Green' };

  return {
    title: `${title} | Vegnar Green Blog`,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.modified || post.date,
      authors: [author.name],
      images: [
        {
          url: featuredImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [featuredImage],
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
    authors: [{ name: author.name }],
    publisher: 'Vegnar Green',
    keywords: post.tags?.map((tag: any) => tag.name).join(', ') || '',
    other: {
      'article:published_time': post.date,
      'article:modified_time': post.modified || post.date,
    },
  };
}

// Add Schema.org structured data
function generateSchemaOrgData(post: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title.rendered.replace(/(<([^>]+)>)/gi, ''),
    description: post.content.rendered.replace(/(<([^>]+)>)/gi, '').slice(0, 160),
    image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/img/default-blog.jpg',
    datePublished: post.date,
    dateModified: post.modified || post.date,
    author: {
      '@type': 'Organization',
      name: 'Vegnar Green',
      url: 'https://www.vegnar.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Vegnar Green',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.vegnar.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.vegnar.com/blog/${post.slug}`,
    },
  };
}

export default async function BlogArticlePage({ params }: PageProps) {
  const post = await fetchPost(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = post.categories?.length > 0
    ? await fetchRelatedPosts(post.categories[0], post.id)
    : [];

  // Add the schema.org script to the page
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