import React from 'react';
import Auth0 from '~/server/auth0';
import FloatingAddButton from '../components/FloatingAddButton';
import Button from '~/components/Button';
import PlusIcon from '~/commons/icons/PlusIcon';
import Image from 'next/image';
import Link from 'next/link';

const Product = async () => {
  return (
    <div
      className={`h-screen w-full flex-1 flex flex-col text-inherit rounded-xl px-8 items-center max-sm:justify-center`}
    >
      <div className="text-base font-normal flex flex-col gap-10 mt-20 max-sm:mt-0 mb-10 items-center">
        <Image
          src="/images/auto_wheel.webp"
          width={300}
          height={300}
          className="w-[300px] h-[300px] max-md:w-[200px] max-md:h-[200px] max-sm:w-[100px] max-sm:h-[100px]"
          alt=""
        />
        <div className="flex flex-col items-center gap-4">
          <p className="w-[600px] max-md:w-full text-center max-sm:text-sm">
            Create a new service or product to embark on the journey of
            optimizing your auto shop management.
          </p>
          <Link href="product/new">
            <Button
              hasGradient={true}
              shadowColor="shadow-stone-500"
              bgColor="bg-yellow"
              width="w-fit"
            >
              <div className="flex items-center gap-2">
                <PlusIcon classNames="w-5 h-5" />
                <span className="max-sm:text-sm">Add a new product</span>
              </div>
            </Button>
          </Link>
        </div>
      </div>
      <FloatingAddButton />
    </div>
  );
};

export default Auth0.ProtectedPage(Product, { returnTo: '/manage/product' });
