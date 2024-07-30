import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles/global.css";
import store from "@redux/store";
import "@styles/global.scss";
import "@styles/tailwind.scss";
import { theme } from "@styles/theme";
import { getCookie } from "cookies-next";
import { GetServerSidePropsContext } from "next";
import { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";

function MyApp(props: AppProps) {
  const { Component, pageProps } = props;

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

  // const toggleColorScheme = (value?: ColorScheme) => {
  //   const nextColorScheme =
  //     value || (colorScheme === "dark" ? "light" : "dark");
  //   setColorScheme(nextColorScheme);
  //   setCookies("mantine-color-scheme", nextColorScheme, {
  //     maxAge: 60 * 60 * 24 * 30,
  //   });
  // };

  return (
    <>
      <Provider store={store}>
        <MantineProvider
          // theme={{
          //   // Override any other properties from default theme
          //   fontFamily: "urbane-rounded, thongterm, sans-serif",
          //   // spacing: { xs: 15, sm: 20, md: 25, lg: 30, xl: 40 },
          // }}
          theme={theme}
        >
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
      </Provider>
    </>
  );
}

export default MyApp;
MyApp.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  colorScheme: getCookie("mantine-color-scheme", ctx) || "light",
});
