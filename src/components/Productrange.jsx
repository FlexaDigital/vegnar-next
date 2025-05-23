import React from "react";
import { Link } from "react-router-dom";

const products = [
  {
    image:
      "https://storage.googleapis.com/a1aa/image/1419ec2b-6836-4bfc-f35c-dc7d9fe0da04.jpg",
    title: "Sugarcane Bagasse Tableware",
    description:
      "These sugarcane waste tableware are strong, durable, lightweight, and microwave safe.",
    alt: "Stack of round bagasse plates on a wooden surface",
    link: "/products/sugarcane-bagasse",
  },
  {
    image:
      "https://storage.googleapis.com/a1aa/image/2f577646-f70c-4ab7-ee48-354a2cd48db5.jpg",
    title: "Rice Husk Products",
    description:
      "Sturdy & strong tableware made with natural rice husks fibers. Reusable and biodegradable.",
    alt: "Stack of round rice husk plates and bowls on a neutral background",
    link: "/products/rice-husk",
  },
  {
    image:
      "https://storage.googleapis.com/a1aa/image/1bb27ec6-8dfd-444b-4be7-044a76ab9414.jpg",
    title: "Wheat Bran Tableware",
    description:
      "100% all-natural biodegradable. Perfect for serving meals, snacks, and takeout.",
    alt: "Stack of wheat bran wooden bowls and plates on a neutral background",
    link: "/products/wheat-bran",
  },
  {
    image:
      "https://storage.googleapis.com/a1aa/image/3aecaf13-f724-4ebe-e7f8-eafbe3588a1d.jpg",
    title: "Bio Carry Bags",
    description:
      "Not a food container but perfect for storing and carrying dry items. 100% compostable.",
    alt: "Biodegradable bio bags in white and brown colors standing on a neutral background",
    link: "/products/bio-carry-bags",
  },
];

const SustainableProductRange = () => {
  return (
    <section className="mt-10">
      <h2 className="text-center font-semibold text-lg md:text-xl mb-8">
        Our Sustainable Product Range
      </h2>
      <div
        aria-label="Sustainable product range categories"
        className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-7xl mx-auto"
      >
        {products.map((product, index) => (
          <Link to={product.link} key={index}>
            <div
              className="bg-white rounded-lg shadow-md p-3 flex flex-col cursor-pointer hover:shadow-lg transition"
              role="button"
              tabIndex="0"
            >
              <img
                alt={product.alt}
                className="rounded-md mb-3 object-cover h-36 w-full"
                height="200"
                src={product.image}
                width="300"
              />
              <div className="flex items-center space-x-1 text-xs text-[#009B77] font-semibold mb-1">
                <i className="fas fa-check"></i>
                <span>{product.title}</span>
              </div>
              <p className="text-xs text-gray-700 mb-2">
                {product.description}
              </p>
              <span
                aria-label={`Explore ${product.title} products`}
                className="text-[#009B77] text-xs font-semibold hover:underline self-start"
              >
                Explore Products →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default SustainableProductRange;
