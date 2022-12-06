import React, { Component } from "react";
import { ErrorMessage, Formik, Field } from "formik";
import * as Yup from "yup";
import "./SignUp.scss";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  actionCreateProfile,
  LoginAuth,
} from "../../../../actions/ProductAction";
import Spinner from "../../../Spinner";

import {
  RegexUtil,
  MessagesUtil,
} from "./../../../../config/constants/content.constant";
import { withOktaAuth } from "@okta/okta-react";
import SnacksAlertMessage from "../../snacksAlertMessage/SnacksAlertMessage";
import oktaConfig from "../../../../oktaconfig";
import UrlConstants from "../../../../config/UrlConstants";
import OktaAuth from "@okta/okta-auth-js";
import {
  PAGENAME,
  BUTTONNAME,
} from "../../../../config/amplitude/Taxonomy.constants";
import { ClickedButton } from "../../../../config/amplitude/SnacksAmplitude";
import ReactHtmlParser from "react-html-parser";
import OktaApiUtil from "../../../../config/OktaApiUtil";
import config from "../../../../oktaconfig";
import { Button, FormControl, Grid, IconButton, InputAdornment } from "@mui/material";

const dayArray = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
];

const monthArray = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const yearArray = [
  "2008",
  "2007",
  "2006",
  "2005",
  "2004",
  "2003",
  "2002",
  "2001",
  "2000",
  "1999",
  "1998",
  "1997",
  "1996",
  "1995",
  "1994",
  "1993",
  "1992",
  "1991",
  "1990",
  "1989",
  "1988",
  "1987",
  "1986",
  "1985",
  "1984",
  "1983",
  "1982",
  "1981",
  "1980",
  "1979",
  "1978",
  "1977",
  "1976",
  "1975",
  "1974",
  "1973",
  "1972",
  "1971",
  "1970",
  "1969",
  "1968",
  "1967",
  "1966",
  "1965",
  "1964",
  "1963",
  "1962",
  "1961",
  "1960",
  "1959",
  "1958",
  "1957",
  "1956",
  "1955",
  "1954",
  "1953",
  "1952",
  "1951",
  "1950",
  "1949",
  "1948",
  "1947",
  "1946",
  "1945",
  "1944",
  "1943",
  "1942",
  "1941",
  "1940",
  "1939",
  "1938",
  "1937",
  "1936",
  "1935",
  "1934",
  "1933",
  "1932",
  "1931",
  "1930",
  "1929",
  "1928",
  "1927",
  "1926",
  "1925",
  "1924",
  "1923",
  "1922",
  "1921",
  "1920",
  "1919",
  "1918",
  "1917",
  "1916",
  "1915",
  "1914",
  "1913",
  "1912",
  "1911",
  "1910",
  "1909",
];

class SignUp extends Component {
  state = {
    password: "",
    intialProfile: {
      firstName:
        this.props.claimsData && this.props.claimsData.field_firstname
          ? this.props.claimsData.field_firstname
          : "",
      lastName:
        this.props.claimsData && this.props.claimsData.field_lastname
          ? this.props.claimsData.field_lastname
          : "",
      email:
        this.props.claimsData && this.props.claimsData.email
          ? this.props.claimsData.email
          : "",
      password: "",
      zipCode:
        this.props.claimsData && this.props.claimsData.zipCode
          ? this.props.claimsData.zipCode
          : "",
      day: "",
      month: "",
      year: "",
      gender:
        this.props.claimsData && this.props.claimsData.gender
          ? this.props.claimsData.gender
          : "",
    },
    msg: null,
    msgType: "success",
    showPassword: false,
  };

  validPassword = (email, password) => {
    var valid = RegexUtil.PASSWORD.test(String(password));

    // var notContaining = true
    if (email.length > 0 && valid) {
      const prefix = email.split("@");
      if (prefix.length > 0) {
        const list1 = prefix[0].split(".");
        valid = this.containsAny(password, list1) === undefined;
        if (valid) {
          const list2 = prefix[0].split("_");
          valid = this.containsAny(password, list2) === undefined;
        }
        if (valid) {
          const list3 = prefix[0].split("-");
          valid = this.containsAny(password, list3) === undefined;
        }
      }
      if (prefix.length > 1 && valid) {
        const list4 = prefix[1].split(".");
        valid = this.containsAny(password, list4) === undefined;
        if (valid) {
          const list5 = prefix[1].split("_");
          valid = this.containsAny(password, list5) === undefined;
        }
        if (valid) {
          const list6 = prefix[1].split("-");
          valid = this.containsAny(password, list6) === undefined;
        }
      }
      if (
        !valid &&
        this.state.password !== "Password must not contain parts of username"
      ) {
        this.setState({
          password: "Password must not contain parts of username",
        });
      } else if (valid && this.state.password !== "") {
        this.setState({ password: "" });
      }
    }
    return valid;
  };

  componentWillUnmount() {
    this.setState({ msg: null, msgType: "success" });
    document.getElementById("body").classList.remove("has-toast");
  }

  handleCreateAccount = (fields) => {
    const payload = { ...fields };
    payload.dob = `${fields.year}-${fields.month}-${fields.day}`;
    ClickedButton(BUTTONNAME.CREATEMYACCOUNT, PAGENAME.SIGNUP, {
      PageTitle: PAGENAME.SIGNUP,
    });
    payload.login = fields.email;
    payload.lang = "en_US";
    payload.preferredLanguage = "en-us";

    payload.optin =
      document.getElementById("optin_casl").checked ||
      document.getElementById("optin_cas3").checked;
    let optInValue = "";
    if (document.getElementById("optin_casl").checked) {
      let trOptin = UrlConstants.tastyRewardsOptin;
      optInValue = trOptin;
      payload.optin_casl =
        "Yes! Sign me up to receive email from PepsiCo Tasty Rewards, PepsiCo and its brands so I never miss out on exciting updates, offers or sweepstakes";
    } else {
      delete payload.optin_casl;
    }
    if (document.getElementById("optin_cas3").checked) {
      let snacksOptin = UrlConstants.snacksOptin;
      optInValue += (optInValue.length > 0 ? ";" : "") + snacksOptin;
      delete payload.optin_cas3;
    }
    payload.optins = optInValue;

    payload.country = "us";
    if (this.props.claimsData.length === 0) {
      payload.social = "";
      this.setState({ spinner: true }, () => {
        this.props
          .actionCreateProfile(payload)
          .then((res) => {
            if (
              this.props.createcustomerDetails &&
              this.props.createcustomerDetails !== null &&
              this.props.createcustomerDetails.data !== null
            ) {
              if (this.props.createcustomerDetails.success)
                this.handleLogin(fields);
              else {
                this.setState(
                  {
                    msg: this.props.createcustomerDetails.message.toString(),
                    msgType: "error",
                    spinner: false,
                  },
                  () => {
                    document.getElementById("body").classList.add("has-toast");
                    window.scrollTo(0, 0);
                    this.removeMsg();
                  }
                );
              }
            } else {
              this.setState(
                { msg: res.toString(), msgType: "error", spinner: false },
                () => {
                  document.getElementById("body").classList.add("has-toast");
                  this.removeMsg();
                }
              );
            }
          })
          .catch((err) => {
            this.setState(
              { msg: err.toString(), msgType: "error", spinner: false },
              () => this.removeMsg()
            );
          });
      });
    } else {
      payload.social = this.props.claimsData.social;
      localStorage.removeItem("isRefreshPage");
      this.setState({ spinner: true }, () => {
        this.props
          .actionCreateProfile(payload)
          .then((res) => {
            let authClient = new OktaAuth(oktaConfig.oidc);
            var tokenToRenew = {
              accessToken: JSON.parse(localStorage.getItem("accessToken")),
              scopes: config.oidc.scopes,
            };

            authClient.token
              .renew(tokenToRenew)
              .then(function (freshToken) {
                // manage freshToken
                localStorage.setItem("accessToken", JSON.stringify(freshToken));
                authClient.tokenManager.add("accessToken", freshToken);
                sessionStorage.removeItem("claimsData");
                // this.props.handleSocialLogin();
                // window.location.reload();
                window.location.assign("/home");
                this.setState({ spinner: false });
              })
              .catch(function (err) {
                // handle OAuthError
              });
          })
          .catch((err) => {
            this.setState(
              { msg: err.toString(), msgType: "error", spinner: false },
              () => this.removeMsg()
            );
          });
      });
    }
  };

  handleLogin = (fields) => {
    this.removeMsg();
    this.setState({ spinner: true, msg: "", msgType: "success" });
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
    let msgTimeOut = 5000; //parseInt(sessionStorage.getItem('msgTime') ? sessionStorage.getItem('msgTime') : 10000);
    setTimeout(() => {
      document.getElementById("body").classList.remove("has-toast");
      this.setState({ msg: null, msgType: "success" });
    }, msgTimeOut);
  }

  containsAny(str, substrings) {
    return substrings
      .filter((text) => str.toLowerCase().includes(text.toLowerCase()))
      .shift();
  }

  // toggle password
  handleClickShowPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  };

  handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  handleClose = () => {
    this.setState({ msg: null, msgType: "success" });
    document.getElementById("body").classList.remove("has-toast");
  };

  render() {
    const pkceChallenge = require("pkce-challenge");
    const challenge = pkceChallenge();
    localStorage.setItem("code_verifier", challenge.code_verifier);

    const socialLoginUrl = `${config.oidc.issuer}/v1/authorize?idp=${config.oidc.googleIDP}&client_id=${config.oidc.clientId}&response_type=code&scope=openid email profile TastyRewards&redirect_uri=${window.location.origin}/implicit/ssocallback&state=state-8600b31f2-52d1-4dca-987c-386e3d8967e9&code_challenge_method=S256&code_challenge=${challenge.code_challenge}`;

    const fieldsObj = {
      firstName: Yup.string()
        .trim()
        .required(MessagesUtil.FIRST_NAME_REQUIRED)
        .min(2, MessagesUtil.NAME_MIN_LIMIT)
        .test("firstname", MessagesUtil.FIRST_NAME_NOT_VALID, (value) =>
          RegexUtil.NAME.test(value)
        ),
      lastName: Yup.string()
        .trim()
        .required(MessagesUtil.LAST_NAME_REQUIRED)
        .min(2, MessagesUtil.NAME_MIN_LIMIT)
        .test("lastName", MessagesUtil.LAST_NAME_NOT_VALID, (value) =>
          RegexUtil.NAME.test(value)
        ),
      email: Yup.string()
        .trim()
        .required(MessagesUtil.EMAIL_REQUIRED)
        .email(MessagesUtil.EMAIL_NOT_VALID),
      zipCode: Yup.string()
        .trim()
        .required(MessagesUtil.ZIP_CODE_REQUIRED)
        .matches(RegexUtil.ZIP_CODE, MessagesUtil.ZIP_CODE_NOT_VALID),
      day: Yup.string().required(MessagesUtil.DAY_NOT_VALID),
      month: Yup.string().required(MessagesUtil.MONTH_NOT_VALID),
      year: Yup.string().required(MessagesUtil.YEAR_NOT_VALID),
      gender: Yup.string(),
    };

    if (this.props.claimsData.length === 0) {
      fieldsObj.password = Yup.string()
        .trim()
        .required(MessagesUtil.PASSWORD_REQUIRED)
        .min(8, MessagesUtil.PASSWORD_MIN_LIMIT)
        .test("password", MessagesUtil.PASSWORD_NOT_VALID, (value) =>
          RegexUtil.PASSWORD.test(value)
        );
    }

    var schemaValidate = Yup.object().shape(fieldsObj);
    return (
      <div className="tr-account">
        {this.state.spinner ? <Spinner /> : ""}
        {this.state.msg ? (
          <SnacksAlertMessage
            fullWidth
            msg={this.state.msg}
            handleClose={this.handleClose}
          />
        ) : (
          ""
        )}

        <h2>
          Join the
          <br /> Experience
        </h2>
        <Formik
          initialValues={this.state.intialProfile}
          validationSchema={schemaValidate}
          enableReinitialize={true}
          onSubmit={(fields) => {
            this.handleCreateAccount(fields);
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
              setFieldValue,
              setFieldTouched,
            } = props;

            return (
              <form
                id="createAccount"
                name="createAccount"
                onSubmit={handleSubmit}
                className="tr-account-form"
                autoComplete="on"
              >
                {/** CreateAccount */}
                <fieldset className="form-card">
                  <a href={socialLoginUrl} className="google-sign">
                    <img src="/www/images/google-icon.svg" alt="" />
                    <div className="google-text">Sign in with Google</div>
                  </a>
                  <div className="separator-text">- or -</div>
                  <Grid container spacing={2} className="container-form">
                    {/** Email  */}
                    <Grid item xs={12}>
                      <FormControl fullWidth variant="outlined">
                        <Field
                          type="text"
                          placeholder="Email Address*"
                          name="email"
                          id="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={(e) => {
                            setFieldTouched("email", true, true);
                            setFieldValue("email", e.target.value);
                            if (!!values.email && !!values.password) {
                              this.validPassword(values.email, values.password);
                            }
                          }}
                          className={
                            errors.email && touched.email ? "invalid-field" : ""
                          }
                          disabled={
                            this.props.claimsData && this.props.claimsData.email
                              ? true
                              : false
                          }
                        />
                      </FormControl>
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="invalid-field-message"
                      />
                    </Grid>

                    {/** First Name  */}
                    <Grid item xs={6}>
                      <FormControl fullWidth variant="outlined">
                        <Field
                          id="firstName"
                          name="firstName"
                          type="text"
                          placeholder="First Name*"
                          value={values.firstName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors.firstName && touched.firstName
                              ? "invalid-field"
                              : ""
                          }
                        />
                      </FormControl>
                      <ErrorMessage
                        name="firstName"
                        component="div"
                        className="invalid-field-message"
                      />
                    </Grid>

                    {/** Last Name  */}
                    <Grid item xs={6}>
                      <FormControl fullWidth variant="outlined">
                        <Field
                          id="lastName"
                          name="lastName"
                          type="text"
                          placeholder="Last Name*"
                          value={values.lastName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors.lastName && touched.lastName
                              ? "invalid-field"
                              : ""
                          }
                        />
                      </FormControl>
                      <ErrorMessage
                        name="lastName"
                        component="div"
                        className="invalid-field-message"
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <FormControl fullWidth variant="outlined">
                        <Field
                          name="zipCode"
                          id="zipCode"
                          type="text"
                          placeholder="Zip Code*"
                          value={values.zipCode}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors.zipCode && touched.zipCode
                              ? "invalid-field"
                              : ""
                          }
                        />
                      </FormControl>
                      <ErrorMessage
                        name="zipCode"
                        component="div"
                        className="invalid-field-message"
                      />
                    </Grid>

                    {/** Password  */}
                    {this.props.claimsData &&
                    this.props.claimsData.length === 0 ? (
                      <Grid item xs={12}>
                        <FormControl
                          fullWidth
                          className="form-group has-password"
                          variant="outlined"
                        >
                          <Field
                            id="password"
                            name="password"
                            type={this.state.showPassword ? "text" : "password"}
                            placeholder="Password*"
                            value={values.password}
                            onChange={(e) => {
                              setFieldTouched("password", true, true);
                              setFieldValue("password", e.target.value);
                              if (!!values.email && !!values.password) {
                                this.validPassword(
                                  values.email,
                                  values.password
                                );
                              }
                            }}
                            onBlur={(e) => {
                              setFieldTouched("password", true, true);
                              setFieldValue("password", e.target.value);
                              if (!!values.email && !!values.password) {
                                this.validPassword(
                                  values.email,
                                  values.password
                                );
                              }
                            }}
                            className={
                              errors.password && touched.password
                                ? "invalid-field"
                                : ""
                            }
                          />
                          <div
                            className="tooltip-custom"
                            tabIndex="0"
                            role="tooltip"
                            aria-label={`Must Contain:
                              At least 8 characters
                              A lower case letter
                              An upper case letter
                              A number
                              A symbol`}
                          >
                            <img src={"/www/images/information.png"} />
                            <p className="tooltip-text">
                              {
                                "Must Contain:\nAt least 8 characters\nA lower case letter\nAn upper case letter\nA number\nA symbol"
                              }
                            </p>
                          </div>
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
                          <ErrorMessage
                            name="password"
                            component="div"
                            className="invalid-field-message"
                          />
                        </FormControl>
                      </Grid>
                    ) : (
                      ""
                    )}

                    <Grid item xs={12}>
                      <p className="field-label">Date of Birth *</p>
                    </Grid>

                    <Grid item xs={4}>
                      <FormControl fullWidth variant="outlined">
                        <Field
                          as="select"
                          id="month"
                          name="month"
                          value={values.month}
                          className={
                            errors.month && touched.month ? "invalid-field" : ""
                          }
                          onChange={(e) => {
                            setFieldValue("month", e.target.value);
                          }}
                          onBlur={(e) => {
                            setFieldTouched("month", true, true);
                            setFieldValue("month", e.target.value);
                          }}
                        >
                          <option aria-label="None" value="">
                            Month
                          </option>
                          {monthArray.map((item, index) => {
                            return (
                              <option key={index} value={index + 1}>
                                {item}
                              </option>
                            );
                          })}
                        </Field>
                      </FormControl>
                      <ErrorMessage
                        name="month"
                        component="div"
                        className="invalid-field-message"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <FormControl fullWidth variant="outlined">
                        <Field
                          as="select"
                          id="day"
                          name="day"
                          value={values.day}
                          className={
                            errors.day && touched.day ? "invalid-field" : ""
                          }
                          onChange={(e) => {
                            setFieldValue("day", e.target.value);
                          }}
                          onBlur={(e) => {
                            setFieldTouched("day", true, true);
                            setFieldValue("day", e.target.value);
                          }}
                        >
                          <option aria-label="None" value="">
                            Day
                          </option>
                          {dayArray.map((item, index) => {
                            return (
                              <option key={index} value={index + 1}>
                                {item}
                              </option>
                            );
                          })}
                        </Field>
                      </FormControl>
                      <ErrorMessage
                        name="day"
                        component="div"
                        className="invalid-field-message"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <FormControl fullWidth variant="outlined">
                        <Field
                          as="select"
                          id="year"
                          name="year"
                          value={values.year}
                          className={
                            errors.year && touched.year ? "invalid-field" : ""
                          }
                          onChange={(e) => {
                            setFieldValue("source", "TastyRewardsUS");
                            setFieldValue("year", e.target.value);
                          }}
                          onBlur={(e) => {
                            setFieldTouched("year", true, true);
                            setFieldValue("year", e.target.value);
                          }}
                        >
                          <option aria-label="None" value="">
                            Year
                          </option>
                          {yearArray.map((item, index) => {
                            return (
                              <option key={index} value={item}>
                                {item}
                              </option>
                            );
                          })}
                        </Field>
                        <div
                          className="tooltip-custom"
                          tabIndex="0"
                          role="tooltip"
                          aria-label={ReactHtmlParser(
                            "You must be at least 13 years of age or older to be a Tasty Rewards<sup>TM</sup> Member. Why do we collect your birthday? We use your birthday to send you a birthday greeting each year, and to provide the most relevant content for our members."
                          )}
                        >
                          <img src={"/www/images/information.png"} />
                          <p className="tooltip-text">
                            {ReactHtmlParser(
                              "You must be at least 13 years of age or older to be a PepsiCo Tasty Rewards Member. Why do we collect your birthday? We use your birthday to send you a birthday greeting each year, and to provide the most relevant content for our members."
                            )}
                          </p>
                        </div>
                      </FormControl>
                      <ErrorMessage
                        name="year"
                        component="div"
                        className="invalid-field-message"
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <FormControl fullWidth variant="outlined">
                        <Field
                          as="select"
                          id="gender"
                          name="gender"
                          className={
                            errors.gender && touched.gender
                              ? "invalid-field"
                              : ""
                          }
                          value={values.gender}
                          onChange={(e) => {
                            setFieldValue("gender", e.target.value);
                          }}
                          onBlur={(e) => {
                            setFieldTouched("gender", true, true);
                            setFieldValue("gender", e.target.value);
                          }}
                        >
                          <option aria-label="None" value="">
                            Gender
                          </option>
                          <option value="M">Male</option>
                          <option value="F">Female</option>
                          <option value="O">Other</option>
                        </Field>
                      </FormControl>
                      <ErrorMessage
                        name="gender"
                        component="div"
                        className="invalid-field-message"
                      />
                    </Grid>

                    <Grid item xs={12} sm={12}>
                      <div className="custom-check">
                        <Field
                          type="checkbox"
                          className="form-check-input icn-check-mark"
                          id="optin_casl"
                          name="optin_casl"
                          onChange={(e) => {
                            let optinValue =
                              document.getElementById("optin_casl").checked;
                            setFieldValue("optin_casl", optinValue);
                          }}
                        />
                        <label
                          className="form-check-label icn-check"
                          htmlFor="optin_casl"
                        >
                          Yes! Sign me up to receive email from PepsiCo Tasty
                          Rewards, PepsiCo and its brands so I never miss out on
                          exciting updates, offers or sweepstakes
                        </label>
                      </div>
                    </Grid>

                    <Grid item xs={12} sm={12}>
                      <div className="custom-check">
                        <Field
                          type="checkbox"
                          className="form-check-input icn-check-mark"
                          id="optin_cas3"
                          name="optin_cas3"
                          onChange={(e) => {
                            let optinValue =
                              document.getElementById("optin_cas3").checked;
                            setFieldValue("optin_cas3", optinValue);
                          }}
                        />
                        <label
                          className="form-check-label icn-check"
                          htmlFor="optin_cas3"
                        >
                          Sign up for the latest news & offers from Snacks.com,
                          PepsiCo, and its brands.
                        </label>
                      </div>
                    </Grid>

                    <div className="button-group">
                      <Button
                        variant="contained"
                        className="mui-btn btn-primary"
                        id="CreateProfile"
                        type="submit"
                      >
                        Create my account
                      </Button>
                    </div>

                    <div className="bottom-block">
                      <p>
                        Already have an account?{" "}
                        <a
                          className="signin"
                          onClick={(e) => {
                            e.preventDefault();
                            this.props.showLoginDialog();
                          }}
                        >
                          Sign in
                        </a>
                      </p>
                      <p>
                        To learn more about how we use your information, please
                        read PepsiCo's&nbsp;
                        <a
                          href="https://www.pepsico.com/legal/privacy"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Privacy Policy
                        </a>
                        ,&nbsp;
                        <a
                          href="https://www.pepsico.com/legal/terms-of-use"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Terms & Conditions
                        </a>
                        &nbsp;and&nbsp;
                        <a
                          href="https://policy.pepsico.com/aboutads.htm"
                          target="_blank"
                          rel="noreferrer"
                        >
                          About our Ads
                        </a>
                      </p>
                    </div>
                  </Grid>
                </fieldset>
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
    isAuthenticated: state.reducer.isAuthenticated,
    createcustomerDetails: state.reducer.createcustomerDetails,
  };
};

export default connect(mapStateToProps, { actionCreateProfile, LoginAuth })(
  withOktaAuth(withRouter(SignUp))
);
