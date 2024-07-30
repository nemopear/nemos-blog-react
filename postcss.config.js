module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    "postcss-preset-mantine": {},
    "postcss-simple-vars": {
      variables: {
        "mantine-breakpoint-sm": "576px",
        "mantine-breakpoint-md": "768px",
        "mantine-breakpoint-lg": "992px",
        "mantine-breakpoint-xl": "1200px",
      },
    },
  },
};
