class Log {
  constructor() {
    this.message;
    this.data;
    this.isSessionId;
    this.isAnalyticsId;
    this.logData;
    this.util;
    this.cookieEnabled = false;
  }

  init() {
    window.convosight = {};
    this.util = {};
    var webEngageInterval = setInterval(this.blockWebEngagePrompt, 500);
    this.sentryInit();
    this.setAnalyticsAndSessionId();

    if (window.location.href.split("?").length > 1) {
      this.util["queryString"] = window.location.href.split("?")[1];
      this.getQueryStringObject(this.util["queryString"]);
    }
  }

  sentryInit() {
    try {
      Sentry.init({
        dsn: "https://111b4043f0e64d978733782fd08b8d90@sentry.io/1879150",
        environment: "environment",
        ignoreErrors: [
          "TypeError: Failed to fetch",
          "TypeError: NetworkError when attempting to fetch resource.",
          "TypeError: cancelled",
          "Non-Error promise rejection captured with value:",
        ],
        release: "W30.2021.0",
        integrations: [new Sentry.Integrations.BrowserTracing()],
        tracesSampleRate: 0.5,
      });
    } catch (e) {}
  }

  blockWebEngagePrompt() {
    if (!!window.webengage) {
      webengage.options("webpush.disablePrompt", true);
      clearInterval(webEngageInterval);
    }
  }

  trackMethod(message, data) {
    const logMainData = this.getDataForLogs(message, data);
    console.log(logMainData);
  }

  pageLoadMethod(message, data) {
    const logMainData = this.getDataForLogs(message, data);
    console.log(logMainData);
  }

  getDataForLogs(message, data) {
    this.logData = {
      logSource: "WebClient",
      callerTypeName: "LandingPageScript",
      callerMethodName: "sendLog",
      level: "Info",
      logCategory: "ClickStream",
      createdAtUTC: new Date().toISOString(),
      message: message,
      metainfo: {
        data: data,
      },
      environment: "environment",
    };

    if (this.logData.metainfo) {
      if (window.convosight.analyticsId) {
        this.logData["metainfo"]["analyticsId"] = window.convosight.analyticsId;
      }

      if (window.convosight.sessionId) {
        this.logData["metainfo"]["sessionId"] = window.convosight.sessionId;
      }

      if (this.getCurrentFormFactor()) {
        this.logData["metainfo"]["data"]["device_form_factor"] =
          this.getCurrentFormFactor();
      }
      if (!!window) {
        this.logData["metainfo"]["data"]["page_url"] = window.location.href;
      }
      if (!!window) {
        this.logData["metainfo"]["data"]["page_url"] = window.location.href;
      }
      if (this.util && this.util.queryStringObject) {
        for (let key in this.util.queryStringObject) {
          this.logData["metainfo"]["data"][key] =
            this.util.queryStringObject[key];
        }
      }
      this.logData["metainfo"]["cookieEnabled"] = this.cookieEnabled;
    }

    return this.logData;
  }

  async setAnalyticsAndSessionId() {
    // checking if session and analytics is present else store a new uuid
    if (!!navigator && navigator.cookieEnabled) {
      this.cookieEnabled = true;
      this.isSessionId = this.getSessionStorage("sessionId");
      this.isAnalyticsId = await this.getCookieValue("analyticsId");
      console.log(this.isAnalyticsId);
      if (!this.isSessionId) {
        window.convosight.sessionId = this.uuid();
        this.setSessionStorage("sessionId", window.convosight.sessionId);
      } else {
        window.convosight.sessionId = this.isSessionId;
      }

      if (!this.isAnalyticsId) {
        window.convosight.analyticsId = this.uuid();
        this.setCookieValue("analyticsId", window.convosight.analyticsId, 3650);
      } else {
        window.convosight.analyticsId = this.isAnalyticsId.substr(1);
      }
    }
  }

  getCookieValue(a) {
    var name = a;
    var value = "";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        value = c.substring(name.length, c.length);
      }
    }
    return value;
  }

  setCookieValue(name, value, exdays = 365) {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie =
      name + "=" + value + ";" + expires + ";path=/;domain=.convosight.com";
  }

  getSessionStorage(a) {
    return sessionStorage.getItem(a);
  }

  setSessionStorage(name, value) {
    sessionStorage.setItem(name, value);
  }

  uuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  getCurrentFormFactor() {
    const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(
      navigator.userAgent
    );
    if (navigator.userAgent) {
      if (isMobileDevice) {
        return "Mobile";
      } else {
        return "Desktop";
      }
    }
  }

  getQueryStringObject(url) {
    const qString = url.split("&");
    if (qString.length > 0) {
      if (!this.util["queryStringObject"]) {
        this.util["queryStringObject"] = {};
      }
      for (let i = 0; i < qString.length; i++) {
        this.util["queryStringObject"][`qs_${qString[i].split("=")[0]}`] =
          qString[i].split("=")[1];
      }
      setSessionStorage(
        "queryString",
        JSON.stringify(this.util.queryStringObject)
      );
    }
  }

  async postLogApi(data) {
    var response = await fetch("https://api.convosight.com/v1/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  }
}

export default Log;
