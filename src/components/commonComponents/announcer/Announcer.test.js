import React from "react";
import { shallow } from "enzyme";
import Announcer from "./Announcer";

describe("Announcer component", () => {
  it("Render announcer component without crashing", () => {
    let wrapper = shallow(<Announcer messageAnnounce="1 item delete from cart"/>);
    expect(wrapper.find('div').text()).toBe('1 item delete from cart');
  });
});
