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
  const [activeTab, setActiveTab] = useState('skills');
  const [filters, setFilters] = useState({
    timeFrame: '',
    company: '',
    city: '',
    state: '',
    country: '',
    level: ''
  });

  const tabs = [
    { name: 'Skills', value: 'skills' },
    { name: 'Education', value: 'education' },
    { name: 'Experience', value: 'experience' }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));

    onFilterChange({ ...filters, [name]: value });
  };

  return (
    <>
      <div className="bg-transparent p-6 rounded-lg shadow space-y-4">
        <label className="block text-sm font-medium text-white">Filter by:</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center border-b border-teal-500 py-2">
            <select
              className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
              name="timeFrame"
              value={filters.timeFrame}
              onChange={handleChange}
            >
              <option value="" disabled>Time Frame</option>
              <option value="pastMonth">Past Month</option>
              <option value="pastYear">Past Year</option>
              <option value="pastTwoYears">Past 2 Years</option>
              <option value="pastFiveYears">Past 5 Years</option>
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
              placeholder="City, state, or country"
              name="location"
              value={filters.city}
              onChange={handleChange}
            />
          </div>
    
          <div className="flex items-center border-b border-teal-500 py-2">
            <select
              className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
              name="level"
              value={filters.level}
              onChange={handleChange}
            >
              <option value="" disabled>Experience Level</option>
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
      <div className="grid grid-cols-3 gap-4 mt-20">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`py-2 px-4 text-md font-medium ${
              activeTab === tab.value
                ? 'border-b-2 border-red-500 text-white'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>
    </>
  );  
};

export default SearchFilters;
