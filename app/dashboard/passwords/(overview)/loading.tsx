import React from "react";
import PasswordsSkeleton from "@/components/skeletons/PasswordsSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
  return (
    <div className="w-full h-full flex justify-between">
      <div className="w-full h-full p-2 justify-center items-center lg:w-[49%]">
        <PasswordsSkeleton />
      </div>
      <Skeleton className="hidden h-full rounded-xl border p-2 lg:flex justify-center items-center lg:w-[49%]" />
    </div>
  );
};

export default loading;
