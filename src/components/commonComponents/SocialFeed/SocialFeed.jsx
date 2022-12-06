import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import "./SocialFeed.scss";

const images = [
  "www/images/redesign/social-1.png",
  "www/images/redesign/social-2.png",
  "www/images/redesign/social-3.png",
  "www/images/redesign/social-4.png",
];

const SocialFeed = () => {
  return (
    <>
      <div className="social-header">
        <h2>Take a bite @snacksfritolay</h2>
        <Link to="#">FOLLOW US</Link>
      </div>
      <Grid container justifyContent="center" spacing={0}>
        {images.map((item) => {
          return (
            <Grid key={item} item xs={6} md={3} className="img-wrapper">
              <img src={item} />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default SocialFeed;
