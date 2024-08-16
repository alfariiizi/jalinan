import React from "react";
import { Toaster } from "react-hot-toast";
import { TRPCReactProvider } from "@/trpc/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

type Props = {
  children: React.ReactNode;
};

export default function Providers({ children }: Props) {
  return (
    <div>
      <TRPCReactProvider>
        {children}
        <ReactQueryDevtools />
      </TRPCReactProvider>
      <Toaster
        position="bottom-right"
        toastOptions={{
          className:
            "border-2 z-[100000] font-semibold border-primary min-h-16",
          style: {
            padding: "8px 20px",
          },
          duration: 3000,
          iconTheme: {
            primary: "hsl(var(--primary))",
            secondary: "hsl(var(--primary-foreground))",
          },
          error: {
            className:
              "border-2 border-destructive z-[100000] font-semibold min-h-16",
            iconTheme: {
              primary: "hsl(var(--destructive))",
              secondary: "hsl(var(--destructive-foreground))",
            },
          },
        }}
      />
    </div>
  );
}
