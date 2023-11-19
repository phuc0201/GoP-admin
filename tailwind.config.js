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
        '2x': '0px 13px 27px -5px rgba(50, 50, 93, 0.25), 0px 8px 16px -8px rgba(0, 0, 0, 0.3)',
        '3x': 'rgba(0, 0, 0, 0.15) 0px 5px 15px 0px',
        '4x': 'rgba(0, 0, 0, 0.45) 0px 6px 8px -10px',
        '5x': 'rgba(0, 0, 0, 0.56) 0px 22px 70px 4px'
      },
      colors: {
        'primary': '#5850e6',
        'white': '#fff',
        'white1': '#f1f1f5',
        'blue': '#4a40e7',
        'blue1': '#e9eeff',
        'red': '#ef5350',
        'red1': '#ef3e3e',
        'green': '#42cd74',
        'green1': '#4CE5B1',
        'grey': '#717176',
        'orange1': '#ff7903',
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

