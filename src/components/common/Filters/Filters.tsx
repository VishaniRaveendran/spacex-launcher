import React from "react";
import { FilterButton } from "./FilterButton";
import {
  HiOutlineCalendar,
  HiOutlineSortAscending,
  HiOutlineTrash,
} from "react-icons/hi";
import { HiOutlineRocketLaunch } from "react-icons/hi2";
import { FaStar } from "react-icons/fa";

interface FiltersProps {
  selectedYear: string;
  setSelectedYear: (year: string) => void;
  selectedLaunch: string;
  setSelectedLaunch: (launch: string) => void;
  favouritesActive: boolean;
  setFavouritesActive: (active: boolean) => void;
  sortOption: string;
  setSortOption: (option: string) => void;
  yearOptions: string[];
}

const launchOptions = ["Success", "Failed", "All Launches"];
const sortOptions = ["Newest → Oldest", "Oldest → Newest"];

export const Filters: React.FC<FiltersProps> = ({
  selectedYear,
  setSelectedYear,
  selectedLaunch,
  setSelectedLaunch,
  favouritesActive,
  setFavouritesActive,
  sortOption,
  setSortOption,
  yearOptions,
}) => {
  // Handler to clear all filters
  const handleClearFilters = () => {
    setSelectedYear("All Years");
    setSelectedLaunch("All Launches");
    setFavouritesActive(false);
    setSortOption("Newest → Oldest");
  };

  const isFiltered =
    selectedYear !== "All Years" ||
    selectedLaunch !== "All Launches" ||
    favouritesActive !== false ||
    sortOption !== "Newest → Oldest";

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center sm:flex-nowrap gap-1 md:gap-3 pt-4 sm:pt-10 rounded-2xl w-full">
      <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 w-full sm:w-auto items-center">
        <FilterButton
          label={selectedYear}
          icon={HiOutlineCalendar}
          type="dropdown"
          options={yearOptions}
          onSelect={setSelectedYear}
          className="w-full sm:w-auto text-center justify-center"
        />
        <FilterButton
          label={selectedLaunch}
          icon={HiOutlineRocketLaunch}
          type="dropdown"
          options={launchOptions}
          onSelect={setSelectedLaunch}
          className="w-full sm:w-auto text-center justify-center"
        />
        <FilterButton
          label="Favourites"
          icon={FaStar}
          type="toggle"
          onToggle={setFavouritesActive}
          active={favouritesActive}
          className="w-full sm:w-auto text-center justify-center"
        />
        {isFiltered && (
          <button
            className="ml-0 sm:ml-2 flex items-center gap-2 px-4 py-2 rounded-lg font-medium border border-gray-300 bg-white text-[#005288] shadow-sm transition-all duration-150 hover:border-[#005288] hover:bg-gray-50 hover:text-[#005288] focus:outline-none focus:ring-2 focus:ring-[#21C1D6]/60 sm:w-auto justify-center text-center"
            onClick={handleClearFilters}
            type="button"
            aria-label="Clear all filters"
            tabIndex={0}
          >
            <HiOutlineTrash className="text-lg" aria-hidden="true" />
            <span className="w-full text-center sm:text-left">
              Clear Filters
            </span>
          </button>
        )}
      </div>
      <div className="mt-2 sm:mt-0 w-full sm:w-auto flex justify-center items-center sm:justify-center">
        <FilterButton
          label={sortOption}
          icon={HiOutlineSortAscending}
          type="dropdown"
          options={sortOptions}
          onSelect={setSortOption}
          alignRight
          className="w-full sm:w-auto text-center justify-center"
        />
      </div>
    </div>
  );
};
