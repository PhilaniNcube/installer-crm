import { fetchProducts } from "@/utils/fetchers/server/products";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import formatCurrency from "@/utils/format/currency";
import { Button } from "../ui/button";

const ProductsList = async ({lead_id}: {lead_id:string}) => {


  console.log("lead id: ", lead_id)

  const products = await fetchProducts();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>


        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((item) => {
          return (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{formatCurrency(item.price)}</TableCell>


            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
export default ProductsList;
