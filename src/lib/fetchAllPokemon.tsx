type Abilitie = {
    name: string;
}

interface Pokemon {
    name: string;
    url: string;
}

interface PokemonResponse {
    results: Pokemon[];
}

type Sprite = {
    front_default: string;
}

type TypePok = {
    name: string;
    url: string;
}

type Types = {
    slot: number;
    type: TypePok;
}

type Stats = {
    base_stat: number;
}


export interface PokemonInfos extends Pokemon{
    order: number;
    abilities: Abilitie[];
    types: Types[];
    sprites: Sprite;
    weight: number;
    height: number;
    stats: Stats[];
}

export async function fetchAllPokemonList(){
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0");
    const json = (await response.json()) as PokemonResponse;
    const pokemons: Pokemon[] = json.results;
    return pokemons;
}

export async function fetchPokemonById(url: string){
    const response = await fetch(url)
    const json = (await response.json() as PokemonInfos);
    const pokemon: PokemonInfos = json;
    return pokemon;
}
