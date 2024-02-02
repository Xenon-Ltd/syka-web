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
        "5.5xl": "3.5rem",
      },
      boxShadow: {
        xenon_sh: "2px 17px 38.8px 0px rgba(33, 33, 33, 0.23)",
        xenon_btn: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px",
        xenon_card:
          "0px 9.040969848632812px 54.245819091796875px 0px #9AA9B31F",
        xenon_light: "0px 4px 30px 0px #BAC1C60F",
      },
      colors: {
        xenon: {
          DEFAULT: "#008EDB",
          sky: "#29AAE1",
          brand: "#1377BC",
          primary: "#25205C",
          gray: "#3D4756",
          text: "#3D4756",
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
