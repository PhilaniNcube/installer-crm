import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

const ContractorPage = async ({params:{id}}:{params:{id:string}}) => {

  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const contractorData = supabase.from("contractors").select("*").eq("id", id).single()

  const [{data, error}] = await Promise.all([
    contractorData
  ]);

  if(error ) {
    console.log(error);
    throw new Error(error.message);
  } else if(data === null) {
    throw new Error("No data found");
  }

  return <div>
    <h1>Contractor Page</h1>
    <p>{data.first_name}</p>
  </div>;
};
export default ContractorPage;
