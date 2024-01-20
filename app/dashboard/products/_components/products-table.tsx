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


type Products = Tables<"products">[];

export function ProductsTable({products, count =1}:{products: Products, count:number}) {
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
        {products.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.name}</TableCell>
            <TableCell>{item.price}</TableCell>
            <TableCell className="text-right">View</TableCell>
          </TableRow>
        ))}
      </TableBody>

    </Table>
  );
}
