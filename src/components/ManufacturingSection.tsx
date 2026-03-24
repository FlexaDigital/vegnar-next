"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaIndustry,
  FaLeaf,
  FaCogs,
  FaCertificate,
  FaRecycle,
  FaShieldAlt,
  FaGlobeAsia,
  FaWater,
} from "react-icons/fa";
import { GiFactory, GiWheat, GiCheckMark } from "react-icons/gi";

const ManufacturingSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const viewportCenter = window.scrollY + window.innerHeight / 2;
      let closestIndex = 0;
      let closestDistance = Infinity;

      sectionRefs.current.forEach((section, index) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          const sectionCenter = window.scrollY + rect.top + rect.height / 2;
          const distance = Math.abs(viewportCenter - sectionCenter);

          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        }
      });

      setActiveIndex(closestIndex);

      const activeSection = sectionRefs.current[closestIndex];
      if (activeSection) {
        const rect = activeSection.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionHeight = rect.height;
        const viewportMiddle = window.innerHeight / 2;

        // Calculate progress: 0 when section enters, 1 when section exits
        const progress = Math.max(
          0,
          Math.min(1, (viewportMiddle - sectionTop) / sectionHeight),
        );
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 to-green-100 py-20 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block bg-green-700 text-white text-sm font-semibold rounded-full px-4 py-1 mb-4">
            MANUFACTURING EXCELLENCE
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
            Sugarcane Bagasse Manufacturer in India
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Vegnar Green is a leading{" "}
            <Link href="/products/bagasse-products" className="text-green-700 font-semibold transition-all">
              sugarcane bagasse manufacturer in India
            </Link>,
            producing <Link href="/products/bagasse-products" className="text-green-700 font-semibold transition-all">
              eco-friendly biodegradable tableware
            </Link> for domestic and
            international{" "}
            <Link href="/export" className="text-green-700 font-semibold transition-all">
              export markets
            </Link>. Get instant{" "}
            <Link href="/quote" className="text-green-700 font-semibold transition-all">
              bulk pricing and specifications
            </Link>{" "}
            for our premium products.
          </p>
        </div>
      </section>

      {/* Manufacturing Overview */}
      <section className="py-16 px-4 sm:px-6 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-green-100 text-green-800 text-sm font-semibold rounded-full px-4 py-1 mb-4">
                OUR FACILITY
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                In-House Sugarcane Bagasse Manufacturing Facility in India
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Our ISO-certified manufacturing facility spans over 50,000 sq.
                ft., equipped with advanced machinery and automated production
                lines. Located strategically for raw material access and{" "}
                <Link href="/export" className="text-green-700 font-semibold transition-all">
                  export logistics
                </Link>, we maintain the highest standards of quality and
                sustainability. Our{" "}
                <Link href="/products" className="text-green-700 font-semibold transition-all">
                  comprehensive product range
                </Link>{" "}
                includes plates, bowls, containers, and custom packaging.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <FaIndustry className="text-green-700 text-3xl mb-2" />
                  <p className="font-bold text-2xl text-green-900">50,000+</p>
                  <p className="text-sm text-gray-600">Sq. Ft. Facility</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <FaCogs className="text-green-700 text-3xl mb-2" />
                  <p className="font-bold text-2xl text-green-900">5M+</p>
                  <p className="text-sm text-gray-600">Units/Month Capacity</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <FaGlobeAsia className="text-green-700 text-3xl mb-2" />
                  <p className="font-bold text-2xl text-green-900">15+</p>
                  <p className="text-sm text-gray-600"><Link href="/export" className="text-green-700 font-semibold transition-all">
                    View our global export capabilities
                  </Link></p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <FaShieldAlt className="text-green-700 text-3xl mb-2" />
                  <p className="font-bold text-2xl text-green-900">100%</p>
                  <p className="text-sm text-gray-600">Quality Assured</p>
                </div>
              </div>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/assets/img/manufacturing-facility.webp"
                alt="Sugarcane bagasse manufacturing facility in India by Vegnar Green"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Raw Material Sourcing */}
      <section className="py-16 px-4 sm:px-6 lg:px-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-green-100 text-green-800 text-sm font-semibold rounded-full px-4 py-1 mb-4">
              SUSTAINABLE SOURCING
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              From Farm Waste to Premium Material
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              We partner directly with sugarcane farmers and mills to source
              bagasse—a fibrous byproduct that would otherwise be burned or
              discarded. This sustainable approach supports <Link href="/sustainability/eco-initiatives" className="text-green-700 font-semibold transition-all">
                our agricultural waste upcycling initiative
              </Link> while providing additional income to farming communities.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <GiWheat className="text-green-700 text-5xl mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Direct Farmer Partnerships
              </h3>
              <p className="text-gray-600">
                We work with 200+ local farmers, ensuring fair prices while
                collecting agricultural waste that supports their income.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <FaLeaf className="text-green-700 text-5xl mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Zero Chemical Processing
              </h3>
              <p className="text-gray-600">
                Our bagasse is cleaned and processed using only water and
                heat—no bleaching agents or harmful chemicals.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <FaRecycle className="text-green-700 text-5xl mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Waste Reduction Impact
              </h3>
              <p className="text-gray-600">
                Every ton of bagasse we use prevents 1.5 tons of CO₂ emissions
                from open burning—a common disposal method.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Production Process - Zig-Zag Timeline with Arrows */}
      <section className="py-20 px-4 sm:px-6 lg:px-20 bg-gradient-to-b from-amber-50/40 to-white relative">
        <p className="sr-only">
          Vegnar Green operates an advanced sugarcane bagasse manufacturing unit
          in India, converting agricultural waste into biodegradable plates,
          bowls, and food containers using eco-friendly production processes.
        </p>
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: "url(/assets/bg-green.png)",
            backgroundRepeat: "repeat",
            backgroundSize: "300px auto",
            backgroundAttachment: "fixed",
          }}
        ></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-3 md:mb-4">
              Sugarcane Bagasse Manufacturing Process
            </h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto px-4">
              From sugarcane fields to natural compost—a complete sustainable
              journey
            </p>
          </div>

          <div className="relative">
            {/* Vertical Center Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-300 transform -translate-x-1/2 hidden md:block"></div>

            <div className="space-y-8 md:space-y-20">
              {[
                {
                  title: "Sugarcane Cultivation",
                  desc: "Sugarcane is cultivated as a fast-growing, renewable resource. It absorbs CO₂ during growth, making it carbon-negative from the start.",
                  image: "/assets/img/fixed-sugarcane_1.png",
                  side: "right",
                  nextIcon: "🚜",
                },
                {
                  title: "Harvesting",
                  desc: "Mature sugarcane stalks are harvested and transported to processing facilities where bagasse is separated.",
                  image: "/assets/img/moving-sugarcane.png",
                  side: "left",
                  nextIcon: "⚙️",
                },
                {
                  title: "Pulp Extraction",
                  desc: "After juice extraction, sugarcane bagasse is processed into pulp. This agricultural waste is transformed into valuable raw material.",
                  image: "/assets/img/fixed-paper_3.png",
                  side: "right",
                  nextIcon: "📋",
                },
                {
                  title: "Sheet Formation",
                  desc: "The bagasse pulp is molded and pressed into uniform sheets using heat and pressure, creating the base material.",
                  image: "/assets/img/fixed-product_4.png",
                  side: "left",
                  nextIcon: "🏭",
                },
                {
                  title: "Product Manufacturing",
                  desc: "Eco-friendly sheets are cut, shaped, and molded into final tableware products like bagasse plates, bagasse bowls, food containers, and meal trays.",
                  image: "/assets/img/fixed-factory.gif",
                  side: "right",
                  nextIcon: "🍽️",
                },
                {
                  title: "Usage Phase",
                  desc: "Products are used by consumers for serving food. They are microwave-safe, leak-proof, and suitable for hot and cold items.",
                  image: "/assets/img/fixed-disposal_5.png",
                  side: "left",
                  nextIcon: "♻️",
                },
                {
                  title: "Biodegradation",
                  desc: "After use, products naturally decompose within 60-90 days in composting conditions, returning nutrients to the soil through our compostability certifications.",
                  image: "/assets/img/fixed-compost_6.png",
                  side: "right",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  ref={(el) => (sectionRefs.current[idx] = el)}
                  className="timeline-item transition-all duration-700 ease-out"
                >
                  <div className="relative flex items-center justify-center">
                    {/* Desktop Layout */}
                    <div className="hidden md:grid md:grid-cols-2 gap-16 w-full items-center">
                      {/* Left Side */}
                      <div
                        className={`${item.side === "left" ? "block" : "invisible"}`}
                      >
                        {item.side === "left" && (
                          <div className="relative">
                            <div className="bg-gradient-to-br from-white to-green-50/30 rounded-2xl p-8 shadow-lg border-2 border-green-200 hover:shadow-2xl hover:border-green-400 transition-all duration-300 ml-auto max-w-md group">
                              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-700 transition-colors">
                                {item.title}
                              </h3>
                              <p className="text-gray-600 text-sm leading-relaxed">
                                {item.desc}
                              </p>
                            </div>
                            {/* Process Icon pointing to center */}
                            <div className="absolute right-0 top-1/2 transform translate-x-8 -translate-y-1/2">
                              <div className="timeline-item w-12 h-12 bg-white border-2 border-green-400 rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-all duration-300">
                                <span className="text-xl">→</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Right Side */}
                      <div
                        className={`${item.side === "right" ? "block" : "invisible"}`}
                      >
                        {item.side === "right" && (
                          <div className="relative">
                            <div className="bg-gradient-to-br from-white to-green-50/30 rounded-2xl p-8 shadow-lg border-2 border-green-200 hover:shadow-2xl hover:border-green-400 transition-all duration-300 mr-auto max-w-md group">
                              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-700 transition-colors">
                                {item.title}
                              </h3>
                              <p className="text-gray-600 text-sm leading-relaxed">
                                {item.desc}
                              </p>
                            </div>
                            {/* Process Icon pointing to center */}
                            <div className="absolute left-0 top-1/2 transform -translate-x-8 -translate-y-1/2">
                              <div className="timeline-item w-12 h-12 bg-white border-2 border-green-400 rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-all duration-300">
                                <span className="text-xl">←</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Mobile Layout */}
                    <div className="md:hidden w-full relative">
                      {/* Vertical Line for mobile */}
                      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-300 transform -translate-x-1/2"></div>

                      {/* Center Icon - Mobile */}
                      <div
                        className={`absolute left-1/2 top-8 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full border-3 border-white flex items-center justify-center shadow-xl z-20 overflow-hidden transition-all duration-500 ${
                          activeIndex === idx
                            ? "opacity-100 scale-110"
                            : "opacity-0 scale-75"
                        }`}
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-9 h-9 object-contain"
                        />
                      </div>

                      <div className="flex items-start gap-3 relative z-10 pt-16">
                        <div className="flex-1 bg-gradient-to-br from-white to-green-50/30 rounded-lg p-4 shadow-md border border-green-200">
                          <h3 className="text-sm font-bold text-gray-900 mb-1.5">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 text-xs leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>

                      {/* Process Icon for mobile - Moves with scroll */}
                      {item.nextIcon && (
                        <div
                          className={`absolute left-1/2 transform -translate-x-1/2 z-10 ${
                            activeIndex === idx ? "opacity-100" : "opacity-0"
                          }`}
                          style={{
                            top: `${120 + (activeIndex === idx ? scrollProgress * 200 : 0)}px`,
                            transition: "opacity 0.5s ease",
                          }}
                        >
                          <div className="w-10 h-10 bg-white border-2 border-green-400 rounded-full flex items-center justify-center shadow-md">
                            <span className="text-base">{item.nextIcon}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Center Icon - Desktop Only */}
                    <div
                      className={`hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full border-4 border-white items-center justify-center shadow-xl z-10 overflow-hidden transition-all duration-500 ${
                        activeIndex === idx
                          ? "opacity-100 scale-110"
                          : "opacity-0 scale-75"
                      }`}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-12 h-12 object-contain"
                      />
                    </div>

                    {/* Process Icon - Desktop Only - Moves with scroll */}
                    {item.nextIcon && (
                      <div
                        className={`hidden md:block absolute left-1/2 transform -translate-x-1/2 z-0 ${
                          activeIndex === idx ? "opacity-100" : "opacity-0"
                        }`}
                        style={{
                          bottom: `${-40 - (activeIndex === idx ? scrollProgress * 200 : 0)}px`,
                          transition: "opacity 0.5s ease",
                        }}
                      >
                        <div className="w-12 h-12 bg-white border-2 border-green-400 rounded-full flex items-center justify-center shadow-md">
                          <span className="text-xl">{item.nextIcon}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability in Manufacturing */}
      <section className="py-16 px-4 sm:px-6 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-green-100 text-green-800 text-sm font-semibold rounded-full px-4 py-1 mb-4">
              GREEN MANUFACTURING
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Sustainable Sugarcane Bagasse Manufacturing Practices
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Our commitment to the planet extends beyond our products—our
              manufacturing process itself is designed to minimize environmental
              impact.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaWater className="text-green-700 text-4xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Water Recycling System
              </h3>
              <p className="text-gray-600">
                90% of water used in production is recycled through our
                closed-loop system, reducing freshwater consumption.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <GiFactory className="text-green-700 text-4xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Renewable Energy Use
              </h3>
              <p className="text-gray-600">
                40% of our energy comes from solar panels installed on-site,
                with plans to reach 100% renewable by 2026. <Link href="/about-us" className="text-green-700 font-semibold transition-all">
                  Learn more about our values
                </Link>.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaRecycle className="text-green-700 text-4xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Zero Plastic Policy
              </h3>
              <p className="text-gray-600">
                All packaging materials are recyclable or compostable—no plastic
                is used anywhere in our facility.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-20 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-green-100 text-green-800 text-sm font-semibold rounded-full px-4 py-1 mb-4">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Manufacturing FAQs
            </h2>
          </div>
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                What products do you manufacture?
              </h3>
              <p className="text-gray-600">
                We manufacture a comprehensive range of <Link href="/products/round-plates" className="text-green-700 font-semibold transition-all">
                  bagasse plates
                </Link>, <Link href="/products/bowls" className="text-green-700 font-semibold transition-all">
                  bagasse bowls
                </Link>, <Link href="/products/takeaway-container" className="text-green-700 font-semibold transition-all">
                  food containers
                </Link>, and <Link href="/products/meal-trays" className="text-green-700 font-semibold transition-all">
                  meal trays
                </Link>. View <Link href="/products/bagasse-products" className="text-green-700 font-semibold transition-all">
                  our complete product catalog
                </Link> for detailed specifications.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                What certifications do you have?
              </h3>
              <p className="text-gray-600">
                Our facility is ISO 9001:2015 and ISO 14001:2015 certified. All products are FDA approved, SGS tested, and OK Compost certified. Learn more about <Link href="/about-us" className="text-green-700 font-semibold transition-all">
                  our certifications and quality standards
                </Link>.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                How do your products biodegrade?
              </h3>
              <p className="text-gray-600">
                Our bagasse products are certified compostable and break down completely within 60-90 days in industrial composting conditions. Learn more about <Link href="/sustainability/eco-initiatives" className="text-green-700 font-semibold transition-all">
                  our compostability certifications
                </Link>.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* End of Page CTAs */}
      <section className="py-16 px-4 sm:px-6 lg:px-20 bg-green-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Partner with India's Leading Bagasse Manufacturer?
          </h2>
          <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
            Get custom manufacturing solutions, bulk pricing, and export support for your sustainable packaging needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quote" className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300">
              Request a manufacturing quote
            </Link>
            <Link href="/partner" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-all duration-300">
              Become a distribution partner
            </Link>
          </div>
        </div>
      </section>
      
      <div className="sr-only">
        <h2>Frequently Asked Questions</h2>
        <p>
          Are you a sugarcane bagasse manufacturer in India? Yes, Vegnar Green
          is an in-house manufacturer...
        </p>
      </div>
    </div>
  );
};

export default ManufacturingSection;
