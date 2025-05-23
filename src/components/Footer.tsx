"use client";
import React, { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";

const Footer: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [status, setStatus] = useState<string>(""); 

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("your-email", email); 

    try {
      const response = await fetch(
        "https://cms.vegnar.com/wp-json/contact-form-7/v1/contact-forms/127/feedback",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (result.status === "mail_sent") {
        setStatus("Subscribed successfully!");
        setEmail("");
      } else {
        console.error(result);
        setStatus("Subscription failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      setStatus("An error occurred. Please try again.");
    }
  };

  const quickLinks = [
    { to: "/product", label: "Products" },
    { to: "/about-us", label: "About Us" },
    { to: "/blog", label: "Blog" },
    { to: "/contact", label: "Contact" },
    { to: "/partner", label: "Become Our Partner" },
  ];

  const productLinks = [
    { to: "/products/sugarcane-bagasse", label: "Bagasse Tableware" },
    { to: "/products/bio-bags", label: "Bio Bags" },
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
          <div className="flex space-x-4 text-white text-sm">
            <a href="#" aria-label="Facebook" className="hover:text-[#7ED6A3]">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-[#7ED6A3]">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-[#7ED6A3]">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-[#7ED6A3]">
              <i className="fab fa-linkedin-in"></i>
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
              className="bg-[#0D7B52] rounded-r-md px-4 py-2 flex items-center justify-center hover:bg-[#0a5a3a]"
              aria-label="Subscribe"
            >
              <i className="fas fa-paper-plane text-white"></i>
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
    </footer>
  );
};

export default Footer;
