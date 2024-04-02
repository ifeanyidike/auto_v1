import { type CreateMerchantServiceParamType } from '~/types/utils';
import MerchantService from '../logic';

// const getFormDataFields = (formData: FormData) => {
//   const data = {
//     description: {},
//     image: {},
//     pricing: {},
//     product_type: {},
//     faq_keypoints: {},
//   } as CreateMerchantServiceParamType;
//   let merchantId;
//   let mode = 'draft';
//   let existingProductId = null;
//   let isDraft = false;
//   let imageUrl: string | undefined = undefined;

//   for (const [name, value] of formData.entries()) {
//     if (name === 'description') {
//       data[name].description = value.toString();
//     }
//     if (name === 'image') {
//       data[name].file = value as File;
//     }
//     if (name === 'product_type') {
//       data[name] = JSON.parse(
//         value.toString()
//       ) as CreateMerchantServiceParamType['product_type'];
//     }
//     if (name === 'faq_keypoints') {
//       data[name] = JSON.parse(
//         value.toString()
//       ) as CreateMerchantServiceParamType['faq_keypoints'];
//     }

//     if (name === 'pricing') {
//       data[name] = JSON.parse(
//         value.toString()
//       ) as CreateMerchantServiceParamType['pricing'];
//     }

//     if (name === 'subscriptions') {
//       data[name] = JSON.parse(
//         value.toString()
//       ) as CreateMerchantServiceParamType['subscriptions'];
//     }

//     if (name === 'merchantId') merchantId = value.toString();
//     if (name === 'mode') mode = value.toString();

//     if (name === 'isDraft') isDraft = Boolean(value);
//     if (name === 'existingProductId') existingProductId = value.toString();
//     if (name === 'imageUrl') imageUrl = value.toString();
//   }

//   return { merchantId, data, mode, isDraft, existingProductId, imageUrl };
// };

// export const POST = async (req: Request) => {
//   try {
//     const form = await req.formData();
//     const { merchantId, data, mode, existingProductId, imageUrl } =
//       getFormDataFields(form);

//     const service = new MerchantService();

//     let newService;
//     if (mode === 'draft') {
//       newService = await service.saveDraft(
//         merchantId!,
//         data,
//         existingProductId
//       );
//     } else {
//       newService = await service.handleCreate(
//         merchantId!,
//         data,
//         existingProductId,
//         imageUrl
//       );
//     }

//     return new Response(JSON.stringify(newService));
//   } catch (error) {
//     console.log('Error: ', error);
//     const errorData = error as { message: string; status: number };
//     if (errorData.status === 500) {
//       return new Response(
//         JSON.stringify({ error: 'An internal server error occurred' }),
//         {
//           status: 500,
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         }
//       );
//     }

//     return new Response(JSON.stringify({ error: errorData?.message }), {
//       status: 400,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//   }
// };
