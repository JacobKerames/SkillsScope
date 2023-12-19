"use client";

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
    cityId: null,
    stateId: null,
    countryId: null,
    level: "",
  });
  const router = useRouter();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const initialSearchTerm = decodeURIComponent(
      searchParams.get("title") || ""
    );
    const initialFilters = {
      timeFrame: searchParams.get("timeFrame") || "",
      company: searchParams.get("company") || "",
      cityId:
        searchParams.get("cityId") !== null
          ? parseInt(searchParams.get("cityId") as string)
          : null,
      stateId:
        searchParams.get("stateId") !== null
          ? parseInt(searchParams.get("stateId") as string)
          : null,
      countryId:
        searchParams.get("countryId") !== null
          ? parseInt(searchParams.get("countryId") as string)
          : null,
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
      if (value !== null && value !== "") {
        queryParams.append(key, value.toString());
      }
    });

    router.replace(`/search?${queryParams.toString()}`);
  }, [searchTerm, filters, router]);

  const toggleFilters = () => {
    setShowFilters((prev) => !prev);
  };

  const handleFilterChange = (updatedFilters: Filters) => {
    setFilters(updatedFilters);
  };

  return (
    <>
      <div className="container mt-6 mx-auto flex flex-col justify-center items-center p-6">
        <h1 className="text-5xl text-center mb-4">{metadata.title}</h1>
        <p className="text-xl text-center mb-8">{metadata.description}</p>
        <SearchForm
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          showFilters={showFilters}
          toggleFilters={toggleFilters}
        />
        {showFilters && (
          <SearchFilters
            currentFilters={filters}
            setFilters={handleFilterChange}
          />
        )}
      </div>
      <SearchResults />
    </>
  );
};

export default SearchResultsPage;
