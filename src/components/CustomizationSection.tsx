'use client';

import React from 'react';
import { BadgeCheck, Sparkles, Layers } from 'lucide-react';

const CustomizationSection = () => {
  return (
    <section className="py-16 px-4 md:px-8 relative">
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{backgroundImage: 'url(/assets/bg-green.png)', backgroundRepeat: 'repeat', backgroundSize: '300px auto', backgroundAttachment: 'fixed'}}></div>
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <span className="inline-block bg-[#D4F5E1] text-[#007A3E] text-sm font-semibold rounded-full px-4 py-1 mb-3">
          CUSTOMIZATION
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4 tracking-tight">
          Do You Need Customization?
        </h2>
        <p className="text-gray-600 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
          We bring your vision to life – tailored branding, packaging, and storytelling.
        </p>

        <div className="grid gap-8 md:grid-cols-3 text-left">
          <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-green-100 hover:shadow-xl hover:scale-105 hover:border-green-200 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#D4F5E1] p-3 rounded-full">
                <BadgeCheck size={28} className="text-[#007A3E]" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Your Logo</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Add your company's logo to packaging for a stronger brand identity and professional appearance.
            </p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-green-100 hover:shadow-xl hover:scale-105 hover:border-green-200 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#D4F5E1] p-3 rounded-full">
                <Sparkles size={28} className="text-[#007A3E]" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Your Story</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Share your unique mission – we'll help tell your story on every product and connect with customers.
            </p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-green-100 hover:shadow-xl hover:scale-105 hover:border-green-200 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#D4F5E1] p-3 rounded-full">
                <Layers size={28} className="text-[#007A3E]" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Our Product</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Combine our high-quality eco-products with your branding and vision for perfect market fit.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomizationSection; 