import { useEffect, useState } from "react";
import { Container, Grid, Button, Paper } from "@mantine/core";
import LocationFilter from "./LocationFilter";
import TimeFrameFilter from "./TimeFrameFilter";
import ExperienceLevelFilter from "./ExperienceLevelFilter";
import CompanyFilter from "./CompanyFilter";

export interface Filters {
  timeFrame: string;
  companyId: number | null;
  cityId: number | null;
  stateId: number | null;
  countryId: number | null;
  level: string;
}

type SearchFiltersProps = {
  setFilters: (filters: Filters) => void;
  currentFilters: Filters;
};

const SearchFilters: React.FC<SearchFiltersProps> = ({
  setFilters,
  currentFilters,
}) => {
  const [localFilters, setLocalFilters] = useState<Filters>(currentFilters);
  const isAnyFilterSet = Object.values(localFilters).some(
    (value) => value !== ""
  );

  useEffect(() => {
    setLocalFilters(currentFilters);
  }, [currentFilters]);

  const handleChange = (filterType: keyof Filters, value: any) => {
    const updatedFilters = { ...localFilters, [filterType]: value };
    setLocalFilters(updatedFilters);
    setFilters(updatedFilters);
  };

  const handleLocationChange = (
    cityId: number | null,
    stateId: number | null,
    countryId: number | null
  ) => {
    const updatedFilters = {
      ...localFilters,
      cityId,
      stateId,
      countryId,
    };
    setLocalFilters(updatedFilters);
    setFilters(updatedFilters);
  };

  const handleResetFilters = () => {
    const resetFilters: Filters = {
      timeFrame: "",
      companyId: null,
      cityId: null,
      stateId: null,
      countryId: null,
      level: "",
    };
    setLocalFilters(resetFilters);
    setFilters(resetFilters);
  };

  return (
    <Paper shadow="sm" p="md" withBorder>
      <Grid gutter="md">
        <Grid.Col span={6}>
          <TimeFrameFilter
            timeFrame={localFilters.timeFrame}
            onTimeFrameChange={(value) => handleChange("timeFrame", value)}
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <CompanyFilter
            companyId={localFilters.companyId}
            setCompany={(value) => handleChange("companyId", value)}
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <LocationFilter
            cityId={localFilters.cityId}
            stateId={localFilters.stateId}
            countryId={localFilters.countryId}
            setLocation={handleLocationChange}
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <ExperienceLevelFilter
            level={localFilters.level}
            onLevelChange={(value) => handleChange("level", value)}
          />
        </Grid.Col>
      </Grid>
      {isAnyFilterSet && (
        <Container my="md" size="xs" style={{ textAlign: "center" }}>
          <Button onClick={handleResetFilters}>Reset</Button>
        </Container>
      )}
    </Paper>
  );
};

export default SearchFilters;
