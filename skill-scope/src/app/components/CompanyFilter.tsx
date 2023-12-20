import { useState, useEffect } from "react";
import { Autocomplete, Box } from '@mantine/core';

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

  const handleCompanyChange = (value: string) => {
    const company = companies.find((c) => c.companyName === value);
    setSelectedCompany(company || null); // Set to null if company is undefined
    setCompany(company?.companyId || null);
  };  

  return (
    <Box style={{ padding: '0.5rem 0' }}>
      <Autocomplete
        value={selectedCompany?.companyName || ''}
        onChange={handleCompanyChange}
        data={companies.map((company) => company.companyName)}
        placeholder="Company"
        limit={10} // Assuming you want to limit the number of suggestions
        // Add more Mantine-specific props as needed
      />
    </Box>
  );
};

export default CompanyFilter;
