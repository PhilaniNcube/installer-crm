import { createClient } from "@/utils/supabase/server";
import { QueryData } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export async function fetchProducts() {
  // create cookieStore
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // create query to get visits with a join on the leads table and contractors table
  const productsQuery = supabase
    .from("products")
    .select(`*`)
    .order("name", { ascending: true });

    // generate the type from the visits query
    type Products = QueryData<typeof productsQuery>;

    const {data:products, error} = await productsQuery

    if (error) {
       throw new Error(error.message);
    }

    return products
}

export async function fetchProductById(id:string) {
  // create cookieStore
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // create query to get visits with a join on the leads table and contractors table
  const productQuery = supabase
    .from("products")
    .select(`*`)
    .order("name", { ascending: true }).single();

    // generate the type from the visits query
    type Product = QueryData<typeof productQuery>;

    const {data:product, error} = await productQuery

    if (error) {
       throw new Error(error.message);
    }

    return product
}
export async function fetchQuoteProductsById(quote_id:string,) {
  // create cookieStore
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // create query to get visits with a join on the leads table and contractors table
  const quoteProductsQuery = supabase
    .from("quote_products")
    .select(`quantity, products!inner(*)`).eq('quote_id', quote_id);

    // generate the type from the visits query
    type QuoteProducts = QueryData<typeof quoteProductsQuery>;

    const {data:products, error} = await quoteProductsQuery

    if (error) {
       throw new Error(error.message);
    }

    return {
      products,
      quoteProductsQuery
    }
}
