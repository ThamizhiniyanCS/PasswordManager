import React from "react";
import { ModeToggle } from "./ModeToggle";
import { Button } from "@/components/ui/button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import NavLink from "./NavLink";

const NavBar = () => {
  const links = [
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
      <ModeToggle />

      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="default" className="sm:hidden">
            <HamburgerMenuIcon className="color-white" />
            <span className="sr-only">Toggle NavBar</span>
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle></SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>

          <div className="flex flex-col items-center justify-start mt-20">
            {links.map((link, index) => (
              <NavLink
                key={`${link}_${index}`}
                name={link.name}
                path={link.path}
                notStartsWith={link.notStartsWith}
              />
            ))}
          </div>

          <SheetFooter>
            <Link href="/profile">
              <h2 className="text-xl">Profile</h2>
            </Link>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default NavBar;
