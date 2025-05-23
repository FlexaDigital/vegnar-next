'use client';

import dynamic from 'next/dynamic';

const ProductSlider = dynamic(() => import('./ProductSlider'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] flex items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-700"></div>
    </div>
  ),
});

const ClientProductSlider = () => {
  return <ProductSlider />;
};

export default ClientProductSlider; 