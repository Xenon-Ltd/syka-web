/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-lato)"],
        lato: ["Lato", "var(--font-lato)"],
        dmSans: ["DM Sans", "var(--font-dmSans)"],
      },
      fontSize: {
        "4.5xl": "2.5rem",
      },
      colors: {
        xenon: {
          DEFAULT: "#008EDB",
          primary: "#25205C",
          gray: "#3D4756",
          50: "#EBF8FF",
          100: "#D6F1FF",
          200: "#ADE2FF",
          300: "#75CFFF",
          400: "#29B4FF",
          500: "#008EDB",
          600: "#0081C7",
          700: "#0071AD",
          800: "#005D8F",
          900: "#004266",
          950: "#002B42",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
