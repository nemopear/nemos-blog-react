import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import store from "@redux/store";
import "@styles/global.scss";
import "@styles/tailwind.scss";
import { getCookie, setCookies } from "cookies-next";
import { GetServerSidePropsContext } from "next";
import { AppProps } from "next/app";
import React, { useState } from "react";
import { Provider } from "react-redux";

function MyApp(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    props.colorScheme
  );

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme =
      value || (colorScheme === "dark" ? "light" : "dark");
    setColorScheme(nextColorScheme);
    setCookies("mantine-color-scheme", nextColorScheme, {
      maxAge: 60 * 60 * 24 * 30,
    });
  };

  return (
    <>
      <Provider store={store}>
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <MantineProvider
            theme={{
              // Override any other properties from default theme
              fontFamily: "urbane-rounded, thongterm, sans-serif",
              spacing: { xs: 15, sm: 20, md: 25, lg: 30, xl: 40 },
            }}
            defaultProps={{
              Container: {
                sizes: {
                  xs: 540,
                  sm: 720,
                  md: 960,
                  lg: 1140,
                  xl: 1320,
                },
              },
            }}
            withGlobalStyles
            withNormalizeCSS
          >
            <Component {...pageProps} />
          </MantineProvider>
        </ColorSchemeProvider>
      </Provider>
    </>
  );
}

export default MyApp;
MyApp.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  colorScheme: getCookie("mantine-color-scheme", ctx) || "light",
});
