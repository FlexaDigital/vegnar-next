'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, Filter, Download, ShoppingCart, Plus, Check } from 'lucide-react';
import Image from 'next/image';
import { numberToWords } from '@/lib/pdf-utils';
import productsData from '@/data/products.json';
import countryList from '@/data/country-list.json';
import { DomesticProduct as Product } from '@/types/product';
import { useProducts } from '@/lib/products-context';
import ProductPreviewModal from '@/components/ProductPreviewModal';
import { sendToZohoCRM } from '@/utils/zoho-webhook';
import logoImg from '../../../public/assets/img/vegnar-green.png';

const products: Product[] = productsData as Product[];

function PackingListPageInner() {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [orderType, setOrderType] = useState<'domestic' | 'international'>('domestic');
  const { 
    wpImageMap, 
    cart, 
    addToCart, 
    removeFromCart, 
    updateCartQuantity, 
    updateCartUnit,
    clearCart 
  } = useProducts();

  const [lastInvoiceData, setLastInvoiceData] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [isDownloadingPDF, setIsDownloadingPDF] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  useEffect(() => {
    try {
      const saved = localStorage.getItem('vegnar_last_invoice');
      if (saved) setLastInvoiceData(JSON.parse(saved));
    } catch {}
  }, []);

  const filteredProductsByType = useMemo(() => {
    return products.filter(p => {
      const type = (p as any).type || 'domestic';
      return type === orderType;
    });
  }, [orderType]);

  const categories = useMemo(() => {
    return Array.from(new Set(filteredProductsByType.map(p => p.category)));
  }, [filteredProductsByType]);

  const filteredProducts = useMemo(() => {
    const filtered = filteredProductsByType.filter(product => {
      const matchesSearch = product.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.item_code.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    setCurrentPage(1); // Reset to first page when filters change
    return filtered;
  }, [filteredProductsByType, searchTerm, selectedCategory]);

  useEffect(() => {
    if (selectedCategory && !categories.includes(selectedCategory)) {
      setSelectedCategory('');
    }
  }, [orderType, categories, selectedCategory]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);
  const [showQuoteForm, setShowQuoteForm] = useState(false);

  useEffect(() => {
    if (searchParams && searchParams.get('checkout') === '1') {
      setShowQuoteForm(true);
    }
  }, [searchParams]);


  const handleQuoteSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(false);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const payload = {
      formType: 'QuoteCartForm',
      'Company Name': formData.get('companyName'),
      'Email': formData.get('email'),
      'Mobile Number': formData.get('mobile'),
      'Country': formData.get('country'),
      'Address': formData.get('address'),
      'City': formData.get('city'),
      'State': formData.get('state'),
      'Zip Code': formData.get('pincode'),
      'Delivery Terms': formData.get('deliveryTerms'),
      'Port of Discharge': formData.get('portOfDischarge'),
      'Port of Loading': formData.get('portOfLoading') || (orderType === 'domestic' ? null : 'MUNDRA PORT'),
      'Buyer Ref': formData.get('buyerRef') || (orderType === 'domestic' ? null : '-'),
      'Pre Carriage By': formData.get('preCarriageBy') || (orderType === 'domestic' ? null : 'BY ROAD'),
      'Place of Receipt': formData.get('placeOfReceipt') || (orderType === 'domestic' ? null : 'RAJKOT'),
      'Vessel/Flight No': formData.get('vesselFlightNo') || (orderType === 'domestic' ? null : '-'),
      'Final Delivery Address': formData.get('finalDeliveryAddress'),
      'Additional Requirements': formData.get('additionalRequirements'),
      'Products Count': cart.length,
      ...cart.reduce((acc, item, index) => {
        const productNum = index + 1;
        acc[`Product ${productNum} Name`] = item.product.product;
        acc[`Product ${productNum} Code`] = item.product.item_code;
        acc[`Product ${productNum} Quantity`] = item.quantity;
        acc[`Product ${productNum} Unit`] = item.unit;
        acc[`Product ${productNum} Weight`] = (item.product.product_weight_g || 0) + 'g';
        acc[`Product ${productNum} Pcs Per Carton`] = item.product.pcs_per_carton;
        return acc;
      }, {} as Record<string, any>),
      'Total Pieces': cart.reduce((total, item) => {
        const pieces = item.unit === 'cartons' 
          ? item.quantity * item.product.pcs_per_carton
          : item.quantity;
        return total + pieces;
      }, 0),
      'Total Weight': cart.reduce((total, item) => {
        const cartons = item.unit === 'cartons' 
          ? item.quantity 
          : Math.ceil(item.quantity / item.product.pcs_per_carton);
        return total + (cartons * (item.product.net_weight_kg || 0));
      }, 0).toFixed(1) + ' kg',
      'Total CBM': cart.reduce((total, item) => {
        const cartons = item.unit === 'cartons' 
          ? item.quantity 
          : Math.ceil(item.quantity / item.product.pcs_per_carton);
        const cbm = item.product.length_m && item.product.width_m && item.product.height_m
          ? item.product.length_m * item.product.width_m * item.product.height_m
          : 0;
        return total + (cartons * cbm);
      }, 0).toFixed(3) + ' m³'
    };

    try {
      // Google Sheets (silent fail - no-cors)
      fetch(
        "https://script.google.com/macros/s/AKfycbys6WK8uBmZQM2vP5KMOu16UWd1qwsUbBmdvp9qxeioPb3B6F2mSpyai2pT1PJYQsZQJQ/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      ).catch(() => {});

      // Save lead to Inventory Management system
      fetch(process.env.NEXT_PUBLIC_LEAD_API_URL!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: payload['Company Name'],
          email: payload['Email'],
          phone: payload['Mobile Number'],
          company: payload['Company Name'],
          country: payload['Country'],
          message: `Quote Request | Products: ${payload['Products Count']} | Delivery: ${payload['Delivery Terms']} | Address: ${payload['Address']}`,
          formType: 'QuoteCartForm',
        }),
      }).catch(() => {}); // Silent fail

      // Send to Zoho CRM (silent fail)
      try {
        sendToZohoCRM({
          formType: 'QuoteCartForm',
          fullName: payload['Company Name'] as string,
          email: payload['Email'] as string,
          phone: payload['Mobile Number'] as string,
          company: payload['Company Name'] as string,
          country: payload['Country'] as string,
          address: payload['Address'] as string,
          deliveryTerms: payload['Delivery Terms'] as string,
          productsCount: payload['Products Count'] as number,
          totalPieces: payload['Total Pieces'] as number,
          totalWeight: payload['Total Weight'] as string,
          totalCBM: payload['Total CBM'] as string,
          additionalRequirements: payload['Additional Requirements'] as string,
        });
      } catch {}

      // Capture form data before reset
      const capturedFormData = new FormData(form);
      let quoteNo = `QT-${Math.floor(Math.random() * 90000) + 10000}`;

      if (orderType === 'international') {
        try {
          const res = await fetch('/api/next-invoice-number', { method: 'POST' });
          if (res.ok) {
            const data = await res.json();
            if (data.invoiceNo) {
              quoteNo = data.invoiceNo;
            }
          }
        } catch (error) {
          console.error('Error fetching sequential invoice number:', error);
        }
      }

      // Save to inventory (silent fail)
      await saveQuoteToInventory(capturedFormData, quoteNo);

      // Generate PDF
      setIsDownloadingPDF(true);
      await downloadPDF(capturedFormData, quoteNo);

      form.reset();
      setShowQuoteForm(false);
      clearCart();
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPricePerPiece = (product: Product, quantity: number, unit: 'pieces' | 'cartons') => {
    if ((product as any).type === 'international') {
      return (product as any).fob_price_usd || 0;
    }
    const cartons = unit === 'cartons' ? quantity : Math.ceil(quantity / product.pcs_per_carton);
    
    let priceStr = product.price_1_to_10_box;
    if (cartons > 30) {
      priceStr = product.price_31_to_100_box;
    } else if (cartons > 10) {
      priceStr = product.price_11_to_30_box;
    }
    
    if (!priceStr) return 0;
    return parseFloat(priceStr.replace(/[^\d.]/g, '')) || 0;
  };

  const getCartTotalAmount = () => {
    return cart.reduce((total, item) => {
      const pricePerPc = getPricePerPiece(item.product, item.quantity, item.unit);
      const totalPieces = item.unit === 'cartons' ? item.quantity * item.product.pcs_per_carton : item.quantity;
      return total + (totalPieces * pricePerPc);
    }, 0);
  };

  const saveQuoteToInventory = async (formData: FormData, quoteNo: string) => {
    try {
      const products = cart.map((item) => ({
        itemCode: item.product.item_code,
        productName: item.product.product,
        category: item.product.category,
        quantity: item.quantity,
        unit: item.unit,
        pcsPerCarton: item.product.pcs_per_carton,
        totalPieces: item.unit === 'cartons' ? item.quantity * item.product.pcs_per_carton : item.quantity,
        hsnCode: item.product.hsn_code,
        rate: getPricePerPiece(item.product, item.quantity, item.unit),
        taxRate: parseFloat((item.product as any).gst) || 0,
      }));

      const totalPieces = cart.reduce((total, item) => {
        return total + (item.unit === 'cartons' ? item.quantity * item.product.pcs_per_carton : item.quantity);
      }, 0);

      const totalWeight = cart.reduce((total, item) => {
        const cartons = item.unit === 'cartons' ? item.quantity : Math.ceil(item.quantity / item.product.pcs_per_carton);
        return total + (cartons * (item.product.net_weight_kg || 0));
      }, 0).toFixed(1) + ' kg';

      const totalCBM = cart.reduce((total, item) => {
        const cartons = item.unit === 'cartons' ? item.quantity : Math.ceil(item.quantity / item.product.pcs_per_carton);
        const cbm = item.product.length_m && item.product.width_m && item.product.height_m
          ? item.product.length_m * item.product.width_m * item.product.height_m : 0;
        return total + (cartons * cbm);
      }, 0).toFixed(3) + ' m³';

      const leadApiBase = process.env.NEXT_PUBLIC_LEAD_API_URL?.replace('/lead', '');
      if (!leadApiBase) return;
      await fetch(`${leadApiBase}/website-quote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quoteNo,
          quoteDate: new Date().toISOString(),
          companyName: formData.get('companyName'),
          contactPerson: formData.get('contactPerson'),
          email: formData.get('email'),
          mobile: formData.get('mobile'),
          orderType,
          gstin: formData.get('gstin'),
          city: formData.get('city'),
          state: formData.get('state'),
          pincode: formData.get('pincode'),
          billingAddress: formData.get('billingAddress'),
          country: formData.get('country'),
          deliveryTerms: formData.get('deliveryTerms'),
          portOfDischarge: formData.get('portOfDischarge'),
          address: formData.get('address'),
          additionalRequirements: formData.get('additionalRequirements'),
          buyerRef: formData.get('buyerRef') || (orderType === 'domestic' ? undefined : '-'),
          preCarriageBy: formData.get('preCarriageBy') || (orderType === 'domestic' ? undefined : 'BY ROAD'),
          placeOfReceipt: formData.get('placeOfReceipt') || (orderType === 'domestic' ? undefined : 'RAJKOT'),
          vesselFlightNo: formData.get('vesselFlightNo') || (orderType === 'domestic' ? undefined : '-'),
          portOfLoading: formData.get('portOfLoading') || (orderType === 'domestic' ? undefined : 'MUNDRA PORT'),
          finalDeliveryAddress: formData.get('finalDeliveryAddress'),
          products,
          totalPieces,
          totalWeight,
          totalCBM,
        }),
      });
    } catch {
      // Silent fail - PDF generation should not be blocked
    }
  };

  const downloadPDF = async (savedFormData?: FormData, savedQuoteNo?: string) => {
    setIsDownloadingPDF(true);
    try {
      const form = document.querySelector('form') as HTMLFormElement;
      const formData = savedFormData || new FormData(form);
      
      let quoteNo = savedQuoteNo;
      if (!quoteNo) {
        if (orderType === 'international') {
          try {
            const res = await fetch('/api/next-invoice-number', { method: 'POST' });
            if (res.ok) {
              const data = await res.json();
              if (data.invoiceNo) {
                quoteNo = data.invoiceNo;
              }
            }
          } catch (error) {
            console.error('Error fetching sequential invoice number:', error);
          }
        }
        if (!quoteNo) {
          quoteNo = `QT-${Math.floor(Math.random() * 90000) + 10000}`;
        }
      }
      
      // Convert FormData to plain object for JSON serialization
      const formDataObj: Record<string, string> = {};
      formData.forEach((value, key) => {
        formDataObj[key] = value.toString();
      });

      const response = await fetch('/api/generate-quote-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formData: formDataObj,
          cart,
          orderType,
          quoteNo,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Vegnar_Quote_${quoteNo}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsDownloadingPDF(false);
    }
  };


  useEffect(() => {
    document.title = "Get Quote - Sugarcane Bagasse Products | Biodegradable Tableware Pricing - Vegnar Green";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Request instant quotes for premium sugarcane bagasse tableware. Compare prices, specifications, and get bulk pricing for biodegradable plates, bowls, containers.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 relative overflow-x-hidden">
        <div className="absolute inset-0 bg-[url('/assets/bg-green.png')] bg-repeat opacity-15 pointer-events-none" style={{backgroundSize: '200px'}}></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white rounded-lg shadow-sm">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Get Quote - Biodegradable Tableware</h1>
                <p className="mt-1 text-sm text-gray-500">Premium sugarcane bagasse products with instant pricing and specifications</p>
              </div>
              <div className="mt-4 sm:mt-0 flex flex-wrap gap-2">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
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


              </div>
            </div>
          </div>

          {/* Inquiry Type Tabs */}
          <div className="flex border-b border-gray-200 overflow-hidden rounded-t-lg">
            <button 
              onClick={() => { 
                if (orderType !== 'domestic') { 
                  setOrderType('domestic'); 
                  clearCart(); 
                } 
              }} 
              className={`flex-1 py-4 text-center font-bold text-base md:text-lg border-b-2 transition-all duration-300 flex items-center justify-center gap-2 ${
                orderType === 'domestic' 
                  ? 'border-[#1a7a2b] text-[#1a7a2b] bg-green-50/20' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50/50'
              }`}
            >
              <span className="text-xl">🇮🇳</span> Domestic Inquiry (INR)
            </button>
            <button 
              onClick={() => { 
                if (orderType !== 'international') { 
                  setOrderType('international'); 
                  clearCart(); 
                } 
              }} 
              className={`flex-1 py-4 text-center font-bold text-base md:text-lg border-b-2 transition-all duration-300 flex items-center justify-center gap-2 ${
                orderType === 'international' 
                  ? 'border-[#1a7a2b] text-[#1a7a2b] bg-green-50/20' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50/50'
              }`}
            >
              <span className="text-xl">🌐</span> International Inquiry (USD)
            </button>
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
              <div className="mt-4">
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
              </div>
            )}
          </div>

          {/* Results Count */}
          <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
            <p className="text-sm text-gray-600">
              Showing {startIndex + 1}-{Math.min(startIndex + productsPerPage, filteredProducts.length)} of {filteredProducts.length} products
            </p>
          </div>

          {/* Products Table - Desktop */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Color</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pcs/Pack</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Packs/Box</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pcs/Box</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentProducts.map((product) => (
                  <tr key={product.item_code} className="hover:bg-gray-50 cursor-pointer" onClick={() => setPreviewProduct(product)}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {wpImageMap[product.item_code] ? (
                        <div className="relative w-12 h-12">
                          <Image 
                            src={wpImageMap[product.item_code]} 
                            alt={product.product} 
                            fill
                            className="object-cover rounded shadow-sm border border-gray-200"
                            sizes="48px"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center text-[10px] text-gray-400 border border-gray-200">No Img</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{product.product}</div>
                        <div className="text-sm text-gray-500">{product.item_code}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{product.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.color || '-'}
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
                    <td className="px-6 py-4 whitespace-nowrap" onClick={e => e.stopPropagation()}>
                      {cart.some(item => item.product.item_code === product.item_code) ? (
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center border rounded">
                            <button
                              onClick={() => {
                                const item = cart.find(item => item.product.item_code === product.item_code);
                                if (item && item.quantity > 1) {
                                  updateCartQuantity(product.item_code, item.quantity - 1);
                                }
                              }}
                              className="px-2 py-1 hover:bg-gray-100 text-sm"
                            >
                              -
                            </button>
                            <span className="px-2 py-1 text-sm min-w-[40px] text-center">
                              {cart.find(item => item.product.item_code === product.item_code)?.quantity || 0}
                              <span className="text-xs text-gray-500 ml-1">
                                {cart.find(item => item.product.item_code === product.item_code)?.unit === 'cartons' ? 'ctns' : 'pcs'}
                              </span>
                            </span>
                            <button
                              onClick={() => {
                                const item = cart.find(item => item.product.item_code === product.item_code);
                                if (item) {
                                  updateCartQuantity(product.item_code, item.quantity + 1);
                                }
                              }}
                              className="px-2 py-1 hover:bg-gray-100 text-sm"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap" onClick={e => e.stopPropagation()}>
                      {cart.some(item => item.product.item_code === product.item_code) ? (
                        <button
                          onClick={() => removeFromCart(product.item_code)}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-red-600 transition-colors"
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
            {currentProducts.map((product) => (
              <div key={product.item_code} className="bg-white border rounded-lg p-4 shadow-sm cursor-pointer" onClick={() => setPreviewProduct(product)}>
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1 flex space-x-3">
                    {wpImageMap[product.item_code] ? (
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <Image 
                          src={wpImageMap[product.item_code]} 
                          alt={product.product} 
                          fill
                          className="object-cover rounded shadow-sm border border-gray-200"
                          sizes="64px"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 bg-gray-100 rounded flex-shrink-0 flex items-center justify-center text-[10px] text-gray-400 border border-gray-200">No Img</div>
                    )}
                    <div>
                      <h3 className="font-medium text-gray-900 leading-tight">{product.product}</h3>
                      <p className="text-sm text-gray-500">{product.item_code}</p>
                      <p className="text-xs text-blue-600 mt-1">{product.category}</p>
                    </div>
                  </div>
                  {cart.some(item => item.product.item_code === product.item_code) ? (
                    <button
                      onClick={(e) => { e.stopPropagation(); removeFromCart(product.item_code); }}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-red-600 transition-colors"
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Added
                    </button>
                  ) : (
                    <button
                      onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-[#1a7a2b] hover:bg-[#0f5a1f] transition-colors"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm mt-3 pt-3 border-t">
                  <div>
                    <span className="text-gray-500">Color:</span>
                    <span className="ml-1 font-medium">{product.color || '-'}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Pcs/Pack:</span>
                    <span className="ml-1 font-medium">{product.pcs_per_pack}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Packs/Box:</span>
                    <span className="ml-1 font-medium">{product.packs_per_carton}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Pcs/Box:</span>
                    <span className="ml-1 font-medium">{product.pcs_per_carton.toLocaleString()}</span>
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

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-4 py-4 border-t border-gray-200">
              <div className="flex flex-wrap items-center justify-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                
                <div className="flex flex-wrap gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-3 py-2 text-sm font-medium rounded-md ${
                          currentPage === pageNum
                            ? 'bg-green-600 text-white'
                            : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>

                <span className="text-sm text-gray-700 w-full text-center sm:w-auto">
                  Page {currentPage} of {totalPages}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Product Preview Modal */}
      {previewProduct && (
        <ProductPreviewModal
          product={previewProduct}
          onClose={() => setPreviewProduct(null)}
        />
      )}

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
                        <div key={item.product.item_code} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border rounded-lg gap-3">
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
                          <div className="flex flex-wrap items-center gap-2">
                            <select
                              value={item.unit}
                              onChange={(e) => updateCartUnit(item.product.item_code, e.target.value as 'pieces' | 'cartons')}
                              className="border rounded px-2 py-1 text-sm"
                            >
                              <option value="pieces">Pieces</option>
                              <option value="cartons">Cartons</option>
                            </select>
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => updateCartQuantity(item.product.item_code, parseInt(e.target.value) || 1)}
                              className="w-20 text-center border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            <button
                              onClick={() => removeFromCart(item.product.item_code)}
                              className="text-red-600 hover:text-red-800 text-sm"
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
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
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
                              const totalPieces = item.unit === 'cartons' 
                                ? item.quantity * item.product.pcs_per_carton
                                : item.quantity;
                              const cartonsFraction = totalPieces / item.product.pcs_per_carton;
                              return total + (cartonsFraction * (item.product.net_weight_kg || 0));
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
                              const cbm = (item.product.length_m && item.product.width_m && item.product.height_m && 
                                          item.product.length_m > 0 && item.product.width_m > 0 && item.product.height_m > 0)
                                ? item.product.length_m * item.product.width_m * item.product.height_m
                                : 0.001;
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
              <form className="space-y-4" onSubmit={handleQuoteSubmit}>
                {/* Hidden Order Type input for API compatibility */}
                <input type="hidden" name="orderType" value={orderType} />
                
                {/* Read-only Inquiry Type Badge */}
                <div className="mb-6 p-4 bg-green-50/50 border border-green-100 rounded-lg flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Inquiry Mode</span>
                    <h4 className="text-sm font-bold text-gray-800">
                      {orderType === 'domestic' ? '🇮🇳 Domestic Inquiry (INR)' : '🌐 International Inquiry (USD)'}
                    </h4>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    orderType === 'domestic' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-indigo-100 text-indigo-800'
                  }`}>
                    {orderType === 'domestic' ? 'Domestic Quote (₹)' : 'Proforma Invoice ($)'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input name="companyName" type="text" placeholder="Company Name" className="w-full border rounded px-3 py-2" required />
                  <input name="contactPerson" type="text" placeholder="Contact Person" className="w-full border rounded px-3 py-2" required />
                  <input name="email" type="email" placeholder="Email" className="w-full border rounded px-3 py-2" required />
                  <input name="mobile" type="tel" placeholder="Mobile Number" className="w-full border rounded px-3 py-2" required />
                  
                  {orderType === 'domestic' ? (
                    <>
                      <input name="gstin" type="text" placeholder="GSTIN (Optional)" className="w-full border rounded px-3 py-2" />
                      <input name="city" type="text" placeholder="City" className="w-full border rounded px-3 py-2" required />
                      <input name="state" type="text" placeholder="State" className="w-full border rounded px-3 py-2" required />
                      <input name="pincode" type="text" placeholder="Pincode" className="w-full border rounded px-3 py-2" required />
                      <textarea name="billingAddress" placeholder="Billing Address" className="border rounded px-3 py-2 md:col-span-2" rows={3} required></textarea>
                    </>
                  ) : (
                    <>
                      <div className="md:col-span-2">
                        <select 
                          name="country" 
                          className="border rounded px-3 py-2 w-full" 
                          required
                        >
                          <option value="">Select Country</option>
                          {countryList.map(country => (
                            <option key={country.code} value={country.code}>{country.name}</option>
                          ))}
                        </select>
                      </div>

                      <div className="md:col-span-2">
                        <textarea 
                          name="address" 
                          placeholder="Company Address" 
                          className="border rounded px-3 py-2 w-full" 
                          rows={2} 
                          required
                        ></textarea>
                      </div>

                      <input 
                        name="city" 
                        type="text" 
                        placeholder="City" 
                        className="w-full border rounded px-3 py-2" 
                        required 
                      />
                      <input 
                        name="state" 
                        type="text" 
                        placeholder="State / Province / Region" 
                        className="w-full border rounded px-3 py-2" 
                        required 
                      />
                      <input 
                        name="pincode" 
                        type="text" 
                        placeholder="Zip / Postal Code" 
                        className="w-full border rounded px-3 py-2" 
                        required 
                      />
                      
                      <div className="md:col-span-2 border-t pt-4 mt-2">
                        <h4 className="text-sm font-semibold text-gray-800">Shipment & Logistics Details</h4>
                      </div>

                      <select 
                        name="deliveryTerms"
                        className="border rounded px-3 py-2 w-full" 
                        required
                        onChange={(e) => {
                          const deliveryTerms = e.target.value;
                          const cifField = document.getElementById('cifPort') as HTMLInputElement;
                          const ddpField = document.getElementById('ddpAddress') as HTMLTextAreaElement;
                          if (cifField) cifField.style.display = (deliveryTerms === 'CIF' || deliveryTerms === 'CFR' || deliveryTerms === 'FOB') ? 'block' : 'none';
                          if (ddpField) ddpField.style.display = deliveryTerms === 'DDP' ? 'block' : 'none';
                        }}
                      >
                        <option value="">Select Delivery Terms</option>
                        <option value="EXW">EXW (Ex Works)</option>
                        <option value="FOB">FOB (Free on Board)</option>
                        <option value="CIF">CIF (Cost, Insurance & Freight)</option>
                        <option value="CFR">CFR (Cost & Freight)</option>
                        <option value="DDP">DDP (Delivered Duty Paid)</option>
                      </select>

                      <input 
                        id="cifPort"
                        name="portOfDischarge"
                        type="text" 
                        placeholder="Port of Discharge" 
                        className="border rounded px-3 py-2 w-full" 
                        style={{display: 'none'}}
                      />

                      <textarea 
                        id="ddpAddress"
                        name="finalDeliveryAddress"
                        placeholder="Final Delivery Address / Destination" 
                        className="border rounded px-3 py-2 md:col-span-2" 
                        rows={2}
                        style={{display: 'none'}}
                      ></textarea>
                    </>
                  )}
                  
                  <textarea name="additionalRequirements" placeholder="Additional Requirements" className="border rounded px-3 py-2 md:col-span-2" rows={3}></textarea>
                </div>
                
                {submitError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="font-semibold text-red-800 mb-2">Technical Error</h4>
                    <p className="text-red-700 text-sm mb-3">
                      Please mail us your requirements directly:
                    </p>
                    <div className="bg-white p-3 rounded border">
                      <p className="text-sm font-medium">Email: connect@vegnar.com</p>
                      <p className="text-xs text-gray-600 mt-1">
                        Add products to cart, fill the form, and download PDF to send us your requirements.
                      </p>
                    </div>
                  </div>
                )}
                
                <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowQuoteForm(false)}
                    className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || isDownloadingPDF}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium disabled:opacity-50 flex items-center space-x-2"
                  >
                    {isDownloadingPDF ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generating PDF...
                      </>
                    ) : isSubmitting ? (
                      'Submitting...'
                    ) : (
                      'Download PDF'
                    )}
                  </button>
                  
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Free Samples CTA Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg shadow-lg p-8 text-white">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Need to Test Quality First?</h2>
            <p className="text-xl mb-6 text-green-100">
              Request samples of our premium sugarcane bagasse products before placing bulk orders
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/request-samples"
                className="bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors inline-block"
              >
                Request Samples
              </a>
              <span className="text-green-200 text-sm">
                ✓ Free shipping India • ✓ 3-5 business days delivery • ✓ ₹3000 + GST per sample kit
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PackingListPage() {
  return (
    <Suspense>
      <PackingListPageInner />
    </Suspense>
  );
}