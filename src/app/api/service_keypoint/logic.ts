import { type Prisma } from '@prisma/client';
import Utility from '../../../server/utility';

export default class ServiceKeypoint extends Utility {
  constructor() {
    super();
  }

  public async create(data: Prisma.ServiceKeyPointCreateInput) {
    return this.process(async () => {
      return await this.db.serviceKeyPoint.create({ data });
    });
  }

  public async delete(id: string) {
    return this.process(async () => {
      return await this.db.serviceKeyPoint.delete({ where: { id } });
    });
  }

  public async getMany(limit?: number) {
    return this.process(async () => {
      return await this.db.serviceKeyPoint.findMany({
        ...(limit && { take: limit }),
      });
    });
  }

  public async getOne(id: string) {
    return this.process(async () => {
      return await this.db.serviceKeyPoint.findFirst({ where: { id } });
    });
  }

  public async getManyByData(data: string[]) {
    return this.process(async () => {
      return await Promise.all(
        data.map(point =>
          this.db.serviceKeyPoint.findFirst({
            where: { point },
          })
        )
      );
    });
  }

  public async findItem(point: string) {
    return this.process(async () => {
      return await this.db.serviceKeyPoint.findFirst({
        where: { point },
      });
    });
  }

  public async getOrCreateMany(data: string[]) {
    return await Promise.all(
      data.map(async point => {
        const keypoint = await this.findItem(point);
        if (keypoint) return keypoint.id;
        const keypoint_data = await this.create({ point });
        return keypoint_data.id;
      })
    );
  }
}
