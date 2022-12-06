import React from "react";
import { shallow } from "enzyme";
import ForgotPassword from "./index";

const wrapper = shallow(<ForgotPassword />);

describe("Forgot Password component", () => {
  it("Forgot Password component should renders correctly", () => {
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
  it("email input field exists", () => {
    const node = wrapper.find("#email");
    expect(node.exists()).toBe(false);
  });
  it("sign in button exists", () => {
    const node = wrapper.find("#SignIn");
    expect(node.exists()).toBe(false);
  });
  it("sign up button exists", () => {
    const node = wrapper.find("#SignUp");
    expect(node.exists()).toBe(false);
  });
});
