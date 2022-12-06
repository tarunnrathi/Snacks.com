import React, { useEffect } from "react";
import "./contact-us-page.scss";
import { DisplayHeading as DISPLAY_HEADING } from "../../config/constants/content.constant";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useLocation } from "react-router-dom";
import { Button } from "@mui/material";

const ContactUsLeftPanel = (props) => (
  <div className="contact-us-page-container" role="tablist">
    {/* <Typography variant="h2">{DISPLAY_HEADING.COMMON_QUESTIONS}</Typography> */}
    {props.questions.map((item, index) => {
      const param = useLocation().search;
      useEffect(() => {
        //if below condition is true then contactus form will open defaultly
        if (param == "?opencontactform") {
          props.updateQuestion(false, DISPLAY_HEADING.CONTACT_US_BUTTON, "");
        }
      }, []);

      return (
        <Button
          key={item.id}
          role="tab"
          tabIndex={index == 0 ? "0":"-1"}
          id={`question${item.id}`}
          aria-label={item.name}
          className={`question-left-btn ${
            props.currentQuestion === item.name && "active"
          }`}
          onClick={() => props.updateQuestion(true, item.name, item.id)}
        >
          {item.name}
          <KeyboardArrowRightIcon />
        </Button>
      );
    })}
    <Button
      id="customerContact"
      role="tab"
      tabIndex="-1"
      aria-label={DISPLAY_HEADING.CONTACT_US_BUTTON}
      className={`question-left-btn ${
        props.currentQuestion === DISPLAY_HEADING.CONTACT_US_BUTTON && "active"
      }`}
      onClick={() =>
        props.updateQuestion(false, DISPLAY_HEADING.CONTACT_US_BUTTON, "")
      }
    >
      {DISPLAY_HEADING.CONTACT_US_BUTTON}
      <KeyboardArrowRightIcon />
    </Button>
    <Button
      id="customerPrivacyPolicy"
      role="tab"
      tabIndex="-1"
      aria-label={DISPLAY_HEADING.TERMS_OF_SERVICE_BUTTON}
      className={`question-left-btn ${
        props.currentQuestion === DISPLAY_HEADING.TERMS_OF_SERVICE_BUTTON &&
        "active"
      }`}
      onClick={() =>
        props.updateQuestion(false, DISPLAY_HEADING.TERMS_OF_SERVICE_BUTTON, "")
      }
    >
      {DISPLAY_HEADING.TERMS_OF_SERVICE_BUTTON}
      <KeyboardArrowRightIcon />
    </Button>
    <Button
      id="customerTermsOfService"
      role="tab"
      tabIndex="-1"
      aria-label={DISPLAY_HEADING.PRIVACY_POLICY_BUTTON}
      className={`question-left-btn ${
        props.currentQuestion === DISPLAY_HEADING.PRIVACY_POLICY_BUTTON &&
        "active"
      }`}
      onClick={() =>
        props.updateQuestion(false, DISPLAY_HEADING.PRIVACY_POLICY_BUTTON, "")
      }
    >
      {DISPLAY_HEADING.PRIVACY_POLICY_BUTTON}
      <KeyboardArrowRightIcon />
    </Button>
    <Button
      id="customerAdsAndTracking"
      role="tab"
      tabIndex="-1"
      aria-label={DISPLAY_HEADING.ADS_TRACKING_BUTTON}
      className={`question-left-btn ${
        props.currentQuestion === DISPLAY_HEADING.ADS_TRACKING_BUTTON &&
        "active"
      }`}
      onClick={() =>
        props.updateQuestion(false, DISPLAY_HEADING.ADS_TRACKING_BUTTON, "")
      }
    >
      {DISPLAY_HEADING.ADS_TRACKING_BUTTON}
      <KeyboardArrowRightIcon />
    </Button>
  </div>
);

export default ContactUsLeftPanel;
