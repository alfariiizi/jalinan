import { cn } from "@/lib/utils";
import { LuBell, LuBookmark, LuHome, LuMail, LuUser } from "react-icons/lu";

// export const dataLeftSidebar = [
//   {
//     href: "/",
//     label: "Home",
//     className: "hover:bg-blue-100",
//     Icon: () =>
//       LuHome({
//         className: cn("size-8 rounded-md bg-blue-100 stroke-blue-700 p-1"),
//       }),
//   },
//   // {
//   //   href: "/notification",
//   //   label: "Notification",
//   //   className: cn("hover:bg-red-100"),
//   //   Icon: () =>
//   //     LuBell({
//   //       className: cn("size-8 rounded-md bg-red-100 stroke-red-600 p-1"),
//   //     }),
//   // },
//   // {
//   //   href: "/messages",
//   //   label: "Messages",
//   //   className: "hover:bg-green-100",
//   //   Icon: () =>
//   //     LuMail({
//   //       className: cn("size-8 rounded-md bg-green-100 stroke-green-700 p-1"),
//   //     }),
//   // },
//   {
//     href: "/saved",
//     label: "Saved",
//     className: "hover:bg-orange-100",
//     Icon: () =>
//       LuBookmark({
//         className: cn("size-8 rounded-md bg-orange-100 stroke-orange-700 p-1"),
//       }),
//   },
//   {
//     href: "/profile",
//     label: "Profile",
//     className: "hover:bg-indigo-100",
//     Icon: () =>
//       LuUser({
//         className: cn("size-8 rounded-md bg-indigo-100 stroke-indigo-700 p-1"),
//       }),
//   },
// ] as const;

export const dataLeftSidebar = [
  {
    href: "/",
    label: "Home",
    Icon: LuHome,
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
