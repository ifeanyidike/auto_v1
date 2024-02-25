import { Transaction } from '~/server/payment/transaction';

export const GET = async (req: Request) => {
  const url = new URL(req.url);
  const userId = url.searchParams.get('userId');
  const reference = url.searchParams.get('reference');
  const transaction = new Transaction();
  const newVerification = await transaction.verify(userId!, reference!);
  return new Response(JSON.stringify(newVerification));
};
