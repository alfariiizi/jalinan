"use client";

import { usePathname } from "next/navigation";
import { dataMobileSidebar } from "./data";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function MobileNavbar() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 z-[100] flex h-[60px] w-full items-center justify-center border-t border-gray-300 bg-background/60 px-7 py-2 backdrop-blur-md md:hidden">
      <menu className="flex w-full items-center justify-between gap-3">
        {dataMobileSidebar.map(({ label, href, Icon }) => (
          <Link key={label} href={href}>
            <Icon
              className={cn("size-5", pathname === href && "fill-foreground")}
            />
          </Link>
        ))}
      </menu>
    </div>
  );
}
