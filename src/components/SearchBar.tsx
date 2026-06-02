"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import { decodeAndStripHtml } from "@/utils/wordpress";

interface Product {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  slug: string;
  categories: number[];
  _embedded?: {
    "wp:term"?: Array<Array<{ name: string; slug: string }>>;
  };
}

interface SearchBarProps {
  className?: string;
  onItemClick?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ className = "", onItemClick }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const debouncedQuery = useDebounce(query, 300);

  // Fetch suggestions from WordPress API
  const fetchSuggestions = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://cms.vegnar.com/wp-json/wp/v2/products?search=${encodeURIComponent(searchQuery)}&per_page=8&_embed=wp:term`
      );

      if (response.ok) {
        const products = await response.json();
        setSuggestions(products);
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Effect for debounced search
  useEffect(() => {
    if (debouncedQuery) {
      fetchSuggestions(debouncedQuery);
      setIsOpen(true);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [debouncedQuery]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || suggestions.length === 0) {
      if (e.key === "Enter") {
        handleSearch();
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSuggestionClick(suggestions[selectedIndex]);
        } else {
          handleSearch();
        }
        break;
      case "Escape":
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const handleSuggestionClick = (product: Product) => {
    setQuery("");
    setIsOpen(false);
    setSelectedIndex(-1);
    onItemClick?.();
    // Get category slug from the first category
    const categorySlug = getCategorySlug(product);
    if (categorySlug) {
      router.push(`/products/${categorySlug}/${product.slug}`);
    } else {
      // Fallback to search results if no category
      router.push(
        `/search?q=${encodeURIComponent(decodeAndStripHtml(product.title?.rendered) || "")}`
      );
    }
  };

  const handleSearch = () => {
    if (query.trim()) {
      setIsOpen(false);
      onItemClick?.();
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const getCategoryName = (product: Product): string => {
    return product._embedded?.["wp:term"]?.[0]?.[0]?.name || "";
  };

  const getCategorySlug = (product: Product): string => {
    return product._embedded?.["wp:term"]?.[0]?.[0]?.slug || "";
  };

  const stripHtml = (html: string): string => {
    return decodeAndStripHtml(html).substring(0, 100);
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query && setIsOpen(true)}
          placeholder="Search products..."
          className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D7B52] focus:border-transparent"
          aria-label="Search products"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          role="combobox"
        />

        <button
          onClick={handleSearch}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-[#0D7B52]"
          aria-label="Search"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>

      {/* Suggestions Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">
              <div className="animate-spin w-5 h-5 border-2 border-[#0D7B52] border-t-transparent rounded-full mx-auto"></div>
              <span className="ml-2">Searching...</span>
            </div>
          ) : suggestions.length > 0 ? (
            <ul role="listbox">
              {suggestions.map((product, index) => (
                <li
                  key={product.id}
                  role="option"
                  aria-selected={selectedIndex === index}
                  className={`p-3 cursor-pointer border-b border-gray-100 last:border-b-0 hover:bg-gray-50 ${
                    selectedIndex === index ? "bg-gray-50" : ""
                  }`}
                  onClick={() => handleSuggestionClick(product)}
                >
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900 text-sm">
                      {decodeAndStripHtml(product.title?.rendered) || "Untitled Product"}
                    </span>

                    <span className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {stripHtml(product.excerpt?.rendered)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : query.trim() && !isLoading ? (
            <div className="p-4 text-center text-gray-500">
              <p>No products found for "{query}"</p>
              <button
                onClick={handleSearch}
                className="mt-2 text-[#0D7B52] text-sm"
              >
                Search all products
              </button>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
