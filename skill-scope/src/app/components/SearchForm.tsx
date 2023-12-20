import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { TextInput, Button, Group, Alert } from "@mantine/core";

type SearchFormProps = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  showFilters?: boolean;
  toggleFilters?: () => void;
};

const SearchForm: React.FC<SearchFormProps> = ({
  searchTerm,
  setSearchTerm,
  showFilters,
  toggleFilters,
}) => {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const isValidSearchTerm = (term: string) => !term.includes("%");

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValidSearchTerm(searchTerm)) {
      setErrorMessage('The search term cannot contain the "%" symbol.');
      return;
    }
    setErrorMessage("");

    const queryParams = new URLSearchParams();
    queryParams.append("title", searchTerm.trim());
    router.push(`/search?${queryParams.toString()}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTerm = e.target.value;
    setSearchTerm(newTerm);
    setErrorMessage(
      isValidSearchTerm(newTerm)
        ? ""
        : 'The search term cannot contain the "%" symbol.'
    );
  };

  const handleFilters = () => {
    if (toggleFilters) {
      toggleFilters();
    }
  };

  return (
    <>
      <form onSubmit={handleSearch}>
        <Group gap="xs" align="center">
          <TextInput
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search job titles..."
            aria-label="Job title search"
          />
          <Button type="submit">Search</Button>
          {pathname !== "/" && (
            <Button
              onClick={handleFilters}
              variant={showFilters ? "filled" : "outline"}
            >
              Filter
              {showFilters ? <FaCaretUp /> : <FaCaretDown />}
            </Button>
          )}
        </Group>

        {errorMessage && (
          <Alert color="red" aria-live="assertive">
            {errorMessage}
          </Alert>
        )}
      </form>
    </>
  );
};

export default SearchForm;
