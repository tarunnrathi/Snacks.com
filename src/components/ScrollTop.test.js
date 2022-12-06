import React from "react";
import { shallow } from "enzyme";
import ScrollTop from "./ScrollTop";
const props = { location: { pathname: "/cart" } };
const wrapper = shallow(<ScrollTop.WrappedComponent {...props} />);

describe("ScrollTop component", () => {
  it("ScrollTop component should renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("test componentDidUpdate function", () => {
    window.scrollTo(0, 0);
    wrapper.setProps({ location: { pathname: "/cart" } });
    wrapper
      .instance()
      .componentDidUpdate({ location: { pathname: "/productlist" } });
  });
});
