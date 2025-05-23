// src/components/ProductList.tsx
"use client";
import React, { useState, useEffect } from 'react';

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

const PRODUCTS_PER_PAGE = 6;

interface ProductListProps {
    products: Product[];
    allCategories: Category[];
    subCategories: Category[];
    ProductCard: React.FC<{
        product: Product;
        allCategories: Category[];
        disableViewProduct: boolean;
    }>;
}

const ProductList: React.FC<ProductListProps> = ({ products, allCategories, subCategories, ProductCard }) => {
    const [selectedSubCategories, setSelectedSubCategories] = useState<number[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    const handleSubCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const subCategoryId = parseInt(event.target.value);
        setSelectedSubCategories(prev => 
            event.target.checked
                ? [...prev, subCategoryId]
                : prev.filter(id => id !== subCategoryId)
        );
        setCurrentPage(1); // Reset to first page when filter changes
    };

    const handleClearFilters = () => {
        setSelectedSubCategories([]);
        setCurrentPage(1);
    };

    const filteredProducts = products.filter((product) => {
        if (selectedSubCategories.length === 0) return true;
        return product.product_category.some((catId) => selectedSubCategories.includes(catId));
    });

    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    const displayedProducts = filteredProducts.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

    const handlePageChange = (newPage: number) => setCurrentPage(newPage);

    return (
        <div className="flex relative">
            {/* Filter Sidebar */}
            <aside className="w-1/5 pr-6">
                <div className="sticky top-[64px] z-20">
                    {subCategories.length > 0 && (
                        <section className="mb-8 p-4 rounded-md shadow-md bg-white">
                            <h3 className="text-lg font-semibold text-green-800 mb-3">Filter by Sub-Category</h3>
                            <div className="space-y-2">
                                {subCategories.map((subCat) => (
                                    <div key={subCat.id} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id={`sub-category-${subCat.id}`}
                                            value={subCat.id}
                                            checked={selectedSubCategories.includes(subCat.id)}
                                            onChange={handleSubCategoryChange}
                                            className="mr-2 form-checkbox h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor={`sub-category-${subCat.id}`} className="text-gray-700">
                                            {subCat.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            {selectedSubCategories.length > 0 && (
                                <button
                                    onClick={handleClearFilters}
                                    className="mt-4 text-sm text-blue-500 hover:underline"
                                >
                                    Clear Filters
                                </button>
                            )}
                        </section>
                    )}
                </div>
            </aside>

            {/* Product Grid */}
            <main className="w-4/5">
                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4 text-green-800">Products</h2>
                    {displayedProducts.length === 0 ? (
                        <p>
                            No products found {selectedSubCategories.length > 0 ? 'matching these filters' : 'in this category'}.
                        </p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {displayedProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    allCategories={allCategories}
                                    disableViewProduct={false}
                                />
                            ))}
                        </div>
                    )}
                </section>

                {totalPages > 1 && (
                    <div className="flex justify-center mt-8">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`mx-1 px-3 py-1 rounded-md ${
                                    currentPage === page
                                        ? 'bg-green-500 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default ProductList;