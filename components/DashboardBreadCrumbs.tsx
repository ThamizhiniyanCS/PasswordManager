"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";

type breadCrumb = {
  name: string;
  href: string;
};

const DashboardBreadCrumbs = () => {
  const pathname = usePathname();
  const splittedPath = pathname.split("/");
  const breadCrumbs: breadCrumb[] = [];
  splittedPath.forEach((path) => {
    if (path !== "") {
      breadCrumbs.push({
        name: path,
        href: pathname.slice(0, pathname.indexOf(path) + path.length),
      });
    }
  });

  return (
    <div className="h-8 flex items-center justify-start md:min-w-[500px] md:p-2 text-xs overflow-hidden">
      {breadCrumbs.map((path, index) => (
        <Link
          className="flex items-center justify-start text-sm"
          key={`${path.name}_${path.href}_${index}`}
          href={path.href}
        >
          <p className="px-0.5">/</p>
          <p
            className={clsx("px-1 ", {
              "text-primary": pathname.endsWith(path.name),
              "text-secondary-foreground/70": !pathname.endsWith(path.name),
            })}
          >
            {path.name}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default DashboardBreadCrumbs;
