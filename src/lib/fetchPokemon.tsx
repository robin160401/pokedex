

export default async function fetchAllPokemonList(){
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0");
    const json = (await response.json());
    return json;
}