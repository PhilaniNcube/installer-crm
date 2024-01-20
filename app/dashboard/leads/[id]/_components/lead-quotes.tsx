import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tables } from "@/schema";
import { format } from "date-fns";
import Link from "next/link";

type LeadQuotesProps = {
  quotes: Tables<"quotes">[];
}

const LeadQuotes = ({ quotes }: LeadQuotesProps) => {

  if (quotes === null || quotes?.length === 0) {
    return <p className="text-2xl font-semibold px-4 py-4">No quotes yet</p>;
  }

  return <div className="px-2 py-4">
    <p className="text-2xl font-semibold">Quotes</p>
    <div className="flex flex-col">
      {quotes.map((quote) => {
        return (
          <div key={quote.id} className="my-2">
            <div className="flex flex-row w-full justify-between items-center">
              <div className="flex flex-col">
                <p className="text-sm font-semibold">
                  {format(quote.created_at, "PPP")}
                </p>
                <Badge className="w-fit">
                  {quote.status}
                </Badge>
              </div>

              <Button type="button" size={`lg`} variant={`outline`}>
                <Link href={`/dashboard/quotes/${quote.id}`}>View Quote</Link>
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  </div>;
};
export default LeadQuotes;
