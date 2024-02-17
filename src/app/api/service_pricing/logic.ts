import { type Prisma } from '@prisma/client';
import Utility from '../../../server/utility';
import { type CreateMerchantServiceParamType } from '~/types/utils';

export default class ServicePricing extends Utility {
  constructor() {
    super();
  }

  public async create(data: Prisma.ServicePricingCreateInput) {
    return this.process(async () => {
      return await this.db.servicePricing.create({ data });
    });
  }

  public async delete(id: string) {
    return this.process(async () => {
      return await this.db.servicePricing.delete({ where: { id } });
    });
  }

  public async update(id: string, data: Prisma.ServicePricingCreateInput) {
    return this.process(async () => {
      return await this.db.servicePricing.update({
        where: { id },
        data,
      });
    });
  }

  public async getOne(id: string) {
    return this.process(async () => {
      return await this.db.servicePricing.findUnique({
        where: { id },
      });
    });
  }

  public async getManyByData(
    merchantServiceId: string,
    item: CreateMerchantServiceParamType['pricing']
  ) {
    return this.process(async () => {
      return await Promise.all(
        item.data.map(d =>
          this.db.servicePricing.findFirst({
            where: { type: d.type, mode: item.mode, merchantServiceId },
          })
        )
      );
    });
  }

  public async findByData(
    mode: CreateMerchantServiceParamType['pricing']['mode'],
    data: CreateMerchantServiceParamType['pricing']['data'][0],
    serviceId: string
  ) {
    return this.process(async () => {
      return await this.db.servicePricing.findFirst({
        where: {
          merchantServiceId: serviceId,
          mode,
          ...(data.type && { type: data.type }),
        },
      });
    });
  }

  public async getOrCreateMany(
    item: CreateMerchantServiceParamType['pricing'],
    serviceId: string
  ) {
    return await Promise.all(
      item.data.map(async d => {
        const pricing = await this.findByData(item.mode, d, serviceId);
        // if (pricing) return pricing.id;
        if (pricing) {
          const pricingData = await this.update(pricing.id, {
            mode: item.mode,
            ...(d.type && { type: d.type }),
            amount: d.amount!,
          });
          return pricingData.id;
        }

        const pricingData = await this.create({
          mode: item.mode,
          ...(d.type && { type: d.type }),
          amount: d.amount!,
        });
        return pricingData.id;
      })
    );
  }
}
