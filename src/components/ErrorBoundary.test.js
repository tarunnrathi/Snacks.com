import React from "react";
import { shallow } from "enzyme";
import ErrorBoundary from "./ErrorBoundary";

describe("ErrorBoundary component", () => {
  it("ErrorBoundary component should renders correctly", () => {
    const wrapper = shallow(<ErrorBoundary />);
    wrapper.setState({ hasError: true });
    expect(wrapper).toMatchSnapshot();

    // wrapper.instance().componentDidCatch("error", "info");
  });
});
