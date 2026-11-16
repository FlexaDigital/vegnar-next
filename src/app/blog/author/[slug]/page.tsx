import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import AuthorProfilePage from '@/components/Blog/AuthorProfilePage';
import { Article, Category } from '@/components/Blog/BlogPage';
import { getAuthorProfile, KNOWN_AUTHORS, AuthorProfile } from '@/lib/authors';
import { SITE_CONFIG } from '@/lib/constants';
import { decodeAndStripHtml } from '@/utils/wordpress';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const PUBLIC_SITE_URL = SITE_CONFIG.BASE_URL;

async function fetchAuthorArticles(authorId: number): Promise<Article[]> {
  const timeout = 25000;
  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    const url =
      authorId > 0
        ? `https://cms.vegnar.com/wp-json/wp/v2/posts?author=${authorId}&_embed=wp:featuredmedia,wp:term,author&_fields=id,slug,title,excerpt,date,author,_links,_embedded&per_page=100`
        : `https://cms.vegnar.com/wp-json/wp/v2/posts?_embed=wp:featuredmedia,wp:term,author&_fields=id,slug,title,excerpt,date,author,_links,_embedded&per_page=100`;

    const res = await fetch(url, {
      signal: controller.signal,
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    clearTimeout(id);

    if (!res.ok) {
      console.error(`Failed to fetch author articles: ${res.status}`);
      return [];
    }

    const data = await res.json();

    return data.map((post: any) => ({
      id: post.id,
      title: decodeAndStripHtml(post.title?.rendered || ''),
      summary: decodeAndStripHtml(post.excerpt?.rendered || '').slice(0, 120) + '...',
      url: `/blog/${post.slug}`,
      image:
        post._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
        'https://placehold.co/400x240/cccccc/333333?text=Vegnar+Blog',
      alt: decodeAndStripHtml(post.title?.rendered || 'Blog article'),
      tag: post._embedded?.['wp:term']?.[0]?.[0]?.name || 'Blog',
      readTime: '3 min read',
      slug: post.slug,
    }));
  } catch (err) {
    console.error('Error fetching author articles:', err);
    return [];
  }
}

async function fetchCategories(): Promise<Category[]> {
  try {
    const res = await fetch('https://cms.vegnar.com/wp-json/wp/v2/categories?per_page=100', {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.filter((cat: any) => cat.count > 0);
  } catch (err) {
    console.error('Error fetching categories:', err);
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthorProfile(slug);

  const title = `${author.name} — Author at Vegnar Green`;
  const description = `Read articles, eco-tableware innovations, and green packaging insights by ${author.name} on the Vegnar Green Blog.`;
  const canonicalUrl = `${PUBLIC_SITE_URL}/blog/author/${author.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'profile',
      siteName: 'Vegnar Green',
      images: [
        {
          url: author.avatar.startsWith('http') ? author.avatar : `${PUBLIC_SITE_URL}${author.avatar}`,
          width: 400,
          height: 400,
          alt: author.name,
        },
      ],
    },
    twitter: {
      card: 'summary',
      title,
      description,
      images: [author.avatar.startsWith('http') ? author.avatar : `${PUBLIC_SITE_URL}${author.avatar}`],
    },
  };
}

export default async function AuthorPage({ params }: PageProps) {
  const { slug } = await params;
  const author = getAuthorProfile(slug);

  if (!author) {
    notFound();
  }

  const [articles, categories] = await Promise.all([
    fetchAuthorArticles(author.id),
    fetchCategories(),
  ]);

  const allAuthors = Object.values(KNOWN_AUTHORS);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: author.name,
      jobTitle: author.role,
      description: author.bio,
      image: author.avatar.startsWith('http') ? author.avatar : `${PUBLIC_SITE_URL}${author.avatar}`,
      sameAs: author.linkedin ? [author.linkedin] : [],
      worksFor: {
        '@type': 'Organization',
        name: 'Vegnar Green',
        url: PUBLIC_SITE_URL,
      },
    },
  };

  return (
    <>
      <Script
        id="author-profile-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AuthorProfilePage
        author={author}
        initialArticles={articles}
        categories={categories}
        allAuthors={allAuthors}
      />
    </>
  );
}
