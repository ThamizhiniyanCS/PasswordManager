// import blocksGIF from "../blocks.gif";
// import Image from "next/image";

import PasswordsSkeleton from "@/components/skeletons/PasswordsSkeleton";

export default function Home() {
  return (
    <main className="">
      {/* <Image alt="Loading GIF" src={blocksGIF} width="150" height="150" /> */}
      <PasswordsSkeleton />
    </main>
  );
}
