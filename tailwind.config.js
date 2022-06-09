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
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'),],
};
