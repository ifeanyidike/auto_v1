import { type Prisma } from '@prisma/client';
import Utility from '../../../server/utility';

export default class FAQ extends Utility {
  constructor() {
    super();
  }

  public async create(data: Prisma.FAQCreateInput) {
    return this.process(async () => {
      return await this.db.fAQ.create({ data });
    });
  }

  public async delete(id: string) {
    return this.process(async () => {
      return await this.db.fAQ.delete({ where: { id } });
    });
  }

  public async update(id: string, data: Prisma.FAQUpdateInput) {
    return this.process(async () => {
      return await this.db.fAQ.update({
        where: { id },
        data,
      });
    });
  }

  public async getOne(id: string) {
    return this.process(async () => {
      return await this.db.fAQ.findUnique({
        where: { id },
      });
    });
  }
}
