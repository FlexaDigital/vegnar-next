'use client';

import { useState, useMemo, useEffect } from 'react';
import { Search, Filter, Download, ShoppingCart, Plus, Check } from 'lucide-react';
import productsData from '@/data/products.json';
import Head from 'next/head';

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
  net_weight_kg: number;
  length_m: number | null;
  width_m: number | null;
  height_m: number | null;
}

const products: Product[] = productsData;

export default function PackingListPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [cart, setCart] = useState<{product: Product, quantity: number, unit: 'pieces' | 'cartons'}[]>([]);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [showSampleForm, setShowSampleForm] = useState(false);

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

  useEffect(() => {
    document.title = "Get Quote - Sugarcane Bagasse Products | Biodegradable Tableware Pricing - Vegnar Green";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Request instant quotes for premium sugarcane bagasse tableware. Compare prices, specifications, and get bulk pricing for biodegradable plates, bowls, containers.');
    }
  }, []);

  return (
    <>
      <Head>
        <title>Get Quote - Sugarcane Bagasse Products | Biodegradable Tableware Pricing - Vegnar Green</title>
        <meta name="description" content="Request instant quotes for premium sugarcane bagasse tableware. Compare prices, specifications, and get bulk pricing for biodegradable plates, bowls, containers." />
        <meta name="keywords" content="sugarcane bagasse quote, biodegradable tableware pricing, bagasse products price list, eco-friendly tableware quote, bulk biodegradable plates pricing" />
        <link rel="canonical" href="https://www.vegnar.com/quote" />
      </Head>
      <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Get Quote - Biodegradable Tableware</h1>
                <p className="mt-1 text-sm text-gray-500">Premium sugarcane bagasse products with instant pricing and specifications</p>
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
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1a7a2b] hover:bg-[#0f5a1f] relative transition-colors"
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
                  onClick={() => setShowSampleForm(true)}
                  className="inline-flex items-center px-4 py-2 border border-[#1a7a2b] rounded-md shadow-sm text-sm font-medium text-[#1a7a2b] bg-white hover:bg-green-50 transition-colors"
                >
                  Request Sample
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

          {/* Products Table - Desktop */}
          <div className="hidden md:block overflow-x-auto">
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
                      {cart.some(item => item.product.item_code === product.item_code) ? (
                        <button
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 cursor-default"
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Added
                        </button>
                      ) : (
                        <button
                          onClick={() => addToCart(product)}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-[#1a7a2b] hover:bg-[#0f5a1f] transition-colors"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Add
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Products Cards - Mobile */}
          <div className="md:hidden space-y-4 p-4">
            {filteredProducts.map((product) => (
              <div key={product.item_code} className="bg-white border rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{product.product}</h3>
                    <p className="text-sm text-gray-500">{product.item_code}</p>
                    <p className="text-sm text-blue-600">{product.sub_category}</p>
                  </div>
                  {cart.some(item => item.product.item_code === product.item_code) ? (
                    <button
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 cursor-default"
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Added
                    </button>
                  ) : (
                    <button
                      onClick={() => addToCart(product)}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-[#1a7a2b] hover:bg-[#0f5a1f] transition-colors"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-500">Weight:</span>
                    <span className="ml-1 font-medium">{product.product_weight_g}g</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Pcs/Pack:</span>
                    <span className="ml-1 font-medium">{product.pcs_per_pack}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Packs/Carton:</span>
                    <span className="ml-1 font-medium">{product.packs_per_carton}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Pcs/Carton:</span>
                    <span className="ml-1 font-medium">{product.pcs_per_carton.toLocaleString()}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-500">Net Weight:</span>
                    <span className="ml-1 font-medium">{product.net_weight_kg} kg</span>
                  </div>
                </div>
              </div>
            ))}
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
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Selected Products</h3>
                  <button
                    onClick={() => setShowQuoteForm(false)}
                    className="bg-[#1a7a2b] hover:bg-[#0f5a1f] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    + Add More Products
                  </button>
                </div>
                {cart.length === 0 ? (
                  <p className="text-gray-500">No products selected</p>
                ) : (
                  <>
                    <div className="space-y-4 mb-6">
                      {cart.map((item) => (
                        <div key={item.product.item_code} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-medium">{item.product.product}</h4>
                            <p className="text-sm text-gray-500">{item.product.item_code}</p>
                            <p className="text-sm text-green-600 font-medium">
                              {item.unit === 'cartons' 
                                ? `Total: ${(item.quantity * item.product.pcs_per_carton).toLocaleString()} pieces`
                                : `≈ ${Math.ceil(item.quantity / item.product.pcs_per_carton)} cartons`
                              }
                            </p>
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
                    
                    {/* Totals */}
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <h4 className="font-semibold text-green-800 mb-3">Quote Summary</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="bg-white p-3 rounded border">
                          <span className="text-gray-600">Total Pieces:</span>
                          <div className="font-bold text-lg text-green-700">
                            {cart.reduce((total, item) => {
                              const pieces = item.unit === 'cartons' 
                                ? item.quantity * item.product.pcs_per_carton
                                : item.quantity;
                              return total + pieces;
                            }, 0).toLocaleString()}
                          </div>
                        </div>
                        <div className="bg-white p-3 rounded border">
                          <span className="text-gray-600">Total Weight:</span>
                          <div className="font-bold text-lg text-green-700">
                            {cart.reduce((total, item) => {
                              const cartons = item.unit === 'cartons' 
                                ? item.quantity 
                                : Math.ceil(item.quantity / item.product.pcs_per_carton);
                              return total + (cartons * item.product.net_weight_kg);
                            }, 0).toFixed(1)} kg
                          </div>
                        </div>
                        <div className="bg-white p-3 rounded border">
                          <span className="text-gray-600">Total CBM:</span>
                          <div className="font-bold text-lg text-green-700">
                            {cart.reduce((total, item) => {
                              const cartons = item.unit === 'cartons' 
                                ? item.quantity 
                                : Math.ceil(item.quantity / item.product.pcs_per_carton);
                              const cbm = item.product.length_m && item.product.width_m && item.product.height_m
                                ? item.product.length_m * item.product.width_m * item.product.height_m
                                : 0;
                              return total + (cartons * cbm);
                            }, 0).toFixed(3)} m³
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
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
                <select 
                  className="border rounded px-3 py-2 w-full" 
                  required
                  onChange={(e) => {
                    const deliveryTerms = e.target.value;
                    const cifField = document.getElementById('cifPort') as HTMLInputElement;
                    const ddpField = document.getElementById('ddpAddress') as HTMLTextAreaElement;
                    if (cifField) cifField.style.display = deliveryTerms === 'CIF' ? 'block' : 'none';
                    if (ddpField) ddpField.style.display = deliveryTerms === 'DDP' ? 'block' : 'none';
                  }}
                >
                  <option value="">Select Delivery Terms</option>
                  <option value="FOB">FOB (Free on Board)</option>
                  <option value="CIF">CIF (Cost, Insurance & Freight)</option>
                  <option value="DDP">DDP (Delivered Duty Paid)</option>
                </select>
                <input 
                  id="cifPort"
                  type="text" 
                  placeholder="Port of Discharge" 
                  className="border rounded px-3 py-2 w-full" 
                  style={{display: 'none'}}
                />
                <textarea 
                  id="ddpAddress"
                  placeholder="Final Delivery Address" 
                  className="border rounded px-3 py-2 w-full" 
                  rows={3}
                  style={{display: 'none'}}
                ></textarea>
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
                    type="button"
                    onClick={() => setShowSampleForm(true)}
                    className="px-4 py-2 border border-[#1a7a2b] text-[#1a7a2b] rounded-md hover:bg-green-50 transition-colors font-medium"
                  >
                    Request Sample
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#1a7a2b] hover:bg-[#0f5a1f] text-white rounded-md transition-colors font-medium"
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
    </>
  );
}