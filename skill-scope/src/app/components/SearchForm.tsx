"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

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
      setErrorMessage("The search term cannot contain the '%' symbol.");
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
        : "The search term cannot contain the '%' symbol."
    );
  };

  const handleFilters = () => {
    if (toggleFilters) {
      toggleFilters();
    }
  };

  return (
    <>
      <form onSubmit={handleSearch} className="w-full max-w-lg">
        <div className="flex items-center border-b border-teal-600 py-2 gap-4">
          <input
            className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Search job titles..."
            aria-label="Job title search"
            value={searchTerm}
            onChange={handleInputChange}
          />
          <button
            className="flex-shrink-0 bg-teal-600 hover:bg-teal-700 border-teal-600 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="submit"
          >
            Search
          </button>
          {pathname !== "/" && (
            <button
              className={`flex items-center justify-center text-sm py-1 px-2 rounded border-4 text-white ${
                showFilters
                  ? "bg-teal-700 border-teal-700 hover:bg-teal-600 hover:border-teal-600"
                  : "bg-teal-600 border-teal-600 hover:bg-teal-700 hover:border-teal-700"
              }`}
              type="button"
              onClick={handleFilters}
            >
              Filter
              {showFilters ? (
                <FaCaretUp className="ml-1" />
              ) : (
                <FaCaretDown className="ml-1" />
              )}
            </button>
          )}
        </div>
        {errorMessage && (
          <div className="text-red-500" aria-live="assertive">
            {errorMessage}
          </div>
        )}
      </form>
    </>
  );
};

export default SearchForm;
