"use client";

import React from "react";
import { FaFilePdf, FaDownload } from "react-icons/fa";
import { JSX } from "react";

interface Brochure {
  icon: JSX.Element;
  title: string;
  description: string;
  downloadLink?: string;
}

const brochures: Brochure[] = [
  {
    icon: <FaFilePdf className="text-lg text-[#2B7A5B]" />,
    title: "Sugarcane Bagasse Tableware",
    description: "Explore our range of sugarcane bagasse tableware.",
    downloadLink: "/assets/downloads/VEGNAR-GREEN-BAGASSE-TABLEWARE.pdf",
  },
  {
    icon: <FaFilePdf className="text-lg text-[#2B7A5B]" />,
    title: "Areca Palm Tableware",
    description: "Discover our areca palm tableware options.",
    downloadLink: "/assets/downloads/Vegnar-Bio-Bags-Export.pdf",
  },
  {
    icon: <FaFilePdf className="text-lg text-[#2B7A5B]" />,
    title: "Bio Bags",
    description: "Find specifications of all types of bio bags.",
    downloadLink: "/assets/downloads/Vegnar-Bio-Bags-Export.pdf",
  },
];

const BrochureSection: React.FC = () => {
  return (
   <section
  className="relative min-h-screen flex items-center justify-center p-6 bg-cover bg-center bg-no-repeat bg-fixed"
  style={{
    backgroundImage: "url('/assets/img/catalog-bg.jpg')",
  }}
>
  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>

  <div className="relative max-w-7xl w-full z-10">
    {/* Section Heading */}
    <div className="text-center mb-10 px-4">
      <span className="inline-block bg-[#C6F1D6] text-[#2B7A5B] text-sm font-semibold rounded-full py-1 px-3 mb-3 drop-shadow-md">
        RESOURCES
      </span>
      <h2 className="text-white font-bold text-xl sm:text-2xl md:text-3xl mb-2 drop-shadow-lg">
        Download Our Product Brochures
      </h2>
      <p className="text-white text-xs sm:text-sm max-w-md mx-auto drop-shadow-md">
        Explore our complete product range and detailed specifications in our downloadable catalogs.
      </p>
    </div>

    {/* Brochure Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 max-w-7xl mx-auto">
      {brochures.map((item, index) => (
        <div
          key={index}
          className="bg-white/60 backdrop-blur-md rounded-2xl p-6 flex flex-col items-center text-center shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl"
        >
          <div className="bg-[#C6F1D6] text-[#2B7A5B] rounded-full w-12 h-12 flex items-center justify-center mb-4 shadow-md">
            {item.icon}
          </div>
          <h3 className="font-bold text-[#0B5E40] text-base sm:text-lg mb-2 drop-shadow-md">
            {item.title}
          </h3>
          <p className="text-[#1F4738] text-sm sm:text-base mb-4 drop-shadow-sm">
            {item.description}
          </p>
          {item.downloadLink ? (
            <a href={item.downloadLink} download>
              <button className="bg-[#0B5E40] text-white text-sm sm:text-base rounded-full py-2 px-5 flex items-center gap-2 hover:bg-[#09472f] transition drop-shadow-md">
                <FaDownload /> Download PDF
              </button>
            </a>
          ) : (
            <button
              disabled
              className="bg-gray-300 text-gray-600 text-sm sm:text-base rounded-full py-2 px-5 flex items-center gap-2 cursor-not-allowed"
            >
              <FaDownload /> Coming Soon
            </button>
          )}
        </div>
      ))}
    </div>
  </div>
</section>

  );
};

export default BrochureSection;
