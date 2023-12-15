'use client'

import React from 'react';
import { metadata } from '../metadata';
import SearchForm from '../components/SearchForm';
import SearchResults from '../components/SearchResults';

const SearchResultsPage = () => {
  return (
    <>
      <div className="container mt-6 mx-auto flex flex-col justify-center items-center p-6">
        <h1 className="text-5xl text-center mb-4">{metadata.title as string}</h1>
        <p className="text-xl text-center mb-8">{metadata.description as string}</p>
        <SearchForm />
      </div>
      <SearchResults />
    </>
  );
};

export default SearchResultsPage;
