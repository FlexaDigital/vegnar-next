'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { useState, useEffect } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';

const categories = [
  'Bowls',
  'Clamshells', 
  'Meal Trays',
  'Round Plates',
  'Sipper Lid',
  'Takeaway Container',
  'Tray'
];

const ProductCategories = () => {
  const [categoryProducts, setCategoryProducts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const categoriesResponse = await fetch('https://cms.vegnar.com/wp-json/wp/v2/product_category');
        const allCategories = categoriesResponse.ok ? await categoriesResponse.json() : [];
        
        const products = {};
        for (const category of categories) {
          const categoryData = allCategories.find(cat => cat.name === category);
          if (categoryData) {
            const response = await fetch(`https://cms.vegnar.com/wp-json/wp/v2/products?product_category=${categoryData.id}&_embed`);
            if (response.ok) {
              const data = await response.json();
              products[category] = data.slice(0, 3).map(product => ({
                name: product.title?.rendered?.replace(/&amp;/g, '&').replace(/&#8211;/g, '–').replace(/&#8217;/g, "'") || 'Untitled',
                description: product.excerpt?.rendered?.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&#8211;/g, '–') || '',
                image: product._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/assets/img/placeholder.jpg'
              }));
            } else {
              products[category] = [];
            }
          } else {
            products[category] = [];
          }
        }
        setCategoryProducts(products);
      } catch (error) {
        console.error('Error fetching category products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, []);

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <span className="inline-block bg-[#D4F5E1] text-[#007A3E] text-sm font-semibold rounded-full px-4 py-1 mb-3">
            PRODUCTS
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">
            Product Categories
          </h2>
          <p className="text-sm text-[#4a4a4a]">
            Explore our complete range of sustainable alternatives.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="bg-white rounded-lg p-5 shadow-md animate-pulse">
              <div className="h-6 bg-gray-200 rounded mb-4 mx-auto w-3/4"></div>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                    <div className="w-12 h-12 bg-gray-200 rounded flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded mb-1"></div>
                      <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="h-8 bg-gray-200 rounded mt-4"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-10">
        <span className="inline-block bg-[#D4F5E1] text-[#007A3E] text-sm font-semibold rounded-full px-4 py-1 mb-3">
          PRODUCTS
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">
          Product Categories
        </h2>
        <p className="text-sm text-[#4a4a4a]">
          Explore our complete range of sustainable alternatives.
        </p>
      </div>

      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 }
        }}
        navigation
        autoplay={{
          delay: 4000,
          disableOnInteraction: false
        }}
        className="category-slider"
      >
        {categories.map((category, index) => (
          <SwiperSlide key={index}>
            <article className="bg-white rounded-lg p-5 shadow-md">
              <h3 className="font-semibold text-lg mb-4 text-center">{category}</h3>
              
              {categoryProducts[category]?.length > 0 ? (
                <div className="space-y-3">
                  {categoryProducts[category].map((product, i) => (
                    <div key={i} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                      <div className="w-12 h-12 relative flex-shrink-0">
                        <Image
                          src={product.image || '/assets/img/placeholder.jpg'}
                          alt={product.name}
                          fill
                          className="object-cover rounded"
                          sizes="48px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{product.name}</p>
                        <p className="text-xs text-gray-500 truncate">{product.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                    <i className="fas fa-box text-gray-400 text-xl"></i>
                  </div>
                  <p className="text-sm text-gray-500">No products available</p>
                </div>
              )}
              
              <Link
                href={`/products/${category.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-[#004d40] text-sm font-medium inline-flex items-center hover:underline mt-4 w-full justify-center"
              >
                View All {category}
                <i className="fas fa-arrow-right ml-1"></i>
              </Link>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .category-slider .swiper-button-next,
        .category-slider .swiper-button-prev {
          color: #004d40;
        }
        .category-slider .swiper-button-next:after,
        .category-slider .swiper-button-prev:after {
          font-size: 20px;
        }
      `}</style>
    </section>
  );
};

export default ProductCategories;