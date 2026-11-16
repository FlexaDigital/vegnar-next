"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaLinkedinIn, FaNewspaper, FaLeaf, FaArrowLeft, FaSearch } from "react-icons/fa";
import { useLoading } from "@/lib/context/LoadingContext";
import { AuthorProfile } from "@/lib/authors";
import { Article, Category } from "@/components/Blog/BlogPage";

interface AuthorProfilePageProps {
  author: AuthorProfile;
  initialArticles: Article[];
  categories: Category[];
  allAuthors?: AuthorProfile[];
}

const AuthorProfilePage: React.FC<AuthorProfilePageProps> = ({
  author,
  initialArticles = [],
  categories = [],
  allAuthors = [],
}) => {
  const router = useRouter();
  const { setLoading } = useLoading();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 6;

  // Filter categories to only those that have articles by this author
  const authorCategories = categories.filter((cat) =>
    initialArticles.some((art) => art.tag.toLowerCase() === cat.name.toLowerCase())
  );

  const filteredArticles = initialArticles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === "" || article.tag === selectedTag;
    return matchesSearch && matchesTag;
  });

  const totalPages = Math.ceil(filteredArticles.length / postsPerPage) || 1;
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

  const indexOfLastPost = safeCurrentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredArticles.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  const handleTagClick = (tag: string) => {
    setSelectedTag(selectedTag === tag ? "" : tag);
    setCurrentPage(1);
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
    <div className="relative bg-[#f6fbf9] text-[#0f4d3f] min-h-screen">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 bg-[url('/assets/bg-green.png')] bg-repeat opacity-15 pointer-events-none"
        style={{ backgroundSize: "200px" }}
      />

      {/* Top Breadcrumb & Navigation */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <nav className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-green-800 transition">
            Home
          </Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-green-800 transition">
            Blog
          </Link>
          <span>/</span>
          <span className="text-[#0f4d3f] font-semibold">{author.name}</span>
        </nav>

        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0f4d3f] hover:text-[#0b3a2c] bg-white border border-green-200 hover:border-green-400 px-4 py-2 rounded-full transition shadow-sm mb-6"
        >
          <FaArrowLeft className="text-xs" /> Back to All Articles
        </Link>
      </div>

      {/* Author Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="bg-gradient-to-br from-[#d9f1e3] via-[#e8f7ee] to-white rounded-3xl p-6 sm:p-10 shadow-lg border border-[#c5e8d2] relative overflow-hidden">
          {/* Subtle decorative leaf watermark */}
          <div className="absolute -right-12 -bottom-12 opacity-10 pointer-events-none">
            <FaLeaf className="text-green-900 text-9xl" />
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
            {/* Author Avatar */}
            <div className="flex-shrink-0 text-center">
              <div className="relative inline-block">
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-white shadow-xl bg-white"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src =
                      "https://placehold.co/160x160/0f4d3f/ffffff?text=" +
                      author.name.charAt(0);
                  }}
                />
                <span
                  className="absolute bottom-2 right-2 bg-green-600 text-white p-2 rounded-full shadow-md"
                  title="Verified Author"
                >
                  <FaLeaf className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* Author Details */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-2">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-green-700 bg-green-100 px-3 py-1 rounded-full">
                    Author Profile
                  </span>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">
                    {author.name}
                  </h1>
                </div>

                {author.linkedin && (
                  <div>
                    <a
                      href={author.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#0077b5] hover:bg-[#005f93] text-white px-4 py-2 rounded-full text-xs font-semibold shadow transition"
                    >
                      <FaLinkedinIn /> Connect on LinkedIn
                    </a>
                  </div>
                )}
              </div>

              <p className="text-sm sm:text-base font-semibold text-[#0f4d3f] mb-3">
                {author.role}
              </p>

              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed max-w-3xl mb-6">
                {author.bio}
              </p>

              {/* Author Stat Badges */}
              <div className="flex flex-wrap justify-center md:justify-start gap-3 text-xs font-semibold">
                <div className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full border border-green-200 text-[#0f4d3f] shadow-sm">
                  <FaNewspaper className="text-green-600" />
                  <span>{initialArticles.length} Published Articles</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full border border-green-200 text-[#0f4d3f] shadow-sm">
                  <FaLeaf className="text-green-600" />
                  <span>Biodegradable & Sustainable Living</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content: Articles & Sidebar */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 grid grid-cols-1 lg:grid-cols-4 gap-8 z-10">
        <section className="lg:col-span-3 space-y-6">
          {/* Header & Search */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-gray-200">
            <div>
              <h2 className="font-bold text-xl sm:text-2xl text-[#0f4d3f]">
                Articles by {author.name}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                Showing {filteredArticles.length} article
                {filteredArticles.length !== 1 ? "s" : ""}
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <input
                type="search"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full rounded-full border border-gray-300 focus:border-[#0f4d3f] focus:ring-2 focus:ring-[#0f4d3f] py-2 pl-4 pr-9 text-xs sm:text-sm text-[#2f2f2f] placeholder:text-[#a3a3a3] shadow-sm bg-white"
              />
              <FaSearch className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
            </div>
          </div>

          {/* Category Filters */}
          {authorCategories.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                onClick={() => handleTagClick("")}
                className={`text-xs rounded-full px-3.5 py-1.5 font-semibold transition ${
                  selectedTag === ""
                    ? "bg-[#0f4d3f] text-white shadow-sm"
                    : "bg-[#d9f1e3] text-[#0f4d3f] hover:bg-[#c0e8d0]"
                }`}
              >
                All Categories ({initialArticles.length})
              </button>
              {authorCategories.map((cat) => {
                const count = initialArticles.filter(
                  (a) => a.tag.toLowerCase() === cat.name.toLowerCase()
                ).length;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleTagClick(cat.name)}
                    className={`text-xs rounded-full px-3.5 py-1.5 font-semibold transition ${
                      selectedTag === cat.name
                        ? "bg-[#0f4d3f] text-white shadow-sm"
                        : "bg-[#d9f1e3] text-[#0f4d3f] hover:bg-[#c0e8d0]"
                    }`}
                  >
                    {cat.name.replace(/&amp;/g, "&")} ({count})
                  </button>
                );
              })}
            </div>
          )}

          {/* Articles Grid */}
          {currentPosts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-2">
              {currentPosts.map((article) => (
                <article
                  key={article.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
                  onClick={() => handleLinkClick(article.url)}
                >
                  <div className="overflow-hidden rounded-lg mb-3 relative">
                    <img
                      src={article.image}
                      alt={article.alt}
                      className="rounded-lg object-cover h-44 w-full group-hover:scale-105 transition-transform duration-300"
                      height="240"
                      width="400"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src =
                          "https://placehold.co/400x240/cccccc/333333?text=Vegnar+Blog";
                      }}
                    />
                    <span className="absolute top-2 left-2 text-[11px] font-semibold bg-white/95 text-green-900 px-2.5 py-1 rounded-full shadow-sm backdrop-blur-sm">
                      {article.tag.replace(/&amp;/g, "&")}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-gray-900 group-hover:text-green-700 transition-colors line-clamp-2 mb-2 leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 mb-4 flex-grow">
                    {article.summary}
                  </p>

                  <div className="mt-auto pt-3 border-t border-gray-100 flex justify-between items-center text-xs font-semibold text-green-700">
                    <span className="group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      Read Article →
                    </span>
                    <span className="text-gray-500 font-normal">{article.readTime}</span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
              <FaSearch className="text-gray-300 text-4xl mx-auto mb-3" />
              <p className="text-gray-700 font-semibold mb-1">No articles found</p>
              <p className="text-gray-500 text-xs sm:text-sm mb-4">
                No articles match your current search or category filter.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedTag("");
                }}
                className="text-xs font-bold text-green-700 hover:text-green-900 underline"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Pagination */}
          {filteredArticles.length > postsPerPage && (
            <nav
              aria-label="Pagination"
              className="mt-8 flex justify-center items-center space-x-2 text-xs font-semibold text-[#0f4d3f]"
            >
              <button
                onClick={() => handlePageChange(safeCurrentPage - 1)}
                disabled={safeCurrentPage === 1}
                className="border border-[#0f4d3f] rounded px-3 py-1.5 hover:bg-[#0f4d3f] hover:text-white transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                ← Prev
              </button>
              {Array(totalPages)
                .fill(null)
                .map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    className={`rounded px-3.5 py-1.5 transition ${
                      safeCurrentPage === i + 1
                        ? "bg-[#0f4d3f] text-white shadow-sm"
                        : "border border-[#0f4d3f] hover:bg-[#0f4d3f] hover:text-white"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              <button
                onClick={() => handlePageChange(safeCurrentPage + 1)}
                disabled={safeCurrentPage === totalPages}
                className="border border-[#0f4d3f] rounded px-3 py-1.5 hover:bg-[#0f4d3f] hover:text-white transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next →
              </button>
            </nav>
          )}
        </section>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Other Authors Card */}
          {allAuthors.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-bold text-base text-[#0f4d3f] mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                <FaLeaf className="text-green-600 text-sm" /> Other Authors
              </h3>
              <div className="space-y-4">
                {allAuthors
                  .filter((a) => a.slug !== author.slug)
                  .map((other) => (
                    <Link
                      key={other.slug}
                      href={`/blog/author/${other.slug}`}
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-green-50 transition group"
                    >
                      <img
                        src={other.avatar}
                        alt={other.name}
                        className="w-12 h-12 rounded-full object-cover border border-green-200 flex-shrink-0"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src =
                            "https://placehold.co/48x48/0f4d3f/ffffff?text=" +
                            other.name.charAt(0);
                        }}
                      />
                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm font-bold text-gray-900 group-hover:text-green-700 transition truncate">
                          {other.name}
                        </h4>
                        <p className="text-xs text-gray-500 line-clamp-1">{other.role}</p>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          )}

          {/* Stay Connected Newsletter */}
          <div className="bg-gradient-to-br from-[#eafaf1] to-[#d9f1e3] p-6 rounded-2xl shadow-sm border border-[#c0e8d0]">
            <h3 className="font-bold text-base mb-1.5 text-[#0f4d3f]">
              Stay Connected
            </h3>
            <p className="text-xs sm:text-sm text-[#2f2f2f] mb-4 leading-relaxed">
              Subscribe for regular updates on sustainable living, biodegradable tableware, and eco-innovations.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2.5">
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="w-full rounded-full border border-[#0f4d3f] px-4 py-2 text-xs sm:text-sm shadow-sm bg-white"
              />
              <button
                type="submit"
                className="w-full bg-[#0f4d3f] text-white rounded-full px-4 py-2 text-xs sm:text-sm font-semibold hover:bg-[#0b3a2c] transition shadow"
              >
                Subscribe
              </button>
            </form>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default AuthorProfilePage;
