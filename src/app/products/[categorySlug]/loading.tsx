import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center p-8">
      <div className="relative">
        <div className="h-16 w-16 rounded-full border-4 border-gray-200"></div>
        <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-4 border-green-600 border-t-transparent animate-spin"></div>
      </div>
      <p className="mt-4 text-lg text-gray-600">Loading category products...</p>
    </div>
  );
} 