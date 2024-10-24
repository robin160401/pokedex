import { PokemonInfos, Pokemon } from "../interface/PokemonDetails";

export async function fetchAllPokemonList(){
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0");
    const json = (await response.json());
    const pokemons: Pokemon[] = json.results;
    return pokemons;
}

export async function fetchPokemonByI(url: string){
    const response = await fetch(url)
    const json = (await response.json() as PokemonInfos);
    const pokemon: PokemonInfos = json;
    return pokemon;
}
