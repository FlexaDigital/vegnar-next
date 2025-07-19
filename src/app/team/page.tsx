import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Coming Soon | Vegnar Green",
  description: "This page is currently under development.",
};

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen bg-[#f3faf5] flex items-center justify-center">
      <div className="text-center p-8">
        <h1 className="text-4xl font-bold text-[#0b3d13] mb-4">Coming Soon</h1>
        <p className="text-[#0b3d13]/70 mb-8">This page is currently under development.</p>
        <Link 
          href="/"
          className="inline-flex items-center justify-center bg-gradient-to-r from-[#1a7a2b] to-[#2d8f3f] text-white font-semibold rounded-lg px-6 py-3 hover:from-[#0f5a1f] hover:to-[#1a7a2b] transition-all duration-300"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}