import { MantineProvider } from "@mantine/core";
import store from "@redux/store";
import "@styles/global.scss";
import "@styles/tailwind.scss";
import { AppProps } from "next/app";
import React from "react";
import { Provider } from "react-redux";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Provider store={store}>
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
      </Provider>
    </>
  );
};

export default MyApp;
