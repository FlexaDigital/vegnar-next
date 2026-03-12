'use client';

import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import Link from 'next/link';

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 px-6 flex justify-between items-center text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-gray-800 pr-4">{question}</span>
        <FaChevronDown className={`text-[#007A3E] transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="px-6 pb-4 text-gray-600 leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
};

export default function FAQSection() {
  const faqs = [
    {
      question: "What is bagasse tableware and how is it made?",
      answer: "Bagasse tableware is made from sugarcane fiber (bagasse), the dry pulp left after extracting juice from sugarcane. This agricultural waste is cleaned, pulped, molded under heat and pressure, and dried to create sturdy, biodegradable plates, bowls, and containers."
    },
    {
      question: "Is bagasse tableware safe for hot and cold foods?",
      answer: "Yes, our bagasse products are heat-resistant up to 200°F (95°C) and can safely hold hot soups, cold desserts, oily foods, and liquids without leaking or losing structural integrity. They are FDA approved for direct food contact."
    },
    {
      question: "How long does bagasse tableware take to decompose?",
      answer: "Bagasse tableware fully composts within 60-90 days in commercial composting facilities and 120-180 days in home composting conditions. This is significantly faster than plastic, which takes 500+ years to break down."
    },
    {
      question: "What is your minimum order quantity (MOQ) for wholesale?",
      answer: "Our MOQ varies by product type and customization requirements. For standard products, we typically require a minimum order of 10,000 pieces. Contact us for specific MOQ details and bulk pricing."
    },
    {
      question: "Do you export bagasse products internationally?",
      answer: "Yes, we export to 7+ countries including the USA, UAE, UK, Australia, and across Europe. We handle all export documentation, certifications, and logistics to ensure smooth international delivery."
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-20 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block bg-[#D4F5E1] text-[#007A3E] text-sm font-semibold rounded-full px-4 py-1 mb-3">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#004D40] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg text-gray-700">
            Everything you need to know about our bagasse tableware products
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
        
        <div className="text-center mt-8">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <Link href="/quote" className="inline-block bg-[#007A3E] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#005a2e] transition-colors">
            Contact Us for More Information
          </Link>
        </div>
      </div>
    </section>
  );
}
