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
