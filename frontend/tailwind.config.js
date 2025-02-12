// tailwind.config.js

module.exports = {
   content: ["./App.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: '#821F1F',
            dark: '#6C1212',
            light: '#962424',
          },
        },
      },
    },
    plugins: [],
  }