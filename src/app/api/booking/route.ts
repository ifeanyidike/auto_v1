import Subscription from './logic';
import SubscriptionPlan from '../subscription_plan/logic';
import { type NextRequest } from 'next/server';

type CreateParams = {
  serviceId: string;
  code: string;
  interval: string;
  userId: string;
};

export const POST = async (req: Request) => {
  const { serviceId, code, interval, userId } =
    (await req.json()) as CreateParams;

  const subscriptionPlan = new SubscriptionPlan();
  const plan = await subscriptionPlan.findItem({ code, interval });
  const planId = plan?.id;
  if (!planId) return;

  const subscription = new Subscription();
  const newSubscription = await subscription.create(serviceId, planId, userId);
  return new Response(JSON.stringify(newSubscription));
};

export const GET = async (req: NextRequest) => {
  const url = new URL(req.url);
  const limit = url.searchParams.get('limit');
  const subscription = new Subscription();
  const subscriptionList = await subscription.getMany(limit);
  console.log('subscriptionList', subscriptionList);
  return new Response(JSON.stringify(subscriptionList));
};
