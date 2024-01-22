import BackButton from "@/components/back-button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import SiteVisits from "../_components/site-visits";
import SiteVisit from "../_components/site-visit";

const ContractorPage = async ({params:{id}}:{params:{id:string}}) => {

  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const contractorData = supabase.from("contractors").select("*").eq("id", id).single()
  const siteVisitData = supabase.from("site_visits").select("*").eq("contractor_id", id)

  const [{ data, error },{data:site_visits, error:error_site_visits}] = await Promise.all([contractorData, siteVisitData]);

  if(error ) {
    console.log(error);
    throw new Error(error.message);
  } else if(data === null) {
    throw new Error("No data found");
  }

  return (
    <ScrollArea>
      <div className="flex justify-between items-center py-2">
        <BackButton />
        <div className="flex flex-col items-start">
          <p className="font-semibold text-xl">
            {data.first_name} {data.last_name}
          </p>
          <p className="text-sm">{data.email}</p>
        </div>
      </div>
      <Separator className="my-3" />
      <div className="grid grid-cols-2 gap-4">
        {site_visits === null || site_visits.length === 0 ? (
          <div className="col-span-1">
            <p className="text-gray-400">No site visits found</p>
          </div>
        ) : (
          <SiteVisits site_visits={site_visits} />
        )}
        <SiteVisit />
      </div>

      <ScrollBar />
    </ScrollArea>
  );
};
export default ContractorPage;
