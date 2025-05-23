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
  title: 'About Vegnar Green | Leading Biodegradable Products Manufacturer',
  description: 'Discover Vegnar Green - India\'s premier manufacturer of biodegradable tableware and eco-friendly packaging. Specializing in sugarcane bagasse products, areca palm leaf tableware, and compostable bio bags.',
  keywords: [
    // Primary Keywords
    'biodegradable tableware manufacturer',
    'eco-friendly packaging company',
    'sustainable products manufacturer',
    'compostable packaging solutions',
    
    // Product Specific
    'sugarcane bagasse products',
    'areca palm leaf tableware',
    'biodegradable plates manufacturer',
    'eco-friendly bowls supplier',
    'compostable bio bags',
    'biodegradable food containers',
    
    // Materials & Process
    'agricultural waste upcycling',
    'sustainable materials',
    'eco-friendly manufacturing',
    'zero waste production',
    
    // Business & Location
    'Indian eco manufacturer',
    'Gujarat green company',
    'wholesale eco products',
    'bulk biodegradable supplier',
    'export quality eco products',
    'sustainable packaging exporter'
  ].join(', '),
  openGraph: {
    title: 'About Vegnar Green | Leading Biodegradable Products Manufacturer',
    description: 'Join us in revolutionizing sustainable packaging. Discover how we transform agricultural waste into premium biodegradable products that protect both your products and our planet.',
    url: 'https://www.vegnar.com/about-us',
    siteName: 'Vegnar Green',
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
    number: '50M+',
    title: 'Plastic Items Eliminated',
    description: 'Replace 50 million single-use plastic items by 2030.',
  },
  {
    number: '100+',
    title: 'Global Partners',
    description: 'Partner with over 100 eco-conscious businesses worldwide.',
  },
  {
    number: '100%',
    title: 'Carbon Neutral',
    description: 'Achieve carbon-neutral manufacturing by 2025.',
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
    <main className="w-full bg-[#E6F9F1] text-[#004D40] font-sans text-base leading-relaxed">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center bg-[#004D40]">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/assets/img/about-us-hero.jfif"
            alt="Vegnar Green sustainable manufacturing facility"
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl sm:text-5xl font-semibold mb-6">
            About Vegnar Green
          </h1>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto">
            Leading manufacturer of biodegradable tableware and eco-friendly packaging solutions
          </p>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="bg-white py-16 px-4 -mt-16 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-2xl sm:text-3xl font-medium text-gray-900 mb-4">
              India's Leading Manufacturer of Biodegradable Products
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Pioneering sustainable alternatives with our premium range of biodegradable tableware and compostable bio bags
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Biodegradable Tableware Card */}
            <div className="bg-[#F0F9F4] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative h-64">
                <Image
                  src="/assets/img/bagasse.webp"
                  alt="Biodegradable tableware collection"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold mb-1">Biodegradable Tableware</h3>
                  <p className="text-sm">Made from Sugarcane Bagasse</p>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-gray-700">
                    <FontAwesomeIcon icon={faLeaf} className="w-4 h-4 text-[#007A3E] mr-2" />
                    <span>100% Natural & Biodegradable</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <FontAwesomeIcon icon={faLeaf} className="w-4 h-4 text-[#007A3E] mr-2" />
                    <span>Microwave & Freezer Safe</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <FontAwesomeIcon icon={faLeaf} className="w-4 h-4 text-[#007A3E] mr-2" />
                    <span>Oil & Leak Resistant</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <FontAwesomeIcon icon={faLeaf} className="w-4 h-4 text-[#007A3E] mr-2" />
                    <span>Sturdy & Elegant Design</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bio Bags Card */}
            <div className="bg-[#F0F9F4] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative h-64">
                <Image
                  src="/assets/img/bio-bags.png"
                  alt="Compostable bio bags collection"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold mb-1">Compostable Bio Bags</h3>
                  <p className="text-sm">Plant-Based Alternative to Plastic</p>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-gray-700">
                    <FontAwesomeIcon icon={faLeaf} className="w-4 h-4 text-[#007A3E] mr-2" />
                    <span>100% Compostable Material</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <FontAwesomeIcon icon={faLeaf} className="w-4 h-4 text-[#007A3E] mr-2" />
                    <span>High Tensile Strength</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <FontAwesomeIcon icon={faLeaf} className="w-4 h-4 text-[#007A3E] mr-2" />
                    <span>Multiple Sizes Available</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <FontAwesomeIcon icon={faLeaf} className="w-4 h-4 text-[#007A3E] mr-2" />
                    <span>Customizable Solutions</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20 py-24 bg-white rounded-md shadow-md px-6 mx-4 -mt-16 relative z-10">
        <article className="lg:w-1/2">
          <span className="inline-block bg-[#D4F5E1] text-[#007A3E] text-sm font-semibold rounded-full px-4 py-1 mb-3">
            OUR STORY
          </span>
          <h2 className="text-3xl font-semibold mb-6">Our Roots</h2>
          <p className="mb-6 text-justify">
            Vegnar Greens began with a simple but powerful observation — the
            devastating impact of plastic waste on nature. Motivated by the need
            for change, our founder envisioned a sustainable future where
            everyday convenience doesn't compromise the environment.
          </p>
          <p className="mb-6 text-justify">
            What started as a small initiative has grown into a mission-driven
            movement. A team of engineers, designers, and environmental experts
            came together to create eco-friendly alternatives to plastic, driven
            by a shared commitment to innovation and sustainability.
          </p>
          <p className="mb-6 text-justify">
            Today, Vegnar Greens leads in sustainable packaging, transforming
            agricultural waste and renewable resources into high-quality,
            biodegradable products. Our solutions are designed to perform like
            conventional plastics—while leaving a positive footprint on the
            planet.
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

      {/* Mission Section */}
      <section className="bg-[#008060] text-white py-16 px-8 sm:px-16 rounded-md my-24 text-center max-w-4xl mx-auto">
        <span className="inline-block bg-white/20 text-white text-sm font-semibold rounded-full px-4 py-1 mb-3">
          OUR MISSION
        </span>
        <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
        <p className="text-lg max-w-xl mx-auto">
          Our mission is to lead the transition toward eco-friendly living by
          delivering innovative biodegradable products that replace
          conventional plastic in everyday use. Through continuous innovation,
          ethical practices, and global partnerships, we aim to reduce plastic
          dependency, promote environmental responsibility, and empower
          businesses and consumers to make sustainable choices.
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
    </main>
  );
}

