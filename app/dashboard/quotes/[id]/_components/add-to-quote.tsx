"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "@/components/submit-button";
import { Tables } from "@/schema";
import { addToQuote } from "@/actions/quotes/add-to-quote";


type ProductProps = {
  product: Tables<"products">;
  id: string;
};

const AddToQuote = ({ product, id }: ProductProps) => {

  const addToQuoteWithId = addToQuote.bind(null, id);


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add To Quote</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add To Quote</DialogTitle>
        </DialogHeader>
        <form action={addToQuoteWithId} className="grid gap-4 py-4">
          <div className="hidden">
            <Label htmlFor="product_id" className="text-right">
              Name
            </Label>
            <Input
              type="hidden"
              id="name"
              name="product_id"
              value={product.id}
              className="col-span-3"
            />
          </div>
          <div className="flex flex-col items-start gap-1">
            <Label htmlFor="quantity" className="text-right">
              Quantity
            </Label>
            <Input type="number" name="quantity" id="quantity" className="col-span-3" />
          </div>
          <SubmitButton className="">Add To Quote</SubmitButton>

        </form>
      </DialogContent>
    </Dialog>
  );
};
export default AddToQuote;
