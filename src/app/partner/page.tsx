import React from 'react';
import { Metadata } from "next";
import ProductHero from "@/components/Product/ProductHero";
import Link from 'next/link';
import {
  Leaf,
  Briefcase,
  Megaphone,
  Users,
  Recycle,
  Verified, 
  Tag,
  Truck,
} from 'lucide-react';
import PartnerForm from '@/components/PartnerForm';

interface Benefit {
  title: string;
  description: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  link?: string;
  linkText?: string;
}

interface Step {
  number: number;
  title: string;
  description: string;
  link?: string;
  linkText?: string;
}

const benefits: Benefit[] = [
  {
    title: "Sustainable Production",
    description:
      "100% eco-friendly manufacturing process with zero waste policy",
    icon: Recycle,
  },
  {
    title: "Certified Products",
    description:
      "All products meet international compostability and food safety standards",
    icon: Verified, // Changed from Certificate to Verified
    link: "/about-us",
    linkText: "view our international certifications"
  },
  {
    title: "OEM/White Label",
    description: "Custom branding and packaging solutions for your business",
    icon: Tag,
    link: "/quote",
    linkText: "request a custom OEM quote"
  },
  {
    title: "Global Shipping",
    description:
      "Reliable logistics network serving partners across 45+ countries",
    icon: Truck,
    link: "/export",
    linkText: "see our global export capabilities"
  },

];

const steps: Step[] = [
  {
    number: 1,
    title: "Connect",
    description:
      "Fill out our partnership form or schedule a call with our team to discuss your needs",
  },
  {
    number: 2,
    title: "Customize",
    description:
      "Select products, quantities, and customize with your branding if desired",
  },
  {
    number: 3,
    title: "Approve",
    description: "Review samples and finalize your order specifications. You can browse products before ordering samples.",
    link: "/products/bagasse-products",
    linkText: "browse products before ordering samples"
  },
  {
    number: 4,
    title: "Deliver",
    description:
      "We produce and ship your order with our carbon-neutral logistics network",
  },
];

export const metadata: Metadata = {
  title: "Partner with Vagnar Group for Sustainable Products",
  description:
    "Become a partner with Vagnar Group and offer eco-friendly, sustainable products to your customers. Explore our partnership program for distributors and retailers.",
  keywords: [
    "sustainable products",
    "eco-friendly",
    "partnership",
    "wholesale",
    "distribution",
    "biodegradable packaging",
    "bagasse products",
    "distributor opportunity",
    "retail partner",
    "green business",
    "Vagnar Group",
    "Vegnar Greens",
    "Vegnar Global LLP",
    "Vegnar biodegradable products",
    "Vegnar bagasse"
  ],
  openGraph: {
    title: "Partner with Vagnar Group",
    description: "Join our network of partners promoting sustainable living.",
    url: "https://www.vegnar.com/partner",
    type: "website",
    siteName: "Vegnar Greens",
    images: [
      {
        url: "https://www.vegnar.com/images/partner-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Vegnar Group Partnership Program",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@VegnarGreens",
    creator: "@VegnarGreens",
    title: "Partner with Vagnar Group - Sustainable Products Distribution",
    description: "Join Vagnar Group's network of partners and distributors. Offer premium eco-friendly products to your customers.",
    images: ["https://www.vegnar.com/images/partner-banner.jpg"],
  },
  alternates: {
    canonical: "https://www.vegnar.com/partner",
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-video-preview': -1,
    'max-snippet': -1,
  },
  authors: [{ name: "Vegnar Greens" }],
  publisher: "Vegnar Greens",
  category: "Business",
};


export default function PartnerPage() {
  return (
    <div>
      <ProductHero
        title="Join the Green Revolution with Vegnār Green"
        description="Become a part of our growing network and promote sustainable living through quality interior and lifestyle products."
        image="/assets/img/partner.png"
        catalogButtonText="Download Catalog"
        quoteButtonText="Get a Quote"
        catalogUrl="/vagnar-catalog.pdf"
      />
      <div className="bg-white font-sans">
        <section className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-bold text-green-800 mb-3">
            Why Partner With Us
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-12">
            Join our global network of distributors and retailers committed to
            offering <Link href="/products/bagasse-products" className="text-green-700 font-semibold hover:underline decoration-2 underline-offset-2 transition-all">
              sustainable alternatives to single-use plastic
            </Link> products.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-green-50 rounded-xl p-8 flex flex-col items-center text-center transform transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-xl hover:rotate-1"
              >
                <div className="bg-green-100 text-green-800 rounded-full p-4 mb-4 flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110">
                  <benefit.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-green-800 text-lg leading-snug mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-3">
                  {benefit.description}
                </p>
                {benefit.link && benefit.linkText && (
                  <Link href={benefit.link} className="text-green-700 font-semibold hover:underline decoration-2 underline-offset-2 transition-all text-sm">
                    {benefit.linkText}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
      <section className="max-w-7xl mx-auto px-6 py-12 text-center">
        <h2 className="text-3xl font-extrabold text-[#005943] mb-2">
          How It Works
        </h2>
        <p className="text-base max-w-xl mx-auto mb-16">
          Our simple, four-step process to become a Vegnār Green partner
        </p>
        <div className="flex flex-wrap justify-center gap-x-24 gap-y-12">
          {steps.map((step) => (
            <div 
              key={step.number} 
              className="max-w-[180px] transform transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-lg hover:rotate-1 p-6 rounded-xl bg-white"
            >
              <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-[#d0f3e0] flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110">
                <span className="text-[#005943] font-semibold text-lg">
                  {step.number}
                </span>
              </div>
              <h3 className="text-[#005943] font-bold text-lg mb-1">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed mb-3">{step.description}</p>
              {step.link && step.linkText && (
                <Link href={step.link} className="text-green-700 font-semibold hover:underline decoration-2 underline-offset-2 transition-all text-sm">
                  {step.linkText}
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>
      <PartnerForm />
      
      {/* Additional CTAs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <div className="bg-white rounded-xl p-8 shadow-md">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Not ready to partner? Buy wholesale
            </h3>
            <p className="text-gray-600 mb-6">
              Get competitive wholesale pricing for bulk orders without a formal partnership agreement.
            </p>
            <Link href="/quote" className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-all">
              Request a wholesale quote
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                Learn about our manufacturing quality
              </h4>
              <p className="text-gray-600 mb-4">
                Discover our state-of-the-art production facilities and quality control processes.
              </p>
              <Link href="/manufacturing" className="text-green-700 font-semibold hover:underline decoration-2 underline-offset-2 transition-all">
                Our manufacturing process
              </Link>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                See what products you can distribute
              </h4>
              <p className="text-gray-600 mb-4">
                Browse our complete catalog of eco-friendly bagasse products available for distribution.
              </p>
              <Link href="/products/bagasse-products" className="text-green-700 font-semibold hover:underline decoration-2 underline-offset-2 transition-all">
                Explore our complete product range
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

