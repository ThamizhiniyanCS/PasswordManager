import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-full h-[calc(100vh-140px)]">{children}</div>;
};

export default layout;
