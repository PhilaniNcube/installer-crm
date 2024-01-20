import SubmitButton from "@/components/submit-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { format } from "date-fns";
import { newNote } from "@/actions/leads/new-note";


const LeadNotes = async ({id}:{id:string}) => {

  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const {data:notes, error} = await supabase.from("lead_notes").select("*").eq("lead_id", id).order("created_at", {ascending: false})

  if(error) {
    console.log(error)
    throw new Error(error.message)
  }

  return (
    <div className="col-span-1 max-h-[400px]">
      <Card className="pt-8 max-h-[400px]">
        <CardContent >
          <CardTitle>
            <span>Notes</span>
          </CardTitle>
          <form action={newNote}>
            <input type="hidden" name="id" value={id} />
            <Label htmlFor="note" className="text-gray-400 text-sm">
              Add Note
            </Label>
            <Textarea
              name="note"
              id="note"
              rows={1}
              placeholder="Add a new note for this lead"
              className="w-full border-gray-300 border rounded-md"
            ></Textarea>
            <div className="flex justify-end mt-2">
              <SubmitButton className="min-w-[250px]">Save Note</SubmitButton>
            </div>
          </form>

        </CardContent>
      </Card>
    </div>
  );
};
export default LeadNotes;
