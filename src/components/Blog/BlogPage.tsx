"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useLoading } from "@/lib/context/LoadingContext";

import he from "he";

export interface Category {
  id: number;
  name: string;
  slug: string;
  count: number;
}

export interface Article {
  id: number;
  title: string;
  summary: string;
  url: string;
  image: string;
  alt: string;
  tag: string;
  readTime: string;
  slug: string;
}

export interface BlogPageProps {
  initialCategories?: Category[];
  initialArticles?: Article[];
  initialPage?: number;
  initialTag?: string;
  initialSearch?: string;
}

const decodeHtmlEntities = (text: string): string => {
  if (!text) return "";
  return he.decode(text);
};

const BlogPage: React.FC<BlogPageProps> = ({
  initialCategories = [],
  initialArticles = [],
  initialPage = 1,
  initialTag = "",
  initialSearch = "",
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setLoading } = useLoading();
  const [isInitialLoading, setIsInitialLoading] = useState(initialArticles.length === 0);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>(initialCategories);

  const [searchTerm, setSearchTerm] = useState<string>(initialSearch);
  const [selectedTag, setSelectedTag] = useState<string>(initialTag);
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const postsPerPage = 6;

  const updateUrlAndStorage = (page: number, tag: string, search: string) => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams();
    if (page > 1) {
      params.set("page", page.toString());
    }
    if (tag) {
      params.set("category", tag);
    }
    if (search.trim()) {
      params.set("q", search.trim());
    }

    const qs = params.toString();
    const newUrl = qs ? `/blog?${qs}` : "/blog";

    window.history.pushState(null, "", newUrl);

    sessionStorage.setItem("blog_current_page", page.toString());
    if (tag) {
      sessionStorage.setItem("blog_selected_tag", tag);
    } else {
      sessionStorage.removeItem("blog_selected_tag");
    }
    if (search.trim()) {
      sessionStorage.setItem("blog_search", search.trim());
    } else {
      sessionStorage.removeItem("blog_search");
    }
  };

  useEffect(() => {
    const pageParam = searchParams?.get("page");
    const tagParam = searchParams?.get("category");
    const qParam = searchParams?.get("q");

    if (pageParam) {
      const p = parseInt(pageParam, 10);
      if (!isNaN(p) && p > 0) {
        setCurrentPage(p);
        if (typeof window !== "undefined") {
          sessionStorage.setItem("blog_current_page", p.toString());
        }
      }
    } else if (typeof window !== "undefined") {
      const savedPage = sessionStorage.getItem("blog_current_page");
      const fromArticle = sessionStorage.getItem("blog_navigated_from_article");
      if (fromArticle === "true" && savedPage) {
        const p = parseInt(savedPage, 10);
        if (!isNaN(p) && p > 1) {
          setCurrentPage(p);
          const params = new URLSearchParams(window.location.search);
          params.set("page", p.toString());
          window.history.replaceState(null, "", `${window.location.pathname}?${params.toString()}`);
        }
      }
      sessionStorage.removeItem("blog_navigated_from_article");
    }

    if (tagParam !== null && tagParam !== undefined) {
      setSelectedTag(tagParam);
      if (typeof window !== "undefined") {
        if (tagParam) {
          sessionStorage.setItem("blog_selected_tag", tagParam);
        } else {
          sessionStorage.removeItem("blog_selected_tag");
        }
      }
    } else if (typeof window !== "undefined") {
      const savedTag = sessionStorage.getItem("blog_selected_tag");
      if (savedTag) {
        setSelectedTag(savedTag);
      }
    }

    if (qParam !== null && qParam !== undefined) {
      setSearchTerm(qParam);
    }
  }, [searchParams]);

  const fetchCategories = async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 20000);

      const response = await fetch(
        "https://cms.vegnar.com/wp-json/wp/v2/categories?per_page=100",
        {
          signal: controller.signal,
        }
      );
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const activeCategories = data.filter((cat: Category) => cat.count > 0);
      setCategories(activeCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchArticles = async () => {
    setIsInitialLoading(true);
    setError(null);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const response = await fetch(
        "https://cms.vegnar.com/wp-json/wp/v2/posts?_embed=wp:featuredmedia,wp:term&_fields=id,slug,title,excerpt,date,_links,_embedded&per_page=100",
        {
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      const formatted: Article[] = data.map((post: any) => ({
        id: post.id,
        title: decodeHtmlEntities(post.title?.rendered || ""),
        summary: decodeHtmlEntities((post.excerpt?.rendered || "").replace(/<[^>]+>/g, "")).slice(0, 120) + "...",
        url: `/blog/${post.slug}`,
        image: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "https://placehold.co/400x240/cccccc/333333?text=Vegnar+Blog",
        alt: post.title?.rendered || "Blog article",
        tag: post._embedded?.["wp:term"]?.[0]?.[0]?.name || "Blog",
        readTime: "3 min read",
        slug: post.slug,
      }));

      setArticles(formatted);
    } catch (error: any) {
      console.error("Error fetching blog data:", error);
      setError(
        error.name === "AbortError"
          ? "Request timed out. Please try again."
          : "Failed to load blog posts. Please try again later."
      );
    } finally {
      setIsInitialLoading(false);
    }
  };

  useEffect(() => {
    if (initialArticles.length > 0 && initialCategories.length > 0) {
      return;
    }

    if (categories.length === 0) {
      fetchCategories();
    }
    if (articles.length === 0) {
      fetchArticles();
    }
  }, [initialArticles, initialCategories]);

  const filteredArticles = articles.filter((article) => {
    const matchesSearchTerm =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === "" || article.tag === selectedTag;
    return matchesSearchTerm && matchesTag;
  });

  const totalPages = Math.ceil(filteredArticles.length / postsPerPage) || 1;
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

  const indexOfLastPost = safeCurrentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredArticles.slice(indexOfFirstPost, indexOfLastPost);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchTerm(val);
    setCurrentPage(1);
    updateUrlAndStorage(1, selectedTag, val);
  };

  const handleTagClick = (tag: string) => {
    const nextTag = selectedTag === tag ? "" : tag;
    setSelectedTag(nextTag);
    setCurrentPage(1);
    updateUrlAndStorage(1, nextTag, searchTerm);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    updateUrlAndStorage(pageNumber, selectedTag, searchTerm);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLinkClick = async (href: string) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("blog_current_page", safeCurrentPage.toString());
      if (selectedTag) {
        sessionStorage.setItem("blog_selected_tag", selectedTag);
      } else {
        sessionStorage.removeItem("blog_selected_tag");
      }
      sessionStorage.setItem("blog_navigated_from_article", "true");
    }
    setLoading(true);
    try {
      await router.push(href);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-[#f6fbf9] text-[#0f4d3f]">
      <div className="absolute inset-0 bg-[url('/assets/bg-green.png')] bg-repeat opacity-15 pointer-events-none" style={{backgroundSize: '200px'}}></div>
      <section className="relative bg-[#d9f1e3] py-12 px-4 sm:px-6 lg:px-8 text-center z-10">
        <h1 className="text-[#0f4d3f] font-extrabold text-xl sm:text-2xl md:text-3xl max-w-3xl mx-auto leading-tight">
          Green Insights – Biodegradable Living with Vegnar Green
        </h1>
        <p className="text-[#2f2f2f] mt-2 max-w-xl mx-auto text-sm sm:text-base">
          Tips, trends, and guides on biodegradable products and eco-conscious lifestyle.
        </p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mt-6 max-w-xl mx-auto relative"
        >
          <input
            className="w-full rounded-full border border-transparent focus:border-[#0f4d3f] focus:ring-2 focus:ring-[#0f4d3f] py-2 pl-4 pr-10 text-sm text-[#2f2f2f] placeholder:text-[#a3a3a3] shadow-sm"
            placeholder="Search blog posts..."
            type="search"
            value={searchTerm}
            onChange={handleSearch}
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0f4d3f] hover:text-[#0b3a2c]"
          >
            <i className="fas fa-search"></i>
          </button>
        </form>
        <nav className="mt-6 flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {categories.map((category) => (
            <a
              key={category.id}
              className={`flex items-center gap-1 cursor-pointer ${
                selectedTag === category.name
                  ? "bg-[#0f4d3f] text-white"
                  : "bg-[#d9f1e3] text-[#0f4d3f]"
              } text-xs rounded-full px-3 py-1 font-semibold hover:bg-[#c0e8d0] transition`}
              onClick={() => handleTagClick(category.name)}
            >
              {category.name.replace(/&amp;/g, '&')} ({category.count})
            </a>
          ))}
          <a
            className={`flex items-center gap-1 cursor-pointer ${
              selectedTag === ""
                ? "bg-[#0f4d3f] text-white"
                : "bg-[#d9f1e3] text-[#0f4d3f]"
            } text-xs rounded-full px-3 py-1 font-semibold hover:bg-[#c0e8d0] transition`}
            onClick={() => handleTagClick("")}
          >
            All
          </a>
        </nav>
      </section>
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 mb-16 grid grid-cols-1 lg:grid-cols-4 gap-8 z-10">
        <section className="lg:col-span-3 space-y-6">
          <h2 className="font-semibold text-[#0f4d3f] text-lg">Latest Articles</h2>
          {isInitialLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="bg-white rounded-lg shadow p-4 animate-pulse">
                  <div className="bg-gray-200 h-40 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={() => {
                  fetchCategories();
                  fetchArticles();
                }}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Try Again
              </button>
            </div>
          ) : currentPosts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {currentPosts.map((article) => (
                <article
                  key={article.id}
                  className="bg-white rounded-lg shadow p-4 flex flex-col cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => handleLinkClick(article.url)}
                >
                  <img
                    src={article.image}
                    alt={article.alt}
                    className="rounded mb-3 object-cover h-40 w-full"
                    height="240"
                    width="400"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "https://placehold.co/400x240/cccccc/333333?text=Image+Not+Found";
                      e.currentTarget.alt = "Placeholder image";
                    }}
                  />
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded mb-2 w-max">
                    {article.tag.replace(/&amp;/g, '&')}
                  </span>
                  <h3 className="text-base font-semibold mb-1">{article.title}</h3>
                  <p className="text-sm text-gray-600 flex-grow">{article.summary}</p>
                  <div className="mt-3 flex justify-between items-center text-sm text-green-700 font-semibold">
                    <span className=" ">
                      Read More →
                    </span>
                    <span>{article.readTime}</span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No articles found matching your criteria.</p>
            </div>
          )}

          {filteredArticles.length > postsPerPage && (
            <nav
              aria-label="Pagination"
              className="mt-6 flex justify-center items-center space-x-2 text-xs font-semibold text-[#0f4d3f]"
            >
              <button
                onClick={() => handlePageChange(safeCurrentPage - 1)}
                disabled={safeCurrentPage === 1}
                className="border border-[#0f4d3f] rounded px-2 py-1 hover:bg-[#0f4d3f] hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              {Array(totalPages)
                .fill(null)
                .map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    className={`rounded px-3 py-1 transition ${
                      safeCurrentPage === i + 1
                        ? "bg-[#0f4d3f] text-white"
                        : "border border-[#0f4d3f] hover:bg-[#0f4d3f] hover:text-white"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              <button
                onClick={() => handlePageChange(safeCurrentPage + 1)}
                disabled={safeCurrentPage === totalPages}
                className="border border-[#0f4d3f] rounded px-2 py-1 hover:bg-[#0f4d3f] hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </nav>
          )}
        </section>

        {/* Optional sidebar or CTA section */}
        <aside className="hidden lg:block">
          <div className="sticky top-20 space-y-6">
             <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex flex-col items-center text-center">
                <img 
                  alt="Tushar Hirani professional headshot" 
                  className="w-20 h-20 rounded-full object-cover mb-4 bg-gray-200" 
                  src="/assets/1745051915695.jfif" 
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "https://placehold.co/80x80/0f4d3f/ffffff?text=TH";
                  }}
                />
                <h3 className="text-lg font-semibold text-gray-900">
                  Tushar Hirani
                </h3>
                <p className="text-[#0f4d3f] font-medium text-sm mt-1">
                 Co - Founder & Sales Director at Vegnar Greens | Eco Entrepreneur 
                </p>
                <p className="mt-2 text-gray-700 text-xs leading-relaxed">
                  As Sales Director at Vegnar Greens, I lead our global sales and export strategies connecting Indian eco-friendly innovations with international buyers.
                </p>
                <a 
                  className="inline-flex items-center mt-3 text-blue-700 hover:text-blue-900 font-semibold text-sm" 
                  href="https://www.linkedin.com/in/hiranitushar/" 
                  rel="noopener noreferrer" 
                  target="_blank"
                >
                  <i className="fab fa-linkedin mr-2"></i>
                  View Profile
                </a>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex flex-col items-center text-center">
                <img 
                  alt="Ashiish Chauhan professional headshot" 
                  className="w-20 h-20 rounded-full object-cover mb-4 bg-gray-200" 
                  src="/assets/1720693421250.jfif" 
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "https://placehold.co/80x80/0f4d3f/ffffff?text=AC";
                  }}
                />
                <h3 className="text-lg font-semibold text-gray-900">
                  Ashish Chauhan
                </h3>
                <p className="text-[#0f4d3f] font-medium text-sm mt-1">
                  Co - Founder & COO at Vegnar Greens | Eco Entrepreneur 
                </p>
                <p className="mt-2 text-gray-700 text-xs leading-relaxed">
                  As Co-Founder & COO of Vegnar, I lead operations and global strategy for our biodegradable product exports, driving B2B growth and contributing to India's international trade ecosystem.
                </p>
                <a 
                  className="inline-flex items-center mt-3 text-blue-700 hover:text-blue-900 font-semibold text-sm" 
                  href="https://www.linkedin.com/in/ashiishchauhan/" 
                  rel="noopener noreferrer" 
                  target="_blank"
                >
                  <i className="fab fa-linkedin mr-2"></i>
                  View Profile
                </a>
              </div>
            </div>
            
          
            <div className="bg-[#eafaf1] p-4 rounded-lg shadow">
              <h3 className="font-semibold mb-2 text-[#0f4d3f]">Stay Connected</h3>
              <p className="text-sm text-[#2f2f2f]">
                Subscribe for updates and eco-living inspiration.
              </p>
              <form className="mt-3">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full rounded border border-[#0f4d3f] px-3 py-2 text-sm mb-2"
                />
                <button
                  type="submit"
                  className="w-full bg-[#0f4d3f] text-white rounded px-3 py-2 text-sm hover:bg-[#0b3a2c] transition"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default BlogPage; 