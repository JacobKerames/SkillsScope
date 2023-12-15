"use client";

import React, { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import SearchFilters from "./SearchFilters";

export type Filters = {
  timeFrame: string;
  company: string;
  location: string;
  level: string;
};

const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<Filters>({
    timeFrame: "",
    company: "",
    location: "",
    level: "",
  });
  const updateFilters: (filters: Filters) => void = setFilters;
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      setSearchTerm(searchParams.get("title") || "");
      setFilters({
        timeFrame: searchParams.get("timeFrame") || "",
        company: searchParams.get("company") || "",
        location: searchParams.get("location") || "",
        level: searchParams.get("level") || "",
      });
    }
  }, []);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.location.pathname === "/search"
    ) {
      const queryParams = new URLSearchParams();

      if (searchTerm.trim()) {
        queryParams.append("title", encodeURIComponent(searchTerm));
      }

      for (const [key, value] of Object.entries(filters)) {
        if (value && value.trim()) {
          queryParams.append(key, value);
        }
      }

      router.push(`/search?${queryParams.toString()}`);
    }
  }, [searchTerm, filters, router]);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const queryParams = new URLSearchParams();

    if (searchTerm.trim()) {
      queryParams.append("title", encodeURIComponent(searchTerm));
    }

    Object.entries(filters).forEach(([key, value]) => {
      if (value && value.trim()) {
        queryParams.append(key, value);
      }
    });

    // Redirect to the search page with the query parameters
    router.push(`/search?${queryParams.toString()}`);
  };

  const handleFilterChange = (name: string, value: string) => {
    const newFilters = { ...filters, [name]: value };
    updateFilters(newFilters);
  };

  return (
    <>
      <form onSubmit={handleSearch} className="w-full max-w-md">
        <div className="flex items-center border-b border-teal-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
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
      <SearchFilters setFilters={handleFilterChange} currentFilters={filters} />
    </>
  );
};

export default SearchForm;
