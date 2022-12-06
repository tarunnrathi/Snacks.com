import React, { Component } from "react";
import "./contact-us-page.scss";
import { DisplayHeading as DISPLAY_HEADING } from "../../config/constants/content.constant";
import ContactUsLeftPanel from "./ContactUsLeftPanel";
import ContactUs from "./ContactUsForm";
import PrivacyPolicy from "../policyPages/privacyPolicy";
import TermsOfService from "../policyPages/termsOfService";
import AdsTracking from "../policyPages/adsTracking";
import CommonQuestions from "./commonQuestions";
import { actionFaqCategory } from "../../actions/ProductAction";
import { ViewedPage } from "../../config/amplitude/SnacksAmplitude";
import { PAGENAME } from "../../config/amplitude/Taxonomy.constants";
import { connect } from "react-redux";
import { Grid } from "@mui/material";

export class ContactUsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCommonQuestion: false,
      selectedButton: !!sessionStorage.getItem("fromContactForm")
        ? DISPLAY_HEADING.CONTACT_US_BUTTON
        : "",
      selectedId: "",
      commonQuestionsList: [],
    };
    this.getCategoryListing();
    if (this.props.match.path === "/contactform") {
      sessionStorage.setItem("fromContactForm", true);
      window.location.assign("/contactus");
    } else {
      sessionStorage.removeItem("fromContactForm");
    }
  }

  componentDidMount() {
    ViewedPage(PAGENAME.CONTACTUS);
  }

  callCustomerService = () => {
    this.setState({
      isCommonQuestion: false,
      selectedButton: DISPLAY_HEADING.CONTACT_US_BUTTON,
    });
  };

  cancelCustomerService = () => {
    this.setState({
      isCommonQuestion: false,
      selectedButton: "",
    });
  };

  getCategoryListing = () => {
    this.props.actionFaqCategory().then(() => {
      if (
        !!this.props.faqCategory.message &&
        this.props.faqCategory.message.length > 0
      ) {
      } else {
        this.setState({
          commonQuestionsList: this.props.faqCategory.data,
        });
      }
      // for contact tab navigation
      const tabs = document.querySelectorAll('[role="tab"]');
      const tabList = document.querySelector('[role="tablist"]');
    
      // Enable arrow navigation between tabs in the tab list
      let tabFocus = 0;
      tabList.addEventListener("keydown", e => {
        // Move right
        if (e.keyCode === 40 || e.keyCode === 38) {
          tabs[tabFocus].setAttribute("tabindex", -1);
          if (e.keyCode === 40) {
            tabFocus++;
            // If we're at the end, go to the start
            if (tabFocus >= tabs.length) {
              tabFocus = 0;
            }
            // Move left
          } else if (e.keyCode === 38) {
            tabFocus--;
            // If we're at the start, move to the end
            if (tabFocus < 0) {
              tabFocus = tabs.length - 1;
            }
          }
    
          tabs[tabFocus].setAttribute("tabindex", 0);
          tabs[tabFocus].focus();
        }
      });
    });
  };

  render() {
    return (
      <div className={"contact-us-page"}>
        <div className="contact-us-page-page-heading sticky-head">
          <div className="sticky-head-inner">
            <h1 className="sticky-title">{DISPLAY_HEADING.CONTACT_US_PAGE}</h1>
          </div>
        </div>
        <div>
          <Grid container spacing={2} className={"contact-us-page-wrapper"}>
            <Grid item xs={4} className="panel-common-question">
              <ContactUsLeftPanel
                questions={this.state.commonQuestionsList}
                currentQuestion={this.state.selectedButton}
                updateQuestion={(commonQue, name, id) => {
                  this.setState(
                    {
                      isCommonQuestion: commonQue,
                      selectedButton: name,
                      selectedId: id,
                    },
                    () => {
                      let scrollTo = 0;
                      if (window.innerWidth < 991) {
                        scrollTo =
                          document.getElementById("right-panel").offsetTop - 80;
                        window.scrollTo(0, scrollTo);
                      } else {
                        scrollTo =
                          document.getElementById("right-panel").offsetTop -
                          260;
                        window.scrollTo(0, scrollTo);
                      }
                    }
                  );
                }}
              />
            </Grid>
            <Grid item xs={8} className="panel-content" id="right-panel">
              {this.state.selectedButton.length === 0 &&
                this.state.isCommonQuestion === false && (
                  <>
                    <div
                      className={`contact-us-page-container-right-panel ${
                        this.state.selectedButton.length === 0 &&
                        "contact-us-page-placeholder"
                      }`}
                    >
                      <img
                        ref={this.imgRef}
                        alt={"question"}
                        src={"/www/images/question-solid.png"}
                      />
                      <div className="placeholder-title">
                        {sessionStorage.getItem("contactUsMsg") || ""}
                      </div>
                    </div>
                  </>
                )}
              {this.state.isCommonQuestion === false &&
                this.state.selectedButton.length > 0 && (
                  <div className="contact-us-page-container-right-panel">
                    {this.state.selectedButton ===
                      DISPLAY_HEADING.CONTACT_US_BUTTON && (
                      <>
                        <div className="header-right-panel">
                          {DISPLAY_HEADING.CONTACT_US_HEADER}
                        </div>
                        <div className="divider-contact bottom-space" />
                        <ContactUs
                          cancelCustomerService={() =>
                            this.cancelCustomerService()
                          }
                          PageTitle={PAGENAME.CONTACTUS}
                        />
                      </>
                    )}
                    {this.state.selectedButton ===
                      DISPLAY_HEADING.PRIVACY_POLICY_BUTTON && (
                      <PrivacyPolicy />
                    )}
                    {this.state.selectedButton ===
                      DISPLAY_HEADING.TERMS_OF_SERVICE_BUTTON && (
                      <TermsOfService />
                    )}
                    {this.state.selectedButton ===
                      DISPLAY_HEADING.ADS_TRACKING_BUTTON && <AdsTracking />}
                  </div>
                )}
              {this.state.isCommonQuestion === true && (
                <div className="contact-us-page-container-right-panel">
                  <CommonQuestions
                    updateQuestionHeading={this.state.selectedButton}
                    selectedQuestionId={this.state.selectedId}
                    callCustomerService={() => this.callCustomerService()}
                  />
                </div>
              )}
            </Grid>
            {/* <div className="contact-buttons">
              <div
                className={`contact-buttons-single ${
                  this.state.selectedButton ===
                    DISPLAY_HEADING.CONTACT_US_BUTTON && "active"
                }`}
              >
                <Button
                  onClick={() =>
                    this.setState(
                      {
                        isCommonQuestion: false,
                        selectedButton: DISPLAY_HEADING.CONTACT_US_BUTTON,
                      }, window.scrollTo(0, 0))
                    }
                    className="btn-without-link"
                    id="customerContact"
                    aria-label={DISPLAY_HEADING.CONTACT_US_BUTTON}
                  >
                    {DISPLAY_HEADING.CONTACT_US_BUTTON}
                  </Button>
                </div>
              
                <div 
                  className={`contact-buttons-single ${(this.state.selectedButton === DISPLAY_HEADING.PRIVACY_POLICY_BUTTON) && 'active'}`}
                  >
                  <Button
                    onClick={() =>
                      this.setState({
                        isCommonQuestion: false,
                        selectedButton: DISPLAY_HEADING.PRIVACY_POLICY_BUTTON,
                      }, window.scrollTo(0, 0))
                    }
                    className="btn-without-link"
                    id="customerPrivacyPolicy"
                    aria-label={DISPLAY_HEADING.PRIVACY_POLICY_BUTTON}
                  >
                    {DISPLAY_HEADING.PRIVACY_POLICY_BUTTON}
                  </Button>
                </div>
              
                <div 
                  className={`contact-buttons-single ${(this.state.selectedButton === DISPLAY_HEADING.TERMS_OF_SERVICE_BUTTON) && 'active'}`}
                  >
                  <Button
                    onClick={() =>
                      this.setState({
                        isCommonQuestion: false,
                        selectedButton: DISPLAY_HEADING.TERMS_OF_SERVICE_BUTTON,
                      }, window.scrollTo(0, 0))
                    }
                    className="btn-without-link"
                    id="customerTermsOfService"
                    aria-label={DISPLAY_HEADING.TERMS_OF_SERVICE_BUTTON}
                  >
                    {DISPLAY_HEADING.TERMS_OF_SERVICE_BUTTON}
                  </Button>
                </div>
              
                <div 
                  className={`contact-buttons-single ${(this.state.selectedButton === DISPLAY_HEADING.ADS_TRACKING_BUTTON) && 'active'}`}
                  >
                  <Button
                    onClick={() =>
                      this.setState({
                        isCommonQuestion: false,
                        selectedButton: DISPLAY_HEADING.ADS_TRACKING_BUTTON,
                      }, window.scrollTo(0, 0))
                    }
                    className="btn-without-link"
                    id="customerAdsAndTracking"
                    aria-label={DISPLAY_HEADING.ADS_TRACKING_BUTTON}
                  >
                    {DISPLAY_HEADING.ADS_TRACKING_BUTTON}
                  </Button>
                </div>
            </div> */}
          </Grid>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    faqCategory: state.reducer.faqCategory,
  };
};

export default connect(mapStateToProps, {
  actionFaqCategory,
})(ContactUsPage);
