import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge conditional class names and resolve Tailwind conflicts. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Shared view-transition name so a card preview morphs into the detail
 *  page's preview. Must match on both ends; unique per registry entry. */
export function previewTransitionName(name: string) {
  return `preview-${name}`;
}
