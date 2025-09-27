// components/SearchBar.tsx
import React from "react";
import { IoMdSearch } from "react-icons/io";

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search Mission",
  value,
  onChange,
}) => {
  return (
    <div className="w-full max-w-full sm:max-w-xl mx-auto px-4">
      <div className="relative bg-[#111827] rounded-lg flex items-center border-1 border-[#1C2541] shadow-[0px_4px_10px_0px_rgba(28,_37,_65,_0.66)]">
        <span className="pl-3 text-gray-400 flex items-center justify-center">
          <IoMdSearch />
        </span>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-3 bg-transparent text-gray-200 placeholder-gray-400 focus:outline-none rounded-lg text-center sm:text-left"
        />
      </div>
    </div>
  );
};

export default SearchBar;
