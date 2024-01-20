"use server"

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

import { z } from 'zod';

export async function signUp(formData: FormData) {

    const schema = z.object({
    first_name: z.string().min(1),
    last_name: z.string().min(1),
    password: z.string().min(1),
    email: z.string(),
  })

  const first_name = formData.get('first_name') as string;
  const last_name = formData.get('last_name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const parse = schema.safeParse({
    first_name,
    last_name,
    email,
    password
  })


  if (!parse.success) {
    throw new Error(parse.error.message)
  }

  // error handling to check if any of the formData inputs are not valid, then throw an error
   if (!first_name || !last_name || !email || !password) {
    throw new Error('Please fill out all fields.');
  }

 const cookieStore = cookies()
 const supabase = createClient(cookieStore)

  const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name,
          last_name
        }
      }
    })

  if (error) throw new Error(error.message)

  console.log({data})
  return data

  // create a new user with the email and password and additional information

}
