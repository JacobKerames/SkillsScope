'use client'

import { useState } from 'react';
import { metadata } from './metadata';
import SearchForm from './components/SearchForm';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  return (
    <div className="container mx-auto h-screen flex flex-col justify-center items-center p-6">
      <h1 className="text-5xl text-center text-neutral-200 mb-4">{metadata.title}</h1>
      <p className="text-xl text-center text-neutral-200 mb-8">{metadata.description}</p>
      <SearchForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    </div>
  );
};

export default Home;
