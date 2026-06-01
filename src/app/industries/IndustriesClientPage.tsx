"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  Utensils, 
  Truck, 
  Hotel, 
  ChefHat, 
  Zap, 
  Plane, 
  Train, 
  HeartPulse, 
  GraduationCap, 
  Building2, 
  Sparkles, 
  ShoppingBag, 
  Boxes, 
  Gift, 
  Leaf, 
  CheckCircle2, 
  Globe, 
  ArrowRight, 
  ChevronDown, 
  Download, 
  Phone, 
  Mail,
  Shield
} from "lucide-react";
import BecomePartnerSection from "@/components/BecomePartnerSection";

// Type definitions
interface IndustryData {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  image: string; // HD Image of Bagasse Tableware/Packaging in use
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
    id: "restaurants",
    title: "Restaurants & Food Service",
    icon: Utensils,
    image: "/assets/img/industries/bagasse_restaurant.png",
    subtitle: "Dine-in, Takeaway, and Sustainable Food Service",
    overview: "In the modern dining ecosystem, customers expect more than just delicious food; they demand environmental responsibility. Restaurants, bistros, cafes, and food service providers face the critical task of phasing out single-use plastics without degrading the customer experience. Elegant presentation, structural durability, and sustainable food packaging are now central to brand loyalty.",
    challenges: "Traditional paper plates and low-quality cardboard containers absorb moisture quickly, leading to soggy, sagging tableware that ruins meals. On the other hand, polystyrene and plastic packaging are subject to strict bans, carry negative brand perceptions, and leach harmful chemicals like Bisphenol A (BPA) when exposed to hot food.",
    howWeHelp: "Vegnar Green supplies high-density sugarcane bagasse tableware that matches the strength of plastic while remaining 100% compostable. Our products feature natural grease and water-resistant properties, ensuring that hot gravies, oily appetizers, and heavy mains are served on rigid, reliable surfaces that never compromise presentation.",
    recommended: [
      "Round Plates (7-inch to 12-inch)",
      "Compartment Plates (3, 4, and 5-sections)",
      "Portion Bowls (180ml to 500ml)",
      "Takeaway Containers with secure lids"
    ],
    benefits: [
      "Naturally oil and water-resistant up to 100°C",
      "Microwave safe for easy reheating",
      "Premium aesthetic that elevates food presentation",
      "Rigid structure that prevents bending or spilling"
    ],
    useCase: {
      title: "Fine Casual Dining & Outdoor Buffets",
      description: "A premium organic restaurant chain replaced plastic-lined paper plates with Vegnar Green's sugarcane bagasse compartment plates for their outdoor catering events. They reported zero structural failures, a 15% reduction in disposal costs, and overwhelming positive feedback from guests who appreciated the premium, eco-friendly feel."
    }
  },
  {
    id: "cloud-kitchens",
    title: "Cloud Kitchens & Food Delivery",
    icon: Truck,
    image: "/assets/img/industries/bagasse_delivery.png",
    subtitle: "Leak-Proof Packaging Built for the Delivery Era",
    overview: "The global surge in food delivery and virtual brands has changed how we consume meals. In cloud kitchens, the container is the only physical touchpoint between the brand and the customer. The food must arrive at the doorstep looking just as fresh, hot, and appetizing as it did when it left the kitchen line, requiring advanced packaging solutions.",
    challenges: "Food transit involves rough handling, temperature fluctuations, and steam condensation. Standard cardboard boxes become soft and collapse under steam pressure. Low-cost plastic containers sweat, causing fried items to lose crispness, and are notorious for spilling liquid curries during motorcycle transport.",
    howWeHelp: "Our sugarcane bagasse food containers are engineered specifically for delivery. Designed with reinforced corners and secure interlocking tabs, they prevent leaks and maintain structural integrity during transit. The breathable bagasse material allows steam to vent naturally while retaining heat, keeping food crispy, fresh, and hot.",
    recommended: [
      "3-Compartment Meal Trays with secure lids",
      "Rectangular Takeaway Containers (500ml to 1000ml)",
      "Deep Soup Bowls with leak-resistant matching lids",
      "Hinged Clamshell Lunch Boxes"
    ],
    benefits: [
      "Excellent thermal insulation for hot transit",
      "Breathable material preventing sogginess",
      "Stackable design optimizing delivery bag space",
      "Secure snap-lock lids preventing spills"
    ],
    useCase: {
      title: "High-Volume Delivery Optimization",
      description: "A major multi-brand cloud kitchen operator transitioned their rice and curry combos to Vegnar Green's 3-compartment bagasse trays. They eliminated transit spills completely, saw a 20% increase in repeat customer ratings, and proudly advertised plastic-free packaging to align with modern consumer expectations."
    }
  },
  {
    id: "hotels-resorts",
    title: "Hotels & Resorts",
    icon: Hotel,
    image: "/assets/img/industries/bagasse_hotel.png",
    subtitle: "Luxury Hospitality Meets Green ESG Initiatives",
    overview: "Five-star hotels, luxury resorts, and boutique eco-lodges operate under strict environmental mandates. Driven by both guest demand and corporate ESG (Environmental, Social, and Governance) targets, the hospitality sector is actively eliminating single-use plastics from rooms, poolside bars, and banquet halls while maintaining high aesthetic standards.",
    challenges: "Standard eco-friendly packaging can look cheap, raw, and unfinished, which conflicts with the luxury aesthetic that hotel guests pay for. Traditional paper products feel flimsy, while ceramic tableware is too heavy and prone to breakage around pool decks, outdoor lounges, and private beaches.",
    howWeHelp: "Vegnar Green designs premium sugarcane bagasse tableware that features a sleek, smooth ivory finish and elegant geometric silhouettes. These premium products blend seamlessly into upscale settings, offering an eco-friendly option that feels heavy-duty, clean, and sophisticated.",
    recommended: [
      "Premium Textured Dessert Bowls",
      "Oval Serving Platters and Salad Trays",
      "Square and Rectangular Plates",
      "Lidded Tea and Coffee Cups"
    ],
    benefits: [
      "Ultra-smooth, premium finish matching luxury expectations",
      "Shatterproof safety for wet areas like pools and beaches",
      "ODORLESS raw material that doesn't affect food aroma",
      "Fully compostable to support hotel zero-waste targets"
    ],
    useCase: {
      title: "Luxury Eco-Resort Poolside dining",
      description: "A luxury beach resort in Goa replaced poolside plastic cups and trays with Vegnar Green's premium bagasse collection. This eliminated plastic waste near the ocean, reduced broken ceramic incidents by 90%, and enhanced their brand as a certified sustainable eco-resort."
    }
  },
  {
    id: "catering",
    title: "Catering Services",
    icon: ChefHat,
    image: "/assets/img/industries/bagasse_catering.png",
    subtitle: "High-Volume Tableware for Banquets and Weddings",
    overview: "Event caterers manage logistics for thousands of guests simultaneously. From weddings to corporate conferences, success depends on fast setup, consistent presentation, and efficient cleanups. Tableware must be light, uniform, and durable enough to withstand a variety of hot and heavy cuisines.",
    challenges: "Washing thousands of ceramic plates post-event requires massive water, energy, and labor resources, which cuts into profit margins. Cheap paper plates bend, buckle, and spill food when guests walk through a buffet line, leading to mess, wasted food, and unhappy clients.",
    howWeHelp: "We manufacture extra-rigid, multi-compartment sugarcane bagasse trays and large plates that can carry substantial weight without bending. They provide a high-end appearance for events while eliminating the need for dishwashing, letting catering teams clean up in minutes.",
    recommended: [
      "5-Compartment Banquet Trays",
      "6-Compartment Premium Buffet Plates",
      "Deep Soup and Dessert Bowls",
      "Oval Snack Trays and Platters"
    ],
    benefits: [
      "Industrial-grade strength that handles heavy meals",
      "Zero washing costs and minimal post-event cleanup labor",
      "Lightweight packaging that lowers transport emissions",
      "Compostable with organic food scraps directly"
    ],
    useCase: {
      title: "Zero-Waste Corporate Banquets",
      description: "A premium catering company serving corporate annual meets switched to Vegnar Green's unbleached bagasse trays. By disposing of the trays along with food waste in organic composting units, they achieved 95% waste diversion from landfills and cut cleanup time in half."
    }
  },
  {
    id: "qsr",
    title: "Quick Service Restaurants (QSR)",
    icon: Zap,
    image: "/assets/img/industries/bagasse_qsr.png",
    subtitle: "Consistent, High-Speed Packaging for Fast Food Chains",
    overview: "Quick Service Restaurants operate on high speeds and tight margins. Packaging must be extremely functional, easy to store, quick to assemble, and capable of holding greasy fast foods. As franchises expand, maintaining uniform packaging across hundreds of locations is key for brand consistency.",
    challenges: "QSR packaging is prone to grease-soaking, which transfers heat to customers' hands and ruins clothes. Slow packaging assembly slows down drive-thru lines, while bulky containers take up valuable storage space behind the counter.",
    howWeHelp: "Our bagasse clamshell containers and fast-lock trays are designed for rapid, high-volume QSR environments. They nest compactly to save back-of-house space, close securely with a single press, and feature oil-resistant barriers that keep hot, greasy foods crisp and dry.",
    recommended: [
      "Hinged Burger Clamshells",
      "Hot Dog and Wrap Boxes",
      "Deep Fry and Snack Cups",
      "2-Compartment Fast-Food Trays"
    ],
    benefits: [
      "Snap-lock closures that speed up packaging lines",
      "Superior grease barrier that prevents oil soak-through",
      "Excellent nestability, saving up to 40% storage space",
      "Fully customizable shapes and sizes for QSR brands"
    ],
    useCase: {
      title: "Global QSR Franchise Transition",
      description: "An international burger chain replaced plastic-coated paper wrap and foam boxes with Vegnar Green's sugarcane bagasse clamshells. They reduced packaging assembly time by 12%, eliminated grease-leak complaints, and successfully met local municipal plastic-free guidelines."
    }
  },
  {
    id: "airlines",
    title: "Airlines & Aviation Catering",
    icon: Plane,
    image: "/assets/img/industries/bagasse_airline.png",
    subtitle: "Oven-Safe, Lightweight In-Flight Meal Trays",
    overview: "Airlines and aviation caterers operate under unique constraints: limited space, strict weight limits, and stringent health guidelines. In-flight meal trays must fit precisely into galley carts, tolerate heating in convection or steam ovens, and keep weight to a minimum to reduce fuel usage.",
    challenges: "Standard plastic trays cannot withstand high-temperature heating, requiring meals to be cooked in foil and transferred to plastic, which increases preparation time and risk. Heavier reusable trays increase flight weight, driving up fuel burn and carbon emissions.",
    howWeHelp: "Vegnar Green designs custom, lightweight bagasse trays that are oven-safe up to 200°C. Aviation catering teams can cook, freeze, transport, heat, and serve meals in the same tray, simplifying the supply chain and reducing cabin weight.",
    recommended: [
      "Aviation-Spec Hot Meal Trays",
      "Side Dish and Salad Bowls",
      "Coffee Cups with compostable lids",
      "Snack Platters for short-haul flights"
    ],
    benefits: [
      "Oven-safe up to 200°C and freezer-safe to -20°C",
      "Ultra-lightweight structure that reduces fuel burn",
      "Hygienic single-use design that meets international standards",
      "Space-saving design that fits standard airline galley carts"
    ],
    useCase: {
      title: "International Flight Weight Reduction",
      description: "A major commercial airline replaced their heavy, reusable plastic in-flight trays with Vegnar Green's lightweight sugarcane bagasse meal trays. The change reduced cabin weight by 140kg per long-haul flight, leading to thousands of dollars in fuel savings and a lower carbon footprint."
    }
  },
  {
    id: "railways",
    title: "Railways & Transportation Catering",
    icon: Train,
    image: "/assets/img/industries/bagasse_railway.png",
    subtitle: "Durable Packaging for Long-Distance Commutes",
    overview: "Railways and bus transit networks serve millions of passengers on long journeys. Tableware used in transportation must be budget-friendly, spill-resistant to handle train movement, and easy to dispose of along tracks and stations.",
    challenges: "Passenger transit lines generate massive amounts of waste, which often litters tracks and stations. Cleaning up and sorting this waste is challenging. Packaging must prevent spills from vehicle movement while remaining cheap enough for mass transit budgets.",
    howWeHelp: "Our standard bagasse trays and deep lidded containers provide a reliable, low-cost solution. They resist spills, keep meals warm, and degrade quickly in municipal composting units, helping transportation authorities run cleaner operations.",
    recommended: [
      "Standard 4-Compartment Railway Trays",
      "Deep Rice and Curry Containers",
      "Spill-Resistant Soup Bowls",
      "Snack Boxes with secure lids"
    ],
    benefits: [
      "Highly cost-effective for high-volume public transit",
      "Tight lid fitment that prevents spills during movement",
      "100% biodegradable, reducing trackside litter accumulation",
      "Keeps meals hot and fresh for long travel times"
    ],
    useCase: {
      title: "National Railway Cleanliness Campaign",
      description: "A regional transit network replaced aluminum foil and plastic trays with Vegnar Green's sugarcane bagasse compartment trays. Trackside litter decreased significantly, and station cleaning crews reported that bagasse waste was easier to manage because it composted naturally."
    }
  },
  {
    id: "hospitals",
    title: "Hospitals & Healthcare Facilities",
    icon: HeartPulse,
    image: "/assets/img/industries/bagasse_hospital.png",
    subtitle: "Sterile, Hygienic, and Safe Patient Food Service",
    overview: "Hospitals, nursing homes, and healthcare facilities prioritize patient safety and hygiene. Tableware must be clean, free of chemical contaminants, easy for patients to handle, and simple to dispose of to prevent cross-contamination.",
    challenges: "Reusable tableware requires high-temperature sanitizing, which is resource-intensive. Normal paper plates can leach chemical dyes and additives, while plastic containers can leach endocrine-disrupting chemicals when reheated, posing risks to patients.",
    howWeHelp: "Vegnar Green's bagasse products are sterilized during manufacturing, ensuring they are clean and hygienic. They contain no chemical additives, dyes, or plasticizers, providing a safe, toxin-free surface for patient meals.",
    recommended: [
      "Patient Room Compartment Trays",
      "Lidded Bowls for soups and broths",
      "Hygienic Medicine and Water Cups",
      "Lidded Food Containers for specialized diets"
    ],
    benefits: [
      "Sterilized manufacturing that ensures clean packaging",
      "100% chemical-free, preventing toxic leaching into hot food",
      "Stable, non-slip base that is easy for patients to use",
      "Easy single-use disposal that minimizes cross-infection risk"
    ],
    useCase: {
      title: "Hospital Cafeteria Waste diversion",
      description: "A private hospital group switched to Vegnar Green's bagasse trays for all patient room services. This eliminated the electricity and water costs of industrial washing machines, guaranteed clean tableware for patients, and diverted 100% of patient food waste to a local compost partner."
    }
  },
  {
    id: "schools",
    title: "Schools, Colleges & Universities",
    icon: GraduationCap,
    image: "/assets/img/industries/bagasse_school.png",
    subtitle: "Eco-Friendly Dining for Canteens and Campus Food Courts",
    overview: "Educational institutions are centers of sustainability. Today's students are highly conscious of climate issues and expect their schools to reduce waste. Cafeterias require durable, affordable tableware that can withstand the daily rush of student lunch hours.",
    challenges: "Schools operate on tight budgets, making expensive eco-friendly options impractical. Student cafeterias generate large volumes of trash, causing high waste disposal fees and overflowing bins.",
    howWeHelp: "We offer cost-effective, high-volume bagasse plates and trays that fit school budgets. They are sturdy enough for students and help institutions set up waste diversion programs by composting tableware and food waste together.",
    recommended: [
      "3-Compartment School Lunch Trays",
      "Medium Lunch Plates (9-inch)",
      "Soup and Oatmeal Bowls",
      "Biodegradable Drink Cups"
    ],
    benefits: [
      "Page range budget friendly pricing",
      "Durable build that resists rough handling by children",
      "Complements university green campus initiatives",
      "Compostable with cafeteria organic waste"
    ],
    useCase: {
      title: "Green Campus Initiative",
      description: "A university campus with 15,000 students replaced polystyrene trays with Vegnar Green's 3-compartment bagasse canteens. This move saved 5 tons of plastic waste annually, and the university used the resulting compost on campus landscaping, creating a closed-loop system."
    }
  },
  {
    id: "corporate",
    title: "Corporate Cafeterias & Industrial Canteens",
    icon: Building2,
    image: "/assets/img/industries/bagasse_corporate.png",
    subtitle: "Sustainable Dining for Modern Workplaces",
    overview: "Multinational corporations and manufacturing facilities are setting zero-waste-to-landfill goals. Corporate cafeterias and canteens serve thousands of employees daily, presenting a major opportunity to reduce single-use waste.",
    challenges: "Corporate offices generate large volumes of paper and plastic waste during lunch hours. Reusable mugs and plates require high dishwashing labor and energy costs. Employees expect premium dining choices that reflect the company's commitment to sustainability.",
    howWeHelp: "Our bagasse compartment trays and plates provide a professional dining experience that fits office food courts. They simplify waste sorting, reduce disposal costs, and help companies show visible commitment to their green goals.",
    recommended: [
      "4-Compartment and 5-Compartment Trays",
      "Medium Plates (9-inch and 10-inch)",
      "Portion Bowls for sides and salads",
      "Compostable Cups with matching lids"
    ],
    benefits: [
      "Supports corporate CSR and ESG reporting targets",
      "Reduces office waste management costs",
      "Eliminates the water and energy costs of dishwashing",
      "Enables employees to participate in eco-friendly actions"
    ],
    useCase: {
      title: "Tech Park Waste Reduction",
      description: "A large technology park replaced plastic and paper plates in its central food court with Vegnar Green's bagasse products. By placing compost bins next to tables, they diverted 8 tons of waste monthly, lowered trash pickup costs, and boosted employee satisfaction ratings."
    }
  },
  {
    id: "events",
    title: "Event Management & Wedding Industry",
    icon: Sparkles,
    image: "/assets/img/industries/bagasse_events.png",
    subtitle: "Premium Tableware for Green Weddings and Festivals",
    overview: "The wedding and event industry is moving toward zero-waste celebrations. Planners, designers, and hosts want beautiful event settings that do not generate mountains of plastic waste.",
    challenges: "Planners need tableware that matches the design of premium weddings and events. Reusable tableware involves complex logistics, storage, and transport, while cheap paper plates bend and ruin the dining experience.",
    howWeHelp: "Vegnar Green's textured bagasse plates and bowls offer a clean, natural look that matches elegant table settings. After the event, the plates can be collected and composted, simplifying cleanup.",
    recommended: [
      "Premium Textured Salad Plates",
      "Oval Platters and Snack Trays",
      "Elegant Bowls for desserts and soups",
      "Uniform Cups and Cutlery Trays"
    ],
    benefits: [
      "Natural ivory look that fits luxury event designs",
      "Strong build that handles heavy buffet portions",
      "Saves time and labor on post-event cleanup",
      "Provides a clean, eco-friendly experience for guests"
    ],
    useCase: {
      title: "Zero-Waste Beach Wedding",
      description: "An event planner designed a 500-guest beach wedding using Vegnar Green's textured plates and bowls. This eliminated plastic from the beach, matched the natural design, and allowed all tableware to be composted at a local organic farm."
    }
  },
  {
    id: "retail",
    title: "Retail Chains & Supermarkets",
    icon: ShoppingBag,
    image: "/assets/img/industries/bagasse_retail.png",
    subtitle: "Sustainable Packaging for Ready-to-Eat Food Sections",
    overview: "Supermarkets and retail food chains feature busy grab-and-go delis, salad bars, and prepared food sections. Packaging must keep food fresh on shelves, display items clearly, and meet retail standards.",
    challenges: "Prepared foods must look fresh to attract shoppers. Salad and deli containers must withstand cold storage without leaking or absorbing moisture. Single-use plastic packaging is facing bans and consumer opposition.",
    howWeHelp: "We offer bagasse bowls and trays that can be paired with clear compostable lids, giving customers a clear view of the food while using plastic-free packaging.",
    recommended: [
      "Deli Containers (250ml to 750ml)",
      "Salad Bowls with transparent compostable lids",
      "Rectangular Trays for bakery and fresh produce",
      "Hinged Clamshells for hot retail food"
    ],
    benefits: [
      "Freezer and refrigerator safe, maintaining strength in cold storage",
      "Stackable design that maximizes display shelf space",
      "Clean, natural appearance that highlights fresh ingredients",
      "Matches the preferences of eco-conscious shoppers"
    ],
    useCase: {
      title: "Supermarket Deli Transition",
      description: "A national supermarket chain replaced plastic deli tubs with Vegnar Green's bagasse bowls and clear bio-lids in their salad section. The change maintained shelf life, improved visual appeal, and helped the brand achieve its goal of reducing plastic packaging by 30%."
    }
  },
  {
    id: "fmcg",
    title: "FMCG & Food Manufacturing Industry",
    icon: Boxes,
    image: "/assets/img/industries/bagasse_fmcg.png",
    subtitle: "Precision-Molded Industrial Food Packaging",
    overview: "Food manufacturers and FMCG companies require packaging that fits high-speed automated filling lines, keeps food fresh, and complies with international food safety standards.",
    challenges: "Industrial food packaging must meet strict chemical safety regulations. Custom inserts must be uniform to prevent jams in wrapping machinery, and materials must withstand temperature extremes.",
    howWeHelp: "Vegnar Green manufactures custom, precision-molded bagasse inserts and trays. Designed to fit automated packaging lines, they protect food items while providing a plastic-free packaging solution.",
    recommended: [
      "Custom Packaging Inserts",
      "Frozen Food Trays for microwave meals",
      "Dry Food Packaging Trays",
      "Compartment Trays for biscuits and cookies"
    ],
    benefits: [
      "Custom-designed shapes to fit specific product lines",
      "Consistent size and shape for high-speed automated packaging",
      "Oven and microwave safe for ready-to-heat meals",
      "Complies with global food-contact safety standards"
    ],
    useCase: {
      title: "Eco-Friendly Frozen Meal Packaging",
      description: "A frozen food brand replaced plastic trays with Vegnar Green's custom bagasse trays. The new trays allowed consumers to heat meals in the oven or microwave, while the brand used the plastic-free packaging to gain new listings in eco-focused retail chains."
    }
  },
  {
    id: "cosmetics",
    title: "Cosmetic & Personal Care Industry",
    icon: Sparkles,
    image: "/assets/img/industries/bagasse_cosmetics.png",
    subtitle: "Premium Sugarcane Pulp Packaging for Beauty Products",
    overview: "Luxury and organic beauty brands are replacing plastic packaging inserts and gift boxes. Sustainable cosmetics brands want packaging that reflects the natural purity of their products.",
    challenges: "Traditional plastic vacuum-formed inserts look cheap and conflict with natural brand claims. Gift sets require strong, custom-shaped inserts to protect glass bottles and jars during shipping.",
    howWeHelp: "We design custom-molded sugarcane bagasse inserts and presentation trays. With a smooth, clean texture, they protect cosmetics during shipping while providing an elegant unboxing experience.",
    recommended: [
      "Custom Packaging Inserts for glass jars and bottles",
      "Gift Box Presentation Trays",
      "Cosmetic Display Trays",
      "Sample Kit Holders"
    ],
    benefits: [
      "Premium, natural texture that matches organic brand images",
      "Precision-molded fit that keeps products secure",
      "Biodegradable, compostable, and plastic-free",
      "Strong cushioning that protects fragile items"
    ],
    useCase: {
      title: "Luxury Organic Skincare Packaging",
      description: "An organic skincare brand replaced plastic inner trays in their holiday gift sets with Vegnar Green's custom bagasse inserts. The brand enhanced its premium presentation, received positive customer reviews for the plastic-free packaging, and met its sustainable packaging goals."
    }
  },
  {
    id: "corporate-gifting",
    title: "Corporate Gifting Industry",
    icon: Gift,
    image: "/assets/img/industries/bagasse_gifting.png",
    subtitle: "Eco-Friendly Packaging for Corporate Gift Hamper Sets",
    overview: "Corporate gifting suppliers and agencies create curated gift sets for businesses. Packaging must display gifts beautifully, protect items, and convey the sender's environmental values.",
    challenges: "Gift packaging is often discarded immediately, generating waste. Corporate buyers want packaging that reflects their commitment to sustainability and leaves a lasting positive impression on recipients.",
    howWeHelp: "Our sugarcane bagasse presentation trays offer a clean, premium look for corporate gifts, doubling as functional, compostable trays that add value to the gift.",
    recommended: [
      "Custom Presentation Trays",
      "Divided Gift Box Inserts",
      "Premium Hamper Trays",
      "Eco-Friendly Display Platters"
    ],
    benefits: [
      "Premium, clean design that presents gifts professionally",
      "Strong construction that keeps items organized and safe",
      "Earthy, natural appearance that highlights sustainability",
      "Custom embossing options for company logos"
    ],
    useCase: {
      title: "Corporate Holiday Gift Hampers",
      description: "A major tech company selected Vegnar Green's custom-embossed bagasse presentation trays for their annual employee gifts. The clean, plastic-free design was well-received by staff and highlighted the company's commitment to reducing waste."
    }
  },
  {
    id: "organic-brands",
    title: "Organic & Natural Product Brands",
    icon: Leaf,
    image: "/assets/img/industries/bagasse_organic.png",
    subtitle: "100% Natural, Unbleached Packaging Solutions",
    overview: "Organic food, wellness, and lifestyle brands target eco-conscious consumers who read labels and examine packaging. The packaging must match the natural purity of the product.",
    challenges: "Using plastic packaging contradicts an organic brand's message of purity, which can damage brand trust. Cardboard can absorb moisture and lose shape, while chemicals in standard packaging can leach into products.",
    howWeHelp: "We supply unbleached, natural bagasse trays and containers that offer a raw, clean look, matching the values of organic and natural brands.",
    recommended: [
      "Natural Unbleached Bowls",
      "Raw-Fiber Product Trays",
      "Unbleached Takeaway Containers",
      "Produce Packaging Trays"
    ],
    benefits: [
      "Natural brown/beige look that highlights organic products",
      "100% chemical-free and chlorine-free composition",
      "Aligned with the preferences of eco-conscious consumers",
      "Completely compostable, leaving no chemical residues"
    ],
    useCase: {
      title: "Artisanal Soap Packaging",
      description: "An organic wellness brand used Vegnar Green's unbleached bagasse trays to package and display their soap bars. The packaging matched the brand's natural aesthetic, protected the product from moisture, and helped the brand gain shelf space in specialty organic markets."
    }
  }
];

const whyChooseUsData = [
  {
    title: "100% Compostable",
    description: "Fully breaks down into nutrient-rich soil within 60-90 days in commercial facilities, leaving no toxic residue or microplastics behind."
  },
  {
    title: "Biodegradable",
    description: "Decomposes naturally in home composting piles and soil within 90-180 days, offering a safe return to the earth."
  },
  {
    title: "Plastic-Free",
    description: "Contains zero plastic linings, wax coatings, or petroleum-based additives. Made entirely from renewable sugarcane fiber."
  },
  {
    title: "Food Safe",
    description: "FDA approved for direct food contact. Naturally sterile, odorless, and free of harmful chemicals like BPA, phthalates, and chlorine."
  },
  {
    title: "Microwave Safe",
    description: "Can be heated safely in microwave ovens up to 220°F (104°C) without melting, warping, or leaching chemicals."
  },
  {
    title: "Freezer Safe",
    description: "Withstands low temperatures down to -20°C, making our containers suitable for frozen food storage and meal prep."
  },
  {
    title: "Leak Resistant",
    description: "Naturally grease-resistant and water-resistant. Holds liquids, hot soups, and oily foods without leaking or becoming soft."
  },
  {
    title: "Export Quality",
    description: "Manufactured to meet international standards. Certified by TÜV Austria (OK Compost), SGS, and FDA for export globally."
  },
  {
    title: "Bulk Manufacturing",
    description: "Our state-of-the-art facility in Gujarat, India, features fully automated production lines producing over 500,000 pieces per day."
  },
  {
    title: "OEM & Private Label",
    description: "We offer customized shapes, sizes, and weights to meet specific brand needs, including custom logo embossing."
  },
  {
    title: "Global Shipping",
    description: "We ship worldwide, offering full container load (FCL) supply, custom logistics support, and smooth export services."
  },
  {
    title: "Sustainable Manufacturing",
    description: "Powered by efficient, clean processes that minimize carbon emissions and upcycle agricultural waste into high-value products."
  }
];

export default function IndustriesClientPage() {
  const [activeSection, setActiveSection] = useState("restaurants");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const industry of industries) {
        const el = sectionRefs.current[industry.id];
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(industry.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = sectionRefs.current[id];
    if (el) {
      const yOffset = -90; // account for fixed header
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveSection(id);
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "What industries can benefit most from shifting to sugarcane bagasse products?",
      answer: "A wide range of industries benefit from sugarcane bagasse packaging, including restaurants, cloud kitchens, hotels, catering companies, QSRs, airlines, railways, hospitals, educational institutions, retail chains, food manufacturers, cosmetics brands, and organic product companies. Any business looking to reduce plastic waste, comply with environmental laws, or improve its brand image can use bagasse products."
    },
    {
      question: "Are Vegnar Green bagasse tableware and packaging products food-safe?",
      answer: "Yes. Our bagasse products are manufactured from 100% natural, renewable sugarcane fiber with zero plastic, wax linings, or harmful chemicals. They are FDA-approved for direct food contact, SGS-tested, and chemical-free, ensuring they do not leach toxins into hot or cold foods."
    },
    {
      question: "Can sugarcane bagasse products fully replace plastic and styrofoam packaging?",
      answer: "Yes, our bagasse products are designed to replace plastic and styrofoam (EPS). They offer similar rigidity, are naturally water and oil resistant, and are microwave and freezer safe. This makes them a durable alternative for hot, cold, wet, or greasy foods."
    },
    {
      question: "Are your sustainable packaging solutions suitable for international exports?",
      answer: "Yes. As a leading exporter from India, Vegnar Green manufactures products that meet international standards. We hold global certifications including OK Compost (TÜV Austria) for commercial and home composting, FDA compliance, and SGS test reports. We regularly ship full container loads to North America, Europe, the Middle East, and Australia."
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
      answer: "Our MOQ depends on whether you require standard products or custom molds. For standard catalog items, the wholesale MOQ typically starts at 10,000 pieces or a minimum of one pallet. For custom OEM orders requiring new molds, the MOQ is higher. Contact our team to discuss your specific requirements."
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
    <div className="w-full bg-[#fafdfb] text-gray-800 font-sans">
      
      {/* ================= HERO SECTION ================= */}
      <section 
        className="relative text-white py-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/img/catalog-bg.jpg')",
        }}
      >
        {/* Neutral dark overlay for text readability - no green tint */}
        <div className="absolute inset-0 bg-black/50 z-0"></div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="inline-block bg-[#2B7A5B]/30 border border-[#7ED6A3]/30 text-[#7ED6A3] text-xs sm:text-sm font-semibold rounded-full px-4 py-1.5 mb-6 uppercase tracking-wider">
            VEGNAR GREEN | SUSTAINABLE PACKAGING SOLUTIONS
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-none">
            Industries We Serve
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-[#ccebda] font-medium max-w-4xl mx-auto mb-8 leading-relaxed">
            Sustainable Bagasse Packaging Solutions for Modern Businesses Worldwide
          </p>
          <p className="text-base sm:text-lg text-gray-200 max-w-3xl mx-auto mb-10 leading-relaxed">
            Vegnar Green helps businesses across multiple industries transition from plastic and foam packaging to eco-friendly sugarcane bagasse products. Our solutions maintain quality, durability, and customer experience, supporting B2B buyers, distributors, wholesalers, importers, restaurant chains, hotels, caterers, food manufacturers, and organizations looking to implement sustainable packaging.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Link 
              href="/quote"
              className="w-full sm:w-auto bg-[#1a7a2b] hover:bg-[#0f5a1f] text-white text-base font-bold rounded-full px-8 py-4 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
            >
              Request Bulk Pricing
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link 
              href="/contact"
              className="w-full sm:w-auto bg-transparent border-2 border-white hover:bg-white hover:text-[#004d1c] text-white text-base font-bold rounded-full px-8 py-4 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Contact Our Team
            </Link>
            <a 
              href="/assets/downloads/Vegnar-greens-sugarcane-bagasse-tableware.pdf"
              download
              className="w-full sm:w-auto bg-[#2B7A5B]/30 hover:bg-[#2B7A5B]/50 border border-white/20 text-[#7ED6A3] hover:text-white text-base font-semibold rounded-full px-8 py-4 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Get Product Catalog
            </a>
          </div>
        </div>
      </section>

      {/* ================= INTRODUCTION SECTION ================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <span className="text-sm font-bold text-[#1a7a2b] uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#1a7a2b]"></span>
                The Sustainable Shift
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#004d1c] tracking-tight">
                Why Global Industries Are Transitioning To Sugarcane Bagasse
              </h2>
              <p className="text-gray-600 leading-relaxed text-justify">
                Sugarcane bagasse is the fibrous residue left after extracting juice from sugarcane. Traditionally treated as agricultural waste and burned—which contributes to air pollution—bagasse is now upcycled into durable tableware and packaging. 
              </p>
              <p className="text-gray-600 leading-relaxed text-justify">
                Strict regulations on single-use plastics, including plastic bans and taxes, are driving businesses to adopt compostable options. Consumers are also actively supporting eco-friendly brands, creating high global demand for compostable food packaging.
              </p>
              <p className="text-gray-600 leading-relaxed text-justify">
                Vegnar Green supports businesses globally with export-quality, food-safe bagasse tableware. Our products are biodegradable, compostable, and plastic-free, helping companies reduce plastic pollution and meet sustainability goals without compromising on packaging quality.
              </p>
            </div>

            <div className="bg-[#f0fbf4] border border-[#d2f0dd] rounded-3xl p-8 sm:p-10 space-y-6">
              <h3 className="text-xl sm:text-2xl font-bold text-[#004d1c] flex items-center gap-3">
                <Leaf className="text-[#1a7a2b] w-7 h-7 flex-shrink-0" />
                Key Benefits of Bagasse Tableware
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-bold text-[#004d1c]">
                    <CheckCircle2 className="w-5 h-5 text-[#1a7a2b] flex-shrink-0" />
                    100% Compostable
                  </div>
                  <p className="text-sm text-gray-600">Decomposes in 60-90 days in industrial facilities, returning nutrients to the soil.</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-bold text-[#004d1c]">
                    <CheckCircle2 className="w-5 h-5 text-[#1a7a2b] flex-shrink-0" />
                    Microwave & Freezer Safe
                  </div>
                  <p className="text-sm text-gray-600">Withstands temperatures from -20°C up to 120°C without leaking or warping.</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-bold text-[#004d1c]">
                    <CheckCircle2 className="w-5 h-5 text-[#1a7a2b] flex-shrink-0" />
                    Naturally Leak Resistant
                  </div>
                  <p className="text-sm text-gray-600">Resists water and oil absorption, holding hot soups and greasy foods easily.</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-bold text-[#004d1c]">
                    <CheckCircle2 className="w-5 h-5 text-[#1a7a2b] flex-shrink-0" />
                    Zero Toxic Leaching
                  </div>
                  <p className="text-sm text-gray-600">Contains no BPA, plasticizers, or chlorine. Completely safe for hot meals.</p>
                </div>
              </div>

              <div className="border-t border-[#d2f0dd] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-gray-700">Looking for a certified supplier?</p>
                  <p className="text-xs text-gray-500">We hold OK Compost, FDA, and SGS certifications.</p>
                </div>
                <Link 
                  href="/quote" 
                  className="bg-[#004d1c] hover:bg-[#003814] text-white text-sm font-bold py-2.5 px-5 rounded-full transition-colors inline-flex items-center gap-1.5"
                >
                  Get Certified Samples
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= INDUSTRIES GRID & NAV PAGE SYSTEM ================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-bold text-[#1a7a2b] uppercase tracking-wider">Explore Our Targeted Industry Applications</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#004d1c] mt-2 mb-4">
              Premium Sustainable Packaging Applications
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
              Select a category below to explore real-world deployment cases, specific operational challenges, recommended products, and custom commercial benefits.
            </p>
          </div>

          {/* Premium HD Category Cards Showcase */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {industries.map((ind) => {
              const IconComp = ind.icon;
              return (
                <div
                  key={ind.id}
                  onClick={() => scrollToSection(ind.id)}
                  className={`group relative h-80 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer ${
                    activeSection === ind.id 
                      ? "ring-4 ring-[#1a7a2b]" 
                      : "hover:border-[#1a7a2b]"
                  }`}
                >
                  {/* HD Image Background */}
                  <img
                    src={ind.image}
                    alt={ind.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                  
                  {/* Floating Icon badge */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#1a7a2b] w-10 h-10 rounded-xl flex items-center justify-center shadow-sm">
                    <IconComp className="w-5 h-5" />
                  </div>

                  {/* Card Content at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <h3 className="font-extrabold text-lg sm:text-xl tracking-tight leading-snug mb-1">
                      {ind.title}
                    </h3>
                    <p className="text-xs text-[#7ED6A3] font-semibold tracking-wider uppercase mb-2">
                      {ind.subtitle}
                    </p>
                    <div className="flex items-center gap-1 text-xs font-bold text-gray-200 group-hover:text-white transition-colors pt-2 border-t border-white/10 mt-1">
                      Explore Section
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ---------------- Split-Screen Main Display ---------------- */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Sidebar Sticky Navigation (visible on lg screens) */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-28 bg-white border border-gray-200 rounded-3xl p-6 space-y-2 shadow-sm">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-3 mb-4">Industries List</h3>
                <div className="max-h-[60vh] overflow-y-auto pr-2 space-y-1 scrollbar-thin scrollbar-thumb-gray-200">
                  {industries.map((ind) => {
                    const IconComp = ind.icon;
                    return (
                      <button
                        key={ind.id}
                        onClick={() => scrollToSection(ind.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-sm font-semibold transition-all duration-150 ${
                          activeSection === ind.id
                            ? "bg-[#1a7a2b] text-white shadow-sm"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                      >
                        <IconComp className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{ind.title}</span>
                      </button>
                    );
                  })}
                </div>
                <div className="pt-4 border-t border-gray-100 mt-4">
                  <Link 
                    href="/quote"
                    className="w-full bg-[#004d1c] hover:bg-[#003814] text-white text-xs font-bold py-3 px-4 rounded-xl text-center block transition-colors"
                  >
                    Request Custom Molds
                  </Link>
                </div>
              </div>
            </div>

            {/* Detailed Content Panels (takes 3 cols on lg screens) */}
            <div className="lg:col-span-3 space-y-16">
              {industries.map((ind, index) => {
                const IconComp = ind.icon;
                const isEven = index % 2 === 0;
                return (
                  <article
                    key={ind.id}
                    ref={(el) => { sectionRefs.current[ind.id] = el; }}
                    className="bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow p-8 sm:p-10 scroll-mt-28"
                  >
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100 mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-[#f0fbf4] text-[#1a7a2b] flex items-center justify-center shadow-inner">
                          <IconComp className="w-8 h-8" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-extrabold text-[#004d1c]">{ind.title}</h3>
                          <p className="text-sm font-semibold text-[#1a7a2b]">{ind.subtitle}</p>
                        </div>
                      </div>
                    </div>

                    {/* Alternating Split Column Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
                      
                      {/* Image + Use Case Column (Alternates placement) */}
                      <div className={`lg:col-span-2 space-y-6 ${!isEven ? 'lg:order-2' : ''}`}>
                        <div className="relative rounded-2xl overflow-hidden shadow-md aspect-[4/3] w-full bg-gray-100">
                          <img
                            src={ind.image}
                            alt={ind.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        
                        {ind.useCase && (
                          <div className="bg-[#f0fbf4] border border-[#d2f0dd] rounded-2xl p-5 shadow-sm">
                            <span className="text-[10px] font-bold text-[#1a7a2b] bg-white px-2.5 py-0.5 rounded-full border border-[#d2f0dd] uppercase tracking-wider">
                              Real Use Case
                            </span>
                            <h5 className="font-bold text-gray-800 text-sm mt-3 mb-1">{ind.useCase.title}</h5>
                            <p className="text-xs text-gray-600 leading-relaxed text-justify">{ind.useCase.description}</p>
                          </div>
                        )}
                      </div>

                      {/* Text details column */}
                      <div className={`lg:col-span-3 space-y-6 ${!isEven ? 'lg:order-1' : ''}`}>
                        <div>
                          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Industry Overview</h4>
                          <p className="text-gray-600 leading-relaxed text-justify text-sm sm:text-base">{ind.overview}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-xs font-bold text-red-500 uppercase tracking-widest mb-1.5">Operational Challenges</h4>
                          <p className="text-gray-600 leading-relaxed text-justify text-sm sm:text-base">{ind.challenges}</p>
                        </div>

                        <div>
                          <h4 className="text-xs font-bold text-[#1a7a2b] uppercase tracking-widest mb-1.5">How Vegnar Green Helps</h4>
                          <p className="text-gray-700 leading-relaxed text-justify text-sm sm:text-base font-semibold">{ind.howWeHelp}</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                          <div>
                            <h4 className="text-xs font-bold text-[#004d1c] uppercase tracking-wider mb-2.5">Recommended Products</h4>
                            <ul className="space-y-1.5">
                              {ind.recommended.map((prod, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-xs text-gray-700 font-semibold bg-gray-50 px-2.5 py-1.5 rounded-lg border border-gray-200/50">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#1a7a2b]"></span>
                                  {prod}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="text-xs font-bold text-[#004d1c] uppercase tracking-wider mb-2.5">Key Benefits</h4>
                            <ul className="space-y-1.5">
                              {ind.benefits.map((ben, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-xs text-gray-600 leading-tight">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1a7a2b] flex-shrink-0 mt-0.5" />
                                  <span>{ben}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                      </div>

                    </div>
                  </article>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE VEGNAR GREEN ================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-bold text-[#1a7a2b] uppercase tracking-wider">Uncompromising Standards</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#004d1c] mt-2 mb-4">
              Why Choose Vegnar Green Tableware & Packaging?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              As a leading sugarcane bagasse products manufacturer, we combine advanced manufacturing, certified food safety, and global shipping capabilities to support bulk commercial requirements worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUsData.map((item, idx) => (
              <div key={idx} className="bg-[#fcfefe] border border-gray-100 hover:border-[#1a7a2b]/30 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#f0fbf4] text-[#1a7a2b] flex items-center justify-center mb-4 group-hover:bg-[#1a7a2b] group-hover:text-white transition-colors">
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
      <section className="bg-gradient-to-br from-[#004d1c] to-[#043317] text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-[#7ED6A3] text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                <Leaf className="w-4.5 h-4.5" />
                Commitment to Circular Economy
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Our Ongoing Environmental Responsibility
              </h2>
              <p className="text-gray-200 leading-relaxed text-justify">
                At Vegnar Green, sustainability is the foundation of our business. Upcycling sugarcane bagasse allows us to turn agricultural residue into high-value food packaging. This circular approach helps keep carbon stored in physical products instead of being released through crop burning.
              </p>
              <p className="text-gray-200 leading-relaxed text-justify">
                Our manufacturing process is designed to minimize water and energy use. By replacing plastic and styrofoam packaging with compostable alternatives, we help reduce the plastic waste that clogs oceans and landfills.
              </p>
              
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="border-l-4 border-[#7ED6A3] pl-4">
                  <p className="text-3xl font-extrabold">100%</p>
                  <p className="text-xs text-[#ccebda] font-semibold uppercase">Renewable Raw Materials</p>
                </div>
                <div className="border-l-4 border-[#7ED6A3] pl-4">
                  <p className="text-3xl font-extrabold">-70%</p>
                  <p className="text-xs text-[#ccebda] font-semibold uppercase">Lower Carbon Footprint vs Plastic</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-8 sm:p-10 space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Shield className="text-[#7ED6A3] w-6 h-6" />
                Environmental Impact Benchmarks
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-[#2B7A5B]/50 p-1.5 rounded-lg text-[#7ED6A3] mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Landfill Waste Reduction</h4>
                    <p className="text-xs text-gray-200">Our products break down naturally, leaving behind zero microplastics or hazardous materials.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-[#2B7A5B]/50 p-1.5 rounded-lg text-[#7ED6A3] mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Agricultural Upcycling</h4>
                    <p className="text-xs text-gray-200">We source bagasse fiber from local farmers, giving them additional income and preventing crop burning.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-[#2B7A5B]/50 p-1.5 rounded-lg text-[#7ED6A3] mt-0.5">
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="relative rounded-3xl overflow-hidden h-96 shadow-lg order-2 lg:order-1">
              {/* Fallback pattern for map or image */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#f0fbf4] to-[#ccebda] flex flex-col items-center justify-center p-8 text-center">
                <Globe className="w-24 h-24 text-[#1a7a2b] mb-4 animate-pulse" />
                <h3 className="font-bold text-[#004d1c] text-xl mb-2">Connecting Global Ports</h3>
                <p className="text-xs text-gray-600 max-w-sm">Shipping from Gujarat, India, to destinations in the USA, Canada, UK, Europe, Middle East, and Australia.</p>
                <div className="flex gap-2 mt-6 flex-wrap justify-center">
                  <span className="bg-white/80 border border-gray-200 px-3 py-1 rounded-full text-xs font-semibold">TÜV Certified</span>
                  <span className="bg-white/80 border border-gray-200 px-3 py-1 rounded-full text-xs font-semibold">FDA Compliant</span>
                  <span className="bg-white/80 border border-gray-200 px-3 py-1 rounded-full text-xs font-semibold">SGS Tested</span>
                </div>
              </div>
            </div>

            <div className="space-y-6 order-1 lg:order-2">
              <span className="text-sm font-bold text-[#1a7a2b] uppercase tracking-wider flex items-center gap-2">
                <Globe className="w-4 h-4" />
                International Trade Partner
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#004d1c] tracking-tight">
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
                  <CheckCircle2 className="w-5 h-5 text-[#1a7a2b]" />
                  <span>Distributor Partnerships & Wholesale Programs</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#1a7a2b]" />
                  <span>Support with Import Documentation & Custom Clearance</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#1a7a2b]" />
                  <span>FCL Container Load Supply & LCL Console Shipments</span>
                </div>
              </div>

              <div className="pt-4">
                <Link 
                  href="/quote"
                  className="bg-[#004d1c] hover:bg-[#003814] text-white text-base font-bold rounded-full px-8 py-3.5 transition-colors inline-flex items-center gap-2 group"
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 border-t border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-bold text-[#1a7a2b] uppercase tracking-wider">Answers to Common Questions</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#004d1c] mt-2 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600">
              Find detailed answers about our bagasse manufacturing, certifications, custom capabilities, and shipping processes.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-100 last:border-none">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full py-5 px-6 sm:px-8 flex justify-between items-center text-left hover:bg-[#f0fbf4]/30 transition-colors group"
                >
                  <span className="font-bold text-gray-800 pr-4 group-hover:text-[#1a7a2b] transition-colors text-sm sm:text-base">
                    {faq.question}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-[#1a7a2b] flex-shrink-0 transition-transform ${openFaq === index ? "rotate-180" : ""}`} />
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
              <Link href="/contact" className="text-[#1a7a2b] hover:text-[#0f5a1f] font-bold text-sm flex items-center gap-1.5">
                <Mail className="w-4 h-4" />
                Write to Us
              </Link>
              <span className="text-gray-300 hidden sm:inline">|</span>
              <a href="tel:+919998040373" className="text-[#1a7a2b] hover:text-[#0f5a1f] font-bold text-sm flex items-center gap-1.5">
                <Phone className="w-4 h-4" />
                Call +91-9998040373
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA SECTION ================= */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#043317] to-[#002b10] text-white text-center overflow-hidden">
        {/* Background Glowing Orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#7ED6A3]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-4xl mx-auto relative z-10 space-y-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Ready to Switch to Sustainable Packaging?
          </h2>
          <p className="text-base sm:text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Partner with Vegnar Green for your wholesale, export, distributor, and OEM packaging needs. Contact us to receive wholesale pricing, a product catalog, or to request custom samples.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-4">
            <Link 
              href="/quote"
              className="w-full sm:w-auto bg-[#1a7a2b] hover:bg-[#0f5a1f] text-white text-base font-bold rounded-full px-8 py-4 transition-all duration-300 shadow-md hover:shadow-lg inline-block"
            >
              Request a Quote
            </Link>
            <a 
              href="/assets/downloads/Vegnar-greens-sugarcane-bagasse-tableware.pdf"
              download
              className="w-full sm:w-auto bg-[#2B7A5B]/30 hover:bg-[#2B7A5B]/50 border border-white/20 text-[#7ED6A3] hover:text-white text-base font-bold rounded-full px-8 py-4 transition-all duration-300 inline-block"
            >
              Download Product Catalog
            </a>
            <Link 
              href="/contact"
              className="w-full sm:w-auto bg-transparent border-2 border-white hover:bg-white hover:text-[#004d1c] text-white text-base font-bold rounded-full px-8 py-4 transition-all duration-300 inline-block"
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
