import { type Prisma } from '@prisma/client';
import SubscriptionPlan from './logic';

export const POST = async (req: Request) => {
  const data = (await req.json()) as Prisma.SubscriptionPlanCreateInput;
  const subscription_type = new SubscriptionPlan();
  const newSubscriptionType = await subscription_type.create({ ...data });
  return new Response(JSON.stringify(newSubscriptionType));
};
