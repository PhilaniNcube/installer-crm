import BackButton from "@/components/back-button";
import { Separator } from "@/components/ui/separator";
import NewProduct from "./_components/new-product";
import { ProductsTable } from "./_components/products-table";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import PaginationButtons from "@/components/pagination";


const Products = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? "5";

  const start = (Number(page) - 1) * Number(per_page); // 0, 5, 10 ...
  const end = start + Number(per_page); // 5, 10, 15 ...

  const {
    data: products,
    error,
    count,
  } = await supabase
    .from("products")
    .select("*", { count: "exact" })
    .range(start, end)
    .order("name", { ascending: true });

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  const total_pages = Math.ceil(count! / Number(per_page));

  return (
    <div>
      <div className="flex justify-between items-center py-2">
        <BackButton />
        <NewProduct />
      </div>
      <Separator className="my-2" />
      <div className="grid grid-cols-2 gap-10">
        <Card>
          <CardContent>
            <ProductsTable products={products} count={count!} />
          </CardContent>
          <CardFooter className="">
            <PaginationButtons pages={total_pages} />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
export default Products;
