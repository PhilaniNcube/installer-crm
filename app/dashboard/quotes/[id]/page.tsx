import BackButton from "@/components/back-button";
import PaginationButtons from "@/components/pagination";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { Separator } from "@/components/ui/separator";

import { Card, CardContent, CardFooter } from "@/components/ui/card";

import { Suspense } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { ProductsTable } from "../../products/_components/products-table";
import { QuoteProducts } from "./_components/quote-products";
import { fetchQuoteProductsById } from "@/utils/fetchers/server/products";
import QuoteDetails from "./_components/quote-details";
import LeadHeader from "./_components/lead-header";

const Quotes = async ({
  params:{id},
}: {
  params:{id:string}
}) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {data: quote, error,} = await supabase.from("quotes").select("*").eq("id", id).single()




  if(error) {
    console.log(error)
    throw new Error(error.message)
  }

  // get the products from the database
  const productsData = supabase.from("products").select("*").order("name", {ascending:false})


  const [ productsResponse] = await Promise.all([
    productsData
  ]);


 if(productsResponse.error) {
    console.log(productsResponse.error);
    throw new Error(productsResponse.error.message, {
      cause: productsResponse.error.details,
    });
  }


  const { products: quoteProducts } = await fetchQuoteProductsById(id);





  return (
    <ScrollArea>
      <div className="flex justify-between items-center py-2">
        <div className="flex flex-col space-y-2">
          <BackButton />
        </div>
        <Badge className="text-center flex items-center justify-center">
          {quote.status}
        </Badge>
      </div>
      <Separator className="my-3" />
      <div className="grid grid-cols-2 gap-8">
        <div className="col-span-2 lg:col-span-1">
          <h2 className="font-semibold">Products/Services</h2>
          <QuoteProducts
            quote_id={id}
            products={productsResponse.data!}
            // quoteProducts={quoteProducts}
          />
        </div>
        <div className="col-span-2 lg:col-span-1">
          <LeadHeader quote_id={id} />
          <Separator className="my-3" />
          <QuoteDetails quote_id={id} />
        </div>
      </div>
      <ScrollBar />
    </ScrollArea>
  );
};
export default Quotes;
