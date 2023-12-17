'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { metadata } from "../metadata";
import SearchForm from "../components/SearchForm";
import SearchResults from "../components/SearchResults";
import SearchFilters from "../components/SearchFilters";
import { Filters } from "../components/SearchFilters";

const SearchResultsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    timeFrame: "",
    company: "",
    location: "",
    level: "",
  });
  const router = useRouter();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const initialSearchTerm = decodeURIComponent(searchParams.get('title') || '');
    const initialFilters = {
      timeFrame: searchParams.get("timeFrame") || "",
      company: searchParams.get("company") || "",
      location: searchParams.get("location") || "",
      level: searchParams.get("level") || "",
    };

    setSearchTerm(initialSearchTerm);
    setFilters(initialFilters);
  }, [router]);

  useEffect(() => {
    const queryParams = new URLSearchParams();

    if (searchTerm) {
      queryParams.append("title", searchTerm);
    }
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        queryParams.append(key, value);
      }
    });

    router.replace(`/search?${queryParams.toString()}`);
  }, [searchTerm, filters, router]);

  const toggleFilters = () => {
    setShowFilters(prev => !prev);
  };

  const handleFilterChange = (updatedFilters: Filters) => {
    setFilters(updatedFilters);
  };

  return (
    <>
      <div className="container mt-6 mx-auto flex flex-col justify-center items-center p-6">
        <h1 className="text-5xl text-center mb-4">{metadata.title}</h1>
        <p className="text-xl text-center mb-8">{metadata.description}</p>
        <SearchForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} showFilters={showFilters} toggleFilters={toggleFilters} />
        {showFilters &&
          <SearchFilters currentFilters={filters} setFilters={handleFilterChange} />
        }
      </div>
      <SearchResults />
    </>
  );
};

export default SearchResultsPage;
