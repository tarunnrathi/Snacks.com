import { Grid } from "@mui/material";
import React from "react";
import "./snacksComFeatures.scss";

const SnacksComFeatures = () => {
  let freeShipText = sessionStorage.getItem("freeShipping") ? sessionStorage.getItem("freeShipping").toLowerCase() : "";
  if (freeShipText) {
    freeShipText = freeShipText.charAt(0).toUpperCase() + freeShipText.slice(1);
  }

  return (
    <div className="aboutSnacksContainer">
      <Grid container className="aboutSnacks">
        <Grid item lg={7} md={7} sm={12} className="left">
          <h6>
            Want. All. <br className="desktopOnly" />
            Snacks.
          </h6>
          <p>
            So many crunchy, cheesy, sweet, and savory reasons to try
            Snacks.com.
          </p>
        </Grid>
        <Grid item lg={5} md={5} sm={12} className="right">
          <div className="right-item mb-30">
            <img src="/www/images/redesign/home-star.svg" alt="snacks.com" />
            <div>
              <span>Snacks.com exclusives</span>
              <p>
                For connoisseurs on the hunt for the latest, greatest, and
                rarest snacks.
              </p>
            </div>
          </div>
          <div className="right-item mb-30">
            <img src="/www/images/redesign/home-cup.svg" alt="snacks.com" />
            <div>
              <span>One-stop snack shop</span>
              <p>
                From Doritos to Lays to Cheetos and beyond. Get ‘em all here.
              </p>
            </div>
          </div>
          <div className="right-item">
            <img src="/www/images/redesign/home-cube.svg" alt="snacks.com" />
            <div>
              <span>{freeShipText}</span>
              <p>
                Load up on snacks, we’ll cover shipping. Pretty sweet deal, eh?
              </p>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default SnacksComFeatures;
