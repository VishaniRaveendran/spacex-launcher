import clsx from "clsx";

/**
 * Utility function to merge class names
 * Combines clsx for optimal class name handling
 */
export function cn(...inputs: (string | undefined | null | boolean)[]) {
  return clsx(inputs);
}
