"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ProductHeroProps {
  title: string;
  description: string;
  image: string; // ✅ renamed from imageSrc to image
  catalogButtonText: string;
  quoteButtonText: string;
  catalogUrl: string;
}

const ProductHero: React.FC<ProductHeroProps> = ({
  title,
  description,
  image,
  catalogButtonText,
  quoteButtonText,
  catalogUrl,
}) => {
  return (
    <div className="bg-[#E6FAF2] min-h-screen flex items-center" style={{height: '100vh', width: '100vw'}}>
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center md:items-stretch gap-8 md:gap-0">
        {/* Left Section: Text Content */}
        <div className="md:w-1/2 flex flex-col justify-center">
          <h1 className="text-[#0B4F3F] font-extrabold text-4xl leading-tight mb-4">
            {title}
          </h1>
          <p className="text-[#0B4F3F] text-lg mb-8 max-w-md">{description}</p>
          <div className="flex flex-wrap gap-4">
            <a href={catalogUrl} target="_blank" rel="noopener noreferrer">
              <button
                className="flex items-center gap-2 bg-[#0B4F3F] text-white font-semibold rounded-md px-6 py-3 hover:bg-[#0a4334] transition"
                type="button"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                {catalogButtonText}
              </button>
            </a>

            <Link href="/contact">
              <button
                className="flex items-center gap-2 border border-[#0B4F3F] text-[#0B4F3F] font-semibold rounded-md px-6 py-3 hover:bg-[#def3e7] transition"
                type="button"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2h-6l-4 4v-4H7a2 2 0 01-2-2v-2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                {quoteButtonText}
              </button>
            </Link>
          </div>
        </div>

        {/* Right Section: Image */}
        <div className="md:w-1/2 rounded-lg overflow-hidden pt-[80px]">
          {image ? (
            <Image
              alt={title}
              className="rounded-lg object-cover"
              src={image}
              width={500}
              height={300}
              priority
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ProductHero;
