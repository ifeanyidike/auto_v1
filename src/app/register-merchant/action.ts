'use server';
import { z } from 'zod';
import Merchant from '../api/merchant/logic';
import { Mailer } from '~/server/mail';
type Data = {
  email: string;
  name?: string;
  slug?: string;
  phoneNo?: string;
};

const schema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Please ensure the email is in correct format.' }),
  name: z
    .string({
      required_error: 'Auto merchant name is required',
      invalid_type_error: 'Auto merchant name must be a string',
    })
    .min(3, { message: 'Auto merchant name cannot be less than 3 characters' }),
  slug: z
    .string({
      required_error: 'Slug is required',
      invalid_type_error: 'Slug must be a string',
    })
    .min(3, { message: 'Slug cannot be less than 3 characters' }),
  phoneNo: z.string({ required_error: 'Phone Number is required' }),
});

export async function createMerchant(data: Data) {
  const validatedFields = schema.safeParse({
    ...data,
  });

  if (!validatedFields.success) {
    const errors = validatedFields.error.flatten().fieldErrors;
    const errorValues = Object.values(errors);
    if (errorValues[0]?.length) {
      return {
        error: errorValues[0][0],
      };
    }
  }

  if (!/^[a-z](-?[a-z])*$/.test(data.slug!)) {
    return { error: 'Slug is not in the correct format. ' };
  }

  const merchantClient = new Merchant();
  await merchantClient.create({
    name: data.name!,
    email: data.email!,
    slug: data.slug!,
    phoneNo: data.phoneNo!,
  });

  try {
    const mailer = new Mailer();
    await mailer.sendWelcomeMerchantEmail(data.slug!, data.name!);
  } catch (error) {}

  return { success: true };
}
