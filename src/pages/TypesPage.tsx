import { useState } from "react";
import { colors } from "../data/colors";

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

interface ButtonProps {
  type: string;
  onClick: () => void;
}

const TypeButton: React.FC<ButtonProps> = ({ type, onClick }) => {
  const buttonColor = "colors";

  return (
    <button style={{ backgroundColor: buttonColor }} onClick={onClick}>
      {type}
    </button>
  );
};

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
          <TypeButton
            key={type}
            type={type}
            onClick={() => handleTypeSelect(type)}
          />
        ))}
        <button>Search</button> /* onClick fuer handleSearch fehlt noch */
      </div>
    </main>
  );
}
