import React, { lazy, Component } from "react";
import { ReactTitle } from "react-meta-tags";
import { Route } from "react-router-dom";

import UrlConstants from "../config/UrlConstants";

const Header = lazy(() => import("./commonComponents/header/header"));
const Footer = lazy(() =>
  UrlConstants.isTastyRewards
    ? import("./commonComponents/tastyRewards/footer/Footer")
    : import("./commonComponents/footer/Footer")
);
const PageNotFound = lazy(() => import("../components/404Page/PageNotFound"));
let iframePath = ["/changepassword", "/forgotpassword", "/resetpassword"];

export class RouteRapper extends Component {
  checkIfIframe() {
    let isIframe = iframePath.indexOf(this.props.path) !== -1;
    if (isIframe) {
      document.body.style.background = "#ffffff";
      document.body.classList.add("body-iframe");
    }
  }

  componentDidUpdate() {
    this.checkIfIframe();
  }

  componentDidMount() {
    this.checkIfIframe();
  }

  componentWillUnmount() {
    let isIframe = iframePath.indexOf(this.props.path) !== -1;
    if (isIframe) {
      document.body.style.background = "none";
      document.body.classList.remove("body-iframe");
    }
  }

  render() {
    const { component: Component, title, path, ...rest } = this.props;
    let isNotIframe = iframePath.indexOf(path) === -1;
    return (
      <Route
        {...rest}
        render={(props) => (
          <React.Fragment>
            <ReactTitle title={title} />
            {isNotIframe && <Header />}
            <main
              id="mainContain"
              className={`main-contain ${
                window.location.hash === "#/home" ||
                window.location.hash === "#/"
                  ? "main-contain-home"
                  : ""
              } ${UrlConstants.isTastyRewards ? "tr-content" : ""}`}
            >
              <div className={isNotIframe ? "main-contain-inner" : ""}>
                {!!sessionStorage.getItem("_ss_i") &&
                !!sessionStorage.getItem("_rr_n_dts") &&
                !!sessionStorage.getItem("_en_cs") ? (
                  <Component {...props} />
                ) : (
                  <PageNotFound />
                )}
              </div>
            </main>
            {isNotIframe && <Footer />}
          </React.Fragment>
        )}
      />
    );
  }
}
export default RouteRapper;
