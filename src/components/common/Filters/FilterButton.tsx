import React, { useState, useRef, useEffect } from "react";
import { IconType } from "react-icons";
import { HiChevronDown } from "react-icons/hi";
import { FaStar } from "react-icons/fa";
import { Typography } from "@/components/common/Typography/Typography";

export type FilterButtonProps = {
  label: string;
  icon: IconType;
  type: "dropdown" | "toggle";
  options?: string[];
  onSelect?: (option: string) => void;
  onToggle?: (active: boolean) => void;
  alignRight?: boolean;
  active?: boolean; // For controlled toggle state
  className?: string;
};

export const FilterButton: React.FC<FilterButtonProps> = ({
  label,
  icon: Icon,
  type,
  options = [],
  onSelect,
  onToggle,
  alignRight = false,
  active: controlledActive,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [uncontrolledActive, setUncontrolledActive] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Use controlled active if provided, otherwise fallback to internal state
  const active =
    typeof controlledActive === "boolean"
      ? controlledActive
      : uncontrolledActive;

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggleClick = () => {
    if (type === "toggle") {
      const newActive = !active;
      if (typeof controlledActive === "boolean") {
        onToggle?.(newActive);
      } else {
        setUncontrolledActive(newActive);
        onToggle?.(newActive);
      }
    } else {
      setIsOpen(!isOpen);
    }
  };

  const handleOptionClick = (option: string) => {
    onSelect?.(option);
    setIsOpen(false);
  };

  const baseButtonClasses =
    "flex items-center gap-2 rounded-xl px-5 py-2.5 font-semibold text-white " +
    "bg-gradient-to-r from-[#0B0D17] via-[#005288] to-[#21C1D6] " +
    "shadow-lg border border-[#005288]/60 transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#21C1D6]/60 " +
    "hover:from-[#005288] hover:to-[#D0D6F9] hover:text-[#0B0D17] hover:scale-[1.04] active:scale-95 active:shadow-md";

  const activeToggleClasses =
    "ring-2 ring-yellow-400 border border-yellow-300 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 text-yellow-900 shadow-lg " +
    "hover:from-yellow-400 hover:to-yellow-300 focus-visible:ring-4 focus-visible:ring-yellow-300 transition-all duration-150";

  return (
    <div
      className={`relative ${alignRight ? "md:ml-auto" : ""}`}
      ref={dropdownRef}
    >
      <button
        type="button"
        aria-haspopup={type === "dropdown" ? "menu" : undefined}
        aria-expanded={isOpen}
        aria-pressed={type === "toggle" ? active : undefined}
        aria-label={
          type === "toggle"
            ? `${label} filter toggle`
            : `${label} filter dropdown`
        }
        onClick={handleToggleClick}
        className={`${baseButtonClasses} ${
          type === "toggle" && active ? activeToggleClasses : ""
        } focus:outline-none focus:ring-2 focus:ring-cyan-400 ${className}`}
        style={{ boxShadow: "0 4px 18px 0 rgba(25, 118, 210, 0.18)" }}
        tabIndex={0}
        onKeyDown={(e) => {
          if (type === "dropdown" && (e.key === "Enter" || e.key === " ")) {
            setIsOpen(!isOpen);
          } else if (
            type === "toggle" &&
            (e.key === "Enter" || e.key === " ")
          ) {
            const newActive = !active;
            if (typeof controlledActive === "boolean") {
              onToggle?.(newActive);
            } else {
              setUncontrolledActive(newActive);
              onToggle?.(newActive);
            }
          }
        }}
      >
        {type === "toggle" && active && Icon === FaStar ? (
          <FaStar
            className="mr-2 text-lg text-yellow-900 drop-shadow"
            aria-hidden="true"
          />
        ) : (
          <Icon className="mr-2 text-xl drop-shadow-sm" aria-hidden="true" />
        )}
        <Typography
          as="span"
          className={`tracking-wide font-semibold${
            type === "toggle" && active && Icon === FaStar
              ? " text-yellow-700"
              : ""
          }`}
          useClamp={true}
          minSize={14}
          maxSize={18}
        >
          {label}
        </Typography>
        {type === "dropdown" && (
          <HiChevronDown
            className="ml-2 h-4 w-4 text-white drop-shadow-sm transition-transform duration-150"
            style={{ transform: isOpen ? "rotate(180deg)" : "none" }}
            aria-hidden="true"
          />
        )}
      </button>

      {type === "dropdown" && isOpen && options.length > 0 && (
        <ul
          role="menu"
          aria-label={`${label} options`}
          className="absolute z-20 mt-2 w-44 bg-gradient-to-br from-[#0B0D17] via-[#005288] to-[#21C1D6] dark:from-[#0B0D17] dark:via-[#005288] dark:to-[#21C1D6] rounded-xl py-2 shadow-2xl border border-[#005288]/60 dark:border-[#21C1D6]/40 text-white ring-1 ring-[#21C1D6]/30 focus:outline-none animate-fadeIn"
        >
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleOptionClick(option)}
              role="menuitem"
              tabIndex={0}
              className="cursor-pointer px-5 py-2.5 rounded-lg transition-all duration-100 hover:bg-[#21C1D6]/80 hover:text-[#0B0D17] hover:scale-[1.03] focus:bg-[#005288]/90 focus:text-[#FFD700]"
              aria-label={`Select ${option}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleOptionClick(option);
                }
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
