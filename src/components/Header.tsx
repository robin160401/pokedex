import logo from "../../public/pokeapi_logo.svg";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Header() {
  return (
    <header>
      <img src={logo} alt="PokemonLogo" />
      <div>
        <button>Burger</button>
        <input type="text" name="search" placeholder="Search Pokemon" />
        <ThemeSwitcher />
      </div>
    </header>
  );
}
