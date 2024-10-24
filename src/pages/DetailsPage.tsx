import { useEffect, useState } from "react";
import { PokemonInfos } from "../interface/PokemonDetails";
import { fetchPokemonById } from "../lib/fetchAllPokemon";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function DetailsPage() {
	const [pokemon, setPokemon] = useState<PokemonInfos>();
	const {id} = useParams();

	const fetchPomemonDetailed = async () => {
		const pokemonDetailed: PokemonInfos = await fetchPokemonById(`https://pokeapi.co/api/v2/pokemon/${id}`);
		setPokemon(pokemonDetailed);
	};

	useEffect(() => {
		fetchPomemonDetailed();
	}, []);

	if (!pokemon)
		return (<div>Pokemon not found</div>);
  return (
    <div>
		<div>
			<h1>{pokemon.name}</h1>
      		<img src={pokemon.sprites.other["official-artwork"].front_default} alt={pokemon.name} />
      		<p>Typ: {pokemon.types[0].type.name}</p>
      		<p>Fähigkeiten: {pokemon.abilities.join(", ")}</p>
		</div>
		<Link to="/">Back to Home</Link>
    </div>
  );
}

export default DetailsPage;