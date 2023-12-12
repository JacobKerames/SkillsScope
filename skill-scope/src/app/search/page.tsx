import React from 'react';
import Layout from '../layout';
import SearchResults from '../components/SearchResults';

const SearchResultsPage = () => {
  return (
    <Layout>
      <div className="container mx-auto h-screen flex flex-col justify-center items-center">
        <h1 className="text-5xl text-center mb-4">Search Results</h1>
        <SearchResults />
      </div>
    </Layout>
  );
};

export default SearchResultsPage;
