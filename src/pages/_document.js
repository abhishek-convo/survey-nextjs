import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
          <meta httpEquiv="Cache-control" content="public" />
          <meta
            name="facebook-domain-verification"
            content="4pw956gr9fr0l99fnt6qp57yrsmfl8"
          />
          <meta name="ROBOTS" content="INDEX, FOLLOW" />
          <link
            rel="stylesheet"
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
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

export default MyDocument;
