'use client';

import React, { useEffect, useState } from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaPaperPlane,
} from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './SingleBlog.module.css';
import '@/app/blog/blog-global.css';
import { Post } from '@/types/blog';

interface Heading {
  level: number;
  id: string;
  text: string;
}

interface BlogArticleProps {
  post: Post;
  relatedPosts?: Post[];
}

export default function BlogArticle({ post, relatedPosts = [] }: BlogArticleProps) {
  const [tableOfContents, setTableOfContents] = useState<Heading[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (post?.content?.rendered) {
      const extractHeadings = () => {
        const content = post.content.rendered;
        const headings: Heading[] = [];
        const headingRegex = /<h([2-6])(.*?)>(.*?)<\/h\1>/gi;
        let match;

        while ((match = headingRegex.exec(content)) !== null) {
          const level = parseInt(match[1]);
          const text = match[3].replace(/<[^>]*>/g, '').trim();
          const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
          headings.push({ level, id, text });
        }
        setTableOfContents(headings);
      };

      extractHeadings();
    }
  }, [post]);

  const image = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/img/default-blog.jpg';
  const authorName = 'Vegnar Green';
  const authorImage = post._embedded?.author?.[0]?.avatar_urls?.['96'] || '/img/author-icon.png';
  const postDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-white text-gray-900 relative min-h-screen font-sans">
      {/* Hero Section */}
      <div className="relative min-h-[400px] w-full overflow-hidden mt-20">
        <div className="absolute inset-0">
          <Image
            src={image}
            alt={post.title.rendered}
            fill
            className="object-cover filter blur-sm"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-30" />
        </div>

        <div className="relative max-w-4xl mx-auto px-6 py-20">
          <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
            <span className="inline-block px-4 py-1 bg-green-50 text-green-600 rounded-full text-sm font-medium mb-4">
              BIODEGRADABLE LIVING
            </span>

            <h1
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />

            <div className="flex flex-wrap items-center gap-6 text-gray-600">
              <div className="flex items-center">
                <Image
                  src={authorImage}
                  alt="Author"
                  width={32}
                  height={32}
                  className="rounded-full mr-2"
                />
                <span className="font-medium">Author: {authorName}</span>
              </div>

              <div className="flex items-center">
                <span>{postDate}</span>
              </div>

              <div className="flex items-center">
                <span>Reading time: {Math.ceil(post.content.rendered.split(' ').length / 200)} min</span>
              </div>

              <div className="flex items-center space-x-4 ml-auto">
                <button
                  className="text-gray-600 hover:text-green-600 transition-colors"
                  aria-label="Share on Facebook"
                  onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                >
                  <FaFacebookF />
                </button>
                <button
                  className="text-gray-600 hover:text-green-600 transition-colors"
                  aria-label="Share on Twitter"
                  onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title.rendered)}`, '_blank')}
                >
                  <FaTwitter />
                </button>
                <button
                  className="text-gray-600 hover:text-green-600 transition-colors"
                  aria-label="Share on LinkedIn"
                  onClick={() => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post.title.rendered)}`, '_blank')}
                >
                  <FaLinkedinIn />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row lg:space-x-10 ${styles.mainContainer}`}>
        {/* Table of Contents */}
        {tableOfContents.length > 0 && (
          <nav
            aria-label="Table of contents"
            className={styles.tocNav}
          >
            <h2 className={styles.tocTitle}>Table of Contents</h2>
            <ul className={styles.tocList}>
              {tableOfContents.map((heading) => (
                <li
                  key={heading.id}
                  className={`${styles.tocListItem} ${styles[`ml${(heading.level - 2) * 2}`]}`}
                >
                  <a
                    href={`#${heading.id}`}
                    className={styles.tocLink}
                  >
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* Article Content */}
        <article className={`max-w-4xl mx-auto lg:mx-0 ${styles.article}`}>
          <div className={styles.contentWrapper}>
            <div
              className="prose max-w-none prose-green prose-img:rounded-lg prose-headings:scroll-mt-20"
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            />
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className="mt-16 border-t pt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <button
                    key={relatedPost.id}
                    onClick={() => {
                      setIsLoading(true);
                      router.push(`/blog/${relatedPost.slug}`);
                    }}
                    className="group relative bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="aspect-w-16 aspect-h-9 relative">
                      <Image
                        src={relatedPost._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/img/default-blog.jpg'}
                        alt={relatedPost.title.rendered}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3
                        className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: relatedPost.title.rendered }}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </section>
          )}
        </article>
      </main>

      {/* Newsletter Section */}
      <section className="mt-20 bg-[#f0f9f0] py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <h3 className="text-center font-semibold text-gray-900 mb-8 text-sm sm:text-base">
          Want More Green Ideas in Your Inbox?
        </h3>
        <p className="text-center text-sm text-gray-700 mb-6 max-w-md mx-auto">
          Join our newsletter for exclusive sustainability tips, product updates, and special offers.
        </p>
        <form
          className="flex flex-col sm:flex-row items-center max-w-md mx-auto space-y-3 sm:space-y-0 sm:space-x-3"
          onSubmit={(e) => {
            e.preventDefault();
            // Add newsletter subscription logic here
          }}
        >
          <input
            aria-label="Your Name"
            className="w-full sm:flex-1 rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
            placeholder="Your Name"
            required
            type="text"
          />
          <input
            aria-label="Your Email"
            className="w-full sm:flex-1 rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
            placeholder="Your Email"
            required
            type="email"
          />
          <button
            className="bg-green-600 text-white rounded px-4 py-2 text-sm font-semibold hover:bg-green-700 transition-colors"
            type="submit"
          >
            <FaPaperPlane className="w-4 h-4" />
          </button>
        </form>
      </section>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-600 border-t-transparent" />
        </div>
      )}
    </div>
  );
} 