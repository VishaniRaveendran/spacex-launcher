import { ElementType } from "react";
import { cn, fontClamp } from "@/lib/utils";
import { TypographyProps } from "./Typography.types";
import React from "react";

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  (
    {
      id,
      as = "p",
      fontSize = "1rem",
      fontWeight = "400",
      fontFamily = "primary",
      lineHeight = "1.1",
      color,
      align,
      className,
      children,
      style,
      useClamp = false,
      minSize,
      maxSize,
      ...props
    },
    ref
  ) => {
    const Component = as as ElementType;

    const classes = cn(
      fontFamily === "primary" ? "font-primary" : "font-secondary",
      `text-${align}`,
      "transition-colors duration-200",
      className
    );

    const responsiveFontSize =
      useClamp && minSize && maxSize ? fontClamp(minSize, maxSize) : fontSize;

    const combinedStyle: React.CSSProperties = {
      fontSize: responsiveFontSize,
      fontWeight,
      color,
      letterSpacing: "-0.03em",
      lineHeight,
      ...style,
    };

    return (
      <Component
        ref={ref}
        className={classes}
        style={combinedStyle}
        {...props}
        id={id}
      >
        {children}
      </Component>
    );
  }
);

Typography.displayName = "Typography";
