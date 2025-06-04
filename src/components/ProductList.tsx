// src/components/ProductList.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { FiFilter, FiX } from 'react-icons/fi'; // Import icons

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
    categorySlug: string;
}

const ProductList: React.FC<ProductListProps> = ({ products, allCategories, subCategories, ProductCard, categorySlug }) => {
    const [selectedSubCategories, setSelectedSubCategories] = useState<number[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

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

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        // Scroll to top on mobile when changing pages
        if (window.innerWidth < 768) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // Filter sidebar content component
    const FilterContent = () => (
        <>
            {subCategories.length > 0 && (
                <section className="p-4 rounded-md shadow-md bg-white">
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="text-lg font-semibold text-green-800">Filter by Sub-Category</h3>
                        <button 
                            onClick={() => setIsFilterOpen(false)}
                            className="md:hidden text-gray-500 hover:text-gray-700"
                        >
                            <FiX size={24} />
                        </button>
                    </div>
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
        </>
    );

    return (
        <div className="relative">
            {/* Mobile Filter Button */}
            <div className="md:hidden mb-4">
                <button
                    onClick={() => setIsFilterOpen(true)}
                    className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-sm"
                >
                    <FiFilter />
                    Filters {selectedSubCategories.length > 0 && `(${selectedSubCategories.length})`}
                </button>
            </div>

            <div className="flex flex-col md:flex-row relative">
                {/* Desktop Filter Sidebar */}
                <aside className="hidden md:block md:w-1/4 lg:w-1/5 pr-6">
                    <div className="sticky top-[64px] z-20">
                        <FilterContent />
                    </div>
                </aside>

                {/* Mobile Filter Modal */}
                {isFilterOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
                        <div className="absolute right-0 top-0 h-full w-80 bg-white p-4 overflow-y-auto">
                            <FilterContent />
                        </div>
                    </div>
                )}

                {/* Product Grid */}
                <main className="w-full md:w-3/4 lg:w-4/5">
                    <section className="mb-6">
                        <h2 className="text-xl md:text-2xl font-semibold mb-4 text-green-800">Products</h2>
                        {displayedProducts.length === 0 ? (
                            <p className="text-center py-8">
                                No products found {selectedSubCategories.length > 0 ? 'matching these filters' : 'in this category'}.
                            </p>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                                {displayedProducts.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        allCategories={allCategories}
                                        disableViewProduct={categorySlug === 'paper-cups' || categorySlug === 'bio-bags'}
                                    />
                                ))}
                            </div>
                        )}
                    </section>

                    {totalPages > 1 && (
                        <div className="flex flex-wrap justify-center gap-2 mt-8 px-4 md:px-0">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-3 py-1 rounded-md bg-green-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Previous
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`px-3 py-1 rounded-md ${
                                        currentPage === page
                                            ? 'bg-green-600 text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1 rounded-md bg-green-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default ProductList;