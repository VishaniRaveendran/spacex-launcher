import React, { ReactNode } from "react";

export type TypographyAlign = "left" | "center" | "right";

export type TypographyFontWeight =
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "650"
  | "700"
  | "800"
  | "900";

export interface TypographyProps {
  id?: string;
  children: ReactNode;
  className?: string;
  align?: TypographyAlign;
  color?: string; 
  fontSize?: string; 
  fontWeight?: TypographyFontWeight;
  as?: keyof React.JSX.IntrinsicElements;
  style?: React.CSSProperties;
  fontFamily?: "primary" | "secondary";
  lineHeight?: string; 
  useClamp?: boolean;
  minSize?: number; 
  maxSize?: number; 
  role?: string;
  ariaLive?: "off" | "polite" | "assertive";
}
