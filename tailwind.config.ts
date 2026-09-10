import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          DEFAULT: "#7A1F2B", // primary — matches Hero banner fabric
          dark: "#5C1620",    // hover states, dark sections
          light: "#9A3040",   // subtle borders, tints
        },
        gold: {
          DEFAULT: "#C9962C", // accents, dividers, highlights
          light: "#E0B85C",   // hover on gold elements
          dark: "#A87A1F",    // text-on-ivory gold (better contrast)
        },
        ivory: "#FBF6EE",     // replaces stark white background
        charcoal: "#241C1A",  // replaces pure black text
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"], // headings
        body: ["var(--font-body)", "sans-serif"],        // paragraphs
      },
      borderRadius: {
        card: "0.875rem",
      },
    },
  },
  plugins: [],
};

export default config;