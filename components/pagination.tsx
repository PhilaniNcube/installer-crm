"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PaginationButtons = ({pages}:{pages:number}) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  // get page number from search params
  const page = Number(searchParams.get("page")) || 1

  console.log({pages, page})

  const router = useRouter()

  return (
    <section>
      <div className="flex justify-between items-center">
        {page > 1 && (
          <Button

            onClick={() => router.push(`${pathname}?page=${page - 1}`)}
          >
            <ChevronLeft />Previous
          </Button>
        )}
        {page === pages ? null : (
          <Button
            onClick={() => router.push(`${pathname}?page=${page + 1}`)}
          >Next <ChevronRight /></Button>
        )}
      </div>
    </section>
  );
};
export default PaginationButtons;
