import React, { Component } from "react";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { connect } from "react-redux";
import * as Yup from "yup";
import { ErrorMessage, Formik } from "formik";
import {
  DisplayHeading,
  MessagesUtil,
} from "../../../config/constants/content.constant";
import { Link } from "react-router-dom";
import APIUtil from "../../../config/APIUtil";
import UrlConstants from "../../../config/UrlConstants";
import { ClickedButton } from "../../../config/amplitude/SnacksAmplitude";
import Spinner from "../../Spinner";
import "./NotifyMe.scss";
import validateAPIResponse from "../../ApiHelper";
import { Button, Checkbox, Dialog, DialogContent, FormControl, FormControlLabel, InputLabel, OutlinedInput } from "@mui/material";

class NotifyMe extends Component {
  state = {
    formStage: "first",
    spinner: false,
    shouldDisabled: true,
  };

  closeNotify = () => {
    this.props.closeNotifyModal(false);
    setTimeout(
      () => this.setState({ formStage: "first", shouldDisabled: true }),
      1000
    );
  };

  validate = () => {
    let optIn = document.getElementById("optIn");
    let termAndConditions = document.getElementById("termAndConditions");
    let email = document.getElementById("email");
    if (email && email.value && optIn.checked && termAndConditions.checked) {
      this.setState({
        shouldDisabled: false,
      });
    } else {
      this.setState({
        shouldDisabled: true,
      });
    }
  };

  render() {
    let accountId = "";
    let loggedinUserEmail = "";
    if (this.props.customerDetails) {
      accountId = this.props.customerDetails.id;
      loggedinUserEmail = this.props.customerDetails.accountContacts[0].email;
    }
    let spinner = this.state.spinner ? <Spinner /> : "";
    let { productInfo } = this.props;
    let productTitle = productInfo ? productInfo.productDescription : "";
    let notifyMeHeading =
      this.props.notifyMeHeading ||
      "Sign up and we'll notify you by email when Make Your Own Variety Pack is available again.";
    let thanksToNotifyHeading =
      this.props.thanksToNotifyHeading || "You are signed up!";
    let thanksToNotifyMessage =
      this.props.thanksToNotifyMessage ||
      "We’ll notify you once Make Your Own Variety Pack is available again.";
    if (this.props.notifyMeHeading) {
      notifyMeHeading = notifyMeHeading.replace(
        "${productTitle}",
        productTitle
      );
      thanksToNotifyMessage = thanksToNotifyMessage.replace(
        "${productTitle}",
        productTitle
      );
    }
    return (
      <Dialog
        open={this.props.openNotifyModal}
        onClose={() => this.closeNotify()}
        maxWidth={false}
        scroll={"body"}
        classes={{
          paper: "modal-notify modal-paper notify-box",
          root: "modal-stack-top",
        }}
        aria-labelledby="notifyMe-dialogBox"
      >
        <DialogContent>
          <div className="notify-form">
            {spinner}
            <Formik
              initialValues={{
                email: loggedinUserEmail,
                optIn: false,
                termAndConditions: false,
                productType: this.props.productType,
                accountId,
                shippingZipCode: sessionStorage.getItem("Zipcode"),
                billingZipCode: null,
                productTitle:
                  this.props.productType == "Regular"
                    ? productInfo.productDescription
                    : "",
                productId:
                  this.props.productType == "Regular"
                    ? productInfo.productId
                    : "",
                locationNumber:
                  sessionStorage.getItem("alternateOrderLocationId") ||
                  sessionStorage.getItem("_lo_No") ||
                  localStorage.getItem("_lo_No"),
              }}
              enableReinitialize={true}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .trim()
                  .required(MessagesUtil.EMAIL_REQUIRED)
                  .email(MessagesUtil.EMAIL_NOT_VALID),
                optIn: Yup.bool().oneOf([true], "Opt In must be checked"),
                termAndConditions: Yup.bool().oneOf(
                  [true],
                  "Terms And Conditions must be checked"
                ),
              })}
              onSubmit={(values) => {
                this.setState(
                  {
                    spinner: true,
                  },
                  function () {
                    APIUtil.postMethod(
                      UrlConstants.notifyMe,
                      JSON.stringify(values),
                      true
                    ).then((response) => {
                      if (validateAPIResponse(response)) {
                        if (response.data.success) {
                          this.setState({ formStage: "last", spinner: false });
                        }
                      }
                    });
                  }
                );
              }}
            >
              {(props) => {
                const {
                  values,
                  touched,
                  errors,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                } = props;

                return (
                  <div className="notify-form-wrapper">
                    <div className="notify-form-left">
                      <div className="mp-box">
                        <img
                          src={
                            this.props.notifyMePlaceholderImage
                              ? this.props.notifyMePlaceholderImage
                              : "/www/images/30-count-multipack.png "
                          }
                          alt="product logo"
                        />
                      </div>
                    </div>
                    <div className="notify-form-right">
                      {this.state.formStage === "first" ? (
                        <form
                          id="notifyForm"
                          name="form1"
                          onSubmit={handleSubmit}
                          onChange={this.validate.bind(this)}
                          className="notify-form custom-form"
                        >
                          <img
                            src="/www/images/PopupLogo.png"
                            alt={DisplayHeading.SITE_NAME}
                          />
                          <div className="note-text">{notifyMeHeading}</div>
                          {/** Notify  information */}

                          <div className="notify-form-inner">
                            <fieldset className="form-card">
                              {/** Email  */}
                              <div>
                                <FormControl
                                  fullWidth
                                  className="form-group"
                                  variant="outlined"
                                >
                                  <InputLabel
                                    className="form-label"
                                    htmlFor="email"
                                  >
                                    Email<span className="text-danger">*</span>
                                  </InputLabel>
                                  <OutlinedInput
                                    id="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={
                                      touched.email && Boolean(errors.email)
                                    }
                                    // autoFocus={true}
                                    inputProps={{
                                      "aria-required": "true",
                                      role: "alert",
                                      "aria-invalid": "false",
                                    }}
                                  />
                                  <ErrorMessage
                                    role="alert"
                                    component="div"
                                    name="email"
                                    className="text-danger"
                                  />
                                </FormControl>
                              </div>
                              <div className="notify-checkbox-wrapper">
                                <FormControl className="notify-checkbox">
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        name="optIn"
                                        id="optIn"
                                        onChange={handleChange}
                                        checked={values.optIn}
                                      />
                                    }
                                    label="Opt in to be emailed"
                                  />
                                </FormControl>
                                <ErrorMessage
                                  role="alert"
                                  component="div"
                                  name="optIn"
                                  className="text-danger"
                                />
                                <FormControl className="notify-checkbox">
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        name="termAndConditions"
                                        id="termAndConditions"
                                        onChange={handleChange}
                                        checked={values.termAndConditions}
                                      />
                                    }
                                    label="I have read and I agree to the Frito-Lay"
                                  />
                                  <Link to="privacy-policy" target="_blank">
                                    privacy policy
                                  </Link>
                                </FormControl>
                                <ErrorMessage
                                  role="alert"
                                  component="div"
                                  name="termAndConditions"
                                  className="text-danger"
                                />
                              </div>
                            </fieldset>
                            <div className="button-group password-div">
                              <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className="btn-primary"
                                aria-label="click here to notify"
                                disabled={
                                  errors.email
                                    ? true
                                    : this.state.shouldDisabled
                                    ? true
                                    : false
                                }
                                onClick={() =>
                                  ClickedButton(
                                    this.props.buttonName,
                                    this.props.pageName,
                                    {
                                      PageTitle: this.props.pageName,
                                    }
                                  )
                                }
                              >
                                {this.props.displayButtonText}
                              </Button>
                            </div>
                          </div>
                        </form>
                      ) : (
                        <div className="notify-form custom-form notify-form-success">
                          <img
                            src="/www/images/PopupLogo.png"
                            alt={DisplayHeading.SITE_NAME}
                          />
                          <div className="note-text">
                            {thanksToNotifyHeading}
                          </div>
                          <div className="note-text">
                            {thanksToNotifyMessage}
                          </div>
                          <div className="button-group password-div">
                            <Button
                              variant="contained"
                              color="primary"
                              className="btn-primary"
                              aria-label={thanksToNotifyMessage}
                              onClick={() => this.closeNotify()}
                            >
                              <CheckIcon />
                              Thank you
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              }}
            </Formik>
          </div>
          <Button
            className="icn-close"
            id="NotifyClose"
            aria-label="Notify Dialog Close"
            onClick={() => this.closeNotify()}
          >
            <CloseIcon />
          </Button>
        </DialogContent>
      </Dialog>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    customerDetails: state.reducer.customerDetails,
  };
};
export default connect(mapStateToProps, {})(NotifyMe);
