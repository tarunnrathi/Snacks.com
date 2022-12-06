import React, { Component, Suspense } from "react";
import { getAppInsights } from "./TelemetryService";
import TelemetryProvider from "./telemetry-provider";
import UrlConstants from "./config/UrlConstants";
import Routes from "./routes";
import ErrorBoundary from "./ErrorBoundary";
import Spinner from "./components/Spinner";
import Carousel from "./components/BannerCarousel/Carousel";
import Pack from "./components/Myovp/Pack";
// import { createTheme } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#0d47a1",
    },
    primary: {
      main: "#303f9f",
    },
  },
});

class App extends Component {
  componentDidMount() {
    if (window.location.search) {
      const urlParams = new URLSearchParams(window.location.search);
      const language = urlParams.get("lang");
      if (language === "es-us") {
        localStorage.setItem("ln", UrlConstants.spanishLanguage);
      } else {
        localStorage.setItem("ln", UrlConstants.englishLanguage);
      }
    } else if (window.location.href.indexOf("en-us") > -1) {
      localStorage.setItem("ln", UrlConstants.englishLanguage);
    } else if (window.location.href.indexOf("es-us") > -1) {
      localStorage.setItem("ln", UrlConstants.spanishLanguage);
    }
    if (!localStorage.getItem("ln")) {
      localStorage.setItem("ln", UrlConstants.englishLanguage);
    }
  }

  render() {
    let appInsights = null;
    let instrumentKey = "5d55d161-4411-4f69-b440-acc12095fd76";

    if (window.location.hostname !== "www.snacks.com") {
      instrumentKey = "1e31d811-6fad-484c-879e-0d8ac97278f7";
    }
    return (
      <ErrorBoundary>
        <Suspense fallback={<Spinner />}>
          <TelemetryProvider
            instrumentationKey={instrumentKey}
            after={() => {
              appInsights = getAppInsights();
            }}
          >
            <ThemeProvider theme={theme}>
              <div
                className="main-container"
                data-version={UrlConstants.BuildVersion}
              >
                {/* <Carousel />
                <Pack /> */}
                <ThemeProvider theme={theme}>
                  <Routes />
                </ThemeProvider>
              </div>
            </ThemeProvider>
          </TelemetryProvider>
        </Suspense>
      </ErrorBoundary>
    );
  }
}
export default App;
