/** @type {import('tailwindcss').Config} */
module.exports = {
  // corePlugins: {
  //   preflight: false,
  //   container: false,
  // },
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      boxShadow: {
        '1x': '0px 1px 3px 0px rgba(0,0,0,0.08), 0px 0px 0px 2px #f2f2f4',
      },
      colors: {
        'primary': '#4a40e7',
        'white': '#fff',
        'white1': '#f1f1f5',
        'blue': '#4a40e7',
        'red': '#ef5350',
        'red1': '#ef3e3e',
        'green': '#42cd74',
        'grey': '#717176',
      }
    },
    fontFamily: {
      'base': ["Inter", "Arial", "sans-serif"]
    },
    fontWeight: {
      'hairline': 100,
      'extra-light': 200,
      'thin': 300,
      'light': 400,
      'normal': 500,
      'medium': 600,
      'bold': 700,
      'extrabold': 800,
      'black': 900
    },
    screens: {
      'xs': '376px',
      'sm': '576px',
      'md': '768px',
      'lg': '992px',
      'xl': '1200px',
      '2xl': '1600px',
    },
  },
  plugins: [],
}

