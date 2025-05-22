import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  })
}

export function arrayMove<T>(array: T[], from: number, to: number): T[] {
  const newArray = [...array]
  const [movedItem] = newArray.splice(from, 1)
  newArray.splice(to, 0, movedItem)
  return newArray
}
