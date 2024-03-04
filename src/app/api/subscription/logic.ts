import { type Prisma } from '@prisma/client';
import Utility from '../../../server/utility';
import { type DefaultArgs } from '@prisma/client/runtime/library';

export type SubscriptionItem = {
  id: string;
  merchantService: {
    service: Prisma.ServiceGetPayload<
      Prisma.ServiceDefaultArgs<DefaultArgs>
    > | null;
    discounts:
      | Prisma.DiscountGetPayload<Prisma.DiscountDefaultArgs<DefaultArgs>>[]
      | null;
    pricingMode: string;
  };
  user: Prisma.UserGetPayload<Prisma.UserDefaultArgs<DefaultArgs>> | null;
  plan: Prisma.SubscriptionPlanGetPayload<
    Prisma.SubscriptionPlanDefaultArgs<DefaultArgs>
  > | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};
export default class Subscription extends Utility {
  constructor() {
    super();
  }
  public async create(
    serviceId: string,
    merchantId: string,
    planId: string,
    userId: string
  ) {
    return this.process(async () => {
      return await this.db.subscription.create({
        data: {
          merchantService: {
            connect: { id: serviceId },
          },
          merchant: {
            connect: { id: merchantId },
          },
          plan: {
            connect: { id: planId },
          },
          user: {
            connect: { id: userId },
          },
          status: 'active',
        },
      });
    });
  }

  public async getOne(id: string) {
    return this.process(async () => {
      return await this.db.subscription.findFirst({ where: { id } });
    });
  }

  public async delete(id: string) {
    return this.process(async () => {
      return await this.db.subscription.delete({ where: { id } });
    });
  }

  public async findByMerchant(
    merchantId: string,
    limit?: number,
    offset?: number
  ) {
    return this.process(async () => {
      const data = await this.db.subscription.findMany({
        where: { merchantId },
        ...(limit && { take: limit, skip: offset }),
        orderBy: {
          updatedAt: 'asc',
        },
        include: {
          merchantService: {
            include: {
              service: true,
              discounts: true,
            },
          },
          plan: true,
          user: true,
        },
      });

      return data.map(
        d =>
          ({
            id: d.id,
            merchantService: {
              service: d.merchantService.service,
              discounts: d.merchantService.discounts,
              pricingMode: d.merchantService.pricingMode,
            },
            user: d.user,
            plan: d.plan,
            status: d.status,
            createdAt: d.createdAt,
            updatedAt: d.updatedAt,
          }) as SubscriptionItem
      );
    });
  }

  public async findByUser(userId: string, limit?: number, n?: number) {
    return this.process(async () => {
      const data = await this.db.subscription.findMany({
        where: { userId },
        ...(limit && { take: limit, skip: n }),
        orderBy: {
          updatedAt: 'asc',
        },
        include: {
          merchantService: {
            include: {
              service: true,
              discounts: true,
            },
          },
          user: true,
          merchant: true,
        },
      });

      return data.map(
        d =>
          ({
            id: d.id,
            merchantService: {
              service: d.merchantService.service,
              discounts: d.merchantService.discounts,
              pricingMode: d.merchantService.pricingMode,
            },
            merchant: d.merchant,
            status: d.status,
            createdAt: d.createdAt,
            updatedAt: d.updatedAt,
          }) as Omit<SubscriptionItem, 'user'> & {
            merchant: Prisma.MerchantGetPayload<
              Prisma.MerchantDefaultArgs<DefaultArgs>
            > | null;
          }
      );
    });
  }

  public async findByUserAndMerchant(
    userId: string,
    merchantId: string,
    limit?: number,
    n?: number
  ) {
    return this.process(async () => {
      const data = await this.db.subscription.findMany({
        where: { userId, merchantId },
        ...(limit && { take: limit, skip: n }),
        orderBy: {
          updatedAt: 'asc',
        },
        include: {
          merchantService: {
            include: {
              service: true,
              discounts: true,
            },
          },
        },
      });

      return data.map(
        d =>
          ({
            id: d.id,
            merchantService: {
              service: d.merchantService.service,
              discounts: d.merchantService.discounts,
              pricingMode: d.merchantService.pricingMode,
            },
            status: d.status,
            createdAt: d.createdAt,
            updatedAt: d.updatedAt,
          }) as Omit<SubscriptionItem, 'user'>
      );
    });
  }
}