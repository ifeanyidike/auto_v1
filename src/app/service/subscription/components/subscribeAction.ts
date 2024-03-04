'use server';

import { headers } from 'next/headers';
import Auth0 from '~/server/auth0';
import { Transaction } from '~/server/payment/transaction';

export async function subscribeUserToPlan(state: any, _: FormData) {
  const headersList = headers();
  const hostname = headersList.get('host');
  const user = await Auth0.getSessionUser();

  const callbackUrl = `http://${hostname}/service/subscription/confirm?service=${state.serviceId}&user_email=${user.email}`;
  try {
    const transaction = new Transaction();
    const newTransaction = await transaction.initialize(
      user.email,
      state.amount,
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
      message: error.message,
    };
  }
}
