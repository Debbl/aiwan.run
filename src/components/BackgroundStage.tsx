"use client";
import { useTheme } from "next-themes";
import Particles from "./magicui/Particles";

export default function BackgroundStage() {
  const { theme } = useTheme();

  return (
    <Particles
      className="absolute inset-0 z-[-1]"
      quantity={100}
      ease={80}
      color={theme === "dark" ? "#ffffff" : "#000000"}
      refresh
    />
  );
}
