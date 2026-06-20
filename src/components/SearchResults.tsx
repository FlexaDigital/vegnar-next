"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { decodeAndStripHtml } from "@/utils/wordpress";

interface Product {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  slug: string;
  featured_media: number;
  categories: number[];
  _embedded?: {
    "wp:term"?: Array<Array<{ name: string; slug: string }>>;
    "wp:featuredmedia"?: Array<{ source_url: string; alt_text: string }>;
  };
}

const SearchResults: React.FC = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const fetchSearchResults = async (searchQuery: string, page: number = 1) => {
    if (!searchQuery.trim()) {
      setProducts([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://cms.vegnar.com/wp-json/wp/v2/products?search=${encodeURIComponent(searchQuery)}&page=${page}&per_page=12&_embed=wp:term,wp:featuredmedia`
      );

      if (response.ok) {
        const data = await response.json();
        const totalPagesHeader = response.headers.get("X-WP-TotalPages");
        const totalResultsHeader = response.headers.get("X-WP-Total");

        setProducts(data);
        setTotalPages(parseInt(totalPagesHeader || "1"));
        setTotalResults(parseInt(totalResultsHeader || "0"));
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSearchResults(query, currentPage);
  }, [query, currentPage]);

  const getCategoryName = (product: Product): string => {
    return product._embedded?.["wp:term"]?.[0]?.[0]?.name || "";
  };

  const getCategorySlug = (product: Product): string => {
    return product._embedded?.["wp:term"]?.[0]?.[0]?.slug || "";
  };

  const getProductImage = (product: Product): string => {
    return (
      product._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
      "/assets/img/placeholder-product.jpg"
    );
  };

  const stripHtml = (html: string): string => {
    return decodeAndStripHtml(html).substring(0, 150);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin w-8 h-8 border-2 border-[#0D7B52] border-t-transparent rounded-full"></div>
        <span className="ml-3 text-gray-600">Searching products...</span>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Search Results for "{query}"
        </h1>
        <p className="text-gray-600">
          {totalResults > 0
            ? `Found ${totalResults} product${totalResults !== 1 ? "s" : ""}`
            : "No products found"}
        </p>
      </div>

      {products.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${getCategorySlug(product)}/${product.slug}`}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group"
              >
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={getProductImage(product)}
                    alt={decodeAndStripHtml(product.title.rendered)}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  />
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {decodeAndStripHtml(product.title?.rendered) || "Untitled Product"}
                  </h3>

                  {getCategoryName(product) && (
                    <span className="inline-block px-2 py-1 bg-[#0D7B52]/10 text-[#0D7B52] text-xs rounded-full mb-2">
                      {getCategoryName(product)}
                    </span>
                  )}

                  <p className="text-gray-600 text-sm line-clamp-3">
                    {stripHtml(product.excerpt?.rendered)}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum =
                  Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-3 py-2 rounded-md ${
                      currentPage === pageNum
                        ? "bg-[#0D7B52] text-white"
                        : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </>
      ) : query ? (
        <div className="text-center py-12">
          <div className="mb-4">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No products found
          </h3>
          <p className="text-gray-600 mb-4">
            We couldn't find any products matching "{query}". Try adjusting your
            search terms.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center px-4 py-2 bg-[#0D7B52] text-white rounded-md hover:bg-[#0a5a3a] transition-colors"
          >
            Browse All Products
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default SearchResults;
