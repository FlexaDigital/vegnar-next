import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";

const FAQsPage = () => {
  const [faqExpanded, setFaqExpanded] = useState({
    "How long do these plates take to decompose?": false,
    "Are these plates microwave safe?": false,
    "Do you offer custom branding?": false,
    "What are these plates made from?": false,
    "Can I use these plates for hot food?": false,
    "Are these plates recyclable?": false,
    "What sizes do your plates come in?": false,
    "How should I store these plates?": false,
  });

  const faqAnswers = {
    "How long do these plates take to decompose?":
      "Our sugarcane bagasse tableware is designed to decompose naturally within 90 days in commercial composting facilities. In a home composting environment, it may take a bit longer depending on the conditions.",
    "Are these plates microwave safe?":
      "Yes, our sugarcane bagasse plates are generally microwave safe for reheating food. However, we recommend using them for short durations and monitoring them during heating.",
    "Do you offer custom branding?":
      "Yes, we offer custom branding options for bulk orders. Please contact our sales team with your requirements for more details and a quotation.",
    "What are these plates made from?":
      "Our tableware is made from sugarcane bagasse, which is the fibrous residue left after sugarcane stalks are crushed to extract their juice. It's a renewable and sustainable resource.",
    "Can I use these plates for hot food?":
      "Absolutely! Our sugarcane bagasse plates are sturdy and can handle hot food without losing their shape or leaking. They are a great alternative to traditional disposable plates for all types of meals.",
    "Are these plates recyclable?":
      "While our sugarcane bagasse tableware is compostable and biodegradable, it is generally not recyclable in standard paper recycling streams. The focus is on their ability to break down naturally.",
    "What sizes do your plates come in?":
      "We offer a variety of sizes to suit different needs. Our current range includes 6-inch, 7-inch, 9-inch round plates, and compartment plates. Please check our product catalog for the full list of available sizes.",
    "How should I store these plates?":
      "To maintain their quality, store these plates in a cool, dry place away from direct sunlight and moisture. This will help prevent any degradation of the material before use.",
  };

  const toggleFaq = (question) => {
    setFaqExpanded((prevExpanded) => ({
      ...prevExpanded,
      [question]: !prevExpanded[question],
    }));
  };

  return (
    <div className="bg-white text-slate-900 font-sans py-12">
      <div className="max-w-7xl mx-auto p-6 sm:p-10">
        <section className="mt-14 max-w-3xl mx-auto">
          <h3 className="font-semibold text-slate-900 text-2xl sm:text-3xl mb-8 text-center">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            {Object.keys(faqExpanded).map((question) => (
              <div
                key={question}
                className="border border-slate-200 rounded-md overflow-hidden"
              >
                <button
                  aria-expanded={faqExpanded[question]}
                  className="w-full text-left px-4 py-3 text-sm sm:text-base flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-green-500"
                  onClick={() => toggleFaq(question)}
                  type="button"
                >
                  {question}
                  <FontAwesomeIcon
                    icon={faqExpanded[question] ? faChevronUp : faChevronDown}
                    className="text-green-600"
                  />
                </button>
                {faqExpanded[question] && (
                  <div className="px-4 py-3 bg-slate-50 text-slate-700 text-sm sm:text-base">
                    {faqAnswers[question]}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default FAQsPage;
