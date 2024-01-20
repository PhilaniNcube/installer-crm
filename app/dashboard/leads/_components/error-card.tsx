/**
 * v0 by Vercel.
 * @see https://v0.dev/t/srwVtGZy07z
 */
import { Button } from "@/components/ui/button";
import { CardContent, Card } from "@/components/ui/card";
import { StopCircle } from "lucide-react";

export default function ErrorCard() {
  return (
    <Card className="bg-red-500 text-white">
      <CardContent className="flex flex-col items-center space-y-6 p-6">
        <StopCircle className="w-8 h-8" />
        <p className="text-lg font-bold">
          An unexpected error has occurred. Please try again.
        </p>
        <Button className="border-white text-white" variant="outline">
          Retry
        </Button>
      </CardContent>
    </Card>
  );
}

