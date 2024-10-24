import { useEffect, useRef, useState } from "react";
import { PokemonInfos } from "../interface/PokemonDetails";
import { fetchPokemonById } from "../lib/fetchAllPokemon";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";


function DetailsPage() {
	const [pokemon, setPokemon] = useState<PokemonInfos>();
	const {id} = useParams();
	const audioRef = useRef<HTMLAudioElement>(null);
	const [isPlaying, setIsPlaying] = useState(false);

	const fetchPomemonDetailed = async () => {
		const pokemonDetailed: PokemonInfos = await fetchPokemonById(`https://pokeapi.co/api/v2/pokemon/${id}`);
		setPokemon(pokemonDetailed);
	};

	useEffect(() => {
		fetchPomemonDetailed();
	}, []);

	const handlePlayPause = () => {
		if (isPlaying) {
		  audioRef.current!.pause();
		} else {
		  const playPromise = audioRef.current!.play();
		  if (playPromise !== undefined){
			playPromise.catch((e) => console.error("Playback error:", e));
		  }
		}
		setIsPlaying(!isPlaying);
	  };
		if (!pokemon)
			return (<div>Pokemon not found</div>);
  return (
    <div>
		<div>
			<h1>{pokemon.name}</h1>
      		<img src={pokemon.sprites.other["official-artwork"].front_default} alt={pokemon.name} />
      		<p>Typ: {pokemon.types[0].type.name}</p>
      		<p>Fähigkeiten: {pokemon.abilities.join(", ")}</p>
			<button onClick={handlePlayPause}>
          	{isPlaying ? "Pause" : "Play"}
        	</button>
        	<audio src={pokemon.cries.latest} ref={audioRef} />
			</div>
		<Link to="/">Back to Home</Link>
    </div>
  );
}

export default DetailsPage;