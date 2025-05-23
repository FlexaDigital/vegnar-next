"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SocialLinks from "@/components/SocialLinks";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faEnvelope, faPhoneAlt } from "@fortawesome/free-solid-svg-icons";

interface FormDataType {
  name: string;
  email: string;
  product: string;
  message: string;
}

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    email: "",
    product: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formPayload = new FormData();
    formPayload.append("name", formData.name);
    formPayload.append("email", formData.email);
    formPayload.append("product", formData.product);
    formPayload.append("message", formData.message);
    formPayload.append("_captcha", "false");

    try {
      const response = await fetch(
        "https://formsubmit.co/chauhanashish360@gmail.com",
        {
          method: "POST",
          body: formPayload,
        }
      );

      if (response.ok) {
        toast.success("✅ Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          product: "",
          message: "",
        });
      } else {
        toast.error("❌ Something went wrong. Please try again later.");
      }
    } catch (err) {
      console.error("Form error:", err);
      toast.error("⚠️ Network issue. Check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactItems = [
    {
      icon: faMapMarkerAlt,
      title: "Visit Us",
      detail:
        "Office No,506 Riverawave, Near Mc Donald's, Kalawad Road, Rajkot, Gujarat (India) - 360005",
    },
    {
      icon: faEnvelope,
      title: "Email Us",
      detail: "connect@vegnar.com",
    },
    {
      icon: faPhoneAlt,
      title: "Call Us",
      detail: "+91 99980 40473",
    },
  ];

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16 h-full flex items-center">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 w-full">
          {/* Left Info */}
          <div className="lg:w-1/2">
            <span className="inline-block bg-green-100 text-green-700 text-sm font-semibold rounded-full px-3 py-1 mb-4">
              GET IN TOUCH
            </span>
            <h2 className="text-3xl font-extrabold text-green-900 mb-4">
              Contact Us
            </h2>
            <p className="mb-8 max-w-md">
              Have questions about our products or interested in bulk orders?
              Fill out the form, and our team will get back to you shortly.
            </p>

            <div className="space-y-6 max-w-md">
              {contactItems.map(({ icon, title, detail }) => (
                <div key={title} className="flex items-center gap-4">
                  <div className="bg-green-100 p-4 rounded-full text-green-900">
                    <FontAwesomeIcon icon={icon} className="text-lg" />
                  </div>
                  <div>
                    <p className="font-semibold text-green-900 mb-1">{title}</p>
                    <p className="text-gray-600 text-sm">{detail}</p>
                  </div>
                </div>
              ))}

              <SocialLinks />
            </div>
          </div>

          {/* Right Form */}
          <form
            onSubmit={handleSubmit}
            className="lg:w-1/2 bg-green-50 rounded-lg p-8 space-y-6"
          >
            <input type="hidden" name="_captcha" value="false" />

            <div className="flex flex-col sm:flex-row gap-6">
              {[
                {
                  label: "Name",
                  type: "text",
                  name: "name",
                  placeholder: "Your name",
                },
                {
                  label: "Email",
                  type: "email",
                  name: "email",
                  placeholder: "Your email",
                },
              ].map((field) => (
                <div className="flex flex-col w-full" key={field.name}>
                  <label
                    htmlFor={field.name}
                    className="text-xs font-semibold text-green-900 mb-1"
                  >
                    {field.label}
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    required
                    placeholder={field.placeholder}
                    className="rounded-md border border-gray-300 px-4 py-3 text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300"
                    onChange={handleChange}
                    value={formData[field.name as keyof FormDataType]}
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="product"
                className="text-xs font-semibold text-green-900 mb-1"
              >
                Product Interest
              </label>
              <select
                id="product"
                name="product"
                required
                className="rounded-md border border-gray-300 px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-300"
                onChange={handleChange}
                value={formData.product}
              >
                <option value="" disabled>
                  Select a product category
                </option>
                <option>SUGARCANE BAGASSE PRODUCTS</option>
                <option>BIO BAGS</option>
                <option>RICE-HUSK</option>
                <option>WHEAT BRAN PRODUCTS</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="message"
                className="text-xs font-semibold text-green-900 mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                placeholder="Your message"
                className="rounded-md border border-gray-300 px-4 py-3 text-gray-500 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-green-300"
                onChange={handleChange}
                value={formData.message}
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full ${
                isSubmitting ? "bg-green-400" : "bg-green-700 hover:bg-green-800"
              } text-white rounded-md py-3 font-semibold transition-colors`}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default ContactSection;
