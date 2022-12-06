import React from "react";
import { shallow, mount } from "enzyme";
import AdsTracking from "./adsTracking";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import APIUtil from "../../config/APIUtil";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const apiRespone = {
  success: true,
  message: null,
  data: [
    {
      contentHeading: "ABOUT FRITO-LAY\u0027S ADS \u0026 TRACKING",
      content:
        "\u003Cdiv class=\u0022general-body\u0022\u003E\u003Cstrong\u003EWe Use Tracking Technology\u003C/strong\u003E\n\u003Cp\u003EWe collect personal information about users over time and across different websites when you use this website or service. We also have third parties that collect personal information this way. To do this, we \u2013 or vendors we have hired \u2013 use several common data collection technologies including cookies, pixel tags, and similar technologies. These technologies are used to understand the activities and behaviors of our consumers and website visitors. We do this for many reasons, including the following:\u003C/p\u003E\n\n\u003Cul\u003E\n\t\u003Cli\u003ETo recognize new visitors to our websites\u003C/li\u003E\n\t\u003Cli\u003ETo recognize past visitors\u003C/li\u003E\n\t\u003Cli\u003ETo present more personalized content, to improve your website experience, optimize your browser experience, and provide site and service enhancements\u003C/li\u003E\n\t\u003Cli\u003ETo serve customized advertising (whether on our website or others you visit)\u003C/li\u003E\n\t\u003Cli\u003ESo we can better understand our audience, our customers, our website visitors, and their respective interests\u003C/li\u003E\n\u003C/ul\u003E\n\n\u003Cp\u003E\u003Cstrong\u003EWe Engage in Interest-Based Advertising\u003C/strong\u003E\u003Cbr /\u003E\nFrito-Lay displays interest-based advertising using information you make available to us when you interact with us or our partners. For example, we might look at your browsing behavior. We might look at these activities on our website or the websites of others. We work with third parties who help gather this information. This allows us to provide you with more useful and relevant ads. We (or our partners) gather this information on our platforms. These include websites, emails or apps. This information may also be gathered on third-party platforms.\u003C/p\u003E\n\n\u003Cp\u003E\u003Cstrong\u003EYou have Options Over the Interest Based Ads You See\u003C/strong\u003E\u003Cbr /\u003E\nThe third parties we work with participate in the Self-Regulatory Program for Online Behavioral Advertising. This program provides consumers with the ability to opt-out of having their online behavior recorded and used for advertising purposes. If you want to opt out, visit \u003Ca href=\u0022https://www.aboutads.info/choices/\u0022 tabindex=\u0022-1\u0022\u003Ehttps://www.aboutads.info/choices/\u003C/a\u003E. Choices you make are browser and device specific.\u003C/p\u003E\n\n\u003Cp\u003E\u003Cstrong\u003EHow to Control Tracking Technology\u003C/strong\u003E\u003Cbr /\u003E\nYou may control our use of cookies. How you do so depends on the type of cookie. You can configure your browser to reject browser cookies. To control flash cookies go to \u003Ca href=\u0022https://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager07.html\u0022 tabindex=\u0022-1\u0022\u003Ehttps://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager07.html\u003C/a\u003E. Why? Because flash cookies do not reside in your browser, and thus your browser settings will not affect them.\u003C/p\u003E\n\n\u003Cp\u003E\u003Cstrong\u003ENOTE:\u003C/strong\u003E If you configure your computer to block cookies, you may not be able to access certain functionality on our site. Options you select are browser and device specific, and if you block or delete cookies, not all of the tracking that we have described in this policy will stop.\u003C/p\u003E\n\n\u003Cp\u003ESome browsers have a \u201cDo Not Track\u201d feature that lets you tell websites that you do not want to have your online activities tracked. These features are not yet uniform, so we are not currently set up to respond to those signals.\u003C/p\u003E\n\u003C/div\u003E\n",
    },
  ],
};
const reducer = {
  privacyPolicy: apiRespone,
};
const store = mockStore({ reducer });

describe("AdsTracking component", () => {
  const div = window.document.createElement("div");
  div.setAttribute("id", "body");
  window.document.body.appendChild(div);
  const props = {
    privacyPolicy: apiRespone,
    actionContentListPrivacyPolicy: jest
      .fn()
      .mockImplementation(() => Promise.resolve({ data: apiRespone })),
  };
  const wrapper = shallow(
    <AdsTracking.WrappedComponent store={store} {...props} />
  );

  it("renders AdsTracking components without crashing", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("test scenarios for componentDidMount function", () => {
    //when APi returns success = false
    wrapper.setProps({ privacyPolicy: { success: false } });
    wrapper.instance().componentDidMount();

    //when APi returns success response
    APIUtil.postMethod = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ data: apiRespone }));
    wrapper.instance().componentDidMount();

    //when APi throw error
    APIUtil.postMethod = jest
      .fn()
      .mockImplementation(() => Promise.reject({ data: { success: false } }));
    wrapper.instance().componentDidMount();
  });

  it("test componentWillUnmount function", () => {
    wrapper.instance().componentWillUnmount();
  });
});
