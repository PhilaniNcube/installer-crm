"use client"

import { ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { CircleDashed } from "lucide-react";

const SubmitButton = ({children, className}:{children:ReactNode, className:string}) => {

   const { pending } = useFormStatus();

  return <Button type="submit" className={cn(' ', className)} aria-disabled={pending} disabled={pending}>
    {pending ? <span className="flex space-x-3 items-center">Please Wait <CircleDashed className="animate-spin" /></span> : children}
  </Button>;
};
export default SubmitButton;
