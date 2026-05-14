// app/products/[categorySlug]/page.tsx

import { notFound } from "next/navigation";
import { Metadata } from "next";
import ProductList from "@/components/ProductList";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

import { WpProduct as Product, Category } from "@/types/product";

type Props = {
  params: Promise<{ categorySlug: string }>;
};

// Generic fetch helper with error handling and timeout
async function fetchWithTimeout<T>(
  url: string,
  options: RequestInit = {},
): Promise<T> {
  const timeout = 10000; // 10 seconds timeout
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
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
      if (error.name === "AbortError") {
        throw new Error("Request timed out");
      }
      throw error;
    }
    throw new Error("An unknown error occurred");
  }
}

async function fetchCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const data = await fetchWithTimeout<Category[]>(
      `https://cms.vegnar.com/wp-json/wp/v2/product_category?slug=${slug}`,
      {
        next: { revalidate: 60 }, // Cache for 1 minute
      },
    );
    return data[0] || null;
  } catch (error) {
    console.error("Error fetching category:", error);
    return null;
  }
}

async function fetchProductsByCategoryId(
  categoryId: number,
): Promise<Product[]> {
  try {
    return await fetchWithTimeout<Product[]>(
      `https://cms.vegnar.com/wp-json/wp/v2/products?product_category=${categoryId}&per_page=100&_embed`,
      {
        next: { revalidate: 60 }, // Cache for 1 minute
      },
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

async function fetchAllCategories(): Promise<Category[]> {
  try {
    return await fetchWithTimeout<Category[]>(
      `https://cms.vegnar.com/wp-json/wp/v2/product_category?per_page=100`,
      {
        next: { revalidate: 60 }, // Cache for 1 minute
      },
    );
  } catch (error) {
    console.error("Error fetching all categories:", error);
    return [];
  }
}

async function fetchSubCategories(parentId: number): Promise<Category[]> {
  try {
    return await fetchWithTimeout<Category[]>(
      `https://cms.vegnar.com/wp-json/wp/v2/product_category?parent=${parentId}&per_page=100`,
      {
        next: { revalidate: 60 }, // Cache for 1 minute
      },
    );
  } catch (error) {
    console.error("Failed to fetch subcategories:", error);
    return [];
  }
}

// Example SEO description generator
function generateSeoDescription(
  categoryName: string,
  products: Product[],
): string {
  if (products.length === 0) {
    return `Explore our collection of ${categoryName} products at Vegnar Greens. Sustainable and eco-friendly options for every need.`;
  }
  return `Discover premium ${categoryName} products including ${products
    .slice(0, 5)
    .map((p) => p.title.rendered)
    .join(
      ", ",
    )} and more at Vegnar Greens. Sustainable and eco-friendly solutions for your business.`;
}

function generateSchemaOrgData(category: Category, products: Product[]) {
  // Special schema for "round-plates" category
  if (category.slug === 'round-plates') {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'CollectionPage',
          url: 'https://www.vegnar.com/products/round-plates',
          name: 'Biodegradable Bagasse Round Plates — Vegnar Green Wholesale',
          description: 'Wholesale sugarcane bagasse round plates. Microwave safe, oil resistant, compostable in 90 days. FDA approved, SGS tested. Export to 15+ countries from India.',
          breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://www.vegnar.com/',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Products',
                item: 'https://www.vegnar.com/products/bagasse-products',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Round Plates',
                item: 'https://www.vegnar.com/products/round-plates',
              },
            ],
          },
        },
        {
          '@type': 'Product',
          name: 'Biodegradable Sugarcane Bagasse Round Plates',
          description: 'Premium sugarcane bagasse round plates. Microwave safe up to 220F, oil and water resistant, fully compostable within 90 days. Ideal for restaurants, catering and food service. Available in wholesale bulk quantities.',
          brand: {
            '@type': 'Brand',
            name: 'Vegnar Green',
          },
          manufacturer: {
            '@type': 'Organization',
            name: 'Vegnar Green',
            url: 'https://www.vegnar.com',
          },
          material: 'Sugarcane bagasse',
          additionalProperty: [
            {
              '@type': 'PropertyValue',
              name: 'Compostable',
              value: 'Within 90 days',
            },
            {
              '@type': 'PropertyValue',
              name: 'Microwave Safe',
              value: 'Up to 220 degrees Fahrenheit',
            },
            {
              '@type': 'PropertyValue',
              name: 'Certification',
              value: 'FDA, SGS, OK Compost, ISO 9001',
            },
            {
              '@type': 'PropertyValue',
              name: 'Material',
              value: '100% Sugarcane Bagasse',
            },
          ],
          offers: {
            '@type': 'Offer',
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
            seller: {
              '@type': 'Organization',
              name: 'Vegnar Green',
            },
            url: 'https://www.vegnar.com/quote',
          },
        },
      ],
    };
  }

  // Default schema for other categories
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
          description: product.content.rendered
            .replace(/(<([^>]+)>)/gi, '')
            .slice(0, 160),
          image: product._embedded?.['wp:featuredmedia']?.[0]?.source_url,
          url: `https://www.vegnar.com/products/${category.slug}/${product.slug}`,
        },
      })),
    },
  };
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categorySlug } = await params;

  if (categorySlug === "bagasse-products") {
    return {
      title: "Sugarcane Bagasse Tableware Manufacturer | Vegnar Greens",
      description:
        "Leading manufacturer of sugarcane bagasse tableware including plates, bowls, trays and clamshells. 100% biodegradable and export quality.",
      keywords:
        "sugarcane bagasse products, bagasse tableware manufacturer, biodegradable tableware, compostable tableware, eco-friendly food packaging, Vegnar Greens",
      alternates: {
        canonical: "https://vegnar.com/products/bagasse-products",
      },
      robots: "index, follow",
    };
  }

  if (categorySlug === "plates") {
    return {
      title: "Sugarcane Bagasse Plates Manufacturer | Vegnar Greens",
      description:
        "Buy premium sugarcane bagasse plates including round and compartment plates. Biodegradable, microwave-safe and ideal for food service.",
      keywords:
        "sugarcane bagasse plates, biodegradable plates, compostable plates, bagasse plates manufacturer, bulk bagasse plates, Vegnar Greens",
      alternates: { canonical: "https://vegnar.com/products/plates" },
      robots: "index, follow",
    };
  }

  if (categorySlug === "cups") {
    return {
      title: "Sugarcane Bagasse Cups Manufacturer | Vegnar Greens",
      description:
        "Eco-friendly sugarcane bagasse cups for hot and cold beverages. Compostable, microwave-safe and ideal for cafes and food service.",
      keywords:
        "sugarcane bagasse cups, biodegradable cups, compostable cups, eco-friendly cups, bagasse cup manufacturer, Vegnar Greens",
      alternates: { canonical: "https://vegnar.com/products/cups" },
      robots: "index, follow",
    };
  }

  if (categorySlug === "wooden-cutlery") {
    return {
      title:
        "Wooden Cutlery Manufacturer | Eco-Friendly Cutlery – Vegnar Greens",
      description:
        "Premium biodegradable wooden cutlery including spoons, forks and knives. Sustainable alternative to plastic cutlery.",
      keywords:
        "wooden cutlery manufacturer, biodegradable cutlery, eco-friendly cutlery, wooden spoons forks knives, bulk wooden cutlery, Vegnar Greens",
      alternates: { canonical: "https://vegnar.com/products/wooden-cutlery" },
      robots: "index, follow",
    };
  }

  if (categorySlug === "trays") {
    return {
      title: "Sugarcane Bagasse Trays Manufacturer | Vegnar Greens",
      description:
        "Biodegradable sugarcane bagasse trays including compartment and meal trays. Ideal for catering and food service.",
      keywords:
        "sugarcane bagasse trays, biodegradable trays, compostable trays, bagasse tray manufacturer, bulk food trays, Vegnar Greens",
      alternates: { canonical: "https://vegnar.com/products/trays" },
      robots: "index, follow",
    };
  }

  if (categorySlug === "containers") {
    return {
      title: "Sugarcane Bagasse Food Containers Manufacturer | Vegnar Greens",
      description:
        "Eco-friendly sugarcane bagasse food containers for takeaway and delivery. Compostable, leak-proof and microwave-safe.",
      keywords:
        "bagasse food containers, biodegradable containers, compostable containers, takeaway containers manufacturer, Vegnar Greens",
      alternates: { canonical: "https://vegnar.com/products/containers" },
      robots: "index, follow",
    };
  }

  if (categorySlug === "meal-trays") {
    return {
      title:
        "Bagasse Meal Trays Manufacturer | Compartment Trays – Vegnar Greens",
      description:
        "Premium compartment meal trays made from sugarcane bagasse. Perfect for catering, restaurants and food service.",
      keywords:
        "bagasse meal trays, compartment meal trays, biodegradable meal trays, bulk meal trays, Vegnar Greens",
      alternates: { canonical: "https://vegnar.com/products/meal-trays" },
      robots: "index, follow",
    };
  }

  if (categorySlug === "round-plates") {
    return {
      title: "Bagasse Round Plates Manufacturer | Vegnar Greens",
      description:
        "High-quality sugarcane bagasse round plates available in multiple sizes. Biodegradable and ideal for events and restaurants.",
      keywords:
        "bagasse round plates, biodegradable round plates, compostable plates, bulk round plates, Vegnar Greens",
      alternates: { canonical: "https://vegnar.com/products/round-plates" },
      robots: "index, follow",
    };
  }

  if (categorySlug === "sipper-lid") {
    return {
      title: "Biodegradable Sipper Lids Manufacturer | Vegnar Greens",
      description:
        "Eco-friendly biodegradable sipper lids made from sugarcane bagasse. Suitable for hot and cold beverages.",
      keywords:
        "biodegradable sipper lids, bagasse cup lids, compostable lids, eco-friendly lids, Vegnar Greens",
      alternates: { canonical: "https://vegnar.com/products/sipper-lid" },
      robots: "index, follow",
    };
  }

  if (categorySlug === "takeaway-container") {
    return {
      title: "Bagasse Takeaway Containers Manufacturer | Vegnar Greens",
      description:
        "Leak-proof and microwave-safe sugarcane bagasse takeaway containers for food delivery and packaging.",
      keywords:
        "bagasse takeaway containers, biodegradable food containers, compostable takeaway boxes, Vegnar Greens",
      alternates: {
        canonical: "https://vegnar.com/products/takeaway-container",
      },
      robots: "index, follow",
    };
  }

  if (categorySlug === "bagasse-tray") {
    return {
      title: "Sugarcane Bagasse Trays Manufacturer | Vegnar Greens",
      description:
        "Durable and compostable sugarcane bagasse trays for food service and catering use.",
      keywords:
        "sugarcane bagasse trays, biodegradable trays, compostable trays, food service trays, Vegnar Greens",
      alternates: { canonical: "https://vegnar.com/products/bagasse-tray" },
      robots: "index, follow",
    };
  }

  if (categorySlug === "bio-bags") {
    return {
      title: "Biodegradable & Compostable Bags Manufacturer | Vegnar Greens",
      description:
        "Plant-based biodegradable and compostable bags for shopping, packaging and carry use. Plastic-free solutions.",
      keywords:
        "biodegradable bags, compostable bags, eco-friendly bags, plastic-free bags, Vegnar Greens",
      alternates: { canonical: "https://vegnar.com/products/bio-bags" },
      robots: "index, follow",
    };
  }

  if (categorySlug === "bowls") {
    return {
      title:
        "Sugarcane Bagasse Bowls Manufacturer | Compostable Bowls – Vegnar Greens",
      description:
        "Buy premium sugarcane bagasse bowls for restaurants and food service. 100% biodegradable, microwave-safe and export quality.",
      keywords:
        "sugarcane bagasse bowls, biodegradable bowls, compostable bowls, eco-friendly bowls, bagasse bowls manufacturer, Vegnar Greens",
      alternates: { canonical: "https://vegnar.com/products/bowls" },
      robots: "index, follow",
    };
  }

  if (categorySlug === "clamshells") {
    return {
      title: "Bagasse Clamshell Containers Manufacturer | Vegnar Greens",
      description:
        "Eco-friendly sugarcane bagasse clamshell containers for takeaway and food delivery. Compostable and leak-resistant.",
      keywords:
        "bagasse clamshell containers, biodegradable clamshells, compostable food containers, takeaway packaging, Vegnar Greens",
      alternates: { canonical: "https://vegnar.com/products/clamshells" },
      robots: "index, follow",
    };
  }

  if (categorySlug === "areca-palm-tableware") {
    return {
      title: "Areca Palm Leaf Tableware Manufacturer | Vegnar Greens",
      description:
        "100% natural areca palm leaf plates and bowls. Premium biodegradable tableware for events, restaurants and sustainable dining.",
      keywords:
        "areca palm leaf plates, palm leaf tableware, biodegradable palm plates, eco-friendly dinnerware, Vegnar Greens",
      alternates: {
        canonical: "https://vegnar.com/products/areca-palm-tableware",
      },
      robots: "index, follow",
    };
  }

  return {
    title: "Products | Vegnar Greens",
    description:
      "Explore our range of biodegradable and compostable food packaging products.",
    robots: "index, follow",
  };
}

export default async function ProductCategoryPage({ params }: Props) {
  try {
    const { categorySlug } = await params;
    const category = await fetchCategoryBySlug(categorySlug);

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
          <div
            className="absolute inset-0 bg-[url('/assets/bg-green.png')] bg-repeat opacity-15 pointer-events-none"
            style={{ backgroundSize: "200px" }}
          ></div>
          <section className="relative min-h-[250px] sm:min-h-[300px] md:h-[400px] bg-green-100 flex flex-col justify-center items-start px-4 sm:px-8 md:px-16 mb-6 sm:mb-8 md:mb-10 rounded-xl sm:rounded-2xl shadow-md overflow-hidden z-10">
            <div className="z-10 w-full md:max-w-3xl">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-green-900 mb-2 sm:mb-3">
                {category.name}
              </h1>
              <p className="text-gray-700 mt-2 sm:mt-3 md:mt-4 max-w-2xl text-sm sm:text-base md:text-lg">
                {category.description || "No description available."} Browse our{" "}
                <Link href="/products" className="text-green-700 font-semibold transition-all">
                  complete product range
                </Link>{" "}
                or{" "}
                <Link href="/quote" className="text-green-700 font-semibold transition-all">
                  request bulk pricing
                </Link>{" "}
                for wholesale orders.
              </p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-green-200 to-white opacity-60 z-0"></div>
          </section>

          <nav className="mb-6 sm:mb-8 overflow-x-auto whitespace-nowrap px-1">
            <ol className="list-reset flex items-center space-x-2 text-sm sm:text-base">
              <li>
                <Link
                  href="/"
                  className=" text-green-800 font-medium"
                >
                  Home
                </Link>
              </li>
              <li className="text-gray-500">/</li>
              <li>
                <Link
                  href="/products"
                  className=" text-green-800 font-medium"
                >
                  Products
                </Link>
              </li>
              <li className="text-gray-500">/</li>
              <li>
                <Link
                  href={`/products/${category.slug}`}
                  className=" text-green-800 font-medium"
                >
                  {category.name}
                </Link>
              </li>
            </ol>
          </nav>

          <ProductList
            products={products}
            allCategories={allCategories}
            subCategories={subCategories}
            ProductCard={ProductCard}
          />
        </main>
      </>
    );
  } catch (error) {
    console.error("Error in ProductCategoryPage:", error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Error Loading Products
          </h1>
          <p className="text-gray-600">
            We're having trouble loading the products. Please try again later.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }
}
