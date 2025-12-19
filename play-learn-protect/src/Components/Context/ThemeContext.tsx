import React, { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextValue {
  isDark: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState(() => {
    try {
      const saved = localStorage.getItem("plp_theme");
      if (saved) return JSON.parse(saved);
      // Check system preference
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    localStorage.setItem("plp_theme", JSON.stringify(isDark));
    if (isDark) {
      document.documentElement.classList.add("dark");
      try {
        document.body.classList.add("dark");
        document.documentElement.dataset.theme = "dark";
        document.body.dataset.theme = "dark";
      } catch (e) {
        // ignore
      }
    } else {
      document.documentElement.classList.remove("dark");
      try {
        document.body.classList.remove("dark");
        document.documentElement.dataset.theme = "light";
        document.body.dataset.theme = "light";
      } catch (e) {
        // ignore
      }
    }
  }, [isDark]);

  // Ensure classes are set on first mount synchronously after hydration
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      try {
        document.body.classList.add("dark");
        document.documentElement.dataset.theme = "dark";
        document.body.dataset.theme = "dark";
      } catch (e) {}
    } else {
      document.documentElement.classList.remove("dark");
      try {
        document.body.classList.remove("dark");
        document.documentElement.dataset.theme = "light";
        document.body.dataset.theme = "light";
      } catch (e) {}
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleDarkMode = () => {
    setIsDark((prev: boolean) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};
