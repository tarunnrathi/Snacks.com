import React, { Component } from "react";
import { ErrorMessage, Formik, Form } from "formik";
import APIUtil from "../../../../config/APIUtil";
import ReactHtmlParser from "react-html-parser";
import UrlConstants from "../.././../../config/UrlConstants";
import * as Yup from "yup";
import {
  ViewedPage,
  ClickedButton,
} from "../../../../config/amplitude/SnacksAmplitude";
import {
  PAGENAME,
  BUTTONNAME,
} from "../../../../config/amplitude/Taxonomy.constants";
import "./resetPassword.scss";
import Spinner from "../../../Spinner";
import {
  Alert,
  Button,
  FormControl,
  Grid,
  InputLabel,
  OutlinedInput,
  Snackbar,
} from "@mui/material";

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialValues: {
        newPassword: null,
        confirmPassword: null,
      },
      submissionMessage: "",
      successMessage: "",
      submissionStatus: false,
      isSpinner: false,
      showSuccessAlert: false,
    };
  }

  componentDidMount() {
    ViewedPage(PAGENAME.RESETPASSWORD);
  }

  render() {
    const isES =
      sessionStorage.getItem("isMultiLanguage") === "true" &&
      window.location.href.indexOf("es-us") > -1;
    const isEN = !isES;

    const urlParams = this.props.location.pathname.split("/");
    const authenticateToken = urlParams[3];
    return (
      <div className="modal-tr-reset-container">
        {this.state.isSpinner ? <Spinner /> : ""}
        {this.state.submissionStatus && (
          <Snackbar
            open={this.state.submissionStatus}
            className="snackbar snackbar-inline snackbar-relative"
          >
            <Alert
              variant="filled"
              onClose={() => {
                this.setState({ submissionStatus: false }, () => {
                  document.getElementById("body").classList.remove("has-toast");
                });
              }}
              severity={
                this.state.submissionMessage === "success" ? "success" : "error"
              }
            >
              {this.state.successMessage}
            </Alert>
          </Snackbar>
        )}
        <div className=" forgot-content">
          <Formik
            enableReinitialize
            initialValues={this.state.initialValues}
            validationSchema={Yup.object().shape({
              newPassword: Yup.string()
                .nullable()
                .required(
                  sessionStorage.getItem("langTranslation") &&
                    JSON.parse(sessionStorage.getItem("langTranslation"))
                      .snacks_new_password_required
                    ? localStorage.getItem("ln") ===
                      UrlConstants.englishLanguage
                      ? isES
                        ? JSON.parse(sessionStorage.getItem("langTranslation"))
                            .snacks_new_password_required[1].es
                        : JSON.parse(sessionStorage.getItem("langTranslation"))
                            .snacks_new_password_required[0].en
                      : isEN
                      ? JSON.parse(sessionStorage.getItem("langTranslation"))
                          .snacks_new_password_required[0].en
                      : JSON.parse(sessionStorage.getItem("langTranslation"))
                          .snacks_new_password_required[1].es
                    : "New Password is required."
                )
                .min(
                  8,
                  sessionStorage.getItem("langTranslation") &&
                    JSON.parse(sessionStorage.getItem("langTranslation"))
                      .snacks_new_password_min
                    ? localStorage.getItem("ln") ===
                      UrlConstants.englishLanguage
                      ? isES
                        ? JSON.parse(sessionStorage.getItem("langTranslation"))
                            .snacks_new_password_min[1].es
                        : JSON.parse(sessionStorage.getItem("langTranslation"))
                            .snacks_new_password_min[0].en
                      : isEN
                      ? JSON.parse(sessionStorage.getItem("langTranslation"))
                          .snacks_new_password_min[0].en
                      : JSON.parse(sessionStorage.getItem("langTranslation"))
                          .snacks_new_password_min[1].es
                    : "New Password should be minimum 8 character"
                )
                .max(
                  15,
                  sessionStorage.getItem("langTranslation") &&
                    JSON.parse(sessionStorage.getItem("langTranslation"))
                      .snacks_new_password_max
                    ? localStorage.getItem("ln") ===
                      UrlConstants.englishLanguage
                      ? isES
                        ? JSON.parse(sessionStorage.getItem("langTranslation"))
                            .snacks_new_password_max[1].es
                        : JSON.parse(sessionStorage.getItem("langTranslation"))
                            .snacks_new_password_max[0].en
                      : isEN
                      ? JSON.parse(sessionStorage.getItem("langTranslation"))
                          .snacks_new_password_max[0].en
                      : JSON.parse(sessionStorage.getItem("langTranslation"))
                          .snacks_new_password_max[1].es
                    : "New Password should be maximum 15 character"
                )
                .matches(
                  /^(?=.*[a-z])(?=.)/,
                  sessionStorage.getItem("langTranslation") &&
                    JSON.parse(sessionStorage.getItem("langTranslation"))
                      .snacks_password_lower_case
                    ? localStorage.getItem("ln") ===
                      UrlConstants.englishLanguage
                      ? isES
                        ? JSON.parse(sessionStorage.getItem("langTranslation"))
                            .snacks_password_lower_case[1].es
                        : JSON.parse(sessionStorage.getItem("langTranslation"))
                            .snacks_password_lower_case[0].en
                      : isEN
                      ? JSON.parse(sessionStorage.getItem("langTranslation"))
                          .snacks_password_lower_case[0].en
                      : JSON.parse(sessionStorage.getItem("langTranslation"))
                          .snacks_password_lower_case[1].es
                    : "must contain a lower case letter"
                )
                .matches(
                  /^(?=.*[A-Z])(?=.)/,
                  sessionStorage.getItem("langTranslation") &&
                    JSON.parse(sessionStorage.getItem("langTranslation"))
                      .snacks_password_upper_case
                    ? localStorage.getItem("ln") ===
                      UrlConstants.englishLanguage
                      ? isES
                        ? JSON.parse(sessionStorage.getItem("langTranslation"))
                            .snacks_password_upper_case[1].es
                        : JSON.parse(sessionStorage.getItem("langTranslation"))
                            .snacks_password_upper_case[0].en
                      : isEN
                      ? JSON.parse(sessionStorage.getItem("langTranslation"))
                          .snacks_password_upper_case[0].en
                      : JSON.parse(sessionStorage.getItem("langTranslation"))
                          .snacks_password_upper_case[1].es
                    : "must contain an upper case letter"
                )
                .matches(
                  /^(?=.*[0-9])(?=.)/,
                  sessionStorage.getItem("langTranslation") &&
                    JSON.parse(sessionStorage.getItem("langTranslation"))
                      .snacks_password_number
                    ? localStorage.getItem("ln") ===
                      UrlConstants.englishLanguage
                      ? isES
                        ? JSON.parse(sessionStorage.getItem("langTranslation"))
                            .snacks_password_number[1].es
                        : JSON.parse(sessionStorage.getItem("langTranslation"))
                            .snacks_password_number[0].en
                      : isEN
                      ? JSON.parse(sessionStorage.getItem("langTranslation"))
                          .snacks_password_number[0].en
                      : JSON.parse(sessionStorage.getItem("langTranslation"))
                          .snacks_password_number[1].es
                    : "must contain a number"
                )
                .matches(
                  /^(?=.*[!@#\$%\^&\*])(?=.)/,
                  sessionStorage.getItem("langTranslation") &&
                    JSON.parse(sessionStorage.getItem("langTranslation"))
                      .snacks_password_special_char
                    ? localStorage.getItem("ln") ===
                      UrlConstants.englishLanguage
                      ? isES
                        ? JSON.parse(sessionStorage.getItem("langTranslation"))
                            .snacks_password_special_char[1].es
                        : JSON.parse(sessionStorage.getItem("langTranslation"))
                            .snacks_password_special_char[0].en
                      : isEN
                      ? JSON.parse(sessionStorage.getItem("langTranslation"))
                          .snacks_password_special_char[0].en
                      : JSON.parse(sessionStorage.getItem("langTranslation"))
                          .snacks_password_special_char[1].es
                    : "must contain a special character"
                ),
              confirmPassword: Yup.string()
                .nullable()
                .required(
                  sessionStorage.getItem("langTranslation") &&
                    JSON.parse(sessionStorage.getItem("langTranslation"))
                      .snacks_repeat_password_required
                    ? localStorage.getItem("ln") ===
                      UrlConstants.englishLanguage
                      ? isES
                        ? JSON.parse(sessionStorage.getItem("langTranslation"))
                            .snacks_repeat_password_required[1].es
                        : JSON.parse(sessionStorage.getItem("langTranslation"))
                            .snacks_repeat_password_required[0].en
                      : isEN
                      ? JSON.parse(sessionStorage.getItem("langTranslation"))
                          .snacks_repeat_password_required[0].en
                      : JSON.parse(sessionStorage.getItem("langTranslation"))
                          .snacks_repeat_password_required[1].es
                    : "Repeat New Password is required"
                )
                .test(
                  "passwords-match",
                  sessionStorage.getItem("langTranslation") &&
                    JSON.parse(sessionStorage.getItem("langTranslation"))
                      .snacks_password_match
                    ? localStorage.getItem("ln") ===
                      UrlConstants.englishLanguage
                      ? isES
                        ? JSON.parse(sessionStorage.getItem("langTranslation"))
                            .snacks_password_match[1].es
                        : JSON.parse(sessionStorage.getItem("langTranslation"))
                            .snacks_password_match[0].en
                      : isEN
                      ? JSON.parse(sessionStorage.getItem("langTranslation"))
                          .snacks_password_match[0].en
                      : JSON.parse(sessionStorage.getItem("langTranslation"))
                          .snacks_password_match[1].es
                    : "New Password or Repeat New Password must be match",
                  function (value) {
                    return this.parent.newPassword === value;
                  }
                ),
            })}
            onSubmit={(values, { resetForm }) => {
              this.setState({ isSpinner: true });
              delete values.confirmPassword;
              values.lang = isES
                ? UrlConstants.spanishLanguage
                : UrlConstants.englishLanguage;
              values.token = authenticateToken;
              APIUtil.putMethod(UrlConstants.resetpassword, values, true)
                .then((response) => {
                  if (response.data && JSON.parse(response.data.success)) {
                    this.setState(
                      {
                        successMessage: response.data.message,
                        showSuccessAlert: true,
                        isSpinner: false,
                      },
                      () => {
                        setTimeout(() => {
                          window.location.href =
                            UrlConstants.tastyRewardUrl + "/en-us";
                        }, 3000);
                      }
                    );
                  } else {
                    this.setState({
                      successMessage: response.data.message,
                      submissionMessage: "error",
                      submissionStatus: true,
                      isSpinner: false,
                    });
                  }
                })
                .catch((data) => {
                  let errorMsg = UrlConstants.errorMsg;
                  this.setState({
                    successMessage: errorMsg,
                    submissionMessage: "error",
                    submissionStatus: true,
                    isSpinner: false,
                  });
                });
              ClickedButton(BUTTONNAME.RESETPASSWORD, PAGENAME.RESETPASSWORD, {
                PageTitle: PAGENAME.RESETPASSWORD,
              });
            }}
          >
            {({ setFieldTouched, handleChange, errors, touched }) => (
              <Form
                className={`loginForm login-form custom-form forgot-pwd-form is-forgot`}
              >
                <div className="iframe-logo">
                  <img
                    src={
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
                      .snacks_reset_password
                      ? localStorage.getItem("ln") ===
                        UrlConstants.englishLanguage
                        ? isES
                          ? JSON.parse(
                              sessionStorage.getItem("langTranslation")
                            ).snacks_reset_password[1].es
                          : JSON.parse(
                              sessionStorage.getItem("langTranslation")
                            ).snacks_reset_password[0].en
                        : isEN
                        ? JSON.parse(sessionStorage.getItem("langTranslation"))
                            .snacks_reset_password[0].en
                        : JSON.parse(sessionStorage.getItem("langTranslation"))
                            .snacks_reset_password[1].es
                      : "Reset Password"}
                  </h1>

                  <Grid container spacing={2} className="form-card-container">
                    <Grid item xs={12} sm={12}>
                      <div className="pwd-requirements">
                        {ReactHtmlParser(
                          sessionStorage.getItem("langTranslation") &&
                            JSON.parse(
                              sessionStorage.getItem("langTranslation")
                            ).snacks_password_requirements
                            ? localStorage.getItem("ln") ===
                              UrlConstants.englishLanguage
                              ? isES
                                ? JSON.parse(
                                    sessionStorage.getItem("langTranslation")
                                  ).snacks_password_requirements[1].es
                                : JSON.parse(
                                    sessionStorage.getItem("langTranslation")
                                  ).snacks_password_requirements[0].en
                              : isEN
                              ? JSON.parse(
                                  sessionStorage.getItem("langTranslation")
                                ).snacks_password_requirements[0].en
                              : JSON.parse(
                                  sessionStorage.getItem("langTranslation")
                                ).snacks_password_requirements[1].es
                            : "<ul><li><small>Password requirements:</small></li><li><small>At least 8 characters</small></li><li><small>A lower case letter</small></li><li><small>An upper case letter</small></li><li><small>A number</small></li><li><small>A symbol</small></li><li><small>No parts of your username</small></li></ul>"
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <FormControl
                        fullWidth
                        className="form-group"
                        variant="outlined"
                      >
                        <InputLabel
                          className="form-label"
                          htmlFor="newPassword"
                        >
                          {sessionStorage.getItem("langTranslation") &&
                          JSON.parse(sessionStorage.getItem("langTranslation"))
                            .snacks_new_password
                            ? localStorage.getItem("ln") ===
                              UrlConstants.englishLanguage
                              ? isES
                                ? JSON.parse(
                                    sessionStorage.getItem("langTranslation")
                                  ).snacks_new_password[1].es
                                : JSON.parse(
                                    sessionStorage.getItem("langTranslation")
                                  ).snacks_new_password[0].en
                              : isEN
                              ? JSON.parse(
                                  sessionStorage.getItem("langTranslation")
                                ).snacks_new_password[0].en
                              : JSON.parse(
                                  sessionStorage.getItem("langTranslation")
                                ).snacks_new_password[1].es
                            : "New Password"}
                          <span className="text-danger">*</span>
                        </InputLabel>
                        <OutlinedInput
                          id="newPassword"
                          name="newPassword"
                          inputProps={{
                            "aria-required": "true",
                          }}
                          type="password"
                          onChange={handleChange}
                          onBlur={(e) => {
                            setFieldTouched(`newPassword`, true);
                          }}
                          error={Boolean(
                            touched.newPassword && errors.newPassword
                          )}
                        />
                        <ErrorMessage
                          role="alert"
                          component="div"
                          name="newPassword"
                          className="text-danger error-icon-wrapper"
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <FormControl
                        fullWidth
                        className="form-group"
                        variant="outlined"
                      >
                        <InputLabel
                          className="form-label"
                          htmlFor="confirmPassword"
                        >
                          {sessionStorage.getItem("langTranslation") &&
                          JSON.parse(sessionStorage.getItem("langTranslation"))
                            .snacks_repeat_password
                            ? localStorage.getItem("ln") ===
                              UrlConstants.englishLanguage
                              ? isES
                                ? JSON.parse(
                                    sessionStorage.getItem("langTranslation")
                                  ).snacks_repeat_password[1].es
                                : JSON.parse(
                                    sessionStorage.getItem("langTranslation")
                                  ).snacks_repeat_password[0].en
                              : isEN
                              ? JSON.parse(
                                  sessionStorage.getItem("langTranslation")
                                ).snacks_repeat_password[0].en
                              : JSON.parse(
                                  sessionStorage.getItem("langTranslation")
                                ).snacks_repeat_password[1].es
                            : "Repeat Password"}
                          <span className="text-danger">*</span>
                        </InputLabel>
                        <OutlinedInput
                          autoComplete="confirmPassword"
                          id="confirmPassword"
                          name="confirmPassword"
                          inputProps={{
                            "aria-required": "true",
                          }}
                          type="password"
                          onChange={handleChange}
                          onBlur={(e) => {
                            setFieldTouched(`confirmPassword`, true);
                          }}
                          error={Boolean(
                            touched.confirmPassword && errors.confirmPassword
                          )}
                        />
                        <ErrorMessage
                          role="alert"
                          component="div"
                          name="confirmPassword"
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
                      id="savePassword"
                      aria-label="savePassword"
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
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}

export default ResetPassword;
