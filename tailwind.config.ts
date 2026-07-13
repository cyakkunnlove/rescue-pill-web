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
          DEFAULT: "#9B355D",
          light: "#F2C6D8",
          dark: "#762442",
        },
        secondary: {
          DEFAULT: "#664270",
          light: "#D4B8DE",
          dark: "#4E2F58",
        },
        accent: {
          DEFAULT: "#C0DBEA",
          light: "#E1EEF5",
          dark: "#376F8C",
        },
        background: {
          DEFAULT: "#FFF8F8",
          card: "#FFFFFF",
          muted: "#FFF0F4",
        },
        text: {
          primary: "#4A3B52",
          secondary: "#5C4E65",
          muted: "#62546D",
        },
        danger: "#B4232F",
        warning: "#8A4B00",
        success: "#2E7043",
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
        soft: "0 4px 20px rgba(155, 53, 93, 0.15)",
        card: "0 2px 12px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};
export default config;
