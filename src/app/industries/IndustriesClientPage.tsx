"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  Utensils, 
  Sparkles, 
  Zap, 
  Boxes, 
  HeartPulse, 
  Gem, 
  ArrowRight, 
  CheckCircle2, 
  Globe, 
  Download, 
  Mail, 
  Phone, 
  Shield, 
  ChevronDown,
  Leaf
} from "lucide-react";
import BecomePartnerSection from "@/components/BecomePartnerSection";

// Type definitions
interface IndustryData {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  image: string; // New custom generated high-quality images
  subtitle: string;
  overview: string;
  challenges: string;
  howWeHelp: string;
  recommended: string[];
  benefits: string[];
  useCase: {
    title: string;
    description: string;
  };
}

const industries: IndustryData[] = [
  {
    id: "food-service",
    title: "Food Service & Hospitality",
    icon: Utensils,
    image: "/assets/img/industries/food_service.png",
    subtitle: "Eco-friendly Tableware & Takeaway Packaging",
    overview: "From dining rooms to delivery apps, restaurants and food service providers face the challenge of phasing out single-use plastics. Consumers expect high-quality presentation and eco-responsibility. Vegnar Green offers a full catalog of premium plates, bowls, compartment trays, and takeaway boxes that fit these needs.",
    challenges: "Traditional paper products become soggy when holding hot or oily food, leading to leaks and spills. Plastic and styrofoam containers are banned in many cities and can release chemicals into hot food.",
    howWeHelp: "Our sugarcane bagasse tableware is naturally oil and water resistant. It maintains its structure, keeping meals secure, hot, and well-presented. Safe for microwaves and freezers.",
    recommended: [
      "Compartment Plates (3 to 5 sections)",
      "Round and Oval Plates",
      "Takeaway Containers with secure lids",
      "Soup and Salad Bowls"
    ],
    benefits: [
      "Naturally water and oil resistant",
      "Microwave and freezer safe",
      "Toxin-free food contact",
      "High rigidity and strength"
    ],
    useCase: {
      title: "High-Volume Food Delivery",
      description: "A major restaurant chain replaced plastic-lined paper plates with our bagasse plates. They reduced disposal costs by 15% and received positive customer feedback."
    }
  },
  {
    id: "cosmetics",
    title: "Cosmetics & Beauty",
    icon: Sparkles,
    image: "/assets/img/industries/cosmetics.png",
    subtitle: "Luxury Molded Pulp Inserts & Presentation Trays",
    overview: "Beauty brands are moving away from plastic packaging inserts. For luxury skincare, perfume, and cosmetics, packaging is a key part of the brand experience. Molded sugarcane pulp provides a clean, organic look that highlights natural ingredients.",
    challenges: "Plastic vacuum-formed trays look cheap and generate non-recyclable waste. Gift hampers need protective inserts that keep glass bottles secure during transport without using bubble wrap.",
    howWeHelp: "We design custom-molded pulp inserts that match the shape of your bottles, jars, and lipsticks. Our clean ivory finish offers a premium look for a sustainable unboxing experience.",
    recommended: [
      "Custom Inner Tray Inserts",
      "Gift Set Presentation Bases",
      "Perfume Bottle Holders",
      "Sample Kit Trays"
    ],
    benefits: [
      "Premium ivory textured finish",
      "Cushioned protection for glass",
      "100% biodegradable and compostable",
      "Custom-fit design options"
    ],
    useCase: {
      title: "Luxury Organic Skincare Packaging",
      description: "An organic skincare brand replaced plastic inner trays with our custom bagasse inserts for their holiday gift sets, maintaining a luxury look while eliminating plastic."
    }
  },
  {
    id: "electronics",
    title: "Consumer Electronics",
    icon: Zap,
    image: "/assets/img/industries/electronics.png",
    subtitle: "Eco-Friendly Protective Packaging for Tech Products",
    overview: "The electronics industry is adopting plastic-free packaging. Molded pulp packaging is lightweight, space-saving, and provides excellent shock absorption for high-value items like smartphones, chargers, and accessories.",
    challenges: "Polystyrene (EPS) and plastic trays take up large amounts of storage space, are difficult to recycle, and create static electricity risks for delicate circuits.",
    howWeHelp: "Our molded pulp trays are anti-static, highly rigid, and stackable. They save up to 40% of warehouse space before use. Designed for automated assembly lines.",
    recommended: [
      "Smartphone Box Inserts",
      "Charger and Cable Trays",
      "Anti-Static Tech Cushions",
      "Accessory Organizers"
    ],
    benefits: [
      "Anti-static material properties",
      "Space-saving stackable design",
      "High shock absorption",
      "Automated line compatibility"
    ],
    useCase: {
      title: "Tech Box Insert Optimization",
      description: "A smartphone manufacturer replaced plastic trays with our custom molded pulp inserts. This saved 30% in warehouse space and reduced packaging weight."
    }
  },
  {
    id: "fmcg",
    title: "FMCG & Consumer Goods",
    icon: Boxes,
    image: "/assets/img/industries/fmcg.png",
    subtitle: "Sustainable Trays, Cartons & Bulk Retail Packaging",
    overview: "Fast-moving consumer goods require cheap, durable packaging. Molded pulp is a great choice for grocery items, fresh produce, eggs, and beverage carriers. It keeps products fresh and organized on retail shelves.",
    challenges: "Plastic meat trays and plastic egg cartons contribute to plastic waste. Paperboard boxes can bend easily under weight and do not resist moisture.",
    howWeHelp: "We supply unbleached and bleached molded pulp trays that protect delicate items. Our beverage carriers and egg cartons are durable and support retail logistics.",
    recommended: [
      "Molded Pulp Egg Cartons",
      "Beverage Carry Trays",
      "Fresh Produce & Fruit Trays",
      "Meat & Poultry Trays"
    ],
    benefits: [
      "Durable structure for transit",
      "Unbleached natural brown options",
      "Breathable material keeps produce fresh",
      "Cost-effective for high volumes"
    ],
    useCase: {
      title: "Supermarket Produce Transition",
      description: "A national supermarket chain switched to our molded pulp egg trays and fresh fruit liners, reducing plastic usage in the fresh produce section by 40%."
    }
  },
  {
    id: "healthcare",
    title: "Healthcare & Medical",
    icon: HeartPulse,
    image: "/assets/img/industries/healthcare.png",
    subtitle: "Hygienic Disposable Trays & Kidney Dishes",
    overview: "Hospitals and clinics prioritize hygiene and patient safety. Disposable molded pulp trays offer a clean, single-use option that prevents cross-contamination. They are biodegradable, reducing the environmental impact of medical waste.",
    challenges: "Reusable stainless steel trays require high-temperature sterilization, which is resource-intensive. Reusable plastic trays can harbor bacteria if not cleaned properly.",
    howWeHelp: "Our medical-grade molded pulp trays are manufactured in a sterilized environment. They are sturdy, water-resistant, and can be disposed of easily after single use.",
    recommended: [
      "Disposable Kidney Dishes",
      "Surgical Instrument Trays",
      "Hygienic Medicine Cups",
      "Patient Food Service Trays"
    ],
    benefits: [
      "Sterile and hygienic manufacturing",
      "Single-use prevents cross-contamination",
      "Water resistant for liquid waste",
      "Eco-friendly disposal options"
    ],
    useCase: {
      title: "Hospital Ward Waste Diversion",
      description: "A private hospital group replaced reusable plastic kidney dishes with our compostable pulp trays, lowering sanitization costs and improving hygiene standards."
    }
  },
  {
    id: "jewelry",
    title: "Jewelry & Luxury Goods",
    icon: Gem,
    image: "/assets/img/industries/jewelry.png",
    subtitle: "Luxury Molded Pulp Box Inserts & Custom Packaging",
    overview: "High-end jewelry and luxury brands are transitioning to sustainable presentation materials. Molded sugarcane bagasse provides a premium textured finish with a velvet-smooth touch, elevating the unboxing experience for rings, necklaces, watches, and cosmetics.",
    challenges: "Traditional jewelry boxes heavily rely on non-recyclable plastic shells, synthetic velvet linings, and polyurethane foam inserts that take centuries to decompose in landfills.",
    howWeHelp: "We design custom-molded, high-density pulp trays with a clean, ivory-white finish and soft, organic textures. They offer custom-fit cavities to protect fine jewelry and watches without plastic.",
    recommended: [
      "Custom Ring & Earring Inserts",
      "Luxury Necklace & Bracelet Trays",
      "Premium Watch Cushions",
      "Eco-Friendly Presentation Boxes"
    ],
    benefits: [
      "Velvety-smooth premium finish",
      "Precision-fit custom cavities",
      "100% biodegradable and compostable",
      "Embossed luxury branding options"
    ],
    useCase: {
      title: "Luxury Watch Box Transition",
      description: "A luxury watch brand replaced their plastic interior cases with our custom ivory bagasse pulp inserts, achieving a 100% plastic-free retail package while maintaining a high-end feel."
    }
  }
];

const whyChooseUsData = [
  {
    title: "100% Compostable",
    description: "Fully breaks down into nutrient-rich soil within 60-90 days in commercial facilities, leaving zero microplastics."
  },
  {
    title: "Plastic & Wax-Free",
    description: "Contains no plastic linings, wax coatings, or petroleum-based additives. Made entirely from plant fibers."
  },
  {
    title: "Food Contact Safe",
    description: "FDA approved for direct food contact. Toxin-free, chlorine-free, and odorless for hot or cold foods."
  },
  {
    title: "Microwave & Freezer Safe",
    description: "Withstands temperature ranges from -20°C up to 120°C without leaking, melting, or warping."
  },
  {
    title: "Grease & Water Resistant",
    description: "Naturally water and oil resistant, holding hot liquids and greasy foods without becoming soft."
  },
  {
    title: "Custom OEM Mold Design",
    description: "Our engineers can design custom molds for packaging inserts to match specific product configurations."
  },
  {
    title: "High-Volume Production",
    description: "Our state-of-the-art facility in Gujarat, India, features fully automated production lines for bulk supply."
  },
  {
    title: "Global Supply & Logistics",
    description: "We ship worldwide, offering FCL/LCL supply, custom logistics support, and smooth export documentation."
  }
];

export default function IndustriesClientPage() {
  const [activeTab, setActiveTab] = useState("food-service");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const currentIndustry = industries.find((ind) => ind.id === activeTab) || industries[0];
  const ActiveIcon = currentIndustry.icon;

  const faqs = [
    {
      question: "What industries can benefit most from shifting to molded sugarcane bagasse packaging?",
      answer: "A wide range of industries benefit from molded sugarcane pulp packaging, including food service (restaurants, catering, delivery), consumer electronics, cosmetics, jewelry, FMCG, healthcare, and sustainable logistics. Any business looking to eliminate single-use plastics, comply with environmental regulations, or enhance brand image can utilize bagasse solutions."
    },
    {
      question: "Are Vegnar Green molded pulp products food contact safe?",
      answer: "Yes. Our bagasse products are manufactured from 100% natural, renewable sugarcane fiber with zero plastic, wax linings, or harmful chemicals. They are FDA-approved for direct food contact, SGS-tested, and chemical-free, ensuring they do not leach toxins into hot or cold foods."
    },
    {
      question: "Can custom molded pulp replace plastic and styrofoam packaging inserts?",
      answer: "Absolutely. Our custom-designed molded pulp trays offer excellent shock absorption and structural rigidity, making them a perfect, eco-friendly alternative to vacuum-formed plastic trays and expanded polystyrene (EPS) foam inserts used in electronics, cosmetics, luxury jewelry, and shipping."
    },
    {
      question: "Are your sustainable packaging solutions suitable for international exports?",
      answer: "Yes. As a leading exporter from India, Vegnar Green manufactures products that meet international standards. We hold global certifications including FDA compliance and SGS test reports. We regularly ship full container loads to North America, Europe, the Middle East, and Australia."
    },
    {
      question: "Can Vegnar Green provide private labeling and custom designs (OEM) for our brand?",
      answer: "Yes, we offer complete OEM and private label services. Our engineering team in Gujarat can design custom molds to create unique shapes, sizes, and configurations. We can also emboss your company logo directly onto the products for brand consistency."
    },
    {
      question: "How long does it take for Vegnar Green products to compost?",
      answer: "Our sugarcane bagasse products are 100% compostable and biodegradable. In commercial composting facilities, they fully break down into nutrient-rich organic soil within 60 to 90 days. In home composting environments, they typically decompose within 90 to 180 days, depending on temperature and moisture levels."
    },
    {
      question: "What is the Minimum Order Quantity (MOQ) for bulk wholesale orders?",
      answer: "Our MOQ depends on whether you require standard catalog products or custom molds. For standard tableware items, the wholesale MOQ typically starts at 10,000 pieces or a minimum of one pallet. For custom OEM orders requiring new molds, the MOQ depends on the product size and configuration. Contact our team to discuss your specific requirements."
    },
    {
      question: "Can these packaging solutions be customized with print or embossing?",
      answer: "Yes, we can customize products using mechanical embossing to press your brand logo directly into the bagasse pulp during the molding process. This keeps the product 100% chemical-free and plastic-free, avoiding the use of plastic-coated inks."
    },
    {
      question: "Are sugarcane bagasse tableware and food containers microwave and freezer safe?",
      answer: "Yes, they are microwave safe up to 220°F (104°C) and freezer safe down to -20°C. They do not warp, melt, or release chemical fumes when reheated, making them a functional choice for meal delivery, prep, and storage."
    },
    {
      question: "Do you supply and ship globally, and how do you handle logistics?",
      answer: "Yes, we supply globally from our automated facility in Gujarat, India, which is close to major ports. We offer flexible shipping terms (FOB, CIF, CFR, DDP) and handle all export paperwork, custom clearances, and logistics to ensure timely delivery to your warehouse."
    }
  ];

  return (
    <div className="w-full bg-[#fcfefe] text-gray-800 font-sans">
      
      {/* ================= HERO SECTION ================= */}
      <section 
        className="relative text-white py-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/img/catalog-bg.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40 z-0"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <span className="inline-block bg-[#006325]/30 border border-[#a3e635]/30 text-[#a3e635] text-xs sm:text-sm font-semibold rounded-full px-4 py-1.5 mb-6 uppercase tracking-wider">
            VEGNAR GREEN | SUSTAINABLE PACKAGING SOLUTIONS
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-none max-w-4xl">
            Target Industries We Serve
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 font-medium max-w-3xl mb-8 leading-relaxed">
            Premium custom-molded sugarcane bagasse and plant-fiber packaging solutions designed for businesses worldwide. From luxury cosmetics and jewelry to high-performance shipping inserts.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link 
              href="/quote"
              className="w-full sm:w-auto bg-[#006325] hover:bg-[#004d1c] text-white text-base font-bold rounded-full px-8 py-4 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
            >
              Request Bulk Pricing
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link 
              href="/contact"
              className="w-full sm:w-auto bg-transparent border-2 border-white hover:bg-white hover:text-black text-white text-base font-bold rounded-full px-8 py-4 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Contact Our Team
            </Link>
            <a 
              href="/assets/downloads/Vegnar-greens-sugarcane-bagasse-tableware.pdf"
              download
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border border-white/20 text-[#a3e635] hover:text-white text-base font-semibold rounded-full px-8 py-4 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Get Product Catalog
            </a>
          </div>
        </div>
      </section>

      {/* ================= INTRODUCTION SECTION ================= */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <span className="text-sm font-bold text-[#006325] uppercase tracking-wider flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#006325]"></span>
                The Sustainable Shift
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                Transition to Clean, Plant-Based Molded Pulp Packaging
              </h2>
              <p className="text-gray-600 leading-relaxed text-justify text-base">
                Sugarcane bagasse is the fibrous residue left after extracting juice from sugarcane. Upcycled into durable packaging, it eliminates agricultural waste, prevents crop burning, and provides a sustainable circular alternative to plastics and styrofoam.
              </p>
              <p className="text-gray-600 leading-relaxed text-justify text-base">
                With global regulations targeting single-use plastics and consumers seeking eco-responsible brands, molded plant-fiber packaging has become the standard for businesses looking to lower their carbon footprint without sacrificing structural integrity.
              </p>
            </div>

            <div className="bg-[#f0fdf4] border border-[#dcfce7] rounded-3xl p-8 sm:p-10 space-y-6">
              <h3 className="text-xl sm:text-2xl font-bold text-[#006325] flex items-center gap-3">
                <Leaf className="text-[#006325] w-7 h-7 flex-shrink-0" />
                Key Environmental Benefits
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-bold text-[#006325]">
                    <CheckCircle2 className="w-5 h-5 text-[#006325] flex-shrink-0" />
                    100% Compostable
                  </div>
                  <p className="text-sm text-gray-600">Decomposes in 60-90 days in industrial facilities, returning nutrients to the soil.</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-bold text-[#006325]">
                    <CheckCircle2 className="w-5 h-5 text-[#006325] flex-shrink-0" />
                    Zero Plastic or Wax
                  </div>
                  <p className="text-sm text-gray-600">Made entirely from plant fiber without chemical liners or microplastics.</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-bold text-[#006325]">
                    <CheckCircle2 className="w-5 h-5 text-[#006325] flex-shrink-0" />
                    Renewable Materials
                  </div>
                  <p className="text-sm text-gray-600">Sourced from agricultural byproduct, creating a circular manufacturing loop.</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-bold text-[#006325]">
                    <CheckCircle2 className="w-5 h-5 text-[#006325] flex-shrink-0" />
                    Zero Toxic Leaching
                  </div>
                  <p className="text-sm text-gray-600">Contains no BPA, PFAS, or chlorine. Completely safe for direct food contact.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= DETAILED INDUSTRIES SHOWN VIA TABS ================= */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-bold text-[#006325] uppercase tracking-wider">Interactive Catalog</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mt-2 mb-4">
              Packaging Solutions by Industry
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
              Explore how we serve diverse B2B markets with specialized molded sugarcane pulp packaging.
            </p>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-16 max-w-5xl mx-auto">
            {industries.map((ind) => {
              const IconComp = ind.icon;
              const isActive = ind.id === activeTab;
              return (
                <button
                  key={ind.id}
                  onClick={() => setActiveTab(ind.id)}
                  className={`flex items-center gap-3 px-6 py-3.5 rounded-full text-sm font-bold transition-all duration-300 ${
                    isActive 
                      ? "bg-[#006325] text-white shadow-md shadow-[#006325]/20 scale-105" 
                      : "bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-950 border border-gray-200"
                  }`}
                >
                  <IconComp className="w-4 h-4 flex-shrink-0" />
                  <span>{ind.title}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content Panel */}
          <div className="bg-white border border-gray-200/80 rounded-3xl p-8 sm:p-12 shadow-sm animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
              
              {/* Image & Use Case column */}
              <div className="lg:col-span-2 space-y-6">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] w-full shadow-md bg-gray-100 border border-gray-150">
                  <img
                    src={currentIndustry.image}
                    alt={currentIndustry.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                
                <div className="bg-[#f0fdf4] border border-[#dcfce7] rounded-2xl p-6 shadow-sm">
                  <span className="text-[10px] font-bold text-[#006325] bg-white px-2.5 py-0.5 rounded-full border border-[#dcfce7] uppercase tracking-wider">
                    Real Use Case
                  </span>
                  <h5 className="font-bold text-gray-900 text-sm mt-3 mb-1">{currentIndustry.useCase.title}</h5>
                  <p className="text-xs text-gray-600 leading-relaxed text-justify">{currentIndustry.useCase.description}</p>
                </div>
              </div>

              {/* Technical Details Column */}
              <div className="lg:col-span-3 space-y-8">
                
                {/* Header */}
                <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
                  <div className="w-12 h-12 rounded-xl bg-[#f0fdf4] text-[#006325] flex items-center justify-center shadow-inner">
                    <ActiveIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-extrabold text-gray-900">{currentIndustry.title}</h3>
                    <p className="text-sm font-semibold text-[#006325]">{currentIndustry.subtitle}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Industry Overview</h4>
                  <p className="text-gray-600 leading-relaxed text-justify text-sm sm:text-base">{currentIndustry.overview}</p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-red-500 uppercase tracking-widest mb-2">Operational Pain Points</h4>
                  <p className="text-gray-600 leading-relaxed text-justify text-sm sm:text-base">{currentIndustry.challenges}</p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-[#006325] uppercase tracking-widest mb-2">How We Help</h4>
                  <p className="text-gray-900 leading-relaxed text-justify text-sm sm:text-base font-semibold">{currentIndustry.howWeHelp}</p>
                </div>

                {/* Grid Lists */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-gray-100">
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">Recommended Products</h4>
                    <ul className="space-y-2">
                      {currentIndustry.recommended.map((prod, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-gray-700 font-semibold bg-gray-50 px-3 py-2 rounded-lg border border-gray-200/50">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#006325]"></span>
                          {prod}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">Key Benefits</h4>
                    <ul className="space-y-2">
                      {currentIndustry.benefits.map((ben, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-gray-600 leading-tight">
                          <CheckCircle2 className="w-4 h-4 text-[#006325] flex-shrink-0 mt-0.5" />
                          <span>{ben}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE VEGNAR GREEN ================= */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-bold text-[#006325] uppercase tracking-wider">Uncompromising Standards</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-4">
              Why Choose Vegnar Green Tableware & Packaging?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              As a leading sugarcane bagasse products manufacturer, we combine advanced manufacturing, certified safety, and global shipping capabilities to support bulk commercial requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUsData.map((item, idx) => (
              <div key={idx} className="bg-[#fcfefe] border border-gray-100 hover:border-[#006325]/30 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#f0fdf4] text-[#006325] flex items-center justify-center mb-4 group-hover:bg-[#006325] group-hover:text-white transition-colors">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed text-justify">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SUSTAINABILITY COMMITMENT ================= */}
      <section className="bg-gradient-to-br from-[#006325] to-[#013515] text-white py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-[#a3e635] text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                <Leaf className="w-4.5 h-4.5" />
                Commitment to Circular Economy
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Our Environmental Responsibility
              </h2>
              <p className="text-gray-200 leading-relaxed text-justify text-base">
                At Vegnar Green, sustainability is the foundation of our business. Upcycling sugarcane bagasse allows us to turn agricultural residue into high-value food packaging. This circular approach helps keep carbon stored in physical products instead of being released through crop burning.
              </p>
              <p className="text-gray-200 leading-relaxed text-justify text-base">
                Our manufacturing process is designed to minimize water and energy use. By replacing plastic and styrofoam packaging with compostable alternatives, we help reduce the plastic waste that clogs oceans and landfills.
              </p>
              
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="border-l-4 border-[#a3e635] pl-4">
                  <p className="text-3xl font-extrabold">100%</p>
                  <p className="text-xs text-gray-300 font-semibold uppercase">Renewable Raw Materials</p>
                </div>
                <div className="border-l-4 border-[#a3e635] pl-4">
                  <p className="text-3xl font-extrabold">-70%</p>
                  <p className="text-xs text-gray-300 font-semibold uppercase">Lower Carbon Footprint vs Plastic</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-8 sm:p-10 space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Shield className="text-[#a3e635] w-6 h-6" />
                Impact Benchmarks
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-white/10 p-1.5 rounded-lg text-[#a3e635] mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Landfill Waste Reduction</h4>
                    <p className="text-xs text-gray-200">Our products break down naturally, leaving behind zero microplastics or hazardous materials.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-white/10 p-1.5 rounded-lg text-[#a3e635] mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Agricultural Upcycling</h4>
                    <p className="text-xs text-gray-200">We source bagasse fiber from local farmers, giving them additional income and preventing crop burning.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-white/10 p-1.5 rounded-lg text-[#a3e635] mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Reduced Chemical Footprint</h4>
                    <p className="text-xs text-gray-200">We avoid chlorine bleaching, plastic coatings, and petroleum binders throughout our manufacturing process.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= GLOBAL EXPORT CAPABILITY ================= */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="relative rounded-3xl overflow-hidden h-96 shadow-lg order-2 lg:order-1 border border-gray-150">
              <div className="absolute inset-0 bg-gradient-to-br from-[#f0fdf4] to-[#dcfce7] flex flex-col items-center justify-center p-8 text-center">
                <Globe className="w-24 h-24 text-[#006325] mb-4 animate-pulse" />
                <h3 className="font-bold text-[#006325] text-xl mb-2">Connecting Global Ports</h3>
                <p className="text-xs text-gray-600 max-w-sm">Shipping from Gujarat, India, to destinations in the USA, Canada, UK, Europe, Middle East, and Australia.</p>
                <div className="flex gap-2 mt-6 flex-wrap justify-center">
                  <span className="bg-white border border-gray-200 px-3 py-1 rounded-full text-xs font-semibold">TÜV Certified</span>
                  <span className="bg-white border border-gray-200 px-3 py-1 rounded-full text-xs font-semibold">FDA Compliant</span>
                  <span className="bg-white border border-gray-200 px-3 py-1 rounded-full text-xs font-semibold">SGS Tested</span>
                </div>
              </div>
            </div>

            <div className="space-y-6 order-1 lg:order-2">
              <span className="text-sm font-bold text-[#006325] uppercase tracking-wider flex items-center gap-2">
                <Globe className="w-4 h-4" />
                International Trade Partner
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                Global Supply & Export Capabilities
              </h2>
              <p className="text-gray-600 leading-relaxed text-justify">
                Vegnar Green supports international B2B buyers, distributors, wholesalers, and importers. We provide full container load (FCL) shipping and help customize packaging designs (OEM) for markets worldwide.
              </p>
              <p className="text-gray-600 leading-relaxed text-justify">
                Our facility is located in Gujarat, India, near major international shipping ports. This proximity allows us to manage export logistics efficiently, ensuring timely delivery to international warehouses.
              </p>
              
              <div className="space-y-3 font-semibold text-gray-700">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#006325]" />
                  <span>Distributor Partnerships & Wholesale Programs</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#006325]" />
                  <span>Support with Import Documentation & Custom Clearance</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#006325]" />
                  <span>FCL Container Load Supply & LCL Console Shipments</span>
                </div>
              </div>

              <div className="pt-4">
                <Link 
                  href="/quote"
                  className="bg-[#006325] hover:bg-[#004d1c] text-white text-base font-bold rounded-full px-8 py-3.5 transition-colors inline-flex items-center gap-2 group"
                >
                  Contact Our Export Desk
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 border-t border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-bold text-[#006325] uppercase tracking-wider">Answers to Common Questions</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600">
              Find detailed answers about our manufacturing, certifications, custom capabilities, and shipping processes.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-100 last:border-none">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full py-5 px-6 sm:px-8 flex justify-between items-center text-left hover:bg-[#f0fdf4]/30 transition-colors group"
                >
                  <span className="font-bold text-gray-800 pr-4 group-hover:text-[#006325] transition-colors text-sm sm:text-base">
                    {faq.question}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-[#006325] flex-shrink-0 transition-transform ${openFaq === index ? "rotate-180" : ""}`} />
                </button>
                {openFaq === index && (
                  <div className="px-6 sm:px-8 pb-5 text-sm sm:text-base text-gray-600 leading-relaxed text-justify bg-[#fcfefe] border-t border-gray-50">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12 bg-white rounded-2xl p-6 border border-gray-200 shadow-sm max-w-2xl mx-auto">
            <p className="text-gray-600 font-semibold mb-2">Have a question not listed here?</p>
            <p className="text-sm text-gray-500 mb-4">Our sales team is available to discuss custom product requirements, private labeling, and pricing options.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="text-[#006325] hover:text-[#004d1c] font-bold text-sm flex items-center gap-1.5">
                <Mail className="w-4 h-4" />
                Write to Us
              </Link>
              <span className="text-gray-300 hidden sm:inline">|</span>
              <a href="tel:+919998040373" className="text-[#006325] hover:text-[#004d1c] font-bold text-sm flex items-center gap-1.5">
                <Phone className="w-4 h-4" />
                Call +91-9998040373
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA SECTION ================= */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#013515] to-[#00210c] text-white text-center overflow-hidden">
        {/* Background Glowing Orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#a3e635]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-4xl mx-auto relative z-10 space-y-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Ready to Switch to Sustainable Packaging?
          </h2>
          <p className="text-base sm:text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Partner with Vegnar Green for your wholesale, export, distributor, and OEM packaging needs. Contact us to receive pricing, a catalog, or to request custom samples.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-4">
            <Link 
              href="/quote"
              className="w-full sm:w-auto bg-[#006325] hover:bg-[#004d1c] text-white text-base font-bold rounded-full px-8 py-4 transition-all duration-300 shadow-md hover:shadow-lg inline-block"
            >
              Request a Quote
            </Link>
            <a 
              href="/assets/downloads/Vegnar-greens-sugarcane-bagasse-tableware.pdf"
              download
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border border-white/20 text-[#a3e635] hover:text-white text-base font-bold rounded-full px-8 py-4 transition-all duration-300 inline-block"
            >
              Download Product Catalog
            </a>
            <Link 
              href="/contact"
              className="w-full sm:w-auto bg-transparent border-2 border-white hover:bg-white hover:text-black text-white text-base font-bold rounded-full px-8 py-4 transition-all duration-300 inline-block"
            >
              Contact Sales Team
            </Link>
          </div>
        </div>
      </section>

      {/* Become Partner Section */}
      <BecomePartnerSection />
      
    </div>
  );
}
