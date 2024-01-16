import { notFound } from 'next/navigation';
import Util from '~/server/utils';
import '~/styles/globals.css';
import Sidebar from './components/Sidebar';
import TopMenu from './components/TopMenu';

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
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col">
        <TopMenu />
        {children}
      </div>
    </div>
  );
}
