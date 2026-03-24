"use client"
import React from 'react';
import Link from 'next/link';
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
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-[url('/assets/bg-green.png')] bg-repeat opacity-15 pointer-events-none" style={{backgroundSize: '200px'}}></div>
      <main>
        <section
          className="relative text-white px-6 sm:px-8 lg:px-12 py-12 overflow-hidden"
          style={{
            backgroundImage: "url('/assets/img/Contact-us-hero.png')",
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        >
          <div className="absolute inset-0 bg-black opacity-60"></div>
          <div className="relative z-10 py-12">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-2xl sm:text-3xl font-bold leading-tight max-w-3xl text-white">
                Get in Touch with Vegnar Green
              </h1>
              <p className="mt-2 max-w-2xl text-sm sm:text-base font-normal text-white">
                We're here to help you make eco-friendly choices. Whether you need{" "}
                <Link href="/products/bagasse-products" className="text-green-300 font-semibold transition-all">
                  product information
                </Link>,{" "}
                <Link href="/quote" className="text-green-300 font-semibold transition-all">
                  bulk pricing
                </Link>, or details about our{" "}
                <Link href="/export" className="text-green-300 font-semibold transition-all">
                  international shipping
                </Link>, our team is ready to assist.
              </p>
            </div>
          </div>
        </section>
        <section className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 flex flex-col md:flex-row gap-10 z-10">
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