"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import BarChart from "./BarChart";
import ResultsTypeButtons from "./ResultsTypeButtons";
import CircularProgress from "@mui/material/CircularProgress";

export type Skill = {
  skillName: string;
  percentage: number;
};

const getFirstParamValue = (
  param: string | string[] | null,
  defaultValue = ""
) => (Array.isArray(param) ? param[0] : param || defaultValue);

const SearchResults = () => {
  const [skills, setSkills] = useState<Skill[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  const title = getFirstParamValue(searchParams.get("title"));
  const timeFrame = getFirstParamValue(searchParams.get("timeFrame"));
  const company = getFirstParamValue(searchParams.get("company"));
  const cityId = getFirstParamValue(searchParams.get("cityId"));
  const stateId = getFirstParamValue(searchParams.get("stateId"));
  const countryId = getFirstParamValue(searchParams.get("countryId"));
  const level = getFirstParamValue(searchParams.get("level"));

  useEffect(() => {
    setSkills(null);
    setError(null);
    const controller = new AbortController();

    const queryParams = new URLSearchParams({
      timeFrame,
      company,
      cityId,
      stateId,
      countryId,
      level,
    });
    if (title) {
      queryParams.append("keyword", title);
    }

    const hasValidParams = Array.from(queryParams.entries()).some(
      ([key, value]) => key === "keyword" || value.trim() !== ""
    );
    if (!hasValidParams) {
      setSkills(null);
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
        if (error instanceof Error && error.name !== "AbortError") {
          console.error("Error fetching search results:", error);
          setError("Failed to fetch search results. Please try again.");
        }
      }
    };

    fetchData();
    return () => controller.abort();
  }, [title, timeFrame, company, cityId, stateId, countryId, level]);

  const generateResultsLabel = () => {
    let label = "";
    const filters = [];

    if (level) {
      filters.push(`${level} level`);
    }
    if (company) {
      filters.push(
        `at ${company
          .split(" ")
          .filter((word) => word)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")}`
      );
    }
    if (cityId || stateId || countryId) {
      filters.push(`in selected location `);
    }
    if (timeFrame) {
      filters.push(`in the ${timeFrameToLabel(timeFrame)}`);
    }

    if (filters.length > 0) {
      label += filters.join("\n");
    }

    return label.charAt(0).toUpperCase() + label.slice(1);
  };

  const timeFrameToLabel = (timeFrame: string) => {
    switch (timeFrame) {
      case "pastMonth":
        return "past month";
      case "pastYear":
        return "past year";
      case "pastTwoYears":
        return "past two years";
      case "pastFiveYears":
        return "past five years";
      default:
        return "";
    }
  };

  const renderSkillsContent = () => {
    if (skills === null) {
      return (
        <div className="container mb-20 mx-auto flex flex-col justify-center items-center px-6 py-12">
          <CircularProgress />
        </div>
      );
    }

    if (error) {
      return (
        <div className="container mb-20 mx-auto flex flex-col justify-center items-center px-6">
          <p className="text-xl text-red-500">{error}</p>
        </div>
      );
    }

    if (skills.length === 0) {
      return (
        <div className="container mb-20 mx-auto flex flex-col justify-center items-center px-6">
          <p className="text-xl">
            No skills found for{" "}
            {title &&
              title
                .split(" ")
                .filter((word) => word)
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
          </p>
          <p className="text-lg text-left text-gray-500">
            {generateResultsLabel()}
          </p>
        </div>
      );
    }

    return (
      <div
        className="container mx-auto flex flex-col p-6"
        style={{ maxWidth: "800px" }}
      >
        <ResultsTypeButtons />
        <p className="text-xl text-left">
          Top skills for{" "}
          {title &&
            title
              .split(" ")
              .filter((word) => word)
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}{" "}
          jobs
        </p>
        <p className="text-lg text-left text-gray-500">
          {generateResultsLabel()}
        </p>
        <BarChart skills={skills} />
      </div>
    );
  };
  return <>{renderSkillsContent()}</>;
};

export default SearchResults;
