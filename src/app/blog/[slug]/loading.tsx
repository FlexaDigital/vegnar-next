export default function BlogArticleLoading() {
  return (
    <div className="bg-white text-gray-900 relative min-h-screen font-sans animate-pulse">
      {/* Hero Section Skeleton */}
      <div className="relative min-h-[300px] w-full overflow-hidden mt-20">
        <div className="absolute inset-0 bg-gray-200" />
        <div className="relative max-w-4xl mx-auto px-6 py-20">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="h-6 w-32 bg-gray-200 rounded-full mb-4" />
            <div className="h-12 w-3/4 bg-gray-200 rounded-lg mb-6" />
            <div className="flex flex-wrap gap-6">
              <div className="h-8 w-40 bg-gray-200 rounded-lg" />
              <div className="h-8 w-32 bg-gray-200 rounded-lg" />
              <div className="h-8 w-36 bg-gray-200 rounded-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area Skeleton */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 flex flex-col lg:flex-row lg:space-x-10">
        {/* Table of Contents Skeleton */}
        <aside className="hidden lg:block sticky top-60 z-10 shrink-0 w-64 self-start bg-white rounded-lg shadow-sm p-6">
          <div className="h-6 w-40 bg-gray-200 rounded mb-4" />
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-4 w-full bg-gray-200 rounded" />
            ))}
          </div>
        </aside>

        {/* Article Content Skeleton */}
        <article className="max-w-4xl mx-auto text-gray-700 space-y-6 lg:mx-0">
          <div className="space-y-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="space-y-3">
                <div className="h-6 w-3/4 bg-gray-200 rounded" />
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-4 w-5/6 bg-gray-200 rounded" />
              </div>
            ))}
          </div>

          {/* Related Posts Skeleton */}
          <section className="mt-16 border-t pt-12">
            <div className="h-8 w-48 bg-gray-200 rounded mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="aspect-w-16 aspect-h-9 bg-gray-200" />
                  <div className="p-4">
                    <div className="h-5 w-3/4 bg-gray-200 rounded mb-2" />
                    <div className="h-4 w-1/2 bg-gray-200 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </article>
      </main>

      {/* Newsletter Section Skeleton */}
      <section className="mt-20 bg-[#f0f9f0] py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="h-6 w-64 bg-gray-200 rounded mx-auto mb-8" />
        <div className="h-4 w-96 bg-gray-200 rounded mx-auto mb-6" />
        <div className="flex flex-col sm:flex-row items-center max-w-md mx-auto space-y-3 sm:space-y-0 sm:space-x-3">
          <div className="w-full sm:flex-1 h-10 bg-gray-200 rounded" />
          <div className="w-full sm:flex-1 h-10 bg-gray-200 rounded" />
          <div className="w-10 h-10 bg-gray-200 rounded" />
        </div>
      </section>
    </div>
  );
} 