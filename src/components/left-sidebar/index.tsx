"use client";

import React from "react";
import { navbarHeight } from "../navbar/shared";
import { dataLeftSidebar } from "./data";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { usePathname } from "next/navigation";
import InputSearch from "./input-search";

export default function LeftSidebar() {
  const pathname = usePathname();

  return (
    <aside
      style={{ height: `calc(100dvh - ${navbarHeight} - 1px)` }}
      className="sticky left-0 top-[60px] hidden w-[22%] flex-col gap-4 py-5 md:flex"
    >
      {/* Top */}
      <div className="flex flex-col gap-4">
        <InputSearch />
        {dataLeftSidebar.map(({ href, label, Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              buttonVariants({
                variant: "ghost",
                className:
                  "justify-start gap-2 rounded-r-none text-start hover:bg-gray-200",
              }),
              href === pathname &&
                "cursor-default border-r-4 border-r-primary/50 bg-primary/10 font-bold hover:bg-primary/10 hover:font-bold",
            )}
          >
            <Icon
              className={cn("size-5", href === pathname && "fill-foreground")}
            />
            {label}
          </Link>
        ))}
      </div>
    </aside>
  );
}
