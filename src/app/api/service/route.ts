import { type Prisma } from '@prisma/client';
import Service from './logic';

export const POST = async (req: Request) => {
  const { type, title, description, imgUrl } =
    (await req.json()) as Prisma.ServiceCreateInput;
  const service = new Service();
  const newService = await service.create({ type, title, description, imgUrl });
  return new Response(JSON.stringify(newService));
};
