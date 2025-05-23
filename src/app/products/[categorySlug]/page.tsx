// app/products/[categorySlug]/page.tsx

import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ProductList from '@/components/ProductList';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

type Category = {
  id: number;
  name: string;
  slug: string;
  description: string;
  parent: number;
};

type Product = {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  product_category: number[];
  acf?: { product_size?: string };
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url?: string }>;
  };
};

type Props = {
  params: { categorySlug: string };
};

// Generic fetch helper with error handling and timeout
async function fetchWithTimeout<T>(url: string, options: RequestInit = {}): Promise<T> {
  const timeout = 10000; // 10 seconds timeout
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    clearTimeout(id);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timed out');
      }
      throw error;
    }
    throw new Error('An unknown error occurred');
  }
}

async function fetchCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const data = await fetchWithTimeout<Category[]>(
      `https://cms.vegnar.com/wp-json/wp/v2/product_category?slug=${slug}`,
      {
        next: { revalidate: 60 }, // Cache for 1 minute
      }
    );
    return data[0] || null;
  } catch (error) {
    console.error('Error fetching category:', error);
    return null;
  }
}

async function fetchProductsByCategoryId(categoryId: number): Promise<Product[]> {
  try {
    return await fetchWithTimeout<Product[]>(
      `https://cms.vegnar.com/wp-json/wp/v2/products?product_category=${categoryId}&per_page=100&_embed`,
      {
        next: { revalidate: 60 }, // Cache for 1 minute
      }
    );
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

async function fetchAllCategories(): Promise<Category[]> {
  try {
    return await fetchWithTimeout<Category[]>(
      `https://cms.vegnar.com/wp-json/wp/v2/product_category?per_page=100`,
      {
        next: { revalidate: 60 }, // Cache for 1 minute
      }
    );
  } catch (error) {
    console.error('Error fetching all categories:', error);
    return [];
  }
}

async function fetchSubCategories(parentId: number): Promise<Category[]> {
  try {
    return await fetchWithTimeout<Category[]>(
      `https://cms.vegnar.com/wp-json/wp/v2/product_category?parent=${parentId}&per_page=100`,
      {
        next: { revalidate: 60 }, // Cache for 1 minute
      }
    );
  } catch (error) {
    console.error('Failed to fetch subcategories:', error);
    return [];
  }
}

// Example SEO description generator
function generateSeoDescription(categoryName: string, products: Product[]): string {
  if (products.length === 0) {
    return `Explore our collection of ${categoryName} products at Vegnar Greens. Sustainable and eco-friendly options for every need.`;
  }
  return `Discover premium ${categoryName} products including ${products
    .slice(0, 5)
    .map((p) => p.title.rendered)
    .join(', ')} and more at Vegnar Greens. Sustainable and eco-friendly solutions for your business.`;
}

function generateSchemaOrgData(category: Category, products: Product[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: category.name,
    description: category.description,
    url: `https://www.vegnar.com/products/${category.slug}`,
    publisher: {
      '@type': 'Organization',
      name: 'Vegnar Green',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.vegnar.com/logo.png',
      },
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: products.map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Product',
          name: product.title.rendered,
          description: product.content.rendered.replace(/(<([^>]+)>)/gi, '').slice(0, 160),
          image: product._embedded?.['wp:featuredmedia']?.[0]?.source_url,
          url: `https://www.vegnar.com/products/${category.slug}/${product.slug}`,
        },
      })),
    },
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categorySlug } = params;

  if (categorySlug === 'bagasse-products') {
    return {
      title: 'Sugarcane Bagasse Tableware | Vegnar Greens',
      description:
        "Explore Vegnar's range of premium sugarcane bagasse products – biodegradable plates, bowls, trays, lids, and eco-friendly cutlery. Compostable, durable, and sustainable solutions for modern food service.",
      keywords:
        'sugarcane bagasse products, bagasse tableware, biodegradable plates, compostable bowls, eco-friendly cutlery, bagasse compartment plates, round bagasse plates, bagasse trays, sugarcane fiber lids, disposable eco tableware, sustainable packaging, bagasse clamshells, bagasse lunch trays, bagasse soup bowls, biodegradable food containers, round eco plates, square bagasse plates, eco lids for containers, sugarcane takeout boxes, disposable party plates, natural fiber cutlery, plant-based tableware, compostable lunch boxes, bagasse food trays, molded fiber tableware, bagasse dinnerware, eco plates and bowls, biodegradable tableware manufacturer, eco-friendly food packaging, bagasse cups and lids, 3 compartment bagasse plates, 5 compartment biodegradable tray, sustainable restaurant supplies, bulk eco plates and bowls, export quality bagasse plates, bagasse tableware exporter, FSC certified tableware, disposable eco lids, microwave safe bagasse products, plastic-free food packaging',
      openGraph: {
        title: 'Sugarcane Bagasse Tableware - Compostable Plates, Bowls & Cutlery | Vegnar',
        description:
          'High-quality biodegradable sugarcane bagasse tableware from Vegnar – perfect for eco-conscious businesses. Plates, bowls, trays, cutlery, lids & more.',
        url: 'https://vegnar.com/products/sugarcane-bagasse',
        type: 'website',
      },
      alternates: {
        canonical: 'https://vegnar.com/products/sugarcane-bagasse',
      },
      robots: 'index, follow',
      authors: [{ name: 'Vegnar Greens' }],
      publisher: 'Vegnar Greens',
    };
  } else if (categorySlug === 'bio-bags') {
    return {
      title: 'Biodegradable Bags | Vegnar Greens',
      description:
        'Shop Vegnar Greens for eco-friendly, biodegradable bags. Our compostable bags are perfect for reducing plastic waste. Find various sizes of sustainable bags.',
      keywords:
        'biodegradable bags, compostable bags, eco-friendly bags, plastic-free bags, sustainable bags, compostable shopping bags, biodegradable plastic bags',
      openGraph: {
        title: 'Biodegradable and Compostable Bags | Vegnar Greens',
        description:
          'Find a wide selection of biodegradable and compostable bags at Vegnar Greens. Reduce your environmental impact with our sustainable solutions.',
        url: 'https://vegnar.com/products/bio-bags',
        type: 'website',
      },
      alternates: {
        canonical: 'https://vegnar.com/products/bio-bags',
      },
      robots: 'index, follow',
    };
  } else if (categorySlug === 'areca-palm-tableware') {
    return {
      title: 'Areca Palm Leaf Plates & Tableware | Vegnar Greens',
      description:
        'Premium areca palm leaf plates, bowls & tableware - 100% natural, biodegradable, and eco-friendly. Elegant disposable dinnerware made from fallen palm leaves. Perfect for restaurants, events, and sustainable dining.',
      keywords: [
        // Product Types
        'areca palm leaf plates',
        'palm leaf bowls',
        'disposable palm leaf tableware',
        'areca leaf dinnerware',
        'palm leaf food containers',
        'areca nut plates',
        'natural palm leaf plates',
        'areca palm tableware',
        'eco-friendly palm plates',
        
        // Features & Benefits
        'biodegradable plates',
        'eco-friendly tableware',
        'chemical-free plates',
        'natural disposable plates',
        'sustainable dinnerware',
        'compostable palm plates',
        'microwave safe palm plates',
        'premium palm leaf dinnerware',
        
        // Applications
        'wedding palm plates',
        'party palm leaf tableware',
        'restaurant palm leaf plates',
        'catering palm leaf bowls',
        'event disposable plates',
        'luxury eco plates',
        
        // Business Terms
        'wholesale palm leaf plates',
        'bulk areca leaf tableware',
        'palm leaf plate manufacturer',
        'areca leaf plate supplier',
        'export quality palm plates',
        'areca tableware manufacturer',
        
        // Specifications
        'round palm leaf plates',
        'square palm leaf plates',
        'compartment palm leaf plates',
        'premium palm leaf tableware',
        'designer palm leaf plates',
        'disposable areca dinnerware'
      ].join(', '),
      openGraph: {
        title: 'Premium Areca Palm Leaf Plates & Tableware | Vegnar Greens',
        description: 'Discover our elegant collection of 100% natural areca palm leaf plates and tableware. Sustainable, biodegradable, and perfect for modern eco-conscious dining.',
        url: 'https://vegnar.com/products/areca-palm-tableware',
        type: 'website',
        images: [
          {
            url: 'https://vegnar.com/assets/img/areca-palm-plates.jpg',
            width: 1200,
            height: 630,
            alt: 'Areca Palm Leaf Plates Collection',
          },
        ],
      },
      alternates: {
        canonical: 'https://vegnar.com/products/areca-palm-tableware',
      },
      robots: 'index, follow',
      authors: [{ name: 'Vegnar Greens' }],
      publisher: 'Vegnar Greens',
    };
  }

  const category = await fetchCategoryBySlug(categorySlug);
  if (!category) {
    return {
      title: 'Category Not Found | Vegnar Greens',
      description: 'The requested product category was not found.',
      robots: 'noindex, nofollow',
    };
  }
  const products = await fetchProductsByCategoryId(category.id);
  const description = generateSeoDescription(category.name, products);

  return {
    title: `${category.name} | Vegnar Greens`,
    description,
    openGraph: {
      title: `${category.name} | Vegnar Greens`,
      description,
      url: `https://vegnar.com/products/${categorySlug}`,
      type: 'website',
    },
    alternates: {
      canonical: `https://vegnar.com/products/${categorySlug}`,
    },
  };
}

export default async function ProductCategoryPage({ params }: Props) {
  try {
    const category = await fetchCategoryBySlug(params.categorySlug);

    if (!category) {
      notFound();
      return null;
    }

    const [products, allCategories, subCategories] = await Promise.all([
      fetchProductsByCategoryId(category.id),
      fetchAllCategories(),
      fetchSubCategories(category.id),
    ]);

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateSchemaOrgData(category, products)),
          }}
        />
        <main className="p-8 pt-[80px]">
          <section className="relative h-[400px] bg-green-100 flex flex-col justify-center items-start px-8 md:px-16 mb-10 rounded-2xl shadow-md overflow-hidden">
            <div className="z-10">
              <h1 className="text-4xl md:text-5xl font-extrabold text-green-900">{category.name}</h1>
              <p className="text-gray-700 mt-4 max-w-2xl text-lg">{category.description || 'No description available.'}</p>
              <a
                href="/catalog.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-6 bg-green-700 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-green-800 transition duration-300"
              >
                Download Catalog
              </a>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-green-200 to-white opacity-60 z-0"></div>
          </section>

          <nav className="mb-8">
            <ol className="list-reset flex items-center space-x-2">
              <li>
                <Link href="/" className="hover:underline text-green-800 font-medium">
                  Home
                </Link>
              </li>
              <li>{'>'}</li>
              <li>
                <Link href="/products" className="hover:underline text-green-800 font-medium">
                  Products
                </Link>
              </li>
              <li>{'>'}</li>
              <li>
                <Link href={`/products/${category.slug}`} className="hover:underline text-green-800 font-medium">
                  {category.name}
                </Link>
              </li>
            </ol>
          </nav>

          <ProductList products={products} allCategories={allCategories} subCategories={subCategories} ProductCard={ProductCard} />
        </main>
      </>
    );
  } catch (error) {
    console.error('Error in ProductCategoryPage:', error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Products</h1>
          <p className="text-gray-600">We're having trouble loading the products. Please try again later.</p>
          <Link href="/" className="mt-6 inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
            Return Home
          </Link>
        </div>
      </div>
    );
  }
}
