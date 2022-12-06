import React from "react";
import { shallow } from "enzyme";
import HomeBox from "./HomeBox";

const props = {
  customClass: "lorem",
  heading: "Lorem Ipsum heading",
  description: "Lorem Ipsum description",
  viewAllText: "Lorem Ipsum text",
  viewAllLink: "/link",
};
const wrapper = shallow(<HomeBox {...props} />);

describe("HomeBox component", () => {
  it("HomeBox component should renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("reload home-remove-decor", () => {
    wrapper.instance().reload;
    wrapper.find(".home-remove-decor").simulate("click");
  });
});
