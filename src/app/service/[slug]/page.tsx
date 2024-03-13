import { redirect } from 'next/navigation';
import React from 'react';
import Util from '~/server/utils';
import Client from './Client';
import MerchantService from '~/app/api/merchant_service/logic';
import Auth0 from '~/server/auth0';
import User from '~/app/api/user/logic';

const Service = async ({ params }: { params: { slug: string } }) => {
  const { isAdminLogin, slug: pageSlug } = Util.getRouteType();
  if (isAdminLogin) redirect('/manage');

  const sessionUser = await Auth0.getSessionUser();
  const userClient = new User();
  const user = await userClient.getOne({ email: sessionUser.email });

  const merchantService = new MerchantService();
  const data = await merchantService.getAllByMerchant(pageSlug, 8);

  const service = await merchantService.getOne({
    title: decodeURI(params.slug),
    userId: user?.id,
  });

  return (
    <main>
      <Client
        topServices={data.services}
        merchantService={service}
        subdomain={pageSlug}
      />
    </main>
  );
};

export default Service;
