import { Exo_2, Orbitron, Space_Grotesk } from "next/font/google";

export const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

export const exo2 = Exo_2({
  variable: "--font-exo2",
  subsets: ["latin"],
});

export const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

/**
 * Creates a CSS clamp function for responsive font sizing
 * @param minSize - Minimum font size in rem
 * @param maxSize - Maximum font size in rem
 * @param minViewport - Minimum viewport width in px (default: 360)
 * @param maxViewport - Maximum viewport width in px (default: 840)
 * @returns CSS clamp string
 */
export function fontClamp(
  minSize: number,
  maxSize: number,
  minViewport: number = 360,
  maxViewport: number = 1440
): string {
  const minSizeRem = minSize / 16;
  const maxSizeRem = maxSize / 16;
  const minWidth = minViewport / 16;
  const maxWidth = maxViewport / 16;

  const slope = (maxSizeRem - minSizeRem) / (maxWidth - minWidth);

  const yAxisIntersection = -minWidth * slope + minSizeRem;

  const preferredValue = `${yAxisIntersection}rem + ${slope * 100}vw`;

  return `clamp(${minSizeRem}rem, ${preferredValue}, ${maxSizeRem}rem)`;
}
