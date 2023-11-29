// "use client";

import React from "react";
// import { Player } from "@lottiefiles/react-lottie-player";
// import lottieBlocks from "../public/loadingBlocks.json";

const CommonLoading = ({ textToDisplay }: { textToDisplay: string }) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center ">
      {/* <Player
        autoplay
        loop
        src={lottieBlocks}
        style={{ height: "300px", width: "300px" }}
      /> */}
      <p className="text-white text-xl">{textToDisplay}</p>
    </div>
  );
};

export default CommonLoading;
