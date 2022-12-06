import React, { Component } from "react";
import { ErrorMessage, Formik, Form } from "formik";
import { MessagesUtil } from "../../../../config/constants/content.constant";
import { trackEvent, EventNames } from "../../../../appinsights/EventTrack";
import APIUtil from "../../../../config/APIUtil";
import UrlConstants from "../.././../../config/UrlConstants";
import validateAPIResponse from "../../../ApiHelper";
import * as Yup from "yup";
import { Alert, Button, FormControl, Grid, InputLabel, OutlinedInput } from '@mui/material';
import Spinner from "../../../Spinner";
import "./forgotPassword.scss";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      msg: null,
      msgType: "success",
    };
  }

  removeMsg() {
    let msgTimeOut = parseInt(
      sessionStorage.getItem("msgTime")
        ? sessionStorage.getItem("msgTime")
        : 10000
    );
    setTimeout(() => {
      this.setState({ msg: null, msgType: "success" });
    }, msgTimeOut);
  }

  onClickLogin = () => {
    if (window.location.href.indexOf("forgotpassword") > -1) {
      window.history.go(-1);
    } else {
      this.props.onClickLogin();
    }
  };

  onClickSignUp = () => {
    if (window.location.href.indexOf("forgotpassword") > -1) {
      window.history.go(-1);
    } else {
      this.props.onClickSignUp();
    }
  };

  render() {
    const isFPPage =
      this.props.location &&
      this.props.location.pathname &&
      this.props.location.pathname.includes("forgotpassword");

    const isES =
      sessionStorage.getItem("isMultiLanguage") === "true" &&
      window.location.href.indexOf("forgotpassword") > -1 &&
      window.location.href.indexOf("es-us") > -1;
    const isEN = !isES;

    return (
      <div className={isFPPage ? "modal-tr-forgot-container" : ""}>
        {this.state.spinner ? <Spinner /> : ""}
        {this.state.msg ? (
          <Alert
            className={"snackbar-inline " + this.state.msgType}
            severity={this.state.msgType}
          >
            {this.state.msg}
          </Alert>
        ) : (
          ""
        )}
        <div className="forgot-content">
          <Formik
            enableReinitialize
            initialValues={{ email: "" }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email(
                  sessionStorage.getItem("langTranslation") &&
                    JSON.parse(sessionStorage.getItem("langTranslation"))
                      .snacks_valid_email_error
                    ? localStorage.getItem("ln") ===
                      UrlConstants.englishLanguage
                      ? isES
                        ? JSON.parse(sessionStorage.getItem("langTranslation"))
                            .snacks_valid_email_error[1].es
                        : JSON.parse(sessionStorage.getItem("langTranslation"))
                            .snacks_valid_email_error[0].en
                      : isEN
                      ? JSON.parse(sessionStorage.getItem("langTranslation"))
                          .snacks_valid_email_error[0].en
                      : JSON.parse(sessionStorage.getItem("langTranslation"))
                          .snacks_valid_email_error[1].es
                    : MessagesUtil.EMAIL_NOT_VALID
                )
                .required(
                  sessionStorage.getItem("langTranslation") &&
                    JSON.parse(sessionStorage.getItem("langTranslation"))
                      .snacks_email_name_error
                    ? localStorage.getItem("ln") ===
                      UrlConstants.englishLanguage
                      ? isES
                        ? JSON.parse(sessionStorage.getItem("langTranslation"))
                            .snacks_email_name_error[1].es
                        : JSON.parse(sessionStorage.getItem("langTranslation"))
                            .snacks_email_name_error[0].en
                      : isEN
                      ? JSON.parse(sessionStorage.getItem("langTranslation"))
                          .snacks_email_name_error[0].en
                      : JSON.parse(sessionStorage.getItem("langTranslation"))
                          .snacks_email_name_error[1].es
                    : MessagesUtil.EMAIL_REQUIRED
                ),
            })}
            onSubmit={(values, { resetForm, setSubmitting }) => {
              this.setState({ spinner: true, msg: "", msgType: "success" });
              trackEvent(
                EventNames.Action.ACTION_FORGOT_PASSWORD,
                EventNames.Event.EVENT_BUTTON_PRESS,
                window.location.origin,
                window.location.pathname,
                { email: values.email }
              );
              let val = {
                username: values.email,
                source: "TastyRewardsUS",
                lang: isES
                  ? UrlConstants.spanishLanguage
                  : UrlConstants.englishLanguage,
              };
              APIUtil.postMethod(UrlConstants.forgotpassword, val, true)
                .then((response) => {
                  this.setState({ spinner: false });
                  if (validateAPIResponse(response)) {
                    if (response.data.success) {
                      resetForm({ email: "" });
                      this.setState(
                        { msg: response.data.message, msgType: "success" },
                        () => this.removeMsg()
                      );
                    } else {
                      this.setState(
                        {
                          msg: response.data.message || UrlConstants.errorMsg,
                          msgType: "error",
                        },
                        () => this.removeMsg()
                      );
                    }
                  }
                  setSubmitting(false);
                })
                .catch((err) => {
                  this.setState({ spinner: false });
                  this.setState({ msg: err.toString(), msgType: "error" }, () =>
                    this.removeMsg()
                  );
                  setSubmitting(false);
                });
            }}
          >
            {({
              handleChange,
              handleBlur,
              errors,
              values,
              touched,
              isSubmitting,
            }) => (
              <Form
                className={`loginForm login-form custom-form forgot-pwd-form is-forgot`}
              >
                <div className="iframe-logo">
                  <img
                    src={
                      sessionStorage.getItem("langTranslation") &&
                      JSON.parse(sessionStorage.getItem("langTranslation"))
                        ? localStorage.getItem("ln") ===
                          UrlConstants.englishLanguage
                          ? isES
                            ? "/www/images/tasty-rewards-logo-es.webp"
                            : "/www/images/tasty-rewards.png"
                          : isEN
                          ? "/www/images/tasty-rewards.png"
                          : "/www/images/tasty-rewards-logo-es.webp"
                        : "/www/images/tasty-rewards.png"
                    }
                    alt={
                      sessionStorage.getItem("langTranslation") &&
                      JSON.parse(sessionStorage.getItem("langTranslation"))
                        .snacks_tasty_rewards &&
                      sessionStorage.getItem("isMultiLanguage") === "true"
                        ? localStorage.getItem("ln") ===
                          UrlConstants.englishLanguage
                          ? JSON.parse(
                              sessionStorage.getItem("langTranslation")
                            ).snacks_tasty_rewards[0].en
                          : JSON.parse(
                              sessionStorage.getItem("langTranslation")
                            ).snacks_tasty_rewards[1].es
                        : "tasty rewards"
                    }
                    className="popup-logo"
                    id="tasty-logo"
                  />
                </div>
                <div className="forgot-content">
                  <h1 className="forgot-title">
                    {sessionStorage.getItem("langTranslation") &&
                    JSON.parse(sessionStorage.getItem("langTranslation"))
                      .snacks_having_trouble_signing
                      ? localStorage.getItem("ln") ===
                        UrlConstants.englishLanguage
                        ? isES
                          ? JSON.parse(
                              sessionStorage.getItem("langTranslation")
                            ).snacks_having_trouble_signing[1].es
                          : JSON.parse(
                              sessionStorage.getItem("langTranslation")
                            ).snacks_having_trouble_signing[0].en
                        : isEN
                        ? JSON.parse(sessionStorage.getItem("langTranslation"))
                            .snacks_having_trouble_signing[0].en
                        : JSON.parse(sessionStorage.getItem("langTranslation"))
                            .snacks_having_trouble_signing[1].es
                      : "Having Trouble Signing In?"}
                  </h1>

                  <Grid container spacing={2} className="form-card-container">
                    <Grid item xs={12} sm={12}>
                      <p className="forgot-text">
                        {sessionStorage.getItem("langTranslation") &&
                        JSON.parse(sessionStorage.getItem("langTranslation"))
                          .snacks_forgotpassword_subheading
                          ? localStorage.getItem("ln") ===
                            UrlConstants.englishLanguage
                            ? isES
                              ? JSON.parse(
                                  sessionStorage.getItem("langTranslation")
                                ).snacks_forgotpassword_subheading[1].es
                              : JSON.parse(
                                  sessionStorage.getItem("langTranslation")
                                ).snacks_forgotpassword_subheading[0].en
                            : isEN
                            ? JSON.parse(
                                sessionStorage.getItem("langTranslation")
                              ).snacks_forgotpassword_subheading[0].en
                            : JSON.parse(
                                sessionStorage.getItem("langTranslation")
                              ).snacks_forgotpassword_subheading[1].es
                          : "Enter the email address associated with your account and we’ll send you a link to reset your password."}
                      </p>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <FormControl
                        fullWidth
                        className="form-group"
                        variant="outlined"
                      >
                        <InputLabel className="form-label" htmlFor="email">
                          {sessionStorage.getItem("langTranslation") &&
                          JSON.parse(sessionStorage.getItem("langTranslation"))
                            .snacks_email_address
                            ? localStorage.getItem("ln") ===
                              UrlConstants.englishLanguage
                              ? isES
                                ? JSON.parse(
                                    sessionStorage.getItem("langTranslation")
                                  ).snacks_email_address[1].es
                                : JSON.parse(
                                    sessionStorage.getItem("langTranslation")
                                  ).snacks_email_address[0].en
                              : isEN
                              ? JSON.parse(
                                  sessionStorage.getItem("langTranslation")
                                ).snacks_email_address[0].en
                              : JSON.parse(
                                  sessionStorage.getItem("langTranslation")
                                ).snacks_email_address[1].es
                            : "Email Address"}
                          <span className="text-danger">*</span>
                        </InputLabel>
                        <OutlinedInput
                          id="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.email && Boolean(errors.email)}
                          inputProps={{
                            "aria-required": "true",
                            "aria-invalid": "false",
                          }}
                        />
                        <ErrorMessage
                          role="alert"
                          component="div"
                          name="email"
                          className="text-danger error-icon-wrapper"
                        />
                      </FormControl>
                    </Grid>
                  </Grid>

                  <div className="btn-wrap">
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      className="mui-btn submit-btn"
                      id="SubmitForgetForm"
                      aria-label={"Submit"}
                      disabled={isSubmitting}
                    >
                      {sessionStorage.getItem("langTranslation") &&
                      JSON.parse(sessionStorage.getItem("langTranslation"))
                        .snacks_submit_text
                        ? localStorage.getItem("ln") ===
                          UrlConstants.englishLanguage
                          ? isES
                            ? JSON.parse(
                                sessionStorage.getItem("langTranslation")
                              ).snacks_submit_text[1].es
                            : JSON.parse(
                                sessionStorage.getItem("langTranslation")
                              ).snacks_submit_text[0].en
                          : isEN
                          ? JSON.parse(
                              sessionStorage.getItem("langTranslation")
                            ).snacks_submit_text[0].en
                          : JSON.parse(
                              sessionStorage.getItem("langTranslation")
                            ).snacks_submit_text[1].es
                        : "Submit"}
                    </Button>
                  </div>
                  <div>
                    <div className="desc signIn">
                      {sessionStorage.getItem("langTranslation") &&
                      JSON.parse(sessionStorage.getItem("langTranslation"))
                        .snacks_back_to
                        ? localStorage.getItem("ln") ===
                          UrlConstants.englishLanguage
                          ? isES
                            ? JSON.parse(
                                sessionStorage.getItem("langTranslation")
                              ).snacks_back_to[1].es
                            : JSON.parse(
                                sessionStorage.getItem("langTranslation")
                              ).snacks_back_to[0].en
                          : isEN
                          ? JSON.parse(
                              sessionStorage.getItem("langTranslation")
                            ).snacks_back_to[0].en
                          : JSON.parse(
                              sessionStorage.getItem("langTranslation")
                            ).snacks_back_to[1].es
                        : "Back to?"}{" "}
                      <Button
                        color="primary"
                        id="SignIn"
                        className="field-last"
                        onClick={() => {
                          this.onClickLogin();
                        }}
                      >
                        {sessionStorage.getItem("langTranslation") &&
                        JSON.parse(sessionStorage.getItem("langTranslation"))
                          .snacks_login
                          ? localStorage.getItem("ln") ===
                            UrlConstants.englishLanguage
                            ? isES
                              ? JSON.parse(
                                  sessionStorage.getItem("langTranslation")
                                ).snacks_login[1].es
                              : JSON.parse(
                                  sessionStorage.getItem("langTranslation")
                                ).snacks_login[0].en
                            : isEN
                            ? JSON.parse(
                                sessionStorage.getItem("langTranslation")
                              ).snacks_login[0].en
                            : JSON.parse(
                                sessionStorage.getItem("langTranslation")
                              ).snacks_login[1].es
                          : "Sign In"}
                      </Button>
                    </div>
                    <div className="desc signUp">
                      {sessionStorage.getItem("langTranslation") &&
                      JSON.parse(sessionStorage.getItem("langTranslation"))
                        .snacks_no_account
                        ? localStorage.getItem("ln") ===
                          UrlConstants.englishLanguage
                          ? isES
                            ? JSON.parse(
                                sessionStorage.getItem("langTranslation")
                              ).snacks_no_account[1].es
                            : JSON.parse(
                                sessionStorage.getItem("langTranslation")
                              ).snacks_no_account[0].en
                          : isEN
                          ? JSON.parse(
                              sessionStorage.getItem("langTranslation")
                            ).snacks_no_account[0].en
                          : JSON.parse(
                              sessionStorage.getItem("langTranslation")
                            ).snacks_no_account[1].es
                        : "Don't have an account yet?"}
                      <Button
                        color="primary"
                        id="SignUp"
                        className="field-last"
                        onClick={() => {
                          this.onClickSignUp();
                        }}
                      >
                        {sessionStorage.getItem("langTranslation") &&
                        JSON.parse(sessionStorage.getItem("langTranslation"))
                          .snacks_signup
                          ? localStorage.getItem("ln") ===
                            UrlConstants.englishLanguage
                            ? isES
                              ? JSON.parse(
                                  sessionStorage.getItem("langTranslation")
                                ).snacks_signup[1].es
                              : JSON.parse(
                                  sessionStorage.getItem("langTranslation")
                                ).snacks_signup[0].en
                            : isEN
                            ? JSON.parse(
                                sessionStorage.getItem("langTranslation")
                              ).snacks_signup[0].en
                            : JSON.parse(
                                sessionStorage.getItem("langTranslation")
                              ).snacks_signup[1].es
                          : "Sign up"}
                      </Button>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}

export default ForgotPassword;
