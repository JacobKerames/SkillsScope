import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { FilterOptionsState, Paper, Popper } from "@mui/material";

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
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(
    null
  );
  const defaultFilterOptions = createFilterOptions<Company>();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch(
          "http://localhost:5277/company/companies"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch companies");
        }
        const data: Company[] = await response.json();
        setCompanies(data);
      } catch (error) {
        console.error("Error fetching companies:", error);
        // Handle error state as needed
      }
    };

    fetchCompanies();
  }, []);

  useEffect(() => {
    const foundCompany = companies.find(
      (company) => company.companyId === companyId
    );
    setSelectedCompany(foundCompany || null);
  }, [companyId, companies]);

  const filterOptions = (
    options: Company[],
    state: FilterOptionsState<Company>
  ) => {
    return defaultFilterOptions(options, state).slice(0, 10);
  };

  const handleCompanyChange = (
    _event: React.ChangeEvent<{}>,
    newValue: Company | null
  ) => {
    setSelectedCompany(newValue);
    setCompany(newValue?.companyId || null);
  };

  return (
    <div className="flex items-center border-b border-teal-500 py-2">
      <Autocomplete
        id="field2"
        forcePopupIcon={false}
        sx={{
          width: "100%",
          "& .MuiInputBase-root": {
            padding: "0",
          },
        }}
        value={selectedCompany}
        onChange={handleCompanyChange}
        options={companies}
        filterOptions={filterOptions}
        autoHighlight
        getOptionLabel={(option) => option.companyName}
        renderOption={(props, option) => (
          <Box
            component="li"
            {...props}
            key={option.companyId}
          >
            {option.companyName}
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Company"
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
          <Popper {...props}/>
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

export default CompanyFilter;
