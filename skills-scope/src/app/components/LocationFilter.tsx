import { useEffect, useRef, useState } from "react";
import { CloseButton, Combobox, TextInput, useCombobox } from "@mantine/core";

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
  const [data, setData] = useState<Location[] | null>(null);
  const [value, setValue] = useState("");
  const [fieldSet, setFieldSet] = useState(false);
  const [empty, setEmpty] = useState(false);
  const abortController = useRef<AbortController>();
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  async function getAsyncData(searchQuery: string, signal: AbortSignal) {
    try {
      const response = await fetch(
        `https://skillsscope-backend.azurewebsites.net/location/locations?query=${searchQuery}`,
        { signal }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    } catch (error: unknown) {
      if (error instanceof Error && error.name !== "AbortError") {
        console.error("Fetch error:", error);
      }
    }
  }

  const fetchOptions = (query: string) => {
    abortController.current?.abort();
    abortController.current = new AbortController();

    getAsyncData(query || "united states", abortController.current.signal)
      .then((result) => {
        setData(result);
        setEmpty(result.length === 0);
        abortController.current = undefined;
      })
      .catch(() => {});
  };

  const locationToString = (location: Location) => {
    const parts = [];
    if (location.city) {
      parts.push(location.city.cityName);
    }
    if (location.state) {
      parts.push(location.state.stateName);
    }
    parts.push(location.country.countryName);
    return parts.join(", ");
  };

  const options = (data || []).map((location) => {
    const locationString = locationToString(location);
    const key = `${location.city?.cityId}-${location.state?.stateId}-${location.country.countryId}`;

    return (
      <Combobox.Option value={locationString} key={key}>
        {locationString}
      </Combobox.Option>
    );
  });

  useEffect(() => {
    if (cityId === null && stateId === null && countryId === null) {
      setValue("");
      setFieldSet(false);
      fetchOptions("united states");
    }
  }, [cityId, stateId, countryId]);

  return (
    <Combobox
      onOptionSubmit={(optionValue) => {
        setValue(optionValue);
        const selectedLocation = data?.find(
          (location) => locationToString(location) === optionValue
        );
        if (selectedLocation) {
          setLocation(
            selectedLocation.city?.cityId || null,
            selectedLocation.state?.stateId || null,
            selectedLocation.country.countryId
          );
          setFieldSet(true);
        }
        combobox.closeDropdown();
      }}
      withinPortal={false}
      store={combobox}
    >
      <Combobox.Target>
        <TextInput
          placeholder="City, State, or Country"
          value={value}
          onChange={(event) => {
            setValue(event.currentTarget.value);
            fetchOptions(event.currentTarget.value);
            combobox.resetSelectedOption();
            combobox.openDropdown();
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => {
            combobox.openDropdown();
            if (data === null) {
              fetchOptions(value);
            }
          }}
          onBlur={() => {
            if (!fieldSet) {
              setLocation(null, null, null);
              setValue("");
              fetchOptions("");
            }
            combobox.closeDropdown();
          }}
          rightSection={
            value !== "" && (
              <CloseButton
                size="sm"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => {
                  setValue("");
                  setFieldSet(false);
                  setLocation(null, null, null);
                }}
                aria-label="Clear location filter"
              />
            )
          }
        />
      </Combobox.Target>

      <Combobox.Dropdown hidden={data === null}>
        <Combobox.Options>
          {options}
          {empty && <Combobox.Empty>No results found</Combobox.Empty>}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

export default LocationFilter;
