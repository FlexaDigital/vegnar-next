import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobeAmericas } from '@fortawesome/free-solid-svg-icons';
import { Metadata } from 'next';
import Link from 'next/link';

// Metadata for the EcoMovement section
export const metadata: Metadata = {
    title: "Join Our Eco-Movement",
    description: "Support our commitment to sustainability and help us prevent plastic waste.",
    keywords: "eco-movement, sustainability, plastic waste, environment, green initiative",
    // Example of more comprehensive Open Graph metadata for better SEO and social sharing:
    openGraph: {
        title: "Join Our Eco-Movement",
        description: "Support our commitment to sustainability and help us prevent plastic waste.",
        url: "/eco-movement", //  Important:  Use the correct URL for this page
        type: "website",  //  Or "article", "product", etc.
        images: [
            {
                url: 'https://example.com/og-image.jpg', //  Replace with your actual image URL
                width: 1200,
                height: 630,
                alt: 'Eco-Movement Initiative',
            },
        ],
    },
    // Add other metadata fields as needed
};

const EcoMovement = () => {
    return (
        <div className="bg-white flex justify-center items-center min-h-screen p-6">
            <div className="max-w-6xl w-full rounded-lg shadow-lg flex flex-col md:flex-row overflow-hidden">
                {/* Left Section: Green Background */}
                <div className="bg-[#058a5e] text-white flex flex-col justify-center p-10 md:w-1/2">
                    <h2 className="text-2xl font-bold mb-4 font-sans">
                        Join Our Eco-Movement
                    </h2>
                    <p className="mb-8 font-sans text-base leading-relaxed">
                        Together, we can create meaningful change. Join thousands of businesses
                        and individuals who are choosing sustainable alternatives and making
                        a difference for our planet.
                    </p>
                    <div className="flex space-x-4">
                        <Link href="/partner">
                            <button
                                className="bg-white text-[#058a5e] font-semibold rounded-full px-6 py-3 hover:bg-white/90 transition font-sans"
                                type="button"
                            >
                                Become a Partner
                            </button>
                        </Link>
                        {/* <button
                            className="border border-white text-white font-semibold rounded-full px-6 py-3 hover:bg-white/10 transition font-sans"
                            type="button"
                        >
                            Subscribe to Updates
                        </button> */}
                    </div>
                </div>

                {/* Right Section: Darker Green Background */}
                <div className="bg-[#016943] text-white flex flex-col justify-center p-10 md:w-1/2 text-center">
                    
                    <h3 className="font-bold text-lg mb-2 font-sans">Our 2025 Pledge</h3>
                    <p className="mb-6 font-sans text-base leading-relaxed">
                        We're committed to preventing 30 million plastic items from entering
                        the environment by 2025.
                    </p>
                    <div className="w-full max-w-xs mx-auto mb-3 bg-[#01492f] rounded-full h-5 overflow-hidden">
                        <div
                            className="bg-white h-5 rounded-full"
                            style={{ width: "26%" }}
                        >
                        </div>
                    </div>
                    <p className="text-sm font-sans">12M of 30M goal reached</p>
                </div>
            </div>
        </div>
    );
};

export default EcoMovement;
