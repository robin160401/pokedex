import { useEffect, useRef, useState } from "react";
import { PokemonInfos } from "../interface/PokemonDetails";
import { fetchPokemonById } from "../lib/fetchAllPokemon";
import { useParams } from "react-router-dom";
import playImg from "../../public/play_yellow_button_icon_227852.svg";
import { types } from "../data/types";
import { useThemeContext } from "../contexts/themeContext";

const formatId = (id: number) => {
  return `#${String(id).padStart(3, "0")}`;
};

function DetailsPage() {
  const [pokemon, setPokemon] = useState<PokemonInfos>();
  const { id } = useParams();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { theme } = useThemeContext();

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
    <div className="pokeDetail">
      <div
        className={`imgContainer ${
          theme === "dark" ? "theme theme--dark" : "theme theme--light"
        }`}
      >
        <img
          src={pokemon.sprites.other["official-artwork"].front_default}
          alt={pokemon.name}
        />
      </div>
      <div className="detailsText-container">
        <div className="detailsHeading">
          <h2>{formatId(pokemon.id)}</h2>
          <h1>{pokemon.name}</h1>
        </div>
        <div className="detailsText">
          <h2>Attacks and Movements</h2>
          <div className="typesDiv">
            <h3>Types </h3>
            <div className="typesImg">
              {pokemon.types.map((type, index) => (
                <img
                  key={index}
                  src={types[type.type.name as keyof typeof types]}
                  alt={type.type.name}
                />
              ))}
            </div>
          </div>

          <p>
            Fähigkeiten:{" "}
            {`${pokemon.abilities[0].ability.name}, ${pokemon.abilities[1].ability.name}`}
          </p>
          <p>
            Moves:{" "}
            {`${pokemon.moves[0].move.name}, ${pokemon.abilities[1].ability.name}`}
          </p>
        </div>
        <button className="playBtn" onClick={handlePlayPause}>
          <img src={playImg} alt="" />
        </button>
        <audio src={pokemon.cries.latest} ref={audioRef} />
      </div>
    </div>
  );
}

export default DetailsPage;
