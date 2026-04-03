import { Metadata } from "next";
import Script from "next/script";
import ManufacturingSection from "@/components/ManufacturingSection";

export const metadata: Metadata = {
  title:
    "Sugarcane Bagasse Manufacturer in India | Vegnar Green Manufacturing Unit",
  description:
    "Vegnar Green is a leading sugarcane bagasse manufacturer in India with in-house manufacturing facilities producing eco-friendly biodegradable tableware for domestic and export markets.",
  keywords: [
    "sugarcane bagasse manufacturer in India",
    "bagasse tableware manufacturer",
    "biodegradable tableware factory India",
    "eco friendly disposable manufacturer",
    "bagasse plates bowls manufacturer",
    "bagasse products exporter India",
  ],
  alternates: {
    canonical: "https://www.vegnar.com/manufacturing",
  },
};

export default function ManufacturingPage() {
  return (
    <>
      <Script
        id="manufacturing-json-ld-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebPage",
                "url": "https://www.vegnar.com/manufacturing",
                "name": "Sugarcane Bagasse Manufacturer in India — Vegnar Green Manufacturing Unit",
                "description": "Vegnar Green operates a 50,000+ sq.ft. ISO-certified bagasse manufacturing facility in Gujarat, India with 5M+ units/month capacity serving 15+ export countries.",
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
                      "name": "Manufacturing",
                      "item": "https://www.vegnar.com/manufacturing"
                    }
                  ]
                }
              },
              {
                "@type": "ManufacturingBusiness",
                "name": "Vegnar Green Manufacturing Facility",
                "url": "https://www.vegnar.com/manufacturing",
                "description": "ISO 9001 and ISO 14001 certified sugarcane bagasse tableware manufacturing unit in Rajkot, Gujarat, India.",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Rajkot",
                  "addressRegion": "Gujarat",
                  "addressCountry": "IN"
                },
                "openingHours": "Mo-Sa 09:00-18:00",
                "knowsAbout": [
                  "Sugarcane bagasse tableware manufacturing",
                  "Biodegradable packaging",
                  "Compostable food containers",
                  "Eco-friendly disposable products"
                ]
              },
              {
                "@type": "HowTo",
                "name": "How Sugarcane Bagasse Tableware is Manufactured",
                "description": "The complete manufacturing process of turning sugarcane agricultural waste into premium biodegradable tableware.",
                "step": [
                  {
                    "@type": "HowToStep",
                    "position": 1,
                    "name": "Sugarcane Cultivation",
                    "text": "Sugarcane is cultivated as a fast-growing, renewable resource that absorbs CO2 during growth."
                  },
                  {
                    "@type": "HowToStep",
                    "position": 2,
                    "name": "Harvesting",
                    "text": "Mature sugarcane stalks are harvested and transported to processing facilities."
                  },
                  {
                    "@type": "HowToStep",
                    "position": 3,
                    "name": "Pulp Extraction",
                    "text": "After juice extraction, sugarcane bagasse is processed into pulp — transforming agricultural waste into raw material."
                  },
                  {
                    "@type": "HowToStep",
                    "position": 4,
                    "name": "Sheet Formation",
                    "text": "The bagasse pulp is molded and pressed into uniform sheets using heat and pressure."
                  },
                  {
                    "@type": "HowToStep",
                    "position": 5,
                    "name": "Product Manufacturing",
                    "text": "Sheets are cut, shaped and molded into final tableware products like plates, bowls and containers."
                  },
                  {
                    "@type": "HowToStep",
                    "position": 6,
                    "name": "Biodegradation",
                    "text": "After use, products naturally decompose within 60-90 days in composting conditions."
                  }
                ]
              }
            ]
          })
        }}
      />
      <ManufacturingSection />
    </>
  );
}
