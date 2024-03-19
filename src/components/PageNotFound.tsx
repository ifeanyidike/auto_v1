import React from 'react';
import { dmSans } from '~/font';
import Button from './Button';
import Link from 'next/link';

type Props = {
  slug?: string;
};
const PageNotFound = (props: Props) => {
  const { slug } = props;
  return (
    <div
      className={`flex h-screen w-full flex-col justify-center gap-10 bg-content-normal bg-[url("/images/servicebannerimage.jpg")] bg-cover bg-center bg-no-repeat px-20 py-5 text-white bg-blend-overlay max-md:h-[550px] items-center max-md:px-3 text-center`}
    >
      <h2
        className={`text-9xl max-md:text-6xl font-sans font-medium ${dmSans.className}`}
      >
        404
      </h2>
      <h3 className={`text-5xl max-md:text-3xl font-sans font-semibold`}>
        Oops... Something Went Wrong
      </h3>
      <div className="justify-center font-normal text-lg text-white/90 leading-6 w-[600px] flex flex-wrap max-md:w-auto">
        {slug ? (
          <p>
            There is no merchant associated with the domain -{' '}
            <span>{slug}</span>.
          </p>
        ) : (
          <p>The page you requested does not exist.</p>
        )}
      </div>
      <Link href="https://moxxil.com/register-merchant">
        <Button bgColor="bg-red-700" hasGradient hasShadow>
          Back to Homepage
        </Button>
      </Link>
    </div>
  );
};

export default PageNotFound;
