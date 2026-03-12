// If you're using TypeScript in app router (Next.js 13+ with app directory)
import HeroSection from "@/components/Home/hero-screen";
import { Metadata, Viewport } from "next"; // Import Metadata and Viewport types
import Image from "next/image"; // Import Image component for optimized images
import Link from "next/link";
import CertificationsSection from "@/components/CertificationsSection";

import CustomizationSection from "@/components/CustomizationSection";
import { FaCheckCircle } from "react-icons/fa";
import { GiSprout, GiCancel, GiHourglass, GiRecycle } from "react-icons/gi";
import { IconType } from "react-icons";
import ProductCategories from "@/components/ProductCategories";
import BrochureSection from "@/components/BrochureSection";
import ProductSection from "@/components/ProductSection";
import BecomePartnerSection from "@/components/BecomePartnerSection";
import FAQSection from "@/components/FAQSection";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title:
    "Bagasse Tableware Manufacturer India | Biodegradable Plates, Bowls & Packaging | Vegnar Green",
  description:
    "Vegnar Green is India's leading bagasse tableware manufacturer. Wholesale biodegradable plates, bowls, meal trays & eco-friendly bags. FDA approved, SGS certified. Export to 7+ countries. Get a free quote today.",
  keywords:
    "Sugarcane Bagasse Products Manufacturer, Bagasse Tableware Manufacturer India,Biodegradable Tableware Supplier, Eco-Friendly Disposable Tableware,Compostable Food Packaging Manufacturer,Areca Leaf Tableware Manufacturer,Plastic-Free Food Packaging,Vegnar Green",
  openGraph: {
    title: "Vegnar Green | Biodegradable Tableware & Eco-Friendly Bags",
    description:
      "Premium biodegradable tableware and eco-friendly bags made from sugarcane bagasse and areca palm leaves. 100% compostable packaging solutions for a sustainable future",
    url: "https://www.vegnar.com/",
    type: "website",
    images: [
      {
        url: "https://www.vegnar.com/images/og-banner.jpg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vegnar Green | Biodegradable Tableware & Eco-Friendly Bags",
    description:
      "Sustainable, compostable, and plastic-free tableware and bags by Vegnar Green – leading the change with bio-innovation from sugarcane bagasse and areca palm leaf.",
    images: ["https://www.vegnar.com/images/twitter-banner.jpg"],
  },
  alternates: {
    canonical: "https://www.vegnar.com",
  },
  robots: "index, follow",
  authors: [{ name: "Vegnar Greens" }],
  publisher: "Vegnar Greens",
};

const GreenPromiseCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: IconType;
  title: string;
  description: string;
}) => (
  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center text-center shadow-lg border border-green-100 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-white hover:border-green-200">
    <div className="bg-[#D4F5E1] text-[#007A3E] rounded-full p-4 mb-4 flex items-center justify-center text-2xl shadow-md">
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="font-extrabold text-lg mb-3 whitespace-pre-line text-gray-800">
      {title}
    </h3>
    <p className="text-sm leading-relaxed max-w-[280px] text-gray-600">
      {description}
    </p>
  </div>
);

export default function Home() {
  const greenPromises = [
    {
      icon: GiSprout,
      title: "100% Biodegradable",
      description:
        "Our products naturally break down into non-toxic components, returning to the earth without harm.",
    },
    {
      icon: GiCancel, // Using GiCancel here
      title: "Plastic-Free Future",
      description:
        "We've eliminated plastic from our products and packaging, supporting a cleaner planet.",
    },
    {
      icon: GiHourglass,
      title: "Compostable within\n90 days",
      description:
        "Our products fully decompose in industrial composting facilities within just 90 days.",
    },
    {
      icon: GiRecycle,
      title: "Made from\nAgricultural Waste",
      description:
        "We upcycle sugarcane bagasse and rice husk that would otherwise be discarded.",
    },
  ];

  const whyChooseBagasse = [
    {
      title: "Replaces Single-Use Plastic",
      description: "Our bagasse tableware eliminates the need for harmful plastic disposables, reducing ocean pollution and landfill waste."
    },
    {
      title: "Composts in 90 Days",
      description: "Unlike plastic that takes 500+ years, our products fully decompose in commercial composting facilities within 90 days."
    },
    {
      title: "FDA & SGS Certified",
      description: "All our bagasse products are FDA approved for food contact and SGS certified, ensuring safety and quality standards."
    },
    {
      title: "Heat & Leak Resistant",
      description: "Withstands temperatures up to 200°F and holds hot, cold, wet, and oily foods without leaking or losing shape."
    },
    {
      title: "Cost-Effective at Scale",
      description: "Competitive wholesale pricing for bulk orders makes switching to eco-friendly packaging affordable for businesses."
    }
  ];

  return (
    <>
      <HeroSection />
      
      <section className="py-20 px-4 sm:px-6 lg:px-20 bg-gradient-to-br from-green-50 via-white to-emerald-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: "url(/assets/bg-green.png)",
            backgroundRepeat: "repeat",
            backgroundSize: "200px auto",
          }}
        ></div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#007A3E] to-[#00A651] text-white text-sm font-bold rounded-full px-6 py-2 mb-8 shadow-lg">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            MANUFACTURER & EXPORTER
          </div>
          
          {/* Main Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#004D40] via-[#007A3E] to-[#00A651] mb-8 leading-tight">
            Bagasse Tableware Manufacturer
            <span className="block text-3xl sm:text-4xl lg:text-5xl mt-2">
              &amp; Exporter from India
            </span>
          </h1>
          
          {/* Description with enhanced styling */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 sm:p-10 shadow-xl border border-green-100 max-w-5xl mx-auto">
            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-6">
              <span className="font-bold text-[#007A3E]">Vegnar Green</span> is India's leading{" "}
              <Link href="/products/bagasse-products" className="text-[#007A3E] font-bold hover:underline decoration-2 underline-offset-2 transition-all">
                bagasse tableware
              </Link>{" "}
              manufacturer and{" "}
              <Link href="/export" className="text-[#007A3E] font-bold hover:underline decoration-2 underline-offset-2 transition-all">
                exporter
              </Link>
              , specializing in premium{" "}
              <strong className="text-[#004D40]">biodegradable plates</strong>,{" "}
              <strong className="text-[#004D40]">sugarcane bagasse bowls</strong>, meal trays, and{" "}
              <strong className="text-[#004D40]">eco-friendly packaging</strong> solutions.
            </p>
            
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-8">
              As a trusted <strong>wholesale manufacturer in India</strong>, we transform agricultural waste into certified compostable products that meet international quality standards. Our FDA-approved, SGS-certified range serves restaurants, caterers, hotels, and distributors across <strong>7+ countries</strong>. Whether you need bulk orders or custom branding, we deliver sustainable alternatives that don't compromise on durability or performance.
            </p>
            
            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/quote" 
                className="group bg-gradient-to-r from-[#007A3E] to-[#00A651] text-white font-bold px-8 py-4 rounded-full hover:from-[#006332] hover:to-[#008A47] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-2"
              >
                <span>Get a Free Quote Today</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              
              <p className="text-sm text-gray-500 font-medium">
                Join the <span className="text-[#007A3E] font-bold">plastic-free revolution</span>
              </p>
            </div>
          </div>
          
          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-green-200 hover:bg-white/80 transition-all">
              <div className="text-3xl font-black text-[#007A3E] mb-2">FDA</div>
              <div className="text-sm font-semibold text-gray-600">Approved Products</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-green-200 hover:bg-white/80 transition-all">
              <div className="text-3xl font-black text-[#007A3E] mb-2">SGS</div>
              <div className="text-sm font-semibold text-gray-600">Certified Quality</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-green-200 hover:bg-white/80 transition-all">
              <div className="text-3xl font-black text-[#007A3E] mb-2">7+</div>
              <div className="text-sm font-semibold text-gray-600">Countries Served</div>
            </div>
          </div>
        </div>
      </section>
      <section
        id="green-promises" // Added an ID for the anchor link
        className="text-[#004D40] py-16 px-4 sm:px-6 lg:px-20 relative"
      >
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: "url(/assets/bg-green.png)",
            backgroundRepeat: "repeat",
            backgroundSize: "300px auto",
            backgroundAttachment: "fixed",
          }}
        ></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="inline-block bg-[#D4F5E1] text-[#007A3E] text-sm font-semibold rounded-full px-4 py-1 mb-3">
            ECO-FRIENDLY
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight">
            Our Green Promises
          </h2>
          <p className="text-base sm:text-lg max-w-[520px] sm:max-w-2xl mx-auto leading-relaxed">
            We're committed to providing sustainable alternatives that don't
            compromise on quality or performance.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {greenPromises.map((item, index) => (
            <GreenPromiseCard
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-20 relative">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: "url(/assets/bg-green.png)",
            backgroundRepeat: "repeat",
            backgroundSize: "300px auto",
            backgroundAttachment: "fixed",
          }}
        ></div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-12 relative z-10">
          <Image
            src="/assets/img/waste-to-worth.webp"
            alt="About us | Vagnar Green"
            width={500}
            height={300}
          />
          <div className="flex-1">
            <span className="inline-block bg-[#D4F5E1] text-[#007A3E] text-sm font-semibold rounded-full px-4 py-1 mb-3">
              OUR STORY
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold mb-4">
              The Leading Sugarcane Bagasse Tableware Manufacturer
            </h3>
            <p className="text-base text-[#004D40] leading-relaxed mb-6 max-w-2xl">
              we bridge the gap between industrial scale and environmental
              ethics. As a premier manufacturer of bagasse products, we
              specialize in transforming agricultural by-products, specifically
              sugarcane bagasse, into high-performance compostable solutions.
            </p>
            <p className="text-base text-[#004D40] leading-relaxed mb-8 max-w-2xl">
              We provide businesses worldwide with a reliable alternative to
              single-use plastics by offering wholesale bagasse plates and
              packaging that meet rigorous global durability standards. Our
              circular manufacturing process ensures every product returns to
              the earth without leaving a trace.
            </p>
            <div className="flex gap-6 sm:gap-12 max-w-2xl">
              <div>
                <p className="font-extrabold text-2xl text-[#007A3E]">12M+</p>
                <p className="text-base text-[#004D40]">Products Sold</p>
              </div>
              <div>
                <p className="font-extrabold text-2xl text-[#007A3E]">7+</p>
                <p className="text-base text-[#004D40]">Countries Served</p>
              </div>
              <div>
                <p className="font-extrabold text-2xl text-[#007A3E]">100%</p>
                <p className="text-base text-[#004D40]">Eco-Friendly</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="ProductCatagories">
        <ProductCategories />
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-20 bg-gradient-to-b from-white to-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-[#D4F5E1] text-[#007A3E] text-sm font-semibold rounded-full px-4 py-1 mb-3">
              WHY BAGASSE?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#004D40] mb-4">
              Why Choose Bagasse Tableware?
            </h2>
            <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto">
              Discover why businesses worldwide are switching to sugarcane bagasse products
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseBagasse.map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-green-100 hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="text-[#007A3E] text-xl mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection />

      {/* <ProductSection /> */}

      <CertificationsSection />
      <BrochureSection />
      <CustomizationSection />
      <BecomePartnerSection />
    </>
  );
}
