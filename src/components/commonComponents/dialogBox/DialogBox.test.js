import React from "react";
import { shallow } from "enzyme";
import DialogBox from "./DialogBox";

const baseProps = {
  // whatever fake props you want passed to the component
  dialogOpen: true,
  dialogClose: jest.fn(),
  dialogCloseConfirm: jest.fn(),
  dialogHeading: "Lorem Ipsum",
  ariaLabelCancel: "cancel",
  ariaLabelYes: "yes",
  PageTitle: "test page",
};
const wrapper = shallow(<DialogBox {...baseProps} />);

describe("Dialog Box select", () => {
  it("Dialog Box component should renders correctly", () => {
    //wrapper.instance().dialogClose();
    expect(wrapper).toMatchSnapshot();
  });

  it("check button click events", () => {
    wrapper.setProps({ dialogOpen: true });
    expect(wrapper.find(".modal-wrapper").exists()).toBe(true);
    wrapper.find(".reject").simulate("click");
    wrapper.find(".accept").simulate("click");
    wrapper.find(".modal-wrapper-container").at(0).simulate("close");
  });
});
