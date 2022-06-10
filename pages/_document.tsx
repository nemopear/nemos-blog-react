import { createGetInitialProps } from "@mantine/next";
import Document, { Head, Html, Main, NextScript } from "next/document";

const getInitialProps = createGetInitialProps();

class CustomDocument extends Document {
  static getInitialProps = getInitialProps;

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
          <link
            rel="stylesheet"
            href="https://use.typekit.net/kpb8sca.css"
          ></link>
          {/* <title>Nemo's Blog 🪐</title> */}
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
