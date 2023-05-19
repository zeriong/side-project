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
    extend: {},
  },
  plugins: [],
}

