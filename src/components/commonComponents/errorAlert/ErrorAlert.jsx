import React, { memo } from "react";
// css
import "./errorAlert.scss";
// libarary
import { Card, CardContent } from "@mui/material";
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';

const ErrorAlert = ({ msg }) => {
  return (
    <>
      <Card className="alert-box-card" role="alert">
        <CardContent className="alert-box-card-content">
          <div className="alert-box-card-content-header">
            <WarningRoundedIcon />
            <span className="alert-box-card-content-header-title">{msg}</span>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default memo(ErrorAlert);
