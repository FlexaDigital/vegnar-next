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
    url: 'http://localhost:3000/sustainability/eco-initiatives', // Ensure this URL is correct for production
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
      <section className="bg-[#E9F9F1] pt-20 pb-28 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-extrabold text-[#1B2733] leading-tight">
            Our Eco-Initiatives
          </h1>
          <p className="mt-4 text-lg text-[#3B4A57] max-w-3xl mx-auto leading-relaxed">
            At Vegnar Greens, sustainability isn't just a buzzword—it's our
            core mission. We're committed to creating a positive environmental
            impact through innovative, eco-conscious tableware solutions.
          </p>
          <div className="mt-8 flex justify-center gap-6 flex-wrap">
            <Button className="bg-[#0D8B5F] text-white rounded-full px-6 py-3 hover:bg-[#0b6f4a]">
              Explore Our Products
            </Button>
            <Button className="border border-[#0D8B5F] text-[#0D8B5F] rounded-full px-6 py-3 hover:bg-[#0D8B5F] hover:text-white">
              Our Sustainability Report
            </Button>
          </div>
        </div>
        {/* Decorative skewed div */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-[#E9F9F1] transform -skew-y-2"></div>
      </section>

      <section>
        <div className="max-w-7xl mx-auto px-6 py-12 relative">
          {/* Main content card for this section */}
          <div className="bg-white rounded-xl shadow-lg p-10 max-w-5xl mx-auto relative -mt-24"> {/* Added -mt-24 to pull it up over the skew */}
            <div className="absolute -top-6 right-10 bg-green-100 rounded-full w-14 h-14 flex items-center justify-center shadow-md">
              {/* Using FontAwesomeIcon for consistency */}
              <FontAwesomeIcon icon={faGlobeAmericas} className="text-green-600 text-2xl" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-4">
              Our Commitment to Environmental Responsibility
            </h2>
            <p className="text-slate-700 mb-10 leading-relaxed">
              Our approach to sustainability spans sourcing, manufacturing,
              packaging, and logistics. We continually refine processes to
              minimize impact while delivering planet-friendly solutions.
            </p>

            {/* --- Refactored Three Commitment Cards --- */}
            <div className="flex flex-col sm:flex-row gap-6">
              {commitmentCardItems.map((card) => (
                <div key={card.id} className="bg-green-50 rounded-lg p-6 text-center flex-1">
                  <div className="flex justify-center">
                    <FontAwesomeIcon
                      icon={card.icon}
                      className="text-green-700 w-7 h-7 mb-1.5" // Adjusted margin
                    />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-0.5"> {/* Adjusted margin */}
                    {card.title}
                  </h3>
                  <p className="text-slate-600 text-sm mt-0"> {/* Ensured no top margin */}
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-12"> {/* Added py-12 for consistency */}
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-center text-2xl font-extrabold text-slate-900 mb-10"> {/* Changed color for better contrast on light bg */}
            Key Eco-Initiatives
          </h2>
          <div className="space-y-10">
            {initiatives.map((initiative) => (
              <div
                key={initiative.id}
                className="bg-white rounded-lg p-8 flex flex-col sm:flex-row items-center sm:items-start gap-8 shadow-md"
              >
                <div className="flex-shrink-0 bg-green-100 rounded-full w-20 h-20 flex items-center justify-center">
                  {/* --- Using FontAwesomeIcon for initiative icons --- */}
                  <FontAwesomeIcon
                    icon={initiative.icon}
                    className="text-green-600 text-3xl"
                    width="25"
                    height= "25" // text-3xl should work; adjust if too small/large
                                                        // or use size prop e.g. size="2x"
                                                        // or fixed width/height e.g. w-10 h-10
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    {initiative.title}
                  </h3>
                  <p className="text-slate-700 mb-2 leading-relaxed">{initiative.description}</p> {/* Added leading-relaxed */}
                  <a
                    href={initiative.linkUrl || '#'} // Use linkUrl, fallback to '#'
                    className="text-green-700 hover:underline font-medium text-sm"
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