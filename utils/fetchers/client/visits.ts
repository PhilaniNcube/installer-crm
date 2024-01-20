import { createClient } from "@/utils/supabase/client";
import { QueryData } from "@supabase/supabase-js";

export async function fetchVisits() {

  const supabase = createClient();

  // create query to get visits with a join on the leads table and contractors table
  const visitsQuery = supabase
    .from("site_visits")
    .select(
      `id,date,status,leads( id, first_name, last_name, email, phone, address, city, status),
      contractors( id, first_name, last_name, email, phone, city)`
    )
    .order("date", { ascending: false });

    // generate th type from the visits query
    type Visits = QueryData<typeof visitsQuery>;

    const {data:visits, error} = await visitsQuery

    if (error) {
       throw new Error(error.message);
    }

    return visits
}


export async function fetchVisitsByLeadId(leadId:string) {
const supabase = createClient();

  // create query to get visits with a join on the leads table and contractors table
  const visitsQuery = supabase
    .from("site_visits")
    .select(
      `id,date,status,leads( id, first_name, last_name, email, phone, address, city, status),
      contractors( id, first_name, last_name, email, phone, city)`
    ).eq('lead_id', leadId)
    .order("date", { ascending: true });

    // generate th type from the visits query
    type Visits = QueryData<typeof visitsQuery>;

    const {data:visits, error} = await visitsQuery

    if (error) {
       throw new Error(error.message);
    }

    return visits
}


export async function fetchVisitsByContractorId(contractorId:string) {
const supabase = createClient();

  // create query to get visits with a join on the leads table and contractors table
  const visitsQuery = supabase
    .from("site_visits")
    .select(
      `id,date,status,leads( id, first_name, last_name, email, phone, address, city, status),
      contractors( id, first_name, last_name, email, phone, city)`
    ).eq('contractor_id', contractorId)
    .order("date", { ascending: false });

    // generate th type from the visits query
    type Visits = QueryData<typeof visitsQuery>;

    const {data:visits, error} = await visitsQuery

    if (error) {
       throw new Error(error.message);
    }

    return visits
}
