import Image from 'next/image';
import React from 'react';
import MerchantService from '~/app/api/merchant_service/logic';
import Auth0 from '~/server/auth0';
import DataView from './components/DataView';

const Booking = async ({
  searchParams,
}: {
  params: { slug: string; id: string };
  searchParams?: Record<string, string | string[] | undefined>;
}) => {
  const id = searchParams?.id as string;

  const merchantServiceClient = new MerchantService();
  const merchantService = await merchantServiceClient.getOne({
    id,
  });

  if (!merchantService) {
    return (
      <div className="font-mono text-2xl font-medium text-center flex flex-col h-fit justify-center items-center gap-8 mt-7 mb-8">
        <Image
          src="/images/oops1.png"
          width={976}
          height={370}
          alt="Oops!"
        ></Image>
        <span>Service does not exist</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 items-center mx-auto my-8 max-w-[700px] shadow shadow-white">
      <h2 className="text-2xl font-semibold">
        Booking for {merchantService.service?.title}
      </h2>
      <DataView merchantService={merchantService} />
    </div>
  );
};

export default Auth0.ProtectedPage()(Booking, {
  returnTo: '/service/booking',
});
