import { Routes, Route } from "react-router-dom";
import { SearchBar } from "../../../pokemon/presentation/components/search/SearchBar";
import { Page as PokemonDetailPage } from "../../../pokemon/presentation/components/details/Page";
import { NotFoundPage } from "./error/NotFoundPage";
import "../styles/app.sass";

export function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="app__container">
            <img src="/logo.svg" alt="Pokemon Logo" className="app__logo" />
            <SearchBar />
          </div>
        }
      />
      <Route path="/pokemon/:id" element={<PokemonDetailPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
