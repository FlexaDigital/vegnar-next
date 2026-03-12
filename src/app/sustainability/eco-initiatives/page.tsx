// app/sustainability/eco-initiatives/page.tsx

import React from 'react';
import { Metadata } from 'next';
import EnvironmentalImpactComponent from '@/components/Environmentalimpact'; // Assuming this component exists
import EcoMovement from '@/components/Eco-movement'; // Assuming this component exists
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRecycle,
  faSeedling,
  faTree,
  faBan,
  faLeaf,
  faBoxOpen,
  faIndustry,
  faGlobeAmericas, // Added for consistency
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

// Define Button component (remains the same)
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

// Utility function to combine class names (remains the same)
// const cn = (...classes: string[]) => classes.filter(Boolean).join(' '); // Not used in the provided snippet directly, but good to keep if used elsewhere

// Metadata for SEO (remains the same)
export const metadata: Metadata = {
  title: 'Our Eco Initiatives - Sustainable Manufacturing & Green Practices | Vegnar',
  description:
    'Discover how Vegnar leads the biodegradable industry with eco-initiatives, sustainable manufacturing, renewable resources, and zero-waste policies.',
  keywords: [
    'sustainability in manufacturing', 'eco-friendly initiatives', 'green packaging solutions', /* ... many keywords ... */ 'environmental responsibility', 'green commitment Vegnar', 'compostable future vision',
  ],
  openGraph: {
    title: 'Eco Initiatives at Vegnar - Driving Sustainable Change',
    description:
      'Learn how Vegnar champions sustainability with eco-driven innovations and a commitment to biodegradable, zero-waste, and planet-friendly manufacturing practices.',
    url: 'https://www.vegnar.com/sustainability/eco-initiatives',
    images: [
      {
        url: 'https://vegnar.com/images/sustainability-banner.jpg', // Ensure this image is accessible
        width: 1200,
        height: 630,
        alt: 'Sustainability Banner',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eco Initiatives - Sustainable Manufacturing & Green Innovation | Vegnar',
    description:
      'Vegnar is committed to sustainability through biodegradable production, renewable resources, and zero-waste operations. Join us in our eco mission.',
    images: ['https://vegnar.com/images/sustainability-banner.jpg'], // Ensure this image is accessible
  },
  alternates: {
    canonical: "https://www.vegnar.com/sustainability/eco-initiatives",
  },
  robots: "index, follow",
  authors: [{ name: "Vegnar Greens" }],
  publisher: "Vegnar Greens",
};

// --- Data for the three commitment cards ---
interface CommitmentCardData {
  id: number;
  icon: IconDefinition;
  title: string;
  description: string;
}

const commitmentCardItems: CommitmentCardData[] = [
  {
    id: 1,
    icon: faRecycle,
    title: "100% Biodegradable",
    description: "All our products return to nature",
  },
  {
    id: 2,
    icon: faSeedling,
    title: "Plant-Based Materials",
    description: "Sourced from agricultural waste",
  },
  {
    id: 3,
    icon: faTree,
    title: "Carbon Negative",
    description: "We offset more than we produce",
  },
];

// --- Updated data for initiatives section ---
interface InitiativeData {
  id: number;
  icon: IconDefinition; // Changed from string to IconDefinition
  title: string;
  description: string;
  linkText: string;
  linkUrl?: string; // Optional: for actual navigation
}

const initiatives: InitiativeData[] = [
  {
    id: 1,
    icon: faBan, // Use imported IconDefinition
    title: 'Plastic Waste Reduction',
    description:
      'We provide sustainable alternatives that eliminate single-use plastics. Our products decompose within 180 days, with over 5 million plastic items avoided so far.',
    linkText: '→ Learn about our plastic-free commitment',
    linkUrl: '#plastic-free', // Example link
  },
  {
    id: 2,
    icon: faLeaf, // Use imported IconDefinition
    title: 'Agricultural Waste Upcycling',
    description:
      'We transform agricultural waste into durable tableware. This supports farmers and prevents pollution from burning crop residues.',
    linkText: '→ Explore our material sourcing process',
    linkUrl: '#material-sourcing', // Example link
  },
  {
    id: 3,
    icon: faBoxOpen, // Use imported IconDefinition
    title: 'Zero-Waste Packaging',
    description:
      'All Vegnar products arrive in recyclable or compostable packaging. Even our shipping materials are reusable or compostable.',
    linkText: '→ See our packaging innovations',
    linkUrl: '#packaging-innovations', // Example link
  },

  {
    id: 5,
    icon: faIndustry, // Use imported IconDefinition
    title: 'Green Manufacturing Processes',
    description:
      'Our facilities run on 40% renewable energy, recycle 95% of water, and use 60% less energy than plastic factories. Zero-landfill policy in place.',
    linkText: '→ Tour our green manufacturing',
    linkUrl: '#green-manufacturing', // Example link
  },
];

const EcoInitiativesPage = () => {
  return (
    <>
      <section className="bg-gradient-to-br from-green-50 to-green-100 pt-24 pb-32 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="inline-block bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
            🌱 SUSTAINABILITY
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Our Eco-Initiatives
          </h1>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-10">
            At Vegnar Greens, sustainability isn't just a buzzword—it's our core mission. 
            We're committed to creating a positive environmental impact through innovative, 
            eco-conscious{" "}
            <Link href="/products" className="text-green-700 font-semibold hover:underline decoration-2 underline-offset-2 transition-all">
              tableware solutions
            </Link>{" "}
            that protect our planet for future generations. Our{" "}
            <Link href="/manufacturing" className="text-green-700 font-semibold hover:underline decoration-2 underline-offset-2 transition-all">
              sustainable manufacturing processes
            </Link>{" "}
            ensure every product meets the highest environmental standards.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/products">
              <Button className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 shadow-lg transform hover:scale-105 transition-all">
                Explore Our Products
              </Button>
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-white transform -skew-y-1"></div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-xl p-12 relative -mt-16">
            <div className="absolute -top-8 right-12 bg-green-600 rounded-full w-16 h-16 flex items-center justify-center shadow-lg">
              <FontAwesomeIcon icon={faGlobeAmericas} className="text-white text-2xl" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Our Commitment to Environmental Responsibility
            </h2>
            <p className="text-gray-700 text-lg mb-12 leading-relaxed">
              Our approach to sustainability spans sourcing, manufacturing, packaging, and logistics. 
              We continually refine processes to minimize impact while delivering{" "}
              <Link href="/products/bagasse-products" className="text-green-700 font-semibold hover:underline decoration-2 underline-offset-2 transition-all">
                planet-friendly bagasse solutions
              </Link>. Get instant{" "}
              <Link href="/quote" className="text-green-700 font-semibold hover:underline decoration-2 underline-offset-2 transition-all">
                pricing for bulk orders
              </Link>{" "}
              and join the sustainable packaging revolution.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {commitmentCardItems.map((card) => (
                <div key={card.id} className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
                  <div className="bg-green-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                    <FontAwesomeIcon icon={card.icon} className="text-white text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {card.title}
                  </h3>
                  <p className="text-gray-600">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Key Eco-Initiatives
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how we're making a difference through concrete actions and measurable impact
            </p>
          </div>
          <div className="grid gap-8">
            {initiatives.map((initiative, index) => (
              <div
                key={initiative.id}
                className={`bg-white rounded-2xl p-10 flex flex-col lg:flex-row items-center gap-10 shadow-lg hover:shadow-xl transition-shadow ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className="flex-shrink-0 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl w-24 h-24 flex items-center justify-center shadow-lg">
                  <FontAwesomeIcon
                    icon={initiative.icon}
                    className="text-white text-3xl"
                  />
                </div>
                <div className="flex-1 text-center lg:text-left">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {initiative.title}
                  </h3>
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    {initiative.description}
                  </p>
                  <a
                    href={initiative.linkUrl || '#'}
                    className="inline-flex items-center text-green-600 hover:text-green-700 font-semibold text-lg hover:underline transition-colors"
                  >
                    {initiative.linkText}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Sections */}
      {/* Make sure these components are correctly imported and exist */}
      <EnvironmentalImpactComponent />
      <EcoMovement />
    </>
  );
};

export default EcoInitiativesPage;