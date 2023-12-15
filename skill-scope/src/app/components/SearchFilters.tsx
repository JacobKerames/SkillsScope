"use client";

import React, { useEffect } from "react";

export type Filters = {
  timeFrame: string;
  company: string;
  location: string;
  level: string;
};

type SearchFiltersProps = {
  setFilters: (name: string, value: string) => void;
  currentFilters: Filters;
};

const SearchFilters: React.FC<SearchFiltersProps> = ({ setFilters, currentFilters }) => {
  const [localFilters, setLocalFilters] = React.useState<Filters>(currentFilters);

  useEffect(() => {
    setLocalFilters(currentFilters);
  }, [currentFilters]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = event.target;
    const updatedFilters = {
      ...localFilters,
      [name]: value
    };
    setLocalFilters(updatedFilters);
    setFilters(name, value);
  };

  return (
    <div className="bg-transparent p-6 rounded-lg shadow space-y-4">
      <label className="block text-sm font-medium text-white">Filter by:</label>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Time Frame Select */}
        <div className="flex items-center border-b border-teal-500 py-2">
          <select
            className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
            name="timeFrame"
            value={localFilters.timeFrame}
            onChange={handleChange}
          >
            {/* ... Time Frame select input ... */}
            <option value="" disabled>
              Time Frame
            </option>
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
        <div className="flex items-center border-b border-teal-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="City, state, or country"
            name="location"
            value={localFilters.location}
            onChange={handleChange}
          />
        </div>

        {/* Level Select */}
        <div className="flex items-center border-b border-teal-500 py-2">
          <select
            className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
            name="level"
            value={localFilters.level}
            onChange={handleChange}
          >
            {/* ... Level select input ... */}
            <option value="" disabled>
              Experience Level
            </option>
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
    </div>
  );
};

export default SearchFilters;
