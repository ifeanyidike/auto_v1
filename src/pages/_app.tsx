import { useHookstate } from "@hookstate/core";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import MainMenu from "~/components/MainMenu";
import MobileMenu from "~/components/MobileMenu";
import { manRope } from "~/font";
import { toggleNav } from "~/states/utility";

import "~/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const navOpen = useHookstate(toggleNav);
  return (
    <SessionProvider session={session}>
      <main className={manRope.className}>
        <MainMenu />
        {navOpen.get() && <MobileMenu />}
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
};

export default MyApp;
