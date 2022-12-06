import React from "react";
import { shallow } from "enzyme";
import HeroBanner from "./HeroBanner";

describe("Banners", () => {
  let data = `[{"sectionName":"Flaming Hot","textColor":"White","buttonText":"Shop Flamin' Hot Snacks","filterLink":null,"sectionDescription":null,"filterImage":"https://share.snacks.com/images/flamin-hot-banner.png","timeInterval":7000},{"sectionName":"show previous orders","textColor":null,"buttonText":"CHECK IT OUT","filterLink":"/profile?order","sectionDescription":"No need to shop from scratch, re-order any of your past purchases!","filterImage":null,"timeInterval":7000},{"sectionName":"shop by category","textColor":null,"buttonText":"GET STARTED","filterLink":"/shopbycategory","sectionDescription":"We’ll take you step by step to help you find the right flavors for any occasion!","filterImage":null,"timeInterval":7000}]`;
  it("renders correctly", () => {
    const wrapper = shallow(<HeroBanner authHome={JSON.parse(data)} />);
    expect(wrapper).toMatchSnapshot();
  });
});
