import { useEffect, useRef, useState } from "react";
import { PokemonInfos } from "../interface/PokemonDetails";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPokemonById, fetchSpecies } from "../lib/fetchAllPokemon";
import { SpeciesDetailed } from "../interface/PokemonSpecies";
import trapTheme from "../assets/mp3/Voicy_Pikachu Trap Music.mp3";

function PokeDexPage() {
    const [pokemon, setPokemon] = useState<PokemonInfos>();
    const [species, setSpecies] = useState<SpeciesDetailed>();
    const { id } = useParams();
    const navigate = useNavigate();
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentId, setCurrentId] = useState(Number(id));

    const fetchPokemonDetailed = async (id: string | undefined) => {
        if (id) {
            const pokemonDetailed: PokemonInfos = await fetchPokemonById(`https://pokeapi.co/api/v2/pokemon/${id}`);
            setPokemon(pokemonDetailed);
        }
    };

    const fetchSpeciesText = async (id: string | undefined) => {
        if (id) {
            const speciesDetailed: SpeciesDetailed = await fetchSpecies(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
            setSpecies(speciesDetailed);
        }
    };

    useEffect(() => {
        fetchPokemonDetailed(id);
        setCurrentId(Number(id));
    }, [id]);

    useEffect(() => {
        fetchSpeciesText(currentId.toString());
    }, [currentId]);

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

    const handlePokemonPlus = () => {
        const nextId = currentId + 1;
        setCurrentId(nextId);
        navigate(`/pokedex/${nextId}`);
    };

    const handlePokemonMinus = () => {
        const nextId = currentId - 1;
        setCurrentId(nextId);
        navigate(`/pokedex/${nextId}`);
    };

    function scrollOneLineDown() {
        const textField = document.querySelector(".textfield");
        const lineHeight = 19;
        if (textField)
            textField.scrollBy({
                top: lineHeight,
                behavior: 'smooth'
            });
    }

    function scrollOneLineUp() {
        const textField = document.querySelector(".textfield");
        const lineHeight = 16;
        if (textField)
            textField.scrollBy({
                top: -lineHeight,
                behavior: 'smooth'
            });
    }

    if (!pokemon) return <div>Pokemon not found</div>;

    return (
        <div className="pokedexPage">
            <div className="flexbox">
                <div className="pokedex1">
                    <div className="pokedex-hat">
                        <div className="big-circle" onClick={handlePlayPause}>
                            <div className="lense"></div>
                        </div>
                        <div className="small-circle red"></div>
                        <div className="small-circle yellow"></div>
                        <div className="small-circle green"></div>
                    </div>
                    <div className="img-display-out">
                        <img className="img-pokedex" src={pokemon.sprites.other["official-artwork"].front_default} alt="" />
                        <div className="flexbox">
                            <audio ref={audioRef} src={trapTheme} />
                            <div className="redsmallcircle"></div>
                            <div className="burgers">
                                <div className="burger"></div>
                                <div className="burger"></div>
                                <div className="burger"></div>
                                <div className="burger"></div>
                            </div>
                        </div>
                    </div>
                    <div className="userbuttons flexbox">
                        <div className="flexbox">
                            <div className="balken one"></div>
                            <div className="balken two"></div>
                        </div>
                        <div className="blackcircle"></div>
                        <div className="greenbox">{pokemon.name}</div>
                        <div className="cross">
                            <div className="up"></div>
                            <div className="middle"></div>
                            <div className="down"></div>
                            <div className="left" onClick={handlePokemonMinus}></div>
                            <div className="right" onClick={handlePokemonPlus}></div>
                        </div>
                        <div className="details flexbox">
                            <div className="littleredball"></div>
                            <p>...</p>
                        </div>
                    </div>
                </div>
                <div className="pokedex2 flexbox">
                    <div className="textfield">
                        <p>{species?.flavor_text_entries[5].flavor_text}</p>
                        <br />
                        <p>------------------</p>
                        <br />
                        <p>It has the Following Attacks:</p>
                        <br />
                        {pokemon.abilities.map((el, index) => <p key={el.ability.name}>{`${index + 1} ${el.ability.name}`}</p>)}
                        <br />
                        <p>------------------</p>
                        <br />
                        <p>Base Stats</p>
                        <br />
                        <p>{`${pokemon.stats[0].base_stat} HP`}</p>
                        <p>{`${pokemon.stats[1].base_stat} ATTACK`}</p>
                        <p>{`${pokemon.stats[2].base_stat} DEFENSE`}</p>
                        <p>{`${pokemon.stats[5].base_stat} SPEED`}</p>
                        <br />
                    </div>
                    <div className="blue-buttons">
                        <div className="flexbox">
                            <div className="blue-button"></div>
                            <div className="blue-button"></div>
                            <div className="blue-button"></div>
                            <div className="blue-button"></div>
                            <div className="blue-button"></div>
                        </div>
                        <div className="flexbox">
                            <div className="blue-button"></div>
                            <div className="blue-button"></div>
                            <div className="blue-button"></div>
                            <div className="blue-button"></div>
                            <div className="blue-button"></div>
                        </div>
                    </div>
                    <div className="balken-grau">
                        <div className="balkengrau" onClick={scrollOneLineUp}></div>
                        <div className="balkengrau" onClick={scrollOneLineDown}></div>
                    </div>
                    <div className="redballs flexbox">
                        <div className="littleredball"></div>
                        <div className="littleredball"></div>
                    </div>
                    <div className="whiteboxes flexbox">
                        <div className="whitebox"></div>
                        <div className="whitebox"></div>
                        <div className="yellowball"></div>
                    </div>
                    <div className="greyboxes flexbox">
                        <div className="greybox">{pokemon.types[0].type.name}</div>
                        <div className="greybox">{pokemon.types[1]?.type.name || ""}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PokeDexPage;
