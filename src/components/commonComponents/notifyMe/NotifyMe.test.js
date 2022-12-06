import React from "react";
import { shallow, mount } from "enzyme";
import NotifyMe from "./NotifyMe";
import configureMockStore from "redux-mock-store";
const mockStore = configureMockStore();
const reducer = {
  customerDetails: [{ id: "200" }],
};
const store = mockStore({ reducer });

describe("NotifyMe", () => {
  it("NotifyMe component should renders correctly", () => {
    const wrapper = shallow(
      <NotifyMe store={store} closeNotifyModal={jest.fn()} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
