import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Green Insights – Biodegradable Living with Vegnar Green",
  description: "Explore our blog for expert tips, trends, and guides on biodegradable products, sustainable living, and eco-conscious lifestyle choices. Stay informed with Vegnar Green's latest insights.",
  keywords: [
    'biodegradable living',
    'eco-conscious lifestyle',
    'sustainable living tips',
    'green living blog',
    'Vegnar Green blog',
    'biodegradable products guide',
    'eco-friendly lifestyle',
    'sustainability tips',
    'green living advice',
    'environmental blog',
    'sustainable packaging insights',
    'bagasse tableware tips',
    'bio bags usage',
    'eco-friendly packaging',
    'zero waste living',
    'plastic-free lifestyle',
    'sustainable business practices',
    'environmental sustainability',
    'green business insights',
    'eco-friendly product guides'
  ],
  openGraph: {
    title: "Green Insights – Biodegradable Living Blog | Vegnar Green",
    description: "Expert tips, trends, and guides on biodegradable products and eco-conscious lifestyle. Join our community of sustainability enthusiasts.",
    url: "https://www.vegnar.com/blog",
    type: "website",
    siteName: "Vegnar Green",
    images: [
      {
        url: "https://www.vegnar.com/images/blog-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Vegnar Green Blog - Sustainable Living Insights",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@VegnarGreens",
    creator: "@VegnarGreens",
    title: "Sustainable Living Blog by Vegnar Green",
    description: "Tips, trends, and guides on biodegradable products and eco-conscious lifestyle. Stay updated with the latest in sustainable living.",
    images: ["https://www.vegnar.com/images/blog-banner.jpg"],
  },
  alternates: {
    canonical: "https://www.vegnar.com/blog",
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-video-preview': -1,
    'max-snippet': -1,
  },
}; 