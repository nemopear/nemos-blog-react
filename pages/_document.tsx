import { ColorSchemeScript } from "@mantine/core";
import { createGetInitialProps } from "@mantine/next";
import Document, { Head, Html, Main, NextScript } from "next/document";
import CONFIG from "src/data/config";

const getInitialProps = createGetInitialProps();

class CustomDocument extends Document {
  static getInitialProps = getInitialProps;

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
          {/* <link
            rel="stylesheet"
            href="https://use.typekit.net/kpb8sca.css"
          ></link> */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai+Looped:wght@100;200;300;400;500;600;700&display=swap"
            rel="stylesheet"
          />
          <title>Nemo's Blog 🪐</title>
          <meta property="og:title" content={CONFIG.defaultTitle} />
          <meta property="og:description" content={CONFIG.defaultDescription} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={CONFIG.url} />
          <ColorSchemeScript defaultColorScheme="auto" />
          <meta
            property="og:image"
            content="https://media.graphassets.com/output=format:jpg/resize=width:350,height:350,fit:crop/FWUnmkz9Ruqwt34qsNZ7"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
