import React from "react";
import { shallow } from "enzyme";
import MinOrderNotification from "./MinOrderNotification";

describe("MinOrderNotification component", () => {
  it("MinOrderNotification component should renders correctly", () => {
    const wrapper = shallow(
      <MinOrderNotification message="min order value is $15" />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
