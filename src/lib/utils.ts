import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { DateDiff } from "./DateDiff";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function dateToDiffString(date: Date) {
  const dateDiff = new DateDiff(new Date(), date);

  function messages(val: number, singular: string) {
    return val === 1 ? `${val} ${singular}` : `${val} ${singular}s`;
  }

  if (dateDiff.years() > 0) {
    return messages(dateDiff.years(), "year");
  } else if (dateDiff.months() > 0) {
    return messages(dateDiff.months(), "month");
  } else if (dateDiff.days() > 0) {
    return messages(dateDiff.days(), "day");
  } else if (dateDiff.hours() > 0) {
    return messages(dateDiff.hours(), "hour");
  } else if (dateDiff.minutes() > 0) {
    return messages(dateDiff.minutes(), "minute");
  } else {
    return messages(dateDiff.seconds(), "second");
  }
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(num % 1000000 === 0 ? 0 : 1) + "m";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 1) + "k";
  } else {
    return num.toString();
  }
}
