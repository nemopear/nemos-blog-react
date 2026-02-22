module.exports = {
  content: ["./pages/**/*.tsx", "./src/**/*.tsx"],

  darkMode: "class",

  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: "#333",
            h1: { fontSize: "32px" },
            h2: {
              fontSize: "20px !important",
              fontWeight: 500,
            },
            ".text-xs": { fontSize: "12px" },
            code: {
              padding: "1px 14px",
              backgroundColor: "#f8f9fb",
              borderRadius: 4,
              display: "inline-block",
              border: "1px solid #dadeed",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              "&:before, &:after": {
                content: "none !important",
              },
            },
          },
        },
      },
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
  plugins: [
    require("@tailwindcss/typography"),
  ],
};
