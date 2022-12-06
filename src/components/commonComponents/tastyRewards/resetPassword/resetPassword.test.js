import React from "react";
import { shallow } from "enzyme";
import ResetPassword from "./index";

const wrapper = shallow(
  <ResetPassword location={{ pathname: "/resetpassword/token" }} />
);

describe("Reset Password component", () => {
  it("Reset component should renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("forgot password form exists", () => {
    const node = wrapper.find(".forgot-pwd-form");
    expect(node.exists()).toBe(false);
  });
  it("tasty rewards logo exists", () => {
    const node = wrapper.find("#tasty-logo");
    expect(node.exists()).toBe(false);
  });
  it("newPassword input field exists", () => {
    const node = wrapper.find("#newPassword");
    expect(node.exists()).toBe(false);
  });
  it("confirmPassword input field exists", () => {
    const node = wrapper.find("#confirmPassword");
    expect(node.exists()).toBe(false);
  });
  it("savePassword button exists", () => {
    const node = wrapper.find("#savePassword");
    expect(node.exists()).toBe(false);
  });
});
