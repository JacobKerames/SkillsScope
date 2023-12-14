"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import BarChart from "./BarChart";
import ResultsTypeButtons from "./ResultsTypeButtons";

export type Skills = {
  skillName: string;
  percentage: number;
};

const SearchResults = () => {
  const [skills, setSkills] = useState<Skills[]>([]);
  const searchParams = useSearchParams();
  const keyword = searchParams.get("title");

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      if (keyword) {
        try {
          const response = await fetch(
            `http://localhost:5277/search/skills/${encodeURIComponent(
              keyword
            )}`,
            { signal }
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          let data = await response.json();
          setSkills(data);
        } catch (error) {
          if (error instanceof Error && error.name === "AbortError") {
            console.log("Fetch aborted");
          } else {
            console.error("Error fetching search results:", error);
          }
        }
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [keyword]);

  const renderSkillsContent = () => {
    if (skills.length > 0) {
      return (
        <div className="container mx-auto flex flex-col p-6" style={{ maxWidth: "800px" }}>
          <ResultsTypeButtons />
          <p className="text-xl text-left">
            Top skills for '{keyword || "your search"}' jobs
          </p>
          <BarChart skills={skills} />
        </div>
      );
    }

    return (
      <div className="container mb-20 mx-auto flex flex-col justify-center items-center px-6">
        <p className="text-xl">No skills found for '{keyword || "your search"}'.</p>
      </div>
    );
  };
  return <>{renderSkillsContent()}</>;
};

export default SearchResults;
