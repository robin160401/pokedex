

const pokemonData = [
  {
    name: 'Pikachu',
    type: 'Electric',
    abilities: ['Static', 'Lightning Rod'],
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png'
  },
  {
    name: 'Charmander',
    type: 'Fire',
    abilities: ['Blaze', 'Solar Power'],
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png'
  },
];

function PokemonDetails({ pokemon }) {
  return (
    <div>
      <h1>{pokemon.name}</h1>
      <img src={pokemon.sprite} alt={pokemon.name} />
      <p>Typ: {pokemon.type}</p>
      <p>Fähigkeiten: {pokemon.abilities.join(", ")}</p>
    </div>
  );
}

function PokemonList() {
  return (
    <div>
        {pokemonData.map(pokemon => (
          <p>
            <PokemonDetails pokemon={pokemon} />
          </p>
        ))}
    </div>
  );
}

export default PokemonList;