import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ContactUsLeftPanel from "./ContactUsLeftPanel";

configure({ adapter: new Adapter() });

const questions = [
  {
    id: "1",
    name: "Left Menu",
  },
];

const mockUseLocationValue = {
  pathname: "/contactus",
  search: "?opencontactform",
  hash: "",
  state: null,
};

jest.mock("react-router", () => ({
  useLocation: jest.fn().mockImplementation(() => {
    return mockUseLocationValue;
  }),
}));
const wrapper = shallow(
  <ContactUsLeftPanel
    questions={questions}
    location=""
    updateQuestion={jest.fn()}
  />
);

describe("ContactUs component", () => {
  it("ContactUs component should renders correctly", () => {
    expect(wrapper).toMatchSnapshot();

    wrapper.find("#question1").simulate("click");
    wrapper.find("#customerContact").simulate("click");
    wrapper.find("#customerPrivacyPolicy").simulate("click");
    wrapper.find("#customerTermsOfService").simulate("click");
    wrapper.find("#customerAdsAndTracking").simulate("click");
  });
});
