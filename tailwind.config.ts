import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "selector",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
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
  plugins: [],
};
export default config;
