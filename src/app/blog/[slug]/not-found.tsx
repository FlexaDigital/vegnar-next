import Link from 'next/link';

export default function BlogArticleNotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Article Not Found</h1>
        <p className="text-gray-600 mb-8">
          The article you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/blog"
          className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
        >
          Return to Blog
        </Link>
      </div>
    </div>
  );
} 