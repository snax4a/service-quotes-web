/* eslint-disable global-require */
module.exports = {
  mode: "jit",
  purge: {
    content: ["./src/**/*.tsx", "./public/index.html"],
    options: {
      safelist: ["h-8", "h-11"],
    },
  },
  darkMode: "class",
  theme: {
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
      inter: ["Inter", "sans-serif"],
      body: ["Open Sans"],
    },
    fontSize: {
      tiny: "0.625rem",
      xs: ".75rem",
      sm2: "0.813rem",
      sm: ".875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.6rem",
      "3xl": "1.875rem",
      "4xl": "2rem",
      "5xl": "2.5rem",
      "6xl": "4rem",
      "7xl": "5rem",
    },
    colors: {
      transparent: "transparent",
      primary: {
        100: "var(--color-primary-100)",
        200: "var(--color-primary-200)",
        300: "var(--color-primary-300)",
        500: "var(--color-primary-500)",
        600: "var(--color-primary-600)",
        700: "var(--color-primary-700)",
        800: "var(--color-primary-800)",
        900: "var(--color-primary-900)",
      },
      orange: {
        DEFAULT: "var(--color-orange-500)",
        100: "var(--color-orange-100)",
        500: "var(--color-orange-500)",
      },
      blue: {
        DEFAULT: "var(--color-blue-300)",
        100: "var(--color-blue-100)",
        200: "var(--color-blue-200)",
        300: "var(--color-blue-300)",
      },
      red: {
        DEFAULT: "var(--color-red)",
        hover: "var(--color-red-hover)",
        disabled: "var(--color-red-disabled)",
      },
      black: "#000",
      white: "#fff",
    },
    spacing: {
      0: "0px",
      1: "5px",
      1.5: "6px",
      2: "10px",
      3: "15px",
      4: "20px",
      4.5: "25px",
      5: "30px",
      5.5: "35px",
      6: "40px",
      6.5: "50px",
      6.7: "56px",
      7: "60px",
      7.5: "65px",
      8: "75px",
      9: "80px",
      10: "90px",
      11: "100px",
      15: "150px",
      "5l": "10rem",
      "n1/2": "-50%",
      24: "24rem",
      400: "400px",
      600: "600px",
    },
    stroke: {
      current: "currentColor",
    },
    extend: {
      borderWidth: {
        1: "1px",
      },
      borderRadius: {
        5: "5px",
        8: "8px",
        20: "20px",
        30: "30px",
        40: "40px",
      },
      boxShadow: {
        outlineLg: "0px 0px 30px var(--color-shadow-100)",
        outlineMd: "0 0 0 2pt var(--color-primary-800)",
        outlineSm: "0 0 0 1pt var(--color-primary-800)",
      },
    },
  },
  variants: {
    backgroundColor: ({ after }) => after(["disabled"]),
    textColor: ({ after }) => after(["disabled"]),
    scrollbar: ["rounded", "dark"],
    extend: {
      borderWidth: ["last"],
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
