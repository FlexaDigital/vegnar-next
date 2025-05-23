import React from 'react';
import { ArrowRight } from 'lucide-react'; // For the arrow icon

// Utility for combining class names.  This is a simplified version.
//  If you have a more robust 'cn' utility in your project, use that instead.
const cn = (...classes: string[]): string => {
  return classes.filter(Boolean).join(' ');
};

const BecomePartnerSection = () => {
  return (
    <section className="bg-[#e6f9ef] py-10 px-6 sm:px-8 lg:px-12">
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="font-semibold text-[#0f1f2f] text-lg sm:text-xl mb-2">
          Want to distribute our products in your country?
        </h3>
        <p className="text-xs sm:text-sm text-[#4a4a4a] mb-6 max-w-xl mx-auto">
          Join our global network of partners and help spread sustainable
          solutions worldwide.
        </p>
        <a
          href="/partner"
          className={cn(
            "bg-[#0f4d3a] hover:bg-[#0d3f2d] text-white font-semibold",
            "rounded-full px-6 py-2 inline-flex items-center mx-auto text-sm",
            "transition-colors duration-200"
          )}
        >
          Become a Partner
          <ArrowRight className="ml-2 w-4 h-4" />
        </a>
      </div>
    </section>
  );
};

export default BecomePartnerSection;
