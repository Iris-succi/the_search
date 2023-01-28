/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        wave: "url('/src/assets/bg_wave.jpeg')",
      },
    },
  },
  plugins: [],
};
