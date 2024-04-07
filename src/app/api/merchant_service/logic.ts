import { type Prisma } from '@prisma/client';
import Utility from '../../../server/utility';
import Merchant from '../merchant/logic';
import { type SubscriptionPlanDuration } from '~/types/payment';
// import Service from './service';

export type MerchantServiceType = Prisma.MerchantServiceGetPayload<{
  include: {
    faqs: true;
    keyPoints: true;
    service: true;
    servicePricing: true;
    merchant: {
      include: {
        miscellanous: true;
      };
    };
    discounts: {
      include: {
        plans: true;
        services: {
          include: {
            servicePricing: true;
          };
        };
      };
    };
    subscriptionPlans: {
      include: { discount: true };
    };
    subscriptions: {
      include: {
        plan: true;
      };
    };
    bookings: true;
  };
}>;

export default class MerchantService extends Utility {
  constructor() {
    super();
  }

  public async create(
    merchantId: string,
    parent_data: Prisma.ServiceCreateInput,
    data: Prisma.MerchantServiceCreateInput,

    keypoints?: string[],
    faqs?: string[],
    planList?: { interval: SubscriptionPlanDuration; code: string }[],
    // faqs?: Record<'question' | 'answer', string>[],
    pricing?: { mode: string; data: { amount: number; type?: string }[] },
    discounts?: string[]
  ) {
    return this.process(async () => {
      return await this.db.merchantService.create({
        data: {
          ...data,
          service: {
            connectOrCreate: {
              create: {
                ...parent_data,
              },
              where: {
                title: parent_data.title,
              },
            },
          },
          merchant: {
            connect: {
              id: merchantId,
            },
          },

          ...(faqs && {
            faqs: {
              connect: faqs.map(k => ({ id: k })),
            },
          }),

          ...(discounts && {
            discounts: {
              connect: discounts.map(d => ({ id: d })),
            },
          }),

          ...(planList && {
            subscriptionPlans: {
              create: planList.map(({ code, interval }) => ({
                code,
                interval,
              })),
            },
          }),

          ...(keypoints && {
            keyPoints: { connect: keypoints.map(k => ({ id: k })) },
          }),

          ...(pricing && {
            servicePricing: {
              create: pricing.data.map(({ type, amount }) => ({
                mode: pricing.mode,
                ...(type && { type }),
                amount: amount!,
              })),
            },
          }),
        },
      });
    });
  }

  public async delete(id: string) {
    return this.process(async () => {
      return await this.db.merchantService.delete({ where: { id } });
    });
  }

  public async update(
    id: string,
    data: Prisma.MerchantServiceUpdateInput,
    keyPoints?: string[],
    faqs?: string[],
    // subscriptions?: string[],
    planList?: string[],
    pricing?: string[],
    discounts?: string[]
  ) {
    return this.process(async () => {
      return await this.db.merchantService.update({
        where: { id },
        data: {
          ...data,
          ...(keyPoints && {
            keyPoints: { connect: keyPoints.map(k => ({ id: k })) },
          }),
          // ...(keyPoints && {

          // }),

          ...(faqs && {
            faqs: {
              connect: faqs.map(k => ({ id: k })),
            },
          }),

          ...(discounts && {
            discounts: {
              connect: discounts.map(k => ({ id: k })),
            },
          }),

          ...(planList?.length && {
            subscriptionPlans: {
              connect: planList.map(k => ({ id: k })),
            },
          }),

          ...(pricing && {
            servicePricing: {
              connect: pricing.map(k => ({ id: k })),
            },
          }),
        },
      });
    });
  }

  public async getOne(data: {
    id?: string;
    title?: string;
    merchantId?: string;
    userId?: string;
  }) {
    const { id, title, merchantId } = data;

    return this.process(async () => {
      if (!id && !title) {
        throw new Error('Service id or title must be provided');
      }
      let serviceId;
      if (title) {
        const serviceData = await this.db.service.findFirst({
          where: {
            title: {
              ...(process.env.NODE_ENV === 'production'
                ? { equals: title, mode: 'insensitive' }
                : { contains: title }),
            },
          },
        });
        serviceId = serviceData?.id;
      }

      if (!serviceId && !id) return null;

      const service = await this.db.merchantService.findFirst({
        where: {
          ...(serviceId ? { serviceId, merchantId } : { id }),
        },
        include: {
          faqs: true,
          keyPoints: true,
          service: true,
          servicePricing: true,
          merchant: {
            include: {
              miscellanous: true,
            },
          },
          discounts: {
            include: {
              plans: true,
              services: {
                include: {
                  servicePricing: true,
                },
              },
            },
          },
          subscriptionPlans: {
            include: {
              discount: true,
            },
          },

          subscriptions: {
            include: {
              plan: true,
            },
          },

          bookings: true,
        },
      });

      return service;
    });
  }

  public async getAllByMerchant(slug: string, limit?: number) {
    return this.process(async () => {
      const merchant = new Merchant();
      const merchantData = await merchant.getOne({ slug });
      if (!merchantData) return null;

      const services = await this.db.merchantService.findMany({
        where: { merchantId: merchantData.id },
        ...(limit && { take: limit }),
        include: {
          faqs: true,
          keyPoints: true,
          service: true,
          servicePricing: true,
          merchant: {
            include: {
              miscellanous: true,
            },
          },
          discounts: {
            include: {
              plans: true,
              services: {
                include: {
                  servicePricing: true,
                },
              },
            },
          },
          subscriptionPlans: {
            include: { discount: true },
          },
          subscriptions: {
            include: {
              plan: true,
            },
          },
          bookings: true,
        },
      });

      // Map the services to the desired structure

      return { merchant: merchantData, services };
    });
  }
}
