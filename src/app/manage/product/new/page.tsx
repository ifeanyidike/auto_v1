import React from 'react';
import Util from '~/server/utils';
import Merchant from '~/app/api/merchant/logic';
import NewProductView from '../components/NewProductView';
import ProtectedPage from '~/server/protectedPage';

const AddNewProduct = async () => {
  const { slug } = Util.getRouteType();
  const merchant = new Merchant();
  const merchantData = await merchant.getOne({ slug });
  const hasApiKey = !!merchantData?.apiKeys?.paystack;

  return (
    <div className={`gap-5`}>
      <NewProductView merchantId={merchantData?.id} hasApiKey={hasApiKey} />
    </div>
  );
};

export default ProtectedPage(AddNewProduct, {
  returnTo: '/manage/product/new',
});
