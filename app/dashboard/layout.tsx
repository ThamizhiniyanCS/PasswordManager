import DashboardBreadCrumbs from "@/components/DashboardBreadCrumbs";
import DashboardNavMobile from "@/components/DashboardNavMobile";
import SearchBar from "@/components/SearchBar";
import React from "react";
import { getPasswordsSearch } from "@/lib/fetchData";
import { searchPasswordType } from "@/lib/typeDefinitions";
import DashboardNavDesktop from "@/components/DashboardNavDesktop";
import { Separator } from "@/components/ui/separator";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const PASSWORDS: searchPasswordType[] = await getPasswordsSearch();

  return (
    <div className="flex w-full h-[calc(100vh-80px)] p-4">
      <DashboardNavDesktop />
      <Separator orientation="vertical" className="hidden md:block mx-2" />
      <div className="w-full md:w-[calc(100vw-250px)]">
        <DashboardBreadCrumbs />
        <SearchBar passwords={PASSWORDS} />
        <div className="w-full h-[calc(100vh-270px)] lg:h-[calc(100vh-206px)]">
          {children}
        </div>
        <DashboardNavMobile />
      </div>
    </div>
  );
};

export default layout;
