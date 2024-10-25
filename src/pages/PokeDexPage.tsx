import { useEffect, useRef, useState } from "react";
import { PokemonInfos } from "../interface/PokemonDetails";
import { useParams } from "react-router-dom";
import { Ability } from "../interface/PokemonDetails";
import { fetchPokemonById } from "../lib/fetchAllPokemon";

function PokeDexPage() {
    const [pokemon, setPokemon] = useState<PokemonInfos>();

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
    useEffect(() => {
        fetchPokemonDetailed(id);
    }, [id]);

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
                        <div className="right" onClick={handlePokemonPlus}>
                        </div>
                    </div>
                    <div className="details flexbox">
                        <div className="littleredball"></div>
                        <p>...</p>
                    </div>
                </div>
            </div>
            <div className="pokedex2 flexbox">
                <div className="textfield">
                    {pokemon.abilities.map((el: Ability) => (
                        <p className="poketext" 
							key={el.ability.name}>
                            {`${el.ability.name}`}
                        </p>
                    ))}
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
