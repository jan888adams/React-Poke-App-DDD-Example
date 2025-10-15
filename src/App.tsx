import SearchBar from "./pokemon/presentation/components/search/SearchBar";
import "./app.sass";

function App() {
  return (
    <div className="app__container">
      <h1>Pokemon Search App</h1>
      <img src="/logo.svg" alt="Pokemon Logo" className="app__logo" />
      <SearchBar />
    </div>
  );
}

export default App;
