"use client";

import { createNewContractor } from "@/actions/contractors/new-contractor";
import SubmitButton from "@/components/submit-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  first_name: z.string().min(2, {
    message: "First Name must be at least 2 characters.",
  }),
  last_name: z.string().min(2, {
    message: "Last Name must be at least 2 characters.",
  }),
  city: z.string({
    required_error: "City is required.",
  }),
  phone: z.string().min(10, {
    message: "Phone must be at least 10 characters.",
  }),
  email: z.string().email(),
});

const NewContractor = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

  });

  async function onSubmit(values: z.infer<typeof formSchema>) {


    console.log(values);

    const response = await createNewContractor(values);
    form.reset();
    if (response.status !== "success") {
      toast("Error", {
        description: response.message,
      });
    }


    if (response.status === "success") {
      toast("Success", {
        description: response.message,
      });
    }
  }

  return (
    <Card>
      <CardContent className="">
        <CardHeader>
          <CardTitle>Add a contractor</CardTitle>
        </CardHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <SubmitButton className="min-w-[250px] mt-8">
                Save Contractor
              </SubmitButton>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
};
export default NewContractor;
