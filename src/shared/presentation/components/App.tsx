import { Routes, Route } from "react-router-dom";
import { SearchBar } from "../../../pokemon/presentation/components/search/SearchBar";
import { Page as PokemonDetailPage } from "../../../pokemon/presentation/components/details/Page";
import { NotFoundPage } from "./error/NotFoundPage";
import { CartContextProvider } from "../../../pokemon/presentation/context/CartContextProvider";
import { Counter as CartCounter } from "../../../pokemon/presentation/components/cart/Counter";
import { Grid as PokedexGrid } from "../../../pokemon/presentation/components/pokedex/Grid";
import { useEffect } from "react";
import { createSuggestions } from "../../infrastructure/di/DependencyContainer";
import pokeAppLogo from "../assets/poke-app-logo.svg";
import "../styles/app.sass";

export function App() {
  useEffect(() => {
    const initializeSuggestions = async () => {
      try {
        await createSuggestions.execute();
      } catch (error) {
        console.error("Failed to initialize suggestions:", error);
      }
    };

    initializeSuggestions();
  }, []);

  return (
    <CartContextProvider>
      <CartCounter />
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              <div className="app center-container">
                <img
                  src={pokeAppLogo}
                  alt="Pokemon Logo"
                  className="app__logo"
                />
                <SearchBar />
              </div>
            }
          />
          <Route path="/pokemon/:id" element={<PokemonDetailPage />} />
          <Route path="/pokedex" element={<PokedexGrid />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </CartContextProvider>
  );
}
