import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { FilterOptionsState } from "@mui/material";

interface City {
  cityId: number;
  cityName: string;
  stateId: number;
}

interface State {
  stateId: number;
  stateName: string;
  countryId: number;
}

interface Country {
  countryId: number;
  countryName: string;
  iso3: string;
  iso2: string;
}

interface Location {
  city?: City;
  state?: State;
  country: Country;
}

const LocationFilter = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const defaultFilterOptions = createFilterOptions<Location>();

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch(
          "http://localhost:5277/location/locations"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch locations");
        }
        const data: Location[] = await response.json();
        console.log(data);
        setLocations(data);
      } catch (error) {
        console.error("Error fetching locations:", error);
        // Handle error state as needed
      }
    };

    fetchLocations();
  }, []);

  const getLocationLabel = (location: Location): string => {
    if (location.city) {
      return `${location.city.cityName}, ${location.state?.stateName}, ${location.country.countryName}`;
    } else if (location.state) {
      return `${location.state.stateName}, ${location.country.countryName}`;
    } else {
      return location.country.countryName;
    }
  };

  const filterOptions = (
    options: Location[],
    state: FilterOptionsState<Location>
  ) => {
    return defaultFilterOptions(options, state).slice(0, 10);
  };

  return (
    <Autocomplete
      id="field1"
      forcePopupIcon={false}
      sx={{
        width: "100%",
        "& .MuiInputBase-root": {
          padding: "0", // Remove padding
        },
      }}
      options={locations}
      filterOptions={filterOptions}
      autoHighlight
      getOptionLabel={(option) => getLocationLabel(option)}
      renderOption={(props, option) => (
        <Box
          component="li"
          {...props}
          key={`${option.city?.cityId}-${option.state?.stateId}-${option.country.countryId}`}
        >
          {getLocationLabel(option)}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Location"
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: "0",
              "& fieldset": {
                borderColor: "transparent", // Remove the border color
              },
              "&:hover fieldset": {
                borderColor: "transparent", // Remove the hover border color
              },
              "&.Mui-focused fieldset": {
                borderColor: "transparent", // Remove the focus border color
              },
              "& .MuiAutocomplete-input": {
                padding: "4px 8px",
              },
            },
            "& .MuiAutocomplete-clearIndicator": {
              color: "white",
            },
						'& .MuiInputBase-input::placeholder': {
							color: 'grey', // Set the placeholder color
							opacity: 1, // Override the default opacity to ensure the color is not translucent
						},
          }}
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password",
            style: { color: "white" },
          }}
        />
      )}
    />
  );
};

export default LocationFilter;
