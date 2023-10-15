import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
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
