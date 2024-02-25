import { Transaction } from '~/server/payment/transaction';

type Params = Record<
  'userId' | 'email' | 'amount' | 'authorization_code',
  string
>;

export const POST = async (req: Request) => {
  const { userId, email, amount, authorization_code } =
    (await req.json()) as Params;
  const transaction = new Transaction();
  const newVerification = await transaction.charge_authorization(
    userId,
    email,
    amount,
    authorization_code
  );
  return new Response(JSON.stringify(newVerification));
};
