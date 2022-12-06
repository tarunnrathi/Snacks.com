import { Container, Grid } from "@mui/material";
import React from "react";

import "./FlavorNotes.scss";

const FlavorNotes = ({ flavorIcons, shortDescription, longDescription }) => {
  return (
    <Container className="container-root">
      <Grid
        container
        justifyContent="center"
        className="flavor-notes-container"
      >
        <Grid item md={6} sm={12}>
          <div className="left-cont">
            <h2>{shortDescription}</h2>
            <p>{longDescription}</p>
          </div>
        </Grid>
        <Grid item md={6} sm={12}>
          <div className="right-cont">
            <h4>Flavor notes</h4>
            <div className="icons-wrapper">
              {flavorIcons?.length > 0 &&
                flavorIcons.map((item) => {
                  return (
                    <div key={item.title}>
                      <img src={item.icon} />
                      <span>{item?.title}</span>
                    </div>
                  );
                })}
            </div>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FlavorNotes;
