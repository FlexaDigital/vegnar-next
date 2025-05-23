import {
  FaCertificate,
  FaCheckDouble,
  FaLeaf,
  FaUtensils,
  FaSeedling,
  FaShieldAlt,
} from "react-icons/fa";

const certifications = [
  {
    icon: <FaCertificate className="text-[#2B7A5B] text-3xl" />,
    title: "OKComposite",
  },
  {
    icon: <FaCheckDouble className="text-[#2B7A5B] text-3xl" />,
    title: "SGS Tested",
  },
  {
    icon: <FaLeaf className="text-[#2B7A5B] text-3xl" />,
    title: "Sobar Certified",
  },
  {
    icon: <FaUtensils className="text-[#2B7A5B] text-3xl" />,
    title: "FDA Approved",
  },
  {
    icon: <FaSeedling className="text-[#2B7A5B] text-3xl" />,
    title: "ISO 9001:2015",
  },
  {
    icon: <FaShieldAlt className="text-[#2B7A5B] text-3xl" />,
    title: "ISO 14001:2015",
  },
];

const CertificationsSection = () => {
  return (
    <section className="bg-white text-center px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <div>
          <span className="inline-block bg-[#D4F5E1] text-[#007A3E] text-sm font-semibold rounded-full px-4 py-1 mb-3">
            QUALITY ASSURED
          </span>
        </div>
        <h2 className="text-[#0B4F3B] font-bold text-3xl sm:text-4xl mb-4">
          Our Certifications
        </h2>
        <p className="text-[#4B5563] text-base sm:text-lg max-w-2xl mx-auto mb-12">
          Our products are rigorously tested and certified by leading global
          standards organizations.
        </p>

        {/* Grid with 6 columns on md+ screens */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-y-10 gap-x-6 mb-12 justify-items-center">
          {certifications.map((cert, index) => (
            <div key={index} className="flex flex-col items-center space-y-3">
              <div className="bg-[#D9F2E6] rounded-full w-20 h-20 flex items-center justify-center">
                {cert.icon}
              </div>
              <span className="text-[#0B4F3B] font-semibold text-base">
                {cert.title}
              </span>
            </div>
          ))}
        </div>

        <p className="text-[#4B5563] text-sm sm:text-base max-w-2xl mx-auto">
          All our products are lab-tested and meet the highest global standards
          for food safety, compostability, and environmental impact.
        </p>
      </div>
    </section>
  );
};

export default CertificationsSection;
