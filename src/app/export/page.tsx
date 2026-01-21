import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';
import { Globe, Award, Shield, Truck, CheckCircle, Users } from 'lucide-react';
import BecomePartnerSection from '@/components/BecomePartnerSection';

export const metadata: Metadata = {
  title: "Global Sugarcane Bagasse Exporter | Premium Biodegradable Tableware Supplier - Vegnar Green",
  description: "Leading sugarcane bagasse exporter from India to USA, UK, Germany & Europe. ISO certified biodegradable tableware supplier with international quality standards. Export-oriented manufacturing with global shipping.",
  keywords: [
    "sugarcane bagasse exporter India",
    "sugarcane bagasse tableware supplier USA",
    "sugarcane bagasse supplier UK",
    "biodegradable tableware exporter Germany",
    "bagasse products supplier Europe",
    "international bagasse tableware supplier",
    "export oriented sugarcane products",
    "global biodegradable packaging supplier",
    "ISO certified bagasse exporter",
    "international quality bagasse products",
    "eco-friendly tableware export India",
    "sustainable packaging supplier worldwide",
    "bagasse plates bowls export",
    "compostable tableware international supplier",
    "FDA approved bagasse products exporter"
  ],
  openGraph: {
    title: "Global Sugarcane Bagasse Exporter | International Quality Standards",
    description: "Premium biodegradable tableware exporter from India. Serving USA, UK, Germany & Europe with ISO certified, FDA approved bagasse products.",
    url: "https://www.vegnar.com/export",
    type: "website",
    siteName: "Vegnar Green",
    images: [
      {
        url: "https://www.vegnar.com/images/export-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Vegnar Green Global Export Operations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@VegnarGreens",
    creator: "@VegnarGreens",
    title: "Global Sugarcane Bagasse Exporter - Vegnar Green",
    description: "Leading exporter of biodegradable bagasse tableware to USA, UK, Germany & Europe. ISO certified with international quality standards.",
    images: ["https://www.vegnar.com/images/export-banner.jpg"],
  },
  alternates: {
    canonical: "https://www.vegnar.com/export",
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-video-preview': -1,
    'max-snippet': -1,
  },
};

export default function ExportPage() {
  const exportMarkets = [
    { country: "United States", flag: "🇺🇸" },
    { country: "United Kingdom", flag: "🇬🇧" },
    { country: "Germany", flag: "🇩🇪" },
    { country: "France", flag: "🇫🇷" },
    { country: "Netherlands", flag: "🇳🇱" },
    { country: "Australia", flag: "🇦🇺" },
    { country: "Canada", flag: "🇨🇦" },
    { country: "Italy", flag: "🇮🇹" },
    { country: "Spain", flag: "🇪🇸" },
    { country: "Belgium", flag: "🇧🇪" },
    { country: "Sweden", flag: "🇸🇪" },
    { country: "Norway", flag: "🇳🇴" }
  ];

  const certifications = [
    { name: "ISO 9001:2015", desc: "Quality Management" },
    { name: "FDA Approved", desc: "Food Safety Standards" },
    { name: "BRC Certified", desc: "Global Food Safety" },
    { name: "HACCP", desc: "Hazard Analysis" },
    { name: "SGS Tested", desc: "International Testing" },
    { name: "CE Marking", desc: "European Conformity" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 to-green-100 py-20 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block bg-green-700 text-white text-sm font-semibold rounded-full px-4 py-1 mb-4">
            GLOBAL EXPORT EXCELLENCE
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
            Leading Sugarcane Bagasse Exporter
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Premium biodegradable tableware supplier from India to USA, UK, Germany & Europe with international quality standards
          </p>
        </div>
      </section>

      {/* Export Markets */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Global Presence</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Trusted sugarcane bagasse tableware supplier serving premium markets worldwide with consistent quality and reliable delivery
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {exportMarkets.map((market, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
                <span className="text-6xl mb-4 block" style={{fontFamily: 'Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, sans-serif', lineHeight: '1'}}>{market.flag}</span>
                <h3 className="font-semibold text-gray-900">{market.country}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Standards */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-15"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">International Quality Standards</h2>
              <p className="text-lg text-gray-600 mb-8">
                As a leading sugarcane bagasse exporter from India, we maintain the highest international quality standards to serve global markets including USA, UK, Germany, and across Europe.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-center p-4 border rounded-lg">
                    <Award className="h-8 w-8 text-green-600 mr-3" />
                    <div>
                      <h4 className="font-semibold text-sm">{cert.name}</h4>
                      <p className="text-xs text-gray-600">{cert.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-green-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-green-800 mb-6">Export Capabilities</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                  <span>Monthly capacity: 15+ containers</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                  <span>Lead time: 15-20 days</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                  <span>Custom packaging & branding</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                  <span>FOB, CIF, DDP terms available</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                  <span>24/7 export support team</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Global Brands Choose Vegnar Green</h2>
            <p className="text-lg text-gray-600">
              Your trusted partner for sustainable bagasse tableware export from India
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Quality Assurance</h3>
              <p className="text-gray-600">
                Rigorous quality control with international testing standards. Every shipment meets FDA, CE, and local regulatory requirements.
              </p>
            </div>
            <div className="text-center">
              <Truck className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Reliable Logistics</h3>
              <p className="text-gray-600">
                Seamless export operations with trusted shipping partners. On-time delivery to USA, UK, Germany, and Europe.
              </p>
            </div>
            <div className="text-center">
              <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Dedicated Support</h3>
              <p className="text-gray-600">
                Experienced export team providing end-to-end support from order to delivery. Multi-language customer service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Leading Sugarcane Bagasse Exporter from India</h2>
              <div className="prose prose-lg text-gray-600">
                <p className="mb-4">
                  Vegnar Green stands as India's premier <strong>sugarcane bagasse exporter</strong>, specializing in biodegradable tableware supply to international markets. Our export-oriented manufacturing facility produces premium quality bagasse plates, bowls, containers, and meal trays that meet stringent international standards.
                </p>
                <p className="mb-4">
                  As a trusted <strong>sugarcane bagasse tableware supplier in USA</strong>, we serve major distributors and retailers across North America with consistent quality and reliable delivery schedules. Our FDA-approved products comply with all US food safety regulations.
                </p>
                <p className="mb-4">
                  Our presence as a <strong>sugarcane bagasse supplier UK</strong> has grown significantly, serving the British market's increasing demand for sustainable packaging solutions. We work closely with UK importers to ensure compliance with British standards and regulations.
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">European Market Leadership</h3>
              <div className="prose prose-lg text-gray-600">
                <p className="mb-4">
                  As a leading <strong>biodegradable tableware exporter Germany</strong>, we supply to major German distributors who value our commitment to environmental sustainability and product quality. Our CE-marked products meet all European Union standards.
                </p>
                <p className="mb-4">
                  Our role as a <strong>bagasse products supplier Europe</strong> extends across multiple countries including France, Netherlands, Belgium, and Scandinavia. We understand the diverse regulatory requirements across European markets and ensure full compliance.
                </p>
                <p className="mb-4">
                  With over 5 years of experience as an <strong>international bagasse tableware supplier</strong>, we have built strong relationships with importers, distributors, and end-users worldwide, establishing Vegnar Green as a reliable partner for sustainable packaging needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Range Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Export Product Range</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-3">Bagasse Plates</h3>
              <p className="text-gray-600">Round plates 6" to 12", compartment plates, microwave-safe, FDA approved for international export.</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-3">Bagasse Bowls</h3>
              <p className="text-gray-600">Various sizes from 6oz to 32oz, perfect for soups, salads, and hot foods. Export quality with international certifications.</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-3">Takeaway Containers</h3>
              <p className="text-gray-600">Clamshells, rectangular containers with lids, ideal for food delivery services across global markets.</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-3">Custom Solutions</h3>
              <p className="text-gray-600">Private labeling, custom packaging, and branding solutions for international distributors and retailers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              {
                question: "Why choose Vegnar Greens as your bagasse manufacturer worldwide?",
                answer: "As a leading bagasse manufacturer worldwide, we operate ISO 9001:2015 certified facilities with 50M+ annual production capacity. Our global bagasse products manufacturer status is backed by FDA approval, CE marking, and consistent quality delivery to 25+ countries with 99.8% quality consistency rate."
              },
              {
                question: "What makes you a trusted bagasse exporter global partner?",
                answer: "Our bagasse exporter global operations include dedicated export teams, international certifications, and established logistics networks. We serve as a reliable worldwide bagasse supplier with monthly capacity of 15+ containers and complete documentation support for seamless international trade."
              },
              {
                question: "Do you offer OEM and private label manufacturing services?",
                answer: "Yes, as an OEM bagasse products manufacturer, we provide comprehensive private label solutions including custom packaging design, brand-specific product development, and market-specific customization for international distributors and retailers worldwide."
              },
              {
                question: "Which international markets do you serve as a bagasse manufacturer?",
                answer: "We serve as bagasse manufacturer USA, bagasse exporter UK, bagasse supplier Germany, bagasse manufacturer Australia, and bagasse exporter Canada. Our operations extend across Europe, Asia-Pacific, Middle East, and North America with region-specific compliance and certifications."
              },
              {
                question: "What certifications do you have as an ISO certified bagasse manufacturer?",
                answer: "As an ISO certified bagasse manufacturer, we hold ISO 9001:2015, FDA approval, CE marking, BRC certification, HACCP compliance, and SGS testing. All products meet international food safety standards with complete certification documentation for global markets."
              },
              {
                question: "What is your capacity as a wholesale bagasse manufacturer worldwide?",
                answer: "Our wholesale bagasse manufacturer worldwide capacity includes 50M+ pieces annually, 15+ containers monthly export volume, and flexible production scheduling. As a bulk bagasse exporter global partner, we handle large volume orders with consistent quality and timely delivery."
              },
              {
                question: "How do you ensure quality as a sugarcane bagasse manufacturer international?",
                answer: "Our sugarcane bagasse manufacturer international quality system includes multi-stage quality control, international testing standards, batch tracking, and continuous monitoring. Every shipment undergoes rigorous testing to meet destination country requirements and international food safety standards."
              },
              {
                question: "What export terms do you offer as a bagasse exporter global company?",
                answer: "As a bagasse exporter global company, we offer flexible terms including FOB, CIF, DDP, and EXW. Our experienced international trade team provides complete logistics support, customs documentation, and shipping coordination to ensure smooth delivery worldwide."
              }
            ].map((faq, index) => (
              <details key={index} className="border border-gray-200 rounded-lg">
                <summary className="cursor-pointer p-4 font-semibold text-gray-900 hover:bg-gray-50">
                  {faq.question}
                </summary>
                <div className="p-4 pt-0 text-gray-600">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <BecomePartnerSection />
    </div>
  );
}