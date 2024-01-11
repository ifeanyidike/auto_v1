import { notFound } from 'next/navigation';
import PageNotFound from '~/components/PageNotFound';
import Util from '~/server/utils';
import '~/styles/globals.css';

export const metadata = {
  title: 'Admin Page',
  description: 'TO DO',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAdminLogin } = Util.getRouteType();
  if (!isAdminLogin) return notFound();

  return <>{children}</>;
}
