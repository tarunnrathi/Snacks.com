import { ErrorMessage, Form, Formik } from "formik";
import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import * as Yup from "yup";
import { LoginAuth } from "../../actions/ProductAction";
import { connect } from "react-redux";
import Spinner from "../Spinner";
import OktaApiUtil from "../../config/OktaApiUtil";
import APIUtil from "../../config/APIUtil";
import UrlConstants from "./../../config/UrlConstants";
import { trackEvent, EventNames } from "../../appinsights/EventTrack";
import { DisplayHeading } from "./../../config/constants/content.constant";
import { withOktaAuth } from "@okta/okta-react";
import {
  Alert,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
  ViewedPage,
  ClickedButton,
} from "../../config/amplitude/SnacksAmplitude";
import {
  PAGENAME,
  BUTTONNAME,
} from "../../config/amplitude/Taxonomy.constants";
import validateAPIResponse from "../ApiHelper";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      isLoginComponent: this.props.fromForgot ? false : true,
      msg: null,
      msgType: "success",
      password: "",
      email: "",
      submitDisabled: false,
      errorMessage: "",
      showPassword: false,
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

  checkIsHybridUser = async (email, msg) => {
    try {
      let verifyEmailResponse = await APIUtil.postMethod(
        UrlConstants.verifyEmailForTastyrewards,
        { email: email },
        true
      );
      if (
        validateAPIResponse(verifyEmailResponse) &&
        verifyEmailResponse.data &&
        verifyEmailResponse.data.data.isHybridUser
      ) {
        this.setState({ spinner: false });
        this.props.onShowHybridLogin(email);
      } else {
        this.setState({ spinner: false });
        this.setState({ msg: msg, msgType: "error" });
      }
    } catch (err) {
      this.setState({ spinner: false });
      this.setState({ msg: msg, msgType: "error" }, () => this.removeMsg());
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
        if (res.data !== undefined) {
          this.setState({ spinner: false });
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
          this.setState({ spinner: false });
          this.setState({
            msg: "We are facing some technical issue. Please try again after sometime.",
            msgType: "error",
          });
        } else if (sessionStorage.getItem("IsTRSyncEnabled") === "true") {
          this.checkIsHybridUser(fields.email, res.toString());
        } else {
          this.setState({ spinner: false });
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

        {this.state.isLoginComponent ? (
          <Formik
            initialValues={{ email: "", password: "" }}
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
                  //onChange={sessionStorage.setItem('formValues', JSON.stringify(values))}
                  className="login-form custom-form"
                >
                  <h2 className="info0" aria-label={DisplayHeading.SIGN_IN}>
                    {DisplayHeading.SIGN_IN}
                  </h2>
                  <img
                    src="/www/images/PopupLogo.png"
                    alt={DisplayHeading.SITE_NAME}
                  />
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
                          <InputLabel className="form-label" htmlFor="email">
                            Email
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
                          <InputLabel className="form-label" htmlFor="password">
                            Password
                            <span className="text-danger">*</span>
                          </InputLabel>
                          <OutlinedInput
                            id="password"
                            // name = "First Name"
                            value={values.password}
                            // onChange={handleChange}
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
                        ClickedButton(
                          BUTTONNAME.FORGOTPASSWORD,
                          PAGENAME.LOGIN,
                          {
                            PageTitle: PAGENAME.LOGIN,
                          }
                        );
                        this.setState({
                          isLoginComponent: false,
                        });
                      }}
                      aria-label="click here to reset password"
                    >
                      {DisplayHeading.FORGOT_PASSWORD}
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
        ) : (
          <div>
            <Grid>
              <Formik
                enableReinitialize
                initialValues={{ email: "" }}
                validationSchema={Yup.object().shape({
                  email: Yup.string()
                    .email("Email must be a valid email.")
                    .required("Email is required."),
                })}
                onSubmit={(values, { resetForm, setIsSubmitting }) => {
                  trackEvent(
                    EventNames.Action.ACTION_FORGOT_PASSWORD,
                    EventNames.Event.EVENT_BUTTON_PRESS,
                    window.location.origin,
                    window.location.pathname,
                    { email: values.email }
                  );
                  let val = {
                    username: values.email,
                  };
                  APIUtil.postMethod(UrlConstants.forgotpassword, val, true)
                    .then((response) => {
                      if (validateAPIResponse(response)) {
                        if (response.data.success) {
                          resetForm({ email: "" });
                          this.setState(
                            { msg: response.data.message, msgType: "success" },
                            () => this.removeMsg()
                          );
                        } else {
                          this.setState(
                            { msg: UrlConstants.errorMsg, msgType: "error" },
                            () => this.removeMsg()
                          );
                        }
                      }
                      setIsSubmitting(false);
                    })
                    .catch(() => {
                      setIsSubmitting(false);
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
                  <Form className="loginForm login-form custom-form">
                    <h2
                      className="info0"
                      aria-label={DisplayHeading.FORGOT_PASSWORD}
                    >
                      {DisplayHeading.FORGOT_PASSWORD}
                    </h2>
                    <img
                      src="/www/images/PopupLogo.png"
                      alt={DisplayHeading.SITE_NAME}
                    />
                    <fieldset className="form-card">
                      <Grid
                        container
                        spacing={2}
                        className="form-card-container"
                      >
                        <Grid item xs={12} sm={12}>
                          <FormControl
                            fullWidth
                            className="form-group"
                            variant="outlined"
                          >
                            <InputLabel className="form-label" htmlFor="email">
                              Email Address
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
                      </Grid>
                    </fieldset>
                    <div className="button-group password-div">
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className="btn-mui signin-btn"
                        disabled={isSubmitting}
                        id="ForgotPassword"
                        aria-label={DisplayHeading.FORGOT_PASSWORD}
                        onClick={() =>
                          ClickedButton(
                            BUTTONNAME.FORGOTPASSWORD,
                            PAGENAME.LOGIN,
                            {
                              PageTitle: PAGENAME.LOGIN,
                            }
                          )
                        }
                      >
                        {DisplayHeading.FORGOT_PASSWORD}
                      </Button>
                    </div>
                    <div className="signin-text">
                      Back to Sign in?
                      <Button
                        className="btn-link"
                        onClick={() => {
                          this.setState({
                            isLoginComponent: true,
                          });
                          ClickedButton(
                            BUTTONNAME.BACKTOSIGNIN,
                            PAGENAME.LOGIN,
                            {
                              PageTitle: PAGENAME.LOGIN,
                            }
                          );
                          this.props.changeForgotToLogin();
                        }}
                        aria-label="click here to go back to Sign in"
                      >
                        Click here
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </Grid>
          </div>
        )}
        <div className="custom-form guest-fieldset has-guest">
          <Button
            variant="contained"
            color="primary"
            className="btn-mui btn-blue"
            id="GuestCheckout"
            aria-label="Guest Checkout"
            onClick={() => {
              let cartItems = JSON.parse(sessionStorage.getItem("cartItems"));
              if (cartItems !== null) {
                ClickedButton(BUTTONNAME.CONTINUEASGUEST, PAGENAME.LOGIN, {
                  PageTitle: PAGENAME.LOGIN,
                });
                this.props.closeLoginDialog();
                sessionStorage.setItem("checkoutMode", "Guest");
                this.props.history.push("/checkout");
              } else {
                this.setState({
                  msg: "Please add items in cart to checkout",
                  msgType: "error",
                });
              }
            }}
          >
            Continue as Guest
          </Button>
        </div>
        <div className="has-account">
          <div className="separator">or</div>
          <div className="desc">
            <NavLink
              to="/create-account"
              aria-label="Create account"
              className="create-acc-link"
              onClick={() => {
                this.props.closeLoginDialog();
                if (window.location.pathname !== "/create-account") {
                  ClickedButton(BUTTONNAME.CREATEACCOUNT, PAGENAME.LOGIN, {
                    PageTitle: PAGENAME.LOGIN,
                  });
                  sessionStorage.setItem("checkoutMode", "Register");
                  this.props.history.push("/create-account");
                }
              }}
            >
              Create an account
            </NavLink>
          </div>
        </div>
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
  withOktaAuth(withRouter(Login))
);
