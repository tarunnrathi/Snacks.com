import React, { Component } from "react";
import SnacksAlertMessage from "../commonComponents/snacksAlertMessage/SnacksAlertMessage";
import { connect } from "react-redux";
import ReactHtmlParser from "react-html-parser";
import Spinner from "../Spinner";
import { actionContentListPrivacyPolicy } from "../../actions/ProductAction";
import { Container, Typography } from "@mui/material";

class Faq extends Component {
  constructor(props) {
    super(props);
    this.state = {
      faqConentHeading: "",
      faqConentBody: "",
      spinner: true,
      errorMessage: "",
      error: false,
    };
  }

  componentWillUnmount() {
    document.getElementById("body").classList.remove("has-toast");
  }

  componentDidMount() {
    try {
      let data = { contentId: "faq" };
      this.props.actionContentListPrivacyPolicy(data).then(() => {
        const faqApiResponse = this.props.faq;
        if (faqApiResponse.success && faqApiResponse.success === true) {
          const faq = faqApiResponse.data;
          faq.map((contentInformation) => {
            var faqResponse = contentInformation;
            this.setState({
              spinner: false,
              faqConentHeading: faqResponse.contentHeading,
              faqConentBody: faqResponse.content,
            });
            return true;
          });
        } else {
          this.setState(
            {
              error: true,
              errorMessage: "Some Technical Issue",
              spinner: false,
            },
            () => {
              document.getElementById("body").classList.add("has-toast");
            }
          );
        }
      });
    } catch (error) {
      this.setState(
        { error: true, errorMessage: "Some Technical Issue", spinner: false },
        () => {
          document.getElementById("body").classList.add("has-toast");
        }
      );
    }
  }

  render() {
    return (
      <div className="content-main content-main-static">
        <Container className="container-root">
          <div className="common-box common-box-full faq-box">
            {this.state.spinner ? (
              <div>
                <Spinner />
              </div>
            ) : (
              " "
            )}

            <SnacksAlertMessage
              fullWidth
              msg={this.state.errorMessage}
              handleClose={() => {
                this.setState({ errorMessage: "" }, () => {
                  document.getElementById("body").classList.remove("has-toast");
                });
              }}
            />
            <div className="common-box-header">
              <Typography variant="h1">
                {this.state.faqConentHeading}
              </Typography>
            </div>

            <div className="common-box-body">
              {ReactHtmlParser(this.state.faqConentBody)}
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    faq: state.reducer.privacyPolicy,
  };
};

export default connect(mapStateToProps, {
  actionContentListPrivacyPolicy,
})(Faq);
