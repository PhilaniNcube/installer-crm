import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { createClient } from "@/utils/supabase/server";
import { DotIcon, EyeIcon } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";

const NewLeadsTable = async () => {

  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const leadsPromise =  supabase.from("leads").select("*", {count:"exact"}).limit(5).order("created_at", {ascending: false})

  const [leadsData] = await Promise.all([
    leadsPromise,
  ]);

  console.log({leadsData})

  return <Table>
    <TableHeader>
      <TableRow>
        <TableHead>
          First Name
        </TableHead>
        <TableHead>
          Last Name
        </TableHead>
        <TableHead>
          Email
        </TableHead>
        <TableHead>
          Status
        </TableHead>
        <TableHead>
          <DotIcon/>
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {leadsData.error ? "No Results" : (
        leadsData.data.map((lead) => {
          return (
            <TableRow key={lead.id}>
              <TableCell>{lead.first_name}</TableCell>
              <TableCell>{lead.last_name}</TableCell>
              <TableCell>{lead.email}</TableCell>
              <TableCell>{lead.status}</TableCell>
              <TableCell>
                <Link prefetch={false} href={`/dashboard/leads/${lead.id}`} className="px-3 py-2 bg-slate-300 rounded hover:bg-slate-100">
                 View
                </Link>
              </TableCell>
            </TableRow>
          );
        })
      )
      }
    </TableBody>
  </Table>;
};
export default NewLeadsTable;
