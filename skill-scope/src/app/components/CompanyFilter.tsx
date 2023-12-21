import { useEffect, useRef, useState } from "react";
import { Combobox, Loader, TextInput, useCombobox } from "@mantine/core";

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
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Company[] | null>(null);
  const [value, setValue] = useState("");
  const [empty, setEmpty] = useState(false);
  const abortController = useRef<AbortController>();
	const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  async function getAsyncData(searchQuery: string, signal: AbortSignal) {
    try {
      const response = await fetch(
        `http://localhost:5277/company/companies?query=${searchQuery}`,
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
    setLoading(true);

    getAsyncData(query, abortController.current.signal)
      .then((result) => {
        setData(result);
        setLoading(false);
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
          setCompany(
            selectedCompany.companyId
          );
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
          onBlur={() => combobox.closeDropdown()}
          rightSection={loading && <Loader size={18} />}
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
