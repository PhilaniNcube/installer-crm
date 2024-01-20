
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tables } from "@/schema";
import { format } from "date-fns";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { QueryData } from "@supabase/supabase-js";
import { fetchVisits, fetchVisitsByLeadId } from "@/utils/fetchers/server/visits";
import { Badge } from "@/components/ui/badge";
import { UpdateVisitStatus } from "./update-visit-status";


type ScheduledVisitsProps ={
  visits: Tables<"site_visits">[]
}

export default async function ScheduledVisits({ lead_id }: {lead_id:string}) {

  const data = await fetchVisitsByLeadId(lead_id);

  return (
    <Card className="shadow-lg border overflow-auto">
      <CardHeader>
        <CardTitle>Scheduled Site Visits</CardTitle>
        <CardDescription>Upcoming site visits and details</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 p-4">
        {data.map((item) => (
          <div key={item.id} className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold">{format(item.date, "PPP")}</h3>
              <p className="text-md text-gray-500">
                Contractor: {item.contractors?.first_name}{" "}
                {item.contractors?.last_name}
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-bold">Site Address:</span>{" "}
                {item.leads?.address}
              </p>
            </div>
            <UpdateVisitStatus visitId={item.id} status={item.status!} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
