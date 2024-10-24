import logo from "../../public/pokeapi_logo.svg";
import PopupTypes from "./PopupTypes";
import ThemeSwitcher from "./ThemeSwitcher";
import { useSearch } from "./SearchContextProvider";
import { useState } from "react";
import { colors } from "../data/colors";

export default function Header() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { searchFor, setSearchFor } = useSearch();

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <header>
      <img src={logo} alt="PokemonLogo" />
      <button onClick={openPopup}>Popup öffnen</button>
      <PopupTypes isOpen={isPopupOpen} onClose={closePopup} />
      <input
        type="text"
        onChange={(event) => {
          setSearchFor(event.target.value);
        }}
        name="search"
        placeholder="Search Pokemon"
      />
      <ThemeSwitcher />
    </header>
  );
}
