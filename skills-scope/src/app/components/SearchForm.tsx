import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { TextInput, Button, Group, Alert } from "@mantine/core";
import classes from "../globals.module.css";

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

  return (
    <>
      <form onSubmit={handleSearch}>
        <Group className={classes.groupBorder} gap="xs">
          <TextInput
            size="md"
            variant="unstyled"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search job titles..."
            aria-label="Job title search"
            classNames={{ input: classes.textInput }}
          />
          <Button type="submit" color='#4b86b4'>Search</Button>
          {pathname !== "/" && (
            <Button
              color='#4b86b4'
              onClick={toggleFilters}
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
