'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/919998040373?text=Hi%2C%20I%27m%20interested%20in%20your%20biodegradable%20products.%20Please%20share%20more%20details."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 left-4 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-colors duration-300"
      aria-label="Chat on WhatsApp"
    >
      <FontAwesomeIcon icon={faWhatsapp} className="w-6 h-6" />
    </a>
  );
};

export default WhatsAppButton; 