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
    const fetchData = async () => {
      if (keyword) {
        try {
          console.log('Fetching search results for:', keyword);
          const response = await fetch(`http://localhost:5277/search/skills/${encodeURIComponent(keyword)}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setSkills(data);
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
          <p>No skills found for this search query.</p>
      )}
    </div>
  );
};

export default SearchResults;
