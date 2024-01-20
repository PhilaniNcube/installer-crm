"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { z } from "zod";

const formSchema = z.object({
  id: z.string(),
  status: z.enum(["pending", "visited", "revisit"]),
});

type DataSchema = z.infer<typeof formSchema>;

export async function updateStatus(formData: FormData) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const status = formData.get("status") as string;
  const id = formData.get("id") as string;

  if (!status || !id) {
    throw new Error("Status and ID are required.");
  }

  const { data: visit, error } = await supabase
    .from("site_visits")
    .update({ status })
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  console.log({visit, error});

  revalidatePath(`/dashboard/leads/${visit.lead_id}`);
}
