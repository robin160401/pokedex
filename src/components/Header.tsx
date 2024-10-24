import { NavLink } from "react-router-dom";
import logo from "../../public/pokeapi_logo.svg";
import { useState } from "react";
import { colors } from "../data/colors";


export default function Header() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <header>
      <img src={logo} alt="PokemonLogo" />
      <button onClick={togglePopup}>Types</button>
      {isPopupOpen && (
        <div className="popup">
          <h2>Alle Typen</h2>
          <ul>
            {Object.keys(colors).map((color) => (
              <li key={color}>
              <img src={colors[color]} alt={color} />
              </li>
            ))}
          </ul>
        </div>
      )}
      <input type="text" name="search" placeholder="Search Pokemon" />
      <button>DarkMode</button>
      {/* //? https://www.npmjs.com/package/react-toggle-dark-mode //? wir könnten
      dieses package installieren!? */}

    </header>
  );
}