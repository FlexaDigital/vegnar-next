'use client';

import { useState, useMemo } from 'react';
import { Search, Filter, Download, ShoppingCart, Plus } from 'lucide-react';
import productsData from '@/data/products.json';

interface Product {
  item_code: string;
  category: string;
  sub_category: string;
  product: string;
  color: string;
  preferred_vendor: string;
  product_weight_g: number;
  pcs_per_pack: number;
  packs_per_carton: number;
  pcs_per_carton: number;
  price_per_carton_inr: number;
  fob_price_per_carton_usd: number | null;
}

const products: Product[] = productsData;

export default function PackingListPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [cart, setCart] = useState<{product: Product, quantity: number, unit: 'pieces' | 'cartons'}[]>([]);
  const [showQuoteForm, setShowQuoteForm] = useState(false);

  const categories = [...new Set(products.map(p => p.category))];
  const subCategories = [...new Set(products.map(p => p.sub_category))];


  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.item_code.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      const matchesSubCategory = !selectedSubCategory || product.sub_category === selectedSubCategory;

      
      return matchesSearch && matchesCategory && matchesSubCategory;
    });
  }, [searchTerm, selectedCategory, selectedSubCategory]);

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.product.item_code === product.item_code);
    if (existingItem) {
      setCart(cart.map(item => 
        item.product.item_code === product.item_code 
          ? {...item, quantity: item.quantity + 1}
          : item
      ));
    } else {
      setCart([...cart, {product, quantity: 1, unit: 'cartons'}]);
    }
  };

  const removeFromCart = (itemCode: string) => {
    setCart(cart.filter(item => item.product.item_code !== itemCode));
  };

  const updateCartQuantity = (itemCode: string, quantity: number) => {
    setCart(cart.map(item => 
      item.product.item_code === itemCode 
        ? {...item, quantity: Math.max(1, quantity)}
        : item
    ));
  };

  const updateCartUnit = (itemCode: string, unit: 'pieces' | 'cartons') => {
    setCart(cart.map(item => 
      item.product.item_code === itemCode 
        ? {...item, unit}
        : item
    ));
  };

  const exportToCSV = () => {
    const headers = [
      'Item Code', 'Category', 'Sub Category', 'Product', 'Color', 'Vendor',
      'Weight', 'Pcs/Pack', 'Packs/Carton', 'Pcs/Carton', 'Price/Carton'
    ];
    
    const csvContent = [
      headers.join(','),
      ...filteredProducts.map(product => [
        product.itemCode,
        product.category,
        product.subCategory,
        `"${product.product}"`,
        product.color,
        product.vendor,
        product.weight,
        product.pcsPerPack,
        product.packsPerCarton,
        product.pcsPerCarton,
        product.pricePerCarton
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vegnar-packing-list.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Sugarcane Bagasse Products</h1>
                <p className="mt-1 text-sm text-gray-500">Complete packing list with specifications</p>
              </div>
              <div className="mt-4 sm:mt-0 flex space-x-3">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </button>
                <button
                  onClick={() => setShowQuoteForm(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 relative"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Quote Cart ({cart.length})
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {cart.length}
                    </span>
                  )}
                </button>
                <button
                  onClick={exportToCSV}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </button>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by product name or item code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {showFilters && (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>

                <select
                  value={selectedSubCategory}
                  onChange={(e) => setSelectedSubCategory(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">All Sub Categories</option>
                  {subCategories.map(subCategory => (
                    <option key={subCategory} value={subCategory}>{subCategory}</option>
                  ))}
                </select>


              </div>
            )}
          </div>

          {/* Results Count */}
          <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
            <p className="text-sm text-gray-600">
              Showing {filteredProducts.length} of {products.length} products
            </p>
          </div>

          {/* Products Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight (g)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pcs/Pack</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Packs/Carton</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pcs/Carton</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net Weight (kg)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.item_code} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{product.product}</div>
                        <div className="text-sm text-gray-500">{product.item_code}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{product.sub_category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.product_weight_g}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.pcs_per_pack}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.packs_per_carton}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.pcs_per_carton.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.net_weight_kg} kg
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => addToCart(product)}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>

      {/* Quote Form Modal */}
      {showQuoteForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Request Quote</h2>
                <button
                  onClick={() => setShowQuoteForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              {/* Cart Items */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Selected Products</h3>
                {cart.length === 0 ? (
                  <p className="text-gray-500">No products selected</p>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.product.item_code} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium">{item.product.product}</h4>
                          <p className="text-sm text-gray-500">{item.product.item_code}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <select
                            value={item.unit}
                            onChange={(e) => updateCartUnit(item.product.item_code, e.target.value as 'pieces' | 'cartons')}
                            className="border rounded px-2 py-1"
                          >
                            <option value="pieces">Pieces</option>
                            <option value="cartons">Cartons</option>
                          </select>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateCartQuantity(item.product.item_code, parseInt(e.target.value))}
                            className="border rounded px-2 py-1 w-20"
                          />
                          <button
                            onClick={() => removeFromCart(item.product.item_code)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quote Form */}
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Company Name" className="border rounded px-3 py-2" required />
                  <input type="email" placeholder="Email" className="border rounded px-3 py-2" required />
                  <input type="text" placeholder="Mobile Number" className="border rounded px-3 py-2" required />
                  <select className="border rounded px-3 py-2" required>
                    <option value="">Select Country</option>
                    <option value="US">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="IN">India</option>
                    <option value="DE">Germany</option>
                    <option value="FR">France</option>
                  </select>
                </div>
                <textarea placeholder="Address" className="border rounded px-3 py-2 w-full" rows={3} required></textarea>
                <select className="border rounded px-3 py-2 w-full" required>
                  <option value="">Select Delivery Terms</option>
                  <option value="FOB">FOB (Free on Board)</option>
                  <option value="CIF">CIF (Cost, Insurance & Freight)</option>
                  <option value="DDP">DDP (Delivered Duty Paid)</option>
                </select>
                <textarea placeholder="Additional Requirements" className="border rounded px-3 py-2 w-full" rows={3}></textarea>
                
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowQuoteForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Request Quote
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}