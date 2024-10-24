import { useEffect, useState } from "react";
import { useThemeContext } from "../contexts/themeContext";
import { fetchAllPokemonList, fetchPokemonById } from "../lib/fetchAllPokemon";
import { PokemonInfos, Pokemon } from "../interface/PokemonDetails";

export default function RenderPokemon() {
  const { theme } = useThemeContext();

  const [pokemonList, setPokemonList] = useState<PokemonInfos[]>([]);

  const fetchPokemonNamesAndDetails = async () => {
    const pokemonList: Pokemon[] = await fetchAllPokemonList();
    const detailedPokemonList: PokemonInfos[] = await Promise.all(
      pokemonList.map(async (pokemon) => {
        const details = await fetchPokemonById(pokemon.url);
        return { ...pokemon, ...details };
      })
    );
    setPokemonList(detailedPokemonList);
    console.log(detailedPokemonList);
  };

  useEffect(() => {
    fetchPokemonNamesAndDetails();
  }, []);

  return (
    <div className="main-container">
      {pokemonList.map((pokemon, index) => (
        <div
          key={index}
          className={`pokeCard ${
            theme === "dark" ? "theme theme--dark" : "theme theme--light"
          }`}
        >
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
          />
          <div className="pokeCard-Detail">
            <p>ID: #{pokemon.id}</p>
            <p>{pokemon.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
