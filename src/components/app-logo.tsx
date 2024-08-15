import React from "react";
import AppLogoImg from "@public/images/app-logo.png";
import Image from "next/image";
import { cn } from "@/lib/utils";

type AppLogoProps = { className?: string; children?: React.ReactNode };

export function AppLogo({ className, children }: AppLogoProps) {
  if (!children) {
    return (
      <div className={cn("flex w-[140px] items-center gap-1", className)}>
        <AppLogoIcon className="h-[1/4]" />
        <AppLogoName className="w-[3/4]" />
      </div>
    );
  }

  return (
    <div className={cn("flex w-fit items-center gap-1", className)}>
      {children}
    </div>
  );
}

export default AppLogo;

type AppIconProps = { className?: string };

export function AppLogoIcon({ className }: AppIconProps) {
  return (
    <Image
      src={AppLogoImg.src}
      alt="App Logo"
      width={AppLogoImg.width}
      height={AppLogoImg.height}
      placeholder="empty"
      blurDataURL={AppLogoImg.blurDataURL}
      className={cn("aspect-square w-12", className)}
    />
  );
}

type AppLogoName = { className?: string };

export function AppLogoName({ className }: AppLogoName) {
  return (
    <h1 className={cn("text-2xl font-semibold text-[#E5575A]", className)}>
      Jalinan
    </h1>
  );
}
