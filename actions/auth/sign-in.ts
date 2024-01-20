"use server"

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { z } from 'zod';

export async function signIn(formData: FormData) {

    const schema = z.object({
    password: z.string().min(1),
    email: z.string(),
  })


  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const parse = schema.safeParse({
    email,
    password
  })


  if (!parse.success) {
    throw new Error(parse.error.message)
  }


 const cookieStore = cookies()
 const supabase = createClient(cookieStore)

  const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

  if (error) throw new Error(error.message)

  console.log({data})
  redirect('/dashboard')

  // create a new user with the email and password and additional information

}
