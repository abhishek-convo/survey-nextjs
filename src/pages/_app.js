import "../../styles/globals.css";
import Script from "next/script";
import Head from "next/head";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </Head>
      <Component {...pageProps} />

      {/* <Script
        strategy="beforeInteractive"
        src="https://browser.sentry-cdn.com/6.8.0/bundle.tracing.min.js"
        integrity="sha384-PEpz3oi70IBfja8491RPjqj38s8lBU9qHRh+tBurFb6XNetbdvlRXlshYnKzMB0U"
        crossOrigin="anonymous"
      /> */}
    </>
  );
}

export default MyApp;
