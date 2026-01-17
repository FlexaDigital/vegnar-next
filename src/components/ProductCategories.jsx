'use client';

import Image from 'next/image';
import Link from 'next/link';

const categories = [
  {
    name: 'Plates',
    description: 'Sustainable bagasse plates designed for everyday meals, parties, and eco-conscious food service.',
    image: '/assets/category-photo/baggase-plates.webp',
    href: '/products/round-plates'
  },
  {
    name: 'Meal Trays',
    description: 'Multi-compartment bagasse meal trays that keep food neatly separated and easy to serve.',
    image: '/assets/category-photo/meal-tray.webp',
    href: '/products/meal-trays'
  },
  {
    name: 'Bowls',
    description: 'Sturdy biodegradable bowls ideal for soups, curries, salads, and hot or cold dishes.',
    image: '/assets/category-photo/bowl.webp',
    href: '/products/bowls'
  },
  {
    name: 'Clamshell',
    description: 'Eco-friendly clamshell containers built for secure takeaway packaging and food delivery.',
    image: '/assets/category-photo/clam-shell.webp',
    href: '/products/clamshells'
  },
  {
    name: 'Containers',
    description: 'Versatile bagasse food containers with lids, perfect for storage, takeaway, and catering use.',
    image: '/assets/category-photo/container.webp',
    href: '/products/takeaway-container'
  },
  {
    name: 'All Bagasse Products',
    description: 'Explore our complete collection of sustainable bagasse tableware for every dining requirement.',
    image: '/assets/category-photo/all-products.webp',
    href: '/products/bagasse-products'
  }
];


const ProductCategories = () => {

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-10">
  <span className="inline-block bg-[#D4F5E1] text-[#007A3E] text-sm font-semibold rounded-full px-4 py-1 mb-3">
    SUSTAINABLE DINING SOLUTIONS
  </span>
  <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">
    Discover Our Eco-Conscious Product Range
  </h2>
  <h3 className="text-lg font-semibold mb-4 text-[#007A3E]">
    Thoughtfully Designed for a Greener Future
  </h3>
  <p className="text-sm text-[#4a4a4a] max-w-4xl mx-auto leading-relaxed">
    Vegnar delivers responsibly crafted tableware made from renewable materials such as bagasse and PLA. 
    Our products are designed to balance strength, safety, and sustainability — making them ideal for 
    modern dining, food service, and eco-driven businesses committed to reducing environmental impact.
  </p>
</div>


      <div className="grid grid-cols-2 md:grid-cols-4 md:grid-rows-2 gap-1 h-[600px] md:h-[400px]">
        <Link href={categories[0].href} className="group relative overflow-hidden rounded-lg">
          <Image
            src={categories[0].image}
            alt={categories[0].name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 bg-black/60 opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="text-center text-white p-4">
              <h3 className="font-bold text-lg mb-2">{categories[0].name}</h3>
              <p className="text-sm">{categories[0].description}</p>
            </div>
          </div>
          <div className="absolute bottom-2 left-2 right-2 md:hidden">
            <div className="flex items-center justify-between bg-black/50 px-2 py-1 rounded">
              <h3 className="font-bold text-white text-sm">{categories[0].name}</h3>
              <span className="text-white">→</span>
            </div>
          </div>
        </Link>
        
        <Link href={categories[1].href} className="group relative overflow-hidden rounded-lg row-span-2 md:row-span-2">
          <Image
            src={categories[1].image}
            alt={categories[1].name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 bg-black/60 opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="text-center text-white p-4">
              <h3 className="font-bold text-lg mb-2">{categories[1].name}</h3>
              <p className="text-sm">{categories[1].description}</p>
            </div>
          </div>
          <div className="absolute bottom-2 left-2 right-2 md:hidden">
            <div className="flex items-center justify-between bg-black/50 px-2 py-1 rounded">
              <h3 className="font-bold text-white text-sm">{categories[1].name}</h3>
              <span className="text-white">→</span>
            </div>
          </div>
        </Link>
        
        <Link href={categories[2].href} className="group relative overflow-hidden rounded-lg">
          <Image
            src={categories[2].image}
            alt={categories[2].name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 bg-black/60 opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="text-center text-white p-4">
              <h3 className="font-bold text-lg mb-2">{categories[2].name}</h3>
              <p className="text-sm">{categories[2].description}</p>
            </div>
          </div>
          <div className="absolute bottom-2 left-2 right-2 md:hidden">
            <div className="flex items-center justify-between bg-black/50 px-2 py-1 rounded">
              <h3 className="font-bold text-white text-sm">{categories[2].name}</h3>
              <span className="text-white">→</span>
            </div>
          </div>
        </Link>
        
        <Link href={categories[3].href} className="group relative overflow-hidden rounded-lg">
          <Image
            src={categories[3].image}
            alt={categories[3].name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 bg-black/60 opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="text-center text-white p-4">
              <h3 className="font-bold text-lg mb-2">{categories[3].name}</h3>
              <p className="text-sm">{categories[3].description}</p>
            </div>
          </div>
          <div className="absolute bottom-2 left-2 right-2 md:hidden">
            <div className="flex items-center justify-between bg-black/50 px-2 py-1 rounded">
              <h3 className="font-bold text-white text-sm">{categories[3].name}</h3>
              <span className="text-white">→</span>
            </div>
          </div>
        </Link>
        
        <Link href={categories[4].href} className="group relative overflow-hidden rounded-lg">
          <Image
            src={categories[4].image}
            alt={categories[4].name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 bg-black/60 opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="text-center text-white p-4">
              <h3 className="font-bold text-lg mb-2">{categories[4].name}</h3>
              <p className="text-sm">{categories[4].description}</p>
            </div>
          </div>
          <div className="absolute bottom-2 left-2 right-2 md:hidden">
            <div className="flex items-center justify-between bg-black/50 px-2 py-1 rounded">
              <h3 className="font-bold text-white text-sm">{categories[4].name}</h3>
              <span className="text-white">→</span>
            </div>
          </div>
        </Link>
        
        <Link href={categories[5].href} className="group relative overflow-hidden rounded-lg col-span-2 md:col-span-2">
          <Image
            src={categories[5].image}
            alt={categories[5].name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 bg-black/60 opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="text-center text-white p-4">
              <h3 className="font-bold text-xl mb-2">{categories[5].name}</h3>
              <p className="text-sm">{categories[5].description}</p>
            </div>
          </div>
          <div className="absolute bottom-2 left-2 right-2 md:hidden">
            <div className="flex items-center justify-between bg-black/50 px-2 py-1 rounded">
              <h3 className="font-bold text-white text-sm">{categories[5].name}</h3>
              <span className="text-white">→</span>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default ProductCategories;