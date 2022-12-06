import React from "react";
import { Link } from "react-router-dom";
import "./Breadcrumbs.scss";
import { useState } from "react";
import { Button, Container, Grid } from "@mui/material";

const Breadcrumbs = ({ crumbs }) => {
  if (!crumbs || crumbs.length === 0) return "";

  const [mobView, setMobView] = useState(false);

  return (
    <Container className="container-root">
      <Grid item sm={12} className="crumbs">
        <div className="crumbs-desktop">
          {crumbs.map((item) => {
            return (
              <React.Fragment key={item.label}>
                {item.link ? (
                  <>
                    <Link to={item.link} className="label">
                      {item.label}
                    </Link>
                    <span>&nbsp;/&nbsp;</span>
                  </>
                ) : (
                  <span className="label">{item.label}</span>
                )}
              </React.Fragment>
            );
          })}
        </div>
        <div className="crumbs-mobile">
          <Button>All Snacks</Button>
        </div>
      </Grid>
    </Container>
  );
};

export default Breadcrumbs;
