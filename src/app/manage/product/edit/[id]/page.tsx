import React from 'react';
import Util from '~/server/utils';
import Merchant from '~/app/api/merchant/logic';
import MerchantService from '~/app/api/merchant_service/logic';
import Client from './Client';

const EditProduct = async ({
  params,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  searchParams,
}: {
  params: { id: string };
  searchParams?: Record<string, string | string[] | undefined>;
}) => {
  const { slug } = Util.getRouteType();
  const merchant = new Merchant();
  const merchantData = await merchant.getOne({ slug });

  const service = new MerchantService();
  const serviceData = await service.getOne({ id: params.id });
  const hasApiKey = !!merchantData?.apiKeys?.paystack;

  return (
    <div className={`gap-5`}>
      <Client
        product={serviceData}
        merchant={merchantData!}
        hasApiKey={hasApiKey}
      />
    </div>
  );
};

export default EditProduct;
