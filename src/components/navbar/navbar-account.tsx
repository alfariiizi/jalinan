import { buttonVariants } from "@/components/ui/button";
import { auth } from "@/server/auth";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { CgProfile } from "react-icons/cg";
import LogoutButton from "./logout-button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/server";

export async function NavbarAccount() {
  const session = await auth();

  if (!session) {
    return (
      <div className={cn("flex items-center gap-8")}>
        <Link
          href="/login"
          className={cn(buttonVariants({ variant: "default", size: "lg" }))}
        >
          Masuk
        </Link>
      </div>
    );
  }

  const user = await api.user.getUser();

  return (
    <Menubar className="h-auto border-0 px-0 py-0">
      <MenubarMenu>
        <MenubarTrigger
          className={buttonVariants({
            variant: "ghost",
            className:
              "flex h-full cursor-pointer items-center gap-2 border-0 px-2 py-1",
          })}
        >
          <CgProfile className="size-7 rounded-full text-gray-600" />
          <p className="text-sm font-medium text-[#222222]">{user.name}</p>
        </MenubarTrigger>
        <MenubarContent className="z-[150] min-w-fit">
          {/* <MenubarItem asChild> */}
          {/*   <Link */}
          {/*     href="/" */}
          {/*     className="inline-flex w-full cursor-pointer items-center gap-3 text-gray-600 duration-150 focus:text-gray-700" */}
          {/*   > */}
          {/*     <MdOutlineSettings className="size-5" /> */}
          {/*     Settings */}
          {/*   </Link> */}
          {/* </MenubarItem> */}
          <MenubarItem asChild className="">
            <LogoutButton />
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
