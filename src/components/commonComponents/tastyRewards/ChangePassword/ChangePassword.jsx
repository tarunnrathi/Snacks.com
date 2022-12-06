import React, { Component } from "react";
import { Alert, Button, FormControl, Grid, InputLabel, OutlinedInput, Snackbar } from '@mui/material';
import { ErrorMessage, Formik, Form } from "formik";
import * as Yup from "yup";
import APIUtil from "../../../../config/APIUtil";
import UrlConstants from "../../../../config/UrlConstants";
import Spinner from "../../../Spinner";
import ReactHtmlParser from "react-html-parser";
import OktaAuth from "@okta/okta-auth-js";
import config from "../../../../oktaconfig";
import Axios from "axios";
import {
  ViewedPage,
  ClickedButton,
} from "../../../../config/amplitude/SnacksAmplitude";
import {
  PAGENAME,
  BUTTONNAME,
} from "../../../../config/amplitude/Taxonomy.constants";
import "./ChangePassword.scss";

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialValues: {
        currentPassword: null,
        password: null,
        confirmPassword: null,
        submissionMessage: "",
        successMessage: "",
        submissionStatus: false,
        isSpinner: false,
      },
    };
  }

  componentDidMount() {
    ViewedPage(PAGENAME.CHANGEPASSWORD);
  }

  updatePasswordByExistingToken = (passObj, resetForm) => {
    let self = this;
    APIUtil.putMethod(UrlConstants.changePassword, passObj, true)
      .then((response) => {
        if (!!response.data && !!response.data.success) {
          resetForm({
            currentPassword: "",
            password: "",
            confirmPassword: "",
          });
          self.setState(
            {
              successMessage: response.data.message,
              submissionMessage: "success",
              submissionStatus: true,
              isSpinner: false,
            },
            () =>
              setTimeout(() => {
                self.setState({
                  successMessage: null,
                  submissionStatus: false,
                  isSpinner: false,
                });
                document.getElementById("body").classList.remove("has-toast");
                window.history.go(-1);
              }, 3000)
          );
        } else {
          self.setState(
            {
              successMessage: response.data.message,
              submissionMessage: "error",
              submissionStatus: true,
              isSpinner: false,
            },
            () =>
              setTimeout(() => {
                self.setState({
                  successMessage: null,
                  submissionStatus: false,
                });
                document.getElementById("body").classList.remove("has-toast");
              }, 6000)
          );
        }
      })
      .catch((data) => {
        let errorMsg = UrlConstants.errorMsg;
        self.setState(
          {
            successMessage: errorMsg,
            submissionMessage: "error",
            submissionStatus: true,
            isSpinner: false,
          },
          () =>
            setTimeout(() => {
              self.setState({
                successMessage: null,
                submissionStatus: false,
              });
              document.getElementById("body").classList.remove("has-toast");
            }, 3000)
        );
        self.setState({ isSpinner: false });
      });
  };

  updatePasswordByNewToken = (passObj, oktaAuth, resetForm) => {
    let self = this;
    oktaAuth.token
      .getWithoutPrompt({
        responseType: "code",
        scopes: config.oidc.scopes, // or array of types
      })
      .then(function (res) {
        let accessToken = res.tokens.accessToken.accessToken;
        localStorage.setItem("idToken", JSON.stringify(res.tokens.idToken));
        localStorage.setItem(
          "accessToken",
          JSON.stringify(res.tokens.accessToken)
        );
        localStorage.setItem("okta-token-storage", JSON.stringify(res.tokens));
        var headersSet = {
          Accept: "application/json",
          "Content-Type": "application/json",
        };
        if (accessToken) {
          headersSet["sessionId"] = sessionStorage.getItem("_ss_i");
          headersSet["rnduts"] = sessionStorage.getItem("_rr_n_dts");
          headersSet["encstr"] = sessionStorage.getItem("_en_cs");
          headersSet["X-Auth-Token"] = accessToken;
          return Axios({
            method: "put",
            url: UrlConstants.changePassword,
            headers: headersSet,
            data: passObj,
          })
            .then((response) => {
              if (!!response.data && !!response.data.success) {
                resetForm({
                  currentPassword: "",
                  password: "",
                  confirmPassword: "",
                });
                self.setState(
                  {
                    successMessage: response.data.message,
                    submissionMessage: "success",
                    submissionStatus: true,
                    isSpinner: false,
                  },
                  () =>
                    setTimeout(() => {
                      self.setState({
                        successMessage: null,
                        submissionStatus: false,
                        isSpinner: false,
                      });
                      document
                        .getElementById("body")
                        .classList.remove("has-toast");
                      window.history.go(-1);
                    }, 3000)
                );
              } else {
                self.setState(
                  {
                    successMessage: response.data.message,
                    submissionMessage: "error",
                    submissionStatus: true,
                    isSpinner: false,
                  },
                  () =>
                    setTimeout(() => {
                      self.setState({
                        successMessage: null,
                        submissionStatus: false,
                      });
                      document
                        .getElementById("body")
                        .classList.remove("has-toast");
                    }, 6000)
                );
              }
            })
            .catch(function (data) {
              let errorMsg = UrlConstants.errorMsg;
              self.setState(
                {
                  successMessage: errorMsg,
                  submissionMessage: "error",
                  submissionStatus: true,
                  isSpinner: false,
                },
                () =>
                  setTimeout(() => {
                    self.setState({
                      successMessage: null,
                      submissionStatus: false,
                    });
                    document
                      .getElementById("body")
                      .classList.remove("has-toast");
                  }, 3000)
              );
              self.setState({ isSpinner: false });
            });
        }
      });
  };

  render() {
    const isES =
      sessionStorage.getItem("isMultiLanguage") === "true" &&
      window.location.href.indexOf("es-us") > -1;
    const isEN = !isES;

    return (
      <div className="modal-tr-changepassword-container">
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
        <div className="forgot-content">
          {this.state.isSpinner ? <Spinner /> : ""}
          <Formik
            enableReinitialize
            initialValues={this.state.initialValues}
            validationSchema={Yup.object().shape({
              currentPassword: Yup.string()
                .nullable()
                .required(
                  JSON.parse(sessionStorage.getItem("langTranslation"))
                    .snacks_current_password_required
                    ? localStorage.getItem("ln") ===
                      UrlConstants.englishLanguage
                      ? isES
                        ? JSON.parse(sessionStorage.getItem("langTranslation"))
                            .snacks_current_password_required[1].es
                        : JSON.parse(sessionStorage.getItem("langTranslation"))
                            .snacks_current_password_required[0].en
                      : isEN
                      ? JSON.parse(sessionStorage.getItem("langTranslation"))
                          .snacks_current_password_required[0].en
                      : JSON.parse(sessionStorage.getItem("langTranslation"))
                          .snacks_current_password_required[1].es
                    : "Current Password is required."
                ),
              password: Yup.string()
                .nullable()
                .required(
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
                ),
              confirmPassword: Yup.string()
                .nullable()
                .required(
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
                    return this.parent.password === value;
                  }
                ),
            })}
            onSubmit={(values, { resetForm }) => {
              let that = this;
              let oktaAuth = new OktaAuth(config.oidc);
              var passObj = {
                oldPassword: { value: values.currentPassword },
                newPassword: { value: values.password },
                lang: isES
                  ? UrlConstants.spanishLanguage
                  : UrlConstants.englishLanguage,
              };
              that.setState({ isSpinner: true });
              oktaAuth.session.get().then(function (session) {
                if (
                  session.status === "ACTIVE" &&
                  localStorage.getItem("accessToken") !== null
                ) {
                  that.updatePasswordByExistingToken(passObj, resetForm);
                } else {
                  localStorage.setItem("token", "Bearer " + session.id);
                  that.updatePasswordByNewToken(passObj, oktaAuth, resetForm);
                }
              });
              resetForm(this.state.initialValues);
              window.scrollTo(0, 0);
              // setSubmitting(false)
              ClickedButton(BUTTONNAME.SAVE, PAGENAME.CHANGEPASSWORD, {
                PageTitle: PAGENAME.CHANGEPASSWORD,
              });
            }}
          >
            {({
              resetForm,
              setFieldValue,
              setFieldTouched,
              errors,
              values,
              touched,
              handleChange,
            }) => (
              <Form
                id="changePassword"
                name="changePassword"
                autoComplete="changePassword"
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
                    {JSON.parse(sessionStorage.getItem("langTranslation"))
                      .snacks_change_pwd
                      ? localStorage.getItem("ln") ===
                        UrlConstants.englishLanguage
                        ? isES
                          ? JSON.parse(
                              sessionStorage.getItem("langTranslation")
                            ).snacks_change_pwd[1].es
                          : JSON.parse(
                              sessionStorage.getItem("langTranslation")
                            ).snacks_change_pwd[0].en
                        : isEN
                        ? JSON.parse(sessionStorage.getItem("langTranslation"))
                            .snacks_change_pwd[0].en
                        : JSON.parse(sessionStorage.getItem("langTranslation"))
                            .snacks_change_pwd[1].es
                      : "Change password"}
                  </h1>
                  <Grid container spacing={2} className="form-card-container">
                    <Grid item xs={12} sm={12}>
                      <div className="pwd-requirements">
                        {ReactHtmlParser(
                          JSON.parse(sessionStorage.getItem("langTranslation"))
                            .snacks_password_requirements
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
                    {/* Current Password */}
                    <Grid item xs={12} sm={12}>
                      <FormControl
                        fullWidth
                        className="form-group"
                        variant="outlined"
                      >
                        <InputLabel
                          className="form-label"
                          htmlFor="currentPassword"
                        >
                          {JSON.parse(sessionStorage.getItem("langTranslation"))
                            .snacks_current_password
                            ? localStorage.getItem("ln") ===
                              UrlConstants.englishLanguage
                              ? isES
                                ? JSON.parse(
                                    sessionStorage.getItem("langTranslation")
                                  ).snacks_current_password[1].es
                                : JSON.parse(
                                    sessionStorage.getItem("langTranslation")
                                  ).snacks_current_password[0].en
                              : isEN
                              ? JSON.parse(
                                  sessionStorage.getItem("langTranslation")
                                ).snacks_current_password[0].en
                              : JSON.parse(
                                  sessionStorage.getItem("langTranslation")
                                ).snacks_current_password[1].es
                            : "Current Password"}
                          <span className="text-danger">*</span>
                        </InputLabel>
                        <OutlinedInput
                          autoComplete="current-password"
                          id="currentPassword"
                          name="currentPassword"
                          inputProps={{
                            "aria-required": "true",
                          }}
                          type="password"
                          value={values.currentPassword || ""}
                          onChange={handleChange}
                          onBlur={(e) => {
                            setFieldTouched(`currentPassword`, true);
                          }}
                          error={Boolean(
                            touched.currentPassword && errors.currentPassword
                          )}
                        />
                        <ErrorMessage
                          component="div"
                          name={`currentPassword`}
                          className="text-danger error-icon-wrapper"
                          role="alert"
                        />
                      </FormControl>
                    </Grid>
                    {/* New Password */}
                    <Grid item xs={12} sm={12}>
                      <FormControl
                        fullWidth
                        className="form-group"
                        variant="outlined"
                      >
                        <InputLabel className="form-label" htmlFor="password">
                          {JSON.parse(sessionStorage.getItem("langTranslation"))
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
                          autoComplete="new-password"
                          id="password"
                          name="password"
                          inputProps={{
                            "aria-required": "true",
                          }}
                          value={values.password || ""}
                          type="password"
                          onChange={handleChange}
                          onBlur={(e) => {
                            setFieldTouched(`password`, true);
                          }}
                          error={Boolean(touched.password && errors.password)}
                        />
                        <ErrorMessage
                          component="div"
                          name={`password`}
                          role="alert"
                          className="text-danger error-icon-wrapper"
                        />
                      </FormControl>
                    </Grid>
                    {/* New Password */}
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
                          {JSON.parse(sessionStorage.getItem("langTranslation"))
                            .snacks_repeat_new_password
                            ? localStorage.getItem("ln") ===
                              UrlConstants.englishLanguage
                              ? isES
                                ? JSON.parse(
                                    sessionStorage.getItem("langTranslation")
                                  ).snacks_repeat_new_password[1].es
                                : JSON.parse(
                                    sessionStorage.getItem("langTranslation")
                                  ).snacks_repeat_new_password[0].en
                              : isEN
                              ? JSON.parse(
                                  sessionStorage.getItem("langTranslation")
                                ).snacks_repeat_new_password[0].en
                              : JSON.parse(
                                  sessionStorage.getItem("langTranslation")
                                ).snacks_repeat_new_password[1].es
                            : "Repeat New Password"}
                          <span className="text-danger">*</span>
                        </InputLabel>
                        <OutlinedInput
                          autoComplete="new-password"
                          id="confirmPassword"
                          name="confirmPassword"
                          inputProps={{
                            "aria-required": "true",
                          }}
                          value={values.confirmPassword || ""}
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
                          component="div"
                          name={`confirmPassword`}
                          role="alert"
                          className="text-danger error-icon-wrapper"
                        />
                      </FormControl>
                    </Grid>
                    <Grid item>
                      <div className="button-group button-group-ch">
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          className="mui-btn btn-primary"
                          id="savePassword"
                          aria-label={`${
                            JSON.parse(
                              sessionStorage.getItem("langTranslation")
                            ).snacks_save
                              ? localStorage.getItem("ln") ===
                                UrlConstants.englishLanguage
                                ? isES
                                  ? JSON.parse(
                                      sessionStorage.getItem("langTranslation")
                                    ).snacks_save[1].es
                                  : JSON.parse(
                                      sessionStorage.getItem("langTranslation")
                                    ).snacks_save[0].en
                                : isEN
                                ? JSON.parse(
                                    sessionStorage.getItem("langTranslation")
                                  ).snacks_save[0].en
                                : JSON.parse(
                                    sessionStorage.getItem("langTranslation")
                                  ).snacks_save[1].es
                              : "Save"
                          } ${
                            JSON.parse(
                              sessionStorage.getItem("langTranslation")
                            ).snacks_password
                              ? localStorage.getItem("ln") ===
                                UrlConstants.englishLanguage
                                ? isES
                                  ? JSON.parse(
                                      sessionStorage.getItem("langTranslation")
                                    ).snacks_password[1].es
                                  : JSON.parse(
                                      sessionStorage.getItem("langTranslation")
                                    ).snacks_password[0].en
                                : isEN
                                ? JSON.parse(
                                    sessionStorage.getItem("langTranslation")
                                  ).snacks_password[0].en
                                : JSON.parse(
                                    sessionStorage.getItem("langTranslation")
                                  ).snacks_password[1].es
                              : "Password"
                          }`}
                        >
                          {JSON.parse(sessionStorage.getItem("langTranslation"))
                            .snacks_save
                            ? localStorage.getItem("ln") ===
                              UrlConstants.englishLanguage
                              ? isES
                                ? JSON.parse(
                                    sessionStorage.getItem("langTranslation")
                                  ).snacks_save[1].es
                                : JSON.parse(
                                    sessionStorage.getItem("langTranslation")
                                  ).snacks_save[0].en
                              : isEN
                              ? JSON.parse(
                                  sessionStorage.getItem("langTranslation")
                                ).snacks_save[0].en
                              : JSON.parse(
                                  sessionStorage.getItem("langTranslation")
                                ).snacks_save[1].es
                            : "Save"}
                        </Button>
                        <Button
                          // type="submit"
                          variant="contained"
                          color="primary"
                          className="mui-btn btn-secondary"
                          id="cancelPassword"
                          aria-label={`${
                            JSON.parse(
                              sessionStorage.getItem("langTranslation")
                            ).snacks_cancel_text
                              ? localStorage.getItem("ln") ===
                                UrlConstants.englishLanguage
                                ? isES
                                  ? JSON.parse(
                                      sessionStorage.getItem("langTranslation")
                                    ).snacks_cancel_text[1].es
                                  : JSON.parse(
                                      sessionStorage.getItem("langTranslation")
                                    ).snacks_cancel_text[0].en
                                : isEN
                                ? JSON.parse(
                                    sessionStorage.getItem("langTranslation")
                                  ).snacks_cancel_text[0].en
                                : JSON.parse(
                                    sessionStorage.getItem("langTranslation")
                                  ).snacks_cancel_text[1].es
                              : "Cancel"
                          } ${
                            JSON.parse(
                              sessionStorage.getItem("langTranslation")
                            ).snacks_password
                              ? localStorage.getItem("ln") ===
                                UrlConstants.englishLanguage
                                ? isES
                                  ? JSON.parse(
                                      sessionStorage.getItem("langTranslation")
                                    ).snacks_password[1].es
                                  : JSON.parse(
                                      sessionStorage.getItem("langTranslation")
                                    ).snacks_password[0].en
                                : isEN
                                ? JSON.parse(
                                    sessionStorage.getItem("langTranslation")
                                  ).snacks_password[0].en
                                : JSON.parse(
                                    sessionStorage.getItem("langTranslation")
                                  ).snacks_password[1].es
                              : "Password"
                          }`}
                          onClick={() => {
                            window.history.go(-1);
                            ClickedButton(
                              BUTTONNAME.CANCEL,
                              PAGENAME.CHANGEPASSWORD,
                              {
                                PageTitle: PAGENAME.CHANGEPASSWORD,
                              }
                            );
                          }}
                        >
                          {JSON.parse(sessionStorage.getItem("langTranslation"))
                            .snacks_cancel_text
                            ? localStorage.getItem("ln") ===
                              UrlConstants.englishLanguage
                              ? isES
                                ? JSON.parse(
                                    sessionStorage.getItem("langTranslation")
                                  ).snacks_cancel_text[1].es
                                : JSON.parse(
                                    sessionStorage.getItem("langTranslation")
                                  ).snacks_cancel_text[0].en
                              : isEN
                              ? JSON.parse(
                                  sessionStorage.getItem("langTranslation")
                                ).snacks_cancel_text[0].en
                              : JSON.parse(
                                  sessionStorage.getItem("langTranslation")
                                ).snacks_cancel_text[1].es
                            : "Cancel"}
                        </Button>
                      </div>
                    </Grid>
                  </Grid>

                  <Grid item className="social-note">
                    {JSON.parse(sessionStorage.getItem("langTranslation"))
                      .snacks_social_note
                      ? localStorage.getItem("ln") ===
                        UrlConstants.englishLanguage
                        ? isES
                          ? JSON.parse(
                              sessionStorage.getItem("langTranslation")
                            ).snacks_social_note[1].es
                          : JSON.parse(
                              sessionStorage.getItem("langTranslation")
                            ).snacks_social_note[0].en
                        : isEN
                        ? JSON.parse(sessionStorage.getItem("langTranslation"))
                            .snacks_social_note[0].en
                        : JSON.parse(sessionStorage.getItem("langTranslation"))
                            .snacks_social_note[1].es
                      : "Note: Users signing in using social connections need to reset their passwords with the relevant Identity Provider"}
                  </Grid>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}

export default ChangePassword;
