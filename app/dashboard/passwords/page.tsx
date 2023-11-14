import Password from "@/components/Password";
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

const page = () => {
  return (
    <div className="w-full h-full">
      <ScrollArea className="h-full w-full rounded-xl border p-2">
        <Password />
      </ScrollArea>
    </div>
  );
};

export default page;
