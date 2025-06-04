import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Eco-Friendly Products | Biodegradable Tableware & Bio Bags - Vegnar Green",
  description: "Discover our complete range of sustainable products including sugarcane bagasse tableware, areca palm leaf plates, bio bags, and compostable packaging solutions. All products are 100% biodegradable and food-safe certified.",
  keywords: [
    "biodegradable tableware",
    "eco-friendly products",
    "sugarcane bagasse plates",
    "bagasse bowls",
    "areca palm leaf plates",
    "compostable packaging",
    "bio bags",
    "sustainable food containers",
    "green packaging solutions",
    "biodegradable food packaging",
    "eco-friendly disposables",
    "compostable tableware",
    "zero waste products",
    "plastic-free packaging",
    "sustainable food service items",
    "vegnar green products",
    "environmentally friendly packaging",
    "green restaurant supplies",
    "biodegradable takeout containers",
    "eco-conscious business supplies"
  ],
  openGraph: {
    title: "Eco-Friendly Products | Biodegradable Tableware & Bio Bags",
    description: "Explore our complete range of sustainable products. From sugarcane bagasse tableware to bio bags - all 100% biodegradable and food-safe certified.",
    url: "https://www.vegnar.com/products",
    type: "website",
    siteName: "Vegnar Green",
    images: [
      {
        url: "https://www.vegnar.com/images/products-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Vegnar Green Sustainable Products Collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@VegnarGreens",
    creator: "@VegnarGreens",
    title: "Sustainable Products by Vegnar Green",
    description: "Browse our collection of eco-friendly tableware and packaging solutions. 100% biodegradable, food-safe, and planet-friendly.",
    images: ["https://www.vegnar.com/images/products-banner.jpg"],
  },
  alternates: {
    canonical: "https://www.vegnar.com/products",
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-video-preview': -1,
    'max-snippet': -1,
  },
}; 