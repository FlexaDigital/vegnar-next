'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Breadcrumb = () => {
  const pathname = usePathname();
  const paths = pathname.split('/').filter(path => path);
  
  // Generate breadcrumb items
  const breadcrumbs = paths.map((path, index) => {
    const href = '/' + paths.slice(0, index + 1).join('/');
    const label = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');
    const isLast = index === paths.length - 1;
    
    return {
      href,
      label,
      isLast
    };
  });

  // If we're on the homepage, don't show breadcrumbs
  if (paths.length === 0) return null;

  // Generate schema markup
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'item': {
        '@id': `https://www.vegnar.com${crumb.href}`,
        'name': crumb.label
      }
    }))
  };

  return (
    <>
      <nav aria-label="Breadcrumb" className="py-4 px-4 sm:px-6 lg:px-8">
        <ol className="flex items-center space-x-2 text-sm text-gray-600">
          <li>
            <Link href="/" className="hover:text-green-600">
              Home
            </Link>
          </li>
          {breadcrumbs.map((crumb, index) => (
            <li key={crumb.href} className="flex items-center">
              <span className="mx-2 text-gray-400">/</span>
              {crumb.isLast ? (
                <span className="text-green-600 font-medium">{crumb.label}</span>
              ) : (
                <Link href={crumb.href} className="hover:text-green-600">
                  {crumb.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
    </>
  );
};

export default Breadcrumb; 