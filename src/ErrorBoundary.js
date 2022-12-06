import React from "react";
import { ViewedPage } from "./config/amplitude/SnacksAmplitude";
import { PAGENAME } from "./config/amplitude/Taxonomy.constants";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null, errorShown: false };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
      errorShown: true,
    });
  }

  render() {
    if (this.state.errorInfo) {
      console.log("error occured ==> ", this.state.errorInfo);
      window.location.assign("/somethingwentwrong"); // error occurs, redirecting to customize error page
    }
    // Normally, just render children
    return this.props.children;
  }
}

export default ErrorBoundary;
