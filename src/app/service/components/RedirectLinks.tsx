import Link from 'next/link';
import React from 'react';

const RedirectLinks = () => {
  return (
    <div className="flex text-xs gap-8 underline">
      <Link href="/services" className="hover:text-amber-700">
        Subscribe/book another plan
      </Link>
      <Link href="/" className="hover:text-amber-700">
        Go to Home page
      </Link>
      <Link href="#" className="hover:text-amber-700">
        Go to your profile
      </Link>
    </div>
  );
};

export default RedirectLinks;
