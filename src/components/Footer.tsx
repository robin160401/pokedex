import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <Link to="/pokedex/1">Pokedex</Link>
      <div className="github-link">
        <p>GitHub:</p>
        <a href="https://github.com/SteveDwumah">Steve</a>
        <a href="https://github.com/robin160401">Robin</a>
        <a href="https://github.com/Nana7782">Nana</a>
      </div>
    </footer>
  );
}
