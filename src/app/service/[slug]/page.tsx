import { redirect } from 'next/navigation';
import React from 'react';
import Util from '~/server/utils';
import Client from './Client';
import MerchantService from '~/app/api/merchant_service/logic';

const Service = async () => {
  const { isAdminLogin, slug } = Util.getRouteType();
  if (isAdminLogin) redirect('/manage');

  const merchantService = new MerchantService();
  const data = await merchantService.getAllByMerchant(slug, 8);

  return (
    <main>
      <Client topServices={data.services} subdomain={slug} />
    </main>
  );
};

export default Service;
