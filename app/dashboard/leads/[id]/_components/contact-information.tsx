import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tables } from "@/schema";

type CardInformationProps = {
  lead: Tables<"leads">
}

const ContactInformation = ({ lead }: CardInformationProps) => {
  return (
    <Card className="h-[400px]">
      <CardHeader>
        <CardTitle>
          <span>Lead Information</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          <p className="text-gray-400 text-sm">Name</p>
          <h3 className="text-gray-800 text-md">
            {lead.first_name} {lead.last_name}
          </h3>
        </div>
        <div className="flex flex-col">
          <p className="text-gray-400 text-sm">Email</p>
          <h3 className="text-gray-800 text-md">{lead.email}</h3>
        </div>
        <div className="flex flex-col">
          <p className="text-gray-400 text-sm">Phone</p>
          <h3 className="text-gray-800 text-md">{lead.phone}</h3>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-400 text-sm">Address</span>
          <span className="text-gray-800 text-md">{lead.address}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-400 text-sm">City</span>
          <span className="text-gray-800 text-md">{lead.city}</span>
        </div>

        <div className="flex flex-col">
          <span className="text-gray-400 text-sm">Postal Code</span>
          <span className="text-gray-800 text-md">{lead.postal_code}</span>
        </div>
      </CardContent>
    </Card>
  );
};
export default ContactInformation;
