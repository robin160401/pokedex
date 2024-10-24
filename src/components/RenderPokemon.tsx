import { useEffect, useState } from "react";
import { useThemeContext } from "../contexts/themeContext";
import { fetchAllPokemonList, fetchPokemonById } from "../lib/fetchAllPokemon";
import { PokemonInfos, Pokemon } from "../interface/PokemonDetails";
import { useSearch } from "./SearchContextProvider";
import { Link } from "react-router-dom";

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

  	const {searchFor} = useSearch();
	
  const filteredPokemonList = pokemonList.filter(pokemon =>
	pokemon.name.includes(searchFor.toLowerCase())
  );

  return (
    <div className="main-container">
     {filteredPokemonList.map((pokemon, index) => (
        <div
          key={index}
          className={`pokeCard ${
            theme === "dark" ? "theme theme--dark" : "theme theme--light"
          }`}
        >
		<Link to={`./pokemon/${pokemon.id}`}>
			<img
            	src={pokemon.sprites.other["official-artwork"].front_default}
            	alt={pokemon.name}
          	/>
		</Link>
          <div className="pokeCard-Detail">
            <p>ID: #{pokemon.id}</p>
            <p>{pokemon.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
