import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import "../PokedexPage/style/PokedexPage.css";

const SelectType = ({ setTypeSelected }) => {
  const url = "https://pokeapi.co/api/v2/type";
  const [types, getTypes] = useFetch(url);

  useEffect(() => {
    getTypes();
  }, []);

  const handleChange = (e) => {
    setTypeSelected(e.target.value);
  };

  return (
    <div className="select">
      <select className="select__pokemon" onChange={handleChange}>
        <option className="select__value" value="allPokemons">
          All pokemons
        </option>
        {types?.results.map((typeInfo) => (
          <option
            className="select__type"
            key={typeInfo.url}
            value={typeInfo.url}
          >
            {typeInfo.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectType;
