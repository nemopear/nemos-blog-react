export const lightTheme = {
  primary: {
    main: "#228be6",
    light: "#4dabf7",
    dark: "#1c7ed6",
  },
  secondary: {
    main: "#be4bdb",
    light: "#da77f2",
    dark: "#ae3db8",
  },
  background: {
    default: "#ffffff",
    paper: "#ffffff",
  },
  text: {
    primary: "#212529",
    secondary: "#495057",
  },
  divider: "#dee2e6",
  code: {
    bg: "#f5f5f5",
    text: "#333333",
  },
  link: {
    color: "#228be6",
  },
  heading: {
    color: "#212529",
  },
  body: {
    color: "#333333",
  },
  blockquote: {
    border: "#228be6",
    text: "#666666",
  },
};

export const darkTheme = {
  primary: {
    main: "#4da3ff",
    light: "#4dabf7",
    dark: "#1c7ed6",
  },
  secondary: {
    main: "#da77f2",
    light: "#da77f2",
    dark: "#ae3db8",
  },
  background: {
    default: "#1a1b1e",
    paper: "#25262b",
  },
  text: {
    primary: "#ffffff",
    secondary: "#b0b0b0",
  },
  divider: "#373a40",
  code: {
    bg: "#2d2d30",
    text: "#d4d4d4",
  },
  link: {
    color: "#4da3ff",
  },
  heading: {
    color: "#ffffff",
  },
  body: {
    color: "#d4d4d4",
  },
  blockquote: {
    border: "#4da3ff",
    text: "#b0b0b0",
  },
};

export type Theme = typeof lightTheme;
