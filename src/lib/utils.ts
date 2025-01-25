import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function deepEqual<T>(obj1: T, obj2: T): boolean {
  // If both are the same reference or primitive values, directly compare them
  if (obj1 === obj2) return true

  // If one is an object and the other isn't, return false
  if (
    typeof obj1 !== "object" ||
    typeof obj2 !== "object" ||
    obj1 === null ||
    obj2 === null
  ) {
    return false
  }

  // Compare properties of both objects
  const keys1 = Object.keys(obj1) as (keyof T)[]
  const keys2 = Object.keys(obj2) as (keyof T)[]

  // If number of keys is different, the objects are not equal
  if (keys1.length !== keys2.length) {
    return false
  }

  // Recursively compare each property
  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false
    }
  }

  return true
}

export function validateLink(value: string) {
  if (value === "#") {
    return true
  }

  try {
    new URL(value)
    return true
  } catch {
    return false
  }
}
