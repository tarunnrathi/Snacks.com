import React from "react";
import { shallow } from "enzyme";
import HomeSilder from "./HomeSilder";
const content = [
  {
    filterLink: "/home",
    filterImage: "test.jpg",
    buttonText: "show image",
    textColor: "#fff",
    sectionDescription:"Home page banner",
    btnBackgroundColorRgb:"red",
    buttonPosition:"100"
  },
];
const wrapper = shallow(<HomeSilder content={content}/>);

describe("SnacksCarousel component", () => {
  
  it("SnacksCarousel component should renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("test renderImage function", () => {
    wrapper.instance().renderImage(content);
  });

 
});