import { PokemonAbilities } from "../interface/PokemonAbilities";
import { PokemonInfos, Pokemon } from "../interface/PokemonDetails";
import { SpeciesDetailed } from "../interface/PokemonSpecies";

export async function fetchAllPokemonList(){
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0");
    const json = (await response.json());
    const pokemons: Pokemon[] = json.results;
    return pokemons;
}

export async function fetchPokemonById(url: string){
    const response = await fetch(url)
    const json = (await response.json() as PokemonInfos);
    const pokemon: PokemonInfos = json;
    return pokemon;
}

export async function fetchAbilities(url: string){
    const response = await fetch(url)
    const json = (await response.json() as PokemonAbilities);
    const pokemon: PokemonAbilities = json;
    return pokemon;
}

export async function fetchSpecies(url: string){
    const response = await fetch(url)
    const json = (await response.json() as SpeciesDetailed);
    const pokemon: SpeciesDetailed = json;
    return pokemon;
}
