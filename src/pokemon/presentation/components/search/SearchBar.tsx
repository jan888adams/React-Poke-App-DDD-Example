import React, { useState, useEffect } from "react";
import { Form } from "./Form";
import { usePokemonSearch } from "../../hooks/usePokemonSearch";
import { Card } from "./Card";
import { Modal } from "./Modal";
import { Loading } from "../../../../shared/presentation/components/Loading";
import { ErrorMessage } from "../../../../shared/presentation/components/ErrorMessage";
import "../../styles/search/search-bar.sass";

export const SearchBar: React.FC = () => {
  const {
    pokemon,
    searchPokemon,
    error: searchError,
    loading,
  } = usePokemonSearch();
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (searchError) setError(searchError);
  }, [searchError]);

  const handleSubmit = (value: string) => {
    searchPokemon(value);
    setShowModal(true);
  };

  return (
    <div className="search-bar">
      <Form onSubmit={handleSubmit} />
      {showModal && pokemon && (
        <Modal onClose={() => setShowModal(false)}>
          <Card pokemon={pokemon} />
        </Modal>
      )}
      {error && <ErrorMessage message={error} onClose={() => setError("")} />}
      {loading && <Loading />}
    </div>
  );
};
