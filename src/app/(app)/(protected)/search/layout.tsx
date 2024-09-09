import InputSearch from "@/components/left-sidebar/input-search";
import { type ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function layout({ children }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <div className="block w-full md:hidden">
        <InputSearch />
      </div>
      {children}
    </div>
  );
}
