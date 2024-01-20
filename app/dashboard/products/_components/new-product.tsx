"use client"
import { createNewProduct } from "@/actions/products/new-product";
import SubmitButton from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Plus } from "lucide-react";

const formSchema = z.object({
  name: z.string().trim().min(2, {
    message: "name must be at least 2 characters.",
  }),
  description: z
    .string()
    .trim()
    .min(2, {
      message: "description must be at least 2 characters.",
    })
    .max(255, {
      message: "description must be less than 255 characters.",
    }),
  price: z.coerce.number(),
});



const NewProduct = () => {



    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: "",
        description: "",
        price: 0,
      },
    });

      async function onSubmit(values: z.infer<typeof formSchema>) {
          form.reset();
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);

        const response = await createNewProduct(values);

        if(response.status !== "success") {
          toast("Error", {
            description: response.message
          })
        }

        if(response.status === "success") {
          toast("Success", {
            description: response.message
          })
        }


      }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          New Product
          <Plus className="w-4 h-4 ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create new product</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your product name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your product description.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Price</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your product price.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <SubmitButton className="min-w-[250px] mt-8">
                Save Product
              </SubmitButton>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default NewProduct;
