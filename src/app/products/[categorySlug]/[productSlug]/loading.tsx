export default function ProductLoading() {
  return (
    <div className="min-h-screen bg-white animate-pulse">
      {/* Product Hero Section Skeleton */}
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Image Gallery Skeleton */}
          <div className="lg:w-2/3">
            <div className="aspect-square bg-gray-200 rounded-lg mb-4" />
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-gray-200 rounded-lg" />
              ))}
            </div>
          </div>

          {/* Product Info Skeleton */}
          <div className="lg:w-1/3 space-y-6">
            {/* Category */}
            <div className="h-6 w-24 bg-gray-200 rounded-full" />
            
            {/* Title */}
            <div className="h-8 w-3/4 bg-gray-200 rounded-lg" />
            
            {/* Price */}
            <div className="h-6 w-32 bg-gray-200 rounded-lg" />
            
            {/* Description */}
            <div className="space-y-3">
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-5/6 bg-gray-200 rounded" />
              <div className="h-4 w-4/6 bg-gray-200 rounded" />
            </div>

            {/* Features */}
            <div className="space-y-4">
              <div className="h-6 w-32 bg-gray-200 rounded" />
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <div className="h-5 w-5 bg-gray-200 rounded-full" />
                    <div className="h-4 w-24 bg-gray-200 rounded" />
                  </div>
                ))}
              </div>
            </div>

            {/* Specifications */}
            <div className="space-y-4">
              <div className="h-6 w-40 bg-gray-200 rounded" />
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex justify-between">
                    <div className="h-4 w-24 bg-gray-200 rounded" />
                    <div className="h-4 w-32 bg-gray-200 rounded" />
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3 pt-4">
              <div className="h-12 w-full bg-gray-200 rounded-lg" />
              <div className="h-12 w-full bg-gray-200 rounded-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information Skeleton */}
      <div className="border-t">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto space-y-8">
            {/* Section Title */}
            <div className="h-8 w-48 bg-gray-200 rounded-lg mx-auto" />

            {/* Content Blocks */}
            <div className="grid md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-3">
                  <div className="h-6 w-40 bg-gray-200 rounded" />
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-gray-200 rounded" />
                    <div className="h-4 w-5/6 bg-gray-200 rounded" />
                    <div className="h-4 w-4/6 bg-gray-200 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Skeleton */}
      <div className="bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          {/* Section Title */}
          <div className="h-8 w-48 bg-gray-200 rounded-lg mx-auto mb-12" />

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="aspect-square bg-gray-200" />
                <div className="p-4 space-y-3">
                  <div className="h-5 w-3/4 bg-gray-200 rounded" />
                  <div className="h-4 w-1/2 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 