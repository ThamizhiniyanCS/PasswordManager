import React from "react";
import Image from "next/image";
import blocksGIF from "../app/blocks.gif";

const CommonLoading = ({ textToDisplay }: { textToDisplay: string }) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center ">
      <Image alt="Loading GIF" src={blocksGIF} width="150" height="150" />
      <p className="text-white text-xl">{textToDisplay}</p>
    </div>
  );
};

export default CommonLoading;
