import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import {
  actionLabelList,
} from "../../actions/ProductAction";
import Spinner from "../Spinner";
import { ViewedPage } from "../../config/amplitude/SnacksAmplitude";
import { PAGENAME } from "../../config/amplitude/Taxonomy.constants";
import './callOfDutyRules.scss';
import PerfectScrollbar from "@opuscapita/react-perfect-scrollbar";
import { Container, Grid, Link } from "@mui/material";

class CallOfDutyRules extends Component {

  componentWillUnmount() {
    document.getElementById("body").classList.remove("has-toast");
  }

  componentDidMount() {
    ViewedPage(PAGENAME.CALLOFDUTYRULES);
    //if(!this.props.labelListItem || !this.props.labelListItem.CODConfig) {
      this.props.actionLabelList();
    //}
  }

  getCODContent = (label) => {
    const { CODConfig } = this.props.labelListItem;
    const codConfig = CODConfig.filter(item => item.sectionName === label);
    return codConfig.length > 0 ? codConfig[0].sectionDescription : "" ;
  }

  render() {
    if(!this.props.labelListItem || !this.props.labelListItem.CODConfig) {
      return (
        <Spinner />
      );
    } else {
      return (
        <Container className="cod-container-root">
          <Container className="cod-container-inner">
            <Link
              onClick={() => this.props.history.push("/productlist")}
            >
              <img
                src="/www/images/callOfDuty/back_to_plp_btn.png"
                alt="back to product listing"
                className="cod-back-btn"
              />
            </Link>
            <Grid item sm={12} className="rules-section">
              <img
                src="/www/images/callOfDuty/doritos-chips.png"
                alt="doritos chips"
                className="doritos-logo"
              />
              <div className="cod-title">
                {this.getCODContent('pageTitle')}
              </div>
              <div className="rules-list">
                <div className="rule-single">
                  <img
                    className="rule-single-icon"
                    src="/www/images/callOfDuty/rule-point-one.png"
                    alt={``}
                  />
                  <div className="rule-single-text">
                    {this.getCODContent('heading1')}
                  </div>
                </div>
                <div className="rule-single">
                  <img
                    className="rule-single-icon"
                    src="/www/images/callOfDuty/rule-point-two.png"
                    alt={``}
                  />
                  <div className="rule-single-text">
                    {this.getCODContent('heading2')}
                  </div>
                </div>
              </div>
              <div className="rules-description-heading">
                OFFICIAL RULES
              </div>
              <div className="rules-description">
                <PerfectScrollbar>
                <div dangerouslySetInnerHTML={{ __html: this.getCODContent('rulesPageDescription') }}></div>
                </PerfectScrollbar>
              </div>
            </Grid>
          </Container>
        </Container>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    labelListItem: state.reducer.labelListItem
  };
};
export default connect(mapStateToProps, {
  actionLabelList,
})(withRouter(CallOfDutyRules));