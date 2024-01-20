import { updateStatus } from "@/actions/leads/update-lead-status";
import SubmitButton from "@/components/submit-button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LeadStatus = ({id, status = "new"}:{id:string, status:string}) => {
  return (
    <form action={updateStatus}>
      <input type="hidden" name="id" value={id} />
      <div className="flex items-center space-x-4 px-3">
        <Select name="status" defaultValue={status}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
           <SelectGroup>
            <SelectLabel>Lead Status</SelectLabel>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="quoted">Quoted</SelectItem>
              <SelectItem value="won">Won</SelectItem>
              <SelectItem value="lost">Lost</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <SubmitButton className="max-w-[200px]">
          Update Status
        </SubmitButton>
      </div>
    </form>
  );
};
export default LeadStatus;
