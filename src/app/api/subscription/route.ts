import Subscription from './logic';
import SubscriptionPlan from '../subscription_plan/logic';
import { type NextRequest } from 'next/server';

type CreateParams = {
  serviceId: string;
  merchantId: string;
  code: string;
  interval: string;
  userId: string;
};

export const POST = async (req: Request) => {
  const { serviceId, code, interval, merchantId, userId } =
    (await req.json()) as CreateParams;

  const subscriptionPlan = new SubscriptionPlan();
  const plan = await subscriptionPlan.findItem({
    code,
    interval,
    merchantServiceId: serviceId,
  });
  const planId = plan?.id;
  if (!planId) return;

  const subscription = new Subscription();
  const newSubscription = await subscription.create(
    serviceId,
    merchantId,
    planId,
    userId
  );
  return new Response(JSON.stringify(newSubscription));
};

export const GET = async (req: NextRequest) => {
  const url = new URL(req.url);
  const limit = url.searchParams.get('limit') as unknown as number;
  const offset = url.searchParams.get('offset') as unknown as number;
  const merchantId = url.searchParams.get('merchantId');
  if (!merchantId) return;

  const subscription = new Subscription();
  const subscriptionList = await subscription.findByMerchant(
    merchantId,
    limit,
    offset
  );
  console.log('subscriptionList', subscriptionList);
  return new Response(JSON.stringify(subscriptionList));
};
