import { useHydrated } from "@debbl/ahooks";
import { useTheme as useNextTheme } from "next-themes";
import { useEffect, useState } from "react";

export function useTheme() {
  const { theme: nextTheme, setTheme: setNextTheme } = useNextTheme();

  const { isHydrated } = useHydrated();
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    setTheme(nextTheme ?? "light");
  }, [nextTheme]);

  return { isHydrated, theme, setTheme: setNextTheme };
}
