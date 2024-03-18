'use client';

import { type Prisma } from '@prisma/client';
import { type DefaultArgs } from '@prisma/client/runtime/library';
import React from 'react';
import PageNotFound from './PageNotFound';
import { usePathname } from 'next/navigation';
import { ALLOWED_URLs } from 'utilities/common';

type Props = {
  children: React.ReactNode;
  merchantData: Prisma.MerchantGetPayload<
    Prisma.MerchantDefaultArgs<DefaultArgs>
  > | null;
  slug: string | undefined;
};
const ClientPage = (props: Props) => {
  const pathname = usePathname();

  const getIsAllowed = () => {
    const path = pathname.split('/');
    if (path.length === 1) return false;

    return ALLOWED_URLs.some(allowed => allowed === path[1]);
  };

  const isAllowed = getIsAllowed();

  if (!props.merchantData && !isAllowed)
    return PageNotFound({ slug: props.slug });
  return <div>{props.children}</div>;
};

export default ClientPage;
