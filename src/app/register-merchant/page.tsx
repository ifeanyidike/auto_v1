import React from 'react';
import Auth0 from '~/server/auth0';
import PageClient from './PageClient';
import ParentHeader from '~/components/ParentHeader';

const RegisterMerchant = async () => {
  const userInfo = await Auth0.findOrCreateAuth0User();
  // 'bg-blend-overlay bg-stone-900/100  h-full py-8 bg-[url("/images/servicebannerimage.jpg")] bg-cover bg-center bg-no-repeat'
  return (
    <div className="h-full">
      <ParentHeader />
      <PageClient email={userInfo?.email!} />
    </div>
  );
};

// export default ProtectedPage(RegisterMerchant, {
//   returnTo: '/register-merchant',
// });
export default RegisterMerchant;
