import { notFound } from 'next/navigation';
import Util from '~/server/utils';
import '~/styles/globals.css';
import Sidebar from './components/Sidebar';

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

  return (
    <div className="relative flex bg-cyanBlue/40">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
