import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons";

const CompanyProfileCard = () => {
  return (
    <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-xl p-6 shadow-lg">
      {/* Header with theme branding */}
      <div className="flex items-center mb-4">
        <FontAwesomeIcon icon={faLinkedinIn} className="text-[#38a169] text-2xl mr-3" />
        <h3 className="text-lg font-semibold text-[#38a169]">Follow us on LinkedIn</h3>
      </div>
      
      <div className="flex">
        {/* Logo on left */}
        <div className="w-24 h-20 relative flex-shrink-0">
          <Image
            src="/assets/img/vegnar-green.png"
            alt="Vegnar Greens Logo"
            width={96}
            height={80}
            className="object-contain rounded-lg"
          />
        </div>

        {/* Info on right */}
        <div className="ml-4 flex flex-col justify-between flex-1">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Vegnar Greens</h2>
            <p className="text-sm text-gray-600">Biodegradable Tableware & Packaging Solutions</p>
            <p className="text-xs text-gray-500 mt-1">
              Rajkot, Gujarat
            </p>
          </div>

          {/* CTA buttons */}
          <div className="flex space-x-2 mt-4">
            <Link
              href="https://www.linkedin.com/company/vegnargreens/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm px-4 py-2 bg-[#38a169] text-white rounded-md hover:bg-[#2f855a] transition font-medium"
            >
              <FontAwesomeIcon icon={faLinkedinIn} className="mr-2" />
              Follow
            </Link>
            <Link
              href="https://www.linkedin.com/company/vegnargreens/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm px-4 py-2 border border-[#38a169] text-[#38a169] rounded-md hover:bg-green-50 transition font-medium"
            >
              View Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfileCard;