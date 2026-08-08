import React from "react";
import { Metadata } from "next";
import Script from "next/script";
import IndustriesClientPage from "./IndustriesClientPage";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Industries We Serve | Sugarcane Bagasse Tableware Manufacturer India",
  description: "Explore the global industries Vegnar Green serves with premium sugarcane bagasse tableware and biodegradable food packaging. Custom OEM, wholesale, and export solutions.",
  keywords: [
    "bagasse products manufacturer",
    "sugarcane bagasse tableware",
    "biodegradable food packaging",
    "compostable food containers",
    "eco friendly food packaging manufacturer",
    "sustainable packaging solutions",
    "bagasse packaging supplier",
    "biodegradable tableware exporter",
    "eco friendly packaging for restaurants",
    "compostable packaging manufacturer India",
    "sustainable food packaging supplier",
    "plastic free food containers",
    "bagasse products exporter",
    "Vegnar Green",
    "Vegnar Greens"
  ].join(", "),
  openGraph: {
    title: "Industries We Serve | Vegnar Green Sugarcane Bagasse Packaging",
    description: "Eco-friendly, biodegradable, compostable, plastic-free food packaging solutions for businesses worldwide. Serving restaurants, catering, aviation, retail, cosmetics, and more.",
    url: `${SITE_CONFIG.BASE_URL}/industries`,
    siteName: "Vegnar Green",
    type: "website",
  },
  alternates: {
    canonical: `${SITE_CONFIG.BASE_URL}/industries`,
  },
  robots: "index, follow",
  authors: [{ name: "Vegnar Greens" }],
  publisher: "Vegnar Greens",
};

export default function IndustriesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_CONFIG.BASE_URL}/industries#webpage`,
        "url": `${SITE_CONFIG.BASE_URL}/industries`,
        "name": "Industries We Serve | Vegnar Green Sugarcane Bagasse Packaging",
        "description": "Discover how Vegnar Green serves global industries with premium sugarcane bagasse tableware and biodegradable food packaging solutions.",
        "isPartOf": { "@id": `${SITE_CONFIG.BASE_URL}/#website` },
        "about": { "@id": `${SITE_CONFIG.BASE_URL}/#organization` }
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_CONFIG.BASE_URL}/industries#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What industries use bagasse products?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Industries using bagasse products include restaurants, cloud kitchens, hotels, catering, QSRs, airlines, railways, hospitals, educational institutions, retail, cosmetics, and organic brands seeking sustainable packaging."
            }
          },
          {
            "@type": "Question",
            "name": "Are bagasse products food-safe?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, Vegnar Green's sugarcane bagasse tableware is FDA-approved for direct food contact. It is 100% natural, sterile, and free from BPA, phthalates, and other harmful chemicals."
            }
          },
          {
            "@type": "Question",
            "name": "Can bagasse products replace plastic packaging?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, our bagasse products are microwave and freezer safe, naturally water and oil resistant, and highly rigid, making them a durable, eco-friendly replacement for single-use plastic and styrofoam."
            }
          },
          {
            "@type": "Question",
            "name": "Are bagasse products suitable for exports?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we are a leading exporter of bagasse tableware from India, holding certifications like FDA compliance and SGS testing, regularly supplying global markets."
            }
          },
          {
            "@type": "Question",
            "name": "Can Vegnar Green provide private labeling?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we provide full OEM and private label solutions, including custom mold design and logo embossing for B2B brands globally."
            }
          }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": `${SITE_CONFIG.BASE_URL}/`
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Industries We Serve",
            "item": `${SITE_CONFIG.BASE_URL}/industries`
          }
        ]
      }
    ]
  };

  return (
    <>
      <Script
        id="industries-json-ld-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd)
        }}
      />
      <IndustriesClientPage />
    </>
  );
}
