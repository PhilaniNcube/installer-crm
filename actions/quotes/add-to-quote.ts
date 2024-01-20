"use server"

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const formSchema = z.object({
  product_id: z.string(),
  quantity: z.string(),
});

export async function addToQuote (id:string, formData:FormData) {

  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  // use zod to validate the form data
  const result = formSchema.safeParse({
    product_id: formData.get('product_id'),
    quantity: formData.get('quantity'),
  });

  console.log(JSON.stringify(result, null, 2));



    if(!result.success) {
    return {
      status: 'error',
      message: result.error.message,
      product: null,
    }
  }

  const { data: quote, error } = await supabase.from("quote_products").insert([{
    product_id: result.data.product_id,
    quote_id: id,
    quantity: Number(result.data.quantity),
  }]).select('*').single();



    if(error) {
    return {
      status: 'error',
      message: error.message,
      product: null,
    }
  }

  console.log("Add To Quote", {quote})

    revalidatePath(`/dashboard/quotes/${id}`)

    return {
    status: 'success',
    message: 'Product created successfully',
    quote: quote
  }


}
