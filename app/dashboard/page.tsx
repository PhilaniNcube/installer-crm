import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { Suspense } from "react";
import NewLeadCard from "./_components/new-lead-card";
import NewLeadsTable from "./_components/new-leads-table";

const Dashboard = async () => {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const leadsPromise =  supabase.from("leads").select("*", {count:"exact"})
  const enquireisPromise =  supabase.from("enquiries").select("*", {count:"exact"})
  const customersPromise =  supabase.from("customers").select("*", {count:"exact"})

  const [leadsData, customersData, enquiriesData] = await Promise.all([
    leadsPromise,
    enquireisPromise,
    customersPromise,
  ]);

  console.log({leadsData, customersData, enquiriesData})


  return (
    <div className="w-full">
      <div className="grid grid-cols-3 gap-8">
        <Suspense fallback={<div>Loading...</div>}>
          <Card className="bg-white shadow-lg rounded-lg p-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800">
                Leads
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-gray-800">
                {leadsData.count}
              </p>
            </CardContent>
          </Card>
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <Card className="bg-white shadow-lg rounded-lg p-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800">
                Customers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-gray-800">
                {customersData.count}
              </p>
            </CardContent>
          </Card>
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <Card className="bg-white shadow-lg rounded-lg p-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800">
                Enquiries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-gray-800">
                {enquiriesData.count}
              </p>
            </CardContent>
          </Card>
        </Suspense>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-8">
        <NewLeadCard />
        <Card className="bg-white shadow-lg rounded-lg p-8">
          <NewLeadsTable />
        </Card>
      </div>
    </div>
  );
};
export default Dashboard;
