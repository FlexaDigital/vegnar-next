"use client"
import React from 'react';
import ContactForm from '@/components/ContactForm';
import ContactInfo from '@/components/ContactInfo';
import BecomePartnerSection from '@/components/BecomePartnerSection';





const ContactPage: React.FC = () => {

    const handleFormSubmit = async (formValues: any, selectedDialCode: string) => {
    const formPayload = new FormData();
    for (const key in formValues) {
      formPayload.append(key, formValues[key]);
    }
    formPayload.append("dial_code", selectedDialCode);
    try {
      const response = await fetch("https://formsubmit.co/export.anantainc@gmail.com", {
        method: "POST",
        body: formPayload,
      });
      if (!response.ok) {
        throw new Error("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <main>
        <section
  className="relative text-white px-6 sm:px-8 lg:px-12 py-12 overflow-hidden"
  style={{
    backgroundImage: "url('/assets/img/Contact-us-hero.png')",
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover', // Optional: Ensures image covers the section
  }}
>
          <div className="absolute inset-0 bg-black opacity-60"></div> {/* Black overlay with 60% opacity */}
          <div className="relative z-10 py-12"> {/* Added relative and z-10 for content */}
            <div className="max-w-7xl mx-auto">
              <h1 className="text-2xl sm:text-3xl font-bold leading-tight max-w-3xl text-white">
                Get in Touch with Vegnar Green
              </h1>
              <p className="mt-2 max-w-2xl text-sm sm:text-base font-normal text-white">
                We're here to help you make eco-friendly choices.
              </p>
              <button
                className="mt-6 bg-[#0f4d3a] hover:bg-[#0d3f2d] inline-flex items-center text-sm font-semibold rounded-full px-4 py-2"
                type="button"
              >
                Contact Us Now
                <svg
                  aria-hidden="true"
                  className="ml-2 w-3.5 h-3.5"
                  fill="none"
                  focusable="false"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M13 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>
        </section>
<section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 flex flex-col md:flex-row gap-10">
        <div className="flex-1">
          <ContactForm onSubmit={handleFormSubmit} />
        </div>
        <div className="flex-1">
          <ContactInfo />
        </div>
      </section>
        <BecomePartnerSection />
            
      </main>
  
    </div>
  );
};

export default ContactPage;
