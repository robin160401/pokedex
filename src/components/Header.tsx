import logo from "../../public/pokeapi_logo.svg";
import PopupTypes from "./PopupTypes";
import ThemeSwitcher from "./ThemeSwitcher";
import { useSearch } from "./SearchContextProvider";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { setSearchFor, searchFor } = useSearch();
  const { setSearchType } = useSearch();

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <header>
		<Link to="/">
      	<img className="logo" src={logo} alt="PokemonLogo" onClick={() => {
			setSearchType("");
		}}/>
	  </Link>
      <nav>
        <button className="burgerBtn" onClick={openPopup}>
          <img src="/public/Vector.svg" alt="burgermenu" />
        </button>
        <PopupTypes isOpen={isPopupOpen} onClose={closePopup} />
        <input
          type="text"
          onChange={(event) => {
            setSearchFor(event.target.value);
			setSearchType("");
          }}
          name="search"
          placeholder="Search Pokemon"
          value={searchFor}
        />
        <ThemeSwitcher />
      </nav>
    </header>
  );
}
