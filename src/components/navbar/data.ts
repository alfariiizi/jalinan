import { LuBookmark, LuHome, LuSearch, LuUser } from "react-icons/lu";

export const dataMobileSidebar = [
  {
    href: "/",
    label: "Home",
    Icon: LuHome,
  },
  {
    href: "/search",
    label: "Search",
    Icon: LuSearch,
  },
  {
    href: "/saved",
    label: "Saved",
    Icon: LuBookmark,
  },
  {
    href: "/profile",
    label: "Profile",
    Icon: LuUser,
  },
] as const;
