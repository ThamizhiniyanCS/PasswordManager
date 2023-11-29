"use client";

import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import lottieBlocks from "../../../public/loadingBlocks.json";

const loading = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col">
      <Player
        autoplay
        loop
        src={lottieBlocks}
        style={{ height: "300px", width: "300px" }}
      />
      <p className="text-white text-xl">Decrypting Data</p>
    </div>
  );
};

export default loading;
