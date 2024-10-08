import { notFound } from 'next/navigation';
import Util from '~/server/utils';
import '~/styles/globals.css';
import Sidebar from './components/Sidebar';
import Merchant from '../api/merchant/logic';
import Auth0 from '~/server/auth0';
import MerchantUnauthorizedPage from '~/components/MerchantUnauthorizedPage';
import ProtectedPage from '~/server/protectedPage';

export const metadata = {
  title: 'Admin Page',
  description: 'TO DO',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

async function Layout({ children }: { children: React.ReactNode }) {
  const { isAdminLogin, slug } = Util.getRouteType();
  if (!isAdminLogin) return notFound();

  const merchantClient = new Merchant();
  const merchant = await merchantClient.getOne({ slug });

  const user = await Auth0.findOrCreateAuth0User();

  if (merchant?.email !== user?.email) {
    return <MerchantUnauthorizedPage isLoggedIn={!!user?.email} />;
  }

  return (
    <div className="relative flex bg-cyanBlue/40 min-h-screen">
      <Sidebar logo={merchant?.logo!} />
      <div className="flex flex-col flex-1 overflow-hidden">{children}</div>
    </div>
  );
}

export default ProtectedPage(Layout, { returnTo: '/manage/' });
