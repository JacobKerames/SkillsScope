"use client";

import React, { useEffect, useState } from "react";
import LocationFilter from "./LocationFilter";

export interface Filters {
  timeFrame: string;
  company: string;
  cityId: number | null;
  stateId: number | null;
  countryId: number | null;
  level: string;
}

type SearchFiltersProps = {
  setFilters: (filters: Filters) => void;
  currentFilters: Filters;
};

const SearchFilters: React.FC<SearchFiltersProps> = ({
  setFilters,
  currentFilters,
}) => {
  const [localFilters, setLocalFilters] = useState<Filters>(currentFilters);
  const isAnyFilterSet = Object.values(localFilters).some(
    (value) => value !== ""
  );

  useEffect(() => {
    setLocalFilters(currentFilters);
  }, [currentFilters]);

  const handleChange = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    const updatedFilters = {
      ...localFilters,
      [name]: value,
    };
    setLocalFilters(updatedFilters);
    setFilters(updatedFilters);
  };

  const handleLocationChange = (
    cityId: number | null,
    stateId: number | null,
    countryId: number | null
  ) => {
    const updatedFilters = {
      ...localFilters,
      cityId,
      stateId,
      countryId,
    };
    setLocalFilters(updatedFilters);
    setFilters(updatedFilters);
  };

  const handleResetFilters = () => {
    const resetFilters: Filters = {
      timeFrame: "",
      company: "",
      cityId: null,
      stateId: null,
      countryId: null,
      level: "",
    };
    setLocalFilters(resetFilters);
    setFilters(resetFilters);
  };

  return (
    <div className="bg-transparent border-b border-teal-900 p-6 rounded-lg shadow space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Time Frame Select */}
        <div className="flex items-center border-b border-teal-500 py-2">
          <select
            className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
            name="timeFrame"
            value={localFilters.timeFrame}
            onChange={handleChange}
          >
            {/* ... Time Frame select input ... */}
            <option disabled>Time Frame</option>
            <option value="">Any</option>
            <option value="pastMonth">Past Month</option>
            <option value="pastYear">Past Year</option>
            <option value="pastTwoYears">Past 2 Years</option>
            <option value="pastFiveYears">Past 5 Years</option>
          </select>
        </div>

        {/* Company Input */}
        <div className="flex items-center border-b border-teal-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Company"
            name="company"
            value={localFilters.company}
            onChange={handleChange}
          />
        </div>

        {/* Location Input */}
        <LocationFilter
          cityId={localFilters.cityId}
          stateId={localFilters.stateId}
          countryId={localFilters.countryId}
          setLocation={handleLocationChange}
        />

        {/* Level Select */}
        <div className="flex items-center border-b border-teal-500 py-2">
          <select
            className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
            name="level"
            value={localFilters.level}
            onChange={handleChange}
          >
            {/* ... Level select input ... */}
            <option value="">Experience Level</option>
            <option value="entry">Entry</option>
            <option value="junior">Junior</option>
            <option value="mid">Mid</option>
            <option value="senior">Senior</option>
            <option value="lead">Lead</option>
            <option value="principal">Principal</option>
            <option value="staff">Staff</option>
            <option value="manager">Manager</option>
            <option value="director">Director</option>
            <option value="vp">VP</option>
          </select>
        </div>
      </div>
      {isAnyFilterSet && (
        <div className="flex justify-center pt-2">
          <button
            className="text-sm py-1 px-2 rounded border-4 text-white bg-teal-500 border-teal-500 hover:bg-teal-700 hover:border-teal-700"
            type="button"
            onClick={handleResetFilters}
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;
