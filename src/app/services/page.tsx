import React from 'react';
import ServiceBanner from '~/components/ServiceBanner';
import ServiceClient from './ServiceClient';
import Util from '~/server/utils';
import { redirect } from 'next/navigation';
import MerchantService from '../api/merchant_service/logic';

const Services = async () => {
  const { isAdminLogin, slug } = Util.getRouteType();
  if (isAdminLogin) redirect('/manage');

  const merchantService = new MerchantService();
  const { services } = await merchantService.getAllByMerchant(slug);
  return (
    <div>
      <ServiceBanner />
      <ServiceClient services={services} />
    </div>
  );
};

export default Services;
