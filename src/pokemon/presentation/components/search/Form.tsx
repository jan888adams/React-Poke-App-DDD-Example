import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Suggestions } from "./Suggestions";
import { SearchInputSchema } from "../../schemas/SearchInputSchema";
import { PokemonSearchForm } from "../../types/schemas/PokemonSearchForm";
import { useState } from "react";
import { FormProps } from "../../types/components/search/FormProps";
import { ErrorMessage } from "../../../../shared/presentation/components/ErrorMessage";
import searchIcon from "../../assets/search-icon.svg";
import "../../styles/search/form.sass";

export const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<PokemonSearchForm>({
    resolver: zodResolver(SearchInputSchema),
    defaultValues: {
      searchTerm: "",
    },
  });

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const searchTerm = watch("searchTerm");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showError, setShowError] = useState(true);

  const onFormSubmit = (data: PokemonSearchForm) => {
    onSubmit(data.searchTerm.trim());
    reset();
    setShowSuggestions(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue("searchTerm", event.target.value);
    setShowSuggestions(true);
  };

  const handleSuggestionSelect = (value: string) => {
    setValue("searchTerm", value);
    setShowSuggestions(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (event.key === "ArrowDown") {
      setFocusedIndex((prevIndex) =>
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0,
      );
    } else if (event.key === "ArrowUp") {
      setFocusedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1,
      );
    } else if (event.key === "Enter" && focusedIndex >= 0) {
      event.preventDefault();
      handleSuggestionSelect(suggestions[focusedIndex]);
    }
  };

  return (
    <form className="search-form" onSubmit={handleSubmit(onFormSubmit)}>
      <div className="search-form__row">
        <div className="search-form__input-wrapper">
          <input
            className="search-form__input"
            {...register("searchTerm")}
            type="text"
            placeholder="Find your pokemon.."
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <button
            type="submit"
            className="search-form__icon-button"
            aria-label="Search"
            tabIndex={0}
          >
            <img src={searchIcon} alt="Search" className="search-form__icon" />
          </button>

          {showSuggestions && (
            <Suggestions
              inputValue={searchTerm}
              onSuggestionSelect={handleSuggestionSelect}
              setSuggestions={setSuggestions}
              focusedIndex={focusedIndex}
            />
          )}
        </div>
      </div>

      {errors.searchTerm?.message && showError && (
        <ErrorMessage
          message={errors.searchTerm.message}
          onClose={() => setShowError(false)}
        />
      )}
    </form>
  );
};
