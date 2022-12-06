import React from "react";
import { shallow } from "enzyme";
import Filters from "./filters";

describe("Filters component", () => {

  const wrapper = shallow(
    <Filters />
  );

  it("renders Filters components without crashing", () => {
    expect(wrapper).toMatchSnapshot();
  });

});