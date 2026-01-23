import React from "react";

export default function ManufacturingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* FAQ Schema ONLY for Manufacturing Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Are you a sugarcane bagasse manufacturer in India?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, Vegnar Green is an in-house sugarcane bagasse manufacturer in India with advanced production facilities for biodegradable tableware.",
                },
              },
              {
                "@type": "Question",
                name: "Where is your sugarcane bagasse manufacturing unit located?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Our manufacturing unit is located in India and is strategically positioned for raw material sourcing and exports.",
                },
              },
              {
                "@type": "Question",
                name: "Do you export sugarcane bagasse tableware?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, Vegnar Green exports sugarcane bagasse tableware to global markets including the USA, Europe, and the Middle East.",
                },
              },
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
