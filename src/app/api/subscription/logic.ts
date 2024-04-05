import { type Prisma } from '@prisma/client';
import Utility from '../../../server/utility';
import { type DefaultArgs } from '@prisma/client/runtime/library';

export type SubscriptionItem = Prisma.SubscriptionGetPayload<{
  include: {
    merchantService: {
      include: {
        service: true;
        discounts: true;
      };
    };
    plan: true;
    user: true;
    fufillments: true;
  };
}>;

export type subscriptionByUserItem = Omit<SubscriptionItem, 'user'> & {
  merchant: Prisma.MerchantGetPayload<
    Prisma.MerchantDefaultArgs<DefaultArgs>
  > | null;
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

  public async update(id: string, data: Prisma.SubscriptionUpdateInput) {
    return this.process(async () => {
      return await this.db.subscription.update({
        where: {
          id,
        },
        data: {
          ...data,
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
          fufillments: true,
        },
      });

      return data;
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
          }) as subscriptionByUserItem
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

      return data as Omit<SubscriptionItem, 'user'>[];
    });
  }
}
