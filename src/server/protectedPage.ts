import { headers } from 'next/headers';
import { initializeAuth0 } from '~/lib/auth0';

const ProtectedPage = (Component: any, options = {}) => {
  return async (ctx: any) => {
    const headersList = headers();
    const hostname = headersList.get('host');
    const auth0 = initializeAuth0(hostname!);
    return auth0.withPageAuthRequired(Component, options)(ctx);
  };
};

export default ProtectedPage;
