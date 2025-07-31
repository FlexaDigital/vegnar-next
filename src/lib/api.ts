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
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(5000) // 5 second timeout
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const categories = await res.json();
    return categories;
  } catch (error) {
    console.error('Error fetching product categories:', error);
    // Return fallback data
    return [
      { id: 1, name: 'Round Plates', slug: 'round-plates', parent: 0 },
      { id: 2, name: 'Bowls', slug: 'bowls', parent: 0 },
      { id: 3, name: 'Clamshells', slug: 'clamshells', parent: 0 },
      { id: 4, name: 'Meal Trays', slug: 'meal-trays', parent: 0 }
    ];
  }
}

export async function fetchParentProductCategories(): Promise<ProductCategory[]> {
  const allCategories = await fetchAllProductCategories();
  return allCategories.filter((cat) => cat.parent === 0);
}
