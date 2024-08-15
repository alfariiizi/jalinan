"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import AppLogo from "@/components/app-logo";

type Props = {
  className?: string;
};

export default function LoadingScreen({ className }: Props) {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        duration: 0.2,
      }}
      className={cn(
        "absolute left-0 top-[-60px] z-[1000] flex size-40 h-dvh w-full flex-col items-center justify-center gap-4 bg-background",
        className,
      )}
    >
      <motion.h1
        initial={{
          opacity: 0.4,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0.4,
        }}
        transition={{
          ease: "easeInOut",
          repeatType: "mirror",
          repeat: Infinity,
          duration: 1,
        }}
        className={cn("font-display text-4xl font-semibold")}
      >
        <AppLogo />
      </motion.h1>
    </motion.div>
  );
}
