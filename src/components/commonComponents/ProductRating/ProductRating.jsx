import { Rating } from "@mui/material";
import React from "react";
import "./ProductRating.scss";

const ProductRating = ({ value, precision = 0.5, readOnly = true }) => {
  return (
    <Rating
      className="product-star-inner"
      name="simple-controlled"
      size="small"
      value={value}
      precision={precision}
      readOnly={readOnly}
    />
  );
};

export default ProductRating;
