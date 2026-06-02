import { createContext, useContext, useState, type ReactNode } from "react";
import type { Lang } from "./translations";

interface LangContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

const LangContext = createContext<LangContextType>({
  lang: "ru",
  setLang: () => {},
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    // Определяем язык из localStorage или браузера
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved === "ru" || saved === "en") return saved;
    const browserLang = navigator.language.toLowerCase();
    return browserLang.startsWith("ru") ? "ru" : "en";
  });

  const handleSetLang = (newLang: Lang) => {
    setLang(newLang);
    localStorage.setItem("lang", newLang);
  };

  return (
    <LangContext.Provider value={{ lang, setLang: handleSetLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
