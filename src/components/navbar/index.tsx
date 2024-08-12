import React from "react";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { navbarHeight } from "./shared";
import { LuSearch } from "react-icons/lu";
import AppLogo from "@public/images/app-logo.png";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/server/auth";
import { buttonVariants } from "../ui/button";

export default function Navbar() {
  return (
    <nav
      style={{
        height: navbarHeight,
      }}
      className="sticky left-0 top-0 z-[1000] flex w-full items-center justify-center border-b bg-background/60 backdrop-blur-sm"
    >
      <div className="mw-center flex items-center justify-between gap-10">
        <div className="flex w-full items-center gap-32">
          <Link href="/" className="w-fit">
            <Image
              src={AppLogo.src}
              alt="App Logo"
              width={AppLogo.width}
              height={AppLogo.height}
              placeholder="blur"
              blurDataURL={AppLogo.blurDataURL}
              className="h-9 w-36"
            />
          </Link>
          <div className="relative w-full">
            <Input
              type="search"
              className="w-[60%] pl-8"
              placeholder="Search friends or tags"
            />
            <LuSearch className="absolute left-2 top-1/2 -translate-y-1/2 stroke-gray-600 text-lg" />
          </div>
        </div>
        <div className="">
          <AvatarAccount />
        </div>
      </div>
    </nav>
  );
}

async function AvatarAccount() {
  const session = await auth();

  if (!session) {
    return (
      <Link href="/login" className={buttonVariants({ variant: "default" })}>
        Login
      </Link>
    );
  }

  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
