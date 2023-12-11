'use client'

import React, { useState, FormEvent } from "react";

const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!searchTerm.trim()) {
      console.error("Search term is empty");
      return;
    }
    try {
      const response = await fetch(`http://localhost:5277/search/perform/${encodeURIComponent(searchTerm)}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("There has been a problem with your fetch operation:", error);
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-md">
      <div className="flex items-center border-b border-teal-500 py-2">
        <input
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="text"
          placeholder="Search job titles..."
          aria-label="Job title search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
          type="submit"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
