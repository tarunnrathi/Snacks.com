import React from "react";
import { shallow } from "enzyme";
import SnacksFooter from "./SnacksFooter";
import { DisplayHeading } from "../../../../config/constants/content.constant";

const wrapper = shallow(<SnacksFooter />);
wrapper.setState({
  menuToggle: true,
});

describe("Snacks Footer component", () => {
  it("Snacks Footer component should renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("footer logo exists", () => {
    expect(wrapper.find(".snacks-logo").exists()).toBe(true);
  });

  it("all social footerlinks", () => {
    expect(wrapper.find(".social-links").exists()).toBe(true);
    wrapper.find(".facebook-link").simulate("click");
    wrapper.find(".instagram-link").simulate("click");
    wrapper.find(".twitter-link").simulate("click");
  });

  it("Fritolay Link", () => {
    const linkNode = wrapper.find(".fritolay-link");
    expect(linkNode.exists()).toBe(true);
    linkNode.simulate("click");
    expect(linkNode.text()).toEqual("Fritolay.com");
  });

  it("Terms Of Service Link", () => {
    const linkNode = wrapper.find(".terms-of-service-link");
    expect(linkNode.exists()).toBe(true);
    linkNode.simulate("click");
    expect(linkNode.text().toLowerCase()).toEqual(DisplayHeading.TERMS_OF_SERVICE_BUTTON.toLowerCase());
  });

  it("Contact Us Link", () => {
    const linkNode = wrapper.find(".contactus-link");
    expect(linkNode.exists()).toBe(true);
    linkNode.simulate("click");
    expect(linkNode.text().toLowerCase()).toEqual(DisplayHeading.CONTACT_US_BUTTON.toLowerCase());
  });

  it("Privacy Policy Link", () => {
    const linkNode = wrapper.find(".privacy-policy-link");
    expect(linkNode.exists()).toBe(true);
    linkNode.simulate("click");
    expect(linkNode.text().toLowerCase()).toEqual(DisplayHeading.PRIVACY_POLICY_BUTTON.toLowerCase());
  });

  it("Ads Tracking Link", () => {
    const linkNode = wrapper.find(".ads-tracking-link");
    expect(linkNode.exists()).toBe(true);
    linkNode.simulate("click");
    expect(linkNode.text().toLowerCase()).toEqual(DisplayHeading.ADS_TRACKING_BUTTON.toLowerCase());
  });

  it("Tasty Rewards Link", () => {
    const linkNode = wrapper.find(".tastyrewards-link");
    expect(linkNode.exists()).toBe(true);
    linkNode.simulate("click");
    expect(linkNode.text()).toEqual("Tasty Rewards");
  });

  it("Website Accessibility Link", () => {
    const linkNode = wrapper.find(".website-accessibility-link");
    expect(linkNode.exists()).toBe(true);
    linkNode.simulate("click");
    expect(linkNode.text().toLowerCase()).toEqual(DisplayHeading.WEBSITE_ACCESSIBILITY.toLowerCase());
  });

  it("Toggle click", () => {
    wrapper.find(".toggle-icon").simulate("click");
  });
});
