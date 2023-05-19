/** @type {import('tailwindcss').Config} */

const createPxEntries = (size) => {
  return {...Array.from(Array(size + 1)).reduce((accumulator, _, i) => {
      return {...accumulator, [`${i}px`]: `${i}px` }
    })
  };
}
const createRemEntries = (size) => {
  return {...Array.from(Array(size + 1)).reduce((accumulator, _, i) => {
      return {...accumulator, [i]: `${i * 0.0625}rem` }
    })
  };
}

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        "mobile-md" : "450px",
      },
      fontSize: {...createPxEntries(50), ...createRemEntries(50)},
      spacing: {...createPxEntries(100), ...createRemEntries(100)},
      colors:{
        "primary-dark-400": "#111111",
        "primary-dark-300": "#1C1C1C",
        "primary-dark-200": "#222222",
        "primary-dark-100": "#292929",

        "primary-gray-500": "#444444",
        "primary-gray-400": "#666666",
        "primary-gray-300": "#999999",
        "primary-gray-200": "#CCCCCC",
        "primary-gray-100": "#F1F1F1",

        "primary-300": "#EB5500",
        "primary-200": "#FF7A00",
        "primary-100": "#FFE0B0",

        "primary-err": "#F56588",
        "primary-suc": "#51B0C6",
      },
    },
  },
  plugins: [],
}

