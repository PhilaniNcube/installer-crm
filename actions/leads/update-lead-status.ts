"use server"

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { z } from "zod";

const formSchema = z.object({
  id: z.string(),
  status: z.enum(["new", "contacted", "quoted", "won", "lost"]),
});

type DataSchema = z.infer<typeof formSchema>;

export async function updateStatus(formData:FormData){

  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const status = formData.get("status") as string;
  const id = formData.get("id") as string;

  if(!status || !id) {
    throw new Error("Status and ID are required.")
  }

  const { data: lead, error } = await supabase.from("leads").update({ status}).eq('id', id).select('*').single();

  if(error) {
    throw new Error(error.message)
  }

  revalidatePath(`/dashboard/leads/${lead.id}`);


}
