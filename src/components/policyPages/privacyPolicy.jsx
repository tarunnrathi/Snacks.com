import React, { Component } from "react";
import SnacksAlertMessage from "../commonComponents/snacksAlertMessage/SnacksAlertMessage";
import { connect } from "react-redux";
import { actionContentListPrivacyPolicy } from "../../actions/ProductAction";
import ReactHtmlParser from "react-html-parser";
import Spinner from "../Spinner";
import { ViewedPage } from "../../config/amplitude/SnacksAmplitude";
import { PAGENAME } from "../../config/amplitude/Taxonomy.constants";
import { Container, Typography } from "@mui/material";

class PrivacyPolicy extends Component {
  state = {
    privayPolicyConentHeading: "",
    privayPolicyConentBody: "",
    spinner: true,
    errorMessage: "",
    error: false,
  };
  refData = React.createRef();

  componentWillUnmount() {
    document.getElementById("body").classList.remove("has-toast");
  }

  componentDidMount() {
    try {
      let data = { contentId: "Privacy Policy" };
      this.props.actionContentListPrivacyPolicy(data).then(() => {
        const privacyPolicyResponse = this.props.privacyPolicy;
        if (
          privacyPolicyResponse.success &&
          privacyPolicyResponse.success === true
        ) {
          const privacyPolicy = privacyPolicyResponse.data;
          privacyPolicy.map((contentInformation) => {
            var privacyPolicyResponseData = contentInformation;
            this.setState({
              spinner: false,
              privayPolicyConentHeading:
                privacyPolicyResponseData.contentHeading,
              privayPolicyConentBody: privacyPolicyResponseData.content,
            });
            ViewedPage(PAGENAME.PRIVACYPOLICY);
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
                {this.state.privayPolicyConentHeading}
              </Typography>
            </div>

            <div ref={this.refData} className="common-box-body">
              {ReactHtmlParser(this.state.privayPolicyConentBody)}
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
})(PrivacyPolicy);
