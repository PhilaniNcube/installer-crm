"use client"

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { fetchVisitsByContractorId, fetchVisitsById } from "@/utils/fetchers/client/visits";
import { useQuery } from "@tanstack/react-query";
import { format, formatDistance, formatDistanceToNowStrict } from "date-fns";
import { Mail, Phone } from "lucide-react";
import { useSearchParams } from "next/navigation";

const SiteVisit = () => {

  const searchParams = useSearchParams();
  const site_id = searchParams.get("site_id") as string || "";

  const { data, isLoading, isError, isPending, isFetched } = useQuery({
    queryKey: ["site_id", site_id],
    queryFn: async () => await fetchVisitsById(site_id),
  });


  if(site_id === "") {
    return <Card>
      <CardContent>
      <div className="flex py-3 flex-col space-y-2">
        <p className="text-red-500 text-xl font-medium">Please select a site visit or there are no scheduled site visits for this contractor.</p>
      </div>
      </CardContent>
    </Card>;
  }

  if (isLoading || isPending) {
    return (
      <Card>
        <CardContent>
          <div className="animate-pulse flex flex-col space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if(isError) {
    return (
      <Card>
        <CardContent>
          <div className="flex flex-col space-y-2">
            <p className="text-red-500">Error fetching site visit</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isFetched) {

    return (
      <div key={data.id}>
        <Card>
          <CardContent>
            <div className="flex justify-between items-center py-3">
              <div className="flex flex-col">
                <p className="">{format(data.date, "PPP")}</p>
                <p className="text-sm text-gray-600 font-medium">
                  Site visit is{" "}
                  {formatDistanceToNowStrict(data.date, {
                    addSuffix: true,
                    unit: "day",
                    roundingMethod: "ceil",
                  })}
                </p>
              </div>

              <Badge className="text-sm uppercase">{data.status}</Badge>
            </div>
            <Separator />
            <div className="w-full mt-2">
              <p className="text-sm text-gray-600 font-medium">
                Site visit details
              </p>
              <div className="flex flex-col space-y-2">
                <div className="flex  flex-col space-y-2">
                  <div className="flex bg-slate-100 rounded px-3 py-2 flex-col">
                    <p className="text-xl font-medium">
                      Name: {data.leads?.first_name} {data.leads?.last_name}
                    </p>
                    <p className="text-md flex items-center">
                      <Mail className="mr-2" />
                      {data.leads?.email}
                    </p>
                    <p className="text-md flex items-center">
                      <Phone className="mr-2" />
                      <span>{data.leads?.phone}</span>
                    </p>
                  </div>
                  <Separator />
                  <div className="px-3 py-2">
                      <p className="text-lg text-gray-600 font-medium">Address</p>
                      <p className="text-sm">{data.leads?.address}</p>
                      <p className="text-sm">{data.leads?.city}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

};
export default SiteVisit;
