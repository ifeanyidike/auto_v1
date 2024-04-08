import '~/styles/globals.css';

// import { Inter } from "next/font/google";
import MainMenu from '~/components/MainMenu';
import MobileMenu from '~/components/MobileMenu';
import { manRope } from '~/font';
import Footer from '~/components/Footer';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import Page from '~/components/Page';
import Util from '~/server/utils';
import { Suspense } from 'react';
import Loading from './loading';
import Notification from './api/notification/logic';
import Auth0 from '~/server/auth0';
import User from './api/user/logic';

// const inter = Inter({
//   subsets: ["latin"],
//   variable: "--font-sans",
// });

export const metadata = {
  title: 'Moxxil Autos',
  description:
    'Moxxil: Empowering mechanics with their own online shop. Book and subscribe to expert auto services seamlessly.',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAdminLogin, merchantData, slug } =
    await Util.getMerchantDataBySubdomain();
  const rawPhoneNo = merchantData?.phoneNo;
  const formattedPhoneNo = Util.formatPhoneNo(rawPhoneNo!);

  const sessionUser = await Auth0.getSessionUser();
  const userClient = new User();
  const user = await userClient.getOne({ email: sessionUser?.email });

  const notificationClient = new Notification();
  const notifications = await notificationClient.getManyByUser(user?.id, slug);

  const userIsAdmin = !!(user?.email && merchantData?.email === user?.email);
  return (
    <html lang="en" className={manRope.className}>
      <UserProvider loginUrl="/api/auth/login">
        <body className={manRope.className}>
          {!isAdminLogin && slug && (
            <>
              <MainMenu
                formattedPhoneNo={formattedPhoneNo}
                rawPhoneNo={rawPhoneNo}
                merchant={merchantData}
                notifications={notifications}
                userIsAdmin={userIsAdmin}
              />
              <MobileMenu phoneNo={rawPhoneNo!} userIsAdmin={userIsAdmin} />
            </>
          )}
          <Suspense fallback={<Loading />}>
            <Page
              isAdminLogin={isAdminLogin}
              merchantData={merchantData}
              slug={slug}
            >
              {children}
            </Page>
          </Suspense>
          {!isAdminLogin && slug && <Footer merchantData={merchantData} />}
        </body>
      </UserProvider>
    </html>
  );
}
