
import { ErrorMessage, Formik } from "formik";
import React from "react";
import { withRouter } from "react-router-dom";
import * as Yup from "yup";
import { LoginAuth } from "../../../../actions/ProductAction";
import { connect } from "react-redux";
import Spinner from "../../../Spinner";
import OktaApiUtil from "../../../../config/OktaApiUtil";
import UrlConstants from "../.././../../config/UrlConstants";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { trackEvent, EventNames } from "../../../../appinsights/EventTrack";
import { DisplayHeading } from "../../../../config/constants/content.constant";
import { withOktaAuth } from "@okta/okta-react";
import {
  ViewedPage,
  ClickedButton,
} from "../../../../config/amplitude/SnacksAmplitude";
import {
  PAGENAME,
  BUTTONNAME,
} from "../../../../config/amplitude/Taxonomy.constants";
import "./combinedUserLogin.scss";
import { Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { Alert } from '@mui/material';

class CombinedUserLogin extends React.Component {
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
      isCombinedUser: true,
    };
    this.nameFieldValidation.bind(this);
  }

  componentDidMount() {
    trackEvent(
      EventNames.Action.ACTION_LOGIN_POPUP,
      EventNames.Event.EVENT_PAGE_VIEW,
      window.location.origin,
      window.location.pathname,
      {
        from:
          sessionStorage.getItem("prevUrl") !== null
            ? sessionStorage.getItem("prevUrl")
            : "home",
      }
    );
    setTimeout(function () {
      window.scrollTo(0, 0);
    }, 10);
    ViewedPage(PAGENAME.LOGIN);
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
    return (
      <div>
        {this.props.spinner ? <Spinner /> : ""}
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
        <div className="combined-user-head">
          <div className="logo-container">
            <img
              src="/www/images/PopupLogo.png"
              alt={DisplayHeading.SITE_NAME}
              className="snacks-logo"
            />
            <img
              src="/www/images/tasty-rewards.png"
              alt={DisplayHeading.SITE_NAME}
              className="tr-logo"
            />
          </div>
          <h2 className="title" aria-label={DisplayHeading.SIGN_IN}>
            {DisplayHeading.SIGN_IN}
          </h2>

          <div className="head-content">
            <div className="text-content">
              <h5 className="title">Exciting news, we’ve merged!</h5>
              <p className="text">
                Moving forward, use your PepsiCo Tasty Rewards account credentials to log onto both Snacks.com and Tasty Rewards.
              </p>
            </div>
          </div>
        </div>
        <Formik
          initialValues={{ email: this.props.userEmail || "", password: "" }}
          enableReinitialize={true}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email("Please enter a valid email.")
              .required("Email is required."),
            password: Yup.string()
              .required("Password is required.")
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

            return (
              <form
                id="loginForm"
                name="form1"
                onSubmit={handleSubmit}
                className="login-form custom-form"
              >
                {/** Login information */}
                <fieldset className="form-card">
                  <Grid container spacing={2} className="form-card-container">
                    {/** Email  */}
                    <Grid item xs={12} sm={12}>
                      <FormControl
                        fullWidth
                        className="form-group"
                        variant="outlined"
                      >
                        <InputLabel
                          className="form-label combined-form-label"
                          htmlFor="email"
                        >
                          Tasty Rewards Email
                          <span className="text-danger">*</span>
                        </InputLabel>
                        <OutlinedInput
                          id="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.email && Boolean(errors.email)}
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
                    </Grid>

                    {/** Password */}
                    <Grid item xs={12} sm={12}>
                      <FormControl
                        fullWidth
                        className="form-group has-password"
                        variant="outlined"
                      >
                        <InputLabel
                          className="form-label combined-form-label"
                          htmlFor="password"
                        >
                          Tasty Rewards Password
                          <span className="text-danger">*</span>
                        </InputLabel>
                        <OutlinedInput
                          id="password"
                          value={values.password}
                          type={this.state.showPassword ? "text" : "password"}
                          onChange={(e) =>
                            this.nameFieldValidation(e, setFieldValue)
                          }
                          onBlur={handleBlur}
                          error={touched.password && Boolean(errors.password)}
                          inputProps={{
                            "aria-required": "true",
                            role: "alert",
                            "aria-invalid": "false",
                          }}
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
                    </Grid>
                  </Grid>
                </fieldset>

                <div className="button-group">
                  <Button
                    className="btn-link forgot-pwd"
                    onClick={() => {
                      ClickedButton(BUTTONNAME.FORGOTPASSWORD, PAGENAME.LOGIN, {
                        PageTitle: PAGENAME.LOGIN,
                      });
                      window.location.href =
                        UrlConstants.shopTastyRewardsForgotPasswordUrl;
                    }}
                    aria-label="click here to reset password"
                  >
                    {DisplayHeading.FORGOT_PASSWORD}?
                  </Button>
                  <Button
                    type="submit"
                    disabled={this.state.submitDisabled}
                    variant="contained"
                    color="primary"
                    className="btn-mui signin-btn"
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
              </form>
            );
          }}
        </Formik>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    zipResponse: state.reducer.zipResponse,
    isAuthenticated: state.reducer.isAuthenticated,
  };
};
export default connect(mapStateToProps, { LoginAuth })(
  withOktaAuth(withRouter(CombinedUserLogin))
);
