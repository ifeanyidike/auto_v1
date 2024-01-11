// src/middleware.ts

import { type NextRequest, NextResponse } from 'next/server';
import {
  withMiddlewareAuthRequired,
  getSession,
} from '@auth0/nextjs-auth0/edge';

export default async (req: NextRequest) => {
  console.log('req path', req.nextUrl.pathname);
  //   if (req.nextUrl.pathname === "/api/status") {
  //     return NextResponse.next();
  //   }

  const res = NextResponse.next();
  const user = await getSession(req, res);
  if (user) {
    // set your user.token whenever you want, db, cookies, localStorage etc
    return res;
  }
  return res;
};
export const config = {
  matcher: '/',
};
