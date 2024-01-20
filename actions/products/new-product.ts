"use server"

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { z } from "zod";

type ActionData = {
  name: string;
  description: string;
  price: number;
}

const formSchema = z.object({
  name: z.string().trim().min(2, {
    message: "name must be at least 2 characters.",
  }),
  description: z
    .string()
    .trim()
    .min(2, {
      message: "description must be at least 2 characters.",
    })
    .max(255, {
      message: "description must be less than 255 characters.",
    }),
  price: z.coerce.number(),
});


export async function createNewProduct(data:ActionData) {

  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { name, description, price } = data;

  const result = formSchema.safeParse({ name, description, price });

  if(!result.success) {
    return {
      status: 'error',
      message: result.error.message,
      product: null,
    }
  }

  const { data: product, error } = await supabase.from("products").insert([{ name, description, price:Number(price) }]).select('*').single();

  if(error) {
    return {
      status: 'error',
      message: error.message,
      product: null,
    }
  }
  revalidatePath(`/dashboard/products/${product.id}`);

  return {
    status: 'success',
    message: 'Product created successfully',
    product: product
  }


}
