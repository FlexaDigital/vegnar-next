"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

import { FaBars, FaChevronDown, FaTimes } from "react-icons/fa";

import logo from "../../public/assets/img/vegnar-green.png";

interface ProductCategory {
  id: number;
  name: string;
  slug: string;
  parent: number;
}

interface HeaderProps {
  categories?: ProductCategory[];
}

const Header = ({ categories }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [productSubmenu, setProductSubmenu] = useState<ProductCategory[]>(categories || []);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!categories) {
      fetch("https://cms.vegnar.com/wp-json/wp/v2/product_category?per_page=100")
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            // Filter to get only parent categories (parent === 0)
            const parentCategories = data.filter((cat: ProductCategory) => cat.parent === 0);
            setProductSubmenu(parentCategories);
          }
        })
        .catch((err) => console.error("Error fetching categories:", err));
    }
  }, [categories]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
    setActiveDropdown(null);
  };

  const handleMouseEnter = (index: number) => setActiveDropdown(index);
  const handleMouseLeave = () => setActiveDropdown(null);
  const toggleDropdown = (index: number) =>
    setActiveDropdown((prev) => (prev === index ? null : index));

  const staticMenuItems = [
    { name: "About Us", link: "/about-us" },
    {
      name: "Sustainability",
      submenu: [{ name: "Eco Initiatives", link: "/sustainability/eco-initiatives" }],
    },
    { name: "Eco-Talks", link: "/blog" },
    { name: "Contact", link: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50 border-b border-gray-200 h-[var(--header-height)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          <div className="flex-shrink-0">
            <Link href="/" className="block">
              <Image
                src={logo}
                alt="Vegnar Greens Logo"
                height={40}
                width={120}
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-6">
            {/* Products Dynamic Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => handleMouseEnter(0)}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => toggleDropdown(0)}
                className="cursor-pointer flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-vegnar-green px-3 py-2 rounded-md"
              >
                <span>Products</span>
                <FaChevronDown
                  className={`text-xs transition-transform ${
                    activeDropdown === 0 ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`absolute left-0 top-full mt-0 w-64 bg-white rounded-md shadow-lg py-1 z-10 transition-all duration-200 ${
                  activeDropdown === 0 ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-1"
                }`}
              >
                <div className="absolute top-0 left-0 right-0 h-2 -translate-y-2" />
                {productSubmenu.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/products/${cat.slug}`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-vegnar-light hover:text-vegnar-green"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Other Static Menu Items */}
            {staticMenuItems.map((item, index) =>
              item.submenu ? (
                <div
                  key={index + 1}
                  className="relative group"
                  onMouseEnter={() => handleMouseEnter(index + 1)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    onClick={() => toggleDropdown(index + 1)}
                    className="cursor-pointer flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-vegnar-green px-3 py-2 rounded-md"
                  >
                    <span>{item.name}</span>
                    <FaChevronDown
                      className={`text-xs transition-transform ${
                        activeDropdown === index + 1 ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`absolute left-0 top-full mt-0 w-48 bg-white rounded-md shadow-lg py-1 z-10 transition-all duration-200 ${
                      activeDropdown === index + 1
                        ? "opacity-100 visible translate-y-0"
                        : "opacity-0 invisible -translate-y-1"
                    }`}
                  >
                    <div className="absolute top-0 left-0 right-0 h-2 -translate-y-2" />
                    {item.submenu.map((sub, i) => (
                      <Link
                        key={i}
                        href={sub.link}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-vegnar-light hover:text-vegnar-green"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={index + 1}
                  href={item.link}
                  className="text-sm font-medium text-gray-700 hover:text-vegnar-green px-3 py-2 rounded-md"
                >
                  {item.name}
                </Link>
              )
            )}
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              href="/partner"
              className="px-4 py-2 border border-vegnar-green rounded-full text-vegnar-green text-sm font-medium hover:bg-vegnar-light"
            >
              Become a Partner
            </Link>

            <Link
              href="/quote"
              className="px-4 py-2 bg-vegnar-green rounded-full text-white text-sm font-medium hover:bg-vegnar-green/90"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-green-900 hover:text-vegnar-green p-2 rounded-md"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <nav ref={mobileMenuRef} className="md:hidden bg-white border-t border-gray-200 shadow-md">
          <ul className="flex flex-col px-4 py-4 space-y-1">
            {/* Dynamic Products */}
            <li>
              <button
                onClick={() => toggleDropdown(0)}
                className="w-full flex justify-between items-center px-3 py-2 text-gray-700 hover:text-vegnar-green hover:bg-vegnar-light rounded-md font-medium"
              >
                <span>Products</span>
                <FaChevronDown
                  className={`text-xs transition-transform ${
                    activeDropdown === 0 ? "rotate-180" : ""
                  }`}
                />
              </button>
              {activeDropdown === 0 && (
                <ul className="pl-5 mt-1 space-y-1">
                  {productSubmenu.map((cat) => (
                    <li key={cat.id}>
                      <Link
                        href={`/products/${cat.slug}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-3 py-2 text-gray-700 hover:text-vegnar-green hover:bg-vegnar-light rounded-md"
                      >
                        {cat.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {/* Static Menu */}
            {staticMenuItems.map((item, index) =>
              item.submenu ? (
                <li key={index + 1}>
                  <button
                    onClick={() => toggleDropdown(index + 1)}
                    className="w-full flex justify-between items-center px-3 py-2 text-gray-700 hover:text-vegnar-green hover:bg-vegnar-light rounded-md font-medium"
                  >
                    <span>{item.name}</span>
                    <FaChevronDown
                      className={`text-xs transition-transform ${
                        activeDropdown === index + 1 ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {activeDropdown === index + 1 && (
                    <ul className="pl-5 mt-1 space-y-1">
                      {item.submenu.map((sub, i) => (
                        <li key={i}>
                          <Link
                            href={sub.link}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block px-3 py-2 text-gray-700 hover:text-vegnar-green hover:bg-vegnar-light rounded-md"
                          >
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={index + 1}>
                  <Link
                    href={item.link}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 text-gray-700 hover:text-vegnar-green hover:bg-vegnar-light rounded-md font-medium"
                  >
                    {item.name}
                  </Link>
                </li>
              )
            )}

            {/* Buttons */}
            <li>
              <Link
                href="/partner"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block mt-4 px-4 py-2 border border-vegnar-green rounded-full text-center text-vegnar-green font-medium hover:bg-vegnar-light"
              >
                Become a Partner
              </Link>
            </li>
            <li>
              <Link
                href="/quote"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block mt-2 px-4 py-2 bg-vegnar-green rounded-full text-center text-white font-medium hover:bg-vegnar-green/90"
              >
                Get a Quote
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;

