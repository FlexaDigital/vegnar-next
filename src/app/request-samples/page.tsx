'use client';

import { useState, useEffect } from 'react';
import { generateInvoice } from '@/lib/invoice';
const indiaStates = ['Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal','Andaman and Nicobar Islands','Chandigarh','Dadra and Nagar Haveli and Daman and Diu','Delhi','Jammu and Kashmir','Ladakh','Lakshadweep','Puducherry'];
import Head from 'next/head';

export default function RequestSamplesPage() {
  const [sampleFormData, setSampleFormData] = useState({ 
    userType: 'company' as 'company' | 'customer',
    companyName: '', 
    email: '', 
    mobile: '', 
    state: '', 
    address: '', 
    products: '',
    gstNumber: '',
    panNumber: ''
  });
  const [isPayingForSample, setIsPayingForSample] = useState(false);


  useEffect(() => {
    document.title = "Request Samples - Premium Sugarcane Bagasse Products | Vegnar Green";
  }, []);

  return (
    <>
      <Head>
        <title>Request Samples - Premium Sugarcane Bagasse Products | Vegnar Green</title>
        <meta name="description" content="Request free samples of our premium sugarcane bagasse tableware. Test quality before bulk orders. Fast worldwide shipping." />
        <meta name="keywords" content="sugarcane bagasse samples, biodegradable tableware samples, eco-friendly product samples, bagasse plates samples" />
        <link rel="canonical" href="https://www.vegnar.com/request-samples" />
      </Head>
      
      <div className="min-h-screen bg-gray-50 py-8 relative">
        <div className="absolute inset-0 bg-[url('/assets/bg-green.png')] bg-repeat opacity-15 pointer-events-none" style={{backgroundSize: '200px'}}></div>
        
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Request Product Samples</h1>
            <p className="text-xl text-gray-600 mb-6">
              Test our premium sugarcane bagasse products before placing bulk orders
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
              <div className="flex items-center justify-center space-x-6 text-sm text-green-700">
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  ₹3000 + GST per sample kit
                </span>
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Free worldwide shipping
                </span>
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  3-5 business days delivery
                </span>
              </div>
            </div>
          </div>

          {/* Sample Request Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <form className="space-y-6" onSubmit={async (e) => {
              e.preventDefault();
              if (isPayingForSample) return;
              
              // Validation
              if (sampleFormData.userType === 'company' && !sampleFormData.gstNumber.trim()) {
                alert('GST Number is required for companies');
                return;
              }

              setIsPayingForSample(true);

              try {
                // 1. Create Razorpay order (₹3150 = ₹3000 + 5% GST sample fee)
                const orderRes = await fetch('/api/razorpay/create-order', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    amount: 3150,
                    currency: 'INR',
                    receipt: `sample_${Date.now()}`,
                    notes: { name: sampleFormData.companyName, email: sampleFormData.email }
                  })
                });
                const { order } = await orderRes.json();

                // 2. Load Razorpay script dynamically
                await new Promise<void>((resolve) => {
                  if ((window as any).Razorpay) { resolve(); return; }
                  const s = document.createElement('script');
                  s.src = 'https://checkout.razorpay.com/v1/checkout.js';
                  s.onload = () => resolve();
                  document.body.appendChild(s);
                });

                // 3. Open Razorpay checkout
                const rzp = new (window as any).Razorpay({
                  key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                  amount: order.amount,
                  currency: order.currency,
                  name: 'Vegnar Green',
                  description: 'Sample Request Fee',
                  image: '/assets/img/vegnar-green.png',
                  order_id: order.id,
                  prefill: { name: sampleFormData.companyName, email: sampleFormData.email, contact: sampleFormData.mobile },
                  theme: { color: '#166534' },
                  handler: async (response: any) => {
                    // 4. Verify payment
                    const verifyRes = await fetch('/api/razorpay/verify-payment', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(response)
                    });
                    const verify = await verifyRes.json();

                    if (verify.success) {
                      // 5. Submit to Google Sheets
                      fetch('https://script.google.com/macros/s/AKfycbys6WK8uBmZQM2vP5KMOu16UWd1qwsUbBmdvp9qxeioPb3B6F2mSpyai2pT1PJYQsZQJQ/exec', {
                        method: 'POST', mode: 'no-cors',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          formType: 'SampleRequest',
                          'Timestamp': new Date().toISOString(),
                          'User Type': sampleFormData.userType === 'company' ? 'Company' : 'Customer',
                          'Company/Name': sampleFormData.companyName,
                          'Email': sampleFormData.email,
                          'Mobile Number': sampleFormData.mobile,
                          ...(sampleFormData.userType === 'company' ? { 'GST Number': sampleFormData.gstNumber } : {}),
                          ...(sampleFormData.userType === 'customer' ? { 'PAN Number': sampleFormData.panNumber || 'N/A' } : {}),
                          'State': sampleFormData.state,
                          'Address': sampleFormData.address,
                          'Products': sampleFormData.products,
                          'Payment ID': response.razorpay_payment_id,
                        })
                      }).catch(() => {});

                      // 5b. Save to Inventory Sample module
                      fetch(process.env.NEXT_PUBLIC_SAMPLE_API_URL!, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          customerName: sampleFormData.companyName,
                          customerEmail: sampleFormData.email,
                          customerPhone: sampleFormData.mobile,
                          customerAddress: sampleFormData.address,
                          state: sampleFormData.state,
                          products: sampleFormData.products,
                          paymentId: response.razorpay_payment_id,
                          kitPrice: 3150,
                          userType: sampleFormData.userType,
                          gstNumber: sampleFormData.gstNumber,
                          panNumber: sampleFormData.panNumber,
                        })
                      }).catch(() => {});

                      // 6. Generate invoice
                      const invoiceNum = `VG-${Date.now().toString().slice(-8)}`;
                      const invoiceData: Parameters<typeof generateInvoice>[0] = {
                        invoiceNumber: invoiceNum,
                        paymentId: response.razorpay_payment_id,
                        orderId: response.razorpay_order_id,
                        date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' }),
                        customerName: sampleFormData.companyName,
                        customerEmail: sampleFormData.email,
                        customerPhone: sampleFormData.mobile,
                        customerAddress: sampleFormData.address,
                        userType: sampleFormData.userType,
                        gstNumber: sampleFormData.gstNumber || undefined,
                        panNumber: sampleFormData.panNumber || undefined,
                        items: [{ description: 'Sample Request — Vegnar Green Eco Products (Sugarcane Bagasse Tableware)', quantity: 1, unitPrice: 3000 }],
                        subtotal: 3000,
                        tax: 150,
                        total: 3150,
                        currency: 'INR',
                      };
                      generateInvoice(invoiceData);
                      setSampleFormData({ userType: 'company', companyName: '', email: '', mobile: '', state: '', address: '', products: '', gstNumber: '', panNumber: '' });
                      alert('Sample request submitted successfully! Your invoice has been generated.');
                    } else {
                      alert('Payment verification failed. Please contact connect@vegnar.com');
                    }
                  },
                  modal: { ondismiss: () => setIsPayingForSample(false) }
                });
                rzp.open();
              } catch (err) {
                alert('Payment initiation failed. Please try again.');
              } finally {
                setIsPayingForSample(false);
              }
            }}>
              {/* User Type Selection */}
              <div className="bg-gray-50 rounded-lg p-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">I am requesting samples as:</label>
                <div className="flex gap-6">
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="radio" 
                      name="userType" 
                      value="company" 
                      checked={sampleFormData.userType === 'company'}
                      onChange={() => setSampleFormData(p => ({...p, userType: 'company'}))}
                      className="mr-3 w-4 h-4 text-green-600"
                    />
                    <span className="font-medium text-gray-700">🏢 Company/Business</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="radio" 
                      name="userType" 
                      value="customer" 
                      checked={sampleFormData.userType === 'customer'}
                      onChange={() => setSampleFormData(p => ({...p, userType: 'customer'}))}
                      className="mr-3 w-4 h-4 text-green-600"
                    />
                    <span className="font-medium text-gray-700">👤 Individual Customer</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {sampleFormData.userType === 'company' ? 'Company Name *' : 'Your Name *'}
                  </label>
                  <input 
                    value={sampleFormData.companyName} 
                    onChange={e => setSampleFormData(p => ({...p, companyName: e.target.value}))} 
                    type="text" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                    required 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input 
                    value={sampleFormData.email} 
                    onChange={e => setSampleFormData(p => ({...p, email: e.target.value}))} 
                    type="email" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                    required 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number *</label>
                  <input 
                    value={sampleFormData.mobile} 
                    onChange={e => setSampleFormData(p => ({...p, mobile: e.target.value}))} 
                    type="text" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                    required 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                  <select 
                    value={sampleFormData.state} 
                    onChange={e => setSampleFormData(p => ({...p, state: e.target.value}))} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                    required
                  >
                    <option value="">Select State</option>
                    {indiaStates.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* GST Number - Only for Company */}
              {sampleFormData.userType === 'company' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">GST Number *</label>
                  <input 
                    value={sampleFormData.gstNumber} 
                    onChange={e => setSampleFormData(p => ({...p, gstNumber: e.target.value}))} 
                    type="text" 
                    placeholder="e.g., 07AAHCV8504R1Z0" 
                    className="w-full px-4 py-3 border border-red-300 bg-red-50 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                    required 
                  />
                  <p className="text-sm text-red-600 mt-1">GST Number is required for company registrations</p>
                </div>
              )}

              {/* PAN Number - Only for Customer (Optional) */}
              {sampleFormData.userType === 'customer' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">PAN Number (Optional)</label>
                  <input 
                    value={sampleFormData.panNumber} 
                    onChange={e => setSampleFormData(p => ({...p, panNumber: e.target.value}))} 
                    type="text" 
                    placeholder="e.g., AAAPA1234A" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Shipping Address *</label>
                <textarea 
                  value={sampleFormData.address} 
                  onChange={e => setSampleFormData(p => ({...p, address: e.target.value}))} 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                  rows={4} 
                  required
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Products of Interest (Optional)</label>
                <textarea 
                  value={sampleFormData.products} 
                  onChange={e => setSampleFormData(p => ({...p, products: e.target.value}))} 
                  placeholder="Which specific products are you interested in? (e.g., plates, bowls, containers, etc.)" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                  rows={3}
                ></textarea>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button 
                  type="submit" 
                  disabled={isPayingForSample} 
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isPayingForSample ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      💳 Pay ₹3,150 & Request Samples
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Additional Information */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">What's Included in Sample Kit?</h3>
            <ul className="text-blue-800 space-y-2">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Variety of plates, bowls, and containers
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Different sizes and specifications
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Product catalog with detailed specifications
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Pricing information for bulk orders
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="mt-6 text-center text-gray-600">
            <p>Need help? Contact us at <a href="mailto:connect@vegnar.com" className="text-green-600 hover:text-green-700 font-medium">connect@vegnar.com</a></p>
          </div>
        </div>
      </div>
    </>
  );
}