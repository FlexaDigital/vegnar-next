'use client';

import React from 'react';
import { BadgeCheck, Sparkles, Layers } from 'lucide-react';

const CustomizationSection = () => {
  return (
    <section className="bg-white py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Do You Need Customization?
        </h2>
        <p className="text-gray-600 text-lg mb-12">
          We bring your vision to life – tailored branding, packaging, and storytelling.
        </p>

        <div className="grid gap-8 md:grid-cols-3 text-left">
          <div className="bg-gray-50 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-4 text-green-600">
              <BadgeCheck size={28} />
              <h3 className="text-xl font-semibold">Your Logo</h3>
            </div>
            <p className="text-gray-600">
              Add your company's logo to packaging for a stronger brand identity.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-4 text-blue-600">
              <Sparkles size={28} />
              <h3 className="text-xl font-semibold">Your Story</h3>
            </div>
            <p className="text-gray-600">
              Share your unique mission – we'll help tell your story on every product.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-4 text-purple-600">
              <Layers size={28} />
              <h3 className="text-xl font-semibold">Our Product</h3>
            </div>
            <p className="text-gray-600">
              Combine our high-quality eco-products with your branding and vision.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomizationSection; 