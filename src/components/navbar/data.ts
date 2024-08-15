import { cn } from "@/lib/utils";
import {
  LuBell,
  LuBookmark,
  LuHome,
  LuMail,
  LuSearch,
  LuUser,
} from "react-icons/lu";

export const dataMobileSidebar = [
  {
    href: "/",
    label: "Home",
    className: "hover:bg-blue-100",
    Icon: () =>
      LuHome({
        className: cn("stroke-blue-700 size-[32px] p-1"),
      }),
  },
  {
    href: "/search",
    label: "Search",
    className: "hover:bg-blue-100",
    Icon: () =>
      LuSearch({
        className: cn("stroke-violet-700 size-[32px] p-1"),
      }),
  },
  {
    href: "/notification",
    label: "Notification",
    className: cn("hover:bg-red-100"),
    Icon: () =>
      LuBell({
        className: cn("stroke-red-600 size-[32px] p-1"),
      }),
  },
  {
    href: "/messages",
    label: "Messages",
    className: "hover:bg-green-100",
    Icon: () =>
      LuMail({
        className: cn("stroke-green-700 size-[32px] p-1"),
      }),
  },
  {
    href: "/saved",
    label: "Saved",
    className: "hover:bg-orange-100",
    Icon: () =>
      LuBookmark({
        className: cn("stroke-orange-700 size-[32px] p-1"),
      }),
  },
  {
    href: "/profile",
    label: "Profile",
    className: "hover:bg-indigo-100",
    Icon: () =>
      LuUser({
        className: cn("stroke-indigo-700 size-[32px] p-1"),
      }),
  },
] as const;
