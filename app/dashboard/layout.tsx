/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { createClient } from "@/utils/supabase/server";
import { BarChartIcon, BoxSelect, BoxSelectIcon, ExternalLinkIcon, FileQuestion, LayoutDashboardIcon, SettingsIcon, UserIcon, UsersIcon, WrenchIcon } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { ReactNode } from "react";

const layout = async ({children}:{children:ReactNode}) => {

  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  return (
    <main className="h-screen flex overflow-hidden bg-gray-100">
      <aside className="flex flex-col w-64">
        <div className="flex items-center h-16 flex-shrink-0 px-4 bg-gray-900">
          <img
            alt="CRM"
            className="h-8 object-cover w-auto"
            src="/images/crm.webp"
          />
        </div>
        <div className="h-0 flex-1 flex flex-col overflow-y-auto">
          <nav className="flex-1 px-2 py-4 bg-gray-800 space-y-1">
            <Link
              className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              href="/dashboard"
            >
              <LayoutDashboardIcon className="w-4 h-4 mr-3" />
              Dashboard
            </Link>
            <Link
              className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              href="/dashboard/leads"
            >
              <UsersIcon className="w-4 h-4 mr-3" />
              Leads
            </Link>
            <Link
              className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              href="/dashboard/customers"
            >
              <UserIcon className="w-4 h-4 mr-3" />
              Customers
            </Link>
            <Link
              className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              href="/dashboard/products"
            >
              <BoxSelectIcon className="w-4 h-4 mr-3" />
              Products
            </Link>
            <Link
              className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              href="/dashboard/contractors"
            >
              <WrenchIcon className="w-4 h-4 mr-3" />
              Contractors
            </Link>
            <Link
              className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              href="#"
            >
              <SettingsIcon className="w-4 h-4 mr-3" />
              Settings
            </Link>
            <div className="flex-1 flex flex-col justify-end">
              <Button
                className="flex justify-start space-x-4 items-center"
                type="button"
              >
                Logout <ExternalLinkIcon className="w-4 h-4 mx-1" />
              </Button>
            </div>
          </nav>
        </div>
      </aside>
      <div className="flex-1 h-full">
        <div className="flex items-center h-16 px-4 bg-gray-900 w-full"></div>
        <ScrollArea className="flex-1 overflow-y-auto h-[calc(100vh-64px)] px-4 py-6">
          {children}
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </div>
    </main>
  );
};
export default layout;
