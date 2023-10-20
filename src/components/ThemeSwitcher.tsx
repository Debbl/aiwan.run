"use client";
import { useTheme } from "next-themes";
import { useHydrated } from "@debbl/ahooks";
import type { MouseEventHandler } from "react";
import { flushSync } from "react-dom";
import { CarbonMoon, CarbonSun, Icon } from "~/icons";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const icon = theme === "dark" ? CarbonSun : CarbonMoon;

  const { isHydrated } = useHydrated();

  if (!isHydrated) {
    return <div className="h-6 w-6" />;
  }

  const toggleTheme: MouseEventHandler<HTMLButtonElement> = (e) => {
    const x = e.clientX;
    const y = e.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const isDark = theme === "dark";

    if (!document.startViewTransition) {
      setTheme(theme === "dark" ? "light" : "dark");
      return;
    }

    const transition = document.startViewTransition(() => {
      flushSync(() => setTheme(theme === "dark" ? "light" : "dark"));
    });

    transition.ready
      .then(() => {
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
            easing: "ease-in",
            iterations: 1,
            direction: isDark ? "reverse" : "normal",
            pseudoElement: isDark
              ? "::view-transition-old(root)"
              : "::view-transition-new(root)",
          }
        );
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.log(e);
      });
  };

  return (
    <>
      {!isHydrated ? (
        <div className="h-6 w-6" />
      ) : (
        <button onClick={toggleTheme}>
          <Icon className="h-6 w-6 cursor-pointer" icon={icon} />
        </button>
      )}
    </>
  );
};

export default ThemeSwitcher;
