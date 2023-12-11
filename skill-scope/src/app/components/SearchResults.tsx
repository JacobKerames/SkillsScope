import React from 'react';

type Skills = {
  skillName: string;
  percentage: number;
};

type SearchResultsProps = {
  skills: Skills[];
};

const SearchResults: React.FC<SearchResultsProps> = ({ skills }) => {
  return (
    <div>
      {skills.length > 0 ? (
        <ul>
          {skills.map((skill) => (
            <li key={skill.skillName}>
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
