import React from "react";
import { shallow } from "enzyme";
import FormField from "./FormField";

const wrapper = shallow(<FormField disableField={true} />);

describe("FormField component", () => {
  it("FormField component should renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
