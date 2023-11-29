import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import clsx from "clsx";

const PasswordCard = () => {
  return (
    <Card className="my-2">
      <div className="w-full h-36 flex justify-between items-center">
        <CardContent className="w-full flex flex-col items-start p-0 pl-2 h-36 justify-evenly rounded-l-xl">
          <div className="h-10 flex flex-col justify-evenly items-start">
            <Skeleton className="w-20 h-3 xs:w-40"></Skeleton>
            <Skeleton className="w-40 h-4 xs:w-80"></Skeleton>
          </div>
          <div className="h-10 flex flex-col justify-evenly items-start">
            <Skeleton className="w-20 h-3 xs:w-40"></Skeleton>
            <Skeleton className="w-40 h-4 xs:w-80"></Skeleton>
          </div>
          <div className="h-10 flex flex-col justify-evenly items-start">
            <Skeleton className="w-20 h-3 xs:w-40"></Skeleton>
            <Skeleton className="w-40 h-4 xs:w-80"></Skeleton>
          </div>
        </CardContent>

        <div className="flex ">
          <CardContent className="flex flex-col items-center p-0 h-36 justify-evenly">
            <Skeleton className="h-9 w-9 rounded-md" />
            <Skeleton className="h-9 w-9 rounded-md" />
            <Skeleton className="h-9 w-9 rounded-md" />
          </CardContent>

          <CardContent
            className={clsx("w-5 h-36 p-0 rounded-r-xl ml-2")}
          ></CardContent>
        </div>
      </div>
    </Card>
  );
};

const PasswordsSkeleton = () => {
  const indexes = [1, 2, 3, 4];
  return (
    <div className="overflow-hidden">
      {indexes.map((index) => (
        <PasswordCard key={index} />
      ))}
    </div>
  );
};

export default PasswordsSkeleton;
