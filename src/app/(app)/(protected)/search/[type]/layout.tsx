import { type ReactNode } from "react";
import Tab from "./_components/tab";

type Props = {
  children: ReactNode;
  params: {
    type: string;
  };
};

export default function layout({ children, params }: Props) {
  return (
    <div className="flex w-full flex-col gap-7">
      <Tab currentValue={params.type} />
      {children}
    </div>
  );
}
