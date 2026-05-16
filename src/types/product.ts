export interface DomesticProduct {
  sku?: string;
  ean13?: string;
  upc?: string;
  item_code: string;
  category: string;
  sub_category: string;
  product: string;
  color: string;
  packing_type?: string;
  hsn_code?: string;
  gst?: string;
  uom_1?: string;
  pcs_per_pack: number;
  packs_per_carton: number;
  pcs_per_carton: number;
  detailed_description?: string;
  uom_2?: string;
  price_1_to_10_box?: string;
  price_11_to_30_box?: string;
  price_31_to_100_box?: string;
  preferred_vendor?: string;
  product_weight_g?: number;
  price_per_carton_inr?: number;
  fob_price_per_carton_usd?: number | null;
  net_weight_kg?: number;
  length_m?: number | null;
  width_m?: number | null;
  height_m?: number | null;
}

export interface WpProduct {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  product_category: number[];
  featured_media?: number;
  acf?: {
    product_size?: string;
    item_code?: string;
    pscPerPack?: string;
    packPerBox?: string;
    product_weight?: string;
    color?: string;
    product_images?: number[] | Array<{ id: number; url?: string }>;
  };
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url?: string }>;
    'acf:attachment'?: Array<{
      source_url: string;
      media_details?: {
        sizes?: {
          full?: { source_url: string };
          large?: { source_url: string };
          medium_large?: { source_url: string };
        };
      };
    }>;
  };
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  parent: number;
  description?: string;
}
