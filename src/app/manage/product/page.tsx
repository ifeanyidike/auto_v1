import React from 'react';
import FloatingAddButton from '../components/FloatingAddButton';
import Button from '~/components/Button';
import PlusIcon from '~/commons/icons/PlusIcon';
import Image from 'next/image';
import Link from 'next/link';
import MerchantService from '~/app/api/merchant_service/logic';
import Util from '~/server/utils';
import ProductList from './components/ProductList';
import { type NewMerchantServiceType } from '~/types/utils';
import { manRope } from '~/font';
import ProtectedPage from '~/server/protectedPage';
import TopMenu from '../components/TopMenu';
import BackToPage from '../components/BackToPage';

const Product = async () => {
  const { slug } = Util.getRouteType();

  const merchantService = new MerchantService();
  const all_products = await merchantService.getAllByMerchant(slug);
  const formatted_products = (all_products.services ?? [])?.map(p => {
    const formatted_pricing = p.pricing?.map(pricing => ({
      ...pricing,
      amount: Number(pricing.amount),
    }));
    return {
      ...p,
      pricing: formatted_pricing,
    };
  }) as NewMerchantServiceType[];

  return (
    <div
      className={`h-screen ${manRope.className} w-full flex-1 text-inherit rounded-xl items-center max-sm:justify-center`}
    >
      <TopMenu
        showToggle
        component={
          <div className="flex justify-between items-center w-full">
            <BackToPage
              toHref="/manage/"
              prevTitle="home"
              currTitle="List Product Items"
            />
          </div>
        }
      />
      {!all_products.services?.length ? (
        <div className="text-base font-normal px-8 flex flex-col gap-10 mt-20 mb-10 items-center box-border">
          <Image
            src="/images/auto_wheel.webp"
            width={300}
            height={300}
            className="w-[300px] h-[300px] max-sm:w-[280px] max-sm:h-[280px]"
            alt=""
          />
          <div className="flex flex-col items-center gap-4 max-md:gap-8">
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
      ) : (
        <ProductList products={formatted_products} />
      )}
      <Link href="product/new">
        <FloatingAddButton />
      </Link>
    </div>
  );
};

export default ProtectedPage(Product, { returnTo: '/manage/product' });
