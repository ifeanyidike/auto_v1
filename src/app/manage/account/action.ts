'use server';
import { z } from 'zod';
import Merchant from '~/app/api/merchant/logic';

type GeneralSettingsData = {
  name: string;
  address: string | null;
  phoneNo: string;
  caption: string | null;
  shortDescription: string | null;
};

const schema = z.object({
  address: z.string({
    required_error: 'Merchant address is required',
    invalid_type_error: 'Auto merchant address must be a string',
  }),
  name: z
    .string({
      required_error: 'Auto merchant name is required',
      invalid_type_error: 'Auto merchant name must be a string',
    })
    .min(3, { message: 'Auto merchant name cannot be less than 3 characters' }),
  phoneNo: z.string({ required_error: 'Phone Number is required' }),
  caption: z
    .string({
      required_error: 'Caption is required',
      invalid_type_error: 'Caption must be a string',
    })
    .min(5, { message: 'Caption cannot be less than 5 characters' }),
  shortDescription: z
    .string({
      required_error: 'Description is required',
      invalid_type_error: 'Description must be a string',
    })
    .min(5, { message: 'Description cannot be less than 5 characters' }),
});

export async function updateMerchantGeneralSettings(
  id: string,
  data: GeneralSettingsData
) {
  const validatedFields = schema.safeParse({
    ...data,
  });

  console.log('In here', data);

  if (!validatedFields.success) {
    const errors = validatedFields.error.flatten().fieldErrors;
    const errorValues = Object.values(errors);
    if (errorValues[0]?.length) {
      return {
        error: errorValues[0][0],
      };
    }
  }
  console.log('data', data);

  const merchantClient = new Merchant();
  await merchantClient.update(id, {
    ...data,
  });

  return { success: true };
}
