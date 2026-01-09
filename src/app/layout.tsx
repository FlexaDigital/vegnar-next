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
import Script from "next/script";

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
  let parentCategories = [];
  try {
    parentCategories = await fetchParentProductCategories();
  } catch (error) {
    console.error('Failed to fetch parent categories:', error);
  }

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
        
        {/* GA4 Analytics Scripts */}
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
      </body>
    </html>
  );
}
