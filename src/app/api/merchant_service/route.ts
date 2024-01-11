import { type Prisma } from '@prisma/client';
import MerchantService from './logic';
type Props = {
  data: Prisma.MerchantServiceCreateInput;
  keypoints: string[];
  merchantId: string;
  parent_data: Prisma.ServiceCreateInput;
};
export const POST = async (req: Request) => {
  const { data, keypoints, parent_data, merchantId } =
    (await req.json()) as Props;
  const service = new MerchantService();
  const newService = await service.create(
    merchantId,
    keypoints,
    parent_data,
    data
  );
  return new Response(JSON.stringify(newService));
};
