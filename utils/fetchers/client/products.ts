import { createClient } from "@/utils/supabase/client";
import { QueryData } from "@supabase/supabase-js";


export async function fetchProducts() {

  const supabase = createClient();

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
  const supabase = createClient();

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
