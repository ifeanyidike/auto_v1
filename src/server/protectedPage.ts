import { headers } from 'next/headers';
import { initializeAuth0 } from '~/lib/auth0';

const ProtectedPage = (Component: any, options = {}) => {
  return async (ctx: any) => {
    const headersList = headers();
    const hostname = headersList.get('host');

    if (ctx?.searchParams?.review_id) {
      // @ts-ignore
      globalThis.reviewId = ctx.searchParams.review_id;
    }

    if (ctx?.searchParams?.service_id) {
      // @ts-ignore
      globalThis.serviceId = ctx.searchParams.service_id;
    }
    const auth0 = initializeAuth0(hostname!);
    return auth0.withPageAuthRequired(Component, options)(ctx);
  };
};

export default ProtectedPage;
