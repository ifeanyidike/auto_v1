import React from 'react';
import ProductManagementView from '../components/ProductManagementView';
import Util from '~/server/utils';
import Merchant from '~/app/api/merchant/logic';
import Auth0 from '~/server/auth0';

const AddNewProduct = async () => {
  const { slug } = Util.getRouteType();
  const merchant = new Merchant();
  const merchantData = await merchant.getOne({ slug });

  return (
    <div className={`gap-5`}>
      <ProductManagementView merchantId={merchantData?.id} />
    </div>
  );
};

export default Auth0.ProtectedPage(AddNewProduct, {
  returnTo: '/manage/product/new',
});
