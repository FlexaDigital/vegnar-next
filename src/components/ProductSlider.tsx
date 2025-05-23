'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaCheckCircle } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const products = [
  {
    title: 'Bagasse Tableware',
    description: 'Our signature line of tableware made from sugarcane waste. Strong, stylish, and completely compostable after use.',
    image: '/assets/img/bagasse.webp',
    link: '/products/bagasse-products',
    features: [
      { title: 'Microwave Safe', desc: 'Heat resistant up to 220°F (105°C)' },
      { title: 'Leak Proof', desc: 'Suitable for hot, cold, and oily foods, Upto (90 mins)' },
      { title: 'Freezer Safe', desc: 'Store leftovers with confidence down to -4°F (-20°C)' },
      { title: 'Compostable', desc: 'Breaks down naturally in 90 days' },
      { title: 'PFAS Free', desc: 'Made without harmful forever chemicals for a safer product and planet.' },
      { title: 'Lightweight', desc: 'Easy to handle and transport' },
      { title: 'Durable', desc: 'Strong and resistant to breaking or bending' },
      { title: 'Natural Feel', desc: 'Offers a unique and pleasant tactile experience' },
    ],
  },
  {
    title: 'Bio Bags',
    description: 'Plant-based alternatives to plastic bags that decompose naturally without leaving microplastics behind.',
    image: 'https://storage.googleapis.com/a1aa/image/da09a7ff-7b63-4262-1026-b048f781309f.jpg',
    link: '/products/bio-bags',
    features: [
      { title: 'Multiple Sizes', desc: 'From small produce to large garbage' },
      { title: 'Tear Resistant', desc: 'Strong enough for everyday use' },
      { title: 'Home Compostable', desc: 'Breaks down in home compost bins' },
      { title: 'Plant-Based', desc: 'Made from renewable resources' },
      { title: 'Non-Toxic', desc: 'Safe for handling various items' },
      { title: 'Breathable', desc: 'Helps keep produce fresher for longer' },
      { title: 'Odor Control', desc: 'Helps to contain unpleasant smells' },
      { title: 'Sustainable Choice', desc: 'Reduces reliance on fossil fuels' },
    ],
  },
];

const ProductSlider = () => {
  return (
    <section className="py-8 md:py-16 bg-white">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        className="product-slider"
      >
        {products.map((product, index) => (
          <SwiperSlide key={index}>
            <div className="max-w-7xl mx-auto px-4 md:px-6">
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                {/* Image Container */}
                <div className="w-full md:w-1/2 md:flex-1">
                  <div className="relative w-full aspect-square md:h-[500px]">
                    <Image
                      alt={`${product.title} product image`}
                      className="rounded-lg object-cover"
                      src={product.image}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={index === 0}
                    />
                  </div>
                </div>

                {/* Content Container */}
                <div className="w-full md:w-1/2 md:flex-1 px-4 md:px-0">
                  <span className="inline-block bg-[#D4F5E1] text-[#007A3E] text-sm font-semibold rounded-full px-4 py-1 mb-3">
                    FEATURED
                  </span>
                  <h2 className="text-2xl font-bold text-green-900 mb-4">{product.title}</h2>
                  <p className="text-gray-700 mb-6">{product.description}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-8">
                    {product.features.map((feature, idx) => (
                      <div key={idx} className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-green-700 font-semibold">
                          <FaCheckCircle className="text-green-700 flex-shrink-0" />
                          <span>{feature.title}</span>
                        </div>
                        <p className="text-gray-500 text-sm">{feature.desc}</p>
                      </div>
                    ))}
                  </div>

                  <Link href={product.link}>
                    <button className="w-full md:w-auto bg-green-700 text-white px-6 py-3 rounded-full font-medium hover:bg-green-800 transition">
                      Explore Range
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ProductSlider; 