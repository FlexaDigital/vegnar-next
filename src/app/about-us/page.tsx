import React from 'react';
import { Metadata } from "next";
import Image from 'next/image';
import Script from 'next/script';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLeaf,
  faLightbulb,
  faHandshake,
  faGlobe,
  faSeedling,
  faRecycle,
  faIndustry,
  faMapMarkerAlt,
  faClock,
  faCubes,
} from '@fortawesome/free-solid-svg-icons';
import {
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import BecomePartnerSection from '@/components/BecomePartnerSection';
import { SITE_CONFIG } from '@/lib/constants';

// Add the icons to the library
library.add(
  faLeaf,
  faLightbulb,
  faHandshake,
  faGlobe,
  faSeedling,
  faRecycle,
  faIndustry,
  faMapMarkerAlt,
  faClock,
  faCubes,
  faLinkedin
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
    description: 'Explore Vegnar Greens — India\'s trusted brand for eco-conscious bagasse and biodegradable packaging products. From design to export, we deliver sustainable innovation.',
    url: `${SITE_CONFIG.BASE_URL}/about-us`,
    siteName: 'Vegnar Greens',
    type: 'website',
  },
  alternates: {
    canonical: `${SITE_CONFIG.BASE_URL}/about-us`,
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

const certifications = [
  {
    id: 'sgs',
    title: 'SGS Tested',
    image: '/assets/img/certifications/sgs.png',
    description: 'Independently tested by SGS, the world\'s leading inspection and certification company.',
  },
  {
    id: 'fda',
    title: 'FDA Approved',
    image: '/assets/img/certifications/fda.png',
    description: 'Compliant with U.S. FDA standards for food-contact safety.',
  },
  {
    id: 'iso9001',
    title: 'ISO 9001:2015',
    image: '/assets/img/certifications/certification-badges.png',
    description: 'Quality Management System certified — ensuring consistent product excellence.',
  },
  {
    id: 'iso14001',
    title: 'ISO 14001:2015',
    image: '/assets/img/certifications/certification-badges.png',
    description: 'Environmental Management System certified — minimizing our ecological footprint.',
  },
];

const teamMembers = [
  {
    id: 'tushar',
    name: 'Tushar Hirani',
    role: 'Co-Founder & CEO',
    image: '/assets/img/team/tushar-hirani.png',
    linkedin: 'https://www.linkedin.com/in/tushar-hirani/',
    bio: 'A visionary entrepreneur with deep expertise in sustainable manufacturing, Tushar leads Vegnar Greens\' strategic growth and global expansion. His passion for eliminating single-use plastics drives the company\'s mission to build a greener future. Under his leadership, Vegnar Greens has become India\'s most trusted name in premium bagasse tableware.',
  },
  {
    id: 'ashish',
    name: 'Ashish Chauhan',
    role: 'Co-Founder & COO',
    image: '/assets/img/team/ashish-chauhan.png',
    linkedin: 'https://www.linkedin.com/in/ashish-chauhan/',
    bio: 'With a strong background in operations and supply chain management, Ashish oversees Vegnar Greens\' manufacturing excellence from the Gujarat facility. His hands-on approach to quality control and process optimization ensures every product meets international standards while maintaining cost efficiency for partners worldwide.',
  },
];

const factoryStats = [
  {
    icon: faMapMarkerAlt,
    label: 'Location',
    value: 'Gujarat, India',
    detail: 'State-of-the-art facility in the heart of India\'s industrial hub',
  },
  {
    icon: faIndustry,
    label: 'Production Capacity',
    value: '500,000+ pcs/day',
    detail: 'Fully automated production lines with scalable output',
  },
  {
    icon: faClock,
    label: 'Years in Business',
    value: '5+ Years',
    detail: 'Trusted by partners across 15+ countries since inception',
  },
  {
    icon: faCubes,
    label: 'Product Range',
    value: '50+ SKUs',
    detail: 'Plates, bowls, clamshells, cups, trays, and custom designs',
  },
];

export default function OurStory() {
  return (
    <>
      <Script
        id="about-us-json-ld-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "AboutPage",
                "@id": "https://www.vegnar.com/about-us#webpage",
                "url": "https://www.vegnar.com/about-us",
                "name": "About Vegnar Green — India's Top Bagasse Products Manufacturer",
                "description": "Learn about Vegnar Green's founding story, Gujarat manufacturing facility, certifications and mission to replace plastic with biodegradable bagasse tableware.",
                "isPartOf": { "@id": "https://www.vegnar.com/#website" },
                "about": { "@id": "https://www.vegnar.com/#organization" }
              },
              {
                "@type": "Corporation",
                "@id": "https://www.vegnar.com/#organization",
                "name": "Vegnar Green",
                "url": "https://www.vegnar.com",
                "foundingDate": "2019",
                "foundingLocation": "Rajkot, Gujarat, India",
                "founder": [
                  {
                    "@type": "Person",
                    "name": "Tushar Hirani",
                    "jobTitle": "Co-Founder & Sales Director",
                    "sameAs": "https://www.linkedin.com/in/hiranitushar/"
                  },
                  {
                    "@type": "Person",
                    "name": "Ashish Chauhan",
                    "jobTitle": "Co-Founder & COO",
                    "sameAs": "https://www.linkedin.com/in/ashiishchauhan/"
                  }
                ],
                "award": [
                  "SGS Tested",
                  "FDA Approved for food contact",
                  "ISO 9001:2015 Certified",
                  "ISO 14001:2015 Certified"
                ],
                "numberOfEmployees": {
                  "@type": "QuantitativeValue",
                  "minValue": 50
                },
                "areaServed": "Worldwide"
              },
              {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://www.vegnar.com/"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "About Us",
                    "item": "https://www.vegnar.com/about-us"
                  }
                ]
              }
            ]
          })
        }}
      />
    <main className="w-full bg-gray-50 text-gray-900 font-sans text-base leading-relaxed">

      {/* ═══════════ HERO SECTION ═══════════ */}
      <section className="relative bg-gradient-to-br from-green-50 to-green-100 py-20 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block bg-green-700 text-white text-sm font-semibold rounded-full px-4 py-1 mb-4">
            ABOUT VEGNAR GREENS
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
            India&apos;s Top Bagasse Products Manufacturer
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Pioneering sustainable innovation — transforming agricultural waste into premium <a href="/products/bagasse-products" className="text-green-600 hover:text-green-700 underline">bagasse products</a> for a greener tomorrow
          </p>
        </div>
      </section>

      {/* ═══════════ FOUNDING STORY (E-E-A-T) ═══════════ */}
      <section className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20 py-24 bg-white rounded-md shadow-md px-6 sm:px-12 mx-4 mt-16 relative z-10">
        <article className="lg:w-1/2">
          <span className="inline-block bg-[#D4F5E1] text-[#007A3E] text-sm font-semibold rounded-full px-4 py-1 mb-3">
            OUR FOUNDING STORY
          </span>
          <h2 className="text-3xl font-bold mb-6 text-gray-900">
            From a Bold Idea to India&apos;s Leading Bagasse Manufacturer
          </h2>
          <p className="mb-5 text-gray-700 text-justify leading-relaxed">
            Vegnar Greens was born from a simple but powerful observation: every single day, millions of single-use plastic plates, cups, and containers end up in India&apos;s landfills and oceans. In 2019, co-founders <strong>Tushar Hirani</strong> and <strong>Ashish Chauhan</strong> — both raised in Gujarat&apos;s vibrant entrepreneurial culture — decided enough was enough.
          </p>
          <p className="mb-5 text-gray-700 text-justify leading-relaxed">
            Having grown up surrounded by sugarcane farms, they saw an untapped opportunity. Sugarcane processing generates massive amounts of bagasse — fibrous residue that was largely burned or discarded. What if this agricultural &ldquo;waste&rdquo; could become the raw material for premium, fully compostable tableware like <a href="/products/round-plates" className="text-green-600 hover:text-green-700 underline">Vegnar round plates</a>, <a href="/products/bowls" className="text-green-600 hover:text-green-700 underline">bowls</a>, and <a href="/products/clamshells" className="text-green-600 hover:text-green-700 underline">clamshells</a>?
          </p>
          <p className="mb-5 text-gray-700 text-justify leading-relaxed">
            With personal savings and relentless determination, they set up their first production line in a small facility in Gujarat. The early days were tough — perfecting the molding process, achieving the right thickness and water resistance, and convincing buyers that bagasse products could truly rival plastic in performance were all uphill battles.
          </p>
          <p className="mb-5 text-gray-700 text-justify leading-relaxed">
            But quality spoke for itself. Within two years, word-of-mouth referrals from hotels, caterers, and export houses turned Vegnar Greens into one of India&apos;s fastest-growing eco-packaging brands. Today, the company operates a <strong><a href="/manufacturing" className="text-green-600 hover:text-green-700 underline">our advanced Gujarat facility</a></strong> with a production capacity exceeding <strong>500,000 pieces per day</strong>, serving partners in over <strong>15 countries</strong>.
          </p>
          <p className="text-gray-700 text-justify leading-relaxed">
            Over <strong>5+ years</strong> in business, Vegnar Greens has stayed true to its founding promise: delivering uncompromising quality, complete <a href="/sustainability/eco-initiatives" className="text-green-600 hover:text-green-700 underline">biodegradable within 90 days</a>, and tangible impact against plastic pollution — one plate at a time.
          </p>
        </article>
        <figure className="lg:w-1/2 max-w-md w-full rounded-md overflow-hidden shadow-lg mx-auto">
          <Image
            src="/assets/img/about-us-hero.jpg"
            alt="Vegnar Greens sustainable packaging products and bagasse tableware"
            width={600}
            height={400}
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </figure>
      </section>

      {/* ═══════════ FACTORY & PRODUCTION DETAILS ═══════════ */}
      <section className="bg-white py-24 px-4 relative z-10">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              World-Class Facility,
              <span className="block text-green-600">Made in Gujarat, India</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our advanced manufacturing facility combines cutting-edge automation with rigorous quality control to produce premium bagasse products at scale — sustainably and efficiently.
            </p>
          </div>

          {/* Factory Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {factoryStats.map((stat, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-green-100"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg">
                  <FontAwesomeIcon icon={stat.icon} className="text-white w-6 h-6" />
                </div>
                <p className="text-xs font-bold text-green-700 uppercase tracking-wider mb-2">{stat.label}</p>
                <p className="text-2xl font-extrabold text-gray-900 mb-2">{stat.value}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{stat.detail}</p>
              </div>
            ))}
          </div>

          {/* Product Showcase */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl overflow-hidden shadow-2xl">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="relative h-96 lg:h-auto overflow-hidden">
                <Image
                  src="/assets/img/bagasse.webp"
                  alt="Biodegradable tableware collection by Vegnar Greens"
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
                <h3 className="text-4xl font-bold text-gray-900 mb-4">India&apos;s Top Quality Bagasse Products</h3>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Our premium bagasse products represent the pinnacle of sustainable manufacturing in India. Using advanced technology and superior sugarcane bagasse, we create tableware that exceeds international quality standards while maintaining complete biodegradability through our <a href="/sustainability/eco-initiatives" className="text-green-600 hover:text-green-700 underline">sustainable packaging initiatives</a>.
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
                        <span className="text-sm">Oil &amp; Water Resistant</span>
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
                  <a href="/products/bagasse-products" className="bg-gradient-to-r from-green-600 to-emerald-700 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-800 transition-all duration-300">
                    View all bagasse products
                  </a>
                  <a href="/quote" className="border-2 border-green-600 text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-all duration-300">
                    request a bulk quote
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    

      {/* ═══════════ CERTIFICATIONS WITH IMAGES ═══════════ */}
      <section className="py-24 px-4 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'url(/assets/bg-green.png)', backgroundRepeat: 'repeat', backgroundSize: '300px auto' }}></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block bg-[#D4F5E1] text-[#007A3E] text-sm font-semibold rounded-full px-4 py-1 mb-3">
              QUALITY ASSURED
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Globally Certified <span className="text-green-600">Quality</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our products are rigorously tested and certified by the world&apos;s leading standards organizations, ensuring safety, quality, and environmental responsibility.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-6 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-green-100 group"
              >
                <div className="w-28 h-28 mx-auto mb-5 relative rounded-full overflow-hidden shadow-md group-hover:shadow-lg transition-shadow duration-300">
                  <Image
                    src={cert.image}
                    alt={`${cert.title} certification badge`}
                    fill
                    className="object-contain p-1"
                  />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{cert.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{cert.description}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-500 text-sm mt-12 max-w-2xl mx-auto">
            All our products are lab-tested and meet the highest global standards for food safety, compostability, and environmental impact. <a href="/manufacturing" className="text-green-600 hover:text-green-700 underline">See our ISO certified manufacturing</a> process.
          </p>
        </div>
      </section>

      {/* ═══════════ MISSION SECTION ═══════════ */}
      <section className="bg-[#008060] text-white py-16 px-8 sm:px-16 rounded-md my-24 text-center max-w-4xl mx-auto">
        <span className="inline-block bg-white/20 text-white text-sm font-semibold rounded-full px-4 py-1 mb-3">
          OUR MISSION
        </span>
        <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
        <p className="text-lg max-w-xl mx-auto">
          To establish India as the global leader in sustainable packaging by manufacturing world-class bagasse products that eliminate plastic waste. We&apos;re committed to transforming agricultural waste into premium biodegradable solutions that protect our planet for future generations.
        </p>
        <div className="border-b border-white w-16 mx-auto mt-8"></div>
      </section>

      {/* ═══════════ VISION & CORE VALUES ═══════════ */}
      <section className="mb-24 text-center max-w-5xl mx-auto px-4 sm:px-8">
        <span className="inline-block bg-[#D4F5E1] text-[#007A3E] text-sm font-semibold rounded-full px-4 py-1 mb-3">
          OUR VALUES
        </span>
        <h2 className="text-3xl font-semibold mb-2">Our Vision &amp; Core Values</h2>
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

      {/* ═══════════ GOALS SECTION ═══════════ */}
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
              <p className="text-slate-600">
                {index === 0 ? (
                  <>Over 12 million premium bagasse products delivered globally. <a href="/products/bagasse-products" className="text-green-600 hover:text-green-700 underline">explore our full product range</a></>
                ) : index === 1 ? (
                  <>India's top bagasse products manufacturer by quality and volume. We <a href="/export" className="text-green-600 hover:text-green-700 underline">export to global markets</a>.</>
                ) : (
                  goal.description
                )}
              </p>
            </div>
          ))}
        </div>
      </section>

    
      <BecomePartnerSection />
      
      {/* ═══════════ BLOG LINK SECTION ═══════════ */}
      <section className="text-center py-12 px-4">
        <p className="text-gray-600">
          Learn more about our sustainability journey and initiatives. <a href="/blog" className="text-green-600 hover:text-green-700 underline font-medium">Read our sustainability blog</a>
        </p>
      </section>
    </main>
    </>
  );
}
