"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaLeaf, FaCheckCircle } from "react-icons/fa";
import HeroImage1 from "../../../public/assets/img/Hero-screen.jpg";
import HeroImage2 from "../../../public/assets/img/hero-2.jpg";
import HeroImage3 from "../../../public/assets/img/hero-3.jpg";

const slides = [
  {
    id: 1,
    image: HeroImage1,
    alt: "Eco-friendly tableware on wooden table",
    title: (
      <>
        Nature-Friendly <br />
        Tableware for a <span className="font-bold">Better</span> Tomorrow
      </>
    ),
    description:
      "100% Biodegradable. Made from Sugarcane Waste. Compostable. Stylish.",
  },
  {
    id: 2,
    image: HeroImage2,
    alt: "Sustainable packaging slide",
    title: (
      <>
        Sustainable <br />
        Packaging for a <span className="font-bold">Greener</span> Future
      </>
    ),
    description:
      "Eco-friendly materials. Durable and compostable. Designed for sustainability.",
  },
  {
    id: 3,
    image: HeroImage3,
    alt: "Innovative biodegradable tableware",
    title: (
      <>
        Innovative <br />
        Designs for a <span className="font-bold">Cleaner</span> Planet
      </>
    ),
    description:
      "Stylish, biodegradable tableware. Made with care for nature’s future.",
  },
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentIndex((prev) => (prev + 1) % slides.length),
      7000
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen pt-20 overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/40 z-10" />
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            priority={index === 0}
            className="object-cover object-center w-full h-full"
          />
          <div className="relative z-20 max-w-7xl mx-auto px-6 h-screen flex flex-col justify-center text-white">

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight max-w-3xl">
              {slide.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg sm:text-xl font-medium">
              {slide.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <a href="#ProductCatagories">
                <button className="bg-vegnar-green hover:bg-green-800 transition text-white font-semibold rounded-full px-6 py-3 text-sm sm:text-base flex items-center">
                  Explore Products
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
                <button className="border border-white/60 hover:border-white transition text-white font-semibold rounded-full px-6 py-3 text-sm sm:text-base">
                  Get a Sample
                </button>
              </Link>
            </div>

            {index === 0 && (
              <>
                <div className="mt-6 flex flex-wrap items-center gap-6 max-w-4xl">
                  <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-lg px-5 py-3 max-w-xs">
                    <FaLeaf className="text-green-400 text-lg mr-3" />
                    <div>
                      <p className="font-bold text-white text-lg">2450+ tons</p>
                      <p className="text-white text-xs font-semibold -mt-1">
                        of plastic replaced
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-white text-sm font-medium flex-wrap">
                    <span>Certified by:</span>
                    {["OKComposite", "US FDA", "SGS Tested", "CE"].map((cert) => (
                      <span
                        key={cert}
                        className="bg-white text-gray-900 font-semibold text-xs rounded-md px-3 py-1"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-4 inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-5 py-2 max-w-max text-white text-sm font-semibold">
                  <FaCheckCircle className="text-green-400 mr-2" />
                  Trusted by eco-conscious businesses worldwide
                </div>
              </>
            )}
          </div>
        </div>
      ))}

      {/* Slide Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-30">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-3 h-3 rounded-full transition-colors ${
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
