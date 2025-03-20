"use client";
import { useTheme } from "next-themes";
import Snowfall from "react-snowfall";
import { Meteors } from "~/components/magicui/Meteors";

export default function BackgroundStage() {
  const { theme } = useTheme();

  return (
    <div className="pointer-events-none fixed inset-0 z-0 size-full overflow-hidden">
      {theme === "dark" ? <Snowfall /> : <Meteors number={30} />}
    </div>
  );
}
