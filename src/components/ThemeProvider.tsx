"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";

export default function ThemeProvider(props: ThemeProviderProps) {
  return <NextThemesProvider {...props} />;
}
