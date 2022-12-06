import React, { Component } from "react";
import { connect } from "react-redux";
import CloseIcon from '@mui/icons-material/Close';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import "./footer.scss";
import { DisplayHeading } from "../../../../config/constants/content.constant";
import { SelectedLinkItem } from "../../../../config/amplitude/SnacksAmplitude";
import {
  FOOTERLINKS,
  METHOD,
  SELECTEDEVENTNAME,
} from "../../../../config/amplitude/Taxonomy.constants";
import ReactHtmlParser from "react-html-parser";
import UrlConstants from "./../../../../config/UrlConstants";
import ReactPixel from "react-facebook-pixel";
import SnacksFooter from "../snacksFooter/SnacksFooter";
import { EventNames, trackEvent } from "../../../../appinsights/EventTrack";
import SignUp from "../signUp/SignUp";
import TRForgotPassword from "../forgotPassword";
import TRLogin from "../login";
import { Button, ClickAwayListener, Container, Dialog, DialogContent, Grid, List, ListItem, MenuItem, MenuList } from "@mui/material";

export class Footer extends Component {
  state = {
    menuToggle: false,
    countryVal: "United States",
    showSignup: false,
    showLoginModal: false,
    showTRForgotPasswordModal: false,
  };

  handleToggle = () => {
    this.setState((prevState) => ({ menuToggle: !prevState.menuToggle }));
    SelectedLinkItem(SELECTEDEVENTNAME.FOOTERLINK, METHOD.FOOTER, {
      itemName: FOOTERLINKS.CHANGECOUNTRY,
    });
  };

  handleClickAway = () => this.setState({ menuToggle: false });

  handleClose = (value) => {
    this.setState({ menuToggle: false, countryVal: value });
    if (value == "United States") {
      window.location.href = UrlConstants.tastyRewardUrl + "/en-us/";
    } else {
      window.location.href = "https://shop.tastyrewards.ca/";
    }
  };

  hideCountryDropdown = (event) => {
    if (event.keyCode === 27) {
      this.setState({ menuToggle: false });
      if (document.activeElement.parentElement.id == "menu-list-grow") {
        document.querySelector(".sublinks .lang-drop-btn") &&
          document.querySelector(".sublinks .lang-drop-btn").focus();
      }
    }
  };

  componentDidMount() {
    document.addEventListener("keydown", this.hideCountryDropdown);
  }

  render() {
    let isStep = window.location.pathname === "/productlist";
    let isVariety = window.location.pathname === "/varietypack";
    ReactPixel.track("ViewContent");
    const isAuthenticated = this.props.isAuthenticated;

    return (
      <>
        <SnacksFooter />
        <Dialog
          open={this.state.showSignup}
          onClose={() => {
            // this.setState({ showSignup: false });
          }}
          disableBackdropClick
          maxWidth={false}
          scroll={"body"}
          classes={{
            paper: "modal-account modal-login modal-paper",
            root: "modal-stack-top",
          }}
          aria-labelledby="signup-dialog-title"
          TransitionProps={{ role: "presentation" }}
        >
          <DialogContent>
            <SignUp
              closeSignupDialog={() =>
                this.setState({
                  showSignup: false,
                })
              }
              showLoginDialog={() =>
                this.setState({
                  showSignup: false,
                  showLoginModal: true,
                })
              }
              claimsData={[]}
            />
            <Button
              className="icn-close-account field-first"
              id="SignupClose"
              aria-label="Signup Dialog Close"
              onClick={() => {
                this.setState({ showSignup: false });
                trackEvent(
                  EventNames.Action.ACTION_HEADER_SIGNUP_CLOSE,
                  EventNames.Event.EVENT_BUTTON_PRESS,
                  window.location.origin,
                  window.location.pathname
                );
              }}
              onBlur={() => {
                // this.popupFocusTrap()
              }}
            >
              <CloseIcon />
            </Button>
          </DialogContent>
        </Dialog>
        <Dialog
          open={this.state.showLoginModal}
          onClose={() => {
            this.setState({ showLoginModal: false });
          }}
          maxWidth={false}
          scroll={"body"}
          classes={{
            paper: "modal-tr-container modal-paper modal-login",
            root: "modal-stack-top",
          }}
          aria-labelledby="signIn-dialogBox"
        >
          <DialogContent>
            <TRLogin
              onClickForgot={() => {
                this.setState({
                  showLoginModal: false,
                  showTRForgotPasswordModal: true,
                });
              }}
              onClickSignup={() => {
                this.setState({
                  showLoginModal: false,
                  showSignup: true,
                });
              }}
            />
            <Button
              className="icn-close"
              id="LoginClose"
              aria-label="Login Dialog Close"
              onClick={() => {
                this.setState({ showLoginModal: false });
              }}
            >
              <CloseIcon />
            </Button>
          </DialogContent>
        </Dialog>
        <Dialog
          open={this.state.showTRForgotPasswordModal}
          onClose={() => {
            this.setState({ showTRForgotPasswordModal: false });
          }}
          maxWidth={false}
          scroll={"body"}
          classes={{
            paper: "modal-tr-forgot-container modal-paper modal-login",
            root: "modal-stack-top",
          }}
          aria-labelledby="signIn-dialogBox"
        >
          <DialogContent>
            <TRForgotPassword
              onSuccess={() => {
                this.setState({ showTRForgotPasswordModal: false });
              }}
              onClickSignUp={() => {
                this.setState({
                  showTRForgotPasswordModal: false,
                  showSignup: true,
                });
              }}
              onClickLogin={() => {
                this.setState({
                  showTRForgotPasswordModal: false,
                  showLoginModal: true,
                });
              }}
            />
            <Button
              className="icn-close"
              id="LoginClose"
              aria-label="Login Dialog Close"
              onClick={() => {
                this.setState({ showTRForgotPasswordModal: false });
              }}
            >
              <CloseIcon />
            </Button>
          </DialogContent>
        </Dialog>
        <footer
          className={`tr-footer  ${isStep ? "footer-steps" : ""} ${
            isVariety ? "footer-variety" : ""
          }`}
        >
          <div className="arrow-section-footer"></div>
          <Container className="container-root">
            <Grid container className="top-footer-block">
              <Grid item md={10}>
                <div className="heading">
                  Join the PepsiCo Tasty Rewards Experience!
                </div>
                <img src="www/images/icon-airplane.png" alt="icon airplane" />
                <p>
                  Get full access to PepsiCo Tasty Rewards and exclusive content
                  by becoming a member.
                </p>
              </Grid>
              {!isAuthenticated ? (
                <Grid item md={2} className="footer-signup">
                  <Button
                    aria-label="Sign Up"
                    className="signup-btn"
                    onClick={() => {
                      this.setState({ showSignup: true });
                    }}
                  >
                    Sign Up
                  </Button>
                </Grid>
              ) : null}
            </Grid>
            <Grid container spacing={2} className="footer-block">
              <Grid item xs={2} className="footer-logo">
                <a
                  href={UrlConstants.tastyRewardUrl + "/en-us"}
                  alt="tasty rewards"
                >
                  <img
                    src="www/images/tasty-rewards-logo-footer.png"
                    alt={`${DisplayHeading.TASTY_REWARDS_SITE_NAME} footer`}
                  />
                </a>
              </Grid>
              <Grid item xs={10} className="footer-links-row">
                <List className="sublinks">
                  <ListItem>
                    <a
                      href={
                        UrlConstants.tastyRewardUrl +
                        "/en-us/about-tasty-rewards"
                      }
                      aria-label="About Us"
                      className="aboutus-footer-link"
                      onClick={() =>
                        SelectedLinkItem(
                          SELECTEDEVENTNAME.FOOTERLINK,
                          METHOD.FOOTER,
                          {
                            itemName: FOOTERLINKS.ABOUTUS,
                          }
                        )
                      }
                    >
                      {`About Us`}
                    </a>
                  </ListItem>
                  <ListItem>
                    <a
                      href="https://contact.pepsico.com/tastyrewardsus"
                      aria-label="Contact Us - Tasty Rewards"
                      className="contactus-footer-link"
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
                      {`Contact Us`}
                    </a>
                  </ListItem>
                  <ListItem>
                    <a
                      href="https://contact.pepsico.com/tastyrewardsus/faqs"
                      aria-label="FAQ"
                      className="faq-footer-link"
                      onClick={() =>
                        SelectedLinkItem(
                          SELECTEDEVENTNAME.FOOTERLINK,
                          METHOD.FOOTER,
                          {
                            itemName: FOOTERLINKS.FAQ,
                          }
                        )
                      }
                    >
                      {`FAQ`}
                    </a>
                  </ListItem>
                  <ListItem>
                    <a
                      href={UrlConstants.snacksUrl}
                      aria-label="Snacks.Com"
                      className="snackscom-footer-link"
                      onClick={() =>
                        SelectedLinkItem(
                          SELECTEDEVENTNAME.FOOTERLINK,
                          METHOD.FOOTER,
                          {
                            itemName: FOOTERLINKS.SNACKCOM,
                          }
                        )
                      }
                    >
                      {`Snacks.Com`}
                    </a>
                  </ListItem>
                  <ListItem>
                    <a
                      href="https://www.pepsico.com/legal/privacy"
                      aria-label="Privacy Policy - opens in new tab"
                      className="privacypolicy-footer-link"
                      target={"_blank"}
                      onClick={() =>
                        SelectedLinkItem(
                          SELECTEDEVENTNAME.FOOTERLINK,
                          METHOD.FOOTER,
                          {
                            itemName: FOOTERLINKS.PRIVACYPOLICY,
                          }
                        )
                      }
                      rel="noreferrer"
                    >
                      {`Privacy Policy`}
                    </a>
                  </ListItem>
                  <ListItem>
                    <a
                      href="https://www.pepsico.com/legal/terms-of-use"
                      aria-label="Terms of Use - opens in new tab"
                      className="termsofuse-footer-link"
                      target={"_blank"}
                      onClick={() =>
                        SelectedLinkItem(
                          SELECTEDEVENTNAME.FOOTERLINK,
                          METHOD.FOOTER,
                          {
                            itemName: FOOTERLINKS.TERMUSE,
                          }
                        )
                      }
                      rel="noreferrer"
                    >
                      {`Terms of Use`}
                    </a>
                  </ListItem>
                  <ListItem>
                    <a
                      href="https://policy.pepsico.com/aboutads.htm"
                      aria-label="About Our Ads - opens in new tab"
                      className="aboutourads-footer-link"
                      target={"_blank"}
                      onClick={() =>
                        SelectedLinkItem(
                          SELECTEDEVENTNAME.FOOTERLINK,
                          METHOD.FOOTER,
                          {
                            itemName: FOOTERLINKS.ABOUTADS,
                          }
                        )
                      }
                      rel="noreferrer"
                    >
                      {`About Our Ads`}
                    </a>
                  </ListItem>
                  {/* <ListItem onFocus={this.handleClickAway}>
                    <a
                      href={UrlConstants.tastyRewardUrl + "/en-us/unsubscribe"}
                      aria-label="Unsubscribe"
                      className="unsubscribe-footer-link"
                      onClick={() =>
                        SelectedLinkItem(
                          SELECTEDEVENTNAME.FOOTERLINK,
                          METHOD.FOOTER,
                          {
                            itemName: FOOTERLINKS.UNSUBSCRIBE,
                          }
                        )
                      }
                    >
                      {`Unsubscribe`}
                    </a>
                  </ListItem> */}
                  <ListItem className="lang-drop-item">
                    <ClickAwayListener onClickAway={this.handleClickAway}>
                      <div className="lang-drop-wrapper">
                        <Button
                          aria-haspopup="true"
                          aria-expanded={this.state.menuToggle}
                          onClick={this.handleToggle}
                          className={`lang-drop-btn ${
                            this.state.countryVal === "Canada"
                              ? "is-ca"
                              : "is-us"
                          }`}
                          title="Select country"
                        >
                          {this.state.countryVal === "Canada" ? (
                            <span className="icn ca"></span>
                          ) : (
                            <span className="icn us"></span>
                          )}
                          {this.state.countryVal}
                          {this.state.menuToggle ? (
                            <ExpandLessIcon />
                          ) : (
                            <ExpandMoreIcon />
                          )}
                          <i className="lang-drop-btn-title">Select country</i>
                        </Button>
                        {/* {this.state.menuToggle && */}
                        <MenuList
                          id="menu-list-grow"
                          className={`lang-drop-list ${
                            this.state.menuToggle ? "open" : ""
                          }`}
                        >
                          <MenuItem onClick={() => this.handleClose("Canada")}>
                            <span className="icn ca"></span>Canada
                          </MenuItem>
                          <MenuItem
                            onClick={() => this.handleClose("United States")}
                          >
                            <span className="icn us"></span>
                            {`United States`}
                          </MenuItem>
                        </MenuList>
                        {/* } */}
                      </div>
                    </ClickAwayListener>
                  </ListItem>
                </List>
              </Grid>
              <Grid container>
                <Grid item md={2} />
                <Grid item xs={12} md={10}>
                  <div className="copyright-text-line">
                    <p>
                      {ReactHtmlParser(
                        `©${
                          (new Date()).getFullYear()
                        } PepsiCo, Inc., 700 Anderson Hill, Rd, Purchase, NY, 10577`
                      )}
                    </p>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </footer>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.reducer.isAuthenticated,
  };
};

export default connect(mapStateToProps)(Footer);
