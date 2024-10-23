import { NavLink } from "react-router-dom";
import logo from "../../public/pokeapi_logo.png";

export default function Header() {
  return (
    <header>
      <img src={logo} alt="PokemonLogo" />
      <nav>links</nav>
      {/* navlinks für "Types" und was noch? */}
      <input type="text" name="search" placeholder="Search Pokemon" />
      <button>DarkMode</button>
      {/* //? https://www.npmjs.com/package/react-toggle-dark-mode //? wir könnten
      dieses package installieren!? */}
    </header>
  );
}
