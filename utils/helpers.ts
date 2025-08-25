import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Location } from "./hooks";

const MAX_LENGTH = 30;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function pad(time: number) {
  return String(time).padStart(2, "0");
}

export function truncate(text: string, length: number = MAX_LENGTH) {
  if (text.length <= length) return text;
  return text.slice(0, length) + "...";
}

export function formatLocation(location?: Location) {
  if (!location) return "Unknown location";
  return `${truncate(location.state)}, ${truncate(location.country)}`;
}

export function getOffset(breakpoint: string) {
  const offsetGap = 8;
  switch (breakpoint) {
    case "md":
      return 128 + offsetGap;
    case "lg":
      return 192 + offsetGap;
    default:
      return 72 + offsetGap;
  }
}
