import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import MainMenu from "~/components/MainMenu";
import { manRope } from "~/font";

import "~/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <main className={manRope.className}>
        <MainMenu />
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
};

export default MyApp;
