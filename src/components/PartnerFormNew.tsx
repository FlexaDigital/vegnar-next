'use client';

import { useState } from 'react';
import { sendToZohoCRM } from '@/utils/zoho-webhook';

interface FormData {
  fullname: string;
  company: string;
  email: string;
  mobile: string;
  country: string;
  businessType: string;
  message: string;
}

export default function PartnerFormNew() {
  const [formData, setFormData] = useState<FormData>({
    fullname: '',
    company: '',
    email: '',
    mobile: '',
    country: '',
    businessType: '',
    message: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/partner-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        // Save lead to Inventory Management system
        fetch("http://localhost:8000/api/v1/public/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.fullname,
            email: formData.email,
            phone: formData.mobile,
            company: formData.company,
            country: formData.country,
            message: `Business Type: ${formData.businessType} | ${formData.message}`,
            formType: 'PartnerFormNew',
          }),
        }).catch(() => {}); // Silent fail

        // Send to Zoho CRM
        sendToZohoCRM({
          formType: 'PartnerFormNew',
          fullName: formData.fullname,
          email: formData.email,
          phone: formData.mobile,
          company: formData.company,
          country: formData.country,
          businessType: formData.businessType,
          message: formData.message,
        });

        setStatus('success');
        setFormData({
          fullname: '',
          company: '',
          email: '',
          mobile: '',
          country: '',
          businessType: '',
          message: ''
        });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Partner Inquiry</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          name="fullname"
          placeholder="Full Name"
          value={formData.fullname}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
        
        <input
          type="text"
          name="company"
          placeholder="Company Name"
          value={formData.company}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
        
        <input
          type="tel"
          name="mobile"
          placeholder="Mobile Number"
          value={formData.mobile}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <select
          name="country"
          value={formData.country}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="">Select Country</option>
          <option value="US">United States</option>
          <option value="UK">United Kingdom</option>
          <option value="DE">Germany</option>
          <option value="FR">France</option>
          <option value="CA">Canada</option>
          <option value="AU">Australia</option>
          <option value="IN">India</option>
        </select>
        
        <select
          name="businessType"
          value={formData.businessType}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="">Business Type</option>
          <option value="importer">Importer</option>
          <option value="distributor">Distributor</option>
          <option value="retailer">Retailer</option>
          <option value="horeca">HoReCa</option>
        </select>
      </div>

      <textarea
        name="message"
        placeholder="Tell us about your business and partnership interests..."
        value={formData.message}
        onChange={handleChange}
        rows={4}
        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent mb-6"
      />

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-green-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {status === 'loading' ? 'Submitting...' : 'Submit Partnership Inquiry'}
      </button>

      {status === 'success' && (
        <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-md">
          Thank you! Your partnership inquiry has been submitted successfully.
        </div>
      )}

      {status === 'error' && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
          There was an error submitting your inquiry. Please try again.
        </div>
      )}
    </form>
  );
}