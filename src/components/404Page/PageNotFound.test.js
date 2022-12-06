import React from "react";
import { shallow } from "enzyme";
import PageNotFound from "./PageNotFound";
import { Typography } from "@mui/material";

describe("PageNotFound component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<PageNotFound />);
  });

  it("renders PageNotFound components without crashing", () => {
    shallow(<PageNotFound />);
  });

  it("renders PageNotFound components Heading", () => {
    const header = (
      <div className="common-box-header">
        <Typography variant="h2">Error Page</Typography>
      </div>
    );

    expect(wrapper.contains(header)).toEqual(true);
  });

  it("renders PageNotFound components Sub Heading", () => {
    const subHeader = (
      <div className="common-box-body">
        <h4>Something went wrong on server, please try again</h4>
      </div>
    );
    expect(wrapper.contains(subHeader)).toEqual(true);
    wrapper.find("#page-reload").simulate("click");
  });
});
