"use client";
import { Suspense, useEffect, useState } from "react";
import { Container, Title, Text, Collapse, Center } from "@mantine/core";
import { useDisclosure, useInputState } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { metadata } from "../metadata";
import SearchForm from "../components/SearchForm";
import SearchResults from "../components/SearchResults";
import SearchFilters from "../components/SearchFilters";
import { Filters } from "../components/SearchFilters";

const SearchResultsPage = () => {
  const [searchTerm, setSearchTerm] = useInputState("");
  const [showFilters, { toggle }] = useDisclosure(false);
  const [filters, setFilters] = useState<Filters>({
    timeFrame: "",
    companyId: null,
    cityId: null,
    stateId: null,
    countryId: null,
    level: "",
  });
  const router = useRouter();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const initialSearchTerm = decodeURIComponent(
      searchParams.get("title") || ""
    );
    const initialFilters = {
      timeFrame: searchParams.get("timeFrame") || "",
      companyId:
        searchParams.get("companyId") !== null
          ? parseInt(searchParams.get("companyId") as string)
          : null,
      cityId:
        searchParams.get("cityId") !== null
          ? parseInt(searchParams.get("cityId") as string)
          : null,
      stateId:
        searchParams.get("stateId") !== null
          ? parseInt(searchParams.get("stateId") as string)
          : null,
      countryId:
        searchParams.get("countryId") !== null
          ? parseInt(searchParams.get("countryId") as string)
          : null,
      level: searchParams.get("level") || "",
    };

    setSearchTerm(initialSearchTerm);
    setFilters(initialFilters);
  }, [router]);

  useEffect(() => {
    const queryParams = new URLSearchParams();

    if (searchTerm) {
      queryParams.append("title", searchTerm);
    }
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== "") {
        queryParams.append(key, value.toString());
      }
    });

    router.replace(`/search?${queryParams.toString()}`);
  }, [searchTerm, filters, router]);

  const handleFilterChange = (updatedFilters: Filters) => {
    setFilters(updatedFilters);
  };

  return (
    <Container size="md" style={{ height: "100vh" }}>
      <Center
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Title order={1} mt="xl">
          {metadata.title}
        </Title>
        <Text size="xl" mb="lg">
          {metadata.description}
        </Text>
        <SearchForm
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          showFilters={showFilters}
          toggleFilters={toggle}
        />
        <Collapse in={showFilters}>
          <SearchFilters
            currentFilters={filters}
            setFilters={handleFilterChange}
          />
        </Collapse>
      </Center>
      <Suspense>
        <SearchResults />
      </Suspense>
    </Container>
  );
};

export default SearchResultsPage;
