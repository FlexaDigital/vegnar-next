'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, useAnimation } from 'framer-motion';

const features = [
  {
    icon: '/assets/icons/microwave.svg',
    title: 'Microwave Safe',
    description: 'Heat resistant up to 220°F (105°C)'
  },
  {
    icon: '/assets/icons/leak-proof.svg',
    title: 'Leak Proof',
    description: 'Suitable for hot, cold, and oily foods, Upto (90 mins)'
  },
  {
    icon: '/assets/icons/freezer.svg',
    title: 'Freezer Safe',
    description: 'Store leftovers with confidence down to -4°F (-20°C)'
  },
  {
    icon: '/assets/icons/compostable.svg',
    title: 'Compostable',
    description: 'Breaks down naturally in 90 days'
  },
  {
    icon: '/assets/icons/pfas-free.svg',
    title: 'PFAS Free',
    description: 'Made without harmful forever chemicals for a safer product and planet'
  },
  {
    icon: '/assets/icons/lightweight.svg',
    title: 'Lightweight',
    description: 'Easy to handle and transport'
  },
  {
    icon: '/assets/icons/durable.svg',
    title: 'Durable',
    description: 'Strong and resistant to breaking or bending'
  },
  {
    icon: '/assets/icons/natural.svg',
    title: 'Natural Feel',
    description: 'Offers a unique and pleasant tactile experience'
  }
];

const FeatureCard = ({ feature, index }: { feature: typeof features[0], index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: index * 0.1 }
      });
    }
  }, [isInView, controls, index]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div className="flex items-start space-x-4">
        <div className="bg-green-50 p-3 rounded-lg">
          <Image
            src={feature.icon}
            alt={feature.title}
            width={24}
            height={24}
            className="w-6 h-6"
          />
        </div>
        <div>
          <h3 className="font-semibold text-lg text-green-900 mb-2">{feature.title}</h3>
          <p className="text-gray-600 text-sm">{feature.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

const BagasseFeatures = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 }
      });
    }
  }, [isInView, controls]);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          className="text-center mb-12"
        >
          <span className="inline-block bg-green-100 text-green-800 text-sm font-semibold px-4 py-1 rounded-full mb-4">
            FEATURED
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Bagasse Tableware
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Our signature line of tableware made from sugarcane waste. Strong, stylish, and completely compostable after use.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          className="mt-12 text-center"
        >
          <a
            href="/products/bagasse-products"
            className="inline-flex items-center bg-green-700 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-800 transition duration-300"
          >
            Explore Range
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default BagasseFeatures; 