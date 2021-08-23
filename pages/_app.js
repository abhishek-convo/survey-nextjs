import "../styles/globals.css";
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

      <Script
        strategy="beforeInteractive"
        src="https://browser.sentry-cdn.com/6.8.0/bundle.tracing.min.js"
        integrity="sha384-PEpz3oi70IBfja8491RPjqj38s8lBU9qHRh+tBurFb6XNetbdvlRXlshYnKzMB0U"
        crossOrigin="anonymous"
      />
      <Script strategy="lazyOnload">
        {`!(function () {
  var analytics = (window.analytics = window.analytics || []);
  if (!analytics.initialize)
    if (analytics.invoked)
      window.console &&
        console.error &&
        console.error("Segment snippet included twice.");
    else {
      analytics.invoked = !0;
      analytics.methods = [
        "trackSubmit",
        "trackClick",
        "trackLink",
        "trackForm",
        "pageview",
        "identify",
        "reset",
        "group",
        "track",
        "ready",
        "alias",
        "debug",
        "page",
        "once",
        "off",
        "on",
        "addSourceMiddleware",
        "addIntegrationMiddleware",
        "setAnonymousId",
        "addDestinationMiddleware",
      ];
      analytics.factory = function (e) {
        return function () {
          var t = Array.prototype.slice.call(arguments);
          t.unshift(e);
          analytics.push(t);
          return analytics;
        };
      };
      for (var e = 0; e < analytics.methods.length; e++) {
        var t = analytics.methods[e];
        analytics[t] = analytics.factory(t);
      }
      analytics.load = function (e, t) {
        var n = document.createElement("script");
        n.type = "text/javascript";
        n.async = !0;
        n.src =
          "https://cdn.segment.com/analytics.js/v1/" + e + "/analytics.min.js";
        var a = document.getElementsByTagName("script")[0];
        a.parentNode.insertBefore(n, a);
        analytics._loadOptions = t;
      };
      analytics.SNIPPET_VERSION = "4.13.2";
      analytics.load("8qOyi5LVpSLeuDhdsnCEgQcakPdWhOYg");
      analytics.page("GA - Convosight Landing Page");
    }
})();`}
      </Script>
    </>
  );
}

export default MyApp;
