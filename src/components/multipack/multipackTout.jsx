import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./multipack-tout.scss";
import NotifyMe from "../commonComponents/notifyMe/NotifyMe";
import {
  PAGENAME,
  BUTTONNAME,
} from "../../config/amplitude/Taxonomy.constants";
import { DisplayHeading } from "../../config/constants/content.constant";
import { Button, Card } from "@mui/material";

class multipackTout extends Component {
  state = {
    showNotifyModal: false,
    // zipcode: sessionStorage.getItem("Zipcode"),
    isMCProductAvailable: JSON.parse(
      sessionStorage.getItem("isMCProductAvailable")
    ),
    // locationNumber:
    //   sessionStorage.getItem("alternateMultipackLocationId") ||
    //   sessionStorage.getItem("_lo_No") ||
    //   localStorage.getItem("_lo_No"),
  };

  render() {
    const { productInfo } = this.props;
    const isHoliday = productInfo[0].hasOwnProperty("isHolidayShop");
    const disableMultipack = productInfo[0].disableMultipack;

    // let btnText = "";

    // if (isHoliday) {
    //   btnText = productInfo[0].buttonText;
    // } else if (disableMultipack) {
    //   btnText = productInfo[0].notifyMeText;
    // } else if (
    //   this.state.isMCProductAvailable &&
    //   JSON.parse(this.state.isMCProductAvailable)
    // ) {
    //   btnText = productInfo[0].buildText;
    // } else {
    //   btnText = productInfo[0].outOfStock;
    // }

    return (
      <React.Fragment>
        <NotifyMe
          pageName={PAGENAME.PRODUCTLIST}
          buttonName={BUTTONNAME.NOTIFYME}
          displayButtonText={DisplayHeading.NOTIFY_ME}
          productType="Multipack"
          openNotifyModal={this.state.showNotifyModal}
          closeNotifyModal={(val) => {
            this.setState({ showNotifyModal: val });
          }}
        />

        <Card
          className={`product-box-bundle-card multipack-tout ${disableMultipack && "disabled"}`}
          onClick={() => {
            if (isHoliday) {
              this.props.history.push(`/holidayshop`);
            } else {
              disableMultipack &&
                this.setState({
                  showNotifyModal: true,
                });
              !disableMultipack && this.props.history.push(`/varietypack`);
            }
          }}
        >
          <div className="multipack-tout-circle">
            <div className="multipack-tout-circle-inner">
              <img src="/svg/mp-icn.svg" alt="Multipack" />
              <div className="product-heading">Make Your Variety Pack</div>
              <Button className="multipack-btn">Learn More</Button>
            </div>
          </div>
        </Card>
      </React.Fragment>
    );
  }
}

export default withRouter(multipackTout);
