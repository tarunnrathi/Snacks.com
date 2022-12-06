import React, { Component, lazy } from "react";
import { connect } from "react-redux";
import {
  actionGetMinAmount,
  actionGetCustomer,
  actionZipcodeVerification,
  actionLabelList,
  actionGetBannerList,
} from "../../../actions/ProductAction";
import Spinner from "../../Spinner";
import { trackEvent, EventNames } from "../../../appinsights/EventTrack";
import {
  ViewedPage,
  SelectedLinkItem,
} from "../../../config/amplitude/SnacksAmplitude";
import {
  PAGENAME,
  METHOD,
  SELECTEDEVENTNAME,
} from "../../../config/amplitude/Taxonomy.constants";
import "./Home.scss";
import APIUtil from "./../../../config/APIUtil";
import UrlConstants from "./../../../config/UrlConstants";
import validateAPIResponse from "./../../ApiHelper";
import PromotionTiles from "./promotionTiles";
import SnacksComFeatures from "./snacksComFeatures";
import Shop from "./ShopBy/ShopBy";
import Pack from "./../../Myovp/Pack";
import SuggestedItems from "./../../commonComponents/suggestedProductsPDP/suggestedProductsPDP";
import { Container } from "@mui/material";
const HomeSilder = lazy(() => import("./../../BannerCarousel/Carousel"));
const HeroBanner = lazy(() =>
  import("../../commonComponents/heroBanner/HeroBanner")
);

const FlavorBanner = lazy(() =>
  import("../../commonComponents/FlavorBanner/FlavorBanner")
);

class Home extends Component {
  state = {
    clickedBtn: "",
    dailogOpen: false,
    isHomeContentLoading: false,
    shippingMinimum: "",
    minOrder: "",
    minPrice: "",
    labelListItem: [],
    flavorNotes: [],
    promotionalTiles: [],
    bestsellerList: [],
  };

  zipValidation = (e, fromCategory, sectionName) => {
    e.preventDefault();

    let zipcodeVerified = sessionStorage.getItem("Zipcode");
    if (zipcodeVerified) {
      sectionName &&
        SelectedLinkItem(SELECTEDEVENTNAME.HOMELINK, METHOD.BOTTOM, {
          PageTitle: PAGENAME.HOME,
          itemName: sectionName.replace(/\s+/g, ""),
        });
      if (fromCategory) this.props.history.push(fromCategory);
      else this.props.history.push("/productlist");
      trackEvent(
        EventNames.Action.ACTION_ZIP_CODE_POPUP,
        EventNames.Event.EVENT_PAGE_VIEW,
        window.location.origin,
        window.location.pathname
      );
    }
  };

  scrollToContent = () => {
    window.scrollTo(0, document.getElementById("content").offsetTop - 25);
  };

  actionGetMinAmount = () => {
    this.setState({
      isHomeContentLoading: true,
    });
    try {
      this.props.actionGetMinAmount().then(() => {
        const { minPrice } = this.props;
        if (!!minPrice && Object.keys(minPrice).length !== 0) {
          this.setState({
            minOrder: minPrice.minimumOrderAmount,
            shippingMinimum: minPrice.shippingMinimum,
            isHomeContentLoading: false,
          });
          sessionStorage.setItem(
            "minimumOrderAmount",
            minPrice.minimumOrderAmount || null
          );
          sessionStorage.setItem(
            "shippingMinimum",
            minPrice.shippingMinimum || null
          );
          sessionStorage.setItem(
            "shippingCharges",
            minPrice.shippingCharges || null
          );
          sessionStorage.setItem(
            "holidayShopStockText",
            minPrice.holidayShopStockText || null
          );
          sessionStorage.setItem("contactUsMsg", minPrice.contactUsMsg || null);
        } else {
          this.setState({
            isHomeContentLoading: false,
          });
        }
      });
    } catch (error) {
      this.setState({
        isHomeContentLoading: false,
      });
    }
  };

  componentDidMount() {
    // if (!this.props.bannerList) {
    this.props.actionGetBannerList();
    // }
    const location =
      localStorage.getItem("_lo_No") || sessionStorage.getItem("_lo_No");
    APIUtil.getMethod(UrlConstants.homeData, true, location).then(
      (response) => {
        if (validateAPIResponse(response) && response.data.success) {
          this.setState({
            flavorNotes: response.data.data.flavorNotes,
            promotionalTiles: response.data.data.promotionalTiles,
          });
        }
      }
    );
    APIUtil.getMethod(
      UrlConstants.bestsellerList +
        "?limit=" +
        UrlConstants.bestSellingProductsLimit,
      true,
      location
    ).then((response) => {
      if (validateAPIResponse(response) && response.data.success) {
        this.setState({
          bestsellerList: response.data.data,
        });
      }
    });
    if (!sessionStorage.getItem("minimumOrderAmount")) {
      this.actionGetMinAmount();
    }
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
    sessionStorage.removeItem("selectedCategory");
    let loginClicked = localStorage.getItem("loginClicked");
    if (loginClicked === "checkout") {
      localStorage.removeItem("loginClicked");
    }
    if (!this.props.isAuthenticated) {
      ViewedPage(PAGENAME.HOME);
      document.getElementById("body").classList.add("is-home");
    } else {
      document.getElementById("body").classList.add("home-bg");
      ViewedPage(PAGENAME.LOGGEDINHOME);
    }
  }

  componentWillUnmount() {
    document.getElementById("body").classList.remove("is-home");
    document.getElementById("body").classList.remove("home-bg");
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.labelListItem &&
      prevState.labelListItem.length !== nextProps.labelListItem.length
    ) {
      if (nextProps.labelListItem.CampaignConfig) {
        const sectionText = nextProps.labelListItem.CampaignConfig.filter(
          (item) => item.sectionName === "maxItemLimitPerOrder"
        );
        const maxItemLimitPerOrder =
          sectionText.length > 0 ? sectionText[0].sectionDescription : "";
        sessionStorage.setItem("maxItemLimitPerOrder", maxItemLimitPerOrder);
      }
      return {
        ...prevState,
        labelListItem: nextProps.labelListItem,
      };
    }
    return null;
  }

  maxPointPixel = () => {
    return (
      <img
        alt="max point pixel"
        src="https://mpp.mxptint.net/2/35303/?rnd=%n"
        width="0"
        height="0"
        style={{ display: "none" }}
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  };

  render() {
    if (
      !this.state.labelListItem ||
      (this.state.labelListItem && this.state.labelListItem.length === 0)
    ) {
      return "";
    }

    const { customerDetails, bannerList } = this.props;
    const {
      labelListItem: { authHome },
    } = this.state;

    if (this.state.isHomeContentLoading) {
      return <Spinner />;
    }

    if (this.props.isAuthenticated) {
      return (
        <>
          {this.maxPointPixel()}
          <div className="home-wrapper">
            {authHome && (
              <HeroBanner
                customerDetails={customerDetails}
                authHome={authHome}
                minAmount={
                  this.state.minOrder ||
                  sessionStorage.getItem("minimumOrderAmount")
                }
              />
            )}
            <Container className="container-root">
              <div className="brought-to-you auth">
                <div>
                  <img
                    className="hero-background"
                    src="www/images/logo.png"
                    alt="fritolay-logo"
                    role="presentation"
                    width="70"
                    height="43"
                  />
                </div>
                <div className="text">
                  Brought to you by Frito-Lay and Quaker
                </div>
                <div>
                  <img
                    className="hero-background"
                    src="www/images/quaker-logo.png"
                    alt="quaker-logo"
                    role="presentation"
                    width="55"
                    height="50"
                  />
                </div>
              </div>
            </Container>
          </div>
        </>
      );
    }

    return (
      <React.Fragment>
        {this.maxPointPixel()}
        <div className="home-wrapper">
          <div className="hero">
            {bannerList && bannerList.slidingBanner && (
              <HomeSilder images={bannerList.slidingBanner} />
            )}
          </div>
          <Container className="container-root">
            <div id="content">
              {bannerList && bannerList.myovpBanner && (
                <Pack data={bannerList.myovpBanner} />
              )}
              <Shop />
              {this.state.bestsellerList &&
                this.state.bestsellerList.length > 0 && (
                  <SuggestedItems
                    title="Bestselling snacks"
                    data={this.state.bestsellerList}
                  />
                )}
              <div className="flavor-notes-wrapper">
                {this.state.flavorNotes &&
                  this.state.flavorNotes.items &&
                  this.state.flavorNotes.items.length > 0 && (
                    <FlavorBanner flavorNotes={this.state.flavorNotes} />
                  )}
                <SnacksComFeatures />
              </div>
              {this.state.promotionalTiles && (
                <PromotionTiles data={this.state.promotionalTiles} />
              )}
            </div>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    minPrice: state.reducer.minAmount,
    customerDetails: state.reducer.customerDetails,
    zipResponse: state.reducer.zipResponse,
    labelListItem: state.reducer.labelListItem,
    isAuthenticated: state.reducer.isAuthenticated,
    navigationData: state.reducer.navigationData,
    bannerList: state.reducer.bannerList,
  };
};
export default connect(mapStateToProps, {
  actionGetMinAmount,
  actionGetCustomer,
  actionZipcodeVerification,
  actionLabelList,
  actionGetBannerList,
})(Home);
