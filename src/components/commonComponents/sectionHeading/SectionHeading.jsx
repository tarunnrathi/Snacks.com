import { Button } from "@mui/material";
import React, { Component } from "react";
import "./sectionHeading.scss";

export default class SectionHeading extends Component {
  getShowAllContent = () => {
    const {
      showAllTitle,
      showAllPosition,
      isLink,
      isFunction,
      ariaLabelShowAll,
    } = this.props;

    if (isFunction) {
      return (
        <Button
          onClick={isFunction}
          aria-label={ariaLabelShowAll || showAllTitle}
          className={`show-all align-${showAllPosition}`}
        >
          {showAllTitle}
        </Button>
      );
    }
    if (isLink) {
      return (
        <a
          href={isLink}
          aria-label={ariaLabelShowAll || showAllTitle}
          className={`show-all align-${showAllPosition}`}
        >
          {showAllTitle}
        </a>
      );
    }
    return (
      <span className={`show-all align-${showAllPosition}`}>
        {showAllTitle}
      </span>
    );
  };
  render() {
    const {
      classField,
      heading,
      ariaLabelHeading,
      isShowAllVisible,
      subHeading,
      ariaLabelSubHeading,
      horizontalView,
      tagH1,
    } = this.props;

    return (
      <div
        className={`${classField}-heading heading ${
          horizontalView ? "heading-horizontal" : ""
        }`}
      >
        <div className="sticky-title-wrapper">
          {heading && tagH1 && (
            <h1
              className="sticky-title"
              aria-label={ariaLabelHeading || heading}
            >
              {heading}
            </h1>
          )}
          {heading && !tagH1 && (
            <h3
              className="sticky-title"
              aria-label={ariaLabelHeading || heading}
            >
              {heading}
            </h3>
          )}
          {subHeading && (
            <p
              className="sub-heading"
              aria-label={ariaLabelSubHeading || subHeading}
            >
              {subHeading}
            </p>
          )}
        </div>
        {!horizontalView && isShowAllVisible && this.getShowAllContent()}
      </div>
    );
  }
}
