"use client";
import { MoonIcon, SunIcon } from "icons";
import { useTheme } from "next-themes";
import { flushSync } from "react-dom";
import type { MouseEventHandler } from "react";

const ThemeIcon = ({
  icon,
  className,
}: {
  icon: "Moon" | "Sun";
  className?: string;
}) => {
  if (icon === "Moon") {
    return <MoonIcon className={className} />;
  }

  return <SunIcon className={className} />;
};

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const icon: "Sun" | "Moon" = theme === "dark" ? "Sun" : "Moon";

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
      <button type="button" onClick={toggleTheme}>
        <ThemeIcon icon={icon} className="size-5 cursor-pointer" />
        <span className="sr-only">theme-switcher</span>
      </button>
    </>
  );
}
