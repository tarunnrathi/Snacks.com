import React from "react";
import { shallow } from "enzyme";

import Breadcrumbs from "./Breadcrumbs";

const crumbs = [
  {
    label: "Home",
    link: "/",
  },
  {
    label: "Savoury Snacks",
    link: "/productlist",
  },
  {
    label: "Chips",
  },
];

it("should render correctly with given props", () => {
  const component = shallow(<Breadcrumbs crumbs={crumbs} />);
  expect(component).toMatchSnapshot();
});

it("should render correctly without given props", () => {
  const component = shallow(<Breadcrumbs />);
  expect(component).toMatchSnapshot();
});
