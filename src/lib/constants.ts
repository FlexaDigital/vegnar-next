// Site configuration constants
export const SITE_CONFIG = {
  // Use localhost for development, production URL for production
  BASE_URL: process.env.NODE_ENV === 'production' 
    ? 'https://www.vegnar.com' 
    : 'http://localhost:3000',
  
  // WordPress CMS URL (for API calls only)
  CMS_URL: 'https://cms.vegnar.com',
  
  // Company information
  COMPANY: {
    name: 'Vegnar Green',
    email: 'connect@vegnar.com',
    phone: '+91-9998040373',
    address: {
      street: 'B623, RK Iconic, Sheetal Park, 150 Feet Ring Rd',
      city: 'Rajkot',
      state: 'Gujarat',
      postalCode: '360007',
      country: 'IN'
    }
  }
};