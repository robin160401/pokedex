import { NavLink } from "react-router-dom";
import logo from "../../public/pokeapi_logo.svg";

export default function Header() {
  return (
    <header>
      <img src={logo} alt="PokemonLogo" />
      <div>
        <button>Burger</button>
        <input type="text" name="search" placeholder="Search Pokemon" />
        <button>DarkMode</button>
      </div>
    </header>
  );
}
