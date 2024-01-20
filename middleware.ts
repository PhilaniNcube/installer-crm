import { type CookieOptions, createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import { Database } from "./schema";


export async function middleware(request:NextRequest) {
    // Create an unmodified response
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  try {
    // Create a Supabase client configured to use cookies
    const supabase = createServerClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            // If the cookie is updated, update the cookies for the request and response
            request.cookies.set({
              name,
              value,
              ...options,
            })
            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            })
            response.cookies.set({
              name,
              value,
              ...options,
            })
          },
          remove(name:any, options:any) {
            // If the cookie is removed, update the cookies for the request and response
            request.cookies.delete({
              name,
              ...options,
            })
            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            })
            response.cookies.delete({
              name,
              ...options,
            })
          },
        },
      }
    )

   const session = await supabase.auth.getSession()

   if(request.nextUrl.pathname === "/dashboard") {
    console.log("On dashboard path")
    if(!session) {
      return NextResponse.redirect("/login")
    }
   }

  NextResponse.next()


  } catch (e) {
    // If you are here, a Supabase client could not be created!
    // This is likely because you have not set up environment variables.
    // TODO: Feel free to remove this `try catch` block once you have
    // your Next.js app connected to your Supabase project.
    throw new Error('Please set up your `.env.local` file.')
  }

}
