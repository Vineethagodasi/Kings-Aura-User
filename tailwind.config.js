/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
       colors: {
    heading: "#1A1A1A",
    subheading: "#2A2A2A",

    primary: "#C6A75E",
    primaryDark: "#A67C2E",
  },

      fontFamily: {
      cinzel: ['Cinzel', 'serif'],
      inter: ['Inter', 'sans-serif'],
    },
    },
  },
  plugins: [],
};
