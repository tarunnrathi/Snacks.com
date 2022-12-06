import "./styles/globals.scss";

import * as serviceWorker from "./serviceWorker";

import { AppContainer, setConfig } from "react-hot-loader";
import { persistor, store } from "./store/store";

import App from "./App";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import React from "react";
import ReactPixel from "react-facebook-pixel";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import ReactDOM from "react-dom";
import { initAmplitude } from "./config/amplitude/ConfigAmplitude";

setConfig({
  showReactDomPatchNotification: false,
});
initAmplitude();
const history = createBrowserHistory();
ReactPixel.init("936969143380599");
ReactPixel.pageView();

ReactDOM.render(
  <Router history={history}>
    <AppContainer>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </AppContainer>
  </Router>,
  document.getElementById("root")
);
serviceWorker.register();
