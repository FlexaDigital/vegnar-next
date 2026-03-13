import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf, faTree, faWater, faTrash, faHandsHelping } from '@fortawesome/free-solid-svg-icons';
import BecomePartnerSection from '@/components/BecomePartnerSection';

export const metadata: Metadata = {
  title: "Eco Activities | Vegnar Green's Environmental Initiatives",
  description: "By choosing Vegnar's bagasse products, you're contributing to our eco-activities including tree plantations, forest cleaning, and shoreline plastic removal.",
  keywords: [
    "eco activities",
    "environmental initiatives",
    "tree plantation",
    "forest cleaning",
    "shoreline cleanup",
    "plastic waste removal",
    "sustainable business",
    "corporate social responsibility",
    "bagasse products impact",
    "vegnar green initiatives"
  ],
  alternates: {
    canonical: "https://www.vegnar.com/sustainability/eco-activities",
  },
  robots: "index, follow",
  authors: [{ name: "Vegnar Greens" }],
  publisher: "Vegnar Greens",
};

export default function EcoActivitiesPage() {
  return (
    <div className="min-h-screen bg-[#f3faf5] text-[#0b3d13]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-green-100 pt-24 pb-32 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="inline-block bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
            🌱 SUSTAINABILITY
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Our Eco-Activities
          </h1>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-10">
            When you choose Vegnar, you're not just using <Link href="/products/bagasse-products" className="text-green-700 font-semibold hover:underline decoration-2 underline-offset-2 transition-all">
              bagasse products
            </Link> over plastic – you're directly supporting our environmental initiatives that help protect and restore our planet.
          </p>
          
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-white transform -skew-y-1"></div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-xl p-12 relative -mt-16">
            <div className="absolute -top-8 right-12 bg-green-600 rounded-full w-16 h-16 flex items-center justify-center shadow-lg">
              <FontAwesomeIcon icon={faHandsHelping} className="text-white text-2xl" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Double Your Environmental Impact
            </h2>
            <p className="text-gray-700 text-lg mb-12 leading-relaxed">
              Using bagasse products already helps reduce plastic waste. By choosing Vegnar specifically, you're also funding our direct environmental action programs.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
                <div className="bg-green-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <FontAwesomeIcon icon={faLeaf} className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  100% Natural
                </h3>
                <p className="text-gray-600">
                  Made from agricultural waste with no harmful chemicals
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
                <div className="bg-green-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <FontAwesomeIcon icon={faTree} className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Tree Plantation
                </h3>
                <p className="text-gray-600">
                  We plant trees to offset carbon and restore forests
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
                <div className="bg-green-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <FontAwesomeIcon icon={faWater} className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Ocean Conservation
                </h3>
                <p className="text-gray-600">
                  We clean shorelines and prevent plastic pollution
                </p>
              </div>
            </div>
          </div>
          {/* Main Content */}
          <section className="text-center max-w-3xl mx-auto mb-12 mt-16">
            <span className="inline-block bg-[#d9f0de] text-[#1a7a2b] text-sm font-semibold rounded-full px-4 py-1 mb-4">
              OUR COMMITMENT
            </span>
            <h2 className="text-[#0b3d13] font-bold text-2xl sm:text-3xl mb-3">
              Twice the Impact for Our Planet
            </h2>
            <p className="text-[#0b3d13]/80 text-base sm:text-lg mb-4">
              By choosing Vegnar's products, you're making a double impact - reducing plastic waste and supporting our environmental conservation initiatives.
            </p>
            <p className="text-[#0b3d13]/80 text-base sm:text-lg font-medium">
              Whether you're using our bagasse products or partnering with Vegnar, you automatically become an indirect participant in our planet-saving mission and eco-activities.
            </p>
          </section>

          {/* Two-Column Section */}
          <section className="bg-white rounded-2xl p-8 mb-16 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-[#0b3d13] mb-4">First Impact: Choosing Bagasse</h3>
                <p className="mb-4 text-[#0b3d13]/80">
                  By selecting bagasse products over plastic alternatives, you're already making a significant environmental difference. Explore <Link href="/products/bagasse-products" className="text-green-700 font-semibold hover:underline decoration-2 underline-offset-2 transition-all">
                    our full range of bagasse products
                  </Link> to see all available options:
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <FontAwesomeIcon icon={faLeaf} className="text-green-600 mt-1" />
                    <span>Reducing petroleum-based plastic consumption</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <FontAwesomeIcon icon={faLeaf} className="text-green-600 mt-1" />
                    <span>Using agricultural waste that would otherwise be burned</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <FontAwesomeIcon icon={faLeaf} className="text-green-600 mt-1" />
                    <span>Supporting <Link href="/sustainability/eco-initiatives" className="text-green-700 font-semibold hover:underline decoration-2 underline-offset-2 transition-all">
                      fully compostable products that break down in 90 days
                    </Link></span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#0b3d13] mb-4">Second Impact: Vegnar's Eco Activities</h3>
                <p className="mb-4 text-[#0b3d13]/80">
                  When you choose Vegnar specifically, a portion of our profits directly funds environmental programs. <Link href="/about-us" className="text-green-700 font-semibold hover:underline decoration-2 underline-offset-2 transition-all">
                    Learn more about Vegnar's mission
                  </Link> and our commitment to sustainability:
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <FontAwesomeIcon icon={faTree} className="text-green-600 mt-1" />
                    <span>Tree plantation initiatives in deforested areas</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <FontAwesomeIcon icon={faTrash} className="text-green-600 mt-1" />
                    <span>Forest cleaning and maintenance programs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <FontAwesomeIcon icon={faWater} className="text-green-600 mt-1" />
                    <span>Shoreline plastic removal and ocean conservation</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Our Vision Section */}
          <section className="mb-16 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-8 border border-green-100">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-[#0b3d13] mb-4">Our Vision for a Greener Future</h2>
              <p className="text-[#0b3d13]/70 max-w-3xl mx-auto">
                At Vegnar, we believe that businesses must take responsibility for environmental stewardship. Our vision goes beyond just selling eco-friendly products - we're committed to creating a regenerative cycle where our commercial success directly fuels environmental restoration.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="font-bold text-[#0b3d13] mb-3 text-xl">The Problem We're Addressing</h3>
                <p className="text-[#0b3d13]/70 mb-4">
                  Every year, over 300 million tons of plastic are produced worldwide, with nearly 50% being single-use items. Much of this ends up in our oceans and forests, taking hundreds of years to decompose while releasing harmful chemicals. Learn about <Link href="/sustainability/eco-initiatives" className="text-green-700 font-semibold hover:underline decoration-2 underline-offset-2 transition-all">
                    our commitment to plastic reduction
                  </Link>.
                </p>
                <p className="text-[#0b3d13]/70">
                  Meanwhile, agricultural waste like sugarcane bagasse is often burned, releasing CO2 and particulate matter that harms air quality and contributes to climate change.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="font-bold text-[#0b3d13] mb-3 text-xl">Our Solution: A Dual Approach</h3>
                <p className="text-[#0b3d13]/70 mb-4">
                  First, we transform agricultural waste into <Link href="/products/bagasse-products" className="text-green-700 font-semibold hover:underline decoration-2 underline-offset-2 transition-all">
                    high-quality bagasse tableware
                  </Link>, preventing both the burning of bagasse and the production of plastic alternatives.
                </p>
                <p className="text-[#0b3d13]/70">
                  Second, we dedicate a significant portion of our profits to direct environmental action - planting trees, cleaning forests and shorelines, and educating communities about sustainable practices.
                </p>
              </div>
            </div>
            
            <div className="text-center mb-10 mt-12">
              <h3 className="text-xl font-bold text-[#0b3d13] mb-4">Our Commitment by 2025</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                <div className="bg-white rounded-xl p-4 shadow-md">
                  <div className="text-3xl font-bold text-green-600 mb-2">10,000+</div>
                  <p className="text-[#0b3d13]/70">Trees planted annually</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-md">
                  <div className="text-3xl font-bold text-green-600 mb-2">5 tons</div>
                  <p className="text-[#0b3d13]/70">Plastic waste removed from shorelines</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-md">
                  <div className="text-3xl font-bold text-green-600 mb-2">30%</div>
                  <p className="text-[#0b3d13]/70">Of profits dedicated to environmental initiatives</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-md">
                  <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
                  <p className="text-[#0b3d13]/70">Carbon-neutral operations</p>
                </div>
              </div>
            </div>
          </section>
          
          {/* Our Activities Section */}
          <section className="mb-16">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-[#0b3d13] mb-4">Our Environmental Activities</h2>
              <p className="text-[#0b3d13]/70 max-w-3xl mx-auto">
                Here's how we're putting our commitment into action with your support
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <FontAwesomeIcon icon={faTree} className="text-xl text-green-600" />
                </div>
                <h3 className="font-bold text-[#0b3d13] mb-3">Tree Plantation</h3>
                <p className="text-[#0b3d13]/70 mb-3">
                  We regularly organize tree planting events in areas affected by deforestation. Each purchase contributes to our goal of planting 10,000 trees annually. <Link href="/contact" className="text-green-700 font-semibold hover:underline decoration-2 underline-offset-2 transition-all">
                    Contact us to get involved
                  </Link> in our next planting event.
                </p>
                <p className="text-[#0b3d13]/70 text-sm">
                  <strong>Recent Achievement:</strong> Planted 2,500 native trees in collaboration with local communities in deforested regions, creating carbon sinks and restoring biodiversity.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <FontAwesomeIcon icon={faTrash} className="text-xl text-green-600" />
                </div>
                <h3 className="font-bold text-[#0b3d13] mb-3">Forest Cleaning</h3>
                <p className="text-[#0b3d13]/70 mb-3">
                  Our teams work to remove waste from forest areas, helping to preserve natural habitats and prevent wildlife harm from human waste.
                </p>
                <p className="text-[#0b3d13]/70 text-sm">
                  <strong>Recent Achievement:</strong> Removed over 1.2 tons of non-biodegradable waste from protected forest areas, preventing soil and water contamination.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <FontAwesomeIcon icon={faWater} className="text-xl text-green-600" />
                </div>
                <h3 className="font-bold text-[#0b3d13] mb-3">Shoreline Cleanup</h3>
                <p className="text-[#0b3d13]/70 mb-3">
                  We organize regular beach and shoreline cleanups to remove plastic waste before it enters our oceans and harms marine life.
                </p>
                <p className="text-[#0b3d13]/70 text-sm">
                  <strong>Recent Achievement:</strong> Conducted 8 coastal cleanup events with volunteers, collecting over 3,000 pounds of plastic waste that would have otherwise entered marine ecosystems.
                </p>
              </div>
            </div>
          </section>

          {/* Join Us CTA */}
          <section className="text-center mb-12">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 border border-green-100">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon icon={faHandsHelping} className="text-2xl text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-[#0b3d13] mb-4">Be Part of Our Environmental Mission</h2>
              <p className="text-[#0b3d13]/70 mb-6 max-w-2xl mx-auto">
                Every Vegnar product you purchase directly contributes to our environmental initiatives. But you can do more - join us in our hands-on activities or partner with us for larger impact.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#1a7a2b] to-[#2d8f3f] text-white font-semibold rounded-lg px-6 py-3 hover:from-[#0f5a1f] hover:to-[#1a7a2b] transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Volunteer for Activities
                </Link>
                <Link
                  href="/partner"
                  className="inline-flex items-center justify-center gap-2 border-2 border-[#1a7a2b] text-[#1a7a2b] font-semibold rounded-lg px-6 py-3 hover:bg-[#f0f9f2] transition-all duration-300"
                >
                  Become a Corporate Partner
                </Link>
              </div>
            </div>
          </section>
        </div>
      </section>
      
      {/* Link to Eco-Initiatives Sibling */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Learn More About Our Sustainability Efforts
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Our eco-activities are just one part of our comprehensive sustainability approach. Discover our broader environmental initiatives and commitments.
          </p>
          <Link href="/sustainability/eco-initiatives" className="inline-block bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-all text-lg">
            See our eco-initiatives program
          </Link>
        </div>
      </section>
      
      {/* End CTA */}
      <section className="py-16 bg-green-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of businesses making a positive environmental impact. Every order supports our eco-activities and helps create a sustainable future.
          </p>
          <Link href="/quote" className="inline-block bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all text-lg">
            Choose Vegnar for your eco-packaging needs
          </Link>
        </div>
      </section>
      
      <BecomePartnerSection />
    </div>
  );
}