import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tables } from "@/schema";
import { format } from "date-fns";
import { EyeIcon } from "lucide-react";
import Link from "next/link";

type SiteVisitsProps = {
  site_visits: Tables<"site_visits">[]
}

const SiteVisits = ({ site_visits }: SiteVisitsProps) => {
  return <Card>
    <CardHeader>
      <h3 className="text-lg font-semibold">Site Visits</h3>
      <p className="text-sm text-gray-400">All site visits</p>
    </CardHeader>
    <CardContent>
      <div className="flex flex-col">
        {site_visits.map((site_visit) => {
          return <div key={site_visit.id} className="flex items-center justify-between odd:bg-slate-100 py-2 px-3 rounded hover:bg-slate-200">
            <div className="flex flex-col">
            <p className="text-md text-gray-600 font-medium">{format(site_visit.date, "PP")}</p>
            <p className="text-sm uppercase">{site_visit.status}</p>
            </div>
            <Link href={`/dashboard/site-visits/${site_visit.id}`}>
              <Button variant="outline" className="text-sm flex space-x-3">View
              <EyeIcon className="ml-2" />
              </Button>
            </Link>
          </div>
        })}
      </div>
    </CardContent>
  </Card>;
};
export default SiteVisits;
