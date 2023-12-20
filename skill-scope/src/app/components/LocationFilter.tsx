import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { FilterOptionsState, Paper, Popper } from "@mui/material";

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
}

interface Location {
  city?: City;
  state?: State;
  country: Country;
}

interface LocationFilterProps {
  cityId: number | null;
  stateId: number | null;
  countryId: number | null;
  setLocation: (
    cityId: number | null,
    stateId: number | null,
    countryId: number | null
  ) => void;
}

const LocationFilter: React.FC<LocationFilterProps> = ({
  cityId,
  stateId,
  countryId,
  setLocation,
}) => {
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
        setLocations(data);
      } catch (error) {
        console.error("Error fetching locations:", error);
        // Handle error state as needed
      }
    };

    fetchLocations();
  }, []);

  useEffect(() => {
    const foundLocation = locations.find(
      (loc) =>
        loc.city?.cityId === cityId &&
        loc.state?.stateId === stateId &&
        loc.country.countryId === countryId
    );
    setSelectedLocation(foundLocation || null);
  }, [cityId, stateId, countryId, locations]);

  const isOptionEqualToValue = (option: Location, value: Location | null) => {
    return (
      option.city?.cityId === value?.city?.cityId &&
      option.state?.stateId === value?.state?.stateId &&
      option.country.countryId === value?.country.countryId
    );
  };

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

  const handleLocationChange = (
    _event: React.ChangeEvent<{}>,
    newValue: Location | null
  ) => {
    const cityId = newValue?.city?.cityId || null;
    const stateId = newValue?.state?.stateId || null;
    const countryId = newValue?.country?.countryId || null;
    setSelectedLocation(newValue);
    setLocation(cityId, stateId, countryId);
  };

  return (
    <div className="flex items-center border-b border-teal-500 py-2">
      <Autocomplete
        id="field1"
        forcePopupIcon={false}
        sx={{
          width: "100%",
          "& .MuiInputBase-root": {
            padding: "0",
          },
        }}
        value={selectedLocation}
        onChange={handleLocationChange}
        options={locations}
        filterOptions={filterOptions}
        autoHighlight
        isOptionEqualToValue={isOptionEqualToValue}
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
            placeholder="City, State, or Country"
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "0",
                "& fieldset": {
                  borderColor: "transparent",
                },
                "&:hover fieldset": {
                  borderColor: "transparent",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "transparent",
                },
                "& .MuiAutocomplete-input": {
                  padding: "4px 8px",
                  color: "#E6E6E6",
                  "&::placeholder": {
                    color: "#9CA3AF",
                    opacity: 1,
                  },
                },
              },
              "& .MuiAutocomplete-clearIndicator": {
                color: "#E6E6E6",
              },
            }}
            inputProps={{
              ...params.inputProps,
              autoComplete: "new-password",
            }}
          />
        )}
        ListboxProps={{
          sx: {
            maxHeight: 350,
            padding: '5px',
            "& .MuiAutocomplete-option": {
              "&:hover": {
                backgroundColor: "#212121",
              },
            },
          },
        }}
        PopperComponent={(props) => (
          <Popper {...props} style={{ width: "300px" }} />
        )}
        PaperComponent={(props) => (
          <Paper
            {...props}
            style={{
              backgroundColor: "#101010",
              color: "#E6E6E6",
              border: "1px solid gray",
            }}
          />
        )}
      />
    </div>
  );
};

export default LocationFilter;
