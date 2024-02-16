import React from 'react';
import ProductManagementView from '../../components/ProductManagementView';
import Util from '~/server/utils';
import Merchant from '~/app/api/merchant/logic';
import Auth0 from '~/server/auth0';
import MerchantService from '~/app/api/merchant_service/logic';

const EditProduct = async ({
  params,
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
  console.log('serviceData', serviceData);

  return (
    <div className={`gap-5`}>
      <ProductManagementView
        product={serviceData}
        merchantId={merchantData?.id}
      />
    </div>
  );
};

export default EditProduct;
