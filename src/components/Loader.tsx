'use client';

import React from 'react';

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-[999] flex items-center justify-center">
      <div className="relative">
        <div className="h-16 w-16 rounded-full border-4 border-gray-200"></div>
        <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-4 border-green-600 border-t-transparent animate-spin"></div>
      </div>
    </div>
  );
};

export default Loader; 