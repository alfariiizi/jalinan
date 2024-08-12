import React from "react";
import { navbarHeight } from "../navbar/shared";

export default function RightSidebar() {
  return (
    <aside
      style={{ height: `calc(100dvh - ${navbarHeight} - 1px)` }}
      className="sticky left-0 top-[60px] flex w-[25%] flex-col gap-16 py-5"
    >
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Who to follow</h2>
        <div className="space-y-2">
          <div className="h-12 w-full rounded bg-gray-600" />
          <div className="h-12 w-full rounded bg-gray-600" />
          <div className="h-12 w-full rounded bg-gray-600" />
        </div>
      </div>
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Trending topics</h2>
        <div className="space-y-2">
          <div className="h-12 w-full rounded bg-gray-600" />
          <div className="h-12 w-full rounded bg-gray-600" />
          <div className="h-12 w-full rounded bg-gray-600" />
        </div>
      </div>
    </aside>
  );
}
