"use client"

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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import SubmitButton from "@/components/submit-button";
import { updateStatus } from "@/actions/site-visits/update-site-visit-status";

export function UpdateVisitStatus({visitId, status}:{visitId:string, status:string}) {


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className={cn(
            "flex items-center justify-center rounded-full space-x-4",
            status === "visited" ? "bg-green-600" : ""
          )}
        >
          {status}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Visit Status</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form action={updateStatus} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              type="hidden"
              id="id"
              name="id"
              defaultValue={visitId}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Select name="status" defaultValue={status}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="visited">Visited</SelectItem>
                  <SelectItem value="revisit">Revisit</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <SubmitButton className="">Save changes</SubmitButton>
        </form>

      </DialogContent>
    </Dialog>
  );
}
