"use server"

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { z } from "zod";

const formSchema = z.object({
  id: z.string(),
  note: z.string().max(255, {
    message: "Note must be less than 255 characters.",
  }),
});

type DataSchema = z.infer<typeof formSchema>;

export async function newNote(formData:FormData){

  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const note = formData.get("note") as string;
  const id = formData.get("id") as string;

  if(!note || !id) {
    throw new Error("Note and ID are required.")
  }

  const { data: lead, error } = await supabase.from("lead_notes").insert([{ note, lead_id: id }]).select('*').single();

  if(error) {
    throw new Error(error.message)
  }

  revalidatePath(`/dashboard/leads/${lead.id}`);


}
