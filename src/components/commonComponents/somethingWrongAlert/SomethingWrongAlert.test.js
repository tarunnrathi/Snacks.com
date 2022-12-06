import React from "react";
import { shallow } from "enzyme";

import SomethingWrongAlert from "./SomethingWrongAlert";

describe("Something wrong alert", () => {
  it("somethingWrongAlert component should renders correctly", () => {
    const wrapper = shallow(<SomethingWrongAlert />);
    expect(wrapper).toMatchSnapshot();
  });
});
