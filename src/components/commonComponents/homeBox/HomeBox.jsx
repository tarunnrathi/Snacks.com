import { Grid } from "@mui/material";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { trackEvent, EventNames } from "../../../appinsights/EventTrack";
import { SelectedLinkItem } from "../../../config/amplitude/SnacksAmplitude";
import {
  METHOD,
  PAGENAME,
  SELECTEDEVENTNAME,
} from "../../../config/amplitude/Taxonomy.constants";
import "./homeBox.scss";

export default class HomeBox extends Component {
  render() {
    const { customClass, heading, description, viewAllText, viewAllLink } =
      this.props;

    let reload = () => {
      trackEvent(
        viewAllLink === "/profile?order"
          ? EventNames.Action.ACTION_SHOW_PREVIOUS_ORDERS
          : EventNames.Action.ACTION_SHOW_EVERYTHING,
        EventNames.Event.EVENT_BUTTON_PRESS,
        window.location.origin,
        window.location.pathname
      );
      heading &&
        SelectedLinkItem(SELECTEDEVENTNAME.HOMELINK, METHOD.HOMEBOTTOM, {
          PageTitle: PAGENAME.LOGGEDINHOME,
          itemName: heading.replace(/\s+/g, ""),
        });
      window.location = viewAllLink;
    };
    return (
      <Grid
        item
        xs={12}
        lg={6}
        sm={6}
        className={`home-box-item ${customClass || ""}`}
      >
        <Link
          className="home-remove-decor"
          to={viewAllLink}
          aria-label={`${viewAllText} ${customClass}`}
          onClick={reload}
        >
          <div className="home-text">
            <h2 className="home-title">{heading}</h2>
            <p className="home-content">{description}</p>
            <div
              className="home-link"
              aria-label={`${viewAllText} ${customClass}`}
            >
              {viewAllText}
            </div>
          </div>
        </Link>
      </Grid>
    );
  }
}
