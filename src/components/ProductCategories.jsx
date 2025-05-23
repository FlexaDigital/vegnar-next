'use client';

import Image from 'next/image';
import Link from 'next/link';

const productCategories = [
  {
    image: '/assets/img/bagasse.webp',
    alt: 'Bagasse Tableware',
    title: 'Sugarcane Bagasse Tableware',
    applications: [
      'Restaurants and cafes',
      'Catering events',
      'Parties and gatherings',
    ],
    link: '/products/sugarcane-bagasse',
  },
  {
    image: '/assets/img/ricehusk.jfif',
    alt: 'Areca Palm Leaf Tableware',
    title: 'Areca Palm Leaf Tableware',
    applications: ['Outdoor events', 'Eco-friendly dining', 'BBQs and picnics'],
    link: null,
  },
  {
    image: '/assets/img/3.jfif',
    alt: 'Compostable Cutlery',
    title: 'Compostable Cutlery',
    applications: [
      'Food trucks and takeaways',
      'Office lunches',
      'Sustainable events',
    ],
    link: null,
  },
  {
    image: '/assets/img/bio-bags.jfif',
    alt: 'Bio Carry Bags',
    title: 'Bio Carry Bags',
    applications: [
      'Grocery shopping',
      'Carrying dry goods',
      'Retail packaging (non-food)',
    ],
    link: '/products/bio-carry-bags',
  },
];

const ProductCategories = () => {
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {productCategories.map((product, index) => (
          <article key={index} className="bg-white rounded-lg p-5">
            <div className="rounded-lg mb-4 w-full h-[160px] relative">
              <Image
                src={product.image}
                alt={product.alt}
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
            </div>
            <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
            <ul className="text-sm text-[#4a4a4a] space-y-1 mb-4">
              {product.applications.map((application, i) => (
                <li key={i} className="flex items-center gap-2">
                  <i className="fas fa-check text-[#004d40]"></i>
                  {application}
                </li>
              ))}
            </ul>
            {product.link && (
              <Link
                href={product.link}
                className="text-[#004d40] text-sm font-medium inline-flex items-center hover:underline"
              >
                View Products
                <i className="fas fa-arrow-right ml-1"></i>
              </Link>
            )}
          </article>
        ))}
      </div>
    </section>
    
  );
};

export default ProductCategories;
