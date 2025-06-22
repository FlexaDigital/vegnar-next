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

  const slug = post.slug;
  const canonicalUrl = `${PUBLIC_SITE_URL}/blog/${slug}`;

  // Fetch Rank Math metadata
  let rankMathData: any = null;
  try {
    const rmRes = await fetch(
      `https://cms.vegnar.com/wp-json/rankmath/v1/getHead?url=${encodeURIComponent(canonicalUrl)}`,
      { next: { revalidate: 60 } }
    );
    if (rmRes.ok) {
      rankMathData = await rmRes.json();
    }
  } catch (err) {
    console.error('Error fetching Rank Math metadata:', err);
  }

  // Parse Rank Math data if available
  let title = post.title?.rendered?.replace(/(<([^>]+)>)/gi, '');
  let description = post.content?.rendered?.replace(/(<([^>]+)>)/gi, '').slice(0, 160);
  let featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
  let keywords = Array.isArray(post.tags) ? post.tags.map((tag: any) => tag.name).join(', ') : '';

  if (rankMathData && rankMathData.head) {
    // Try to extract from Rank Math head string
    const head = rankMathData.head;
    // Helper function to extract meta tag content
    function extractMeta(nameOrProp, value) {
      const metaRegex = new RegExp(`<meta (?:name|property)=["']${nameOrProp}["'] content=["']([^"']*)["']`, 'i');
      const match = head.match(metaRegex);
      return match ? match[1] : undefined;
    }
    // Helper function to extract link rel canonical
    function extractCanonical() {
      const canonicalRegex = /<link rel=["']canonical["'] href=["']([^"']*)["']/i;
      const match = head.match(canonicalRegex);
      return match ? match[1] : undefined;
    }
    // Helper function to extract title
    function extractTitle() {
      const ogTitle = extractMeta('og:title');
      if (ogTitle) return ogTitle;
      const twitterTitle = extractMeta('twitter:title');
      if (twitterTitle) return twitterTitle;
      const titleTag = head.match(/<title>(.*?)<\/title>/i);
      if (titleTag) return titleTag[1];
      return undefined;
    }
    // Helper function to extract author
    function extractAuthor() {
      const twitterAuthor = extractMeta('twitter:data1');
      if (twitterAuthor) return twitterAuthor;
      const authorMeta = extractMeta('author');
      if (authorMeta) return authorMeta;
      return post._embedded?.author?.[0]?.name || 'Vegnar Green';
    }
    // Extract all fields
    title = extractTitle() || title;
    description = extractMeta('description') || description;
    featuredImage = extractMeta('og:image') || extractMeta('twitter:image') || featuredImage;
    // Extract keywords from <meta name="keywords"> and all <meta property="article:tag"> tags
    let keywordList = [];
    const keywordsMeta = extractMeta('keywords');
    if (keywordsMeta) keywordList = keywordsMeta.split(',').map(k => k.trim()).filter(Boolean);
    // Extract all article:tag meta tags
    const articleTagRegex = /<meta property=["']article:tag["'] content=["']([^"']*)["']/gi;
    let tagMatch;
    while ((tagMatch = articleTagRegex.exec(head)) !== null) {
      if (tagMatch[1]) keywordList.push(tagMatch[1].trim());
    }
    // Remove duplicates and join
    keywords = Array.from(new Set(keywordList)).join(', ');
    const robots = extractMeta('robots');
    const canonical = extractCanonical();
    const ogUrl = extractMeta('og:url');
    const author = extractAuthor();

    // Overwrite metadata fields if available
    metadata.title = title || undefined;
    metadata.description = description || undefined;
    metadata.alternates = { canonical: canonical || ogUrl || canonicalUrl };
    metadata.openGraph = {
      ...metadata.openGraph,
      title: title || undefined,
      description: description || undefined,
      url: ogUrl || canonicalUrl,
      images: featuredImage ? [
        {
          url: featuredImage,
          width: 1200,
          height: 630,
          alt: title || '',
        },
      ] : undefined,
    };
    metadata.twitter = {
      ...metadata.twitter,
      title: title || undefined,
      description: description || undefined,
      images: featuredImage ? [featuredImage] : undefined,
    };
    metadata.robots = robots
      ? robots.split(',').reduce((acc, v) => {
          const [key, val] = v.trim().split(':');
          if (val) acc[key.toLowerCase()] = val;
          else acc[v.trim().toLowerCase()] = true;
          return acc;
        }, {})
      : metadata.robots;
    metadata.authors = [{ name: author }];
    metadata.keywords = keywords || undefined;
  }

  // Only return title, description, and keywords
  // Explicitly override all metadata fields to prevent layout defaults
  return {
    title: '',
    description: '',
    keywords: '',
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
