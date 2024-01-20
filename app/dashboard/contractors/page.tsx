import BackButton from "@/components/back-button";
import { Separator } from "@/components/ui/separator";
import NewContractor from "./_components/new-contractor";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import ContractorsTable from "./_components/contractors-table";
import { Card, CardFooter } from "@/components/ui/card";
import { Suspense } from "react";
import PaginationButtons from "@/components/pagination";

const Contractors = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {

      const cookieStore = cookies();
      const supabase = createClient(cookieStore);

      const page = searchParams["page"] ?? "1";
      const per_page = searchParams["per_page"] ?? "5";

      const start = (Number(page) - 1) * Number(per_page); // 0, 5, 10 ...
      const end = start + (Number(per_page) - 1); // 5, 10, 15 ...

      const {
        data: contractors,
        error,
        count,
      } = await supabase
        .from("contractors")
        .select("*", { count: "exact" })
        .range(start, end)
        .order("first_name", { ascending: false });

      const total_pages = Math.ceil(count! / Number(per_page));

  return (
    <div>
      <div className="flex justify-between items-center py-2">
        <BackButton />
      </div>
      <Separator className="my-3" />
      <div className="mt-4 grid grid-cols-3 gap-8">
        <NewContractor />
        {error ? (
          <div className="flex items-center justify-center py-16">
            <p className="text-center text-gray-500">
              There was an error loading the contractors.
            </p>
          </div>
        ) : (
          <Card className="bg-white col-span-2 shadow-lg rounded-lg p-8">
            <Suspense
              fallback={
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 border-dashed">
                    {" "}
                  </div>
                </div>
              }
            >
              <ContractorsTable contractors={contractors} />
            </Suspense>
            <CardFooter>
              <PaginationButtons pages={total_pages} />
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
};
export default Contractors;
