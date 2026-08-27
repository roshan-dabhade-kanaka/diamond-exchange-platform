import { createContext, useContext, useEffect, type ReactNode } from "react";

export type ThemeId = "emerald";

export type ThemeMeta = {
  id: ThemeId;
  name: string;
  house: string;
  note: string;
  swatch: [string, string, string];
};

export const themes: ThemeMeta[] = [
  {
    id: "emerald",
    name: "Maison Vert",
    house: "In the spirit of Graff",
    note: "Emerald salon, champagne gilt, deep contrast",
    swatch: ["#123328", "#f4f1e8", "#d9b871"],
  },
];

type Ctx = { theme: ThemeId; setTheme: (t: ThemeId) => void };
const ThemeContext = createContext<Ctx>({ theme: "emerald", setTheme: () => {} });

export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "emerald");
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: "emerald", setTheme: () => {} }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
