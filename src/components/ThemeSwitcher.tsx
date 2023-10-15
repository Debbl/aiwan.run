"use client";
import { useTheme } from "next-themes";
import { useHydrated } from "@debbl/ahooks";
import { CarbonMoon, CarbonSun, Icon } from "~/icons";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const icon = theme === "dark" ? CarbonSun : CarbonMoon;

  const { isHydrated } = useHydrated();

  if (!isHydrated) {
    return <div className="h-6 w-6" />;
  }

  return (
    <Icon
      className="h-6 w-6 cursor-pointer"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      icon={icon}
    />
  );
};

export default ThemeSwitcher;
