"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import BarChart from "./BarChart";
import ResultsTypeButtons from "./ResultsTypeButtons";

export type Skills = {
  skillName: string;
  percentage: number;
};

const getFirstParamValue = (
  param: string | string[] | null,
  defaultValue = ""
) => (Array.isArray(param) ? param[0] : param || defaultValue);

const SearchResults = () => {
  const [skills, setSkills] = useState<Skills[]>([]);
  const searchParams = useSearchParams();

  const title = decodeURIComponent(getFirstParamValue(searchParams.get("title"), "your search"));
  const timeFrame = getFirstParamValue(searchParams.get("timeFrame"));
  const company = getFirstParamValue(searchParams.get("company"));
  const location = getFirstParamValue(searchParams.get("location"));
  const level = getFirstParamValue(searchParams.get("level"));

  useEffect(() => {
    const controller = new AbortController();

    const queryParams = new URLSearchParams({
      timeFrame,
      company,
      location,
      level,
    });
    if (title !== "your search") {
      queryParams.append("keyword", title);
    }

    const hasValidParams = Array.from(queryParams.entries()).some(([key, value]) => key === "keyword" || value.trim() !== '');
    if (!hasValidParams) {
      setSkills([]);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5277/search/skills?${queryParams.toString()}`,
          { signal: controller.signal }
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setSkills(data);
      } catch (error) {
        if (error instanceof Error) {
          if (error.name !== "AbortError") {
            console.error("Error fetching search results:", error);
          }
        } else {
          console.error("An unexpected error occurred:", error);
        }
      }
    };

    fetchData();
    return () => controller.abort();
  }, [title, timeFrame, company, location, level]);

  const renderSkillsContent = () => {
    if (skills.length > 0) {
      return (
        <div
          className="container mx-auto flex flex-col p-6"
          style={{ maxWidth: "800px" }}
        >
          <ResultsTypeButtons />
          <p className="text-xl text-left">
            Top skills for {title || "your search"} jobs
          </p>
          <BarChart skills={skills} />
        </div>
      );
    }

    return (
      <div className="container mb-20 mx-auto flex flex-col justify-center items-center px-6">
        <p className="text-xl">
          No skills found for {title || "your search"}.
        </p>
      </div>
    );
  };
  return <>{renderSkillsContent()}</>;
};

export default SearchResults;
