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
  <Link href="/sustainability/eco-initiatives" className="block h-full">
    <div className="h-full bg-white/90 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center text-center shadow-lg border border-green-100 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-white hover:border-green-200 cursor-pointer">
      <div className="bg-[#D4F5E1] text-[#007A3E] rounded-full p-4 mb-4 flex items-center justify-center text-2xl shadow-md shrink-0">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="font-extrabold text-lg mb-3 whitespace-pre-line text-gray-800 min-h-[56px] flex items-center justify-center">
        {title}
      </h3>
      <p className="text-sm leading-relaxed max-w-[280px] text-gray-600">
        {description}
      </p>
    </div>
  </Link>
);

export default function Home() {
  const greenPromises = [
    {
      icon: GiSprout,
      title: "100% biodegradable certified",
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
              MANUFACTURER & EXPORTER
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold mb-4">
              Bagasse Tableware Manufacturer <br className="hidden sm:block" />
              & Exporter from India
            </h1>
            <p className="text-base text-[#004D40] leading-relaxed mb-6 max-w-2xl">
              <span className="font-bold">Vegnar Green</span> is India's leading{" "}
              <Link href="/products/bagasse-products" className="text-[#007A3E] font-semibold transition-all">
                bagasse tableware
              </Link>{" "}
              manufacturer and exporter, specializing in premium{" "}
              <Link href="/products/round-plates" className="text-[#007A3E] font-semibold transition-all">
                biodegradable plates
              </Link>,{" "}
              <Link href="/products/bowls" className="text-[#007A3E] font-semibold transition-all">
                sugarcane bagasse bowls
              </Link>, meal trays, and{" "}
              eco-friendly packaging solutions.
            </p>
            <p className="text-base text-[#004D40] leading-relaxed mb-8 max-w-2xl">
              As a trusted <strong>wholesale manufacturer in India</strong>, we transform agricultural waste into certified compostable products that meet international quality standards. Our{" "}
              <Link href="/manufacturing" className="text-[#007A3E] font-semibold transition-all">
                FDA-approved manufacturing facility
              </Link>{" "}
              produces SGS-certified range that serves restaurants, caterers, hotels, and distributors across <strong>7+ countries</strong>. Whether you need bulk orders or custom branding, we deliver sustainable alternatives that don't compromise on durability or performance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <Link 
                href="/quote" 
                className="group inline-flex items-center gap-2 bg-[#007A3E] text-white font-bold px-8 py-3 rounded-full hover:bg-[#006332] transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <span>Get a Free Quote Today</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <p className="text-sm font-medium text-[#004D40]">
                Join the <span className="font-bold text-[#007A3E]">plastic-free revolution</span>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="ProductCatagories">
        <ProductCategories />
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

      {/* From Our Blog Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-20 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-[#D4F5E1] text-[#007A3E] text-sm font-semibold rounded-full px-4 py-1 mb-3">
              FROM OUR BLOG
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#004D40] mb-4">
              From Our Blog
            </h2>
            <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto mb-6">
              <Link href="/blog" className="text-[#007A3E] font-semibold transition-all">
                Read our eco-packaging guides
              </Link>
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Article 1 */}
            <Link href="/blog/what-is-bagasse" className="group">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="bg-[#D4F5E1] text-[#007A3E] rounded-full p-3 flex items-center justify-center flex-shrink-0">
                    <GiSprout className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-[#007A3E] transition-colors">
                      What is bagasse tableware?
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Discover the sustainable alternative to plastic tableware made from sugarcane waste.
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            {/* Article 2 */}
            <Link href="/blog/are-bagasse-plates-microwave-safe" className="group">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="bg-[#D4F5E1] text-[#007A3E] rounded-full p-3 flex items-center justify-center flex-shrink-0">
                    <GiRecycle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-[#007A3E] transition-colors">
                      Are bagasse plates microwave safe?
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Learn about the safety and durability of bagasse plates in microwave use.
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* <ProductSection /> */}

      <CertificationsSection />
      <BrochureSection />
      <CustomizationSection />
      <BecomePartnerSection />
    </>
  );
}
