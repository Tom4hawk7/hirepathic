import { level_of_education, work_mode } from "@prisma/client";
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

export function convertWorkMode(workMode: work_mode = "REMOTE") {
  switch (workMode) {
    case "ON_SITE":
      return "On Site"
    default:
      return capitalize(workMode)
  }
}

export function convertEduLevel(education: level_of_education = "HIGH_SCHOOL") {
  switch (education) {
    case "HIGH_SCHOOL": 
      return "High School"
    default:
      return capitalize(education)
  }
}