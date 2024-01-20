"use client"

import { Tables } from "@/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { createClient } from "@/utils/supabase/client";
import SubmitButton from "@/components/submit-button";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  date: z.date({
    required_error: "A date is required.",
  }),
  // lead_id: z.string(),
  contractor_id: z.string(),
  // status: z.enum(["pending", "visited", "revisit"]),
});

type SiteVisitProps = {
  contractors: Tables<"contractors">[];
  leadId: string;
}

const SiteVisit = ({ contractors, leadId }: SiteVisitProps) => {

  const router = useRouter()

   const form = useForm<z.infer<typeof formSchema>>({
     resolver: zodResolver(formSchema),

   });


   const submitting = form.formState.isSubmitting


   const supabase = createClient()

   async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);

        // validate inputs
        const { date, contractor_id } = values;
        if (!date || !contractor_id ) {
          toast("Error", {
            description: "Please fill out all fields.",
          });
          return;
        }

        const {data, error} = await supabase.from("site_visits").insert([{
          date: date.toISOString(),
          lead_id: leadId,
          contractor_id: contractor_id,
          status: "pending",
        }]).select("*").single()

        if(error) {
          toast("Error", {
            description: error.message
          })
        }

        if(data) {
          toast("Success", {
            description: "Site visit scheduled."
          })
        }


        form.reset();
        router.refresh()
      }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Site Visit Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contractor_id"
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormLabel>Contractor</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a contractor" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {contractors.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.first_name} {item.last_name} - {item.email}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-6">{submitting ? "Submitting..." : "Schedule Visit"}</Button>
      </form>
    </Form>
  );
};
export default SiteVisit;
