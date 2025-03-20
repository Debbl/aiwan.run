"use client";
import Snowfall from "react-snowfall";
import { Meteors } from "~/components/magicui/Meteors";
import { useTheme } from "~/hooks/useTheme";

export default function BackgroundStage() {
  const { theme } = useTheme();

  return (
    <div className="pointer-events-none fixed inset-0 z-0 size-full overflow-hidden">
      {theme === "dark" ? <Snowfall /> : <Meteors number={30} />}
    </div>
  );
}
