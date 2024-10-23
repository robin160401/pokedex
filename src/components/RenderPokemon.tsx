import { useEffect, useState } from "react";
import { fetchAllPokemonList, fetchPokemonById, PokemonInfos } from "../lib/fetchAllPokemon";

interface Pokemon {
    name: string;
    url: string;
}


export default function RenderPokemon() {
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
        <div>
            <h1>Pokémon List</h1>
            <ul>
                {pokemonList.map((pokemon, index) => (
                    <div key={index}>
                        <h2>{pokemon.name}</h2>
                        <p>ID: {pokemon.order}</p>
                        <p>Height: {pokemon.height}</p>
                        <p>Weight: {pokemon.weight}</p>
                    </div>
                ))}
            </ul>
        </div>
    );
}


  