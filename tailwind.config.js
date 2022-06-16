module.exports = {
  purge: ["./pages/**/*.tsx", "./src/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
     extend: {
      typography: {
        DEFAULT: {
          css: {
            color: '#333',
            h1: {fontSize: '32px'},
            h2: {
              fontSize: '20px !important',
              fontWeight: 500
            },
            ".text-xs": {fontSize: '12px'},
          },
        },
      },
      lineClamp: {
        7: '7',
        8: '8',
        9: '9',
        10: '10',
      }
    },
    screens: {
      sm: "768px",
      md: "992px",
      lg: "1200px",
      xl: "1600px",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/line-clamp'),],
};
