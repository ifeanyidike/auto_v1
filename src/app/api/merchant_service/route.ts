import { type Prisma } from '@prisma/client';
import MerchantService from './logic';
import { type CreateMerchantServiceParamType } from '~/types/utils';
// type Props = {
//   data: Prisma.MerchantServiceCreateInput;
//   keypoints: string[];
//   merchantId: string;
//   parent_data: Prisma.ServiceCreateInput;
// };
// export const POST = async (req: Request) => {
//   const { data, keypoints, parent_data, merchantId } =
//     (await req.json()) as Props;
//   const service = new MerchantService();
//   const newService = await service.create(
//     merchantId,
//     keypoints,
//     parent_data,
//     data
//   );
//   return new Response(JSON.stringify(newService));
// };

export const POST = async (req: Request) => {
  const { data, merchantId, fileProps } = (await req.json()) as {
    merchantId: string;
    data: CreateMerchantServiceParamType;
    fileProps: {
      name: string;
      lastModified: string;
      type: string;
      size: number;
    };
  };

  try {
    console.log('data', data);

    // if (fileProps) {
    //   data.image.file = {
    //     ...data.image.file,
    //     ...fileProps,
    //   } as unknown as File;
    // }
    const service = new MerchantService();

    const newService = await service.handleCreate(merchantId, data);
    return new Response(JSON.stringify(newService));
  } catch (error) {
    console.log('Error: ', error);
    const errorData = error as { message: string; status: number };
    if (errorData.status === 500) {
      return new Response(
        JSON.stringify({ error: 'An internal server error occurred' }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    return new Response(JSON.stringify({ error: errorData?.message }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
