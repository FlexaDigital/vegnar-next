'use client';

import React, { useEffect, useState, useRef } from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
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
  const [activeId, setActiveId] = useState<string>('');
  const contentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (post?.content?.rendered && contentRef.current) {
      // First, modify the content to add IDs to headings
      const content = post.content.rendered;
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = content;

      const headings = tempDiv.querySelectorAll('h2, h3, h4, h5, h6');
      const toc: Heading[] = [];

      headings.forEach((heading) => {
        const level = parseInt(heading.tagName[1]);
        const text = heading.textContent || '';
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        
        // Add ID to the heading in the content
        heading.id = id;
        
        toc.push({ level, id, text });
      });

      // Update the content with IDs
      contentRef.current.innerHTML = tempDiv.innerHTML;
      setTableOfContents(toc);

      // Set up intersection observer for headings
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(entry.target.id);
            }
          });
        },
        {
          rootMargin: '-100px 0px -66%',
        }
      );

      // Observe all headings
      headings.forEach((heading) => {
        observer.observe(heading);
      });

      return () => {
        observer.disconnect();
      };
    }
  }, [post]);

  const handleTocClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const header = document.querySelector('header');
      const headerHeight = header ? header.offsetHeight : 80;
      const yOffset = -(headerHeight + 20); // Add some extra padding
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
      
      // Update active ID
      setActiveId(id);
    }
  };

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

            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
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
      <main className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row lg:space-x-10 ${styles.mainContainer}`}>
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
                  className={`${styles.tocListItem} ${styles[`ml${(heading.level - 2) * 2}`]} ${
                    activeId === heading.id ? styles.active : ''
                  }`}
                >
                  <a
                    href={`#${heading.id}`}
                    className={styles.tocLink}
                    onClick={(e) => handleTocClick(e, heading.id)}
                  >
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* Article Content */}
        <article className={`flex-1 ${styles.contentWrapper}`}>
          <div
            ref={contentRef}
            className={`prose max-w-none prose-green prose-headings:scroll-mt-20 ${styles.article}`}
          />

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
    </div>
  );
} 