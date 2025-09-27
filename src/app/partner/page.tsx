import React from 'react';
import { Metadata } from "next";
import ProductHero from "@/components/Product/ProductHero";
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
}

interface Step {
  number: number;
  title: string;
  description: string;
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
  },
  {
    title: "OEM/White Label",
    description: "Custom branding and packaging solutions for your business",
    icon: Tag,
  },
  {
    title: "Global Shipping",
    description:
      "Reliable logistics network serving partners across 45+ countries",
    icon: Truck,
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
    description: "Review samples and finalize your order specifications",
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
            offering sustainable alternatives to single-use plastic products.
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
                <p className="text-gray-700 text-sm leading-relaxed">
                  {benefit.description}
                </p>
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
              <p className="text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </section>
      <PartnerForm />
    </div>
  );
}

