import React from 'react';
import {
  GiSprout,
  GiCancel,
  GiHourglass,
  GiRecycle,
} from "react-icons/gi";

const environmentalImpactData = [
  {
    icon: <GiRecycle size={32} className="text-green-600" />,
    value: "5.2M",
    description: "Plastic items prevented",
  },
  {
    icon: <GiSprout size={32} className="text-green-600" />,
    value: "100K+",
    description: "Trees planted worldwide",
  },
  {
    icon: <GiHourglass size={32} className="text-green-600" />,
    value: "850T",
    description: "Agricultural waste upcycled",
  },
  {
    icon: <GiCancel size={32} className="text-green-600" />,
    value: "3,600T",
    description: "CO₂ emissions prevented",
  },
];

const EnvironmentalImpact = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 text-center">
      <h2 className="text-2xl font-extrabold mb-3">Our Environmental Impact</h2>
      <p className="text-slate-600 max-w-xl mx-auto mb-10 text-sm">
        We believe in transparency and measurable results. Here's the positive
        environmental impact we've created together with our customers since
        2020:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {environmentalImpactData.map((impact, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
            <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              {impact.icon}
            </div>
            <h3 className="text-xl font-bold mb-1">{impact.value}</h3>
            <p className="text-slate-600 text-sm">{impact.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EnvironmentalImpact;
