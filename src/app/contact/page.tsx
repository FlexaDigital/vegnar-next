import { metadata } from './metadata';
import Script from 'next/script';
import ContactPage from '@/components/Contact/ContactPage';

export { metadata };

export default function Page() {
  return (
    <>
      <Script
        id="contact-json-ld-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "ContactPage",
                "url": "https://www.vegnar.com/contact",
                "name": "Contact Vegnar Green — Sustainable Packaging Enquiries",
                "description": "Contact Vegnar Green for wholesale bagasse tableware inquiries, export quotes, and partnership opportunities.",
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
                      "name": "Contact",
                      "item": "https://www.vegnar.com/contact"
                    }
                  ]
                }
              },
              {
                "@type": "LocalBusiness",
                "name": "Vegnar Green",
                "url": "https://www.vegnar.com",
                "telephone": "+91-9998040373",
                "email": "connect@vegnar.com",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "B623, RK Iconic, Sheetal Park, 150 Feet Ring Rd",
                  "addressLocality": "Rajkot",
                  "addressRegion": "Gujarat",
                  "postalCode": "360007",
                  "addressCountry": "IN"
                },
                "sameAs": ["https://www.linkedin.com/company/vegnargreens/"],
                "priceRange": "$$",
                "currenciesAccepted": "INR, USD",
                "openingHoursSpecification": [
                  {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": [
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday"
                    ],
                    "opens": "09:00",
                    "closes": "18:00"
                  }
                ]
              }
            ]
          })
        }}
      />
      <ContactPage />
    </>
  );
}
