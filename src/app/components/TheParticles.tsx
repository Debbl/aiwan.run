"use client";
import { useTheme } from "next-themes";
import Particles from "~/components/magicui/Particles";

export default function TheParticles() {
  const { theme } = useTheme();

  return (
    <Particles
      className="pointer-events-none fixed inset-0"
      quantity={80}
      ease={80}
      color={theme === "dark" ? "#fff" : "#000"}
      refresh
    />
  );
}
