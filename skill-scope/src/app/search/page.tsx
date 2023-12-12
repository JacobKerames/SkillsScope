'use client'

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Layout from '../layout';
import SearchResults from '../components/SearchResults';

const SearchResultsPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const searchParams = useSearchParams();
  const keyword = searchParams.get('title');

  useEffect(() => {
    const fetchData = async () => {
      if (keyword) {
        try {
          const response = await fetch(`http://localhost:5277/search/skills/${encodeURIComponent(keyword)}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setSearchResults(data);
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      }
    };

    if (keyword) {
      fetchData();
    }
  }, [keyword]);

  return (
    <Layout>
      <div className="container mx-auto h-screen flex flex-col justify-center items-center">
        <h1 className="text-5xl text-center mb-4">Search Results</h1>
        <SearchResults skills={searchResults} />
      </div>
    </Layout>
  );
};

export default SearchResultsPage;
