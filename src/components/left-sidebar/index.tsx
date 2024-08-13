"use client";

import React from "react";
import { navbarHeight } from "../navbar/shared";
import { dataLeftSidebar } from "./data";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { usePathname } from "next/navigation";

export default function LeftSidebar() {
  const pathname = usePathname();

  return (
    <aside
      style={{ height: `calc(100dvh - ${navbarHeight} - 1px)` }}
      className="sticky left-0 top-[60px] hidden w-[22%] flex-col gap-4 py-5 md:flex"
    >
      {/* Top */}
      <div className="flex flex-col gap-4">
        {dataLeftSidebar.map(({ href, label, className, Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              buttonVariants({
                variant: "ghost",
                className: "justify-start gap-2 text-start hover:bg-gray-200",
              }),
              href === pathname && {
                "bg-blue-100": href === "/",
                "bg-red-100": href === "/notification",
                "bg-green-100": href === "/messages",
                "bg-orange-100": href === "/saved",
                "bg-indigo-100": href === "/profile",
              },
              className,
            )}
          >
            <Icon />
            {label}
          </Link>
        ))}
      </div>
    </aside>
  );
}
