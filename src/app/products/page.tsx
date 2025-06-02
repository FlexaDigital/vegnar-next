import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import CustomizationSection from '@/components/CustomizationSection';
import BecomePartnerSection from '@/components/BecomePartnerSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Eco-Friendly Products | Biodegradable Tableware & Bio Bags - Vegnar Green",
  description: "Discover our complete range of sustainable products including sugarcane bagasse tableware, areca palm leaf plates, bio bags, and compostable packaging solutions. All products are 100% biodegradable and food-safe certified.",
  keywords: [
    "biodegradable tableware",
    "eco-friendly products",
    "sugarcane bagasse plates",
    "bagasse bowls",
    "areca palm leaf plates",
    "compostable packaging",
    "bio bags",
    "sustainable food containers",
    "green packaging solutions",
    "biodegradable food packaging",
    "eco-friendly disposables",
    "compostable tableware",
    "zero waste products",
    "plastic-free packaging",
    "sustainable food service items",
    "vegnar green products",
    "environmentally friendly packaging",
    "green restaurant supplies",
    "biodegradable takeout containers",
    "eco-conscious business supplies"
  ],
  openGraph: {
    title: "Eco-Friendly Products | Biodegradable Tableware & Bio Bags",
    description: "Explore our complete range of sustainable products. From sugarcane bagasse tableware to bio bags - all 100% biodegradable and food-safe certified.",
    url: "https://www.vegnar.com/products",
    type: "website",
    siteName: "Vegnar Green",
    images: [
      {
        url: "https://www.vegnar.com/images/products-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Vegnar Green Sustainable Products Collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@VegnarGreens",
    creator: "@VegnarGreens",
    title: "Sustainable Products by Vegnar Green",
    description: "Browse our collection of eco-friendly tableware and packaging solutions. 100% biodegradable, food-safe, and planet-friendly.",
    images: ["https://www.vegnar.com/images/products-banner.jpg"],
  },
  alternates: {
    canonical: "https://www.vegnar.com/products",
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-video-preview': -1,
    'max-snippet': -1,
  },
};

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-[#f3faf5] text-[#0b3d13]">
      <div className="relative w-full h-[60vh] md:h-[50vh] lg:h-[45vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            alt="Wooden background with biodegradable tableware cups and a green bio bag"
            className="object-cover"
            src="https://storage.googleapis.com/a1aa/image/ba5fad0e-c316-4f95-abde-d7a964e58416.jpg"
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center px-4 text-center">
          <h1 className="font-extrabold text-white text-3xl sm:text-4xl md:text-5xl leading-tight max-w-3xl mb-4">
            Biodegradable Tableware &amp; Bio Bags
            <span className="block mt-2 text-[#9ee8b1]">
              Sustainable Living Starts Here
            </span>
          </h1>
          <p className="text-white/90 text-sm sm:text-base mt-2 max-w-md">
            Fresh, compostable choices for responsible living — made from nature, for nature.
          </p>
        </div>
      </div>

      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <section className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block bg-[#d9f0de] text-[#1a7a2b] text-sm font-semibold rounded-full px-4 py-1 mb-4">
              OUR PRODUCTS
            </span>
            <h2 className="text-[#0b3d13] font-bold text-2xl sm:text-3xl mb-3">
              Explore Our Product Range
            </h2>
            <p className="text-[#0b3d13]/80 text-sm sm:text-base">
              Eco-friendly essentials for a better tomorrow.
            </p>
          </section>

          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <article className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow flex flex-col items-center text-center">
              <div className="relative w-32 h-32 mb-6">
                <Image
                  alt="Sugarcane bagasse tableware set with bowls and plates on a peach background"
                  className="rounded-lg object-cover"
                  src="/assets/img/vegnar-sugarcane-bagasse.jpg"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <h3 className="font-semibold text-[#0b3d13] mb-2 text-lg">
                Sugarcane Bagasse Tableware
              </h3>
              <p className="text-[#0b3d13]/70 text-sm mb-6 max-w-xs">
                Compostable plates, bowls, and boxes crafted from renewable sugarcane fiber. Perfect for any occasion, guilt-free and sturdy.
              </p>
              <Link
                href="/products/bagasse-products"
                className="mt-auto bg-[#d9f0de] text-[#1a7a2b] font-semibold rounded-full px-5 py-2 flex items-center gap-2 text-sm hover:bg-[#c0e6c6] transition-colors"
              >
                View Products
                <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </article>

            <article className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow flex flex-col items-center text-center">
              <div className="relative w-32 h-32 mb-6">
                <Image
                  alt="Areca palm leaf tableware with green plates and bowls on a light wood background"
                  className="rounded-lg object-cover"
                  src="/assets/img/vegnar-areca-palm-tableware.jpg"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <h3 className="font-semibold text-[#0b3d13] mb-2 text-lg">
                Areca Palm Leaf Tableware
              </h3>
              <p className="text-[#0b3d13]/70 text-sm mb-6 max-w-xs">
                Natural palm leaf plates and trays — durable, compostable, and elegantly designed from fallen palm leaves, no chemicals added.
              </p>
              <Link
                href="/products/areca-palm-tableware"
                className="mt-auto bg-[#d9f0de] text-[#1a7a2b] font-semibold rounded-full px-5 py-2 flex items-center gap-2 text-sm hover:bg-[#c0e6c6] transition-colors"
              >
                View Products
                <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </article>

            <article className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow flex flex-col items-center text-center">
              <div className="relative w-32 h-32 mb-6">
                <Image
                  alt="Bio bags with white and green biodegradable bags on a light green background"
                  className="rounded-lg object-cover"
                  src="https://storage.googleapis.com/a1aa/image/da09a7ff-7b63-4262-1026-b048f781309f.jpg"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <h3 className="font-semibold text-[#0b3d13] mb-2 text-lg">
                Bio Bags
              </h3>
              <p className="text-[#0b3d13]/70 text-sm mb-6 max-w-xs">
                Strong, earth-friendly bags for shopping and disposal. 100% biodegradable, convenient, and safe for the planet.
              </p>
              <Link
                href="/products/bio-bags"
                className="mt-auto bg-[#d9f0de] text-[#1a7a2b] font-semibold rounded-full px-5 py-2 flex items-center gap-2 text-sm hover:bg-[#c0e6c6] transition-colors"
              >
                View Products
                <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </article>
          </section>

          <CustomizationSection />
          <BecomePartnerSection />
        </div>
      </div>
    </div>
  );
}