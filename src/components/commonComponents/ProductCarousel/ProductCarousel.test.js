import React from "react";
import { shallow } from "enzyme";

import ProductCarousel from "./ProductCarousel";

const gallery = [
  {
    original:
      "https://ospep-develop.azurefd.net/www/images/30-count-multipack.png",
    thumbnail:
      "https://ospep-develop.azurefd.net/www/images/30-count-multipack.png",
  },
  {
    original:
      "https://digitalassets.pepsico.com/m/f886542cc32dd948/original/00028400361415_C1C1.png",
    thumbnail:
      "https://digitalassets.pepsico.com/m/f886542cc32dd948/original/00028400361415_C1C1.png",
  },
  {
    original:
      "https://digitalassets.pepsico.com/m/16b7e90d916e4184/original/00028400324069_C1C1.png",
    thumbnail:
      "https://digitalassets.pepsico.com/m/16b7e90d916e4184/original/00028400324069_C1C1.png",
  },
];

it("should render correctly with given props", () => {
  const component = shallow(<ProductCarousel gallery={gallery} />);
  expect(component).toMatchSnapshot();
});

it("should render correctly without given props", () => {
  const component = shallow(<ProductCarousel />);
  expect(component).toMatchSnapshot();
});
