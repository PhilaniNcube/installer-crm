import PaginationButtons from "@/components/pagination";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tables } from "@/schema";
import formatCurrency from "@/utils/format/currency";
import AddToQuote from "./add-to-quote";

type Products = Tables<"products">[];

export function QuoteProducts({
  products,
  quote_id,
  // quoteProducts,
}: {
  products: Products;
  quote_id: string;
  // quoteProducts: Tables<"quote_products">[];
}) {
  return (
    <Table className="max-w-[600px]">
      <TableCaption>Products.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="">Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead className="text-right">View</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((item) => {


          return (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>{formatCurrency(item.price)}</TableCell>
              <TableCell className="text-right">
                <AddToQuote product={item} id={quote_id} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
