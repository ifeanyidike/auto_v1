import React from 'react';
import PageNotFound from './PageNotFound';
import { type Prisma } from '@prisma/client';
import { type DefaultArgs } from '@prisma/client/runtime/library';
import { manRope } from '~/font';
import Auth0 from '~/server/auth0';

type Props = {
  children: React.ReactNode;
  slug: string | undefined;
  merchantData: Prisma.MerchantGetPayload<
    Prisma.MerchantDefaultArgs<DefaultArgs>
  > | null;
  isAdminLogin: boolean;
};
const Page = async (props: Props) => {
  const { merchantData, slug } = props;
  //   if (isAdminLogin) redirect('/manage');

  await Auth0.findOrCreateAuth0User();

  if (!merchantData) return PageNotFound({ slug });

  return <div className={manRope.className}>{props.children}</div>;
};

export default Page;
