import DashboardBreadCrumbs from "@/components/DashboardBreadCrumbs";
import DashboardNavMobile from "@/components/DashboardNavMobile";
import SearchBar from "@/components/SearchBar";
import React from "react";
import { getPasswordsSearch } from "@/lib/fetchData";
import { searchPasswordType } from "@/lib/typeDefinitions";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const PASSWORDS: searchPasswordType[] = await getPasswordsSearch();

  return (
    <div className="w-full h-[calc(100vh-80px)] p-4">
      <DashboardBreadCrumbs />
      <SearchBar passwords={PASSWORDS} />
      <div className="w-full h-[calc(100vh-270px)]">{children}</div>
      <DashboardNavMobile />
    </div>
  );
};

export default layout;
