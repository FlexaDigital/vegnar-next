'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { usePathname } from 'next/navigation';

// Utility for combining class names.  This is a simplified version.
//  If you have a more robust 'cn' utility in your project, use that instead.
const cn = (...classes: string[]): string => {
  return classes.filter(Boolean).join(' ');
};

const BecomePartnerSection = () => {
  const pathname = usePathname();
  
  const getPageContent = () => {
    switch(pathname) {
      case '/contact':
        return {
          title: 'Ready to Connect?',
          subtitle: 'Choose how you\'d like to work with us - become a partner or get a custom quote for your business needs.'
        };
      case '/export':
        return {
          title: 'Join with us for greener future',
          subtitle: 'Partner with us for global distribution or request export quotes for international markets.'
        };
      case '/products':
        return {
          title: 'Take the Next Step',
          subtitle: 'Ready to bring sustainable solutions to your market? Partner with us or get pricing for our products.'
        };
      default:
        return {
          title: 'Work With Us',
          subtitle: 'Join our mission to create a sustainable future through partnership or custom product solutions.'
        };
    }
  };
  
  const { title, subtitle } = getPageContent();
  return (
    <section className="bg-[#e6f9ef] py-10 px-6 sm:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="font-bold text-[#0f1f2f] text-2xl sm:text-3xl mb-3">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-[#4a4a4a] max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Partner CTA - Left Side */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold text-[#0f1f2f] text-lg sm:text-xl mb-2">
              Want to distribute our products in your country?
            </h3>
            <p className="text-xs sm:text-sm text-[#4a4a4a] mb-6">
              Join our global network of partners and help spread sustainable
              solutions worldwide.
            </p>
            <a
              href="/partner"
              className={cn(
                "bg-[#0f4d3a] hover:bg-[#0d3f2d] text-white font-semibold",
                "rounded-full px-6 py-2 inline-flex items-center text-sm",
                "transition-colors duration-200"
              )}
            >
              Become a Partner
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </div>
          
          {/* Quote CTA - Right Side */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold text-[#0f1f2f] text-lg sm:text-xl mb-2">
              Need a custom quote for your business?
            </h3>
            <p className="text-xs sm:text-sm text-[#4a4a4a] mb-6">
              Get personalized pricing and product recommendations for your
              sustainable packaging needs.
            </p>
            <a
              href="/quote"
              className={cn(
                "bg-[#1a7a2b] hover:bg-[#0f5a1f] text-white font-semibold",
                "rounded-full px-6 py-2 inline-flex items-center text-sm",
                "transition-colors duration-200"
              )}
            >
              Request Quote
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BecomePartnerSection;
