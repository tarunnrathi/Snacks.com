import React from "react";
import { shallow } from "enzyme";
import SnacksCarousel from "./SnacksCarousel";

const wrapper = shallow(<SnacksCarousel content={[{ timeInterval: 3 }]} />);

describe("SnacksCarousel component", () => {
  it("SnacksCarousel component should renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("test componentDidMount direction scenarios", () => {
    //when direction = vertical
    shallow(
      <SnacksCarousel content={[{ timeInterval: 3 }]} direction="vertical" />
    );
    //when direction = verticalReverse
    shallow(
      <SnacksCarousel
        content={[{ timeInterval: 3 }]}
        direction="verticalReverse"
      />
    );
    //when direction = horizontal
    shallow(
      <SnacksCarousel content={[{ timeInterval: 3 }]} direction="horizontal" />
    );
  });

  it("test setMobileTime function", () => {
    wrapper.instance().setMobileTime(1);
  });

  it("test changeMobileSlide function", () => {
    //when timerIndexMobile == divider
    wrapper.setState({ timerIndexMobile: 7 });
    wrapper.instance().changeMobileSlide(1);

    //when timerIndexMobile != divider
    wrapper.setState({ timerIndexMobile: 5 });
    wrapper.instance().changeMobileSlide(1);
  });

  it("test setLeftTime function", () => {
    wrapper.instance().setLeftTime(1);
  });

  it("test changeLeftSlide function", () => {
    //when timerIndexLeft == divider
    wrapper.setState({ timerIndexLeft: 4 });
    wrapper.instance().changeLeftSlide();

    //when timerIndexLeft != divider
    wrapper.setState({ timerIndexLeft: 5 });
    wrapper.instance().changeLeftSlide();
  });

  it("test setRightTime function", () => {
    wrapper.instance().setRightTime(1);
  });

  it("test changeRightSlide function", () => {
    //when timerIndexLeft == divider
    wrapper.setState({ timerIndexLeft: 4 });
    wrapper.instance().changeRightSlide();

    //when timerIndexLeft != divider
    wrapper.setState({ timerIndexLeft: 5 });
    wrapper.instance().changeRightSlide();
  });

  it("test renderImage function", () => {
    const content = [
      {
        filterLink: "/home",
        filterImage: "test.jpg",
        buttonText: "show image",
        textColor: "#fff",
      },
    ];
    const dimension = {
      width: 100,
      height: 50,
    };
    wrapper.instance().renderImage(content, "mobile", dimension);
  });

  it("test componentWillUmMount lifecycle", () => {
    wrapper.instance().componentWillUnmount();
  });
});
