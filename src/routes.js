import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { SecureRoute, Security } from "@okta/okta-react";

import APIUtil from "./config/APIUtil";
//import CyberSource from "./components/CyberSource/Pay";
// import CheckOut from "./components/getStarted/checkout/CheckOut";
import ImplicitCallback from "./LoginCallback/LoginCallback";
import ImplicitSocialCallback from "./LoginCallback/GoogleLoginCallback";
import RouteRapper from "./components/RouteRapper";
import ScrollToTop from "./components/ScrollTop";
// import ShopByCategory from "./components/pages/shopByCategory/ShopByCategory";
import TermsOfService from "./components/policyPages/termsOfService";
import ThirdPartyPayment from "./components/policyPages/thirdPartyPayment";
import UrlConstants from "./config/UrlConstants";
import { actiongetFilterData } from "./actions/ProductAction";
import checkMCProductAvailability from "./components/commonComponents/helpers/MultipackHelper";
import config from "./oktaconfig";
import { connect } from "react-redux";
import validateAPIResponse from "./components/ApiHelper";
import { CircularProgress } from "@mui/material";

const PDP = React.lazy(() => import("./components/PDP/PDP"));

//import PDP from "./components/PDP/PDP";

// import Multipack from "./components/pages/multipack/Multipack";
// import MyProfile from "./components/MyProfile/MyProfile";

const PageNotFound = React.lazy(() =>
  import("./components/404Page/PageNotFound")
);

const AllBrands = React.lazy(() => import("./components/AllBrands/AllBrands"));

const PrivacyPolicy = React.lazy(() =>
  import("./components/policyPages/privacyPolicy")
);

const ResetPassword = React.lazy(() =>
  import("./components/commonComponents/tastyRewards/resetPassword")
);

const ReturnsPolicy = React.lazy(() =>
  import("./components/policyPages/returnsPolicy")
);

// import HolidayShop from "./components/pages/holidayShop/HolidayShopProductList";

const Home = React.lazy(() => import("./components/pages/home/Home"));

//import Filters from "./components/filters/Filters";
// import CreateAccount from "./components/getStarted/registration/CreateAccount";

const ForgotPassword = React.lazy(() =>
  import("./components/commonComponents/tastyRewards/forgotPassword")
);

const ContactUsPage = React.lazy(() =>
  import("./components/ContactUs/ContactUsPage")
);

const AdsTracking = React.lazy(() =>
  import("./components/policyPages/adsTracking")
);

const ChangePassword = React.lazy(() =>
  import(
    "./components/commonComponents/tastyRewards/ChangePassword/ChangePassword"
  )
);

const CallOfDutyRules = React.lazy(() =>
  import("./components/policyPages/callOfDutyRules")
);

const ProductList = React.lazy(() =>
  import("./components/productList/ProductList")
);

const Cart = React.lazy(() =>
  import("./components/commonComponents/Cart/Cart")
);

export class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientToken: false,
      isLanguageLoad: !UrlConstants.isTastyRewards, //we need this flag only if it is TR site
      isLoader: true,
    };
    this.onAuthRequired = this.onAuthRequired.bind(this);
  }

  onAuthRequired() {
    this.props.history.push("/");
  }

  UNSAFE_componentWillMount() {
    var uniqueID =
      "_ss_" + new Date().getTime() + "i" + Math.random().toString(16).slice(2);
    var obj = { sessionId: uniqueID };
    if (
      !sessionStorage.getItem("_ss_i") ||
      !sessionStorage.getItem("_rr_n_dts") ||
      !sessionStorage.getItem("_en_cs")
    ) {
      APIUtil.postAPIKeyMethod(UrlConstants.handshaking, obj, false)
        .then(async (response) => {
          if (validateAPIResponse(response)) {
            const apiData = response.data;
            await this.setSesssionData(apiData);
          }
        })
        .catch(() => {
          this.removeSesssionData();
          this.setState({ clientToken: true, isLanguageLoad: true });
        });
    } else {
      this.setState({ clientToken: true, isLanguageLoad: true });
      if (
        JSON.parse(sessionStorage.getItem("shouldCheckItemAvailabilityCall"))
      ) {
        this.callCheckMCItemAvailability(
          sessionStorage.getItem("Zipcode"),
          sessionStorage.getItem("_lo_No")
        );
        this.props.actiongetFilterData();
      } else {
        this.setState({ isLoader: false });
      }
    }
  }

  filterProducts = (productList, filterTypes, filterValues) => {
    //console.log('productList ==',productList)
    let filteredProductList = productList.filter((item, index) => {
      if (filterTypes.includes("brand")) {
        const index = filterTypes.indexOf("brand");
        //console.log('brand' ,filterValues[index]);
        //if(item[0].brand.toLowerCase() === value.toLowerCase()) return item
        if (filterValues[index].includes(item[0].brand.toLowerCase()))
          return item;
      }
      if (filterTypes.includes("flavour")) {
        const index = filterTypes.indexOf("flavour");
        console.log("flavour", filterValues[index]);
        //if(item[0].flavour.toLowerCase().includes(value.toLowerCase())) return item
        if (filterValues[index].includes(item[0].flavour.toLowerCase()))
          return item;
      }
      if (filterTypes.includes("in_stock")) {
        if (item[0].outOfStock) return item;
      }
    });
    console.log("filteredProductList=====>", filteredProductList);
    //return filteredProductList;
  };

  removeSesssionData = () => {
    sessionStorage.removeItem("_ss_i");
    sessionStorage.removeItem("_rr_n_dts");
    sessionStorage.removeItem("_en_cs");
    this.setState({ clientToken: true, isLanguageLoad: true });
  };

  getLanguageInfo = async () => {
    APIUtil.postMethod(UrlConstants.Labeltranslation, {}, true)
      .then((response) => {
        if (response && response.data.data) {
          sessionStorage.setItem(
            "langTranslation",
            JSON.stringify(response.data.data)
          );
          this.setState({ isLanguageLoad: true });
        }
      })
      .catch((error) => console.error("LANGUAGE API", error));
  };

  setSesssionData = async (apiData) => {
    if (apiData.success && apiData.data) {
      sessionStorage.setItem("_ss_i", apiData.data.sessionId);
      sessionStorage.setItem("_rr_n_dts", apiData.data.rnduts);
      sessionStorage.setItem("_en_cs", apiData.data.encstr);
      sessionStorage.setItem("customerIp", apiData.data.geoip.customerIp);
      sessionStorage.setItem("Zipcode", apiData.data.geoip.postal);
      sessionStorage.setItem("_lo_No", apiData.data.geoip.locationId);
      sessionStorage.setItem("stateCode", apiData.data.geoip.stateCode);
      localStorage.setItem("_lo_No", apiData.data.geoip.locationId);
      localStorage.setItem("stateCode", apiData.data.geoip.stateCode);
      if (UrlConstants.isTastyRewards) {
        sessionStorage.setItem("isMultiLanguage", true);
        await this.getLanguageInfo();
      }
      await this.callCheckMCItemAvailability(
        apiData.data.geoip.postal,
        apiData.data.geoip.locationId
      );
    } else {
      this.removeSesssionData();
    }
    this.setState({ clientToken: true });
  };

  callCheckMCItemAvailability = async (zipcode, locationNumber) => {
    let response = checkMCProductAvailability({
      zipcode: zipcode,
      locationNumber: locationNumber,
    });
    await response.then((resObj) => {
      if (resObj.data.data != null) {
        sessionStorage.setItem(
          "isMCProductAvailable",
          resObj.data.data.productAvailable
        );
        sessionStorage.setItem("shouldCheckItemAvailabilityCall", false);
        this.setState({ isLoader: false });
      }
    });
  };

  render() {
    if (this.state.isLoader) {
      return (
        <div className="loader-outer">
          <div className="loader-inner">
            <CircularProgress />
          </div>
        </div>
      );
    }
    return (
      <ScrollToTop>
        {this.state.clientToken && this.state.isLanguageLoad ? (
          <Security {...config.oidc} onAuthRequired={this.onAuthRequired}>
            <Switch>
              <RouteRapper
                path="/"
                exact
                component={Home}
                title={"Home | " + UrlConstants.titleTag}
              />
              <RouteRapper
                path="/home"
                exact
                component={Home}
                title={"Home | " + UrlConstants.titleTag}
              />
              <RouteRapper
                path="/product/:id"
                exact
                component={PDP}
                title={"PDP | " + UrlConstants.titleTag}
              />
              <RouteRapper
                path="/allbrands"
                component={AllBrands}
                title={"All Brands | " + UrlConstants.titleTag}
              />
              <SecureRoute
                path="/protected"
                component={Home}
                title={"Home | " + UrlConstants.titleTag}
              />

              {/* <Route exact path="/cybersource" component={CyberSource} /> */}
              {/* <Route exact path="/flaminhot" component={flaminHot} /> */}
              <Route path="/implicit/callback" component={ImplicitCallback} />
              <Route
                path="/implicit/ssocallback"
                component={ImplicitSocialCallback}
              />

              <RouteRapper
                exact
                path="/productlist"
                component={ProductList}
                title={"Products | " + UrlConstants.titleTag}
              />

              <RouteRapper
                path="/productlist/:category"
                component={ProductList}
                title={"Products | " + UrlConstants.titleTag}
              />
              <RouteRapper
                exact
                path="/cart"
                component={Cart}
                title={"Cart | " + UrlConstants.titleTag}
              />

              {/* <RouteRapper
                exact
                path="/shopbycategory"
                component={ShopByCategory}
                title={"Shop By Category | " + UrlConstants.titleTag}
              />
              <RouteRapper
                exact
                path="/holidayshop"
                component={HolidayShop}
                title={"Holiday Shop | " + UrlConstants.titleTag}
              />
              <RouteRapper
                exact
                path="/varietypack"
                component={Multipack}
                title={"Varietypack | " + UrlConstants.titleTag}
              />
              <RouteRapper
                exact
                path="/cart"
                component={CartSummary}
                title={"Cart | " + UrlConstants.titleTag}
              />
              <RouteRapper
                exact
                path="/checkout"
                component={CheckOut}
                title={"Checkout | " + UrlConstants.titleTag}
              />
              <RouteRapper
                exact
                path="/productdetail"
                component={productdetail}
                title={"Product Detail | " + UrlConstants.titleTag}
              />
              <RouteRapper
                exact
                path="/thankyou"
                component={thankyou}
                title={"Thank You | " + UrlConstants.titleTag}
              /> */}

              {/* <RouteRapper path="/filters" component={Filters} /> */}

              <RouteRapper
                path="/contactus"
                component={ContactUsPage}
                title={"Contact | " + UrlConstants.titleTag}
              />
              <RouteRapper
                path="/contactform"
                component={ContactUsPage}
                title={"Contact | " + UrlConstants.titleTag}
              />
              <RouteRapper
                path="/terms-of-service"
                component={TermsOfService}
                title={"Terms Of Service | " + UrlConstants.titleTag}
              />

              <RouteRapper
                path="/privacy-policy"
                component={PrivacyPolicy}
                title={"Privacy Policy | " + UrlConstants.titleTag}
              />
              <RouteRapper
                path="/ads-tracking"
                component={AdsTracking}
                title={"Ads Tracking | " + UrlConstants.titleTag}
              />
              <RouteRapper
                path="/returns-policy"
                component={ReturnsPolicy}
                title={"Returns Policy | " + UrlConstants.titleTag}
              />
              <RouteRapper
                path="/thirdpartypay"
                component={ThirdPartyPayment}
                title={"ThirdPartyPayment | " + UrlConstants.titleTag}
              />
              {/* <RouteRapper
                path="/profile"
                component={MyProfile}
                title={"MyProfile | " + UrlConstants.titleTag}
              />
              <RouteRapper
                path="/create-account"
                component={CreateAccount}
                title={"CreateAccount | " + UrlConstants.titleTag}
              /> */}
              <RouteRapper
                path="/call-of-duty-rules"
                component={CallOfDutyRules}
                title={"Call Of Duty Rules | " + UrlConstants.titleTag}
              />
              <RouteRapper
                path="/forgotpassword"
                component={ForgotPassword}
                title={"Forgot Password | " + UrlConstants.titleTag}
              />
              <RouteRapper
                path="/changepassword"
                component={ChangePassword}
                title={"Change Password | " + UrlConstants.titleTag}
              />
              <RouteRapper
                path="/resetpassword"
                component={ResetPassword}
                title={"Reset Password | " + UrlConstants.titleTag}
              />
              <RouteRapper
                component={PageNotFound}
                title={"Page Not Found | " + UrlConstants.titleTag}
              />
            </Switch>
          </Security>
        ) : (
          ""
        )}
      </ScrollToTop>
    );
  }
}
export default connect(null, { actiongetFilterData })(Routes);
