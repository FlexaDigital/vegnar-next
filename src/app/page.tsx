// If you're using TypeScript in app router (Next.js 13+ with app directory)
import HeroSection from "@/components/Home/hero-screen";
import { Metadata, Viewport } from "next"; // Import Metadata and Viewport types
import Image from "next/image"; // Import Image component for optimized images
import Link from "next/link";
import CertificationsSection from "@/components/CertificationsSection";
import ContactSection from "@/components/ContactSection";
import CustomizationSection from "@/components/CustomizationSection";
import { FaCheckCircle } from "react-icons/fa";
import {
  GiSprout,
  GiCancel,
  GiHourglass,
  GiRecycle,
} from "react-icons/gi";
import { IconType } from "react-icons";
import ProductCategories from "@/components/ProductCategories";
import BrochureSection from "@/components/BrochureSection";
import ProductSection from "@/components/ProductSection";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#ffffff',
};

export const metadata: Metadata = {
  title: "Vegnar Greens | Leading Manufacturer of Biodegradable Tableware & Eco-Friendly Packaging in India",
  description:
    "Vegnar is India’s leading manufacturer of biodegradable tableware and eco-friendly packaging. Offering compostable products made from sugarcane bagasse, areca palm leaves, and more — perfect for sustainable foodservice, exports, and a plastic-free future.",
  keywords:
    "biodegradable tableware, eco-friendly bags, sugarcane bagasse, bagasse products, bagasse plates, bagasse bowls, bagasse compartment trays, areca palm leaf plates, areca leaf bowls, areca tableware, bio bags, compostable bags, biodegradable garbage bags, compostable carry bags, courier bags, nursery bags, garment bags, plastic-free packaging, eco packaging, green packaging, sustainable disposables, biodegradable containers, disposable food containers, biodegradable utensils, eco-friendly packaging supplier, compostable packaging, natural packaging, zero waste tableware, planet-friendly products, Vegnar Green, leading manufacturer and exporter of biodegradable products, bio bag manufacturer India, areca leaf plate exporter, sugarcane bagasse tableware manufacturer",
  openGraph: {
    title: "Vegnar Green | Biodegradable Tableware & Eco-Friendly Bags",
    description:
      "Premium biodegradable tableware and eco-friendly bags made from sugarcane bagasse and areca palm leaves. 100% compostable packaging solutions for a sustainable future.",
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
    images: [
      "https://www.vegnar.com/images/twitter-banner.jpg",
    ],
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
  <div className="bg-white rounded-xl p-6 flex flex-col items-center text-center shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:translate-y-1">
    <div className="bg-[#D4F5E1] text-[#007A3E] rounded-full p-4 mb-4 flex items-center justify-center text-2xl">
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="font-extrabold text-lg mb-2 whitespace-pre-line">{title}</h3>
    <p className="text-base leading-relaxed max-w-[280px]">{description}</p>
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

  return (
    <>
      <HeroSection />
      <section
        id="green-promises" // Added an ID for the anchor link
        className="bg-[#F0F9F4] text-[#004D40] py-16 px-4 sm:px-6 lg:px-20"
      >
        <div className="max-w-7xl mx-auto text-center">
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
    

       <section className="bg-[#F6F6F6] py-16 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-12">
        <Image
  src="/assets/img/waste-to-worth.jpg"
  alt="About us | Vagnar Green"
  width={500}
  height={300}
/>
          <div className="flex-1">
            <span className="inline-block bg-[#D4F5E1] text-[#007A3E] text-sm font-semibold rounded-full px-4 py-1 mb-3">
              OUR STORY
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold mb-4">
              Turning Waste into Worth
            </h3>
            <p className="text-base text-[#004D40] leading-relaxed mb-6 max-w-2xl">
              Vagnar Greens was founded with a simple mission: to create
              beautiful, functional products that help reduce the world's
              reliance on single-use plastics.
            </p>
            <p className="text-base text-[#004D40] leading-relaxed mb-8 max-w-2xl">
              We transform agricultural waste – specifically sugarcane bagasse
              and rice husk – into premium tableware and packaging solutions
              that are both stylish and sustainable. Our products decompose
              naturally, leaving no harmful residues.
            </p>
            <div className="flex flex-wrap gap-12 max-w-2xl">
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

      <ProductSection />

   
    <CertificationsSection/>
    <BrochureSection />
    <CustomizationSection />
    <ContactSection />

   
      
    </>
  );
}
