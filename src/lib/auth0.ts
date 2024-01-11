// src/lib/auth0.ts
import { initAuth0 } from '@auth0/nextjs-auth0';

export const initializeAuth0 = (host: string): ReturnType<typeof initAuth0> => {
  return initAuth0({
    baseURL: `http://${host}`,
    secret: process.env.AUTH0_SECRET,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    session: {
      cookie: {
        domain: `.${host.split(':')[0]?.split('.').slice(-2).join('.')}`,
      },
    },
  });
};
