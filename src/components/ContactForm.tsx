// components/ContactForm.tsx
'use client';
import React, { useState, useRef, useEffect } from "react";
import countries from "@/data/country-list.json";
import { FaSearch, FaChevronDown } from "react-icons/fa";

interface ContactFormProps {
  onSubmit?: (formValues: any, selectedDialCode: string) => Promise<void>;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => {
  const [selectedDialCode, setSelectedDialCode] = useState<string>("+91");
  const [selectedCountry, setSelectedCountry] = useState<string>("India");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [formValues, setFormValues] = useState({
    fullname: "",
    email: "",
    phone: "",
    company: "",
    country: "India",
    message: "",
  });
  const [formError, setFormError] = useState<string>("");
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCountryDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCountryChange = (dialCode: string, countryName: string) => {
    setSelectedDialCode(dialCode);
    setSelectedCountry(countryName);
    setSearchTerm("");
    setIsCountryDropdownOpen(false);
    setFormValues((prevValues) => ({
      ...prevValues,
      country: countryName,
    }));
  };

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.dial_code.includes(searchTerm)
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formValues.fullname.trim() || !formValues.email.trim() || !formValues.message.trim()) {
      setFormError("Please fill in all required fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formValues.email)) {
      setFormError("Please enter a valid email address.");
      return;
    }
    setFormError("");

    // Create form payload
    const formPayload = new FormData();
    formPayload.append('Full Name', formValues.fullname);
    formPayload.append('Email', formValues.email);
    formPayload.append('Phone', `${selectedDialCode} ${formValues.phone}`);
    formPayload.append('Company', formValues.company);
    formPayload.append('Country', formValues.country);
    formPayload.append('Message', formValues.message);
    
    // Add form configuration
    formPayload.append('_subject', 'New Contact Form Inquiry - Vegnar Green');
    formPayload.append('_template', 'table');
    formPayload.append('_captcha', 'false');
    formPayload.append('_replyto', formValues.email);

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/vegnarglobal@gmail.com",
        {
          method: "POST",
          headers: {
            'Accept': 'application/json',
          },
          body: formPayload,
        }
      );

      if (response.ok) {
        setFormSubmitted(true);
        setFormValues({
          fullname: "",
          email: "",
          phone: "",
          company: "",
          country: "India",
          message: "",
        });
        
        // Call the onSubmit prop if provided
        if (onSubmit) {
          await onSubmit(formValues, selectedDialCode);
        }
      } else {
        setFormError("Failed to send message. Please try again later.");
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setFormError("Network error. Please check your connection and try again.");
    }
  };

  return (
    <form
      aria-label="Send Us a Message Form"
      className="bg-white rounded-lg shadow-md p-6 max-w-md"
      onSubmit={handleSubmit}
    >
      <div className="bg-[#e6f9ef] rounded-t-lg p-4">
        <h2 className="font-semibold text-[#0f1f2f] text-lg">Send Us a Message</h2>
        <p className="text-sm text-[#4a4a4a] mt-1">
          Fill out the form below and we'll get back to you as soon as possible.
        </p>
      </div>
      {formSubmitted ? (
        <div className="mt-6 text-green-600 text-sm">
          Thank you for your message! We'll get back to you shortly.
        </div>
      ) : (
        <div className="mt-6 space-y-4 text-sm text-[#4a4a4a]">
          {formError && <div className="text-red-600 text-sm">{formError}</div>}
          <div>
            <label className="block font-semibold mb-1" htmlFor="fullname">
              Full Name
              <span className="text-red-600"> * </span>
            </label>
            <input
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#0f4d3a]"
              id="fullname"
              name="fullname"
              placeholder="Your full name"
              required
              type="text"
              value={formValues.fullname}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block font-semibold mb-1" htmlFor="email">
              Email Address
              <span className="text-red-600"> * </span>
            </label>
            <input
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#0f4d3a]"
              id="email"
              name="email"
              placeholder="your@email.com"
              required
              type="email"
              value={formValues.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block font-semibold mb-1" htmlFor="phone">
              Phone Number
            </label>
            <div className="flex relative">
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#0f4d3a] bg-white flex items-center gap-2 min-w-[120px]"
                  onClick={() => {
                    setIsCountryDropdownOpen(!isCountryDropdownOpen);
                    setTimeout(() => {
                      if (searchInputRef.current) {
                        searchInputRef.current.focus();
                      }
                    }, 100);
                  }}
                >
                  <span>{selectedDialCode}</span>
                  <FaChevronDown className={`transition-transform ${isCountryDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isCountryDropdownOpen && (
                  <div className="absolute z-10 mt-1 w-64 bg-white border border-gray-300 rounded-md shadow-lg">
                    <div className="p-2 border-b">
                      <div className="relative">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          ref={searchInputRef}
                          type="text"
                          className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0f4d3a]"
                          placeholder="Search country or code..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                      {filteredCountries.map((country) => (
                        <button
                          key={country.code}
                          type="button"
                          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center justify-between"
                          onClick={() => handleCountryChange(country.dial_code, country.name)}
                        >
                          <span>{country.name}</span>
                          <span className="text-gray-500">{country.dial_code}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <input
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#0f4d3a] ml-2"
                id="phone"
                name="phone"
                type="text"
                value={formValues.phone}
                onChange={handleInputChange}
                placeholder="Phone number"
              />
            </div>
          </div>
          <div>
            <label className="block font-semibold mb-1" htmlFor="company">
              Company Name
            </label>
            <input
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#0f4d3a]"
              id="company"
              name="company"
              type="text"
              value={formValues.company}
              onChange={handleInputChange}
              placeholder="Your company name"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1" htmlFor="message">
              Message
              <span className="text-red-600"> * </span>
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm placeholder:text-gray-400 resize-none focus:outline-none focus:ring-1 focus:ring-[#0f4d3a]"
              id="message"
              name="message"
              placeholder="How can we help you?"
              required
              rows={4}
              value={formValues.message}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <button
            className="w-full bg-[#0f4d3a] hover:bg-[#0d3f2d] text-white font-semibold rounded-md py-2 flex justify-center items-center text-sm"
            type="submit"
          >
            Send Message
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
