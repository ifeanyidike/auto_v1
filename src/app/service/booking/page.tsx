import Image from 'next/image';
import React from 'react';
import MerchantService from '~/app/api/merchant_service/logic';
import Auth0 from '~/server/auth0';
import DataView from './components/DataView';
import User from '~/app/api/user/logic';
import { type Prisma } from '@prisma/client';
import { type DefaultArgs } from '@prisma/client/runtime/library';
import ProtectedPage from '~/server/protectedPage';
import { dmSans } from '~/font';

const Booking = async ({
  searchParams,
}: {
  params: { slug: string; id: string };
  searchParams?: Record<string, string | string[] | undefined>;
}) => {
  const id = searchParams?.service_id as string;

  // @ts-ignore
  globalThis.service_id = undefined;

  const merchantServiceClient = new MerchantService();
  const merchantService = await merchantServiceClient.getOne({
    id,
  });

  const sessionUser = await Auth0.getSessionUser();

  if (sessionUser?.email === merchantService?.merchant?.email) {
    return (
      <div className="text-2xl font-medium text-center flex flex-col h-fit justify-center items-center gap-8 mt-7 mb-8">
        <Image
          src="/images/oops1.png"
          width={976}
          height={370}
          alt="Oops!"
        ></Image>
        <span className={`${dmSans.className}`}>
          You cannot book your own service
        </span>
      </div>
    );
  }

  if (!merchantService) {
    return (
      <div className="text-2xl font-medium text-center flex flex-col h-fit justify-center items-center gap-8 mt-7 mb-8">
        <Image
          src="/images/oops1.png"
          width={976}
          height={370}
          alt="Oops!"
        ></Image>
        <span className={`${dmSans.className}`}>Service does not exist</span>
      </div>
    );
  }

  const userClient = new User();
  const user = await userClient.getOne({ email: sessionUser.email }, [
    'authorization',
  ]);

  const authorizations = (user as any)
    .authorization as Prisma.PaymentAuthorizationGetPayload<
    Prisma.PaymentAuthorizationDefaultArgs<DefaultArgs>
  >[];

  return (
    <div className="flex flex-col gap-2 items-center mx-auto my-8 max-w-[800px] shadow shadow-white">
      <h2 className="text-2xl font-semibold">
        Booking for {merchantService.service?.title}
      </h2>
      <DataView
        authorizations={authorizations}
        merchantService={merchantService}
        userId={user?.id!}
      />
    </div>
  );
};

export default ProtectedPage(Booking, {
  // @ts-ignore
  returnTo: `/service/booking${
    // @ts-ignore
    globalThis.serviceId ? `?service_id=${globalThis.serviceId}` : ''
  }`,
});
