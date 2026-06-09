import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function formatPostgresTimestamp(date: Date, offset = "-07") {
  const pad = (n: number) => String(n).padStart(2, "0");

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}${offset}`;
}

export function capitalize(str: string): string {
  const text = str.trim();
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
