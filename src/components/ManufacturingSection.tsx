'use client';

import React from 'react';
import Image from 'next/image';
import { FaIndustry, FaLeaf, FaCogs, FaCertificate, FaRecycle, FaShieldAlt, FaGlobeAsia, FaWater } from 'react-icons/fa';
import { GiFactory, GiWheat, GiCheckMark } from 'react-icons/gi';

const ManufacturingSection = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 to-green-100 py-20 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block bg-green-700 text-white text-sm font-semibold rounded-full px-4 py-1 mb-4">
            MANUFACTURING EXCELLENCE
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
            Where Innovation Meets Sustainability
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            State-of-the-art facility transforming agricultural waste into premium biodegradable tableware for global markets
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
                Manufacturing Excellence at Scale
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Our ISO-certified manufacturing facility spans over 50,000 sq. ft., equipped with advanced machinery and automated production lines. Located strategically for raw material access and export logistics, we maintain the highest standards of quality and sustainability.
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
                  <p className="text-sm text-gray-600">Export Countries</p>
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
                src="/assets/img/manufacturing-facility.jpg"
                alt="Vegnar Manufacturing Facility"
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
              We partner directly with sugarcane farmers and mills to source bagasse—a fibrous byproduct that would otherwise be burned or discarded.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <GiWheat className="text-green-700 text-5xl mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Direct Farmer Partnerships</h3>
              <p className="text-gray-600">
                We work with 200+ local farmers, ensuring fair prices while collecting agricultural waste that supports their income.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <FaLeaf className="text-green-700 text-5xl mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Zero Chemical Processing</h3>
              <p className="text-gray-600">
                Our bagasse is cleaned and processed using only water and heat—no bleaching agents or harmful chemicals.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <FaRecycle className="text-green-700 text-5xl mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Waste Reduction Impact</h3>
              <p className="text-gray-600">
                Every ton of bagasse we use prevents 1.5 tons of CO₂ emissions from open burning—a common disposal method.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Production Process */}
      <section className="py-16 px-4 sm:px-6 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-green-100 text-green-800 text-sm font-semibold rounded-full px-4 py-1 mb-4">
              PRODUCTION FLOW
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our Manufacturing Process
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              A streamlined, eco-conscious production line that transforms raw bagasse into export-quality tableware.
            </p>
          </div>
          <div className="relative">
            <div className="space-y-8">
              {[
                { step: '01', title: 'Raw Material Preparation', desc: 'Bagasse is cleaned, dried, and pulped into fine fibers ready for molding.' },
                { step: '02', title: 'Pulp Formation', desc: 'Fibers are mixed with water to create a uniform pulp mixture with optimal consistency.' },
                { step: '03', title: 'High-Pressure Molding', desc: 'Pulp is pressed into molds using heat (200°C) and pressure to form tableware shapes.' },
                { step: '04', title: 'Drying & Curing', desc: 'Products are dried in controlled environments to achieve strength and durability.' },
                { step: '05', title: 'Quality Inspection', desc: 'Every batch undergoes rigorous testing for strength, leak resistance, and food safety.' },
                { step: '06', title: 'Packaging & Export', desc: 'Products are packed in recyclable materials and prepared for B2B and export shipments.' }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-16 h-16 bg-green-700 text-white rounded-full flex items-center justify-center font-bold text-xl">
                    {item.step}
                  </div>
                  <div className="flex-1 bg-green-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-700">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quality Control & Certifications */}
      <section className="py-16 px-4 sm:px-6 lg:px-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-green-100 text-green-800 text-sm font-semibold rounded-full px-4 py-1 mb-4">
              QUALITY ASSURANCE
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Export-Ready Quality Standards
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Our products meet international food safety and environmental standards, backed by globally recognized certifications.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <FaCertificate className="text-green-700 text-4xl mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Certifications</h3>
              <ul className="space-y-3">
                {['ISO 9001:2015 (Quality Management)', 'FDA Approved (Food Contact Safe)', 'BRC Certified (Global Standards)', 'Compostable Certification (EN 13432)', 'HACCP Compliant'].map((cert, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <GiCheckMark className="text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md">
              <FaShieldAlt className="text-green-700 text-4xl mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Quality Testing</h3>
              <ul className="space-y-3">
                {['Leak & Grease Resistance Tests', 'Microwave & Freezer Safety', 'Load-Bearing Capacity Analysis', 'Biodegradability Verification', 'Heavy Metal & Toxin Screening'].map((test, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <GiCheckMark className="text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{test}</span>
                  </li>
                ))}
              </ul>
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
              Sustainability at Every Step
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Our commitment to the planet extends beyond our products—our manufacturing process itself is designed to minimize environmental impact.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaWater className="text-green-700 text-4xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Water Recycling System</h3>
              <p className="text-gray-600">
                90% of water used in production is recycled through our closed-loop system, reducing freshwater consumption.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <GiFactory className="text-green-700 text-4xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Renewable Energy Use</h3>
              <p className="text-gray-600">
                40% of our energy comes from solar panels installed on-site, with plans to reach 100% renewable by 2026.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaRecycle className="text-green-700 text-4xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Zero Plastic Policy</h3>
              <p className="text-gray-600">
                All packaging materials are recyclable or compostable—no plastic is used anywhere in our facility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-20 bg-gradient-to-br from-green-700 to-green-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Partner with a Trusted Manufacturer
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Looking for bulk orders or export partnerships? Our team is ready to support your sustainable business goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Request Factory Visit
            </a>
            <a
              href="/export"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-700 transition"
            >
              Export Inquiry
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ManufacturingSection;
