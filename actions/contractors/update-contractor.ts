"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { z } from "zod";

const formSchema = z.object({
  id: z.string(),
  first_name: z.string().min(2, {
    message: "First Name must be at least 2 characters.",
  }).optional(),
  last_name: z.string().min(2, {
    message: "Last Name must be at least 2 characters.",
  }).optional(),
  city: z.string({
    required_error: "City is required.",
  }).optional(),
  phone: z.string().min(10, {
    message: "Phone must be at least 10 characters.",
  }).optional(),
  email: z.string().email().optional(),
});

type DataSchema = z.infer<typeof formSchema>;

export async function updateContractor(data: DataSchema) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const result = formSchema.safeParse(data);

  if (!result.success) {
    return {
      status: 400,
      body: result.error,
    };
  }

  const {
    first_name,
    last_name,
    city,
    phone,
    email,
    id
  } = data;

  const { data: contractor, error } = await supabase
    .from("contractors")
    .update({first_name, last_name, city, phone, email}).eq("id", id).select("*").single();

  if (error) {
    return {
      contractor: null,
      message: error.message,
      code: error.code,
    };
  }

  revalidatePath("/dashboard/contractors");
  return {
    contractor: contractor,
    message: "Lead created successfully",
    code: 200,
  };
}
