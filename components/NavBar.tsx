import React from "react";
import { ModeToggle } from "./ModeToggle";
import SheetNavMobile from "./SheetNavMobile";
import { NavigationMenuDesktop } from "./NavigationMenuDesktop";

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
      <div className="md:w-[30%] max-w-[200px] flex jusitfy-center items-center">
        <h1 className="text-xl">Password Manager</h1>
      </div>
      <div className="flex justify-center items-center md:justify-between md:w-[70%] max-w-[600px]">
        <NavigationMenuDesktop />
        <ModeToggle />
        <SheetNavMobile />
      </div>
    </div>
  );
};

export default NavBar;
