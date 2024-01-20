import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tables } from "@/schema";
import { createClient } from "@/utils/supabase/server";
import { DotIcon, EyeIcon } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";

const LeadsTable = async ({leads}:{leads:Tables<"leads">[]}) => {


  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>First Name</TableHead>
          <TableHead>Last Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>
            <DotIcon />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leads.map((lead) => {
              return (
                <TableRow key={lead.id}>
                  <TableCell>{lead.first_name}</TableCell>
                  <TableCell>{lead.last_name}</TableCell>
                  <TableCell>{lead.email}</TableCell>
                  <TableCell>{lead.status}</TableCell>
                  <TableCell>
                    <Link
                      prefetch={false}
                      href={`/dashboard/leads/${lead.id}`}
                      className="px-3 py-2 bg-slate-300 rounded hover:bg-slate-100"
                    >
                      View
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
      </TableBody>
    </Table>
  );
};
export default LeadsTable;
