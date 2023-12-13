import React from 'react';
import Layout from './layout';
import { metadata } from './metadata';
import SearchForm from './SearchForm';

const Home = () => {
  return (
    <div className="container mx-auto h-screen flex flex-col justify-center items-center p-6">
      <h1 className="text-5xl text-center mb-4">{metadata.title as string}</h1>
      <p className="text-xl text-center mb-8">{metadata.description as string}</p>
      <SearchForm />
    </div>
  );
};

export default Home;
