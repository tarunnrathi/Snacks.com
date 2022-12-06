import { CircularProgress } from "@mui/material";
import React from "react";

function Spinner() {
  return (
    <div className="loader-outer">
      <div className="loader-inner">
        <CircularProgress />
      </div>
    </div>
  );
}

export default Spinner;
