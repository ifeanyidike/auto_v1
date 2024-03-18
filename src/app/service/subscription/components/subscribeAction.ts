'use server';

import { headers } from 'next/headers';
import Auth0 from '~/server/auth0';
import { Transaction } from '~/server/payment/transaction';

type Data = {
  amount: number;
  planCode: string;
  serviceId: string | null;
};
export async function subscribeUserToPlan(state: Data) {
  const headersList = headers();
  const hostname = headersList.get('host');
  const user = await Auth0.getSessionUser();
  console.log('state', state);

  const callbackUrl = `http://${hostname}/service/subscription/confirm?service=${state.serviceId}&user_email=${user.email}`;
  try {
    const transaction = new Transaction();
    const newTransaction = await transaction.initialize(
      user.email,
      Math.round(state.amount) * 100,
      state.planCode,
      callbackUrl
    );
    console.log('newTransaction', newTransaction);
    return {
      message: newTransaction.message,
      authorizationUrl: newTransaction.data.authorization_url,
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
}
