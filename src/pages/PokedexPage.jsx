import { useSelector } from "react-redux";
import useFetch from "../hooks/useFetch";
import { useEffect, useRef, useState } from "react";
import PokeCard from "../components/PokedexPage/PokeCard";
import SelectType from "../components/PokedexPage/SelectType";
import "../components/PokedexPage/style/PokedexPage.css";

const PokedexPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [typeSelected, setTypeSelected] = useState("allPokemons");

  const trainer = useSelector((store) => store.trainer);

  const inputSearch = useRef();

  const url = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=1000";
  const [pokemons, getPokemons, getTypePokemon] = useFetch(url);

  useEffect(() => {
    if (typeSelected === "allPokemons") {
      getPokemons();
    } else {
      getTypePokemon(typeSelected);
    }
  }, [typeSelected]);

  const handleSearch = (e) => {
    e.preventDefault();
    setInputValue(inputSearch.current.value.trim().toLowerCase());
  };

  const pokeFiltered = pokemons?.results.filter((poke) =>
    poke.name.includes(inputValue)
  );

  const [currentpage, setCurrentPage] = useState(1);
  const pokemonsPerPage = 14;
  const lastIndex = pokemonsPerPage * currentpage;
  const firstIndex = lastIndex - pokemonsPerPage;
  const pokemonsPaginated = pokeFiltered?.slice(firstIndex, lastIndex);

  return (
    <div className="pokedex">
      <div className="pokedex__container">
        <img className="pokedex__img" src="/imgs/img003.png" alt="" />
        {/* <img className="pokedex__image" src="/imgs/img001.png" alt="" /> */}
      </div>
      <p className="pokedex__text">
        <span className="pokedex__span">Hi {trainer},</span> here you will find
        your favorite pokemon
      </p>

      <div className="poke">
        <form className="pokedex__form" onSubmit={handleSearch}>
          <input
            className="pokedex__input"
            ref={inputSearch}
            type="text"
            placeholder="Search a Pokemon"
          />
          <button className="pokedex__search">Search</button>
        </form>
        <SelectType setTypeSelected={setTypeSelected} />
      </div>
      <div className="pokedex__buttons">
        <button
          className="pokedex__previous"
          onClick={() => setCurrentPage(currentpage - 1)}
        >
          Previous
        </button>
        <button
          className="pokedex__next"
          onClick={() => setCurrentPage(currentpage + 1)}
        >
          Next
        </button>
      </div>

      <div className="principal">
        {pokemonsPaginated?.map((poke) => (
          <PokeCard key={poke.url} url={poke.url} />
        ))}
      </div>
    </div>
  );
};

export default PokedexPage;
