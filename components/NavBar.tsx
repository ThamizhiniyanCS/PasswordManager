import React from "react";
import { ModeToggle } from "./ModeToggle";
import SheetNavMobile from "./SheetNavMobile";

const NavBar = () => {
  const linksDesktop = [
    { name: "Home", path: "/", notStartsWith: true },
    {
      name: "Dashboard",
      path: "/dashboard",
      subPaths: [
        { name: "Passwords", path: "/dashboard/passwords" },
        { name: "Recovery Keys", path: "/dashboard/recoverykeys" },
        { name: "Cards", path: "/dashboard/cards" },
        { name: "Notes", path: "/dashboard/notes" },
      ],
    },
    { name: "Login", path: "/login" },
    { name: "SignUp", path: "/signup" },
    { name: "Logout", path: "/logout" },
  ];

  return (
    <div className="w-screen h-20 flex items-center justify-between p-4">
      <div>
        <h1 className="text-xl">Password Manager</h1>
      </div>
      <div className="flex justify-center items-center">
        <ModeToggle />
        <SheetNavMobile />
      </div>
    </div>
  );
};

export default NavBar;
