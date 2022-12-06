import React, { Component } from "react";
// css
import "./footer.scss";
// library
import { Link, withRouter } from "react-router-dom";
// config
import APIUtil from "../../../config/APIUtil";
import UrlConstants from "../../../config/UrlConstants";
import {
  DisplayHeading,
  RegexUtil,
} from "../../../config/constants/content.constant";
import {
  SelectedLinkItem,
  ClickedButton,
} from "../../../config/amplitude/SnacksAmplitude";
import {
  FOOTERLINKS,
  METHOD,
  SELECTEDEVENTNAME,
  BUTTONNAME,
} from "../../../config/amplitude/Taxonomy.constants";
// common
import ZipcodeBox from "../zipcodeBox/ZipcodeBox";
import { EventNames, trackEvent } from "../../../appinsights/EventTrack";
import SnacksAlertMessage from "./../snacksAlertMessage/SnacksAlertMessage";
// utils
import validateAPIResponse from "../../ApiHelper";
import { Container, Grid, List, ListItem, Tooltip } from "@mui/material";
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined';

class Footer extends Component {
  state = {
    errorMessage: null,
    zipError: false,
    zipCode: sessionStorage.getItem("Zipcode"),
    anchorEl: "",
    zipPopover: false,
    updatedZipCode: "",
    showHolidayShopMenu: sessionStorage.getItem("holidayShopEnable")
      ? sessionStorage.getItem("holidayShopEnable")
      : false,
    showApiFailAlert: false,
    apiErrorMessage:
      "There is an unexpected error that occurred. Please reload to continue.",
    showLoadingSpinner: false,
    email: "",
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

  render() {
    const { theme, history } = this.props;
    let isStep = window.location.pathname === "/productlist";
    return (
      <footer className={`footer ${isStep ? "footer-steps" : ""} ${theme}`}>
        {this.state.errorMessage && (
          <SnacksAlertMessage fullWidth msg={this.state.errorMessage} />
        )}
        <Container className="container-root">
          <div className="footer-top">
            {/* logo */}
            <button
              className="logo-link"
              aria-label="Snacks.com Footer Logo"
              onClick={() => {
                history.push("/home");
                SelectedLinkItem(SELECTEDEVENTNAME.FOOTERLINK, METHOD.FOOTER, {
                  itemName: FOOTERLINKS.LOGO,
                });
              }}
            >
              <img
                className="logo"
                src="www/images/FooterLogo.png"
                alt={`${DisplayHeading.SITE_NAME} footer`}
                height="51"
                width="186"
              />
            </button>
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
          </div>
          <Grid container className="footer-content">
            <Grid item xs={12} md={12} lg={5} className={`logo-row ${theme}`}>
              <h6>GOOD NEWS ONLY!</h6>
              <p>
                Treat your inbox to exclusives, new product launches, fresh
                recipes, and more.
              </p>
              <div>
                <input
                  type="text"
                  value={this.state.email}
                  onChange={(e) => {
                    this.setState({
                      email: e.target.value,
                    });
                  }}
                  placeholder="Enter your email"
                  className="newsletter-email-input"
                />
                <button className="newsletter-email-button">SIGN UP</button>
              </div>
              <div className={`copyright ${theme}`}>
                {/* Social Icons start */}
                <List className={`social-links ${theme}`}>
                  <ListItem>
                    <Tooltip
                      placement="top"
                      title={"Follow Snacks.com on Facebook"}
                    >
                      <a
                        href="https://facebook.com/FritoLay"
                        target={"_blank"}
                        aria-label="connect with facebook - opens in new tab"
                        className={`facebook-social-link social-round ${theme}`}
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
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="#fff"
                          className="svg"
                        >
                          <title>facebook icon</title>
                          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                        </svg>
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
                        className={`instagram-social-link social-round ${theme}`}
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
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="#fff"
                          className="svg"
                        >
                          <title>instagram icon</title>
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                        </svg>
                      </a>
                    </Tooltip>
                  </ListItem>
                  <ListItem>
                    <Tooltip
                      placement="top"
                      title={"Follow Snacks.com on Twitter"}
                    >
                      <a
                        href="https://twitter.com/FritoLay"
                        target={"_blank"}
                        aria-label="connect with twitter - opens in new tab"
                        className={`twitter-social-link social-round ${theme}`}
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
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="#fff"
                          className="svg"
                        >
                          <title>twitter icon</title>
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                        </svg>
                      </a>
                    </Tooltip>
                  </ListItem>
                </List>
                {/* Social Icons end */}
              </div>
            </Grid>
            <Grid
              item
              container
              xs={12}
              md={12}
              lg={7}
              className="footer-links-container"
            >
              <Grid
                item
                sm={4}
                md={12}
                xs={12}
                className="footer-links-section mr-10"
              >
                <List className="sublinks">
                  <ListItem>
                    <h6 className="sublinks-heading">SUPPORT</h6>
                  </ListItem>
                  <ListItem>
                    <Link
                      to="/contactus"
                      aria-label="FAQ"
                      className="footer-btn-link"
                      onClick={() => {
                        SelectedLinkItem(
                          SELECTEDEVENTNAME.FOOTERLINK,
                          METHOD.FOOTER,
                          {
                            itemName: FOOTERLINKS.CONTACTUS,
                          }
                        );
                      }}
                    >
                      {DisplayHeading.FAQ}
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link
                      to="/returns-policy"
                      aria-label={DisplayHeading.SHIPPING_AND_DELIVERY}
                      className="footer-btn-link"
                      onClick={() => {
                        SelectedLinkItem(
                          SELECTEDEVENTNAME.FOOTERLINK,
                          METHOD.FOOTER,
                          {
                            itemName: FOOTERLINKS.SHIPPINGRETURN,
                          }
                        );
                      }}
                    >
                      {DisplayHeading.SHIPPING_AND_DELIVERY}
                    </Link>
                  </ListItem>
                  {/* <ListItem>
                    <Link
                      to="/returns-policy"
                      aria-label={DisplayHeading.RETURNS}
                      className="footer-btn-link"
                      onClick={() => {
                        SelectedLinkItem(
                          SELECTEDEVENTNAME.FOOTERLINK,
                          METHOD.FOOTER,
                          {
                            itemName: FOOTERLINKS.SHIPPINGRETURN,
                          }
                        );
                      }}
                    >
                      {DisplayHeading.RETURNS}
                    </Link>
                  </ListItem> */}
                  <ListItem>
                    <Link
                      to="/contactus"
                      aria-label={DisplayHeading.CONTACT_US_BUTTON}
                      className="footer-btn-link"
                      onClick={() => {
                        SelectedLinkItem(
                          SELECTEDEVENTNAME.FOOTERLINK,
                          METHOD.FOOTER,
                          {
                            itemName: FOOTERLINKS.CONTACTUS,
                          }
                        );
                      }}
                    >
                      {DisplayHeading.CONTACT_US_BUTTON}
                    </Link>
                  </ListItem>
                </List>
              </Grid>

              <Grid
                item
                sm={4}
                md={12}
                xs={12}
                className="footer-links-section mt-50 mr-10"
              >
                <List className="sublinks">
                  <ListItem>
                    <h6 className="sublinks-heading">ABOUT</h6>
                  </ListItem>

                  <ListItem>
                    <a
                      // href="https://contact.pepsico.com/Snacks/about-our-ads"
                      target={"_blank"}
                      aria-label=""
                      className="footer-btn-link"
                      rel="noopener noreferrer"
                    >
                      {DisplayHeading.ABOUT_US}
                    </a>
                  </ListItem>

                  <ListItem>
                    <a
                      href={UrlConstants.tastyRewardUrl}
                      aria-label="Tasty Rewards"
                      className="returns-policy-footer-link footer-btn-link"
                      onClick={() => {
                        SelectedLinkItem(
                          SELECTEDEVENTNAME.FOOTERLINK,
                          METHOD.FOOTER,
                          {
                            itemName: FOOTERLINKS.TASTY_REWARDS,
                          }
                        );
                      }}
                    >
                      {DisplayHeading.TASTY_REWARDS}{" "}
                      <LaunchOutlinedIcon fontSize="inherit" />
                    </a>
                  </ListItem>
                  <ListItem>
                    <a
                      href="https://www.fritolay.com/"
                      target={"_blank"}
                      aria-label="Fritolay.com - opens in new tab"
                      className="fritolay-footer-link"
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
                      Frito-lay <LaunchOutlinedIcon fontSize="inherit" />
                    </a>
                  </ListItem>
                </List>
              </Grid>
              <Grid
                item
                sm={4}
                md={12}
                xs={12}
                className="footer-links-section mt-50"
              >
                <List className="sublinks">
                  <ListItem>
                    <h6 className="sublinks-heading">QUICK WAYS TO SHOP</h6>
                  </ListItem>

                  <ListItem>
                    <a
                      // href="https://contact.pepsico.com/Snacks/about-our-ads"
                      target={"_blank"}
                      aria-label=""
                      className="footer-btn-link"
                      rel="noopener noreferrer"
                    >
                      New Arrivals
                    </a>
                  </ListItem>
                  <ListItem>
                    <a
                      // href="https://contact.pepsico.com/Snacks/about-our-ads"
                      target={"_blank"}
                      aria-label=""
                      className="footer-btn-link"
                      rel="noopener noreferrer"
                    >
                      Best Sellers
                    </a>
                  </ListItem>
                  {/* <ListItem>
                    <a
                      // href="https://contact.pepsico.com/Snacks/about-our-ads"
                      target={"_blank"}
                      aria-label=""
                      className="footer-btn-link"
                      rel="noopener noreferrer"
                    >
                      Premium Snacks
                    </a>
                  </ListItem> */}
                  <ListItem>
                    <button
                      // href="https://contact.pepsico.com/Snacks/about-our-ads"
                      target={"_blank"}
                      aria-label=""
                      className="footer-btn-link"
                      rel="noopener noreferrer"
                      onClick={() => {
                        history.push("/varietypack");
                      }}
                    >
                      Make Your Variety Pack
                    </button>
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Grid>
          <div className="bottom-item">
            <p className={`copyright-text ${theme}`}>
              © {new Date().getFullYear()} Frito-Lay North America, Inc. a
              Division of PepsiCo
            </p>
            <div>
              <a
                href=" https://contact.pepsico.com/Snacks/privacy-policy"
                target={"_blank"}
                aria-label=""
                className="bottom-item-link"
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
              <a
                href=" https://contact.pepsico.com/Snacks/terms-conditions"
                target={"_blank"}
                aria-label=""
                className="bottom-item-link"
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
            </div>
          </div>
        </Container>
      </footer>
    );
  }
}

export default withRouter(Footer);
