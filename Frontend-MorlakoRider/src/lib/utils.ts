import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Une clases de Tailwind (la utilidad `cn` de shadcn que usa mapcn). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
