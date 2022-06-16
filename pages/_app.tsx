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
import { DefaultSeo } from "next-seo";
import { AppProps } from "next/app";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import CONFIG from "src/data/config";

function MyApp(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    props.colorScheme
  );
  // const [acceptAnalytic, setAcceptAnalytic] = useState(false);

  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  // const handleSetAcceptAnalytic = (value) => {
  //   setAcceptAnalytic(value);
  //   setCookies("Analytic", value, {
  //     maxAge: 60 * 60 * 24 * 30,
  //   });
  //   console.log("get");
  // };

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
                  sm: 576,
                  md: 768,
                  lg: 992,
                  xl: 1200,
                },
              },
            }}
            withGlobalStyles
            withNormalizeCSS
          >
            <DefaultSeo
              openGraph={{
                type: "website",
                locale: "en_IE",
                url: `${CONFIG.url}`,
                site_name: `${CONFIG.defaultTitle}`,
                description: `${CONFIG.defaultDescription}`,
              }}
            />
            <Component {...pageProps} />
            {/* <div className="flex space-x-4">
              <Button onClick={() => handleSetAcceptAnalytic(true)}>
                Accept
              </Button>
              <Button onClick={() => handleSetAcceptAnalytic(false)}>
                Reject
              </Button>
            </div> */}
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
