import { type Prisma } from '@prisma/client';
import Discount from './logic';

export const POST = async (req: Request) => {
  const data = (await req.json()) as Prisma.DiscountCreateInput;
  const discount = new Discount();
  const newDiscount = await discount.create({ ...data });
  return new Response(JSON.stringify(newDiscount));
};
