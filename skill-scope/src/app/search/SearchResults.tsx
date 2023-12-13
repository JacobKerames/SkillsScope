'use client'

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

type Skills = {
  skillName: string;
  percentage: number;
};

const SearchResults = () => {
  const [skills, setSkills] = useState<Skills[]>([]);
  const searchParams = useSearchParams();
  const keyword = searchParams.get('title');

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      if (keyword) {
        try {
          const response = await fetch(`http://localhost:5277/search/skills/${encodeURIComponent(keyword)}`, { signal });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setSkills(data);
        } catch (error) {
          if (error instanceof Error && error.name === 'AbortError') {
            console.log('Fetch aborted');
          } else {
            console.error('Error fetching search results:', error);
          }
        }
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [keyword]);

  return (
    <div>
      {skills.length > 0 ? (
        <ul>
            {skills.map((skill, index) => (
                <li key={skill.skillName || index}>
                    {skill.skillName}: {skill.percentage}%
                </li>
            ))}
        </ul>
      ) : (
          <p>No skills found for {keyword}.</p>
      )}
    </div>
  );
};

export default SearchResults;
