import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./mdx-components.tsx",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#eab308",
      },
      keyframes: {
        "shine-pulse": {
          "0%": {
            "background-position": "0% 0%",
          },
          "50%": {
            "background-position": "100% 100%",
          },
          "to": {
            "background-position": "0% 0%",
          },
        },
      },
      gridTemplateColumns: ({ theme }) => {
        const spacing = theme("spacing") as Record<string, string>;

        return Object.keys(spacing).reduce((accumulator, spacingKey) => {
          return {
            ...accumulator,
            [`fill-${spacingKey}`]: `repeat(auto-fill, minmax(${spacing[spacingKey]}, 1fr))`,
            [`fit-${spacingKey}`]: `repeat(auto-fit, minmax(${spacing[spacingKey]}, 1fr))`,
          };
        }, {});
      },
    },
  },
  plugins: [nextui()],
};
export default config;
