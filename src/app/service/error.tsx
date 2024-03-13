'use client';

import Image from 'next/image';
import Link from 'next/link';
import { nunitoSans } from '~/font';
import RedirectLinks from './components/RedirectLinks';

export default function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div className="flex flex-col items-center justify-center my-5 gap-5">
      <Image
        src="/images/work.png"
        width={576}
        height={406}
        alt="Oops!"
      ></Image>
      <p className={`${nunitoSans.className} font-medium text-2xl`}>
        Ooops! {error.message}!
      </p>
      <RedirectLinks />
    </div>
  );
}
