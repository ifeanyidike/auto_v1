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

  public async getManyByData(data: Record<'question' | 'answer', string>[]) {
    return this.process(async () => {
      return await Promise.all(
        data.map(d =>
          this.db.fAQ.findFirst({
            where: { ...d },
          })
        )
      );
    });
  }

  public async findByQuestionAndAnswer(
    data: Record<'question' | 'answer', string>
  ) {
    console.log('data in findByQuestionAndAnswer', data);
    return this.process(async () => {
      return await this.db.fAQ.findFirst({
        where: { ...data },
      });
    });
  }

  public async getOrCreateMany(data: Record<'question' | 'answer', string>[]) {
    console.log('data in faq getOrCreateMany', data);
    return await Promise.all(
      data.map(async item => {
        const faq = await this.findByQuestionAndAnswer(item);
        if (faq) return faq.id;
        const faqData = await this.create(item);
        return faqData.id;
      })
    );
  }
}
