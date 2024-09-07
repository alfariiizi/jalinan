import { cn } from "@/lib/utils";
import { LuHeart } from "react-icons/lu";

export default function HeartIcon({ isLike }: { isLike?: boolean }) {
  return (
    <LuHeart
      className={cn("size-5 stroke-rose-500", isLike && "fill-rose-500")}
    />
  );
}
