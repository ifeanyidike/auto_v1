import { type Prisma } from '@prisma/client';
import FAQ from './logic';

export const POST = async (req: Request) => {
  const data = (await req.json()) as Prisma.FAQCreateInput;
  const faq = new FAQ();
  const newFAQ = await faq.create(data);
  return new Response(JSON.stringify(newFAQ));
};
