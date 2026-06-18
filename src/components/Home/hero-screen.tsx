"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaLeaf, FaCheckCircle } from "react-icons/fa";

// Desktop images
import HeroImage1 from "../../../public/assets/img/Bowl bannar image.png";
import HeroImage2 from "../../../public/assets/img/Round plate banner image.png";
import HeroImage3 from "../../../public/assets/img/clamshell banner image.png";
import HeroImage4 from "../../../public/assets/img/cup banner image.png";
import HeroImage5 from "../../../public/assets/img/meal try banner image.png";
import HeroImage6 from "../../../public/assets/img/takeaway banner image.png";

// Mobile images
import HeroMobile1 from "../../../public/assets/img/Bowl bannar image mobile.png";
import HeroMobile2 from "../../../public/assets/img/Round plate banner image mobile.png";
import HeroMobile3 from "../../../public/assets/img/clamshell banner image mobile.png";
import HeroMobile4 from "../../../public/assets/img/cup banner image mobile.png";
import HeroMobile5 from "../../../public/assets/img/meal try banner image mobile.png";
import HeroMobile6 from "../../../public/assets/img/takeaway banner image mobile.png";

const slides = [
  {
    id: 1,
    desktopImage: HeroImage5,
    mobileImage: HeroMobile5,
    alt: "Sugarcane bagasse meal trays for food service and catering",
    productRoute: "/products/meal-trays",
    buttonLabel: "Explore Meal Trays",
    title: "Versatile Meal Trays",
    highlight: "Compartment Ready",
    description:
      "Multi-compartment bagasse meal trays for canteens, airlines & food courts. Oil & water resistant.",
    showBadges: true,
  },
  {
    id: 2,
    desktopImage: HeroImage2,
    mobileImage: HeroMobile2,
    alt: "Eco-friendly round plates made from sugarcane bagasse",
    productRoute: "/products/round-plates",
    buttonLabel: "Explore Round Plates",
    title: "Sustainable Round Plates",
    highlight: "100% Compostable",
    description:
      "Natural sugarcane bagasse round plates. Plastic-free, microwave-safe & ideal for events and catering.",
    showBadges: false,
  },
  {
    id: 3,
    desktopImage: HeroImage3,
    mobileImage: HeroMobile3,
    alt: "Bagasse clamshell food containers - eco packaging",
    productRoute: "/products/clamshells",
    buttonLabel: "Explore Clamshell Boxes",
    title: "Compostable Clamshell",
    highlight: "Containers for Takeaway",
    description:
      "Sturdy bagasse clamshell boxes for meals, burgers & snacks. Leak-resistant & fully biodegradable.",
    showBadges: false,
  },
  {
    id: 4,
    desktopImage: HeroImage4,
    mobileImage: HeroMobile4,
    alt: "Eco-friendly disposable cups made from sugarcane bagasse",
    productRoute: "/products/sipper-lid",
    buttonLabel: "Explore Eco Cups",
    title: "Green Eco Cups",
    highlight: "Plastic-Free Sipping",
    description:
      "Compostable bagasse cups for hot & cold beverages. Durable, safe & sustainably sourced.",
    showBadges: false,
  },
  {
    id: 5,
    desktopImage: HeroImage1,
    mobileImage: HeroMobile1,
    alt: "Eco-friendly sugarcane bagasse bowls - biodegradable tableware",
    productRoute: "/products/bowls",
    buttonLabel: "Explore Bagasse Bowls",
    title: "Biodegradable Bagasse Bowls",
    highlight: "For Every Occasion",
    description:
      "Premium sugarcane bagasse bowls — compostable, sturdy & planet-friendly. Perfect for soups, salads & more.",
    showBadges: false,
  },
  {
    id: 6,
    desktopImage: HeroImage6,
    mobileImage: HeroMobile6,
    alt: "Eco-friendly takeaway packaging solutions from Vegnar Greens",
    productRoute: "/products/takeaway-container",
    buttonLabel: "Explore Takeaway Packaging",
    title: "Complete Takeaway Packaging",
    highlight: "Solutions",
    description:
      "End-to-end sustainable takeaway packaging — bowls, boxes, trays & bags. All compostable, all green.",
    showBadges: false,
  },
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null); // Reset
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    } else if (isRightSwipe) {
      setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    }
  };

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentIndex((prev) => (prev + 1) % slides.length),
      7000,
    );
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")
        setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
      else if (e.key === "ArrowRight")
        setCurrentIndex((prev) => (prev + 1) % slides.length);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: "100svh", paddingTop: "64px" }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background image — mobile: mobile image, desktop: desktop image */}
          <Image
            src={isMobile ? slide.mobileImage : slide.desktopImage}
            alt={slide.alt}
            fill
            priority={index === 0}
            sizes="(max-width: 640px) 100vw, 100vw"
            className="object-cover object-center w-full h-full"
          />

          {/* Gradient overlay — left-to-right on both mobile & desktop
              so text on left is readable and image shows through on right */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10" />

          {/* ── Text content — same layout for mobile & desktop, left-aligned ── */}
          <div className="absolute inset-0 z-10 flex flex-col justify-center px-5 sm:px-10 lg:px-20">
            <div className="max-w-[90%] sm:max-w-md md:max-w-lg">

              {/* Title */}
              <h1
                className="text-[1.6rem] sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight text-white"
                style={{ textShadow: "1px 2px 10px rgba(0,0,0,0.7)" }}
              >
                {slide.title}
                <br />
                <span className="text-white">{slide.highlight}</span>
              </h1>

              {/* Description */}
              <p
                className="mt-2 sm:mt-3 text-sm sm:text-base md:text-lg font-medium text-white leading-relaxed"
                style={{ textShadow: "1px 1px 8px rgba(0,0,0,0.7)" }}
              >
                {slide.description}
              </p>

              {/* Buttons — stacked on mobile like screenshot, side-by-side on desktop */}
              <div className="mt-4 sm:mt-5 flex flex-col sm:flex-row gap-2 sm:gap-3">
                <Link href={slide.productRoute}>
                  <button className="w-full sm:w-auto bg-vegnar-green hover:bg-green-800 transition-all duration-300 text-white font-semibold rounded-full px-6 py-3 text-sm sm:text-base flex items-center justify-center shadow-lg">
                    {slide.buttonLabel}
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
                </Link>

                <Link href="/request-samples">
                  <button className="w-full sm:w-auto border border-white/70 hover:border-white hover:bg-white/10 transition-all duration-300 text-white font-semibold rounded-full px-6 py-3 text-sm sm:text-base text-center">
                    Get a sample
                  </button>
                </Link>
              </div>

              {/* Badges — visible on both mobile & desktop (first slide only) */}
              {slide.showBadges && (
                <>
                  <div className="mt-4 sm:mt-5 flex flex-wrap items-center gap-3 sm:gap-4">
                    {/* 630+ tons badge */}
                    <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-lg px-3 sm:px-4 py-2">
                      <FaLeaf className="text-green-400 text-base mr-2" />
                      <div>
                        <p className="font-bold text-white text-sm sm:text-base leading-none">
                          630+ tons
                        </p>
                        <p className="text-white text-xs font-semibold mt-0.5">
                          of plastic replaced
                        </p>
                      </div>
                    </div>

                    {/* Certifications */}
                    <div className="flex flex-wrap items-center gap-2 text-white text-xs font-medium">
                      <span className="text-white text-xs sm:text-sm">Certified by:</span>
                      {["OKComposite", "US FDA", "SGS Tested", "CE"].map((cert) => (
                        <span
                          key={cert}
                          className="bg-white text-gray-900 font-semibold text-xs rounded-md px-2 py-0.5"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Trust badge */}
                  <div className="mt-2 sm:mt-3 inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-3 sm:px-4 py-1.5 max-w-max text-white text-xs sm:text-sm font-semibold">
                    <FaCheckCircle className="text-green-400 mr-1.5" />
                    Trusted by eco-conscious businesses worldwide
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* ── Slide Dots ── */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 z-30">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`rounded-full transition-all duration-300 ${
              currentIndex === idx
                ? "bg-vegnar-green w-5 h-2.5 sm:w-6 sm:h-3"
                : "bg-white/60 hover:bg-white/90 w-2.5 h-2.5 sm:w-3 sm:h-3"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* ── Arrow Navigation ── */}
      <button
        onClick={() =>
          setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)
        }
        className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white rounded-full p-2.5 sm:p-3 transition-all duration-300 items-center justify-center"
        aria-label="Previous slide"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={() => setCurrentIndex((prev) => (prev + 1) % slides.length)}
        className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white rounded-full p-2.5 sm:p-3 transition-all duration-300 items-center justify-center"
        aria-label="Next slide"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default HeroSection;
