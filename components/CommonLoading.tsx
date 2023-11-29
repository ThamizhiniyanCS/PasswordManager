import React from "react";
import Image from "next/image";
import blocksGIF from "../app/blocks.gif";
import { Skeleton } from "./ui/skeleton";

const CommonLoading = ({ textToDisplay }: { textToDisplay: string }) => {
  return (
    <Skeleton className="w-full h-full flex flex-col justify-center items-center ">
      <Image alt="Loading GIF" src={blocksGIF} width="150" height="150" />
      <p className="text-white text-xl">{textToDisplay}</p>
    </Skeleton>
  );
};

export default CommonLoading;
