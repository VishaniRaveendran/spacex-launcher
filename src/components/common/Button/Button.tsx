import React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <button
      type="button"
      className={`flex items-center gap-2 rounded-xl px-5 py-2.5 font-semibold text-white bg-gradient-to-r from-[#0B0D17] via-[#005288] to-[#21C1D6] shadow-lg border border-[#005288]/60 transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#21C1D6]/60 hover:from-[#005288] hover:to-[#D0D6F9] hover:text-[#0B0D17] hover:scale-[1.04] active:scale-95 active:shadow-md disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
