'use client'

import React, { useState } from 'react';
import SearchResults from '../components/SearchResults';
import SearchForm from '../components/SearchForm';
import SearchFilters from '../components/SearchFilters';
import { metadata } from '../metadata';

const SearchResultsPage = () => {
  const [filters, setFilters] = useState({});

  const handleFilterChange = (newFilters: React.SetStateAction<{}>) => {
    setFilters(newFilters);
    // You might want to trigger a new search here.
  };

  return (
    <>
      <div className="container mt-6 mx-auto flex flex-col justify-center items-center p-6">
        <h1 className="text-5xl text-center mb-4">{metadata.title as string}</h1>
        <p className="text-xl text-center mb-8">{metadata.description as string}</p>
        <SearchForm />
        <SearchFilters onFilterChange={handleFilterChange} />
      </div>
      <SearchResults />
    </>
  );
};

export default SearchResultsPage;
