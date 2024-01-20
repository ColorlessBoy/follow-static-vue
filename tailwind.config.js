/** @type {import('tailwindcss').Config} */
import typography from "@tailwindcss/typography";
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      vuefg: {
        light: "#0e0e0e",
        default: "#0e0e0e",
        dark: "#adbac7",
      },
      vuebg: {
        light: "#e2e8f0",
        default: "#e2e8f0",
        dark: "#22272e",
      },
      dark: {
        bg: "#22272e",
        fg: "#adbac7",
      },
    },
  },
  plugins: [typography],
};
