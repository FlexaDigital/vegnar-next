// // // src/app/layout.tsx
// // import "@/styles/globals.css"; // Import global styles
// // import Header from "../components/header";
// // import React from "react";
// // import Footer from "@/components/Footer";

// // export const metadata = {
// //   title:
// //     "Vegnar Greens | Leading Manufacturer of Sugarcane Bagasse Tableware & Areca Palm Leaf",
// //   description: "Your site description",
// // };

// // export default function RootLayout({
// //   children,
// // }: {
// //   children: React.ReactNode;
// // }) {
// //   return (
// //     <html lang="en">
// //       <head>
// //         {/* Add Font Awesome CDN here */}
// //         <link
// //           rel="stylesheet"
// //           href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
// //           integrity="sha512-KyZXEAg3QhqLMpG8r+Knujsl5+5hb7x+qE9+lq6+Tz4pX8mRsvF+eQ2Lg3LrU9qD7oE7e/Jz9gn0JZ6jY2N0xQ=="
// //           crossOrigin="anonymous"
// //           referrerPolicy="no-referrer"
// //         />
// //       </head>
// //       <body data-new-gr-c-s-check-loaded="14.1104.0" data-gr-ext-installed="">
// //         <Header />
// //         {children}
// //         <Footer />
// //       </body>
// //     </html>
// //   );
// // }


// import "@/styles/globals.css";
// import React from "react";
// import Footer from "@/components/Footer";
// import Header from "@/components/header";
// import { fetchParentProductCategories } from "@/lib/api";
// import { ProductsProvider } from "@/lib/products-context";
// import GlobalLoader from "@/components/global-loader";  
// import { LoadingProvider } from "@/lib/context/LoadingContext";
// import WhatsAppButton from "@/components/WhatsAppButton";
// import TawkTo from "@/components/Talkto";
// import { Viewport } from "next";

// interface ProductCategory {
//   id: number;
//   name: string;
//   slug: string;
//   parent: number;
// }

// export const viewport: Viewport = {
//   width: 'device-width',
//   initialScale: 1,
//   maximumScale: 1,
//   userScalable: false,
//   themeColor: '#ffffff',
// };

// export const metadata = {
//   title:
//     "Vegnar Green | Sustainable Biodegradable Products Manufacturer",
//   description: "Premium biodegradable tableware and eco-friendly bags made from sugarcane bagasse and areca palm leaves. 100% compostable packaging solutions for a sustainable future.",
//   icons: {
//     icon: [
//       { url: '/favicon.ico', sizes: 'any' },
//       { url: '/favicon.png', type: 'image/png' }
//     ],
//     apple: [
//       { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
//     ],
//     shortcut: '/favicon.png',
//   },
//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//       'max-video-preview': -1,
//       'max-image-preview': 'large',
//       'max-snippet': -1,
//     },
//   },
//   verification: {
//     google: 'RVHX2AHo39dHrvLKRZbcn2aQh8_UX8wasOwCrKR5SMM',
//   },
//   alternates: {
//     canonical: 'https://www.vegnar.com',
//   },
//   authors: [{ name: 'Vegnar Greens' }],
//   publisher: 'Vegnar Greens',
//   generator: 'Next.js',
//   applicationName: 'Vegnar Greens',
//   referrer: 'origin-when-cross-origin',
//   keywords: ['biodegradable tableware', 'eco-friendly packaging', 'sugarcane bagasse', 'areca palm leaf', 'sustainable products', 'compostable packaging'],
//   creator: 'Vegnar Greens',
//   formatDetection: {
//     email: false,
//     address: false,
//     telephone: false,
//   },
// };

// export default async function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const parentCategories = await fetchParentProductCategories();

//   return (
//     <html lang="en">
//       <head>
//         <link
//           rel="stylesheet"
//           href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
//           integrity="sha512-KyZXEAg3QhqLMpG8r+Knujsl5+5hb7x+qE9+lq6+Tz4pX8mRsvF+eQ2Lg3LrU9qD7oE7e/Jz9gn0JZ6jY2N0xQ=="
//           crossOrigin="anonymous"
//           referrerPolicy="no-referrer"
//         />
//         <meta name="google-site-verification" content="RVHX2AHo39dHrvLKRZbcn2aQh8_UX8wasOwCrKR5SMM" />
//       </head>
//       <body className="min-h-screen flex flex-col antialiased overflow-x-hidden">
//         <LoadingProvider>
//           <ProductsProvider>
//             <Header categories={parentCategories} />
//             <GlobalLoader />
//             <main className="flex-grow pt-[var(--header-height)]">
//               {children}
//             </main>
//             <Footer />
//             <WhatsAppButton />
//           </ProductsProvider>
//         </LoadingProvider>
//         <TawkTo />
//       </body>
//     </html>
//   );
// }


import "@/styles/globals.css";
import React from "react";
import Footer from "@/components/Footer";
import Header from "@/components/header";
import { fetchParentProductCategories } from "@/lib/api";
import { ProductsProvider } from "@/lib/products-context";
import GlobalLoader from "@/components/global-loader";
import { LoadingProvider } from "@/lib/context/LoadingContext";
import WhatsAppButton from "@/components/WhatsAppButton";
import TawkTo from "@/components/Talkto";
import { Viewport } from "next";
import Script from "next/script"; // ✅ IMPORTANT

interface ProductCategory {
  id: number;
  name: string;
  slug: string;
  parent: number;
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#ffffff",
};

export const metadata = {
  title: "Vegnar Green | Sustainable Biodegradable Products Manufacturer",
  description:
    "Premium biodegradable tableware and eco-friendly bags made from sugarcane bagasse and areca palm leaves. 100% compostable packaging solutions for a sustainable future.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "RVHX2AHo39dHrvLKRZbcn2aQh8_UX8wasOwCrKR5SMM",
    yandex: "c904a809eacce6d1",
  },
  alternates: {
    canonical: "https://www.vegnar.com",
  },
  authors: [{ name: "Vegnar Greens" }],
  publisher: "Vegnar Greens",
  generator: "Next.js",
  applicationName: "Vegnar Greens",
  referrer: "origin-when-cross-origin",
  keywords: [
    "biodegradable tableware",
    "eco-friendly packaging",
    "sugarcane bagasse",
    "areca palm leaf",
    "sustainable products",
    "compostable packaging",
  ],
  creator: "Vegnar Greens",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const parentCategories = await fetchParentProductCategories();

  return (
    <html lang="en">
      <head>
        {/* Font Awesome */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
          integrity="sha512-Avb2QiuDEEvB4bZJYdft2mNjVShBftLdPG8FJ0V7irTLQ8Uo0qcPxh4Plq7G5tGm0rU+1SPhVotteLpBERwTkw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />

        {/* Yandex Verification */}
        <meta name="yandex-verification" content="c904a809eacce6d1" />

        {/* ✅ GA4 Analytics Script */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-1SB6WR71EG"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1SB6WR71EG');
          `}
        </Script>
      </head>

      <body className="min-h-screen flex flex-col antialiased overflow-x-hidden">
        <LoadingProvider>
          <ProductsProvider>
            <Header categories={parentCategories} />
            <GlobalLoader />
            <main className="flex-grow pt-[var(--header-height)]">
              {children}
            </main>
            <Footer />
            <WhatsAppButton />
          </ProductsProvider>
        </LoadingProvider>
        <TawkTo />
      </body>
    </html>
  );
}
