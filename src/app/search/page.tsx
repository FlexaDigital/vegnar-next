import { Suspense } from 'react';
import SearchResults from '@/components/SearchResults';

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense fallback={
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin w-8 h-8 border-2 border-[#0D7B52] border-t-transparent rounded-full"></div>
          </div>
        }>
          <SearchResults />
        </Suspense>
      </div>
    </div>
  );
}