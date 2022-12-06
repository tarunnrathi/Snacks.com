import "./contact-page.scss";
import { ErrorMessage, Formik } from "formik";
import React, { Component } from "react";
import { connect } from "react-redux";
import * as Yup from "yup";
import {
  actionContactUs,
  actionGetMinAmount,
} from "../../actions/ProductAction";
import Spinner from "../Spinner";
import {
  RegexUtil,
  MessagesUtil,
} from "../../config/constants/content.constant";
import FormField from "../commonComponents/formfield/FormField";
import { BUTTONNAME } from "../../config/amplitude/Taxonomy.constants";
import { ClickedButton } from "../../config/amplitude/SnacksAmplitude";
import {
  Alert,
  Button,
  FormControl,
  Grid,
  InputLabel,
  Select,
  Snackbar,
  TextField,
} from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
class ContactUs extends Component {
  state = {
    subject: "",
    firstname: "",
    email: "",
    contact: "",
    orderId: "",
    description: "",
    error: false,
    countryCode: "+1",
    submissionStatus: false,
    submissionMessage: "",
    firstName: "",
    Contact: "",
    orderNumber: "",
    successMessage: "",
    contactsubData: [],
    showSpinner: false,
    extended: false,
  };

  componentDidMount() {
    if (!!this.props.contactSub) {
      const { contactUsSubject } = this.props.contactSub;
      const contactsubData = contactUsSubject.split(",");
      this.setState({ contactsubData });
    } else {
      try {
        this.props.actionGetMinAmount().then(() => {
          const { contactUsSubject } = this.props.contactSub;
          const contactsubData =
            contactUsSubject && contactUsSubject.split(",");

          this.setState({
            contactsubData: contactsubData ? contactsubData : [],
          });
        });
      } catch (error) {
        document.getElementById("body").classList.add("has-toast");
      }
    }
  }

  componentWillUnmount() {
    document.getElementById("body").classList.remove("has-toast");
  }

  orderNumberCheck = (e, setFieldValue) => {
    this.setState({ orderNumber: "" });
    if (RegexUtil.WITHOUT_SPECIAL_CHARS.test(e.target.value)) {
      this.setState(
        { orderNumber: MessagesUtil.SPECIAL_CHARS_NOT_VALID },
        () => {
          setTimeout(() => this.setState({ orderNumber: "" }), 3000);
        }
      );
      if (e.target.value === "") {
        setFieldValue("orderId", "");
        this.setState({ orderNumber: "" });
      }
    } else if (e.target.value || e.target.value === "")
      setFieldValue("orderId", e.target.value);
  };

  nameCheck = (e, setFieldValue) => {
    this.setState({ firstName: "" });
    if (!RegexUtil.NAME.test(e.target.value)) {
      this.setState({ firstName: MessagesUtil.NAME_ONLY_ALPHABETS }, () => {
        setTimeout(() => this.setState({ firstName: "" }), 3000);
      });

      if (e.target.value === "") {
        setFieldValue("firstname", "");
        this.setState({ firstName: "" });
      }
    } else if (e.target.value || e.target.value === "")
      setFieldValue("firstname", e.target.value);
  };

  contactCheck = (e, setFieldValue) => {
    this.setState({ Contact: "" });
    if (!RegexUtil.ZIP_CODE_OR_NUM.test(e.target.value)) {
      this.setState({ Contact: MessagesUtil.CONTACT_NOT_VALID }, () => {
        setTimeout(() => this.setState({ Contact: "" }), 3000);
      });
      if (e.target.value === "") {
        setFieldValue("contact", "");
        this.setState({ Contact: "" });
      }
    } else if (
      (e.target.value || e.target.value === "") &&
      e.target.value.length <= 10
    )
      setFieldValue("contact", e.target.value);
    else if (e.target.value > 10)
      this.setState({ Contact: MessagesUtil.CONTACT_MIN_MAX_LIMIT }, () => {
        setTimeout(() => this.setState({ Contact: "" }), 3000);
      });
  };

  checkFormInput = (e) => {
    var field = document
      .getElementById("startContactUs")
      .querySelectorAll(`input:not([type='hidden']), select, textarea`);
    for (var i = 0; i < field.length; i = i + 1) {
      if (!field[i].value) {
        field[i].focus();
        break;
      }
    }
  };

  render() {
    return (
      <div>
        <Formik
          initialValues={this.state}
          /* Validations for Form */
          validationSchema={Yup.object().shape({
            contact: Yup.string()
              .nullable()
              .trim()
              .min(10, MessagesUtil.CONTACT_MIN_MAX_LIMIT)
              .max(10, MessagesUtil.CONTACT_MIN_MAX_LIMIT)
              .required(MessagesUtil.CONTACT_REQUIRED)
              .test("contact", MessagesUtil.CONTACT_NOT_VALID, (value) => {
                if (value === null || value === "") return true; // As it is not required.
                return RegexUtil.CONTACT_NO.test(value);
              }),
            email: Yup.string()
              .trim()
              .email(MessagesUtil.EMAIL_NOT_VALID)
              .required(MessagesUtil.EMAIL_REQUIRED),
            subject: Yup.string().required(MessagesUtil.SUBJECT_REQUIRED),
            firstname: Yup.string()
              .nullable()
              .trim()
              .min(2, MessagesUtil.NAME_MIN_LIMIT)
              .required(MessagesUtil.NAME_REQUIRED),
            orderId: Yup.string().trim(),
            description: Yup.string()
              .required(MessagesUtil.DESCRIPTION_REQUIRED)
              .trim(),
          })}
          onSubmit={(fields, { resetForm }) => {
            let postdata = {
              emailType: "contactUs",
              name: fields.firstname,
              email: fields.email,
              phoneNo: fields.countryCode + "-" + fields.contact,
              orderNo: fields.orderId,
              subject: fields.subject,
              description: fields.description,
            };
            this.setState({ showSpinner: true });
            ClickedButton(BUTTONNAME.SUBMIT, this.props.PageTitle, {
              PageTitle: this.props.PageTitle,
              name: fields.firstname,
              email: fields.email,
              phoneNo: fields.countryCode + "-" + fields.contact,
              subject: fields.subject,
              orderId: fields.orderId,
            });
            this.props.actionContactUs(postdata).then(() => {
              if (this.props.contactResponse.status === 200) {
                if (
                  this.props.contactResponse &&
                  this.props.contactResponse.data.success === true &&
                  this.props.contactResponse.data.message
                ) {
                  this.setState(
                    {
                      successMessage:
                        this.props.contactResponse.data &&
                        this.props.contactResponse.data?.message,
                      submissionMessage: "success",
                      submissionStatus: true,
                      showSpinner: false,
                    },
                    () =>
                      document.getElementById("body").classList.add("has-toast")
                  );
                  resetForm(this.state);
                } else {
                  this.setState(
                    {
                      successMessage:
                        this.props.contactResponse.data &&
                        this.props.contactResponse.data?.message,
                      submissionMessage: "failure",
                      submissionStatus: true,
                      showSpinner: false,
                    },
                    () =>
                      document.getElementById("body").classList.add("has-toast")
                  );
                }
              } else {
                this.setState({
                  error: true,
                  successMessage:
                    "We are facing some technical issue. Your request does not submit at this moment. Please try again",
                  submissionMessage:
                    "We are facing some technical issue. Your request does not submit at this moment. Please try again",
                  submissionStatus: true,
                  showSpinner: false,
                });
              }
            });
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
            } = props;

            return (
              <form
                autoComplete="on"
                id="startContactUs"
                name="form1"
                onSubmit={handleSubmit}
              >
                <>
                  <div>
                    <Snackbar
                      open={this.state.submissionStatus}
                      anchorOrigin={{ vertical: "top", horizontal: "center" }}
                      className="snackbar snackbar-full"
                    >
                      <Alert
                        variant="filled"
                        onClose={() => {
                          this.setState({ submissionStatus: false }, () => {
                            document
                              .getElementById("body")
                              .classList.remove("has-toast");
                          });
                        }}
                        severity={
                          this.state.submissionMessage === "success"
                            ? "success"
                            : "error"
                        }
                      >
                        {this.state.successMessage}
                      </Alert>
                    </Snackbar>
                    {this.state.showSpinner ? <Spinner /> : ""}
                    <Grid container spacing={3}>
                      {/* Subject */}
                      <Grid item xs={12} sm={12}>
                        <FormControl
                          fullWidth
                          className="form-group phone-select phone-select-full"
                          variant="outlined"
                        >
                          <InputLabel
                            className="form-label"
                            htmlFor="outlined-subject-native"
                          >
                            Subject<span className="text-danger">*</span>
                          </InputLabel>
                          <Select
                            native
                            label="subject"
                            value={values.subject}
                            onChange={(event) => {
                              this.setState({
                                ...this.state,
                                [event.target.name]: event.target.value,
                              });
                              handleChange(event);
                            }}
                            onBlur={handleBlur}
                            aria-required="true"
                            inputProps={{
                              id: "outlined-subject-native",
                              name: "subject",
                            }}
                            error={touched.subject && Boolean(errors.subject)}
                          >
                            {this.state.contactsubData.length > 0 &&
                              this.state.contactsubData.map(
                                (subject, index) => {
                                  if (
                                    index === 0 &&
                                    values.subject.length === 0
                                  )
                                    setFieldValue("subject", subject);
                                  return (
                                    <option value={subject}>{subject}</option>
                                  );
                                }
                              )}
                          </Select>
                        </FormControl>
                        <ErrorMessage
                          component="div"
                          name="subject"
                          role="alert"
                          className="text-danger"
                        />
                      </Grid>

                      {/* Name */}
                      <Grid item xs={12} sm={12}>
                        <FormField
                          id="firstname"
                          label="Name"
                          value={values.firstname}
                          touched={touched.firstname}
                          errorMessage={errors.firstname}
                          onChange={(e) => this.nameCheck(e, setFieldValue)}
                          onBlur={handleBlur}
                          error={Boolean(touched.firstname && errors.firstname)}
                        />
                      </Grid>

                      {/* Email */}
                      <Grid item xs={12} sm={12}>
                        <FormField
                          id="email"
                          label="Email"
                          value={values.email}
                          touched={touched.email}
                          errorMessage={errors.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={Boolean(touched.email && errors.email)}
                        />
                      </Grid>

                      {/** Phone Number */}
                      <Grid item xs={12} sm={12}>
                        <Grid container spacing={0}>
                          <Grid item>
                            <FormControl
                              className="form-group"
                              variant="outlined"
                            >
                              <InputLabel
                                className="form-label phone-select-label"
                                htmlFor="countryCode"
                              >
                                <span>country code</span>
                              </InputLabel>
                              <Select
                                native
                                className="phone-select"
                                inputProps={{
                                  required: "required",
                                  "aria-required": "true",
                                  "aria-label": "country code",
                                  name: "countrycode",
                                  role: "combobox",
                                  id: "countryCode",
                                }}
                                value={values.countryCode}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                <option value="+1">+1</option>
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item sm xs container>
                            <FormField
                              id="contact"
                              label="Phone Number"
                              value={values.contact}
                              touched={touched.contact}
                              errorMessage={errors.contact}
                              onChange={(e) =>
                                this.contactCheck(e, setFieldValue)
                              }
                              outputClassName="phone-input"
                              onBlur={handleBlur}
                              error={Boolean(touched.contact && errors.contact)}
                            />
                          </Grid>
                        </Grid>
                      </Grid>

                      {/* Order ID */}
                      <Grid item xs={12} sm={12}>
                        <FormField
                          id="orderId"
                          label="Order ID"
                          value={values.orderId}
                          touched={touched.orderId}
                          errorMessage={errors.orderId}
                          optional
                          onChange={(e) =>
                            this.orderNumberCheck(e, setFieldValue)
                          }
                          onBlur={handleBlur}
                          error={Boolean(touched.orderId && errors.orderId)}
                        />
                      </Grid>

                      {/* Description */}
                      <Grid item xs={12} sm={12}>
                        <FormControl
                          fullWidth
                          className="form-group"
                          variant="outlined"
                        >
                          <TextField
                            id="description"
                            name="description"
                            touched={touched.description}
                            label="Description"
                            multiline
                            inputProps={{
                              "aria-required": "true",
                              role: "alert",
                              "aria-invalid": "false",
                            }}
                            rows="4"
                            variant="outlined"
                            className="textarea"
                            value={values.description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              touched.description && Boolean(errors.description)
                            }
                          />
                        </FormControl>
                        {touched.description &&
                        (errors.description || this.state.description) ? (
                          <>
                            <div className="text-danger" role="alert">
                              <ErrorIcon className="errorIcon" />{" "}
                              {errors.description
                                ? errors.description
                                : this.state.description}
                            </div>
                          </>
                        ) : (
                          <ErrorMessage
                            component="div"
                            role="alert"
                            name="description"
                            className="text-danger"
                          />
                        )}
                      </Grid>
                    </Grid>
                  </div>

                  <div className="btn-link-wrapper">
                    <Button
                      type="button"
                      onClick={() => {
                        ClickedButton(BUTTONNAME.CANCEL, this.props.PageTitle, {
                          PageTitle: this.props.PageTitle,
                        });
                        this.props.cancelCustomerService();
                      }}
                      variant="contained"
                      id="CancelContact"
                      className="btn-link"
                      aria-label="Cancel Contact Info"
                    >
                      CANCEL
                    </Button>
                    |
                    <Button
                      type="submit"
                      variant="contained"
                      onClick={(e) => this.checkFormInput(e)}
                      id="SaveContact"
                      className="btn-link"
                      aria-label="Submit"
                      role="button"
                      disabled={this.state.submitDisabled}
                    >
                      SUBMIT
                    </Button>
                  </div>
                </>
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
    contactResponse: state.reducer.contactResponse,
    contactSub: state.reducer.minAmount,
  };
};

export default connect(mapStateToProps, {
  actionContactUs,
  actionGetMinAmount,
})(ContactUs);
