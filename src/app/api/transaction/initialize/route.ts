import { Transaction } from '~/server/payment/transaction';

type Params = {
  email: string;
  amount: number;
  plan: string;
  callback_url: string;
};

export const POST = async (req: Request) => {
  const { email, amount, plan, callback_url } = (await req.json()) as Params;
  const transaction = new Transaction();
  const newTransaction = await transaction.initialize(
    email,
    amount,
    plan,
    callback_url
  );
  return new Response(JSON.stringify(newTransaction));
};
