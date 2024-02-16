import React from 'react';
import Util from '~/server/utils';
import PageNotFound from './PageNotFound';
import { type Prisma } from '@prisma/client';
import { type DefaultArgs } from '@prisma/client/runtime/library';
import { redirect } from 'next/navigation';
import { manRope } from '~/font';

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
  if (!merchantData) return PageNotFound({ slug });

  return <div className={manRope.className}>{props.children}</div>;
};

export default Page;
