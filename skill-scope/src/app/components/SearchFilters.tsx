'use client'

import React, { useState } from 'react';

type Filters = {
  timeFrame: string;
  company: string;
  city: string;
  state: string;
  country: string;
  level: string;
};

type SearchFiltersProps = {
  onFilterChange: (filters: Filters) => void;
};

const SearchFilters: React.FC<SearchFiltersProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    timeFrame: '',
    company: '',
    city: '',
    state: '',
    country: '',
    level: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));

    onFilterChange({ ...filters, [name]: value });
  };

  return (
    <div className="bg-transparent p-6 rounded-lg shadow space-y-4">
      <label className="block text-sm font-medium text-white">Filter by:</label>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex items-center border-b border-teal-500 py-2">
          <select
            className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
            name="timeFrame"
            value={filters.timeFrame}
            onChange={handleChange}
          >
            <option value="" disabled>Time Frame</option>
            <option value="pastYear">Past Year</option>
            <option value="pastMonth">Past Month</option>
            <option value="pastWeek">Past Week</option>
          </select>
        </div>
  
        <div className="flex items-center border-b border-teal-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Company"
            name="company"
            value={filters.company}
            onChange={handleChange}
          />
        </div>
  
        <div className="flex items-center border-b border-teal-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="City"
            name="city"
            value={filters.city}
            onChange={handleChange}
          />
        </div>
  
        <div className="flex items-center border-b border-teal-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="State"
            name="state"
            value={filters.state}
            onChange={handleChange}
          />
        </div>
  
        <div className="flex items-center border-b border-teal-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Country"
            name="country"
            value={filters.country}
            onChange={handleChange}
          />
        </div>
  
        <div className="flex items-center border-b border-teal-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Experience Level"
            name="level"
            value={filters.level}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );  
};

export default SearchFilters;
