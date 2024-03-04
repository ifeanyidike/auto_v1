'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div className="flex flex-col items-center justify-center my-5 gap-5">
      <Image
        src="/images/work.png"
        width={576}
        height={406}
        alt="Oops!"
      ></Image>
      <p className="font-medium text-2xl">Ooops {error.message}!</p>
      <div className="flex text-xs gap-8 underline">
        <Link href="/services" className="hover:text-amber-700">
          Subscribe for another plan
        </Link>
        <Link href="/" className="hover:text-amber-700">
          Return to Home page
        </Link>
        <Link href="#" className="hover:text-amber-700">
          Go to your profile
        </Link>
      </div>
    </div>
  );
}
