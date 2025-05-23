'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faPhoneAlt,
  faMapMarkerAlt,
  faClock,
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faPinterest ,
} from '@fortawesome/free-brands-svg-icons';

const ContactInfo: React.FC = () => {
  return (
    <div className="space-y-6 max-w-md">
      <div>
        <h3 className="font-semibold text-[#0f1f2f] mb-2 text-lg">Contact Information</h3>
        <p className="text-sm text-[#4a4a4a] mb-6 max-w-sm">
          Reach out to us through any of these channels. We're always happy to hear from you!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
        {/* Email */}
        <div className="bg-white rounded-lg p-6 shadow-sm w-full">
          <div className="flex items-center mb-2">
            <div className="bg-[#d9f5e8] text-[#0f4d3a] rounded-full p-3 mr-3">
              <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5" />
            </div>
            <h4 className="font-semibold text-sm">Email Us</h4>
          </div>
          <p className="text-sm text-[#4a4a4a] mb-1">General Inquiries:</p>
          <a
            href="mailto:connect@vegnargreen.com"
            className="text-[#0f4d3a] text-sm block mb-2 hover:underline"
          >
            connect@vegnar.com
          </a>
          <p className="text-sm text-[#4a4a4a] mb-1">Become a Partner:</p>
          <a
            href="mailto:partners@vegnargreen.com"
            className="text-[#0f4d3a] text-sm hover:underline"
          >
            partners@vegnar.com
          </a>
        </div>

        {/* Phone */}
        <div className="bg-white rounded-lg p-6 shadow-sm w-full">
          <div className="flex items-center mb-2">
            <div className="bg-[#d9f5e8] text-[#0f4d3a] rounded-full p-3 mr-3">
              <FontAwesomeIcon icon={faPhoneAlt} className="w-5 h-5" />
            </div>
            <h4 className="font-semibold text-sm">Call Us</h4>
          </div>
          <p className="text-sm text-[#4a4a4a] mb-1">Main Office:</p>
          <a
            href="tel:+919998040373"
            className="text-[#0f4d3a] text-sm block mb-2 hover:underline"
          >
            +91 9998040373
          </a>
        </div>

        {/* Address */}
        <div className="bg-white rounded-lg p-6 shadow-sm w-full">
          <div className="flex items-center mb-2">
            <div className="bg-[#d9f5e8] text-[#0f4d3a] rounded-full p-3 mr-3">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="w-5 h-5" />
            </div>
            <h4 className="font-semibold text-sm">Visit Us</h4>
          </div>
          <address className="not-italic text-sm text-[#4a4a4a] leading-relaxed">
            Vegnar Green Headquarters<br />
            506, Riverawave, Near Mc Donalds<br />
            Kalawad Road, Rajkot<br />
            Gujarat, 360005, India
          </address>
        </div>

        {/* Hours */}
        <div className="bg-white rounded-lg p-6 shadow-sm w-full">
          <div className="flex items-center mb-2">
            <div className="bg-[#d9f5e8] text-[#0f4d3a] rounded-full p-3 mr-3">
              <FontAwesomeIcon icon={faClock} className="w-5 h-5" />
            </div>
            <h4 className="font-semibold text-sm">Business Hours</h4>
          </div>
          <p className="text-sm text-[#4a4a4a] mb-1">Monday - Friday:</p>
          <p className="text-sm text-[#4a4a4a] mb-2">9:00 AM - 6:00 PM IST</p>
          <p className="text-sm text-[#4a4a4a] mb-1">Saturday:</p>
          <p className="text-sm text-[#4a4a4a]">10:00 AM - 2:00 PM IST</p>
        </div>
      </div>

      {/* Social Links */}
      <div>
        <h4 className="font-semibold text-sm mb-2">Connect With Us</h4>
    <div className="flex space-x-3">
  {[
    { icon: faFacebookF, label: 'Facebook', link: 'https://www.facebook.com/vegnargreens' },
    { icon: faInstagram, label: 'Instagram', link: 'https://www.instagram.com/vegnargreens/' },
    { icon: faLinkedinIn, label: 'LinkedIn', link: 'https://www.linkedin.com/company/vegnargreens/' },
    { icon: faPinterest , label: 'Pinterest', link: 'https://in.pinterest.com/vegnarg/' },
  ].map((item, index) => (
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
    </div>
  );
};

export default ContactInfo;
