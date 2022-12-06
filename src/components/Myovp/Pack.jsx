import { Grid } from "@mui/material";
import React from "react";
import useWindowDimensions from "../../utils/useWindowDimensions";
import { getLinkTag } from "../Utils";
import { ClickedButton } from "../../config/amplitude/SnacksAmplitude";
import { PAGENAME, METHOD } from "../../config/amplitude/Taxonomy.constants";
import "./pack.scss";

const Pack = ({ data }) => {
  const { width } = useWindowDimensions();

  const ctaClickHandler = (btnName, heading) => {
    ClickedButton(btnName.replace(/\s+/g, ""), METHOD.VARIETY, {
      PageTitle: PAGENAME.HOME,
      details: heading,
    });
  };

  return (
    <>
      <div
        className="myop-container"
        style={{
          backgroundImage: `url(${width > 500 ? data.src : data.mobile_src})`,
        }}
      >
        <Grid container>
          <Grid item sm={6} xs={6} className="left">
            {data.heading && (
              <h4
                className="main_contant"
                style={
                  data.heading_font_color
                    ? {
                        color: data.heading_font_color,
                      }
                    : null
                }
              >
                {data.heading}
              </h4>
            )}
            {data.description && (
              <p
                className="text_contant"
                style={
                  data.desc_font_color
                    ? {
                        color: data.desc_font_color,
                      }
                    : null
                }
              >
                {data.description}
              </p>
            )}
            {data.button_text &&
              getLinkTag({
                href: data.destination_link,
                className: "Btn",
                style: data.button_background
                  ? {
                      backgroundColor: data.button_background,
                      color: data.button_font_color,
                    }
                  : null,
                label: data.button_text,
                clickHandler: () =>
                  ctaClickHandler(data.button_text, data.heading),
              })}
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Pack;
