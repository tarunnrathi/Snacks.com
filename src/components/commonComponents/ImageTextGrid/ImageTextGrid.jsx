import { Grid } from "@mui/material";
import React from "react";
import { getLinkTag } from "../../Utils";
import { Link } from "react-router-dom";

import "./ImageTextGrid.scss";

const ImageTextGrid = ({
  image,
  heading,
  description,
  ctaLabel,
  link,
  reverse = false,
  topImage,
  clickHandler,
}) => {
  return (
    <Grid container className={`content-wrapper ${reverse ? "reverse" : ""}`}>
      {image && (
        <Grid
          item
          lg={6}
          md={4}
          sm={12}
          className="content-wrapper-img-container"
        >
          <img
            className="content-wrapper-img"
            src={image}
            alt={"About Brand"}
          />
        </Grid>
      )}
      <Grid item lg={6} md={8} sm={12} className="content-wrapper-right">
        <div className="content-wrapper-right-content">
          {topImage && (
            <div className="img-head">
              <img src="www/images/redesign/recipe.svg" alt="recipe" />
            </div>
          )}
          {heading && <h3>{heading}</h3>}
          {description && <p>{description}</p>}
          {ctaLabel &&
            getLinkTag({
              href: link,
              label: ctaLabel,
              clickHandler: clickHandler,
            })}
        </div>
      </Grid>
    </Grid>
  );
};

export default ImageTextGrid;
