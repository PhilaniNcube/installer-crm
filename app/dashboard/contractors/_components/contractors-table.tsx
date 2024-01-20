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

const ContractorsTable = async ({ contractors }: { contractors: Tables<"contractors">[] }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>First Name</TableHead>
          <TableHead>Last Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>
            <DotIcon />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {contractors.map((contractor) => {
          return (
            <TableRow key={contractor.id}>
              <TableCell>{contractor.first_name}</TableCell>
              <TableCell>{contractor.last_name}</TableCell>
              <TableCell>{contractor.email}</TableCell>
              <TableCell>{contractor.phone}</TableCell>
              <TableCell>
                <Link
                  prefetch={false}
                  href={`/dashboard/contractors/${contractor.id}`}
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
export default ContractorsTable;
