"use client";
import React, { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faInstagram, faLinkedinIn, faPinterestP } from "@fortawesome/free-brands-svg-icons";

const Footer: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      formType: 'NewsletterForm',
      'Email Address': email
    };

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbys6WK8uBmZQM2vP5KMOu16UWd1qwsUbBmdvp9qxeioPb3B6F2mSpyai2pT1PJYQsZQJQ/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      // With no-cors, assume success
      setStatus("Subscribed successfully!");
      setEmail("");
    } catch (error) {
      console.error("Error during form submission:", error);
      setStatus("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const quickLinks = [
    { to: "/products", label: "Products" },
    { to: "/about-us", label: "About Us" },
    { to: "/export", label: "Export" },
    { to: "/blog", label: "Blog" },
    { to: "/contact", label: "Contact" },
    { to: "/partner", label: "Become Our Partner" },
    { to: "/quote", label: "Get Quote" },
  ];

  const productLinks = [
    { to: "/products/round-plates", label: "Round Plates" },
    { to: "/products/bowls", label: "Bowls" },
    { to: "/products/clasmshells", label: "Clamshells" },
    { to: "/products/meal-trays", label: "Meal Trays" },
    { to: "/products/sipper-lid", label: "Sipper Lids" },
    { to: "/products/takeaway-container", label: "Takeaway Container" },
    { to: "/products/bagasse-tray", label: "Tray" },

  ];

  return (
    <footer className="bg-[#0D4B3D] text-white">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-10 sm:gap-0">
        <div className="flex flex-col max-w-xs space-y-4">
          <div className="flex items-center">
            <Image
              src="/assets/img/white-logo.png"
              alt="White Logo"
              width={120}
              height={40} // replace with actual height
            />
          </div>
          <p className="text-sm font-normal text-white max-w-[220px] leading-relaxed">
            Turning agricultural waste into sustainable tableware and packaging
            solutions. Join us in creating a plastic-free future.
          </p>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com/vegnargreens" aria-label="Facebook" className="text-white hover:text-[#7ED6A3] transition-colors">
              <FontAwesomeIcon icon={faFacebookF} className="text-xl" />
            </a>
            <a href="https://www.instagram.com/vegnargreens/" aria-label="Instagram" className="text-white hover:text-[#7ED6A3] transition-colors">
              <FontAwesomeIcon icon={faInstagram} className="text-xl" />
            </a>
            <a href="https://www.linkedin.com/company/vegnargreens/" aria-label="LinkedIn" className="text-white hover:text-[#7ED6A3] transition-colors">
              <FontAwesomeIcon icon={faLinkedinIn} className="text-xl" />
            </a>
            <a href="https://in.pinterest.com/vegnargreens/" aria-label="Pinterest" className="text-white hover:text-[#7ED6A3] transition-colors">
              <FontAwesomeIcon icon={faPinterestP} className="text-xl" />
            </a>
          </div>
        </div>

        <div className="flex flex-col space-y-4 min-w-[120px]">
          <h3 className="font-semibold text-white text-base">Quick Links</h3>
          <ul className="space-y-2 text-sm font-normal text-white">
            {quickLinks.map((link, index) => (
              <li key={index}>
                <Link href={link.to} className="hover:text-[#7ED6A3]">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col space-y-4 min-w-[140px]">
          <h3 className="font-semibold text-white text-base">Products</h3>
          <ul className="space-y-2 text-sm font-normal text-white">
            {productLinks.map((link, index) => (
              <li key={index}>
                <Link href={link.to} className="hover:text-[#7ED6A3]">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col space-y-4 max-w-xs">
          <h3 className="font-semibold text-white text-base">Newsletter</h3>
          <p className="text-sm font-normal text-white max-w-[280px] leading-relaxed">
            Subscribe to receive updates on new products, sustainability tips,
            and exclusive offers.
          </p>
          <form onSubmit={handleSubmit} className="flex max-w-[280px]">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="flex-grow rounded-l-md px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none"
              aria-label="Email address"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#0D7B52] rounded-r-md px-4 py-2 flex items-center justify-center hover:bg-[#0a5a3a] disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Subscribe"
            >
              <FontAwesomeIcon icon={faPaperPlane} className="text-white w-4 h-4" />
            </button>
          </form>
          {status && (
            <p className="text-sm text-gray-200 mt-2 max-w-[280px]">{status}</p>
          )}
          <p className="text-xs text-[#7ED6A3] max-w-[280px]">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
      
      {/* Copyright Section */}
      <div className="border-t border-white/20 py-4">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center text-sm text-white/80">
          <p>&copy; {new Date().getFullYear()} Vegnar Green. All rights reserved.</p>
          <p>
            Developed by{' '}
            <a 
              href="https://flexadigital.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#7ED6A3] hover:text-white transition-colors font-medium"
            >
              Flexa Digital
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
