import logo from "../../public/pokeapi_logo.svg";
import PopupTypes from "./PopupTypes";
import ThemeSwitcher from "./ThemeSwitcher";
import { useSearch } from "./SearchContextProvider";
import { useState } from "react";

export default function Header() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { searchFor, setSearchFor } = useSearch();
  const { searchType, setSearchType } = useSearch();

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <header>

      <img className="logo" src={logo} alt="PokemonLogo" />
      <nav>
        <button className="burgerBtn" onClick={openPopup}>
          <img src="/public/Vector.svg" alt="burgermenu" />
        </button>
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
      </nav>

    </header>
  );
}
