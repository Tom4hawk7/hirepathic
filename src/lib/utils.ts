import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function capitalize(str: string): string {
  const text = str.trim();
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
