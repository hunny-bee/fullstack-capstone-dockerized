import { clsx } from 'clsx'; // Remove 'type ClassValue'
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) { // Remove the type annotation
  return twMerge(clsx(...inputs));
}
