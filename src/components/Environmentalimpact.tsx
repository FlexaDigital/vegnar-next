import React from 'react';
import {
  GiSprout,
  GiCancel,
  GiHourglass,
  GiRecycle,
  GiWaterDrop,
} from "react-icons/gi";

const environmentalImpactData = [
  {
    icon: <GiRecycle size={40} className="text-green-600" />,
    value: "12M",
    description: "Plastic items prevented",
  },
  
  {
    icon: <GiHourglass size={40} className="text-green-600" />,
    value: "850T",
    description: "Agricultural waste upcycled",
  },
  {
    icon: <GiCancel size={40} className="text-green-600" />,
    value: "3,600T",
    description: "CO₂ emissions prevented",
  },
  {
    icon: <GiWaterDrop size={40} className="text-green-600" />,
    value: "1.2M",
    description: "Liters of water saved",
  }
];

const EnvironmentalImpact = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 text-center">
      <h2 className="text-3xl font-extrabold mb-3">Our Environmental Impact</h2>
      <p className="text-slate-600 max-w-xl mx-auto mb-10 text-base">
        We believe in transparency and measurable results. Here's the positive
        environmental impact we've created together with our customers since
        2020:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {environmentalImpactData.map((impact, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="mx-auto w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
              {impact.icon}
            </div>
            <h3 className="text-3xl font-bold mb-2 text-green-800">{impact.value}</h3>
            <p className="text-slate-600 text-base">{impact.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EnvironmentalImpact;
