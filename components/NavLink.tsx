"use client";

import React from "react";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const NavLink = ({
  name,
  path,
  notStartsWith,
}: {
  name: string;
  path: string;
  notStartsWith?: boolean;
}) => {
  const pathname = usePathname();

  return (
    <Link
      key={name}
      href={path}
      className={clsx(
        "w-28 h-12 flex justify-center items-center cursor-pointer rounded-full mx-0.5",
        {
          "bg-primary text-primary-foreground shadow hover:bg-primary/90 text-white":
            notStartsWith ? pathname === path : pathname.startsWith(path),
          "hover:bg-slate-200": notStartsWith
            ? pathname !== path
            : !pathname.startsWith(path),
        }
      )}
    >
      {name}
    </Link>
  );
};

export default NavLink;
