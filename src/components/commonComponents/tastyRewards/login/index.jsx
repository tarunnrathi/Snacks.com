import React, { Component } from "react";
import { ErrorMessage, Formik, Field } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { LoginAuth } from "../../../../actions/ProductAction";
import Spinner from "../../../Spinner";
import { withRouter } from "react-router-dom";
import OktaApiUtil from "../../../../config/OktaApiUtil";
import config from "../../../../oktaconfig";
import UrlConstants from "./../../../../config/UrlConstants";
import { trackEvent, EventNames } from "../../../../appinsights/EventTrack";
import { DisplayHeading } from "./../../../../config/constants/content.constant";
import { withOktaAuth } from "@okta/okta-react";
import { ClickedButton } from "../../../../config/amplitude/SnacksAmplitude";
import {
  PAGENAME,
  BUTTONNAME,
} from "../../../../config/amplitude/Taxonomy.constants";
import "./login.scss";
import { Alert,Button, FormControl, IconButton, InputAdornment } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

class TRLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      msg: null,
      msgType: "success",
      password: "",
      email: "",
      submitDisabled: false,
      errorMessage: "",
      showPassword: false,
      filledemail: this.getCookie("u-em"),
      filledpassword: this.getCookie("u-pw") && atob(this.getCookie("u-pw")),
      isCheckboxChecked: this.getCookie("u-em") ? true : false,
    };
    this.nameFieldValidation.bind(this);
  }

  setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  handleClose = () => {
    this.setState({ ZipfailMessage: "" });
    document.getElementById("body").classList.remove("has-toast");
  };

  nameFieldValidation = (e, setFieldValue) => {
    this.setState({ [e.target.id]: "" });

    if (e.target.value || e.target.value === "") {
      setFieldValue([e.target.id], e.target.value);
    }
  };

  handleLogin = (fields) => {
    this.removeMsg();
    this.setState({ spinner: true, msg: "", msgType: "success" });
    trackEvent(
      EventNames.Action.ACTION_LOGIN,
      EventNames.Event.EVENT_BUTTON_PRESS,
      window.location.origin,
      window.location.pathname,
      { email: fields.email }
    );
    OktaApiUtil.userLogin(fields.email, fields.password)
      .then((res) => {
        this.setState({ spinner: false });
        if (res.data !== undefined) {
          this.props.LoginAuth(res);
          setTimeout(() => {
            if (res.data.status === "SUCCESS" && this.props.isAuthenticated) {
              const sessionToken = res.sessionToken;
              localStorage.setItem("token", "Bearer " + sessionToken);
              this.props.authService.redirect({ sessionToken });
              // OktaApiUtil.getCode(sessionToken);
              if (document.getElementById("rememberMe").checked) {
                this.setCookie("u-em", fields.email, 30);
                this.setCookie("u-pw", btoa(fields.password), 30);
              } else {
                document.cookie =
                  "u-em=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                document.cookie =
                  "u-pw=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
              }
            } else if (res.data.status === "LOCKED_OUT") {
              this.setState({
                msg: UrlConstants.userAccountLocked,
                msgType: "error",
              });
            }
          });
        } else if (res.status === "404") {
          this.setState({
            msg: "We are facing some technical issue. Please try again after sometime.",
            msgType: "error",
          });
        } else {
          this.setState({ msg: res.toString(), msgType: "error" });
        }
      })
      .catch((err) => {
        this.setState({ spinner: false });
        this.setState({ msg: err.toString(), msgType: "error" }, () =>
          this.removeMsg()
        );
      });
  };
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
  handleClickShowPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  };
  handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  render() {
    const pkceChallenge = require("pkce-challenge");
    const challenge = pkceChallenge();
    localStorage.setItem("code_verifier", challenge.code_verifier);

    return (
      <>
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
        <Formik
          initialValues={{
            email: this.state.filledemail ? this.state.filledemail : "",
            password: this.state.filledpassword
              ? this.state.filledpassword
              : "",
          }}
          enableReinitialize={true}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email("Please enter a valid email.")
              .required("Please enter a username"),
            password: Yup.string()
              .required("Please enter a password")
              .min(8, "Password must be at least 8 characters."),
          })}
          onSubmit={(fields) => this.handleLogin(fields)}
        >
          {(props) => {
            const {
              values,
              touched,
              errors,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
            } = props;

            const socialLoginUrl = `${config.oidc.issuer}/v1/authorize?idp=${config.oidc.googleIDP}&client_id=${config.oidc.clientId}&response_type=code&scope=openid email profile TastyRewards&redirect_uri=${window.location.origin}/implicit/ssocallback&state=state-8600b31f2-52d1-4dca-987c-386e3d8967e9&code_challenge_method=S256&code_challenge=${challenge.code_challenge}`;

            return (
              <div className="login-wrapper">
                <form onSubmit={handleSubmit} className="tr-account-form">
                  <h2
                    className="title"
                    aria-label={DisplayHeading.TASTY_REWARDS_SIGN_IN}
                  >
                    {DisplayHeading.TASTY_REWARDS_SIGN_IN}
                  </h2>
                  <fieldset className="form-card">
                    <a href={socialLoginUrl} className="google-sign">
                      Sign in with Google
                    </a>
                    <div className="separator-text">OR</div>

                    <div className="login-input-item">
                      <FormControl
                        fullWidth
                        className="form-group"
                        variant="outlined"
                      >
                        <Field
                          type="text"
                          placeholder="Email Address"
                          name="email"
                          id="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors.email && touched.email ? "invalid-field" : ""
                          }
                        />
                        <ErrorMessage
                          role="alert"
                          component="div"
                          name="email"
                          className="text-danger"
                        />
                      </FormControl>
                    </div>
                    <div className="login-input-item">
                      <FormControl
                        fullWidth
                        className="has-password"
                        variant="outlined"
                      >
                        <Field
                          id="password"
                          name="password"
                          type={this.state.showPassword ? "text" : "password"}
                          placeholder="Password"
                          value={values.password}
                          onChange={(e) =>
                            this.nameFieldValidation(e, setFieldValue)
                          }
                          onBlur={handleBlur}
                          className={
                            errors.password && touched.password
                              ? "invalid-field"
                              : ""
                          }
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={this.handleClickShowPassword}
                                onMouseDown={this.handleMouseDownPassword}
                                edge="end"
                              >
                                {this.state.showPassword ? (
                                  <VisibilityIcon />
                                ) : (
                                  <VisibilityOffIcon />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                        <InputAdornment
                          position="end"
                          className="togglePasswordIcn"
                        >
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={this.handleClickShowPassword}
                            onMouseDown={this.handleMouseDownPassword}
                            edge="end"
                          >
                            {this.state.showPassword ? (
                              <VisibilityIcon />
                            ) : (
                              <VisibilityOffIcon />
                            )}
                          </IconButton>
                        </InputAdornment>

                        {this.state.password ? (
                          <div className="text-danger" role="alert">
                            {this.state.password}
                          </div>
                        ) : (
                          <ErrorMessage
                            role="alert"
                            component="div"
                            name="password"
                            className="text-danger"
                          />
                        )}
                      </FormControl>
                      <span
                        toggle="#password-field"
                        className="field-icon"
                      ></span>
                    </div>
                    <div className="checkbox-wrap">
                      <div>
                        <label
                          htmlFor="edit-persistent-login"
                          className="remember"
                        >
                          <input
                            className="form-checkbox"
                            type="checkbox"
                            id="rememberMe"
                            checked={this.state.isCheckboxChecked}
                            onClick={() =>
                              this.setState({
                                isCheckboxChecked:
                                  !this.state.isCheckboxChecked,
                              })
                            }
                          />
                          Remember me
                        </label>
                      </div>
                      <div>
                        <p className="password-request">
                          <a
                            onClick={(e) => {
                              e.preventDefault();
                              this.props.onClickForgot();
                            }}
                          >
                            Forgot Your Password?
                          </a>
                        </p>
                      </div>
                    </div>
                    <div className="btn-wrap">
                      <Button
                        type="submit"
                        disabled={this.state.submitDisabled}
                        variant="contained"
                        color="primary"
                        className="login-btn"
                        id="SignIn"
                        onClick={() => {
                          ClickedButton(BUTTONNAME.SIGNIN, PAGENAME.LOGIN, {
                            PageTitle: PAGENAME.LOGIN,
                          });
                          sessionStorage.setItem("checkoutMode", "Login");
                        }}
                        aria-label={DisplayHeading.SIGN_IN}
                      >
                        {DisplayHeading.SIGN_IN}
                      </Button>
                    </div>
                  </fieldset>
                </form>
              </div>
            );
          }}
        </Formik>
        <p className="footer-text">
          Don't have an account yet?{" "}
          <a
            onClick={(e) => {
            e.preventDefault();
            this.props.onClickSignup();
            }}
          >
            Sign up
          </a>
        </p>
      </>
    );
  }
}

//export default TRLogin;
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.reducer.isAuthenticated,
  };
};
export default connect(mapStateToProps, { LoginAuth })(
  withOktaAuth(withRouter(TRLogin))
);
