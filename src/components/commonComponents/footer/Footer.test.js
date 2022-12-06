import React from "react";
import { shallow } from "enzyme";
import Footer from "./Footer";
import { DisplayHeading } from "../../../config/constants/content.constant";

const wrapper = shallow(<Footer.WrappedComponent />);

describe("Footer component", () => {
  it("Footer component should renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("test zipPopoverOpen function", () => {
    const e = { currentTarget: "/home" };
    wrapper.instance().zipPopoverOpen(e);
  });

  // it("test handleClick function", () => {
  //   const event = { target: { value: "75024" } };
  //   wrapper.instance().checkZipcode(event);
  //   // const event = {target: { value: "75024"}};
  //   // wrapper.find("#zipcode").simulate("change", event);
  // });

  it("test redirect function", () => {
    const response = {
      success: true,
      data: { locationId: "75024", stateCode: "tx" },
    };
    wrapper.instance().redirect("22030", response);
  });

  // it("footer logo exists", () => {
  //   wrapper.find(".logo-link").simulate("click");
  // });

  // it("all social footerlinks", () => {
  //   expect(wrapper.find(".footer").exists()).toBe(true);
  //   wrapper.find(".facebook-social-link").simulate("click");
  //   wrapper.find(".instagram-social-link").simulate("click");
  //   wrapper.find(".twitter-social-link").simulate("click");
  // });

  // it("Fritolay Link", () => {
  //   const linkNode = wrapper.find(".fritolay-footer-link");
  //   expect(linkNode.exists()).toBe(true);
  //   linkNode.simulate("click");
  //   expect(linkNode.text()).toEqual("Fritolay.com");
  // });
  // it("terms-of-service Link", () => {
  //   const linkNode = wrapper.find(".terms-of-service-footer-link");
  //   expect(linkNode.exists()).toBe(true);
  //   linkNode.simulate("click");
  //   expect(linkNode.text()).toEqual(DisplayHeading.TERMS_OF_SERVICE_BUTTON);
  // });

  // it("contactus Link", () => {
  //   const linkNode = wrapper.find(".contactus-footer-link");
  //   expect(linkNode.exists()).toBe(true);
  //   linkNode.simulate("click");
  //   expect(linkNode.text()).toEqual(DisplayHeading.CONTACT_US_BUTTON);
  // });
  // it("privacy-policy Link", () => {
  //   const linkNode = wrapper.find(".privacy-policy-footer-link");
  //   expect(linkNode.exists()).toBe(true);
  //   linkNode.simulate("click");
  //   expect(linkNode.text()).toEqual(DisplayHeading.PRIVACY_POLICY_BUTTON);
  // });
  // it("ads-tracking Link", () => {
  //   const linkNode = wrapper.find(".ads-tracking-footer-link");
  //   expect(linkNode.exists()).toBe(true);
  //   linkNode.simulate("click");
  //   expect(linkNode.text()).toEqual(DisplayHeading.ADS_TRACKING_BUTTON);
  // });
  // it("returns-policy Link", () => {
  //   const linkNode = wrapper.find(".returns-policy-footer-link");
  //   expect(linkNode.exists()).toBe(true);
  //   linkNode.simulate("click");
  //   expect(linkNode.text()).toEqual("Shipping and Returns Policy");
  // });
});
