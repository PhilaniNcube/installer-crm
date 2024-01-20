import { createClient } from "@/utils/supabase/server";
import { QueryData } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export async function fetchQuoteById(id:string) {
  // create cookieStore
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // create query to get visits with a join on the leads table and contractors table
  const quoteQuery = supabase
    .from("quotes")
    .select(`*, leads!inner(status, first_name, last_name, address, city, suburb, postal_code, phone, email)`).eq('id', id).single();

    // generate the type from the visits query
    type Quote = QueryData<typeof quoteQuery>;

    const {data:quote, error} = await quoteQuery

    if (error) {
       throw new Error(error.message);
    }

    return quote
}



