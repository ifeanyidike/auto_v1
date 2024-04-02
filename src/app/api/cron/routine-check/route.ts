import { Plan } from '~/server/payment/plan';
import Discount from '../../discount/logic';
import { Mailer } from '~/server/mail';
import Notification from '../../notification/logic';

export const GET = async (req: Request) => {
  const discountClient = new Discount();
  const expired = await discountClient.getExpiredDiscounts();

  const planClient = new Plan();
  const planData = expired.flatMap(discount => {
    return discount.plans.flatMap(d => ({
      code: d.code,
      amount:
        Number(
          d.merchantService?.servicePricing.find(s => s.type === d.autoBrand)
            ?.amount
        ) * 100,
    }));
  });
  await planClient.updatePlansAmount(planData);
  await discountClient.deleteExpiredDiscounts();

  const discountPerUsers = expired.flatMap(e => {
    return e.plans.flatMap(plan => {
      return plan.subscription.flatMap(sub => {
        return {
          merchantLogo: e.merchant?.logo,
          merchantName: e.merchant?.name,
          merchantPhone: e.merchant?.phoneNo,
          serviceName:
            sub.merchantService.service?.title + '-' + plan.autoBrand,
          receiverEmail: sub.user.email,
          receiverName: sub.user.firstName,
          subdomain: e.merchant?.slug,
          receiverId: sub.user.id,
        };
      });
    });
  });

  const mailer = new Mailer();
  const notification = new Notification();

  await Promise.all(
    discountPerUsers.map(async d => {
      await mailer.sendEmailForCancelledDiscount(
        d.merchantLogo,
        d.merchantName!,
        d.merchantPhone!,
        d.serviceName!,
        d.receiverEmail,
        d.receiverName
      );

      if (d.receiverId && d.subdomain && d.serviceName) {
        await notification.create({
          message: `Discount on ${d.serviceName} has expired`,
          subdomain: d.subdomain,
          receiver: {
            connect: {
              id: d.receiverId,
            },
          },
        });
      }
    })
  );

  await Promise.all(
    expired.map(async e => {
      if (e.merchant?.slug && e.merchantId) {
        await notification.create({
          message: `Some of your discounts expired today. Visit your page to check.`,
          subdomain: e.merchant?.slug!,
          merchant: {
            connect: {
              id: e.merchantId!,
            },
          },
        });
      }
    })
  );

  return new Response(JSON.stringify({ success: true }));
};
