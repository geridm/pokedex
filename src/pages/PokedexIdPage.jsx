import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useEffect } from "react";
import "../components/PokedexPage/style/PokedexIdPage.css";

const PokedexIdPage = () => {
  const { id } = useParams();

  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const [pokemon, getPokemon] = useFetch(url);

  useEffect(() => {
    getPokemon();
  }, [id]);

  return (
    <div className="pokedexId__container">
      <section className="pokedexId__info">
        <div className="pokedexId__info__background">
          <img
            className="pokedexId__image"
            src={pokemon?.sprites.other["official-artwork"].front_default}
            alt=""
          />
        </div>

        <section className="pokedexId__info__header">
          <h2 className="pokedexId__id">#{id}</h2>
          <div className="pokedexId__info__title">
            <div className="pokedexId__line"></div>
            <h2 className="pokedexId__name">{pokemon?.name}</h2>
            <div className="pokedexId__line"></div>
          </div>

          <div className="pokedexId__group">
            <p className="pokedexId__element">
              Weight<span>{pokemon?.weight}</span>
            </p>
            <p className="pokedexId__element">
              Height<span>{pokemon?.height}</span>
            </p>
          </div>
        </section>

        <section className="pokedexId__body">
          <div className="pokedexId__body__info">
            <p>Type</p>
            <div className="pokedexId__type-skills">
              {pokemon?.types.map((typeInfos) => (
                <div className="pokedexId__item" key={typeInfos.type.url}>
                  {typeInfos.type.name}
                </div>
              ))}
            </div>
          </div>
          <div className="pokedexId__body__info">
            <p>Skills</p>
            <div className="pokedexId__type-skills">
              {pokemon?.abilities.map((abilitiesInfo) => (
                <div
                  className="pokedexId__item"
                  key={abilitiesInfo.ability.url}
                >
                  {abilitiesInfo.ability.name}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="pokedexId__stats">
          <div className="pokedexId__stats__header">
            <h2>Stats</h2>
            <div className="pokedexId__line"></div>
          </div>
          <div className="pokedexId__stats__container">
            {pokemon?.stats.map((stat, i) => (
              <div key={stat.id} className="pokedexId__stats__element">
                <p>
                  {i == 0
                    ? stat.stat.name.toUpperCase()
                    : stat.stat.name
                        .replace(
                          stat.stat.name[0],
                          stat.stat.name[0].toUpperCase()
                        )
                        .replace("-", " ")}{" "}
                  <span>{stat.base_stat}/150</span>
                </p>
                <div className="pokedexId__element-barr">
                  <div
                    className="pokedexId__element__barr-color"
                    style={{
                      width: `${((stat.base_stat * 100) / 150).toFixed(2)}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>

      <section className="pokedexId__movements">
        <div className="pokedexId__movements__header">
          <h2>Movements</h2>
          <div className="pokedexId__movements__line"></div>
        </div>
        <div className="pokedexId__movements__container">
          {pokemon?.moves.map(({ move }) => (
            <p key={move.url}>{move.name}</p>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PokedexIdPage;
