import React from "react";
import { shallow } from "enzyme";

import SnacksAlertMessage from "./SnacksAlertMessage";

const wrapper = shallow(<SnacksAlertMessage targetPageUrl="/" msg="Website api failed"/>);

describe("SnacksAlertMessage component", () => {
  it("SnacksAlertMessage component should renders correctly", () => {
    wrapper.instance().handleRedirect("/");
    expect(wrapper).toMatchSnapshot();
  });
});
