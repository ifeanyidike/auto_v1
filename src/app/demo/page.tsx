import React from 'react';
import PageClient from './PageClient';
import ParentHeader from '~/components/ParentHeader';
import Util from '~/server/utils';
import { notFound } from 'next/navigation';

const Demo = () => {
  const { slug } = Util.getRouteType();
  if (slug) return notFound();
  return (
    <div>
      <ParentHeader />
      <PageClient />
    </div>
  );
};

export default Demo;
