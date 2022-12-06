import React, { Component } from "react";
import { Link } from "react-router-dom";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import {
  DisplayHeading,
  RegexUtil,
} from "../../../../config/constants/content.constant";
import {
  SelectedLinkItem,
  ClickedButton,
} from "../../../../config/amplitude/SnacksAmplitude";
import {
  FOOTERLINKS,
  FOOTERLINKS_TR,
  METHOD,
  SELECTEDEVENTNAME,
  BUTTONNAME,
} from "../../../../config/amplitude/Taxonomy.constants";
import UrlConstants from "./../../../../config/UrlConstants";
import "./SnacksFooter.scss";
import ZipcodeBox from "../../zipcodeBox/ZipcodeBox";
import { EventNames, trackEvent } from "../../../../appinsights/EventTrack";
import validateAPIResponse from "../../../ApiHelper";
import APIUtil from "../../../../config/APIUtil";
import SnacksAlertMessage from "./../../snacksAlertMessage/SnacksAlertMessage";
import { Grid, List, ListItem, Tooltip } from "@mui/material";

export class SnacksFooter extends Component {
  state = {
    menuToggle: false,
    errorMessage: null,
    zipError: false,
    zipCode: sessionStorage.getItem("Zipcode"),
    anchorEl: "",
    zipPopover: false,
    updatedZipCode: "",
    showLoadingSpinner: false,
  };

  zipPopoverOpen = (event) => {
    this.setState({ anchorEl: event.currentTarget });
    this.setState({ zipPopover: true });
    ClickedButton(BUTTONNAME.SHIPTO, METHOD.HEADER);
  };

  zipPopoverClose = () => {
    ClickedButton(BUTTONNAME.ZIPCODEUPDATECANCEL, METHOD.HEADER);
    this.setState(
      {
        zipPopover: false,
        zipError: true,
        errorMessage: "",
      },
      () => document.getElementById("body").classList.remove("has-toast")
    );
  };

  redirect(zipcode, response) {
    if (response.success && !!response.data) {
      sessionStorage.setItem("_lo_No", response.data.locationId);
      localStorage.setItem("_lo_No", response.data.locationId);

      sessionStorage.setItem("stateCode", response.data.stateCode);
      sessionStorage.setItem("sStateCode", response.data.stateCode);
      localStorage.setItem("stateCode", response.data.stateCode);
      this.setState({ updatedZipCode: zipcode }, () => {
        sessionStorage.setItem("Zipcode", zipcode);
        sessionStorage.setItem("shouldCheckItemAvailabilityCall", true);
        window.location.reload();
      });
    }
  }

  zipPopoverUpdate = () => {
    this.setState({ showLoadingSpinner: true });
    trackEvent(
      EventNames.Action.ACTION_UPDATE_ZIPCODE,
      EventNames.Event.EVENT_BUTTON_PRESS,
      window.location.origin,
      window.location.pathname
    );
    ClickedButton(BUTTONNAME.ZIPCODEUPDATE, METHOD.HEADER);
    // const zipcode = this.refs.updateZipCode && this.refs.updateZipCode.value;
    const zipcode =
      document.getElementById("zipcode") &&
      document.getElementById("zipcode")?.value;
    if (
      zipcode &&
      RegexUtil.ZIP_CODE_OR_NUM.test(zipcode) &&
      zipcode.length === 5
    ) {
      APIUtil.postMethod(UrlConstants.ZipValidation, { zipcode: zipcode }, true)
        .then((response) => {
          if (validateAPIResponse(response)) {
            response.data.success && this.redirect(zipcode, response.data);
            !response.data.success &&
              response.data.message &&
              this.setState(
                {
                  zipError: true,
                  errorMessage: response.data.message,
                  showLoadingSpinner: false,
                },
                () => document.getElementById("body").classList.add("has-toast")
              );
          }
        })
        .catch((error) => console.error("validate ZIP Code Api Failed", error));
    } else if (zipcode.length < 5) {
      this.setState(
        {
          zipError: true,
          errorMessage: "Zip code must be exactly 5 digits.",
          showLoadingSpinner: false,
        },
        () => document.getElementById("body").classList.add("has-toast")
      );
    }
  };

  checkZipcode = (event) => {
    event.preventDefault();
    var zipcode =
      document.getElementById("zipcode") &&
      document.getElementById("zipcode")?.value;
    if (!!zipcode && !RegexUtil.ZIP_CODE_OR_NUM.test(zipcode)) {
      this.setState(
        { zipError: false, errorMessage: "Zip Code must be a number type." },
        () => document.getElementById("body").classList.add("has-toast"),
        (document.getElementById("zipcode").value = "")
      );
    }
  };

  handleToggle = () => {
    this.setState((prevState) => ({ menuToggle: !prevState.menuToggle }));
  };

  handleClickAway = () => this.setState({ menuToggle: false });

  render() {
    const { menuToggle } = this.state;

    return (
      <div className="snacks-footer-wrapper">
        {this.state.errorMessage && (
          <SnacksAlertMessage fullWidth msg={this.state.errorMessage} />
        )}
        <div className={`grid-wrapper ${menuToggle ? "open" : "close"}`}>
          <Grid className="grid-block">
            <Grid container className="footer-header">
              <Grid item>
                <img
                  src="/www/images/FooterLogo.png"
                  alt="Snacks Logo"
                  className="snacks-logo"
                  width="128"
                  height="34"
                />
              </Grid>
              <Grid item>
                {/* <ClickAwayListener onClickAway={this.handleClickAway}> */}
                <div onClick={this.handleToggle} className="toggle-icon">
                  {menuToggle ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                </div>
                {/* </ClickAwayListener> */}
              </Grid>
            </Grid>
            {menuToggle && (
              <>
                <Grid container>
                  <ul className="links-block">
                    <li>
                      <a
                        href="https://www.fritolay.com/"
                        target={"_blank"}
                        aria-label="Fritolay.com - opens in new tab"
                        className="fritolay-link"
                        rel="noopener noreferrer"
                        onClick={() =>
                          SelectedLinkItem(
                            SELECTEDEVENTNAME.FOOTERLINK,
                            METHOD.FOOTER,
                            {
                              itemName: FOOTERLINKS.FRITOLAY,
                            }
                          )
                        }
                      >
                        Fritolay.com
                      </a>
                    </li>
                    <li>
                      {/* privacy policy */}
                      <a
                        href=" https://contact.pepsico.com/Snacks/privacy-policy"
                        target={"_blank"}
                        aria-label=""
                        className="privacy-policy-link"
                        rel="noopener noreferrer"
                        onClick={() =>
                          SelectedLinkItem(
                            SELECTEDEVENTNAME.FOOTERLINK,
                            METHOD.FOOTER,
                            {
                              itemName: FOOTERLINKS.PRIVACYPOLICY,
                            }
                          )
                        }
                      >
                        {DisplayHeading.PRIVACY_POLICY_BUTTON}
                      </a>
                    </li>
                    <li>
                      {/* terms of use */}
                      <a
                        href=" https://contact.pepsico.com/Snacks/terms-conditions"
                        target={"_blank"}
                        aria-label=""
                        className="terms-of-service-link"
                        rel="noopener noreferrer"
                        onClick={() =>
                          SelectedLinkItem(
                            SELECTEDEVENTNAME.FOOTERLINK,
                            METHOD.FOOTER,
                            {
                              itemName: FOOTERLINKS.TERMSERVICE,
                            }
                          )
                        }
                      >
                      {DisplayHeading.TERMS_OF_SERVICE_BUTTON}
                      </a>
                    </li>
                    <li>
                      {/* about our ads */}
                      <a
                        href="https://contact.pepsico.com/Snacks/about-our-ads"
                        target={"_blank"}
                        aria-label=""
                        className="ads-tracking-link"
                        rel="noopener noreferrer"
                        onClick={() =>
                          SelectedLinkItem(
                            SELECTEDEVENTNAME.FOOTERLINK,
                            METHOD.FOOTER,
                            {
                              itemName: FOOTERLINKS.ADSTRACKING,
                            }
                          )
                        }
                      >
                        {DisplayHeading.ADS_TRACKING_BUTTON}
                      </a>
                    </li>
                    <li>
                      <a
                        href={UrlConstants.tastyRewardUrl + "/en-us"}
                        target={"_blank"}
                        aria-label="Tasty Rewards - opens in new tab"
                        className="tastyrewards-link"
                        rel="noopener noreferrer"
                        onClick={() =>
                          SelectedLinkItem(
                            SELECTEDEVENTNAME.FOOTERLINK,
                            METHOD.FOOTER,
                            {
                              itemName: FOOTERLINKS_TR.TASTYREWARDS,
                            }
                          )
                        }
                      >
                        Tasty Rewards
                      </a>
                    </li>
                    <li>
                      <Link
                        to="/contactus"
                        aria-label={DisplayHeading.CONTACT_US_BUTTON}
                        className="contactus-link"
                        onClick={() =>
                          SelectedLinkItem(
                            SELECTEDEVENTNAME.FOOTERLINK,
                            METHOD.FOOTER,
                            {
                              itemName: FOOTERLINKS.CONTACTUS,
                            }
                          )
                        }
                      >
                        {DisplayHeading.CONTACT_US_BUTTON}
                      </Link>
                    </li>
                    {/* web accessibility */}
                    <li>
                      <a
                        href="https://contact.pepsico.com/Snacks/accessibility-statement"
                        target={"_blank"}
                        aria-label=""
                        className="website-accessibility-link"
                        rel="noopener noreferrer"
                        onClick={() =>
                          SelectedLinkItem(
                            SELECTEDEVENTNAME.FOOTERLINK,
                            METHOD.FOOTER,
                            {
                              itemName: FOOTERLINKS.WEBSITEACCESSIBILITY,
                            }
                          )
                        }
                      >
                        {DisplayHeading.WEBSITE_ACCESSIBILITY}
                      </a>
                    </li>
                  </ul>
                </Grid>
                <Grid container justifyContent="space-between">
                  {sessionStorage.getItem("Zipcode") ? (
                    <ZipcodeBox
                      zipPopoverOpen={this.zipPopoverOpen}
                      updatedZipCode={this.state.updatedZipCode}
                      zipPopover={this.state.zipPopover}
                      anchorEl={this.state.anchorEl}
                      zipPopoverClose={this.zipPopoverClose}
                      checkZipcode={this.checkZipcode}
                      zipPopoverUpdate={this.zipPopoverUpdate}
                      // updateZipCodeRef={updateZipCodeRef}
                    />
                  ) : null}
                  <Grid item>
                    <List className="social-links">
                      <ListItem>
                        <Tooltip
                          placement="top"
                          title={"Follow Snacks.com on Twitter"}
                        >
                          <a
                            href="https://twitter.com/FritoLay"
                            target={"_blank"}
                            aria-label="connect with twitter - opens in new tab"
                            className="twitter-link"
                            rel="noopener noreferrer"
                            onClick={() =>
                              SelectedLinkItem(
                                SELECTEDEVENTNAME.FOOTERLINK,
                                METHOD.FOOTER,
                                {
                                  itemName: FOOTERLINKS.TWITTER,
                                }
                              )
                            }
                          >
                            <img
                              src="www/images/icons/twitter-icon.svg"
                              alt="Twitter Icon"
                            />
                          </a>
                        </Tooltip>
                      </ListItem>

                      <ListItem>
                        <Tooltip
                          placement="top"
                          title={"Follow Snacks.com on Instagram"}
                        >
                          <a
                            href="https://instagram.com/fritolay"
                            target={"_blank"}
                            aria-label="connect with instagram - opens in new tab"
                            className="instagram-link"
                            rel="noopener noreferrer"
                            onClick={() =>
                              SelectedLinkItem(
                                SELECTEDEVENTNAME.FOOTERLINK,
                                METHOD.FOOTER,
                                {
                                  itemName: FOOTERLINKS.INSTAGRAM,
                                }
                              )
                            }
                          >
                            <img
                              src="www/images/icons/instagram-icon.svg"
                              alt="Instagram Icon"
                            />
                          </a>
                        </Tooltip>
                      </ListItem>

                      <ListItem>
                        <Tooltip
                          placement="top"
                          title={"Follow Snacks.com on Facebook"}
                        >
                          <a
                            href="https://facebook.com/FritoLay"
                            target={"_blank"}
                            aria-label="connect with facebook - opens in new tab"
                            className="facebook-link"
                            rel="noopener noreferrer"
                            onClick={() =>
                              SelectedLinkItem(
                                SELECTEDEVENTNAME.FOOTERLINK,
                                METHOD.FOOTER,
                                {
                                  itemName: FOOTERLINKS.FACEBOOK,
                                }
                              )
                            }
                          >
                            <img
                              src="www/images/icons/facebook-icon.svg"
                              alt="Facebook Icon"
                            />
                          </a>
                        </Tooltip>
                      </ListItem>
                    </List>
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>
        </div>
      </div>
    );
  }
}

export default SnacksFooter;
