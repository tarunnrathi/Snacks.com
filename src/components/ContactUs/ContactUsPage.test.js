import React from "react";
import { shallow } from "enzyme";
import ContactUsPage from "./ContactUsPage";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("ContactUs component", () => {
  let wrapper;
  const reducer = {
    faqCategory: "faqCategory",
  };
  const responseData = { success: true, message: "" };
  const store = mockStore({ reducer });
  const props = {
    match: {
      path: "/contactform",
    },
    actionFaqCategory: {
      type: "BIND_COMMENTS",
    },
    actionFaqCategory: jest
      .fn()
      .mockImplementation(() => Promise.resolve({ data: { success: true } })),
  };

  wrapper = shallow(<ContactUsPage.WrappedComponent store={store} {...props} />);

  it("renders ContactUs components without crashing", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
