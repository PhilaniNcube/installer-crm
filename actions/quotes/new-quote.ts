"use server"

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const formSchema = z.object({
  lead_id: z.string(),
});

export async function createQuote (formData:FormData) {

  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  // use zod to validate the form data
  const result = formSchema.safeParse({
    lead_id: formData.get('lead_id'),
  });



    if(!result.success) {
    return {
      status: 'error',
      message: result.error.message,
      product: null,
    }
  }

  const { data: quote, error } = await supabase.from("quotes").insert([{
    lead_id: result.data.lead_id,
  }]).select('*').single();



    if(error) {
    return {
      status: 'error',
      message: error.message,
      product: null,
    }
  }

    redirect(`/dashboard/quotes/${quote.id}`)

    return {
    status: 'success',
    message: 'Product created successfully',
    quote: quote
  }


}
