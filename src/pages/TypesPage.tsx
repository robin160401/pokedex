import { useState } from "react";

const allTypes = [
  "Bug",
  "Dragon",
  "Fairy",
  "Fire",
  "Ghost",
  "Ground",
  "Normal",
  "Poison",
  "Rock",
  "Water",
  "Dark",
  "Electric",
  "Fighting",
  "Flying",
  "Grass",
  "Ice",
  "Plant",
  "Psychic",
  "Steel",
];

export default function TypesPage() {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const handleTypeSelect = (type: string) => {
    setSelectedTypes((prevTypes) => {
      if (prevTypes.includes(type)) {
        return prevTypes.filter((t) => t !== type);
      } else {
        return [...prevTypes, type];
      }
    });
  };

  const PokemonFilter = () => {};
  return (
    <main>
      <h2>Type</h2>
      <div>
        {allTypes.map((type) => (
          <button
            key={type}
            onClick={() => handleTypeSelect(type)}
            //   style={{ backgroundColor: /* Farbe für den Typ */ }}
          >
            {type}
          </button>
        ))}
        <button>Search</button> /* onClick fuer handleSearch fehlt noch */
      </div>
    </main>
  );
}
