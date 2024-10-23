import { useEffect, useState } from "react";
import fetchAllPokemonList from "../lib/fetchPokemon";

interface Pokemon {
    name: string;
    url: string;
}

export default function RenderPokemon() {
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

    const fetchPokemon = async () => {
        const result: Pokemon[] = await fetchAllPokemonList();
        setPokemonList(result);
    };

    useEffect(() => {
        fetchPokemon();
    }, []);

    console.log(pokemonList);
    return (
        <div>
            
        </div>
    );
}

  