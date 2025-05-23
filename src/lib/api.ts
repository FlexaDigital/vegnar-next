// src/lib/api.ts
export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
  parent: number;
  description?: string;
  count?: number;
  [key: string]: any;
}

export async function fetchAllProductCategories(): Promise<ProductCategory[]> {
  try {
    const res = await fetch('https://cms.vegnar.com/wp-json/wp/v2/product_category?per_page=100', {
      next: { revalidate: 60 }, // Optional: ISR cache
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const categories = await res.json();
    return categories;
  } catch (error) {
    console.error('Error fetching product categories:', error);
    return [];
  }
}

export async function fetchParentProductCategories(): Promise<ProductCategory[]> {
  const allCategories = await fetchAllProductCategories();
  return allCategories.filter((cat) => cat.parent === 0);
}
