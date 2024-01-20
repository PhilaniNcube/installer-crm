import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { createClient } from "@/utils/supabase/server";
import { format } from "date-fns";
import { cookies } from "next/headers";

const NotesList = async ({ id }: { id: string }) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: notes, error } = await supabase
    .from("lead_notes")
    .select("*")
    .eq("lead_id", id)
    .order("created_at", { ascending: false });

    if (error ) {
       return null
    }

  return (
    <Card>
      <CardHeader>
        <h3 className="text-gray-800 text-lg font-bold">Latest Notes</h3>
      </CardHeader>
      <CardContent>
        <ScrollArea className="w-full max-h-[320px] ">
          {notes.length === 0 ? (
            <div className="text-center">No notes added yet.</div>
          ) : (
            notes.map((item) => (
              <div key={item.id} className="odd:bg-zinc-200 px-2 py-1">
                <div className="flex justify-between items-center">
                  <h4 className="text-gray-400 odd:text-gray-700 text-sm">
                    Note
                  </h4>
                  <span className="text-gray-400 text-sm">
                    Created:{" "}
                    <span className="text-gray-800">
                      {format(new Date(item.created_at), "PPpp")}
                    </span>
                  </span>
                </div>
                <p className="text-gray-800 text-sm mt-1">{item.note}</p>
              </div>
            ))
          )}
          <ScrollBar />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
export default NotesList;
