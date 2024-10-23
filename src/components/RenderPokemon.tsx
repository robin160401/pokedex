import { useEffect, useState } from "react";
import { fetchAllPokemonList, fetchPokemonById } from "../lib/fetchAllPokemon";

interface Pokemon {
    name: string;
    url: string;
}


export default function RenderPokemon() {
    const [pokemonList, setPokemonList] = useState([]);

    const fetchPokemonNamesAndDetails = async () => {
        const pokemonList: Pokemon[] = await fetchAllPokemonList();
        const detailedPokemonList = await Promise.all(
            pokemonList.map(async (pokemon) => {
                const details = await fetchPokemonById(pokemon.url);
                return { ...pokemon, ...details };
            })
        );
        setPokemonList(detailedPokemonList);
    };
ç
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
                        <p>ID: {pokemon.id}</p>
                        <p>Height: {pokemon.height}</p>
                        <p>Weight: {pokemon.weight}</p>
                    </div>
                ))}
            </ul>
        </div>
    );
}


  