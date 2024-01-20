"use server"

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { z } from "zod";

const formSchema = z.object({
  first_name: z.string().min(2, {
    message: "First Name must be at least 2 characters.",
  }),
  last_name: z.string().min(2, {
    message: "Last Name must be at least 2 characters.",
  }),
  address: z.string().min(2, {
    message: "Address must be at least 2 characters.",
  }),
  city: z.string({
    required_error: "City is required.",
  }),
  phone: z.string().min(10, {
    message: "Phone must be at least 10 characters.",
  }),
  email: z.string().email(),
  suburb: z.string().optional(),
  postal_code: z.string().optional(),
});

type DataSchema = z.infer<typeof formSchema>;

export async function createNewLead(data:DataSchema){

  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const result = formSchema.safeParse(data);

  if (!result.success) {
    return {
      status: 400,
      body: result.error,
    };
  }

  const { first_name, last_name, address, city, suburb, postal_code, phone, email } = data;

  const { data: leads, error } = await supabase.from("leads").insert([
    {
      first_name,
      last_name,
      address,
      city,
      suburb,
      postal_code,
      status: "new",
      phone,
      email,
    },
  ]).select("*").single();

  if(error) {
    return {
      lead: null,
      message: error.message,
      code: error.code,
    }
  }

  revalidatePath("/dashboard/leads");
  return {
    leads:leads,
    message: "Lead created successfully",
    code: 200,
  }


}
