import React from "react";
import { navbarHeight } from "./shared";
import Link from "next/link";
import { NavbarAccount } from "./navbar-account";
import { AppLogo } from "../app-logo";

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
            <AppLogo />
          </Link>
        </div>
        <div className="">
          <NavbarAccount />
        </div>
      </div>
    </nav>
  );
}

// async function AvatarAccount() {
//   const session = await auth();
//
//   if (!session) {
//     return (
//       <Link href="/login" className={buttonVariants({ variant: "default" })}>
//         Login
//       </Link>
//     );
//   }
//
//   return (
//     <Avatar>
//       <AvatarImage src="https://github.com/shadcn.png" />
//       <AvatarFallback>CN</AvatarFallback>
//     </Avatar>
//   );
// }
