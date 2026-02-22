import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface ThemeContextType {
  toggleTheme: () => void;
  mode: "light" | "dark";
}

export const ThemeContext = createContext<ThemeContextType>({
  toggleTheme: () => {},
  mode: "light",
});

export const useThemeMode = () => useContext(ThemeContext);

export const ThemeContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedMode = localStorage.getItem("theme-mode") as "light" | "dark";
    const initialMode = savedMode || 
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setMode(initialMode);
    document.documentElement.setAttribute("data-theme", initialMode);
  }, []);

  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("theme-mode", newMode);
    document.documentElement.setAttribute("data-theme", newMode);
  };

  const value = mounted 
    ? { toggleTheme, mode } 
    : { toggleTheme, mode: "light" as const };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
