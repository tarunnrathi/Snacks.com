import { Grid } from "@mui/material";
import React from "react";
import { ClickedButton } from "../../../../config/amplitude/SnacksAmplitude";
import { PAGENAME } from "../../../../config/amplitude/Taxonomy.constants";
import { getLinkTag } from "../../../Utils";
import "./promotionTiles.scss";

const Tile = ({
  heading,
  description,
  btnText,
  img,
  backgroundColor = "#ffffff",
  headingColor = "#ffffff",
  descriptionColor = "#ffffff",
  alt,
  target_url,
  reverse = false,
}) => {
  const ctaClickHandler = (btnName, heading) => {
    ClickedButton(btnName.replace(/\s+/g, ""), "HomePageTiles", {
      PageTitle: PAGENAME.HOME,
      details: heading,
    });
  };

  return (
    <Grid item md={4} lg={4} sm={12} xs={12} className="tile">
      <div
        className={`tile-content ${reverse ? "reverse" : ""}`}
        style={{
          backgroundColor: backgroundColor,
        }}
      >
        <div className="tile-content-top">
          <span
            style={{
              color: headingColor,
            }}
          >
            {heading}
          </span>
          <p
            style={{
              color: descriptionColor,
            }}
          >
            {description}
          </p>
          {getLinkTag({
            href: target_url,
            label: btnText,
            clickHandler: () => ctaClickHandler(btnText, heading),
          })}
        </div>
        <img src={img} alt={alt} />
      </div>
    </Grid>
  );
};

const PromotionTiles = ({ data }) => {
  return (
    <div className="promotionTilesContainer">
      <Grid container className="promotionTiles">
        {data.map((item, index) => {
          return (
            <Tile
              key={index}
              backgroundColor={item.backgroundColor}
              heading={item.heading}
              description={item.description}
              btnText={item.button_text}
              img={item.image}
              headingColor={item.heading_font_color}
              descriptionColor={item.desc_font_color}
              alt={item.alt}
              target_url={item.target_url}
              reverse={index % 2 === 1}
            />
          );
        })}
      </Grid>
    </div>
  );
};

export default PromotionTiles;
