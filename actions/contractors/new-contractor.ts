"use server";

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
  city: z.string({
    required_error: "City is required.",
  }),
  phone: z.string().min(10, {
    message: "Phone must be at least 10 characters.",
  }),
  email: z.string().email(),
});

type DataSchema = z.infer<typeof formSchema>;

export async function createNewContractor(data: DataSchema) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const result = formSchema.safeParse(data);

  if (!result.success) {
    return {
      status: "error",
      contractor: null,
      message: result.error.message,
      error: result.error.flatten,
    };
  }

  const {
    first_name,
    last_name,
    city,
    phone,
    email,
  } = data;

  const { data: contractor, error } = await supabase
    .from("contractors")
    .insert([
      {
        first_name,
        last_name,
        city,
        phone,
        email,
      },
    ])
    .select("*")
    .single();

  if (error) {
    return {
      status: "error",
      contractor: null,
      message: error.message,
      error: error.details,
    };
  }

  revalidatePath("/dashboard/contractors");
  return {
    status: "success",
    contractor: contractor,
    message: "Lead created successfully",
    error: null,
  };
}
