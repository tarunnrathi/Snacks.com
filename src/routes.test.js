import React from "react";
import { shallow } from "enzyme";
import configureMockStore from "redux-mock-store";
import Routes from "./routes";
import APIUtil from "./config/APIUtil";

const mockStore = configureMockStore();
const reducer = {
  customerDetails: [],
};
const store = mockStore({ reducer });

describe("Mini Cart component", () => {
  const props = {
    history: {
      push: jest.fn(),
    },
    actiongetFilterData: jest
      .fn()
      .mockImplementation(() => Promise.resolve({ data: { success: 200 } })),
  };
  // mocking handshaking API
  APIUtil.postAPIKeyMethod = jest.fn().mockImplementation(() =>
    Promise.resolve({
      data: {
        success: true,
        message: "",
        data: {
          sessionId: "_ss_1620112195753i8bb0f24c4672c",
          rnduts:
            "05JjnWt6YHOtcKSXinmTyKvBuoyhuKi9rbael89zyY+ZqaHM35mQc+Jxoa+XitWthLShh5p0n56Dpayt",
          encstr:
            "asOfY4qsrpKzd5yKiFh6fYuJsIKvh5uVrH6uvFWZfcWPp3K0mtaCjqbdppuTeprYaVulk5xlYmiUaGZrl5bPlw==",
          geoip: {
            postal: "06089",
            stateCode: "TX",
            locationId: "12199",
            customerIp: "223.236.18.153",
          },
        },
      },
    })
  );

  const wrapper = shallow(<Routes.WrappedComponent store={store} {...props} />);

  it("Render Routes component correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("test onAuthRequired function", () => {
    wrapper.instance().onAuthRequired();
  });

  it("test callCheckMCItemAvailability function", () => {
    //mocking checkItemAvailability API
    APIUtil.postMethod = jest.fn().mockImplementation(() =>
      Promise.resolve({
        data: {
          success: true,
          message: "",
          data: { productAvailable: true, alternateOrderLocationId: "12205" },
        },
      })
    );
    wrapper.instance().callCheckMCItemAvailability(75024, 12199);
  });

  it("test UNSAFE_componentWillMount scenarios", () => {
    //mocking checkItemAvailability API
    APIUtil.postMethod = jest.fn().mockImplementation(() =>
      Promise.resolve({
        data: {
          success: true,
          message: "",
          data: { productAvailable: true, alternateOrderLocationId: "12205" },
        },
      })
    );
    window.sessionStorage.setItem("_ss_i", "iuwgfuy3uy4gr3htv3u4");
    window.sessionStorage.setItem("shouldCheckItemAvailabilityCall", true);
    wrapper.instance().UNSAFE_componentWillMount();

    //when API return error
    window.sessionStorage.removeItem("_ss_i");
    APIUtil.postAPIKeyMethod = jest
      .fn()
      .mockImplementation(() =>
        Promise.reject({ data: { success: false, message: "error" } })
      );
    wrapper.instance().UNSAFE_componentWillMount();

    //when data is empty
    APIUtil.postAPIKeyMethod = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve({ data: { success: false, data: {} } })
      );
    wrapper.instance().UNSAFE_componentWillMount();
  });
});
