import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SearchInputSchema,
  type PokemonSearchForm,
} from "../../schemas/SearchInputSchema";

interface Props {
  onSubmit: (value: string) => void;
}

const Form = function Form({ onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PokemonSearchForm>({
    resolver: zodResolver(SearchInputSchema),
    defaultValues: {
      searchTerm: "",
    },
  });

  const onFormSubmit = (data: PokemonSearchForm) => {
    onSubmit(data.searchTerm.trim());
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <input
        {...register("searchTerm")}
        type="text"
        placeholder="Search for Pokemon"
      />
      <button type="submit">Search</button>
      {errors.searchTerm && <span>{errors.searchTerm.message}</span>}
    </form>
  );
};

export default Form;
