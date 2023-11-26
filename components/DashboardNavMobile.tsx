"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DashboardNavMobile = () => {
  const pathname = usePathname();

  const links = [
    { icon: "dashboard", path: "/dashboard", separator: true },
    { icon: "password", path: "/dashboard/passwords", separator: true },
    { icon: "key", path: "/dashboard/recoverykeys", separator: true },
    { icon: "credit_card", path: "/dashboard/cards", separator: true },
    { icon: "notes", path: "/dashboard/notes", separator: false },
  ];

  return (
    <div className="fixed left-0 bottom-0 w-screen h-16 flex justify-evenly items-center rounded-md bg-secondary p-1 md:hidden">
      {links.map((link) => (
        <div key={link.path}>
          <Link href={link.path}>
            <Button
              size="icon"
              variant={pathname === link.path ? "default" : "outline"}
              className="w-12 h-12"
            >
              <span className="material-symbols-outlined dark:text-white">
                {link.icon}
              </span>
            </Button>
          </Link>

          {link.separator && (
            <Separator
              className="mx-1 dark:bg-slate-600"
              orientation="vertical"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default DashboardNavMobile;
