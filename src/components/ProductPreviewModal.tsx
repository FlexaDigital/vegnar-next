'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { DomesticProduct } from '@/types/product';
import AddToCartButton from './Product/AddToCartButton';
import Link from 'next/link';
import { useProducts } from '@/lib/products-context';

interface Props {
  product: DomesticProduct;
  onClose: () => void;
}

export default function ProductPreviewModal({ product, onClose }: Props) {
  const { wpProducts, loading: wpLoading } = useProducts();
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Match wp product by item_code (ACF field), fallback to name search
  const wpProduct = wpProducts.find(p => p.acf?.item_code === product.item_code)
    ?? wpProducts.find(p =>
        (p.title?.rendered ?? '').toLowerCase().includes(
          product.product.split(',')[0].trim().toLowerCase()
        )
      )
    ?? null;

  const images: string[] = [];
  if (wpProduct) {
    const featured = wpProduct._embedded?.['wp:featuredmedia']?.[0]?.source_url;
    if (featured) images.push(featured);
    wpProduct._embedded?.['acf:attachment']?.forEach((a: any) => {
      const url = a.media_details?.sizes?.large?.source_url || a.source_url;
      if (url && !images.includes(url)) images.push(url);
    });
  }
  if (images.length === 0) images.push('https://placehold.co/400x400/e0e0e0/ffffff?text=No+Image');

  const stripHtml = (html: string) => html.replace(/<[^>]+>/g, '');

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white z-10">
          <h2 className="font-bold text-gray-900 text-lg truncate pr-4">{product.product}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 flex-shrink-0">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {wpLoading ? (
            <div className="flex items-center justify-center h-48">
              <div className="w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="flex flex-col md:flex-row gap-6">
              {/* Image Gallery */}
              <div className="flex-shrink-0 w-full md:w-64">
                <div className="aspect-square rounded-xl overflow-hidden border border-gray-100 bg-gray-50 mb-2">
                  <img
                    src={images[activeImg]}
                    alt={product.product}
                    className="w-full h-full object-contain"
                  />
                </div>
                {images.length > 1 && (
                  <div
                    className="grid gap-2"
                    style={{ gridTemplateColumns: `repeat(${images.length}, 1fr)` }}
                  >
                    {images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImg(i)}
                        className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                          i === activeImg ? 'border-green-600' : 'border-gray-200 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-contain" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-0.5 rounded">100% Biodegradable</span>
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded">FDA Approved</span>
                  <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2 py-0.5 rounded">Compostable</span>
                </div>

                {/* Description */}
                {wpProduct?.content?.rendered && (
                  <p className="text-sm text-gray-600 mb-4 line-clamp-4">
                    {stripHtml(wpProduct.content.rendered)}
                  </p>
                )}

                {/* Specs */}
                <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                  <div className="bg-gray-50 rounded-lg p-2">
                    <span className="text-gray-500 text-xs">Item Code</span>
                    <div className="font-semibold text-gray-900">{product.item_code}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2">
                    <span className="text-gray-500 text-xs">Category</span>
                    <div className="font-semibold text-gray-900">{product.category}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2">
                    <span className="text-gray-500 text-xs">Color</span>
                    <div className="font-semibold text-gray-900">{product.color || '-'}</div>
                  </div>
                  {wpProduct?.acf?.product_size && (
                    <div className="bg-gray-50 rounded-lg p-2">
                      <span className="text-gray-500 text-xs">Size</span>
                      <div className="font-semibold text-gray-900">{wpProduct.acf.product_size}</div>
                    </div>
                  )}
                </div>

                {/* Packing Table */}
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Packing Details</h3>
                <table className="w-full text-xs text-gray-600 border border-gray-200 rounded-lg overflow-hidden mb-4">
                  <thead className="bg-green-50 text-gray-500">
                    <tr>
                      <th className="text-left px-3 py-1.5 border-b border-gray-200 font-medium">Pcs/Pack</th>
                      <th className="text-left px-3 py-1.5 border-b border-gray-200 font-medium">Packs/Carton</th>
                      <th className="text-left px-3 py-1.5 border-b border-gray-200 font-medium">Pcs/Carton</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-3 py-1.5">{product.pcs_per_pack}</td>
                      <td className="px-3 py-1.5">{product.packs_per_carton}</td>
                      <td className="px-3 py-1.5">{product.pcs_per_carton.toLocaleString()}</td>
                    </tr>
                  </tbody>
                </table>

                {/* Actions */}
                <div className="flex gap-3 flex-wrap">
                  <AddToCartButton
                    product={product}
                    className="flex-1 inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg px-4 py-2 text-sm transition-colors"
                  />
                  {wpProduct && (
                    <Link
                      href={`/products/bagasse-products/${wpProduct.slug}`}
                      className="flex-1 inline-flex items-center justify-center border border-green-600 text-green-700 hover:bg-green-50 font-semibold rounded-lg px-4 py-2 text-sm transition-colors text-center"
                      onClick={onClose}
                    >
                      View Full Page
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
