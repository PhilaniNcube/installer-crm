import { fetchQuoteById } from "@/utils/fetchers/server/quotes";
import { format } from "date-fns";

const LeadHeader = async ({quote_id}:{quote_id:string}) => {

  const quote = await fetchQuoteById(quote_id)

  return <section className=" py-2">
    <div className="flex justify-between w-full items-start">
      <div>
        <p className="text-2xl font-semibold">Quote</p>
        <p className="text-sm font-semibold">
         Name: {quote.leads?.first_name} {quote.leads?.last_name}
        </p>
        <p className="text-sm font-semibold">
         {quote.leads?.email} <br />
         {quote.leads?.phone}
        </p>
        <p className="text-sm font-semibold">
         Address: {quote.leads?.address}, {quote.leads?.suburb} <br />
          {quote.leads?.city} <br />
          {quote.leads?.postal_code}
        </p>
        <small className="mt-2">
         Generated on {format(quote.created_at, "PPP")} <br />
        </small>
      </div>
    </div>
  </section>;
};
export default LeadHeader;
