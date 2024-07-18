import "./App.css";
import SearchBar from "./components/SearchBar";
import CustomMap from "./components/CustomMap";

const App = () => {
  return (
    <>
      <SearchBar style={{ width: "100%" }} />
      <CustomMap />
    </>
  );
};

export default App;
