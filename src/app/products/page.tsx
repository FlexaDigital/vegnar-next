import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faUtensils, faBowlFood, faBowlRice, faBox, faBurger, faPlateWheat, faMugHot, faLeaf, faDumbbell, faRecycle } from '@fortawesome/free-solid-svg-icons';
import CustomizationSection from '@/components/CustomizationSection';
import BecomePartnerSection from '@/components/BecomePartnerSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Sugarcane Bagasse Tableware | Biodegradable Plates, Bowls & Containers - Vegnar Green",
  description: "Premium sugarcane bagasse tableware including eco-friendly plates, bowls, meal trays, and takeaway containers. 100% compostable, microwave-safe, and FDA approved biodegradable products made from agricultural waste.",
  keywords: [
    "sugarcane bagasse tableware",
    "bagasse plates",
    "bagasse bowls",
    "bagasse meal trays",
    "bagasse containers",
    "biodegradable plates",
    "compostable tableware",
    "eco-friendly disposables",
    "microwave safe plates",
    "FDA approved tableware",
    "sustainable food packaging",
    "agricultural waste products",
    "plastic-free tableware",
    "restaurant supplies",
    "takeaway containers",
    "food service packaging",
    "green packaging solutions",
    "zero waste products",
    "vegnar bagasse products",
    "biodegradable food containers"
  ],
  openGraph: {
    title: "Sugarcane Bagasse Tableware | Premium Biodegradable Products",
    description: "Discover our premium sugarcane bagasse tableware collection. Microwave-safe, compostable plates, bowls, and containers made from agricultural waste.",
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
    title: "Sugarcane Bagasse Tableware by Vegnar Green",
    description: "Premium bagasse plates, bowls, and containers. Microwave-safe, compostable, and made from renewable sugarcane waste.",
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

export default function ProductsPage() {
  return (
    <>
      <Script
        id="products-json-ld-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "CollectionPage",
                "url": "https://www.vegnar.com/products/bagasse-products",
                "name": "Sugarcane Bagasse Tableware Products — Vegnar Green Wholesale Manufacturer",
                "description": "Complete range of biodegradable bagasse tableware: plates, bowls, clamshells, meal trays, takeaway containers and sipper lids. FDA-approved, SGS-tested. Export worldwide.",
                "breadcrumb": {
                  "@type": "BreadcrumbList",
                  "itemListElement": [
                    {
                      "@type": "ListItem",
                      "position": 1,
                      "name": "Home",
                      "item": "https://www.vegnar.com/"
                    },
                    {
                      "@type": "ListItem",
                      "position": 2,
                      "name": "All Products",
                      "item": "https://www.vegnar.com/products/bagasse-products"
                    }
                  ]
                }
              },
              {
                "@type": "ItemList",
                "name": "Bagasse Tableware Product Categories",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Biodegradable Round Plates",
                    "url": "https://www.vegnar.com/products/round-plates"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Compostable Bagasse Bowls",
                    "url": "https://www.vegnar.com/products/bowls"
                  },
                  {
                    "@type": "ListItem",
                    "position": 3,
                    "name": "Eco-Friendly Clamshell Containers",
                    "url": "https://www.vegnar.com/products/clamshells"
                  },
                  {
                    "@type": "ListItem",
                    "position": 4,
                    "name": "Sugarcane Bagasse Meal Trays",
                    "url": "https://www.vegnar.com/products/meal-trays"
                  },
                  {
                    "@type": "ListItem",
                    "position": 5,
                    "name": "Biodegradable Takeaway Containers",
                    "url": "https://www.vegnar.com/products/takeaway-container"
                  },
                  {
                    "@type": "ListItem",
                    "position": 6,
                    "name": "Bagasse Sipper Lids",
                    "url": "https://www.vegnar.com/products/sipper-lid"
                  },
                  {
                    "@type": "ListItem",
                    "position": 7,
                    "name": "Bagasse Trays",
                    "url": "https://www.vegnar.com/products/tray"
                  }
                ]
              }
            ]
          })
        }}
      />
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
          <h1 className="font-extrabold text-white text-3xl sm:text-4xl md:text-5xl leading-tight max-w-4xl mb-4">
            Premium Sugarcane Bagasse Tableware
            <span className="block mt-2 text-[#9ee8b1] text-2xl sm:text-3xl">
              Microwave-Safe • Compostable • FDA Approved
            </span>
          </h1>
          <p className="text-white/90 text-base sm:text-lg mt-4 max-w-2xl">
            Transform agricultural waste into premium tableware. Our bagasse products are stronger than paper, safer than plastic, and kinder to the planet.
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
              Sugarcane Bagasse Product Categories
            </h2>
            <p className="text-[#0b3d13]/80 text-base sm:text-lg">
              From plates to containers - discover our complete range of{" "}
              <Link href="/manufacturing" className="text-[#1a7a2b] font-semibold transition-all">
                bagasse tableware made from renewable sugarcane fiber
              </Link>. All products are{" "}
              <Link href="/quote" className="text-[#1a7a2b] font-semibold transition-all">
                available for bulk orders
              </Link>{" "}
              with competitive wholesale pricing.
            </p>
          </section>

          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto mb-16">
            {[
              { name: 'Bagasse Plates', slug: 'round-plates', desc: 'Durable round plates in multiple sizes', icon: faPlateWheat },
              { name: 'Bagasse Bowls', slug: 'bowls', desc: 'Deep bowls perfect for soups and salads', icon: faBowlFood },
              { name: 'Meal Trays', slug: 'meal-trays', desc: 'Compartment trays for complete meals', icon: faBowlRice },
              { name: 'Takeaway Containers', slug: 'takeaway-container', desc: 'Secure containers for food delivery', icon: faBox },
              { name: 'Clamshells', slug: 'clamshells', desc: 'Hinged containers for burgers and sandwiches', icon: faBurger },
              { name: 'Food Trays', slug: 'tray', desc: 'Flat trays for serving and presentation', icon: faUtensils },
              { name: 'Sipper Lids', slug: 'sipper-lid', desc: 'Leak-proof lids for hot and cold beverages', icon: faMugHot }
            ].map((product) => (
              <article key={product.slug} className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
                <div className="text-4xl mb-4 text-center"><FontAwesomeIcon icon={product.icon} /></div>
                <h3 className="font-bold text-[#0b3d13] mb-3 text-lg text-center">
                  {product.name}
                </h3>
                <p className="text-[#0b3d13]/70 text-sm mb-6 text-center flex-grow">
                  {product.desc}
                </p>
                <div className="space-y-2 mb-6 text-xs text-[#0b3d13]/60">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Microwave Safe (220°F)
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Compostable in 90 days
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    FDA Approved
                  </div>
                </div>
                <Link
                  href={`/products/${product.slug}`}
                  className="mt-auto bg-gradient-to-r from-[#1a7a2b] to-[#2d8f3f] text-white font-semibold rounded-lg px-4 py-3 flex items-center justify-center gap-2 text-sm hover:from-[#0f5a1f] hover:to-[#1a7a2b] transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  View {product.name}
                  <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                </Link>
              </article>
            ))}
          </section>

          <section className="text-center mb-12">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 border border-green-100">
              <h2 className="text-2xl font-bold text-[#0b3d13] mb-4">Need Detailed Product Specifications?</h2>
              <p className="text-[#0b3d13]/70 mb-6 max-w-2xl mx-auto">
                Access our comprehensive packing list with detailed specifications, pricing, and technical data for all products. Our{" "}
                <Link href="/export" className="text-[#1a7a2b] font-semibold transition-all">
                  export-quality products
                </Link>{" "}
                meet international standards and are available for{" "}
                <Link href="/contact" className="text-[#1a7a2b] font-semibold transition-all">
                  global shipping
                </Link>.
              </p>
              <Link
                href="/quote"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1a7a2b] to-[#2d8f3f] text-white font-semibold rounded-lg px-6 py-3 hover:from-[#0f5a1f] hover:to-[#1a7a2b] transition-all duration-300 shadow-md hover:shadow-lg"
              >
                View Packing List
                <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
              </Link>
            </div>
          </section>

          <section className="bg-white rounded-2xl p-8 mb-16 shadow-lg">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[#0b3d13] mb-4">Why Choose Sugarcane Bagasse?</h2>
              <p className="text-[#0b3d13]/70 max-w-3xl mx-auto">
                Bagasse is the fibrous residue left after extracting juice from sugarcane. Instead of burning this waste, our{" "}
                <Link href="/manufacturing" className="text-[#1a7a2b] font-semibold transition-all">
                  advanced manufacturing facility
                </Link>{" "}
                transforms it into premium tableware that's stronger than paper and safer than plastic.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FontAwesomeIcon icon={faLeaf} className="text-2xl text-green-600" />
                </div>
                <h3 className="font-semibold text-[#0b3d13] mb-2">100% Natural</h3>
                <p className="text-sm text-[#0b3d13]/70">Made from agricultural waste with no harmful chemicals or plastic coatings</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FontAwesomeIcon icon={faDumbbell} className="text-2xl text-green-600" />
                </div>
                <h3 className="font-semibold text-[#0b3d13] mb-2">Superior Strength</h3>
                <p className="text-sm text-[#0b3d13]/70">Stronger than paper plates, handles hot and cold foods without breaking</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FontAwesomeIcon icon={faRecycle} className="text-2xl text-green-600" />
                </div>
                <h3 className="font-semibold text-[#0b3d13] mb-2">Fully Compostable</h3>
                <p className="text-sm text-[#0b3d13]/70">Breaks down completely in 90 days, enriching soil instead of polluting it</p>
              </div>
            </div>
          </section>

          <CustomizationSection />
        </div>
      </div>
      <BecomePartnerSection />
    </div>
    </>
  );
}