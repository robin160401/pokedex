import { createContext, useContext, useState } from "react";

interface ThemeContext {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContext>(null!);

interface ThemeContextProviderProps {
  children: React.ReactNode;
}

export function ThemeContextProvider({ children }: ThemeContextProviderProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useThemeContext = () => useContext(ThemeContext);
