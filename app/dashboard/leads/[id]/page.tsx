import BackButton from "@/components/back-button";
import { Separator } from "@/components/ui/separator";
import LeadStatus from "./_components/lead-status";
import { createClient } from "@/utils/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ContactInformation from "./_components/contact-information";
import LeadNotes from "./_components/lead-notes";
import SiteVisit from "./_components/site-visit";
import ScheduledVisits from "./_components/site-visit-list";
import { ScrollArea } from "@/components/ui/scroll-area";
import ProductsList from "@/components/products/products-list";
import NewQuote from "./_components/new-quote";
import NotesList from "./_components/notes-list";
import { cookies } from "next/headers";
import LeadQuotes from "./_components/lead-quotes";

const page = async ({params:{id}}:{params:{id:string}}) => {

  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const leadData = supabase.from("leads").select("*").eq("id", id).single()
  const contractorsData = supabase.from("contractors").select("*").order("first_name", {ascending:true})
  const visitsData = supabase.from("site_visits").select("*").eq("lead_id", id).order("date", {ascending:false})
  const productsData = supabase.from("products").select("*").order("date", {ascending:false})
  const quotesData = supabase.from("quotes").select("*").order("created_at", {ascending:false}).eq("lead_id", id)



  const [leadResponse, contractorsResponse, visitsResponse, productsResponse, quotesResponse] =
    await Promise.all([
      leadData,
      contractorsData,
      visitsData,
      productsData,
      quotesData,
    ]);

  if(leadResponse.error) {
    console.log(leadResponse.error);
    throw new Error(leadResponse.error.message);
  } else if(contractorsResponse.error) {
    console.log(contractorsResponse.error);
    throw new Error(contractorsResponse.error.message);
  }


  return (
    <ScrollArea className="w-full">
      <div className="flex justify-between items-center py-2">
        <BackButton />
        <div className="flex items-center justify-center">
          <NewQuote
            lead_id={leadResponse.data.id}
            products={productsResponse.data!}
          />
          <Separator orientation="vertical" className="mx-2 text-black" />
          <LeadStatus id={id} status={leadResponse.data.status} />
        </div>
      </div>
      <Separator className="my-2" />
      <div className="grid grid-cols-3 gap-10">
        <ContactInformation lead={leadResponse.data} />
        <LeadNotes id={id} />
        <NotesList id={id} />


        <div className="">
          <Card>
            <CardHeader>
              <CardTitle>Schedule Visit</CardTitle>
            </CardHeader>
            <CardContent>
              <SiteVisit contractors={contractorsResponse.data} leadId={id} />
            </CardContent>
          </Card>
        </div>

        <div className="col-span-1">
          <ScheduledVisits lead_id={id} />
        </div>

        <Card className="col-span-1">
          <CardContent>
            {/* <ProductsList lead_id={id} /> */}
            <LeadQuotes quotes={quotesResponse.data!} />
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
};
export default page;
