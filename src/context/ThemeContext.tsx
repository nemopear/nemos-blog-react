"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type ThemeMode = "light" | "dark";

interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
  mounted: boolean;
}

export const ThemeContext = createContext<ThemeContextType>({
  mode: "light",
  toggleTheme: () => {},
  mounted: false,
});

export const useThemeMode = () => useContext(ThemeContext);

const getInitialTheme = (): ThemeMode => {
  if (typeof window === "undefined") return "light";
  
  const stored = localStorage.getItem("theme-mode") as ThemeMode | null;
  if (stored === "light" || stored === "dark") {
    return stored;
  }
  
  const dataTheme = document.documentElement.getAttribute("data-theme");
  if (dataTheme === "dark") return "dark";
  
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  
  return "light";
};

export function ThemeContextProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setMode(getInitialTheme());
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const root = document.documentElement;
    
    if (mode === "dark") {
      root.classList.add("dark");
      root.setAttribute("data-theme", "dark");
    } else {
      root.classList.remove("dark");
      root.setAttribute("data-theme", "light");
    }
    
    localStorage.setItem("theme-mode", mode);
  }, [mode, mounted]);

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}
