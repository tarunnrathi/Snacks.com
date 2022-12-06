import React, { Component } from "react";
import { Alert } from '@mui/material';
import { Link } from "react-router-dom";
import { MessagesUtil } from "../../../config/constants/content.constant";
import { Snackbar } from "@mui/material";

export default class SnacksAlertMessage extends Component {
  handleRedirect = (targetUrl) => {
    window.location.href = targetUrl;
  };

  render() {
    const { msg, fullWidth, handleClose, customClass } = this.props;
    return (
      <Snackbar
        open={msg ? true : false}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        className={`snackbar ${fullWidth && "snackbar-full"} ${customClass}`}
        aria-label={`${msg}`}
      >
        <Alert variant="filled" severity="error" onClose={handleClose}> 
        {/* MuiAlert */}
          {msg}
          {/* {customClass=="snackbar-freeShipping" ? <PriorityHighIcon fontSize="small" /> :""}{" "} */}
          {this.props.showContactLinkForAddress ? (
            <Link
              to="/contactus?opencontactform"
              aria-label="contactus"
              target="_blank"
            >
              {MessagesUtil.HELP_ME_VERIFY_TEXT}
            </Link>
          ) : (
            ""
          )}
          {this.props.showApiFailAlert ? (
            <Link
              to="#"
              onClick={() => this.handleRedirect(this.props.targetPageUrl)}
            >
              {MessagesUtil.API_FAIL_RELOAD_PAGE}
            </Link>
          ) : (
            ""
          )}
        </Alert>
      </Snackbar>
    );
  }
}
