"use client";

import React from "react";
import { ScrollArea } from "./ui/scroll-area";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const DashboardNavDesktop = () => {
  const pathname = usePathname();

  const links = [
    // { icon: "dashboard", path: "/dashboard", separator: true },
    {
      name: "Passwords",
      icon: "password",
      path: "/dashboard/passwords",
      separator: true,
    },
    {
      name: "Recovery Keys",
      icon: "key",
      path: "/dashboard/recoverykeys",
      separator: true,
    },
    {
      name: "Cards",
      icon: "credit_card",
      path: "/dashboard/cards",
      separator: true,
    },
    {
      name: "Notes",
      icon: "notes",
      path: "/dashboard/notes",
      separator: false,
    },
  ];

  return (
    <ScrollArea className="hidden md:flex w-[200px] h-full">
      <Link
        className="w-full flex justify-center items-center text-2xl mb-6"
        href={{ pathname: "/dashboard" }}
      >
        Dashboard
      </Link>
      {links.map((link, index) => (
        <Link
          key={`${link}_${index}`}
          className={clsx(
            "w-full flex justify-start items-center mb-5 p-2 hover:bg-secondary rounded-full",
            { "bg-primary hover:bg-primary": pathname.startsWith(link.path) }
          )}
          href={{ pathname: link.path }}
        >
          <span
            className={clsx(
              "material-symbols-outlined text-primary mr-3 border border-primary w-10 h-10 rounded-full flex justify-center items-center",
              {
                "text-white border-white": pathname.startsWith(link.path),
              }
            )}
          >
            {link.icon}
          </span>
          {link.name}
        </Link>
      ))}
    </ScrollArea>
  );
};

export default DashboardNavDesktop;
