import { useState, useEffect } from "react";
import { Autocomplete, Box, TextInput } from "@mantine/core";

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

  const getLocationLabel = (location: Location): string => {
    if (location.city && location.state) {
      return `${location.city.cityName}, ${location.state.stateName}, ${location.country.countryName}`;
    } else if (location.state) {
      return `${location.state.stateName}, ${location.country.countryName}`;
    } else {
      return location.country.countryName;
    }
  };

  const uniqueLocations = locations.reduce<Location[]>((unique, loc) => {
    const label = getLocationLabel(loc);
    if (!unique.some(u => getLocationLabel(u) === label)) {
      unique.push(loc);
    }
    return unique;
  }, []);

  const handleLocationChange = (
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
        style={{ width: "100%" }}
        value={selectedLocation ? getLocationLabel(selectedLocation) : ''}
        onChange={(label) => {
          // Find the Location object that matches the selected label
          const selectedLocation = locations.find(loc => 
            getLocationLabel(loc) === label
          );
      
          // If a location is found, pass it to handleLocationChange, otherwise pass null
          handleLocationChange(selectedLocation || null);
        }}
        data={uniqueLocations.map(getLocationLabel)}
        placeholder="City, State, or Country"
        // Add more Mantine specific props as needed
      />
    </div>
  );
};

export default LocationFilter;
