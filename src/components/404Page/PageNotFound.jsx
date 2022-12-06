import { Button, Typography } from "@mui/material";
import React, { Component } from "react";
import {
  ViewedPage,
  ClickedButton,
} from "../../config/amplitude/SnacksAmplitude";
import {
  PAGENAME,
  BUTTONNAME,
} from "../../config/amplitude/Taxonomy.constants";

export default class PageNotFound extends Component {
  componentDidMount() {
    ViewedPage(PAGENAME.SOMETHINGWENTWRONG);
  }

  render() {
    return (
      <div className="common-box">
        <div className="common-box-header">
          <Typography variant="h2">Error Page</Typography>
        </div>
        <div className="common-box-body">
          <h4>Something went wrong on server, please try again</h4>
        </div>
        <div className="button-group text-right">
          <Button
            type="button"
            variant="contained"
            color="primary"
            className="btn-mui btn-blue"
            id="page-reload"
            onClick={() => {
              ClickedButton(BUTTONNAME.RELOAD, PAGENAME.SOMETHINGWENTWRONG, {
                PageTitle: PAGENAME.SOMETHINGWENTWRONG,
              });
              window.location.assign('/');
            }}
            aria-label="submit Contact"
          >
            Reload
          </Button>
        </div>
      </div>
    );
  }
}
