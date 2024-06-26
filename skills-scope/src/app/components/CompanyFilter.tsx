import { useEffect, useRef, useState } from "react";
import { CloseButton, Combobox, TextInput, useCombobox } from "@mantine/core";
import baseUrl from '../env.config';

interface Company {
  companyId: number;
  companyName: string;
}

interface CompanyFilterProps {
  companyId: number | null;
  setCompany: (companyId: number | null) => void;
}

const CompanyFilter: React.FC<CompanyFilterProps> = ({
  companyId,
  setCompany,
}) => {
  const [data, setData] = useState<Company[] | null>(null);
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
        `${baseUrl}/company/companies?query=${searchQuery}`,
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

    getAsyncData(query, abortController.current.signal)
      .then((result) => {
        setData(result);
        setEmpty(result.length === 0);
        abortController.current = undefined;
      })
      .catch(() => {});
  };

  const options = (data || []).map((company) => {
    const key = `${company.companyId}`;
    return (
      <Combobox.Option value={company.companyName} key={key}>
        {company.companyName}
      </Combobox.Option>
    );
  });

  useEffect(() => {
    if (companyId === null) {
      setValue("");
      setFieldSet(false);
      fetchOptions("");
    }
  }, [companyId]);

  return (
    <Combobox
      onOptionSubmit={(optionValue) => {
        setValue(optionValue);
        const selectedCompany = data?.find(
          (company) => company.companyName === optionValue
        );
        if (selectedCompany) {
          setCompany(selectedCompany.companyId);
          setFieldSet(true);
        }
        combobox.closeDropdown();
      }}
      withinPortal={false}
      store={combobox}
    >
      <Combobox.Target>
        <TextInput
          placeholder="Company"
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
              setCompany(null);
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
                  setCompany(null);
                }}
                aria-label="Clear company filter"
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

export default CompanyFilter;
