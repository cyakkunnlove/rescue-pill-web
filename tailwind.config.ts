import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#E8A0BF",
          light: "#F2C6D8",
          dark: "#D485A6",
        },
        secondary: {
          DEFAULT: "#BA90C6",
          light: "#D4B8DE",
          dark: "#9A70A8",
        },
        accent: {
          DEFAULT: "#C0DBEA",
          light: "#E1EEF5",
          dark: "#9BC5DC",
        },
        background: {
          DEFAULT: "#FFF8F8",
          card: "#FFFFFF",
          muted: "#FFF0F4",
        },
        text: {
          primary: "#4A3B52",
          secondary: "#7D6B8A",
          muted: "#A99AB5",
        },
        danger: "#E57373",
        warning: "#FFB74D",
        success: "#81C784",
      },
      fontFamily: {
        sans: [
          '"Zen Maru Gothic"',
          '"M PLUS Rounded 1c"',
          '"Rounded Mplus 1c"',
          "sans-serif",
        ],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        soft: "0 4px 20px rgba(232, 160, 191, 0.15)",
        card: "0 2px 12px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};
export default config;
