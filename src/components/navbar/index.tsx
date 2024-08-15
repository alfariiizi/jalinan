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
import { dataMobileSidebar } from "./data";
import { NavbarAccount } from "./navbar-account";

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
          <Link href="/" className="flex w-fit items-center gap-1">
            <Image
              src={AppLogo.src}
              alt="App Logo"
              width={AppLogo.width}
              height={AppLogo.height}
              placeholder="blur"
              blurDataURL={AppLogo.blurDataURL}
              className="aspect-square w-12"
            />
            <p className="text-2xl font-semibold text-[#E5575A]">Jalinan</p>
          </Link>
          <div className="relative hidden w-full md:block">
            <Input
              type="search"
              className="w-[60%] pl-8"
              placeholder="Search friends or tags"
            />
            <LuSearch className="absolute left-2 top-1/2 -translate-y-1/2 stroke-gray-600 text-lg" />
          </div>
        </div>
        <div className="">
          <NavbarAccount />
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

export function MobileNavbar() {
  return (
    <div className="fixed bottom-0 left-0 z-[100] flex h-[60px] w-full items-center justify-center border-t border-gray-300 bg-background/60 px-4 py-2 backdrop-blur-md md:hidden">
      <menu className="flex w-full items-center justify-between gap-3">
        {dataMobileSidebar.map(({ label, href, Icon }) => (
          <Link key={label} href={href}>
            <Icon />
          </Link>
        ))}
      </menu>
    </div>
  );
}
