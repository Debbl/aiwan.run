"use client";
import { useTheme } from "next-themes";
import { useHydrated } from "@debbl/ahooks";
import type { MouseEventHandler } from "react";
import { flushSync } from "react-dom";
import { Icon } from "~/icons";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const icon: "Sun" | "Moon" = theme === "dark" ? "Sun" : "Moon";

  const { isHydrated } = useHydrated();

  const toggleTheme: MouseEventHandler<HTMLButtonElement> = (e) => {
    const x = e.clientX;
    const y = e.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const isDark = theme === "dark";

    if (!document.startViewTransition) {
      setTheme(theme === "dark" ? "light" : "dark");
      return;
    }

    document
      .startViewTransition(() => {
        flushSync(() => setTheme(theme === "dark" ? "light" : "dark"));
      })
      .ready.then(() => {
        const clipPath = [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ];

        document.documentElement.animate(
          {
            clipPath,
          },
          {
            duration: 400,
            easing: "ease-out",
            iterations: 1,
            direction: isDark ? "reverse" : "normal",
            pseudoElement: isDark
              ? "::view-transition-old(root)"
              : "::view-transition-new(root)",
          },
        );
      });
  };

  return (
    <>
      <button onClick={toggleTheme}>
        <Icon
          className="h-5 w-5 cursor-pointer"
          icon={!isHydrated ? "Moon" : icon}
        />
      </button>
    </>
  );
};

export default ThemeSwitcher;
