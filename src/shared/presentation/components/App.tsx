import {SearchBar} from "./pokemon/presentation/components/search/SearchBar";
import "./app.sass";

export function App() {
  return (
    <div className="app__container">
      <img src="/logo.svg" alt="Pokemon Logo" className="app__logo" />
      <SearchBar />
    </div>
  );
}


