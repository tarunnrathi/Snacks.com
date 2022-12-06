import React from "react";
import { shallow } from "enzyme";
import Spinner from "./Spinner";

describe("Spinner component", () => {
  it("Spinner component should renders correctly", () => {
    const wrapper = shallow(<Spinner />);
    expect(wrapper).toMatchSnapshot();
  });
});
