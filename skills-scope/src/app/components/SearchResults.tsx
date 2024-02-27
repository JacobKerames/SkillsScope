import { useEffect, useState } from "react";
import { Loader, Container, Text, Title, Center } from "@mantine/core";
import { useSearchParams } from "next/navigation";
import BarChart from "./BarChart";
import ResultsTypeButtons from "./ResultsTypeButtons";
import baseUrl from '../env.config';

export type Results = {
  resultName: string;
  percentage: number;
};

const getFirstParamValue = (
  param: string | string[] | null,
  defaultValue = ""
) => (Array.isArray(param) ? param[0] : param || defaultValue);

const SearchResults = () => {
  const [results, setResults] = useState<Results[] | null>(null);
  const [activeTab, setActiveTab] = useState<string | null>("skills");
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  const title = getFirstParamValue(searchParams.get("title"));
  const timeFrame = getFirstParamValue(searchParams.get("timeFrame"));
  const companyId = getFirstParamValue(searchParams.get("companyId"));
  const cityId = getFirstParamValue(searchParams.get("cityId"));
  const stateId = getFirstParamValue(searchParams.get("stateId"));
  const countryId = getFirstParamValue(searchParams.get("countryId"));
  const level = getFirstParamValue(searchParams.get("level"));

  useEffect(() => {
    setResults(null);
    setError(null);
    const controller = new AbortController();

    const queryParams = new URLSearchParams({
      timeFrame,
      companyId,
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
      setResults(null);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/search/${activeTab}?${queryParams.toString()}`,
          { signal: controller.signal }
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setResults(data);
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error("Error fetching search results:", error);
          setError("Failed to fetch search results. Please try again.");
        }
      }
    };

    fetchData();
    return () => controller.abort();
  }, [
    activeTab,
    title,
    timeFrame,
    companyId,
    cityId,
    stateId,
    countryId,
    level,
  ]);

  const generateResultsLabel = () => {
    let label = "";
    const filters = [];

    if (level) {
      filters.push(`${level} level`);
    }
    if (companyId) {
      filters.push();
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

  const renderResultsContent = () => {
    if (results === null) {
      return (
        <Center h={150}>
          <Loader color="#4b86b4" />
        </Center>
      );
    }

    if (error) {
      return (
        <Center className="mb-20">
          <Text c="red" size="xl">
            {error}
          </Text>
        </Center>
      );
    }

    if (results.length === 0) {
      return (
        <Center className="mb-20">
          <Text size="xl" c="neutral-200">
            No {activeTab} found for{" "}
            {title &&
              title
                .split(" ")
                .filter((word) => word)
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
          </Text>
          <Text size="lg" c="gray-500">
            {generateResultsLabel()}
          </Text>
        </Center>
      );
    }

    return (
      <Container style={{ maxWidth: "800px" }}>
        <ResultsTypeButtons activeTab={activeTab} setActiveTab={setActiveTab} />
        <Title order={3}>
          Top {activeTab} for{" "}
          {title &&
            title
              .split(" ")
              .filter((word) => word)
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}{" "}
          jobs
        </Title>
        <Text size="lg" c="gray-500" style={{ marginBottom: "1em" }}>
          {generateResultsLabel()}
        </Text>
        <BarChart results={results} />
      </Container>
    );
  };

  return <>{renderResultsContent()}</>;
};

export default SearchResults;
