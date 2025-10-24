import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Suggestions } from "./Suggestions";
import {
  SearchInputSchema,
  type PokemonSearchForm,
} from "../../schemas/SearchInputSchema";
import "../../styles/search/form.sass";
import { useState } from "react";

interface Props {
  onSubmit: (value: string) => void;
}

export const Form = function Form({ onSubmit }: Props) {
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
  const searchTerm = watch("searchTerm");

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

  return (
    <form className="search-form" onSubmit={handleSubmit(onFormSubmit)}>
      <input
        className="search-form__input"
        {...register("searchTerm")}
        type="text"
        placeholder="Search for Pokemon"
        onChange={handleInputChange}
      />

      {showSuggestions && (
        <Suggestions
          inputValue={searchTerm}
          onSuggestionSelect={handleSuggestionSelect}
        />
      )}

      <button className="search-form__button" type="submit">
        Search
      </button>
      {errors.searchTerm && (
        <span className="search-form__error">{errors.searchTerm.message}</span>
      )}
    </form>
  );
};
