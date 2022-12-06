import React from "react";
import LoginCallback from "./LoginCallback";
import { shallow } from "enzyme";

describe("Login callback", () => {
  const wrapper = shallow(<LoginCallback />);
  it("Login callback component should renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
