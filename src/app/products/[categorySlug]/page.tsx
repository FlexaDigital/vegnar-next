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
      title: 'Vegnar Bagasse Products - Sugarcane Bagasse Tableware | Vegnar Greens',
      description: 'Premium Vegnar bagasse products made from sugarcane bagasse. Complete range of biodegradable tableware including plates, bowls, clamshells & cups from Vegnar Greens.',
      keywords: 'Vegnar bagasse products, Vegnar Greens tableware, sugarcane bagasse products, biodegradable tableware, eco-friendly packaging, compostable tableware, sustainable products, Vegnar plates, Vegnar bowls, Vegnar clamshells, Vegnar cups, bagasse tableware manufacturer, wholesale bagasse products, bulk biodegradable tableware',
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
  } else if (categorySlug === 'plates') {
    return {
      title: 'Vegnar Plates - Sugarcane Bagasse Plates | Vegnar Greens',
      description: 'Premium sugarcane bagasse plates by Vegnar Greens. Biodegradable bagasse plates including round plates, compartment plates & square plates for restaurants.',
      keywords: 'Vegnar plates, Vegnar Greens plates, Vegnar round plates, Vegnar compartment plates, sugarcane bagasse plates, biodegradable plates, eco-friendly plates, compostable plates, restaurant plates, catering plates, disposable plates, microwave safe plates, wholesale plates, bulk plates, plate manufacturer',
      openGraph: {
        title: 'Vegnar Plates - Premium Sugarcane Bagasse Plates | Vegnar Greens',
        description: 'Discover Vegnar plates made from sugarcane bagasse. Perfect eco-friendly solution for restaurants and food service businesses.',
        url: 'https://vegnar.com/products/plates',
        type: 'website',
      },
      alternates: { canonical: 'https://vegnar.com/products/plates' },
      robots: 'index, follow',
      authors: [{ name: 'Vegnar Greens' }],
      publisher: 'Vegnar Greens',
    };
  } else if (categorySlug === 'cups') {
    return {
      title: 'Vegnar Cups - Sugarcane Bagasse Cups | Vegnar Greens',
      description: 'Premium sugarcane bagasse cups by Vegnar Greens. Biodegradable bagasse cups for hot & cold beverages. Microwave safe compostable cups.',
      keywords: 'Vegnar cups, Vegnar Greens cups, Vegnar bagasse cups, sugarcane bagasse cups, biodegradable cups, eco-friendly cups, compostable cups, disposable cups, coffee cups, tea cups, beverage cups, microwave safe cups, wholesale cups, bulk cups, cup manufacturer',
      openGraph: {
        title: 'Vegnar Cups - Premium Beverage Cups | Vegnar Greens',
        description: 'Discover Vegnar cups made from sugarcane bagasse. Perfect for hot and cold beverages.',
        url: 'https://vegnar.com/products/cups',
        type: 'website',
      },
      alternates: { canonical: 'https://vegnar.com/products/cups' },
      robots: 'index, follow',
      authors: [{ name: 'Vegnar Greens' }],
      publisher: 'Vegnar Greens',
    };
  } else if (categorySlug === 'wooden-cutlery') {
    return {
      title: 'Vegnar Wooden Cutlery - Eco-Friendly Cutlery | Vegnar Greens',
      description: 'Premium wooden cutlery by Vegnar Greens. Biodegradable wooden spoons, forks & knives. Eco-friendly alternative to plastic cutlery.',
      keywords: 'Vegnar wooden cutlery, Vegnar Greens cutlery, wooden spoons, wooden forks, wooden knives, biodegradable cutlery, eco-friendly cutlery, sustainable cutlery, disposable wooden cutlery, restaurant cutlery, catering cutlery, wholesale cutlery, bulk cutlery, cutlery manufacturer',
      openGraph: {
        title: 'Vegnar Wooden Cutlery - Sustainable Cutlery | Vegnar Greens',
        description: 'Discover Vegnar wooden cutlery made from sustainable wood. Perfect eco-friendly alternative to plastic.',
        url: 'https://vegnar.com/products/wooden-cutlery',
        type: 'website',
      },
      alternates: { canonical: 'https://vegnar.com/products/wooden-cutlery' },
      robots: 'index, follow',
      authors: [{ name: 'Vegnar Greens' }],
      publisher: 'Vegnar Greens',
    };
  } else if (categorySlug === 'trays') {
    return {
      title: 'Vegnar Trays - Sugarcane Bagasse Trays | Vegnar Greens',
      description: 'Premium sugarcane bagasse trays by Vegnar Greens. Biodegradable bagasse trays including compartment trays & meal trays for food service.',
      keywords: 'Vegnar trays, Vegnar Greens trays, Vegnar meal trays, Vegnar compartment trays, sugarcane bagasse trays, biodegradable trays, eco-friendly trays, compostable trays, food service trays, restaurant trays, catering trays, disposable trays, wholesale trays, bulk trays, tray manufacturer',
      openGraph: {
        title: 'Vegnar Trays - Premium Food Service Trays | Vegnar Greens',
        description: 'Discover Vegnar trays made from sugarcane bagasse. Perfect for food service and catering.',
        url: 'https://vegnar.com/products/trays',
        type: 'website',
      },
      alternates: { canonical: 'https://vegnar.com/products/trays' },
      robots: 'index, follow',
      authors: [{ name: 'Vegnar Greens' }],
      publisher: 'Vegnar Greens',
    };
  } else if (categorySlug === 'containers') {
    return {
      title: 'Vegnar Containers - Sugarcane Bagasse Containers | Vegnar Greens',
      description: 'Premium sugarcane bagasse containers by Vegnar Greens. Biodegradable bagasse containers for food packaging & takeaway delivery.',
      keywords: 'Vegnar containers, Vegnar Greens containers, Vegnar food containers, sugarcane bagasse containers, biodegradable containers, eco-friendly containers, compostable containers, takeaway containers, food packaging, restaurant containers, wholesale containers, bulk containers, container manufacturer',
      openGraph: {
        title: 'Vegnar Containers - Premium Food Containers | Vegnar Greens',
        description: 'Discover Vegnar containers made from sugarcane bagasse. Perfect for food packaging and takeaway.',
        url: 'https://vegnar.com/products/containers',
        type: 'website',
      },
      alternates: { canonical: 'https://vegnar.com/products/containers' },
      robots: 'index, follow',
      authors: [{ name: 'Vegnar Greens' }],
      publisher: 'Vegnar Greens',
    };
  } else if (categorySlug === 'meal-trays') {
    return {
      title: 'Vegnar Meal Trays - Compartment Meal Trays | Vegnar Greens',
      description: 'Premium Vegnar meal trays with compartments made from sugarcane bagasse. Perfect for restaurants, catering & food service. Microwave safe & biodegradable.',
      keywords: 'Vegnar meal trays, Vegnar Greens meal trays, compartment meal trays, sugarcane bagasse meal trays, biodegradable meal trays, eco-friendly meal trays, restaurant meal trays, catering trays, food service trays, disposable meal trays, wholesale meal trays, bulk meal trays',
      openGraph: { title: 'Vegnar Meal Trays | Vegnar Greens', description: 'Premium compartment meal trays made from sugarcane bagasse', url: 'https://vegnar.com/products/meal-trays', type: 'website' },
      alternates: { canonical: 'https://vegnar.com/products/meal-trays' },
      robots: 'index, follow', authors: [{ name: 'Vegnar Greens' }], publisher: 'Vegnar Greens'
    };
  } else if (categorySlug === 'round-plates') {
    return {
      title: 'Vegnar Round Plates - Sugarcane Bagasse Round Plates | Vegnar Greens',
      description: 'Premium Vegnar round plates made from sugarcane bagasse. Available in multiple sizes. Eco-friendly biodegradable round plates for restaurants & events.',
      keywords: 'Vegnar round plates, Vegnar Greens round plates, sugarcane bagasse round plates, biodegradable round plates, eco-friendly round plates, compostable round plates, restaurant round plates, disposable round plates, wholesale round plates, bulk round plates',
      openGraph: { title: 'Vegnar Round Plates | Vegnar Greens', description: 'Premium round plates made from sugarcane bagasse', url: 'https://vegnar.com/products/round-plates', type: 'website' },
      alternates: { canonical: 'https://vegnar.com/products/round-plates' },
      robots: 'index, follow', authors: [{ name: 'Vegnar Greens' }], publisher: 'Vegnar Greens'
    };
  } else if (categorySlug === 'sipper-lid') {
    return {
      title: 'Vegnar Sipper Lids - Biodegradable Cup Lids | Vegnar Greens',
      description: 'Premium Vegnar sipper lids made from sugarcane bagasse. Perfect for hot & cold beverages. Eco-friendly biodegradable lids for cups & containers.',
      keywords: 'Vegnar sipper lids, Vegnar Greens lids, sugarcane bagasse lids, biodegradable lids, eco-friendly lids, compostable lids, cup lids, beverage lids, coffee lids, tea lids, wholesale lids, bulk lids',
      openGraph: { title: 'Vegnar Sipper Lids | Vegnar Greens', description: 'Premium sipper lids made from sugarcane bagasse', url: 'https://vegnar.com/products/sipper-lid', type: 'website' },
      alternates: { canonical: 'https://vegnar.com/products/sipper-lid' },
      robots: 'index, follow', authors: [{ name: 'Vegnar Greens' }], publisher: 'Vegnar Greens'
    };
  } else if (categorySlug === 'takeaway-container') {
    return {
      title: 'Vegnar Takeaway Containers - Food Delivery Containers | Vegnar Greens',
      description: 'Premium Vegnar takeaway containers made from sugarcane bagasse. Perfect for food delivery, takeaway & packaging. Leak-proof & microwave safe.',
      keywords: 'Vegnar takeaway containers, Vegnar Greens containers, sugarcane bagasse containers, biodegradable takeaway containers, eco-friendly food containers, food delivery containers, takeaway boxes, restaurant containers, wholesale containers, bulk containers',
      openGraph: { title: 'Vegnar Takeaway Containers | Vegnar Greens', description: 'Premium takeaway containers made from sugarcane bagasse', url: 'https://vegnar.com/products/takeaway-container', type: 'website' },
      alternates: { canonical: 'https://vegnar.com/products/takeaway-container' },
      robots: 'index, follow', authors: [{ name: 'Vegnar Greens' }], publisher: 'Vegnar Greens'
    };
  } else if (categorySlug === 'bagasse-tray') {
    return {
      title: 'Vegnar Bagasse Trays - Sugarcane Bagasse Trays | Vegnar Greens',
      description: 'Premium Vegnar bagasse trays made from sugarcane bagasse. Food service trays, serving trays & compartment trays. Biodegradable & microwave safe.',
      keywords: 'Vegnar bagasse trays, Vegnar Greens trays, sugarcane bagasse trays, biodegradable trays, eco-friendly trays, food service trays, serving trays, compartment trays, restaurant trays, wholesale trays, bulk trays',
      openGraph: { title: 'Vegnar Bagasse Trays | Vegnar Greens', description: 'Premium bagasse trays made from sugarcane bagasse', url: 'https://vegnar.com/products/bagasse-tray', type: 'website' },
      alternates: { canonical: 'https://vegnar.com/products/bagasse-tray' },
      robots: 'index, follow', authors: [{ name: 'Vegnar Greens' }], publisher: 'Vegnar Greens'
    };
  } else if (categorySlug === 'bio-bags') {
    return {
      title: 'Vegnar Bio Bags - Biodegradable Bags | Vegnar Greens',
      description: 'Premium Vegnar bio bags made from plant-based materials. Compostable shopping bags, carry bags & packaging bags. Eco-friendly alternative to plastic bags.',
      keywords: 'Vegnar bio bags, Vegnar Greens bags, biodegradable bags, compostable bags, eco-friendly bags, sustainable bags, shopping bags, carry bags, packaging bags, plastic-free bags, wholesale bags, bulk bags, bag manufacturer',
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
  } else if (categorySlug === 'bowls') {
    return {
      title: 'Vegnar Bowls - Sugarcane Bagasse Bowls | Vegnar Greens',
      description: 'Premium sugarcane bagasse bowls by Vegnar Greens. Biodegradable bagasse bowls perfect for restaurants & food service. Microwave safe compostable bowls.',
      keywords: [
        // Brand Keywords
        'Vegnar bowls',
        'Vegnar Greens bowls',
        'Vegnar bagasse bowls',
        
        // Product Specific
        'sugarcane bagasse bowls',
        'biodegradable bowls',
        'eco-friendly bowls',
        'compostable bowls',
        'sustainable bowls',
        
        // Applications
        'restaurant bowls',
        'catering bowls',
        'food service bowls',
        'disposable bowls',
        'takeaway bowls',
        
        // Features
        'microwave safe bowls',
        'leak proof bowls',
        'grease resistant bowls',
        'freezer safe bowls',
        
        // Business Terms
        'wholesale bowls',
        'bulk bowls',
        'bowl manufacturer',
        'bowl supplier',
        'export quality bowls'
      ].join(', '),
      openGraph: {
        title: 'Vegnar Bowls - Premium Sugarcane Bagasse Bowls | Vegnar Greens',
        description: 'Discover Vegnar bowls made from sugarcane bagasse. Perfect eco-friendly solution for restaurants and food service businesses.',
        url: 'https://vegnar.com/products/bowls',
        type: 'website',
      },
      alternates: {
        canonical: 'https://vegnar.com/products/bowls',
      },
      robots: 'index, follow',
      authors: [{ name: 'Vegnar Greens' }],
      publisher: 'Vegnar Greens',
    };
  } else if (categorySlug === 'clamshells') {
    return {
      title: 'Vegnar Clamshells - Sugarcane Bagasse Clamshells | Vegnar Greens',
      description: 'Premium sugarcane bagasse clamshells by Vegnar Greens. Biodegradable bagasse clamshells perfect for takeaway & food delivery packaging.',
      keywords: [
        // Brand Keywords
        'Vegnar clamshells',
        'Vegnar Greens clamshells',
        'Vegnar bagasse clamshells',
        
        // Product Specific
        'sugarcane bagasse clamshells',
        'biodegradable clamshells',
        'eco-friendly clamshells',
        'compostable clamshells',
        'sustainable clamshells',
        
        // Applications
        'takeaway containers',
        'food delivery containers',
        'restaurant containers',
        'to-go boxes',
        'food packaging containers',
        
        // Features
        'leak proof clamshells',
        'secure lid clamshells',
        'microwave safe containers',
        'grease resistant containers',
        
        // Business Terms
        'wholesale clamshells',
        'bulk food containers',
        'clamshell manufacturer',
        'container supplier',
        'export quality containers'
      ].join(', '),
      openGraph: {
        title: 'Vegnar Clamshells - Premium Food Containers | Vegnar Greens',
        description: 'Discover Vegnar clamshells made from sugarcane bagasse. Perfect eco-friendly packaging solution for takeaway and food delivery.',
        url: 'https://vegnar.com/products/clamshells',
        type: 'website',
      },
      alternates: {
        canonical: 'https://vegnar.com/products/clamshells',
      },
      robots: 'index, follow',
      authors: [{ name: 'Vegnar Greens' }],
      publisher: 'Vegnar Greens',
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
        <main className="relative p-4 sm:p-6 md:p-8 pt-[80px]">
          <div className="absolute inset-0 bg-[url('/assets/bg-green.png')] bg-repeat opacity-15 pointer-events-none" style={{backgroundSize: '200px'}}></div>
          <section className="relative min-h-[250px] sm:min-h-[300px] md:h-[400px] bg-green-100 flex flex-col justify-center items-start px-4 sm:px-8 md:px-16 mb-6 sm:mb-8 md:mb-10 rounded-xl sm:rounded-2xl shadow-md overflow-hidden z-10">
            <div className="z-10 w-full md:max-w-3xl">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-green-900 mb-2 sm:mb-3">{category.name}</h1>
              <p className="text-gray-700 mt-2 sm:mt-3 md:mt-4 max-w-2xl text-sm sm:text-base md:text-lg">{category.description || 'No description available.'}</p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-green-200 to-white opacity-60 z-0"></div>
          </section>

          <nav className="mb-6 sm:mb-8 overflow-x-auto whitespace-nowrap px-1">
            <ol className="list-reset flex items-center space-x-2 text-sm sm:text-base">
              <li>
                <Link href="/" className="hover:underline text-green-800 font-medium">
                  Home
                </Link>
              </li>
              <li className="text-gray-500">/</li>
              <li>
                <Link href="/products" className="hover:underline text-green-800 font-medium">
                  Products
                </Link>
              </li>
              <li className="text-gray-500">/</li>
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
