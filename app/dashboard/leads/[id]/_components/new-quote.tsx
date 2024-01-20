"use client"
import { Tables } from "@/schema";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {useFormState} from "react-dom";
import { createQuote } from "@/actions/quotes/new-quote";
import { Button } from "@/components/ui/button";
import SubmitButton from "@/components/submit-button";

type NewQuoteProps = {
  lead_id: string;
  products: Tables<"products">[];
};

const initialState = {
  message: null,
};

const NewQuote = ({ lead_id, products }: NewQuoteProps) => {

  console.log("New Quote Button", { lead_id})



  return (
    <form action={createQuote}>
      <input type="hidden" id="lead_id" name="lead_id" value={lead_id} />
      <SubmitButton className="">New Quote</SubmitButton>
    </form>
  );
};
export default NewQuote;
