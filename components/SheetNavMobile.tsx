"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NavLink from "./NavLink";
import React from "react";
import Link from "next/link";

const SheetNavMobile = () => {
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

  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="icon" variant="default" className="sm:hidden ml-4">
          <HamburgerMenuIcon className="text-white" />
          <span className="sr-only">Toggle NavBar</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        id="Sheet_Content"
        className="flex flex-col justify-between items-center"
      >
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>

        <div className="flex flex-col items-center justify-start w-full">
          {links.map((link, index) => (
            <Button
              key={`${link}_${index}`}
              variant="link"
              className="w-[80%] max-w-[200px] my-1 rounded-full h-14"
              onClick={() => setOpen(false)}
            >
              <NavLink
                key={link.name}
                name={link.name}
                path={link.path}
                notStartsWith={link.notStartsWith}
              />
            </Button>
          ))}
        </div>

        <SheetFooter className="w-full h-14 flex justify-center items-center">
          <Link
            href="/profile"
            className="w-[50%] h-full flex justify-evenly items-center"
          >
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h2 className="text-xl">Profile</h2>
          </Link>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default SheetNavMobile;
