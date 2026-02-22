import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { useMemo } from "react";
import store from "@redux/store";
import "@styles/global.scss";
import "@styles/tailwind.scss";
import { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import { ThemeContextProvider, useThemeMode } from "src/context/ThemeContext";
import { lightTheme, darkTheme } from "src/theme/colors";

const getDesignTokens = (mode: "light" | "dark") => {
  const themeColors = mode === "light" ? lightTheme : darkTheme;
  
  return {
    palette: {
      mode,
      primary: themeColors.primary,
      secondary: themeColors.secondary,
      background: themeColors.background,
      text: {
        primary: themeColors.text.primary,
        secondary: themeColors.text.secondary,
      },
      divider: themeColors.divider,
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: { fontSize: "2.5rem", fontWeight: 600 },
      h2: { fontSize: "2rem", fontWeight: 600 },
      h3: { fontSize: "1.75rem", fontWeight: 600 },
      h4: { fontSize: "1.5rem", fontWeight: 600 },
      h5: { fontSize: "1.25rem", fontWeight: 500 },
      h6: { fontSize: "1rem", fontWeight: 500 },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
          },
        },
      },
      MuiContainer: {
        defaultProps: {
          maxWidth: "lg",
        },
      },
    },
  };
};

const ThemedApp: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { mode } = useThemeMode();
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

function MyApp(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Nemo&apos;s Blog 🪐</title>
      </Head>
      <Provider store={store}>
        <ThemeContextProvider>
          <ThemedApp>
            <Component {...pageProps} />
          </ThemedApp>
        </ThemeContextProvider>
      </Provider>
    </>
  );
}

export default MyApp;
