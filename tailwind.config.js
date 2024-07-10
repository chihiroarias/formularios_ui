/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    colors:{
      'azulQualis': '#56638a',
      'rojoQualis': '#cd2735',
      'verdeQualis': '#689b41',
      'beigeQualis': '#f7f6fb',
      'amarilloQualis': '#efa320',
      'grisTextos': '#aaaaaa',
    },
    fontFamily:{
      'monts':["Montserrat", "sans-serif"],
    },
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {},
  },
  plugins: [],
}

