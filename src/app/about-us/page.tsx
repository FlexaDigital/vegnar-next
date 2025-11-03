import React from 'react';
import { Metadata } from "next";
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLeaf,
  faLightbulb,
  faHandshake,
  faGlobe,
  faSeedling,
  faRecycle,
} from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import BecomePartnerSection from '@/components/BecomePartnerSection';

// Add the icons to the library
library.add(
  faLeaf,
  faLightbulb,
  faHandshake,
  faGlobe,
  faSeedling,
  faRecycle
);

export const metadata: Metadata = {
  title: 'About Vegnar Greens | India\'s Top Bagasse Products Manufacturer',
  description: 'Discover Vegnar Greens - India\'s premier bagasse products manufacturer. Leading the sustainable revolution with premium biodegradable tableware made from sugarcane bagasse in Gujarat, India.',
  keywords: [
    // Brand & Identity
    'Vegnar Greens',
    'Vegnar Bagasse',
    'Vegnar biodegradable products',
    'Vegnar sugarcane bagasse company',

    // Product Specific
    'biodegradable tableware manufacturer',
    'eco-friendly packaging company',
    'compostable packaging solutions',
    'sugarcane bagasse products',
    'biodegradable plates manufacturer',
    'compostable tableware India',
    'biodegradable food containers',
    'eco-friendly bowls supplier',
    'biodegradable clamshells',
    'bagasse round plates',
    'compartment plates manufacturer',
    'eco-friendly cups and bowls',

    // Materials & Sustainability
    'sugarcane bagasse factory in India',
    'sustainable materials manufacturer',
    'zero waste production',
    'agricultural waste upcycling',
    'eco-friendly manufacturing',
    'areca palm leaf tableware',

    // Business & Export
    'Bagasse products manufacturers in Gujarat',
    'Sugarcane Bagasse Plates Manufacturers in Gujarat',
    'Bagasse plates manufacturers in India',
    'bulk biodegradable supplier',
    'wholesale eco products India',
    'sustainable packaging exporter',
    'sugarcane bagasse company near me',
    'sugarcane bagasse company contact number'
  ].join(', '),
  openGraph: {
    title: 'About Vegnar Greens | Sugarcane Bagasse Product Manufacturer in India',
    description: 'Explore Vegnar Greens — India’s trusted brand for eco-conscious bagasse and biodegradable packaging products. From design to export, we deliver sustainable innovation.',
    url: 'https://www.vegnar.com/about-us',
    siteName: 'Vegnar Greens',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.vegnar.com/about-us',
  },
  robots: 'index, follow',
  authors: [{ name: 'Vegnar Greens' }],
  publisher: 'Vegnar Greens',
};


const coreValues = [
  {
    id: 'env-resp',
    icon: 'fa-leaf',
    title: 'Environmental Responsibility',
    description:
      'We make decisions with the planet in mind, considering the full lifecycle impact of everything we create.',
  },
  {
    id: 'innovation',
    icon: 'fa-lightbulb',
    title: 'Innovation in Packaging',
    description:
      'We constantly push the boundaries of what\'s possible in sustainable materials and design.',
  },
  {
    id: 'ethical-manuf',
    icon: 'fa-handshake',
    title: 'Ethical Manufacturing',
    description:
      'We ensure fair labor practices and responsible sourcing throughout our supply chain.',
  },
  {
    id: 'global-impact',
    icon: 'fa-globe',
    title: 'Global Impact',
    description:
      'We design solutions that address waste challenges in diverse communities around the world.',
  },
  {
    id: 'partnership',
    icon: 'fa-seedling',
    title: 'Partnership-Driven Growth',
    description:
      'We collaborate with businesses, organizations, and communities to amplify our collective impact.',
  },
  {
    id: 'circular-economy',
    icon: 'fa-recycle',
    title: 'Circular Economy',
    description:
      'We design products that return safely to the earth, creating a closed-loop system.',
  },
];

const goals = [
  {
    number: '12M+',
    title: 'Products Manufactured',
    description: 'Over 12 million premium bagasse products delivered globally.',
  },
  {
    number: '#1',
    title: 'In India',
    description: 'India\'s top bagasse products manufacturer by quality and volume.',
  },
  {
    number: '100%',
    title: 'Biodegradable',
    description: 'All products completely compostable within 90 days.',
  },
];

const Button = ({
  as: Component = 'button',
  className,
  children,
  ...props
}: {
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
  [key: string]: any;
}) => {
  let baseClasses =
    'inline-flex items-center justify-center rounded-md font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  let combinedClasses = className ? `${baseClasses} ${className}` : baseClasses;
  return (
    <Component className={combinedClasses} {...props}>
      {children}
    </Component>
  );
};

export default function OurStory() {
  return (
    <main className="w-full bg-gray-50 text-gray-900 font-sans text-base leading-relaxed">

      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 overflow-hidden">
        <div className="absolute inset-0">
         
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30"></div>
        </div>
        
       
        <div className="absolute top-20 left-10 w-20 h-20 bg-green-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-32 h-32 bg-emerald-400/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        
        <div className="relative z-10 text-center text-white px-6 max-w-6xl mx-auto">
          <div className="mb-8">
            <span className="inline-block bg-green-500/20 backdrop-blur-sm text-green-200 text-sm font-semibold rounded-full px-6 py-2 mb-6 border border-green-400/30">
              🌱 Transforming Tomorrow, Today
            </span>
          </div>
          
          <h1 className="text-5xl sm:text-7xl font-bold mb-8 leading-tight">
            Vegnar Greens
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">
              India's Top Bagasse Products Manufacturer
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl max-w-4xl mx-auto mb-12 text-gray-200 leading-relaxed">
            Pioneering sustainable innovation — India's premier manufacturer of premium bagasse tableware, transforming agricultural waste into eco-friendly solutions
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-full font-semibold text-base transition-all duration-300 transform hover:scale-105 shadow-xl">
              Our Story
            </button>
            <button className="border-2 border-white/30 backdrop-blur-sm text-white px-6 py-3 rounded-full font-semibold text-base hover:bg-white/10 transition-all duration-300">
              View Products
            </button>
          </div>
          

        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20 py-24 bg-white rounded-md shadow-md px-6 mx-4 mt-16 relative z-10">
        <article className="lg:w-1/2">
          <span className="inline-block bg-[#D4F5E1] text-[#007A3E] text-sm font-semibold rounded-full px-4 py-1 mb-3">
            OUR STORY
          </span>
          <h2 className="text-3xl font-semibold mb-6">About Vegnar Greens - India's Top Bagasse Products Manufacturer</h2>
          <p className="mb-6 text-justify">
            Vegnar Greens stands as India's top bagasse products manufacturer, revolutionizing sustainable packaging from our state-of-the-art facility in Gujarat. Founded on the vision of eliminating plastic waste, we've become the nation's most trusted name in premium bagasse tableware.
          </p>
          <p className="mb-6 text-justify">
            Our cutting-edge manufacturing processes transform sugarcane bagasse into superior-quality biodegradable products. From Vegnar round plates to compartment plates, bowls, clamshells, and cups — each product represents our commitment to environmental excellence and uncompromising quality.
          </p>
          <p className="mb-6 text-justify">
            As India's leading bagasse manufacturer, we've set new industry standards for sustainability, innovation, and performance. Our products deliver the durability of conventional tableware while ensuring complete biodegradability within 90 days.
          </p>
        </article>
        <figure className="lg:w-1/2 max-w-md w-full rounded-md overflow-hidden shadow-lg mx-auto">
          <Image
            src="/assets/img/about-us-hero.jpg"
            alt="Sustainable packaging products"
            width={600}
            height={400}
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </figure>
      </section>

      {/* Company Overview */}
      <section className="bg-white py-24 px-4 relative z-10">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <span className="inline-block bg-green-100 text-green-800 text-sm font-semibold rounded-full px-6 py-2 mb-6">
              🌍 Leading the Green Revolution
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              India's Premier
              <span className="block text-green-600">Bagasse Products Manufacturer</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Setting the gold standard in sustainable tableware manufacturing. Our advanced Gujarat facility produces premium bagasse products that combine environmental responsibility with exceptional performance for global markets.
            </p>
          </div>
          
          {/* Timeline */}
          <div className="mb-20">
            <div className="flex flex-col md:flex-row items-center justify-between max-w-4xl mx-auto">
              <div className="flex flex-col items-center text-center mb-8 md:mb-0">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                  <span className="text-white font-bold text-lg">1</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Vision Born</h3>
                <p className="text-gray-600 text-sm max-w-xs">Recognized the urgent need for plastic alternatives</p>
              </div>
              
              <div className="hidden md:block flex-1 h-0.5 bg-gradient-to-r from-green-500 to-emerald-600 mx-4"></div>
              
              <div className="flex flex-col items-center text-center mb-8 md:mb-0">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                  <span className="text-white font-bold text-lg">2</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Innovation</h3>
                <p className="text-gray-600 text-sm max-w-xs">Developed breakthrough bagasse processing technology</p>
              </div>
              
              <div className="hidden md:block flex-1 h-0.5 bg-gradient-to-r from-green-500 to-emerald-600 mx-4"></div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                  <span className="text-white font-bold text-lg">3</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Global Impact</h3>
                <p className="text-gray-600 text-sm max-w-xs">Expanding worldwide to eliminate plastic waste</p>
              </div>
            </div>
          </div>

          {/* Product Showcase */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl overflow-hidden shadow-2xl">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="relative h-96 lg:h-auto overflow-hidden">
                <Image
                  src="/assets/img/bagasse.webp"
                  alt="Biodegradable tableware collection"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
                <div className="absolute top-6 left-6">
                  <span className="bg-green-600 text-white text-sm font-bold px-4 py-2 rounded-full">
                    ECO-FRIENDLY
                  </span>
                </div>
              </div>
              
              <div className="p-12 flex flex-col justify-center">
                <h3 className="text-4xl font-bold text-gray-900 mb-4">India's Top Quality Bagasse Products</h3>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Our premium bagasse products represent the pinnacle of sustainable manufacturing in India. Using advanced technology and superior sugarcane bagasse, we create tableware that exceeds international quality standards while maintaining complete biodegradability.
                </p>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Performance Features</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center text-gray-700">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        <span className="text-sm">Microwave Safe (220°F)</span>
                      </li>
                      <li className="flex items-center text-gray-700">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        <span className="text-sm">Oil & Water Resistant</span>
                      </li>
                      <li className="flex items-center text-gray-700">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        <span className="text-sm">Freezer Safe</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Certifications</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center text-gray-700">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        <span className="text-sm">FDA Approved</span>
                      </li>
                      <li className="flex items-center text-gray-700">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        <span className="text-sm">SGS Tested</span>
                      </li>
                      <li className="flex items-center text-gray-700">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        <span className="text-sm">Compostable in 90 days</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex gap-4 mt-6">
                  <button className="bg-gradient-to-r from-green-600 to-emerald-700 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-800 transition-all duration-300">
                    View Products
                  </button>
                  <button className="border-2 border-green-600 text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-all duration-300">
                    Download Catalog
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Mission Section */}
      <section className="bg-[#008060] text-white py-16 px-8 sm:px-16 rounded-md my-24 text-center max-w-4xl mx-auto">
        <span className="inline-block bg-white/20 text-white text-sm font-semibold rounded-full px-4 py-1 mb-3">
          OUR MISSION
        </span>
        <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
        <p className="text-lg max-w-xl mx-auto">
          To establish India as the global leader in sustainable packaging by manufacturing world-class bagasse products that eliminate plastic waste. We're committed to transforming agricultural waste into premium biodegradable solutions that protect our planet for future generations.
        </p>
        <div className="border-b border-white w-16 mx-auto mt-8"></div>
      </section>

      {/* Vision & Core Values */}
      <section className="mb-24 text-center max-w-5xl mx-auto px-4 sm:px-8">
        <span className="inline-block bg-[#D4F5E1] text-[#007A3E] text-sm font-semibold rounded-full px-4 py-1 mb-3">
          OUR VALUES
        </span>
        <h2 className="text-3xl font-semibold mb-2">Our Vision & Core Values</h2>
        <p className="text-lg text-[#004D40]/70 mb-10">
          The principles that guide every decision we make and every product we create
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {coreValues.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-lg p-6 text-center flex-1 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex justify-center">
                <FontAwesomeIcon
                  icon={card.icon as any}
                  className="text-[#007A3E] w-7 h-7 mb-1.5"
                />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">
                {card.title}
              </h3>
              <p className="text-slate-600 text-sm">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Goals Section */}
      <section className="mb-24 text-center max-w-6xl mx-auto px-4 sm:px-8 bg-white py-16 rounded-lg shadow-md">
        <span className="inline-block bg-[#D4F5E1] text-[#007A3E] text-sm font-semibold rounded-full px-4 py-1 mb-3">
          OUR GOALS
        </span>
        <h2 className="text-3xl font-semibold mb-2">Our Goals for the Future</h2>
        <p className="text-lg text-[#004D40]/70 mb-10 max-w-xl mx-auto">
          Ambitious targets for a sustainable future
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {goals.map((goal, index) => (
            <div
              key={index}
              className="bg-[#F0F9F4] rounded-lg p-8 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <p className="text-4xl font-bold text-[#007A3E] mb-4">{goal.number}</p>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                {goal.title}
              </h3>
              <p className="text-slate-600">{goal.description}</p>
            </div>
          ))}
        </div>
      </section>
      <BecomePartnerSection />
    </main>
  );
}

