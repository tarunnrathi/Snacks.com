import React from "react";
import { shallow } from "enzyme";
import SectionHeading from "./SectionHeading";

describe("SectionHeading component", () => {
  it("SectionHeading component should renders correctly", () => {
    const wrapper = shallow(<SectionHeading />);
    expect(wrapper).toMatchSnapshot();
  });

  it("testing getShowAllContent by passing required props", () => {
    //when isFunction true
    shallow(
      <SectionHeading
        horizontalView={false}
        isShowAllVisible={true}
        isFunction={true}
      />
    );

    //when isLink true
    shallow(
      <SectionHeading
        horizontalView={false}
        isShowAllVisible={true}
        isLink={true}
      />
    );

    //when isLink & isFunction are false
    shallow(<SectionHeading horizontalView={false} isShowAllVisible={true} />);
  });
});
