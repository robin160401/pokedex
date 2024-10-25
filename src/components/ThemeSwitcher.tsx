import { useThemeContext } from "../contexts/themeContext";

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <button className="themeBtn" onClick={toggleTheme}>
      <img
        src={theme === "light" ? "/night.png" : "/brightness.png"}
        alt="Theme icon"
        width={24}
        height={24}
      />
    </button>
  );
}
