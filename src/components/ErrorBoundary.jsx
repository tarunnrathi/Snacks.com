import React from "react";
import SnacksAlertMessage from "./commonComponents/snacksAlertMessage/SnacksAlertMessage";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true }, () => {
      document.getElementById("body").classList.add("has-toast");
    });
  }
  render() {
    if (this.state.hasError) {
      return <SnacksAlertMessage fullWidth msg={"Something Went Wrong"} />;
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
