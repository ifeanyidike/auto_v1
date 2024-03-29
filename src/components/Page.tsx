import React from 'react';
// import PageNotFound from './PageNotFound';
import { manRope } from '~/font';
import Auth0 from '~/server/auth0';
import ClientPage from './ClientPage';
import { type MerchantType } from '~/app/api/merchant/logic';

type Props = {
  children: React.ReactNode;
  slug: string | undefined;
  merchantData: MerchantType | null;
  isAdminLogin: boolean;
};
const Page = async (props: Props) => {
  const { merchantData, slug } = props;
  //   if (isAdminLogin) redirect('/manage');

  await Auth0.findOrCreateAuth0User();

  // if (!merchantData) return PageNotFound({ slug });

  return (
    <div className={manRope.className}>
      <ClientPage merchantData={merchantData} slug={slug}>
        {props.children}
      </ClientPage>
    </div>
  );
};

export default Page;
