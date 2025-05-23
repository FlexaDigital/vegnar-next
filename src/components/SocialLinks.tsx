"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faPinterest,
} from "@fortawesome/free-brands-svg-icons";

interface SocialLink {
  icon: any;
  label: string;
  link: string;
}

const socialLinks: SocialLink[] = [
  {
    icon: faFacebookF,
    label: "Facebook",
    link: "https://www.facebook.com/vegnargreens",
  },
  {
    icon: faInstagram,
    label: "Instagram",
    link: "https://www.instagram.com/vegnargreens/",
  },
  {
    icon: faLinkedinIn,
    label: "LinkedIn",
    link: "https://www.linkedin.com/company/vegnargreens/",
  },
  {
    icon: faPinterest,
    label: "Pinterest",
    link: "https://in.pinterest.com/vegnarg/",
  },
];

const SocialLinks: React.FC = () => {
  return (
    <div>
      <h4 className="font-semibold text-sm mb-2">Connect With Us</h4>
      <div className="flex space-x-3">
        {socialLinks.map((item, index) => (
          <a
            key={index}
            aria-label={item.label}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#d9f5e8] text-[#0f4d3a] rounded-full w-10 h-10 flex items-center justify-center hover:bg-[#b3e6cc] transition"
          >
            <FontAwesomeIcon icon={item.icon} className="w-5 h-5" />
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialLinks;
