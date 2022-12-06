import React from "react";
import { shallow } from "enzyme";
import configureMockStore from "redux-mock-store";
import Footer from "./Footer";
import { DisplayHeading } from "../../../../config/constants/content.constant";

const initialState = {
  reducer: {
    isAuthenticated: true,
  },
};

const mockStore = configureMockStore();
let wrapper = null;

beforeEach(() => {
  //creates the store with any initial state or middleware needed
  const store = mockStore(initialState);
  wrapper = shallow(<Footer store={store} />)
    .dive()
    .dive();
});

describe("Footer component", () => {
  it("Footer component should renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("Footer logo exists", () => {
    expect(wrapper.find(".footer-logo").exists()).toBe(true);
  });

  it("About us Link", () => {
    const linkNode = wrapper.find(".aboutus-footer-link");
    expect(linkNode.exists()).toBe(true);
    linkNode.simulate("click");
    expect(linkNode.text()).toEqual(DisplayHeading.ABOUT_US);
  });

  it("Contact Us Link", () => {
    const linkNode = wrapper.find(".contactus-footer-link");
    expect(linkNode.exists()).toBe(true);
    linkNode.simulate("click");
    expect(linkNode.text()).toEqual(DisplayHeading.CONTACT_US_BUTTON);
  });

  it("FAQ Link", () => {
    const linkNode = wrapper.find(".faq-footer-link");
    expect(linkNode.exists()).toBe(true);
    linkNode.simulate("click");
    expect(linkNode.text()).toEqual(DisplayHeading.FAQ);
  });

  it("Snacks.Com Link", () => {
    const linkNode = wrapper.find(".snackscom-footer-link");
    expect(linkNode.exists()).toBe(true);
    linkNode.simulate("click");
    expect(linkNode.text()).toEqual("Snacks.Com");
  });

  it("Privacy Policy Link", () => {
    const linkNode = wrapper.find(".privacypolicy-footer-link");
    expect(linkNode.exists()).toBe(true);
    linkNode.simulate("click");
    expect(linkNode.text()).toEqual(DisplayHeading.PRIVACY_POLICY_BUTTON);
  });

  it("Terms of Use Link", () => {
    const linkNode = wrapper.find(".termsofuse-footer-link");
    expect(linkNode.exists()).toBe(true);
    linkNode.simulate("click");
    expect(linkNode.text()).toEqual(DisplayHeading.TERMS_OF_USE);
  });

  it("About Our Ads Link", () => {
    const linkNode = wrapper.find(".aboutourads-footer-link");
    expect(linkNode.exists()).toBe(true);
    linkNode.simulate("click");
    expect(linkNode.text()).toEqual(DisplayHeading.ABOUT_OUR_ADS);
  });

  it("Unsubscribe Link", () => {
    const linkNode = wrapper.find(".unsubscribe-footer-link");
    expect(linkNode.exists()).toBe(false);
    // linkNode.simulate("click");
    // expect(linkNode.text()).toEqual(DisplayHeading.Unsubscribe);
  });

  it("Canada link click", () => {
    wrapper.find(".ca").simulate("click");
    wrapper.setState({ menuToggle: false, countryVal: "Canada" });
  });

  it("Country change click", () => {
    wrapper.find(".lang-drop-btn").simulate("click");
    wrapper.setState({ menuToggle: true });
  });
});
