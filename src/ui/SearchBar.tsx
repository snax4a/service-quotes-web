import React from "react";
import { SolidSearch } from "../icons";
import { Input } from "./Input";
import { Spinner } from "./Spinner";

export interface SearchBarProps
  extends React.ComponentPropsWithoutRef<"input"> {
  inputClassName?: string;
  mobile?: boolean;
  isLoading?: boolean;
  onSearch: () => void;
  value: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  className = "",
  inputClassName = "",
  isLoading = false,
  mobile = false,
  value,
  onSearch,
  ...props
}) => {
  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div
      className={`items-center flex w-full bg-primary-250 text-primary-300 border-1 text-sm border-black border-opacity-20 rounded-2xl focus-within:text-primary-100 ${
        mobile ? "px-4" : ""
      } ${className}`}
    >
      {!mobile && (
        <button
          className="flex items-center px-4 h-full text-primary-600"
          onClick={onSearch}
        >
          <SolidSearch className="transform scale-95" />
        </button>
      )}
      <Input
        autoFocus
        data-testid="searchbar"
        className={`${inputClassName} pl-0 leading-5`}
        placeholder="Search"
        transparent
        value={value}
        onKeyDown={onKeyDown}
        {...props}
      />
      {isLoading && (
        <div
          className={`h-full flex items-center pointer-events-none ${
            !mobile && "mx-4"
          }`}
        >
          <Spinner />
        </div>
      )}
    </div>
  );
};
