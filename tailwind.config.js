/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: "Poppins",
        bodyContent: "Nunito",
      },

      colors: {
        background: "#fff",
        primary: "#000",
        secondary: "#9566C8",
      },
    },
  },
  plugins: [require('daisyui')],
};
