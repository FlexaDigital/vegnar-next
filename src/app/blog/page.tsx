"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLoading } from "@/lib/context/LoadingContext";
import Head from "next/head";

<Head>
  <title>Blog - Green Insights | Vegnar Greens</title>
  <meta
    name="description"
    content="Discover biodegradable innovations, eco-living tips, and green product guides from Vegnar Greens' expert blog."
  />
  <link rel="canonical" href="https://www.vegnar.com/blog" />
</Head>

interface Category {
  id: number;
  name: string;
  slug: string;
  count: number;
}

interface Article {
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

const Blog: React.FC = () => {
  const router = useRouter();
  const { setLoading } = useLoading();
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [articles, setArticles] = useState<Article[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 6;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://cms.vegnar.com/wp-json/wp/v2/categories?per_page=100",
          {
            next: { revalidate: 60 } // Cache for 1 minute
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        // Filter out categories with no posts
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
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        const response = await fetch(
          "https://cms.vegnar.com/wp-json/wp/v2/posts?_embed",
          {
            signal: controller.signal,
            next: { revalidate: 60 }
          }
        );

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        const formatted: Article[] = data.map((post: any) => ({
          id: post.id,
          title: post.title.rendered,
          summary: post.excerpt.rendered.replace(/<[^>]+>/g, "").slice(0, 120) + "...",
          url: `/blog/${post.slug}`,
          image: post._embedded["wp:featuredmedia"]?.[0]?.source_url || "https://via.placeholder.com/400x240",
          alt: post.title.rendered,
          tag: post._embedded["wp:term"]?.[0]?.[0]?.name || "Blog",
          readTime: `${Math.ceil(post.content.rendered.split(" ").length / 200)} min read`,
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

    fetchCategories();
    fetchArticles();
  }, []);

  const filteredArticles = articles.filter((article) => {
    const matchesSearchTerm =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === "" || article.tag === selectedTag;
    return matchesSearchTerm && matchesTag;
  });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredArticles.slice(indexOfFirstPost, indexOfLastPost);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLinkClick = async (href: string) => {
    setLoading(true);
    try {
      await router.push(href);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f6fbf9] text-[#0f4d3f] pt-[50px]">
      <section className="bg-[#d9f1e3] py-12 px-4 sm:px-6 lg:px-8 text-center">
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
              {category.name} ({category.count})
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 mb-16 grid grid-cols-1 lg:grid-cols-4 gap-8">
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
                onClick={() => window.location.reload()}
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
                  className="bg-white rounded-lg shadow p-4 flex flex-col"
                >
                  <img
                    src={article.image}
                    alt={article.alt}
                    className="rounded mb-3 object-cover h-40 w-full"
                    height="240"
                    width="400"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = "https://placehold.co/400x240/cccccc/333333?text=Image+Not+Found";
                      e.currentTarget.alt = "Placeholder image";
                    }}
                  />
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded mb-2 w-max">
                    {article.tag}
                  </span>
                  <h3 className="text-base font-semibold mb-1">{article.title}</h3>
                  <p className="text-sm text-gray-600 flex-grow">{article.summary}</p>
                  <div className="mt-3 flex justify-between items-center text-sm text-green-700 font-semibold">
                    <Link href={article.url} onClick={() => handleLinkClick(article.url)} className="hover:underline">
                      Read More →
                    </Link>
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
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="border border-[#0f4d3f] rounded px-2 py-1 hover:bg-[#0f4d3f] hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              {Array(Math.ceil(filteredArticles.length / postsPerPage))
                .fill(null)
                .map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    className={`rounded px-3 py-1 transition ${
                      currentPage === i + 1
                        ? "bg-[#0f4d3f] text-white"
                        : "border border-[#0f4d3f] hover:bg-[#0f4d3f] hover:text-white"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === Math.ceil(filteredArticles.length / postsPerPage)}
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

export default Blog;
