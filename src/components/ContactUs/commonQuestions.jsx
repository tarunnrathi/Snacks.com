import React, { Component } from "react";
import "./contact-us-page.scss";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import "./common-questions.scss";
import { actionFaqQuestions } from "../../actions/ProductAction";
import { connect } from "react-redux";
import { trackEvent, EventNames } from "../../appinsights/EventTrack";
import Spinner from "../Spinner";
import { Accordion, AccordionDetails, AccordionSummary, Button } from "@mui/material";
export class commonQuestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCustomerService: true,
      questions: [],
      selectedQuestionId: this.props.selectedQuestionId,
      expandedId: "",
      showProgress: false,
      noData: "",
    };
    this.getQuestionsListing();
  }

  handleChange = (id) => {
    this.setState({
      expandedId: id,
    });
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps !== null &&
      prevProps.selectedQuestionId !== this.props.selectedQuestionId
    ) {
      this.setState(
        {
          selectedQuestionId: this.props.selectedQuestionId,
          expandedId: "",
        },
        () => this.getQuestionsListing()
      );
    }
  }

  getQuestionsListing = () => {
    this.setState({ showProgress: true, noData: "" });
    this.props.actionFaqQuestions(this.props.selectedQuestionId).then(() => {
      if (
        !!this.props.faqQuestions.message &&
        this.props.faqQuestions.message.length > 0
      ) {
        this.setState({
          showProgress: false,
          noData: "No questions available.",
        });
      } else {
        const values = Object.values(this.props.faqQuestions.data);
        this.setState({
          questions: values.length > 0 ? values[0] : [],
          showProgress: false,
          noData: "No questions available.",
        });
      }
    });
  };

  showQuestionListing = () => {
    if (this.state.questions === null || this.state.questions.length === 0) {
      return <div>{this.state.noData}</div>;
    }
    return this.state.questions.map((item, index) => {
      return (
        <Accordion
          key={index}
          expanded={this.state.expandedId === item.id}
          className="question-accordion"
          onChange={(e, expanded) => {
            this.handleChange(item.id);
            if (
              expanded === false &&
              this.state.questions[index].isCustomerService !== undefined &&
              this.state.questions[index].isCustomerService === true
            ) {
              let items = [...this.state.questions];
              let val = {
                ...this.state.questions[index],
                ...{
                  isCustomerService: false,
                },
              };

              items[index] = val;
              this.setState({ questions: items });
            }
          }}
        >
          <AccordionSummary
            expandIcon={<KeyboardArrowDownIcon />}
            aria-controls={`panel-${index}-content`}
            id={`panel-${index}-header`}
            classes={{
              root: "question-accordion-header",
              content: "question-accordion-content",
              expandIcon: "expandIcon",
            }}
            onClick={() =>
              this.handleChange(
                this.state.expandedId === item.id ? "" : item.id
              )
            }
          >
            {item.question}
          </AccordionSummary>
          <AccordionDetails className="question-accordion-body">
            {/* {item.answer} */}
            <div
              className="question-accordion-body"
              dangerouslySetInnerHTML={{ __html: item.answer }}
            ></div>
            <div className="helpful-action">
              {item.isCustomerService === undefined ||
              item.isCustomerService === false ? (
                <>
                  <div className="helpful-action-note">Was this helpful?</div>
                  <div className="btn-link-wrapper">
                    <Button
                      type="button"
                      variant="contained"
                      id={`helpfulYes-${index}`}
                      className="btn-link"
                      onClick={() => {
                        this.handleChange("");
                        trackEvent(
                          EventNames.Action.ACTION_FAQ_YES,
                          EventNames.Event.EVENT_BUTTON_PRESS,
                          window.location.origin,
                          window.location.pathname,
                          { faq: item }
                        );
                      }}
                      aria-label="was this helpful : yes"
                    >
                      yes
                    </Button>
                    |
                    <Button
                      type="submit"
                      variant="contained"
                      id={`helpfulNo-${index}`}
                      className="btn-link"
                      aria-label="was this helpful : no"
                      onClick={() => {
                        let items = [...this.state.questions];
                        let val = {
                          ...this.state.questions[index],
                          ...{
                            isCustomerService:
                              item.isCustomerService === undefined
                                ? true
                                : !item.isCustomerService,
                          },
                        };

                        items[index] = val;
                        this.setState({ questions: items });
                        trackEvent(
                          EventNames.Action.ACTION_FAQ_NO,
                          EventNames.Event.EVENT_BUTTON_PRESS,
                          window.location.origin,
                          window.location.pathname,
                          { faq: item }
                        );
                      }}
                    >
                      no
                    </Button>
                  </div>
                </>
              ) : (
                <div className="btn-link-wrapper">
                  <Button
                    type="button"
                    variant="contained"
                    id="contactCustomerService"
                    className="btn-link"
                    aria-label="Contact Customer Service"
                    onClick={() => this.props.callCustomerService()}
                  >
                    Contact Customer Service
                  </Button>
                </div>
              )}
            </div>
          </AccordionDetails>
        </Accordion>
      );
    });
  };

  render() {
    return (
      <>
        {this.state.showProgress === true && <Spinner />}
        <div className="header-right-panel">
          {this.props.updateQuestionHeading}
        </div>
        <div className="divider-contact bottom-space" />
        {this.showQuestionListing()}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    faqQuestions: state.reducer.faqQuestions,
  };
};

export default connect(mapStateToProps, {
  actionFaqQuestions,
})(commonQuestions);
