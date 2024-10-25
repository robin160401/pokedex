import { useEffect, useRef, useState } from "react";
import { PokemonInfos } from "../interface/PokemonDetails";
import { fetchPokemonById } from "../lib/fetchAllPokemon";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import backArrow from "/public/back.svg";

const formatId = (id: number) => {
  return `#${String(id).padStart(3, "0")}`;
};

function DetailsPage() {
  const [pokemon, setPokemon] = useState<PokemonInfos>();
  const { id } = useParams();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const fetchPomemonDetailed = async () => {
    const pokemonDetailed: PokemonInfos = await fetchPokemonById(
      `https://pokeapi.co/api/v2/pokemon/${id}`
    );
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
      if (playPromise !== undefined) {
        playPromise.catch((e) => console.error("Playback error:", e));
      }
    }
    setIsPlaying(!isPlaying);
  };
  if (!pokemon) return <div>Pokemon not found</div>;
  return (
    <div className="details-container">
      <Link to="/">
        <img src={backArrow} alt="back home" />
      </Link>
      <div className="pokeDetail">
        <div className="imgContainer">
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
          />
        </div>
        <div className="detailsHeading">
          <h2>{formatId(pokemon.id)}</h2>
          <h1>{pokemon.name}</h1>
        </div>
        <h3>Typ: {pokemon.types[0].type.name}</h3>

        <p>
          Fähigkeiten:{" "}
          {`${pokemon.abilities[0].ability.name}, ${pokemon.abilities[1].ability.name}`}
        </p>
        <p>
          Moves:{" "}
          {`${pokemon.moves[0].move.name}, ${pokemon.abilities[1].ability.name}`}
        </p>

        <button onClick={handlePlayPause}>
          {isPlaying ? "Pause" : "Play"}
        </button>
        <audio src={pokemon.cries.latest} ref={audioRef} />
      </div>
    </div>
  );
}

export default DetailsPage;
