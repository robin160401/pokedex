import { NavLink } from "react-router-dom";
import logo from "../../public/pokeapi_logo.svg";
import { useSearch } from "./SearchContextProvider";

export default function Header() {
	const {searchFor, setSearchFor} = useSearch();
  return (
    <header>
      <img src={logo} alt="PokemonLogo" />
      <div>
        <button>Burger</button>
        <input type="text" onChange={(event) => {setSearchFor(event.target.value)}} name="search" placeholder="Search Pokemon" />
        <button>DarkMode</button>
      </div>
    </header>
  );
}
