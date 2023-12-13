import React from 'react';
import Layout from '../layout';
import SearchResults from './SearchResults';

const SearchResultsPage = () => {
  return (
    <div>
      <h1 className="text-5xl text-center my-4">Search Results</h1>
      <SearchResults />
    </div>
  );
};

export default SearchResultsPage;
