import { type Prisma } from '@prisma/client';
import Merchant from './logic';

// type CreateMerchantParams = {
//   data: Prisma.MerchantServiceCreateInput;
//   keypoints: string[];
//   merchantId: string;
//   parent_data: Prisma.ServiceCreateInput;
// };

export const GET = async (req: Request) => {
  console.log('request', req);
  console.log('host', req.headers.get('host'));
  const merchant = new Merchant();
  const all_merchants = await merchant.getAll();
  return new Response(JSON.stringify(all_merchants));
};

export const POST = async (req: Request) => {
  const data = (await req.json()) as Prisma.MerchantCreateInput;
  const merchant = new Merchant();
  const newMerchant = await merchant.create(data);
  return new Response(JSON.stringify(newMerchant));
};
