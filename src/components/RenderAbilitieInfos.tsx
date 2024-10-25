import { useEffect, useState } from "react";
import { PokemonAbilities } from "../interface/PokemonAbilities";
import { fetchAbilities } from "../lib/fetchAllPokemon";


export function RenderAbilities(props: PokemonAbilities){
	const [abilitie, setAbilitie] = useState<PokemonAbilities>();
	const fetchAbiltiesDetailed = async (abilitie: string | undefined) => {
        if (abilitie) {
            const abilitieDetailed: PokemonAbilities = await fetchAbilities(`https://pokeapi.co/api/v2/${abilitie}`);
            setAbilitie(abilitieDetailed);
        }
    };
	useEffect(() => {
        fetchAbiltiesDetailed(abilitie);
    }, [])
}