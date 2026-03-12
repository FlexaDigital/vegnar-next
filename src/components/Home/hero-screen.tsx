"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaLeaf, FaCheckCircle } from "react-icons/fa";
import HeroImage1 from "../../../public/assets/img/Newbanner3.webp";
import HeroImage2 from "../../../public/assets/img/Newbanner1.webp";
import HeroImage3 from "../../../public/assets/img/Newbanner2.webp";

const slides = [
  {
    id: 1,
    image: HeroImage2,
    alt: "Sugarcane bagasse plates and bowls eco-friendly tableware",
    title: (
      <>
        Biodegradable <br />
        <span className="font-bold">Sugarcane Bagasse</span> Tableware
      </>
    ),
    description:
      "Premium bagasse plates, bowls & compartment trays. Plastic-free, compostable & planet-friendly.",
  },
  {
    id: 2,
    image: HeroImage1,
    alt: "Eco-friendly compostable packaging bags and containers",
    title: (
      <>
        Compostable <br />
        <span className="font-bold">Eco-Friendly</span> Packaging Solutions
      </>
    ),
    description:
      "Bio bags, carry bags, courier & garbage bags. Sustainable packaging made for a greener future.",
  },
  {
    id: 3,
    image: HeroImage3,
    alt: "Areca palm leaf plates and sustainable disposable tableware",
    title: (
      <>
        Sustainable <br />
        <span className="font-bold">Disposable</span> Tableware
      </>
    ),
    description:
      "Eco-friendly disposable plates, bowls & food containers made from natural plant fibers.",
  },
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentIndex((prev) => (prev + 1) % slides.length),
      7000,
    );
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
      } else if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative h-screen sm:h-screen pt-16 sm:pt-20 overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/30 z-10" />
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            priority={index === 0}
            className="object-cover object-center sm:object-center object-top w-full h-full"
          />
          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 h-full flex flex-col justify-center sm:justify-center justify-end pb-20 sm:pb-0 text-white">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight max-w-3xl">
              {slide.title}
            </h1>
            <p className="mt-3 sm:mt-4 max-w-2xl text-base sm:text-lg md:text-xl font-medium">
              {slide.description}
            </p>
            <div className="mt-4 sm:mt-6 flex flex-wrap gap-3 sm:gap-4">
              <a href="/products/bagasse-products">
                <button className="bg-vegnar-green hover:bg-green-800 transition text-white font-semibold rounded-full px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base flex items-center min-h-[44px] min-w-[44px]">
                  Explore our bagasse products 
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </button>
              </a>
              <Link href="/contact">
                <button className="border border-white/60 hover:border-white transition text-white font-semibold rounded-full px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base min-h-[44px] min-w-[44px]">
               Get a free sample
                </button>
              </Link>
            </div>

            {index === 0 && (
              <>
                <div className="mt-4 sm:mt-6 flex flex-wrap items-center gap-3 sm:gap-6 max-w-4xl">
                  <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-lg px-3 sm:px-5 py-2 sm:py-3 max-w-xs">
                    <FaLeaf className="text-green-400 text-lg mr-3" />
                    <div>
                      <p className="font-bold text-white text-base sm:text-lg">
                        630+ tons
                      </p>
                      <p className="text-white text-xs font-semibold -mt-1">
                        of plastic replaced
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 text-white text-xs sm:text-sm font-medium flex-wrap">
                    <span>Certified by:</span>
                    {["OKComposite", "US FDA", "SGS Tested", "CE"].map(
                      (cert) => (
                        <span
                          key={cert}
                          className="bg-white text-gray-900 font-semibold text-xs rounded-md px-2 sm:px-3 py-1"
                        >
                          {cert}
                        </span>
                      ),
                    )}
                  </div>
                </div>
                <div className="mt-3 sm:mt-4 inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-3 sm:px-5 py-2 max-w-max text-white text-xs sm:text-sm font-semibold">
                  <FaCheckCircle className="text-green-400 mr-2" />
                  Trusted by eco-conscious businesses worldwide
                </div>
              </>
            )}
          </div>
        </div>
      ))}

      {/* Slide Dots */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors p-2 ${
              currentIndex === idx
                ? "bg-vegnar-green"
                : "bg-white bg-opacity-50"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
