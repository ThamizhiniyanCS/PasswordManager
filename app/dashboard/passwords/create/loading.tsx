import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

const Input = () => {
  return (
    <div className="space-y-2 h-24">
      <Skeleton className="w-[150px] h-[17px] rounded-full"></Skeleton>
      <Skeleton className="h-9 rounded-full"></Skeleton>
      <Skeleton className="w-[300px] h-[19px] rounded-full"></Skeleton>
    </div>
  );
};

const loading = () => {
  return (
    <ScrollArea className="w-full h-full">
      <div className="w-full h-full p-2">
        <Skeleton className="w-40 h-8 my-4 rounded-full"></Skeleton>
        <div className="space-y-8 p-1">
          <Input />
          <Input />
          <Input />
          <div className="h-[105px] flex flex-col items-center mt-0">
            <Skeleton className="w-full h-[10px] mb-4 rounded-full"></Skeleton>
            <div className="w-full">
              <Skeleton className="w-[150px] h-[28px] rounded-full"></Skeleton>
            </div>
            <div className="w-full flex justify-evenly items-center my-2">
              <Skeleton className="w-9 h-9"></Skeleton>
              <Skeleton className="w-9 h-9"></Skeleton>
              <Skeleton className="w-9 h-9"></Skeleton>
            </div>
          </div>
          <Input />
          <div className="w-full">
            <Skeleton className="w-[112px] h-10 rounded-full"></Skeleton>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};

export default loading;
