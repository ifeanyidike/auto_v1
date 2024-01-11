import { type NextApiRequest, type NextApiResponse } from 'next';
// // // app/api/auth/[auth0]/route.js
// import { handleAuth, handleLogin, initAuth0 } from '@auth0/nextjs-auth0';

// const auth0 = initAuth0({
//   secret: process.env.AUTH0_SECRET,
//   issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
//   baseURL: 'http://eddy-auto.localhost:3000',
//   clientID: process.env.AUTH0_CLIENT_ID,
//   clientSecret: process.env.AUTH0_CLIENT_SECRET,
// });

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
// export const GET = handleAuth({
//   //   login: handleLogin({ authorizationParams: { screen_hint: 'Login now' } }),
//   async login(req: NextApiRequest, res: NextApiResponse) {
//     try {
//       console.log('request', req);
//       // `auth0.handleAuth` and `handleLogin` will be using separate instances
//       // You should use `auth0.handleLogin` instead
//       return await handleLogin(req, res); // <= named export
//     } catch (error) {
//       console.log('Error message: ', error);
//     }
//   },
// });

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
// export const GET = auth0.handleAuth({
//   async login(req: NextApiRequest, res: NextApiResponse) {
//     try {
//       // `auth0.handleAuth` and `handleLogin` will be using separate instances
//       // You should use `auth0.handleLogin` instead
//       return await handleLogin(req, res);
//     } catch (error) {
//       console.log('ERror', error);
//     }
//   },
// });

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
// export const GET = auth0.handleAuth();

import { initializeAuth0 } from '~/lib/auth0';
import { type NextRequest, type NextResponse } from 'next/server';

export const GET = (req: NextRequest, res: NextResponse) => {
  const host = req.headers.get('host');
  const auth0 = initializeAuth0(host!);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
  return auth0.handleAuth()(req, res);
};
