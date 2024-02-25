import PaymentAuthorization from './logic';
import { type TransactionDataResponse } from '~/types/payment';

type CreateParam = {
  data: TransactionDataResponse['data']['authorization'];
  userId: string;
};
export const POST = async (req: Request) => {
  const { userId, data } = (await req.json()) as CreateParam;
  const authorization = new PaymentAuthorization();
  const newAuthorization = await authorization.add(userId, data);
  return new Response(JSON.stringify(newAuthorization));
};
