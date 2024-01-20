import BackButton from "@/components/back-button";
import PaginationButtons from "@/components/pagination";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { Separator } from "@/components/ui/separator";
import NewLeadCard from "../_components/new-lead-card";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import LeadsTable from "./_components/leads-table";
import ErrorCard from "./_components/error-card";
import { Suspense } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

const Leads = async ({
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
      data: leads,
      error,
      count,
    } = await supabase
      .from("leads")
      .select("*", { count: "exact" })
      .range(start, end)
      .order("created_at", { ascending: false });



    const total_pages = Math.ceil(count! / Number(per_page));

  return (
    <ScrollArea>
      <div className="flex justify-between items-center py-2">
        <BackButton />
      </div>
      <Separator className="my-3" />
      <div className="mt-4 grid grid-cols-3 gap-8">
        <NewLeadCard />
        {error ? (
          <ErrorCard />
        ) : (
          <Card className="bg-white col-span-2 shadow-lg rounded-lg p-8">
            <Suspense fallback={<div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 border-dashed">{" "}</div>
            </div>}>
              <LeadsTable leads={leads} />
            </Suspense>
            <CardFooter>
              <PaginationButtons pages={total_pages} />
            </CardFooter>
          </Card>
        )}
      </div>
    </ScrollArea>
  );
};
export default Leads;
