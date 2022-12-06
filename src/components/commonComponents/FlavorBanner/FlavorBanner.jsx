import { Grid } from "@mui/material";
import React from "react";
import "./FlavorBanner.scss";

const FlavorBanner = ({ flavorNotes }) => {
  return (
    // <Container className="container-root">
      <Grid item sm={12} className="crumbs">
        {flavorNotes.items.length > 0 && (
          <div
            style={{
              backgroundColor: flavorNotes.backgroundColor
                ? flavorNotes.backgroundColor
                : "#0BB9FA",
            }}
            className="ticker-wrap"
          >
            <div className="ticker">
              {flavorNotes.items?.map((element, index) => {
                return (
                  <React.Fragment key={index}>
                    <span
                      style={{
                        color: flavorNotes.textColor
                          ? flavorNotes.textColor
                          : "#000000",
                      }}
                      className="ticker-item"
                    >
                      {element}
                    </span>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        )}
      </Grid>
    // </Container>
  );
};

export default FlavorBanner;
