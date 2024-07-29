import Footer from "@/components/footer";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function layout({ children }: Props) {
  return (
    <div>
      {children}
      <Footer />
    </div>
  );
}
