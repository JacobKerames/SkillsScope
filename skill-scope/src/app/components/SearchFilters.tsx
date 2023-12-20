"use client";

import { useEffect, useState } from "react";
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
    <div className="bg-transparent border-b border-teal-700 p-6 rounded-lg shadow space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TimeFrameFilter
          timeFrame={localFilters.timeFrame}
          onTimeFrameChange={(value) => handleChange("timeFrame", value)}
        />

        <CompanyFilter
          companyId={localFilters.companyId}
          setCompany={(value) => handleChange("companyId", value)}
        />

        <LocationFilter
          cityId={localFilters.cityId}
          stateId={localFilters.stateId}
          countryId={localFilters.countryId}
          setLocation={handleLocationChange}
        />

        <ExperienceLevelFilter
          level={localFilters.level}
          onLevelChange={(value) => handleChange("level", value)}
        />
      </div>
      {isAnyFilterSet && (
        <div className="flex justify-center pt-2">
          <button
            className="text-sm py-1 px-2 rounded border-4 text-white bg-teal-600 border-teal-600 hover:bg-teal-700 hover:border-teal-700"
            type="button"
            onClick={handleResetFilters}
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;
