import React, { Component } from "react";
import SnacksAlertMessage from "../commonComponents/snacksAlertMessage/SnacksAlertMessage";
import { connect } from "react-redux";
import ReactHtmlParser from "react-html-parser";
import Spinner from "../Spinner";
import { actionContentListPrivacyPolicy } from "../../actions/ProductAction";
import { ViewedPage } from "../../config/amplitude/SnacksAmplitude";
import { PAGENAME } from "../../config/amplitude/Taxonomy.constants";
import { Container, Typography } from "@mui/material";

class TermsOfService extends Component {
  state = {
    termsOfServiceConentHeading: "",
    termsOfServiceConentBody: "",
    spinner: true,
    errorMessage: "",
    error: false,
  };
  refData = React.createRef();

  componentWillUnmount() {
    document.getElementById("body").classList.remove("has-toast");
  }

  componentDidUpdate(){
    const node = this.refData.current;
    if (node instanceof HTMLElement) {
      const child = node.getElementsByTagName('a');
      if(child.length){
        for (let i = 0; i < child.length; i++) {
          child[i].setAttribute("tabindex",0)
        }
      }
    }
  }

  componentDidMount() {
    try {
      let data = { contentId: "Terms of Service" };
      this.props.actionContentListPrivacyPolicy(data).then(() => {
        const termsOfServiceApiResponse = this.props.privacyPolicy;
        if (
          termsOfServiceApiResponse.success &&
          termsOfServiceApiResponse.success === true
        ) {
          const termsOfService = termsOfServiceApiResponse.data;
          termsOfService.map((contentInformation) => {
            var termsOfServiceResponse = contentInformation;
            this.setState({
              spinner: false,
              termsOfServiceConentHeading:
                termsOfServiceResponse.contentHeading,
              termsOfServiceConentBody: termsOfServiceResponse.content,
            });
            ViewedPage(PAGENAME.TERMSERVICE);
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
          <div className="common-box common-box-full">
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
                {this.state.termsOfServiceConentHeading}
              </Typography>
            </div>

            <div ref={this.refData} className="common-box-body">
              {ReactHtmlParser(this.state.termsOfServiceConentBody)}
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    privacyPolicy: state.reducer.privacyPolicy,
  };
};

export default connect(mapStateToProps, {
  actionContentListPrivacyPolicy,
})(TermsOfService);
