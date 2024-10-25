import { useEffect, useRef, useState } from "react";
import { PokemonInfos } from "../interface/PokemonDetails";
import { useParams } from "react-router-dom";
import { fetchPokemonById, fetchSpecies } from "../lib/fetchAllPokemon";
import { SpeciesDetailed } from "../interface/PokemonSpecies";

function PokeDexPage() {
    const [pokemon, setPokemon] = useState<PokemonInfos>();
    const [species, setSpecies] = useState<SpeciesDetailed>();

    const { id } = useParams();
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
        fetchPokemonDetailed(nextId.toString());
    };

    const handlePokemonMinus = () => {
        const nextId = currentId - 1;
        setCurrentId(nextId);
        fetchPokemonDetailed(nextId.toString());
    };

    if (!pokemon) return <div>Pokemon not found</div>;

    return (
        <div className="flexbox">
            <div className="pokedex1">
                <div className="pokedex-hat">
                    <div className="big-circle">
                        <div className="lense"></div>
                    </div>
                    <div className="small-circle red"></div>
                    <div className="small-circle yellow"></div>
                    <div className="small-circle green"></div>
                </div>
                <div className="img-display-out">
                    <img className="img-pokedex" src={pokemon.sprites.other["official-artwork"].front_default} alt="" />
                    <div className="flexbox">
                        <div className="redsmallcircle" onClick={handlePlayPause}></div>
                        <audio src={pokemon.cries.latest} ref={audioRef} />
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
                    {species?.flavor_text_entries[5]?.flavor_text || "No flavor text available"}
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
                    <div className="balkengrau"></div>
                    <div className="balkengrau"></div>
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
                    <div className="greybox">{pokemon.name}</div>
                </div>
            </div>
        </div>
    );
}

export default PokeDexPage;

