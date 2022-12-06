//css
import "./header.scss";
import {
  BUTTONNAME,
  FOOTERLINKS,
  METHOD,
  PAGENAME,
  SELECTEDEVENTNAME,
} from "../../../config/amplitude/Taxonomy.constants";
import {
  ClickedButton,
  SelectedLinkItem,
  UserInfo,
} from "../../../config/amplitude/SnacksAmplitude";
import { EventNames, trackEvent } from "../../../appinsights/EventTrack";
// actions
import {
  LogOut,
  LoginAuth,
  SocialLoginAuth,
  actionGetCustomer,
  actionGetMinAmount,
  actionLabelList,
  actionZipcodeVerification,
  actiongetFilterData,
  navigationAPIData,
} from "../../../actions/ProductAction";

import { NavLink, withRouter } from "react-router-dom";
// utils
import {
  getCookie,
  removeSessionWhichStarts,
  getSequenceSubcategory,
} from "../../Utils";
import { isIE, isMobileOnly } from "react-device-detect";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import CombinedUserLogin from "../tastyRewards/combinedUserLogin";
import { DisplayHeading } from "./../../../config/constants/content.constant";
import { Link as LinkRoute } from "react-router-dom";
import Login from "../../login/login.js";
import MegaMenu from "./MegaMenu";
import MenuIcon from "@mui/icons-material/Menu";
// components
//const MobileSidebar = React.lazy(() => import("./MobileSidebar"));
const NavSearchBar = React.lazy(() => import("./NavSearchBar"));
import MobileSidebar from "./MobileSidebar";
import OktaAuth from "@okta/okta-auth-js";
import { ROUTES_URL } from "../../../config/constants/routes.constant";
import React from "reactn";
import SignUp from "../../commonComponents/tastyRewards/signUp/SignUp";
// common
import SnacksAlertMessage from "./../snacksAlertMessage/SnacksAlertMessage";
import Spinner from "../../Spinner";
import TRForgotPassword from "../../commonComponents/tastyRewards/forgotPassword";
import TRLogin from "../tastyRewards/login";
// config
import validateAPIResponse from "../../ApiHelper";
import UrlConstants from "../../../config/UrlConstants";
import APIUtil from "../../../config/APIUtil";
import config from "../../../oktaconfig";
import { connect } from "react-redux";
import qs from "query-string";
import staticData from "./data.json";
import { withOktaAuth } from "@okta/okta-react";

import dummyData from "./staticObjNavigation.json"; //"./data.json";
import {
  AppBar,
  Button,
  ClickAwayListener,
  Container,
  Dialog,
  DialogContent,
  Drawer,
  Grid,
  IconButton,
  Link,
  List,
  ListItem,
  MenuItem,
  MenuList,
  Toolbar,
  Tooltip,
} from "@mui/material";
import { withStyles } from "@mui/styles";
const styles = (theme) => ({
  menuButton: {
    display: "none",
    width: "auto",
    [theme?.breakpoints?.down("sm")]: {
      display: "block",
    },
  },
  cSelect: {
    position: "relative",
    paddingRight: "15px",
    "&:after": {
      content: '" "',
      right: "5px",
      position: "absolute",
      width: "0",
      height: "0",
      borderLeft: "5px solid transparent",
      borderRight: "5px solid transparent",
      borderTop: "5px solid rgba(0, 0, 0, 0.54)",
      fontSize: "0",
      top: "50%",
      transform: "translateY(-50%)",
      pointerEvents: "none",
    },
  },
  selectMenu: {
    appearance: "none",
    backgroundColor: "transparent",
    border: "nonMenue",
    color: Toolbar,
    withStyles: "#333",
    fontSize: "16px",
    [theme?.breakpoints?.down("xs")]: {
      fontSize: "14px",
    },
  },
  dropdownList: {
    display: "block",
  },
  customDropdown: {
    position: "absolute",
    border: "1px solid rgba(0, 0, 0, 0.15)",
    top: "100%",
    zIndex: "9",
    backgroundColor: "#fff",
    minWidth: "150px",
  },
  accButton: {
    position: "relative",
    paddingRight: "15px",
    "&:after": {
      content: '" "',
      right: "0px",
      position: "absolute",
      width: "0",
      height: "0",
      borderLeft: "5px solid transparent",
      borderRight: "5px solid transparent",
      borderTop: "5px solid rgba(0, 0, 0, 0.54)",
      fontSize: "0",
      top: "50%",
      transform: "translateY(-50%)",
      pointerEvents: "none",
    },
  },
  closeDrawer: {
    position: "absolute",
    top: "0",
    right: "0",
    zIndex: "9",
  },
});

const tastyRewardsUrl = UrlConstants.tastyRewardUrl + "/en-us";

export class Header extends React.PureComponent {
  state = {
    errorMessage: null,
    zipCode: sessionStorage.getItem("Zipcode"),
    showDrawer: false,
    showTRDrawer: false,
    clickAway: false,
    count: 0,
    clickedBtn: "",
    dailogOpen: false,
    showLoginModal: false,
    showTRForgotPasswordModal: false,
    showHybridLoginModal: false,
    userEmail: "",
    isAuthenticatedUser: this.props.isAuthenticated,
    menuToggle: false,
    trProfilePopover: false,
    // showHolidayShopMenu: sessionStorage.getItem("holidayShopEnable")
    //   ? sessionStorage.getItem("holidayShopEnable")
    //   : false,
    showApiFailAlert: false,
    apiErrorMessage:
      "There is an unexpected error that occurred. Please reload to continue.",
    showLoadingSpinner: false,
    homeLanguage: [],
    showShopLinks: false,
    isAccessToeknRecieved: false,
    languageMessage: "",
    zipMessage: "",
    zipValidationError: "",
    spinner: false,
    showSignup: false,
    claimsData: [],
    isMenuOpen: false,
    zipAriaMessage: "",
    isMegaMenuOpen: false,
    selectedMenuIndex: 0,
    menuShopData: null,
    showSearchInput: false,
    searchText: "",
    errors: null,
    mobileMenuAnchorEl: null,
    isSearchPopupOpen: false,
    isSearchPopupOpenOnEnter: false,
    searchAnchorEl: null,
    scrolled: false,
    hovarTitle: "",
    listObj: dummyData.data,
    filterData: "",
  };

  UNSAFE_componentWillMount() {
    this.validateUserSession();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    // if (nextProps.minPrice) {
    //   let minPriceTemp = nextProps.minPrice;
    //   if (minPriceTemp && Object.keys(minPriceTemp).length > 0) {
    //     this.setState({
    //       showHolidayShopMenu:
    //         minPriceTemp && minPriceTemp.displayMerchandiseItems,
    //     });
    //   }
    // }

    if (nextProps.navigationData && nextProps.navigationData.length > 0) {
      this.setState({
        listObj: nextProps.navigationData,
      });
    }
  }

  componentDidMount() {
    this.props?.navigationAPIData();
    //when route changes, alert message from top header will remove
    this.props.history.listen((location, action) => {
      //verify if session expired then force user login
      if (!localStorage.getItem("accessToken") && this.props?.isAuthenticated) {
        this.props.LogOut();
        this.clearUserSavedData();
        this.setState({
          isAuthenticated: false,
          showLoginModal: true,
        });
      }
      this.setState({ showApiFailAlert: false }, () => {
        document.getElementById("body").classList.remove("has-toast");
      });
    });
    // function called for the calculation of cartcount
    this.getCount();
    var that = this;
    let token = localStorage.getItem("token");
    const isLoggedIn = token !== null && token.length > 0;
    if (isLoggedIn) {
      this.setState({
        isAuthenticated: true,
        showLoginModal: false,
      });
    }

    // event listener for the show login Dialog.
    document.addEventListener("showLoginDialog", () =>
      that.setState({ showLoginModal: true })
    );
    // event listner for show api fail error message
    document.addEventListener("showApiFailAlert", (e) => {
      let showApiFailAlert = sessionStorage.getItem("isApiFailed")
        ? sessionStorage.getItem("isApiFailed")
        : false;
      this.setState({ showApiFailAlert: JSON.parse(showApiFailAlert) }, () => {
        JSON.parse(showApiFailAlert)
          ? document.getElementById("body").classList.add("has-toast")
          : document.getElementById("body").classList.remove("has-toast");
      });
    });
    // event listener for the change in local storage
    document.addEventListener("cartitem", function (e) {
      let cartItems = sessionStorage.getItem("cartItems")
        ? JSON.parse(sessionStorage.getItem("cartItems"))
        : 0;
      let count = 0;
      if (cartItems.length > 0) {
        cartItems.map((items) => {
          count = count + parseInt(items.quantity);
          return count;
        });
        that.setState({ count: count });
      } else that.setState({ count: 0 });
      that.forceUpdate();
      // Rerendering the component
    });

    if (
      !this.props.customerDetails ||
      !this.props.customerDetails.accountContacts
    )
      this.getUserDetails();
    document.addEventListener("keydown", this.hideUserDropdown);
    if (!sessionStorage.getItem("customerSessionId")) {
      const momentTimestamp = getCookie("ai_session").split("|")[2];
      sessionStorage.setItem("customerSessionId", momentTimestamp);
    }
    if (isIE) {
      document.getElementById("body").classList.add("has-IE-toast");
    }
    if (
      sessionStorage.getItem("isApiFailed") == "true" ||
      JSON.parse(sessionStorage.getItem("isApiFailed"))
    ) {
      let event = new CustomEvent("showApiFailAlert");
      document.dispatchEvent(event);
    }
    //check for login from tasty-rewards
    let params = qs.parse(window.location.search);
    let code = params ? params.src : ""; // in case of session exist
    // let lang = params ? params.lang : "";
    if (code === "social") {
      this.isUserLogin(this.props, this.state);
    } else if (!isLoggedIn && code !== "rl") {
      this.loginWithTR(code);
    }
    if (!this.props.filterProducts) {
      this.props.actiongetFilterData();
    }

    this.props.actionLabelList();

    window.addEventListener("scroll", this.onScroll);
  }

  onScroll = () => {
    if (window.pageYOffset > 10) {
      this.setState({ scrolled: true });
    } else {
      this.setState({ scrolled: false });
    }
  };

  loginWithTR = (code) => {
    let self = this;
    let oktaAuth = new OktaAuth(config.oidc);

    if (oktaAuth.token) {
      oktaAuth.token
        .getWithoutPrompt({
          responseType: "code",
          scopes: config.oidc.scopes,
          // or array of types
        })
        .then(function (res) {
          var tokens = res.tokens;
          let claims = tokens.idToken.claims;
          sessionStorage.setItem("tokens", JSON.stringify(tokens));
          sessionStorage.setItem("response", JSON.stringify(res));
          if (claims.name && claims.email) {
            self.redirectUserLogin(tokens, res, code);
          } else {
            self.setState({ showSignup: true });
            self.setState({ claimsData: claims });
          }
        })
        .catch(function (err) {
          let logoutRes = {};
          self.props.LogOut(logoutRes);
          localStorage.removeItem("idToken");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("okta-token-storage");
          localStorage.removeItem("isRefreshPage");
          localStorage.removeItem("token");
          //window.location.assign("/home");
          // handle OAuthError or AuthSdkError (AuthSdkError will be thrown if app is in OAuthCallback state)
        });
    }
  };

  isUserLogin = (props) => {
    let self = this;
    let res = {};
    if (localStorage.getItem("isRefresh") === "true") {
      self.props.SocialLoginAuth(res);
      localStorage.setItem("isRefresh", false);
    } else if (sessionStorage.getItem("claimsData")) {
      let claimData = JSON.parse(sessionStorage.getItem("claimsData"));
      self.setState({ showSignup: true });
      self.setState({ claimsData: claimData });
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps?.location?.pathname !== window.location?.pathname) {
      if (this.state.showSearchInput && !this.global.globalSearchText) {
        this.setState({
          showSearchInput: false,
          searchText: "",
          isSearchPopupOpen: false,
          searchAnchorEl: null,
        });
      }
    }
  }

  redirectUserLogin = (tokens, res, code) => {
    let accessToken = tokens.accessToken.accessToken;
    localStorage.setItem("idToken", JSON.stringify(tokens.idToken));
    localStorage.setItem("token", "Bearer " + tokens.accessToken.value);
    localStorage.setItem("accessToken", JSON.stringify(tokens.accessToken));
    localStorage.setItem("okta-token-storage", JSON.stringify(tokens));
    this.props.SocialLoginAuth(res);
    var headersSet = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    if (accessToken) {
      headersSet["sessionId"] = sessionStorage.getItem("_ss_i");
      headersSet["rnduts"] = sessionStorage.getItem("_rr_n_dts");
      headersSet["encstr"] = sessionStorage.getItem("_en_cs");
      headersSet["X-Auth-Token"] = accessToken;
      return Axios({
        method: "get",
        url: UrlConstants.GetCustomer,
        headers: headersSet,
      })
        .then((response) => {
          this.props.LoginAuth(response);
          if (response.data.success && !localStorage.getItem("isRefreshPage")) {
            localStorage.setItem("isRefreshPage", "yes");
            // window.location.reload();
            //if(code === 'tr'){
            window.location.assign("/home");
            //}
          }
        })
        .catch((error) => {
          if (error.response && error.response.statusText === "Forbidden") {
            window.location.reload();
          } else if (error.response) {
            if (error.response.data === "Invalid token.") {
            } else {
              return error.response;
            }
          } else {
            return { status: "404" };
          }
        });
    }
  };

  componentWillUnmount() {
    var that = this;
    document.removeEventListener("showLoginDialog", () =>
      that.setState({ showLoginModal: true })
    );
    document.removeEventListener("cartitem", function (e) {
      let cartItems = sessionStorage.getItem("cartItems")
        ? JSON.parse(sessionStorage.getItem("cartItems"))
        : 0;
      let count = 0;
      if (cartItems.length > 0) {
        cartItems.map((items) => {
          count = count + parseInt(items.quantity);
          return count;
        });
        that.setState({ count: count });
      } else that.setState({ count: 0 });
      that.forceUpdate();
      // Rerendering the component
    });
    document.removeEventListener("keydown", this.hideUserDropdown);
    document.removeEventListener("showApiFailAlert", () => {
      that.setState({ showApiFailAlert: false });
    });
    that.setState({ showApiFailAlert: false });
    window.removeEventListener("scroll", this.onScroll);
  }

  getIEAlert = () => (
    <SnacksAlertMessage
      fullWidth
      msg="Our site works best in all modern bowsers, except Internet Explorer."
      handleClose={this.handleClose}
      customClass="IE-only"
    />
  );

  getFreeShippingAlert = () => {
    if (
      window.location.pathname != "/thankyou" &&
      sessionStorage.getItem("freeShipping")
    ) {
      document
        .getElementById("body")
        .classList.add(
          UrlConstants.isTastyRewards ? "freeShipping-tr" : "freeShipping"
        );
      return (
        <SnacksAlertMessage
          fullWidth
          msg={sessionStorage.getItem("freeShipping")}
          customClass={`snackbar-freeShipping ${
            UrlConstants.isTastyRewards && "snackbar-freeShipping-tr"
          }`}
        />
      );
    } else {
      document
        .getElementById("body")
        .classList.remove(
          UrlConstants.isTastyRewards ? "freeShipping-tr" : "freeShipping"
        );
    }
  };

  validateUserSession() {
    if (localStorage.getItem("accessToken") !== null) {
      const expiryTimeStamp = JSON.parse(
        localStorage.getItem("accessToken")
      ).expiresAt;
      const currentTimeStamp = parseInt(Date.now() / 1000);
      if (currentTimeStamp > expiryTimeStamp) {
        localStorage.clear();
        window.location.assign("/home");
      }
    } else if (this.props.isAuthenticated) {
      this.props.LogOut();
      this.clearUserSavedData();
    }
    return null;
  }

  toggleDrawer = (event) => {
    this.setState({
      showDrawer: !this.state.showDrawer,
      mobileMenuAnchorEl: event.currentTarget,
    });
  };

  drawClose = () => {
    this.setState({
      showDrawer: !this.state.showDrawer,
    });
  };

  toggleTRDrawer = () => {
    this.setState({ showTRDrawer: !this.state.showTRDrawer });
  };

  zipValidation = (e) => {
    trackEvent(
      EventNames.Action.ACTION_HEADER_PRODUCTS,
      EventNames.Event.EVENT_BUTTON_PRESS,
      window.location.origin,
      window.location.pathname
    );
    SelectedLinkItem(SELECTEDEVENTNAME.NAVIGATION, METHOD.HEADER, {
      itemName: e.target.text.replace(/\s+/g, ""),
    });
    e.preventDefault();
    let zipcodeVerified = sessionStorage.getItem("Zipcode");
    if (zipcodeVerified) {
      this.clearFewSession();
      e.target.text === DisplayHeading.PRODUCT_LIST_TITLE &&
        this.props.history.push("/productlist");
      e.target.text === DisplayHeading.SHOP_BY_CATEGORY_TITLE &&
        this.props.history.push("/shopbycategory");
    }
    let parsedQueryString = qs.parse(this.props.location.search);
    if (parsedQueryString.productName) window.location.assign("/productlist");
  };

  cartZipValidation = () => {
    let zipcodeVerified = sessionStorage.getItem("Zipcode");
    if (zipcodeVerified) {
      this.clearFewSession();
      if (sessionStorage.getItem("cartItems") !== null) {
        trackEvent(
          EventNames.Action.ACTION_HEADER_ADD_TO_CART,
          EventNames.Event.EVENT_BUTTON_PRESS,
          window.location.origin,
          window.location.pathname,
          { cart: JSON.parse(sessionStorage.getItem("cartItems")) }
        );
        ClickedButton(BUTTONNAME.CART, METHOD.HEADER);
      }
      this.props.history.push("/cart");
    } else this.setState({ dailogOpen: true, clickedBtn: "cartIcon" });
  };

  clearFewSession = () => {
    sessionStorage.removeItem("selectedCategory");
    sessionStorage.removeItem("multipackCartItems");
    sessionStorage.removeItem("replaceMixItems");
    sessionStorage.removeItem("multipackEditId");
  };

  trPopoverOpen = (event) => {
    event.preventDefault();
    this.setState({
      trProfilePopover: true,
    });
  };

  trPopoverClose = (event) => {
    event.preventDefault();
    this.setState({
      trProfilePopover: false,
    });
  };

  getCount() {
    let cartItems = JSON.parse(sessionStorage.getItem("cartItems"));
    let count = 0;
    cartItems &&
      cartItems.map((item) => {
        count = count + parseInt(item.quantity);
        return count;
      });
    this.setState({ count: count });
  }

  openLoginModal(events) {
    events.preventDefault();
    let loginClicked = localStorage.getItem("loginClicked");
    if (loginClicked === "checkout") {
      localStorage.setItem("showLogin", 1);
      var event = new CustomEvent("showLogin");
      document.dispatchEvent(event);
      if (document.getElementById("okta-signin-username")) {
        document.getElementById("okta-signin-username").focus();
      }
    } else this.setState({ showLoginModal: true, showSignup: false });
  }

  openSignupModal(event) {
    event.preventDefault();
    this.setState({ showSignup: true, showLoginModal: false });
  }

  hideLoginModal = () => {
    this.setState({
      showLoginModal: false,
      showHybridLoginModal: false,
      userEmail: "",
    });
  };

  hideUserDropdown = (event) => {
    // ESC
    if (event.keyCode === 27) this.setState({ menuToggle: false });
  };

  onLoginSuccess = (response) => {
    if (!this.state.isAuthenticatedUser)
      this.setState({ isAuthenticated: true, showLoginModal: false });
    this.getUserDetails();
    let zipcodeVerified = sessionStorage.getItem("Zipcode");
    let loggedInUser = localStorage.getItem("accessToken");
    if (zipcodeVerified && loggedInUser) this.props.history.push("/home");
    else this.setState({ dailogOpen: true, clickedBtn: "getStarted" });
  };

  getUserDetails = async () => {
    if (
      localStorage.getItem("token") !== null &&
      localStorage.getItem("accessToken") !== null
    ) {
      await this.props.actionGetCustomer();
    }
  };

  userLogout = (event) => {
    ClickedButton(BUTTONNAME.LOGOUT, METHOD.HEADER);
    event.preventDefault();
    this.authServiceLogout();
  };

  authServiceLogout = () => {
    this.setState({ showLoadingSpinner: true });
    this.closeMegaMenuOnClick();
    this.props.authService
      .logout({
        revokeAccessToken: false,
        postLogoutRedirectUri: window.location.origin + "/home",
      })
      .then((res) => {
        this.props.LogOut(res);
        this.clearUserSavedData();
        this.setState({ showLoadingSpinner: false });
      })
      .catch((err) => {
        this.setState({ showLoadingSpinner: false });
        console.error("Found an error", err);
      });
  };

  clearUserSavedData = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("idToken");
    localStorage.removeItem("user");
    localStorage.removeItem("isRefresh");
    localStorage.removeItem("accountId");
    localStorage.removeItem("isRefreshPage");
    // localStorage.removeItem("code");
    UserInfo(null);
    sessionStorage.removeItem("billingSameAsShipping");
    sessionStorage.removeItem("formValues");
    sessionStorage.removeItem("billingValues");
    sessionStorage.removeItem("formAddValues");
    sessionStorage.removeItem("formChangeValues");
    sessionStorage.removeItem("errorPaymentMsg");
    sessionStorage.removeItem("billingInvalid");
    sessionStorage.removeItem("shippingInvalid");
    sessionStorage.removeItem("selectedShippingAddress");
    sessionStorage.removeItem("taxZipCode");
    sessionStorage.removeItem("userAccountId");
    sessionStorage.removeItem("regData");
    removeSessionWhichStarts("shippingSku");
    this.clearFewSession();
  };

  handleClickAway = () => this.setState({ menuToggle: false });

  handleClick = () => this.setState({ menuToggle: !this.state.menuToggle });

  getFlaminHotSectionContent = (section) => {
    const flaminHotConfig = this.props.labelListItem?.FlaminHotConfig;
    const sectionText = flaminHotConfig?.filter(
      (item) => item.sectionName === section
    );
    return sectionText?.length > 0 ? sectionText?.[0].sectionDescription : "";
  };

  handleMegaMenuOpen = (e, label) => {
    let obj = this.state.listObj.filter((i) => i.title === label);

    this.setState({
      isMegaMenuOpen: true,
      hovarTitle: label,
      filterData: obj.length > 0 ? getSequenceSubcategory(obj[0]) : "",
    });
  };

  handleMegaMenuOpenNew = () => {
    this.setState({
      isMegaMenuOpen: true,
      //hovarTitle: label,
    });
  };

  closeMegaMenu = () => {
    this.setState({
      isMegaMenuOpen: false,
      selectedMenuIndex: 0,
    });
  };

  handleSelectSubMenu = (index) => {
    this.setState({
      selectedMenuIndex: index,
    });
  };

  closeMegaMenuOnClick = (label = "") => {
    if (label === "Flamin' Hot Shop") {
      ClickedButton(
        BUTTONNAME.FLAMINHOTNAVIGATIONMENUOPTION,
        METHOD.FLAMINHOTNAVIGATIONMENU
      );
    } else if (label === "Make Variety Pack") {
      ClickedButton(
        BUTTONNAME.MYOVPNAVIGATIONMENUOPTION,
        METHOD.MYOVPNAVIGATIONMENU
      );
    }
    this.setState({
      isMegaMenuOpen: false,
      mobileMenuAnchorEl: null,
      showDrawer: false,
      selectedMenuIndex: 0,
    });
  };
  closeMegaMenuOnLeave = () => {
    this.setState({
      selectedMenuIndex: 0,
      isMegaMenuOpen: false,
      // hovarTitle: "",
    });
  };

  handleSelectSubMenuItem = (selectedSubmenu, selectedMenu) => {
    // get selectedSubmenu & selectedMenu eg. Baked, Brand

    this.props.history.push({
      pathname: ROUTES_URL.PRODUCT_LIST,
    });

    this.setGlobal({
      selectedSubmenu: selectedSubmenu,
      selectedMenu: selectedMenu,
    });

    this.closeMegaMenuOnClick();
  };

  handleSelectedMobile = (selectedOption) => {
    let obj = this.state.listObj.filter((i) => i.title === selectedOption);

    this.setState({
      filterData: obj.length > 0 ? getSequenceSubcategory(obj[0]) : "",
    });
  };

  getSelectedSubcat = (subCatName = "", subCateValue = "", link = "") => {
    console.log(subCatName, "  subCatName  ", subCateValue);

    this.setState({
      isMegaMenuOpen: false,
    });
    console.log(this.props.location);
    if (link) {
      this.props.history.push(`${link}`);
    }
  };

  navigationList = (activeTitle) => {
    const { theme } = this.props;
    const { listObj } = this.state;

    return (
      <>
        {listObj.length > 0 &&
          listObj.map((menu, i) => {
            if (menu.parentCategory.length > 0) {
              return (
                <React.Fragment>
                  <ListItem
                    key={`navList${menu.categoryId}`}
                    className={`menu-list-single menu-mega has-submenu ${theme}`}
                    id={`nav-list-mega${menu.categoryId}`}
                    aria-owns={
                      this.state.isMegaMenuOpen ? "nav-mega-menu" : null
                    }
                    onMouseEnter={(e) => this.handleMegaMenuOpen(e, menu.title)}
                    onMouseLeave={(e) => this.closeMegaMenuOnLeave(e)}
                  >
                    <Button
                      className={
                        activeTitle === menu.title
                          ? `menu-link active`
                          : `menu-link`
                      }
                      id={menu.categoryId}
                      aria-expanded={this.state.isMegaMenuOpen}
                      onClick={() => {
                        if (window.innerWidth > 1024) {
                          this.setState({
                            isMegaMenuOpen: !this.state.isMegaMenuOpen,
                          });
                        }
                      }}
                    >
                      {menu.title}
                    </Button>
                  </ListItem>
                </React.Fragment>
              );
            } else {
              return (
                <React.Fragment key={`${menu.title} navigation List`}>
                  <ListItem className="menu-list-single">
                    <Button
                      className={`menu-link ${theme} ${
                        // window.location.pathname ===
                        //   ? "active"
                        //   : "no-active"
                        "no-active"
                      } ${theme}`}
                      aria-label={menu.title}
                      id={menu.title}
                      onClick={() => {
                        this.getSelectedSubcat("", "", "allbrands");
                      }}
                    >
                      {menu.title}
                    </Button>
                  </ListItem>
                </React.Fragment>
              );
            }
          })}
        {this.state.isMegaMenuOpen && (
          <MegaMenu
            handleMegaMenuOpenNew={this.handleMegaMenuOpenNew}
            closeMegaMenuOnLeave={this.closeMegaMenuOnLeave}
            hovarTitleName={this.state.hovarTitle}
            filterList={this.state.filterData}
            getSelectedSubcat={this.getSelectedSubcat}
          />
        )}
      </>
    );
  };
  navigationListHoliday = () => {
    const { theme } = this.props;

    return (
      <>
        <ListItem className="menu-list-single holiday-list">
          <NavLink
            className={`menu-link ${theme}`}
            to="/holidayshop"
            aria-label={DisplayHeading.HOLIDAY_SHOP}
            onClick={() =>
              SelectedLinkItem(SELECTEDEVENTNAME.NAVIGATION, METHOD.HEADER, {
                itemName: PAGENAME.HOLIDAY,
              })
            }
          >
            H
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18.532"
              height="19.284"
            >
              <title>holiday shop icon small</title>
              <path
                d="M13.088 3.268a.3.3 0 00-.402.1l-.867 1.457a.006.006 0 01-.01 0l-.295-.767a.288.288 0 00-.378-.156.294.294 0 00-.165.376l.469 1.175-.223.374a.006.006 0 01-.01 0l-.708-1.69a.292.292 0 10-.536.232l.877 2.09-.715 1.188a.006.006 0 01-.007.004 2.2 2.2 0 00-.513-.143.006.006 0 01-.004-.007l.015-.694.56-.41a.287.287 0 00.062-.4.283.283 0 00-.403-.069l-.202.145a.006.006 0 01-.01-.005l.01-.82a.285.285 0 00-.286-.298.3.3 0 00-.298.288l-.005.817a.006.006 0 01-.01.006l-.222-.17a.284.284 0 00-.405.045.292.292 0 00.05.41l.572.442a.006.006 0 01.002.006l-.015.694a.006.006 0 01-.007.004 1.912 1.912 0 00-.52.141.006.006 0 01-.008-.002l-.686-1.239a.006.006 0 01-.003-.004l.954-2.052a.3.3 0 00-.144-.391.292.292 0 00-.387.149L7.45 5.752a.006.006 0 01-.011 0l-.213-.384a.006.006 0 01-.003-.005l.522-1.169a.294.294 0 00-.537-.238l-.332.765a.006.006 0 01-.009.005l-.807-1.457a.3.3 0 00-.336-.157.292.292 0 00-.181.423l.814 1.468a.006.006 0 01-.01.005l-.772-.107a.29.29 0 00-.322.244.294.294 0 00.25.333l1.213.168.213.384a.006.006 0 01-.006.009L5.118 5.81a.284.284 0 00-.322.244.3.3 0 00.255.33l2.23.287a.006.006 0 01.003.005l.684 1.234a.006.006 0 01-.002.008 1.928 1.928 0 00-.382.371.006.006 0 01-.007.004l-.591-.359a.006.006 0 01-.003-.005l-.06-.718a.29.29 0 00-.315-.262.294.294 0 00-.263.316l.01.274a.006.006 0 01-.01.005l-.692-.423a.283.283 0 00-.402.1.29.29 0 00.102.402l.702.417a.006.006 0 010 .011l-.305.112a.293.293 0 00.227.54l.708-.278.591.358a.006.006 0 01.004.007 2.462 2.462 0 00-.146.511.006.006 0 01-.007.004l-1.406-.021-1.312-1.847a.288.288 0 00-.401-.065.283.283 0 00-.069.402L4.997 9.27a.006.006 0 01-.005.01l-.442-.007-.779-1.084a.3.3 0 00-.409-.065.29.29 0 00-.058.406l.512.718a.006.006 0 01-.005.01l-1.678-.03a.283.283 0 00-.298.287.293.293 0 00.287.298l1.675.032a.006.006 0 01.005.01l-.496.651a.292.292 0 00.049.41.3.3 0 00.321.025.382.382 0 00.085-.079l.772-1 .005-.003.442.006a.006.006 0 01.006.01L3.878 11.32a.29.29 0 00.058.406.285.285 0 00.316.028.362.362 0 00.09-.084l1.365-1.803.006-.003 1.409.027a.006.006 0 01.003.007 1.97 1.97 0 00.132.524.006.006 0 01-.003.007l-.62.343-.004.003-.674-.313a.294.294 0 00-.39.144.3.3 0 00.15.388l.275.13a.006.006 0 01.005.01l-.69.381a.3.3 0 00-.156.337.292.292 0 00.423.183l.7-.388a.006.006 0 01.01.006l-.034.308a.293.293 0 00.244.322.278.278 0 00.182-.036.288.288 0 00.15-.212l.089-.745.004-.002.619-.343a.006.006 0 01.007.001 1.862 1.862 0 00.372.384.006.006 0 01.004.007l-.727 1.203-.005.003-2.251.203a.293.293 0 00-.26.316.3.3 0 00.316.263l1.823-.17a.006.006 0 01.005.009l-.229.377-.008.005-1.306.152a.283.283 0 00-.255.316.29.29 0 00.315.26l.867-.108a.006.006 0 01.006.01l-.862 1.436a.284.284 0 00.101.401.28.28 0 00.286.004.29.29 0 00.114-.103l.86-1.436a.006.006 0 01.011 0l.34.819a.293.293 0 00.378.155.063.063 0 00.034-.01.3.3 0 00.13-.366L7.09 13.85l.222-.374a.006.006 0 01.011 0l.707 1.69a.3.3 0 00.385.152l.024-.013a.292.292 0 00.13-.365l-.88-2.098.727-1.204a.006.006 0 01.007-.004 2.491 2.491 0 00.514.154.006.006 0 01.003.007l-.01.703-.579.435a.29.29 0 00-.064.41.3.3 0 00.378.083.075.075 0 00.028-.023l.222-.167a.006.006 0 01.01.005l-.015.8a.3.3 0 00.287.298.3.3 0 00.151-.034.286.286 0 00.145-.251l.014-.8a.006.006 0 01.01-.005l.212.158a.292.292 0 00.321.025.327.327 0 00.089-.074.3.3 0 00-.05-.41l-.57-.432a.006.006 0 01-.003-.005l.01-.704a.006.006 0 01.006-.003 2.278 2.278 0 00.514-.134.006.006 0 01.007.003l.671 1.21a.006.006 0 01.003.004l-.946 2.048a.291.291 0 00.403.377.247.247 0 00.121-.132l.766-1.657a.006.006 0 01.01-.001l.214.384-.503 1.137a.294.294 0 00.41.373.3.3 0 00.12-.132l.32-.736a.006.006 0 01.008-.005l.825 1.488a.291.291 0 00.453.07.3.3 0 00.046-.369l-.81-1.462a.006.006 0 01.008-.005l.794.123a.328.328 0 00.183-.036.294.294 0 00-.1-.545l-1.24-.175a.006.006 0 01-.003-.005l-.217-.392a.006.006 0 01.006-.009l1.81.23a.272.272 0 00.177-.032.308.308 0 00.152-.222.294.294 0 00-.25-.32l-2.249-.286a.006.006 0 01-.002-.004l-.67-1.21a.006.006 0 010-.008 2.166 2.166 0 00.393-.368.006.006 0 01.006-.004l.602.364a.006.006 0 01.003.006l.078.678a.3.3 0 00.316.263.361.361 0 00.11-.037.291.291 0 00.149-.285l-.027-.243a.006.006 0 01.01-.005l.69.419a.3.3 0 00.291 0 .321.321 0 00.108-.1.291.291 0 00-.102-.4l-.69-.42a.006.006 0 01.002-.01l.234-.097.03-.017a.288.288 0 00-.254-.516l-.643.27-.607-.374a.006.006 0 01-.004-.007 1.974 1.974 0 00.146-.51.006.006 0 01.007-.004l1.385.022 1.307 1.846a.291.291 0 00.376.092.063.063 0 00.027-.023.29.29 0 00.069-.402l-1.054-1.489a.006.006 0 01.005-.01l.435.01.741 1.021a.284.284 0 00.372.085l.031-.017a.287.287 0 00.068-.402l-.483-.666a.006.006 0 01.005-.01l1.698.027a.257.257 0 00.145-.03.292.292 0 00.15-.255.3.3 0 00-.286-.299l-1.697-.027a.006.006 0 01-.005-.01l.487-.627a.293.293 0 00-.46-.362l-.76.986-.005.003-.436-.009a.006.006 0 01-.006-.01l1.102-1.456a.29.29 0 00-.055-.408.294.294 0 00-.408.056l-1.365 1.803.004-.002-1.377-.028a.006.006 0 01-.004-.007 2.117 2.117 0 00-.134-.515.006.006 0 01.003-.007l.612-.34.004-.002.662.29a.28.28 0 00.26-.014.258.258 0 00.12-.132.286.286 0 00-.144-.378l-.254-.11a.006.006 0 010-.011l.714-.397a.292.292 0 00.069-.455.3.3 0 00-.368-.046l-.7.388a.006.006 0 01-.01-.006l.033-.275a.3.3 0 00-.25-.333.286.286 0 00-.319.25l-.093.716-.004.003-.613.34a.006.006 0 01-.008-.002 2.25 2.25 0 00-.368-.393.006.006 0 01-.004-.006l.715-1.188.005-.003 2.248-.208a.224.224 0 00.113-.03.291.291 0 00.15-.286.3.3 0 00-.317-.263l-1.816.167a.006.006 0 01-.005-.01l.223-.374.005-.003 1.264-.128a.3.3 0 00.11-.037.286.286 0 00.143-.282.29.29 0 00-.317-.263l-.817.084a.006.006 0 01-.005-.01l.87-1.445a.284.284 0 00-.101-.401zM10.657 8.88a1.582 1.582 0 11-2.152-.618 1.584 1.584 0 012.152.618z"
                fill="#fdfdfd"
              />
            </svg>
            LIDAY SHOP
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23.234"
              height="24.416"
              className="holiday-icn"
            >
              <title>holiday shop icon big</title>
              <path
                d="M19.526 11.005l-1.346 1.717-.926-.134.929-1.209-.943-.132-.93 1.209-1.77-.25 1.32-1.676-2.165-.304 1.13-1.446 1.493.2.587-.749-1.493-.2.583-.748 2.16.303.584-.747-2.161-.302 1.33-1.709-.649-.502-1.33 1.703-.817-2.023-.585.747.818 2.023-.581.744-.578-1.35-.585.75.577 1.349-1.098 1.405-.796-1.972-1.344 1.714-.687-1.7.944-1.244-.357-.882-.943 1.244-.355-.878 1.342-1.722-.356-.88-1.342 1.722-.81-2.005-.764.308.81 2.005-2.16-.306.356.88 2.16.306.353.874-1.52-.2.357.883 1.52.202.668 1.653-2.108-.296.814 2.015-1.818-.256-.576-1.424-.941-.133.577 1.43-.938-.133-.817-2.024-.94-.133.818 2.025-2.143-.301-.115.815 2.143.3-1.348 1.72.94.131 1.346-1.717.934.13-.924 1.186.943.132.923-1.185 1.772.25-1.314 1.681 2.154.301-1.129 1.445-1.52-.195-.586.749 1.521.195-.583.747-2.163-.3-.583.75 2.162.301-1.332 1.701.648.507 1.33-1.701.816 2.022.584-.747-.818-2.023.581-.744.566 1.416.585-.75-.565-1.415 1.1-1.409.801 1.982 1.336-1.726.687 1.702-.937 1.264.356.882.944-1.263.355.88-1.343 1.722.354.877 1.345-1.72.81 2.006.764-.309-.81-2.006 2.157.306-.356-.88-2.158-.304-.353-.874 1.546.214-.356-.882-1.546-.214-.667-1.652 2.113.297-.818-2.024 1.813.255.567 1.405.942.132-.567-1.404.938.132.818 2.025.94.132-.818-2.024 2.146.297.114-.815-2.143-.295 1.345-1.719zm-8.229-.702l.76-.969.44 1.092-.757.968zm-1.95.094l1.166.164.46 1.14-1.165-.163zm.785 3.046l-1.218-.17.724-.928 1.217.172zm.615.551l.752-.968.44 1.09-.758.97zm1.982-.135l-.462-1.144 1.166.164.46 1.14zm-.343-1.955l.722-.93 1.219.17-.726.928z"
                fill="#fff"
                opacity=".634"
              />
            </svg>
          </NavLink>
        </ListItem>
      </>
    );
  };

  renderLoginButton = () => {
    const { theme } = this.props;
    return (
      <Button
        className={`menu-link no-active ${theme}`}
        aria-label={DisplayHeading.LOGIN}
        onClick={(event) => {
          trackEvent(
            EventNames.Action.ACTION_HEADER_LOGIN,
            EventNames.Event.EVENT_BUTTON_PRESS,
            window.location.origin,
            window.location.pathname
          );
          ClickedButton(BUTTONNAME.LOGIN, METHOD.HEADER);
          sessionStorage.removeItem("prevUrl");
          this.openLoginModal(event);
        }}
      >
        {DisplayHeading.LOGIN}
      </Button>
      // <NavLink
      //   className={`menu-link no-active ${theme}`}
      //   aria-label={DisplayHeading.LOGIN}
      //   role="button"
      //   aria-current="true"
      //   onClick={(event) => {
      //     trackEvent(
      //       EventNames.Action.ACTION_HEADER_LOGIN,
      //       EventNames.Event.EVENT_BUTTON_PRESS,
      //       window.location.origin,
      //       window.location.pathname
      //     );
      //     ClickedButton(BUTTONNAME.LOGIN, METHOD.HEADER);
      //     sessionStorage.removeItem("prevUrl");
      //     this.openLoginModal(event);
      //   }}
      // >
      //   {DisplayHeading.LOGIN}
      // </NavLink>
    );
  };

  displayProfileInfo = (profileUserName) => {
    const { theme } = this.props;
    return (
      <Button
        id="userDropdown"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={this.handleClick}
        className={`user-button ${theme}`}
        aria-label={`Username: ${profileUserName}`}
      >
        <span className={`user-icon ${theme}`}>
          <AccountCircleIcon />
        </span>
        <span id="simple-menu" className={`user-name ${theme}`}>
          {profileUserName}
        </span>
      </Button>
    );
  };

  //newly added
  logoTastyRewards = () => {
    const { theme } = this.props;
    return (
      <>
        <ListItem className="menu-list-single tasty-logo">
          <a
            className={`menu-link ${theme}`}
            href={tastyRewardsUrl}
            aria-label="tasty rewards"
            onClick={() => {
              SelectedLinkItem(SELECTEDEVENTNAME.NAVIGATION, METHOD.HEADER, {
                itemName: FOOTERLINKS.TASTYREWARDLOGO,
              });
              trackEvent(
                EventNames.Action.ACTION_HEADER_LOGO,
                EventNames.Event.EVENT_BUTTON_PRESS,
                window.location.origin,
                window.location.pathname
              );
            }}
          >
            <img
              src={`${"/www/images/tasty-rewards.png"}`}
              alt={"tasty rewards"}
              className="logo"
              id="tastyRewardLogo"
            />
          </a>
        </ListItem>
      </>
    );
  };

  navigationListTastyRewards = () => {
    const { theme } = this.props;
    return (
      <>
        <ListItem className="menu-list-single tasty-link">
          <a
            className={`menu-link tr-link-item ${theme}`}
            href={`${tastyRewardsUrl}/coupons`}
            aria-label="Coupons"
            onClick={() => {
              SelectedLinkItem(SELECTEDEVENTNAME.NAVIGATION, METHOD.HEADER, {
                itemName: FOOTERLINKS.TRCOUPONS,
              });
              trackEvent(
                EventNames.Action.ACTION_HEADER_COUPONS,
                EventNames.Event.EVENT_BUTTON_PRESS,
                window.location.origin,
                window.location.pathname
              );
            }}
          >
            <img
              src="/www/images/tastyrewards/coupons.svg"
              alt="Coupons"
              className="tasty-icn"
            />
            <img
              src="/www/images/tastyrewards/coupons-hover.svg"
              alt="Coupons hover"
              className="tasty-icn-hover"
            />
            <span className="link-text">Coupons</span>
          </a>
        </ListItem>
        <ListItem className="menu-list-single tasty-link">
          <a
            className={`menu-link tr-link-item ${theme}`}
            href={`${tastyRewardsUrl}/contests`}
            aria-label={"Sweepstakes"}
            onClick={() => {
              SelectedLinkItem(SELECTEDEVENTNAME.NAVIGATION, METHOD.HEADER, {
                itemName: FOOTERLINKS.TRCONTESTS,
              });
              trackEvent(
                EventNames.Action.ACTION_HEADER_CONTESTS,
                EventNames.Event.EVENT_BUTTON_PRESS,
                window.location.origin,
                window.location.pathname
              );
            }}
          >
            <img
              src="/www/images/tastyrewards/sweepstakes.svg"
              alt={"contests"}
              className="tasty-icn"
            />
            <img
              src={"/www/images/tastyrewards/sweepstakes-hover.svg"}
              alt={"contests hover"}
              className="tasty-icn-hover"
            />
            <span className="link-text">{"Sweepstakes & Contests"}</span>
          </a>
        </ListItem>
        <ListItem className="menu-list-single tasty-link">
          <a
            className={`menu-link tr-link-item ${theme}`}
            href={`${tastyRewardsUrl}/recipes`}
            aria-label={"Recipes"}
            onClick={() => {
              SelectedLinkItem(SELECTEDEVENTNAME.NAVIGATION, METHOD.HEADER, {
                itemName: FOOTERLINKS.TRRECIPES,
              });
              trackEvent(
                EventNames.Action.ACTION_HEADER_RECIPES,
                EventNames.Event.EVENT_BUTTON_PRESS,
                window.location.origin,
                window.location.pathname
              );
            }}
          >
            <img
              src="/www/images/tastyrewards/recipes.svg"
              alt={"Recipes"}
              className="tasty-icn"
            />
            <img
              src={"/www/images/tastyrewards/recipes-hover.svg"}
              alt={"Recipes hover"}
              className="tasty-icn-hover"
            />
            <span className="link-text">{"Recipes"}</span>
          </a>
        </ListItem>
      </>
    );
  };

  showLoginModal(events) {
    events.preventDefault();
    let loginClicked = localStorage.getItem("loginClicked");

    if (loginClicked === "checkout") {
      localStorage.setItem("showLogin", 1);
      var event = new CustomEvent("showLogin");
      document.dispatchEvent(event);
      if (document.getElementById("okta-signin-username")) {
        document.getElementById("okta-signin-username").focus();
      }
    } else {
      this.setState({ showLoginModal: true });
      setTimeout(() => {
        document.getElementById("LoginClose") &&
          document.getElementById("LoginClose").focus();
      }, 300);
    }
  }

  navigationGuest = () => {
    const { theme } = this.props;
    return (
      <>
        <ListItem className="menu-list-single">
          <Button
            id="signInBtn"
            aria-label={"Sign In"}
            className={`menu-link tr-signin-btn tr-link-item ${theme}`}
            onClick={(event) => {
              trackEvent(
                EventNames.Action.ACTION_HEADER_LOGIN,
                EventNames.Event.EVENT_BUTTON_PRESS,
                window.location.origin,
                window.location.pathname
              );
              ClickedButton(BUTTONNAME.LOGIN, METHOD.HEADER);
              sessionStorage.removeItem("prevUrl");
              this.showLoginModal(event);
            }}
          >
            {"Sign In"}
          </Button>
        </ListItem>
        <ListItem className="menu-list-single user-list">
          <Button
            className={`menu-link link-btn red tr-signup-btn tr-link-item`}
            onClick={(event) => {
              this.openSignupModal(event);
              ClickedButton(BUTTONNAME.SIGNUP, METHOD.HEADER);
              trackEvent(
                EventNames.Action.ACTION_HEADER_SIGNUP,
                EventNames.Event.EVENT_BUTTON_PRESS,
                window.location.origin,
                window.location.pathname
              );
            }}
          >
            {"Sign up"}
          </Button>
        </ListItem>
      </>
    );
  };

  shopButton = () => {
    return (
      <ListItem
        className="menu-list-single"
        onFocus={() => {
          this.handleClickAway();
        }}
      >
        <NavLink
          // className={`menu-link link-btn blue ${(window.location.pathname === "/productlist" || window.location.pathname === "/shopbycategory" || window.location.pathname === "/varietypack") ? 'inactive' : ''}`}
          className={`menu-link link-btn blue inactive field-last-drawer`}
          to="/home"
          aria-label={"Shop"}
          id="shopHeader"
          onClick={() => {
            trackEvent(
              EventNames.Action.ACTION_HEADER_SHOP,
              EventNames.Event.EVENT_BUTTON_PRESS,
              window.location.origin,
              window.location.pathname
            );
          }}
        >
          {"Shop"}
        </NavLink>
      </ListItem>
    );
  };

  // showJebbitCompanion = () => {
  //   return (function (i, s, o, g, r, a, m) {
  //     i["JebbitObject"] = {};
  //     i[r] =
  //       i[r] ||
  //       function () {
  //         (i[r].q = i[r].q || []).push(arguments);
  //       };
  //     (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
  //     a.async = 1;
  //     a.src = g;
  //     m.parentNode.insertBefore(a, m);
  //   })(
  //     window,
  //     document,
  //     "script",
  //     "https://js.jebbit.com/companion/v1/widget.js",
  //     "jebbit"
  //   );
  //   window.jebbit("init", "dbb6fbf3-f75f-46e9-9d31-0ed1fba5a0bf");
  // };

  handleSearchInput = (event) => {
    event.persist();

    if (isMobileOnly) {
      this.setState({
        isSearchPopupOpen: !this.state.isSearchPopupOpen,
        searchAnchorEl: this.state.isSearchPopupOpen
          ? null
          : event?.currentTarget,
        showSearchInput: !this.state.showSearchInput,
      });
    } else {
      this.setState({
        showSearchInput: !this.state.showSearchInput,
      });
    }
  };

  handleFormChange = (e) => {
    e.persist();

    this.setState({
      [e.target.name]: e.target.value,
      errors: {
        ...this.state.errors,
        [e.target.name]: "",
      },
    });
    if (e.target.name === "searchText" && e?.key === "Enter") {
      this.handleSearch("Enter");
    }
  };

  handleSearchListener = () => {
    if (!this.state.searchText) {
      this.setState({
        showSearchInput: false,
      });
    }
  };

  handleSearch = (key) => {
    this.setGlobal(
      {
        globalSearchText: this.state.searchText,
      },
      () => {
        if (isMobileOnly) {
          if (key !== "Enter") {
            this.closeSearchPopup();
          } else {
            this.setState(
              {
                isSearchPopupOpenOnEnter: true,
              },
              () => {
                this.closeSearchPopup();
              }
            );
          }
        }
      }
    );
    this.props.history.push({
      pathname: ROUTES_URL.PRODUCT_LIST,
    });
  };

  clearSearch = () => {
    this.setState({
      searchText: "",
    });
    if (this.global.globalSearchText) {
      this.setGlobal({
        globalSearchText: null,
        globalSearchClear: true,
      });
    }
  };

  closeSearchPopup = () => {
    this.setState({
      isSearchPopupOpen: false,
      searchAnchorEl: null,
      searchText: "",
      showSearchInput: false,
      isSearchPopupOpenOnEnter: false,
    });
  };

  render() {
    const { classes, customerDetails, isAuthenticated, filterProducts, theme } =
      this.props;

    const {
      showDrawer,
      errorMessage,
      showLoginModal,
      showTRForgotPasswordModal,
      showHybridLoginModal,
      userEmail,
      menuToggle,
      count,
      apiErrorMessage,
      showTRDrawer,
      trProfilePopover,
      showSearchInput,
      searchText,
      mobileMenuAnchorEl,
      selectedMenuIndex,
      isSearchPopupOpen,
      searchAnchorEl,
      // showHolidayShopMenu,
      scrolled,
    } = this.state;

    const profileUserName =
      customerDetails &&
      customerDetails.accountContacts &&
      customerDetails.accountContacts.length > 0
        ? `${customerDetails.accountContacts[0].firstName} ${customerDetails.accountContacts[0].lastName}`
        : "";

    const profileFirstName =
      customerDetails &&
      customerDetails.accountContacts &&
      customerDetails.accountContacts.length > 0
        ? customerDetails.accountContacts[0].firstName
        : "";

    return (
      /* Header Section */
      <>
        {/*<div className="freeShipping">FREE SHIPPING ON ORDERS $15!</div>*/}
        <AppBar
          color="inherit"
          className={
            showDrawer === true
              ? `header ${
                  UrlConstants.isTastyRewards && "header-tr"
                } ${theme} ${scrolled && "scrolled"}  open`
              : `header ${
                  UrlConstants.isTastyRewards && "header-tr"
                } ${theme} ${scrolled && "scrolled"}`
          }
        >
          {this.getIEAlert()}
          <Toolbar className={classes.Toolbar}>
            {UrlConstants.isTastyRewards && (
              <div className="head-tasty-rw">
                <Container className="container-root">
                  <Grid container spacing={0} alignItems="center">
                    <a
                      className="skip-link sr-only sr-only-focusable"
                      href="#mainContain"
                    >
                      {"skip to main content"}
                    </a>
                    <Grid item xs alignItems="center">
                      <nav
                        className="menu-link-wrapper menu-link-web loggedin"
                        aria-label="main header"
                      >
                        <List className="menu-list">
                          {this.logoTastyRewards()}
                          {this.navigationListTastyRewards()}
                        </List>
                        <List className="menu-list tasty-right-list">
                          {!this.props.customerDetails ? (
                            <>{this.navigationGuest()}</>
                          ) : (
                            <ListItem className="menu-list-single">
                              <Button
                                id="TrProfile"
                                aria-label={"Tasty Rewards Profile"}
                                className="menu-link tr-signin-btn"
                                onClick={(event) => {
                                  this.trPopoverOpen(event);
                                }}
                              >
                                Hello, {profileFirstName}!
                              </Button>
                              {trProfilePopover && (
                                <ClickAwayListener
                                  onClickAway={this.trPopoverClose}
                                >
                                  <MenuList className="tr-profile-tooltip">
                                    <MenuItem
                                      className="tr-my-account"
                                      aria-label="profile"
                                    >
                                      <a href={`${tastyRewardsUrl}/my-account`}>
                                        My Account
                                      </a>
                                    </MenuItem>
                                    <MenuItem
                                      className="tr-my-account"
                                      aria-label="profile"
                                    >
                                      <LinkRoute to="changepassword">
                                        Change Password
                                      </LinkRoute>
                                    </MenuItem>
                                    <MenuItem
                                      aria-label="profile"
                                      onClick={(event) => {
                                        this.userLogout(event);
                                      }}
                                    >
                                      Logout
                                    </MenuItem>
                                  </MenuList>
                                </ClickAwayListener>
                              )}
                            </ListItem>
                          )}
                          {/* {this.shopButton()} */}
                          <Dialog
                            open={this.state.showSignup}
                            onClose={() => {
                              // this.setState({ showSignup: false });
                            }}
                            // disableBackdropClick
                            maxWidth={false}
                            scroll={"body"}
                            classes={{
                              paper: "modal-account modal-login modal-paper",
                              root: "modal-stack-top",
                            }}
                            aria-labelledby="signup-dialog-title"
                            TransitionProps={{ role: "presentation" }}
                          >
                            <DialogContent>
                              <Button
                                className="icn-close-account field-first"
                                id="SignupClose"
                                aria-label="Signup Dialog Close"
                                onClick={() => {
                                  this.setState({ showSignup: false });
                                  trackEvent(
                                    EventNames.Action
                                      .ACTION_HEADER_SIGNUP_CLOSE,
                                    EventNames.Event.EVENT_BUTTON_PRESS,
                                    window.location.origin,
                                    window.location.pathname
                                  );
                                }}
                                onBlur={() => {
                                  // this.popupFocusTrap()
                                }}
                              >
                                <CloseIcon />
                              </Button>
                              <SignUp
                                closeSignupDialog={() =>
                                  this.setState({
                                    showSignup: false,
                                  })
                                }
                                showLoginDialog={() =>
                                  this.setState({
                                    showSignup: false,
                                    showLoginModal: true,
                                  })
                                }
                                claimsData={this.state.claimsData}
                                // handleSocialLogin={() => this.getUserDetails()}
                              />
                            </DialogContent>
                          </Dialog>
                          <ListItem className="menu-list-single tasty-menu">
                            <IconButton
                              onClick={() => {
                                this.toggleTRDrawer();
                                setTimeout(() => {
                                  document.querySelector(
                                    ".field-first-drawer"
                                  ) &&
                                    document
                                      .querySelector(".field-first-drawer")
                                      .focus();
                                }, 300);
                                //this.DrawerFocusTrap();
                                trackEvent(
                                  EventNames.Action.ACTION_HEADER_MENU_OPEN,
                                  EventNames.Event.EVENT_BUTTON_PRESS,
                                  window.location.origin,
                                  window.location.pathname
                                );
                              }}
                              className={`menu-link menu-icon menu-icon-tr ${theme}`}
                              id="Menu"
                              aria-label="hamburger Menu"
                            >
                              {showTRDrawer ? <CloseIcon /> : <MenuIcon />}
                            </IconButton>
                          </ListItem>
                        </List>
                        <Drawer
                          anchor="top"
                          role="dialog"
                          open={showTRDrawer}
                          onClick={this.toggleTRDrawer}
                          className="drawer-wrapper"
                          classes={{ paper: "drawer-tr-mobile" }}
                        >
                          <IconButton
                            onClick={this.toggleTRDrawer}
                            className="menu-link menu-icon-close field-first-drawer menu-icon-tr"
                            aria-label="menu icon close"
                            id="drawerClose"
                            onBlur={() => {
                              //this.DrawerFocusTrap();
                            }}
                          >
                            <CloseIcon />
                          </IconButton>
                          <List className="menu-list-tr-mobile menu-link-wrapper">
                            <>
                              {this.logoTastyRewards()}
                              {this.navigationListTastyRewards()}
                              {/* {this.languageButton()} */}
                              {this.props.isAuthenticated ? (
                                <ListItem className="menu-list-single">
                                  <NavLink
                                    className={`menu-link no-active logout ${theme}`}
                                    to="#"
                                    aria-label={DisplayHeading.LOGOUT}
                                    onClick={(event) => {
                                      trackEvent(
                                        EventNames.Action.ACTION_HEADER_LOGOUT,
                                        EventNames.Event.EVENT_BUTTON_PRESS,
                                        window.location.origin,
                                        window.location.pathname
                                      );
                                      this.userLogout(event);
                                    }}
                                  >
                                    {"Logout"}
                                  </NavLink>
                                </ListItem>
                              ) : (
                                <ListItem className="menu-list-single guest-btns">
                                  <ul>{this.navigationGuest()}</ul>
                                </ListItem>
                              )}
                              {/* {this.shopButton()} */}
                            </>
                          </List>
                        </Drawer>
                      </nav>
                    </Grid>
                  </Grid>
                </Container>
              </div>
            )}
            {this.getFreeShippingAlert()}
            <div
              className={
                UrlConstants.isTastyRewards ? `head-snacks ${theme}` : ""
              }
            >
              <Container className="container-root">
                <Grid container spacing={0} alignItems="center">
                  <Link
                    className="skip-link sr-only sr-only-focusable"
                    href={`${window.location.pathname}#mainContain`}
                  >
                    Skip to main content
                  </Link>
                  <Grid item className={"logo-wrapper"}>
                    {UrlConstants.isTastyRewards ? (
                      <MenuItem
                        className={`tr-snacks-menu-btn ${theme}`}
                        onClick={this.toggleDrawer}
                      >
                        Shop
                      </MenuItem>
                    ) : (
                      <IconButton
                        onClick={this.toggleDrawer}
                        className={`menu-link menu-icon ${theme} no-active`}
                        id="Menu"
                        aria-label="Menu"
                      >
                        {showDrawer ? <CloseIcon /> : <MenuIcon />}
                      </IconButton>
                    )}
                  </Grid>
                  {showDrawer && (
                    <MobileSidebar
                      showDrawer={showDrawer}
                      toggleDrawer={() => this.toggleDrawer()}
                      mobileMenuAnchorEl={mobileMenuAnchorEl}
                      NAVIGATION_MENU={this.state.listObj}
                      closeMegaMenuOnClick={() => this.closeMegaMenuOnClick()}
                      openLoginModal={(e) => this.openLoginModal(e)}
                      isAuthenticated={isAuthenticated}
                      profileUserName={profileUserName}
                      displayProfileInfo={this.displayProfileInfo}
                      userLogout={this.userLogout}
                      theme={theme}
                      filterList={this.state.filterData}
                      handleSelectedMobile={this.handleSelectedMobile}
                      getSelectedSubcat={this.getSelectedSubcat}
                      toggleDrawClose={this.drawClose}
                    />
                  )}
                  <Grid item xs>
                    <nav
                      className={`menu-link-wrapper menu-link-web loggedin ${theme}`}
                    >
                      {/* center logo start */}
                      <Button
                        aria-label="Snacks.com Header Logo"
                        onClick={() => {
                          this.props.history.push("/home");
                          this.clearFewSession();
                          SelectedLinkItem(
                            SELECTEDEVENTNAME.NAVIGATION,
                            METHOD.HEADER,
                            {
                              itemName: FOOTERLINKS.LOGO,
                            }
                          );
                          trackEvent(
                            EventNames.Action.ACTION_HEADER_LOGO,
                            EventNames.Event.EVENT_BUTTON_PRESS,
                            window.location.origin,
                            window.location.pathname
                          );
                        }}
                        className={`snacks-header-logo ${
                          UrlConstants.isTastyRewards && "snacks-header-logo-tr"
                        } ${theme}`}
                      >
                        <img
                          src="www/images/HeaderLogo.png"
                          alt={`${DisplayHeading.SITE_NAME} header`}
                          className={`logo ${theme}`}
                          height="30"
                          width="108"
                        />
                      </Button>
                      {/* center logo end */}
                      <List
                        className={`menu-list header-dropdown-list hide-959 ${
                          UrlConstants.isTastyRewards && "snacks-menu-with-tr"
                        }`}
                      >
                        {this.navigationList(
                          this.state.isMegaMenuOpen
                            ? this.state.hovarTitle
                            : " "
                        )}
                      </List>
                      {errorMessage && (
                        <SnacksAlertMessage fullWidth msg={errorMessage} />
                      )}
                      {JSON.parse(this.state.showApiFailAlert) && (
                        <SnacksAlertMessage
                          fullWidth
                          showApiFailAlert={true}
                          targetPageUrl={window.location.pathname}
                          msg={this.state.apiErrorMessage}
                        />
                      )}
                      <List className="menu-list right-list">
                        {/* {this.state.showHolidayShopMenu === "true" &&
                          this.navigationListHoliday()} */}
                        {/* search bar start */}
                        <ListItem
                          className={`menu-list-single search-list ${theme}`}
                        >
                          <NavSearchBar
                            searchText={searchText}
                            handleFormChange={(e) => this.handleFormChange(e)}
                            showSearchInput={showSearchInput}
                            onClose={(e) => this.closeSearchPopup(e)}
                            clearSearch={() => this.clearSearch()}
                            handleSearch={(e) => this.handleSearch(e)}
                            isMobileOnly={isMobileOnly}
                            theme={theme}
                          />
                        </ListItem>
                        {/* search bar end */}

                        {!isAuthenticated && !UrlConstants.isTastyRewards ? (
                          <ListItem
                            className={`menu-list-single login-btn-list ${theme}`}
                          >
                            {this.renderLoginButton()}
                            <ClickAwayListener
                              onClickAway={this.handleClickAway}
                            >
                              <div className="reg-options">
                                {menuToggle ? (
                                  <MenuList>
                                    <MenuItem
                                      aria-label="Create Account"
                                      onClick={() => {
                                        trackEvent(
                                          EventNames.Action
                                            .ACTION_HEADER_CREATE_ACCOUNT,
                                          EventNames.Event.EVENT_BUTTON_PRESS,
                                          window.location.origin,
                                          window.location.pathname
                                        );
                                        ClickedButton(
                                          BUTTONNAME.CREATEACCOUNT,
                                          METHOD.HEADER
                                        );
                                        sessionStorage.setItem(
                                          "prevUrl",
                                          window.location.pathname
                                        );
                                        this.props.history.push(
                                          "/create-account"
                                        );
                                        this.setState({ menuToggle: false });
                                      }}
                                    >
                                      <span>
                                        <AccountCircleIcon />
                                      </span>
                                      Create Account
                                    </MenuItem>
                                  </MenuList>
                                ) : null}
                              </div>
                            </ClickAwayListener>
                          </ListItem>
                        ) : (
                          ""
                        )}

                        {isAuthenticated && !UrlConstants.isTastyRewards ? (
                          <ClickAwayListener onClickAway={this.handleClickAway}>
                            <ListItem
                              className={`menu-list-single user-list ${theme}`}
                            >
                              <div
                                className={
                                  menuToggle
                                    ? `user-list-wrapper open ${theme}`
                                    : "user-list-wrapper"
                                }
                              >
                                {profileUserName &&
                                  this.displayProfileInfo(profileUserName)}
                                {menuToggle ? (
                                  <MenuList>
                                    <MenuItem
                                      aria-label="profile"
                                      onClick={(event) => {
                                        this.props.history.push("/profile");
                                        this.setState({ menuToggle: false });
                                      }}
                                    >
                                      <i>
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="12"
                                          height="9.601"
                                        >
                                          <path
                                            d="M4.2 4.8a2.4 2.4 0 10-2.4-2.4 2.4 2.4 0 002.4 2.4zm1.68.6h-.313a3.264 3.264 0 01-2.734 0H2.52A2.521 2.521 0 000 7.92v.78a.9.9 0 00.9.9h5.155a.9.9 0 01-.049-.4l.128-1.142.023-.208.143-.15 1.453-1.447A2.494 2.494 0 005.88 5.4zm.85 2.725L6.6 9.268a.3.3 0 00.33.33l1.142-.128 2.588-2.585-1.345-1.344zm5.14-3.083l-.711-.711a.449.449 0 00-.634 0l-.709.709-.077.077 1.346 1.344.784-.784a.452.452 0 000-.635z"
                                            fill="#333"
                                          />
                                        </svg>
                                      </i>
                                      My Profile
                                    </MenuItem>
                                    <MenuItem
                                      onClick={(event) => {
                                        this.userLogout(event);
                                        this.setState({ menuToggle: false });
                                      }}
                                    >
                                      <i>
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="8.418"
                                          height="9.621"
                                        >
                                          <path
                                            d="M.9 4.209h.451V2.856a2.856 2.856 0 115.713 0v1.353h.451a.9.9 0 01.9.9v3.61a.9.9 0 01-.9.9H.9a.9.9 0 01-.9-.9V5.111a.9.9 0 01.9-.902zm1.954 0h2.708V2.856a1.353 1.353 0 10-2.706 0z"
                                            fill="#333"
                                          />
                                        </svg>
                                      </i>
                                      Logout
                                    </MenuItem>
                                  </MenuList>
                                ) : null}
                              </div>
                            </ListItem>
                          </ClickAwayListener>
                        ) : (
                          ""
                        )}

                        {isAuthenticated && UrlConstants.isTastyRewards && (
                          <ClickAwayListener onClickAway={this.handleClickAway}>
                            <ListItem
                              className={`menu-list-single user-tr-list ${theme}`}
                            >
                              <div
                                className={
                                  menuToggle
                                    ? "user-tr-list-wrapper open"
                                    : "user-tr-list-wrapper"
                                }
                              >
                                <Button
                                  id="userDropdown"
                                  aria-controls="simple-menu"
                                  aria-haspopup="true"
                                  onClick={this.handleClick}
                                  className="user-button"
                                  aria-label={`Username: ${
                                    profileUserName || ""
                                  }`}
                                >
                                  <span className="user-icon">
                                    <AccountCircleIcon />
                                  </span>
                                </Button>
                                {menuToggle && (
                                  <MenuList>
                                    <i
                                      className="close-btn"
                                      onClick={() => {
                                        this.setState({ menuToggle: false });
                                      }}
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="11.067"
                                        height="11.067"
                                        viewBox="0 0 11.067 11.067"
                                      >
                                        <path
                                          id="times-solid_1_"
                                          data-name="times-solid (1)"
                                          d="M7.631,85.534l3.146-3.146a.989.989,0,0,0,0-1.4l-.7-.7a.989.989,0,0,0-1.4,0L5.534,83.436,2.387,80.29a.989.989,0,0,0-1.4,0l-.7.7a.989.989,0,0,0,0,1.4l3.146,3.146L.29,88.68a.989.989,0,0,0,0,1.4l.7.7a.989.989,0,0,0,1.4,0l3.146-3.146L8.68,90.778a.989.989,0,0,0,1.4,0l.7-.7a.989.989,0,0,0,0-1.4Z"
                                          transform="translate(0 -80)"
                                          fill="#127cbd"
                                        />
                                      </svg>
                                    </i>
                                    <MenuItem aria-label="profile">
                                      <i>
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="42"
                                          height="42"
                                          viewBox="0 0 42 42"
                                        >
                                          <g
                                            id="Group_3988"
                                            data-name="Group 3988"
                                            transform="translate(-1322.5 -140.5)"
                                          >
                                            <path
                                              id="user-circle-solid"
                                              d="M16.5,8A16.5,16.5,0,1,0,33,24.5,16.5,16.5,0,0,0,16.5,8Zm0,6.387a5.855,5.855,0,1,1-5.855,5.855A5.855,5.855,0,0,1,16.5,14.387Zm0,22.888a12.75,12.75,0,0,1-9.747-4.538,7.418,7.418,0,0,1,6.554-3.979,1.628,1.628,0,0,1,.472.073,8.809,8.809,0,0,0,2.721.459,8.776,8.776,0,0,0,2.721-.459,1.628,1.628,0,0,1,.472-.073,7.418,7.418,0,0,1,6.554,3.979A12.75,12.75,0,0,1,16.5,37.275Z"
                                              transform="translate(1326.488 136.488)"
                                              fill="#127cbd"
                                            />
                                            <circle
                                              id="Ellipse_116"
                                              data-name="Ellipse 116"
                                              cx="21"
                                              cy="21"
                                              r="21"
                                              transform="translate(1322.5 140.5)"
                                              fill="none"
                                            />
                                          </g>
                                        </svg>
                                      </i>
                                      <div className="user-profile">
                                        <span className="user-profile-name">
                                          Welcome , {profileUserName}
                                        </span>
                                        <span className="user-profile-email">
                                          {userEmail}
                                        </span>
                                      </div>
                                    </MenuItem>
                                    <MenuItem
                                      aria-label="profile"
                                      onClick={() => {
                                        this.props.history.push(
                                          "/profile?order"
                                        );
                                        this.setState({ menuToggle: false });
                                      }}
                                    >
                                      PREVIOUS ORDERS
                                    </MenuItem>
                                    <MenuItem
                                      aria-label="profile"
                                      onClick={() => {
                                        this.props.history.push("/contactus");
                                        this.setState({ menuToggle: false });
                                      }}
                                    >
                                      CONTACT SNACKS.COM
                                    </MenuItem>
                                  </MenuList>
                                )}
                              </div>
                            </ListItem>
                          </ClickAwayListener>
                        )}

                        {/* cart start */}
                        <ListItem
                          className={`menu-list-single cart-list ${theme}`}
                        >
                          <Tooltip placement="top" title={"cart"}>
                            <span>
                              <Button
                                className={`menu-link cart-icon no-active ${
                                  count > 0 ? "" : "cart-disabled"
                                }`}
                                disabled={count > 0 ? false : true}
                                onClick={() => this.cartZipValidation()}
                                id="cartButton"
                                aria-label={`${count} items in cart`}
                              >
                                <img
                                  src="www/images/redesign/icons/cart.svg"
                                  alt="cart icon"
                                  height="14"
                                  width="20"
                                />
                                {count > 0 && (
                                  <span className={`cart-count ${theme}`}>
                                    {count}
                                  </span>
                                )}
                              </Button>
                            </span>
                          </Tooltip>
                        </ListItem>
                        {/* cart end */}
                      </List>
                    </nav>
                  </Grid>
                </Grid>
                <div className="search-mobile">
                  <NavSearchBar
                    searchText={searchText}
                    handleFormChange={(e) => this.handleFormChange(e)}
                    showSearchInput={showSearchInput}
                    onClose={(e) => this.closeSearchPopup(e)}
                    clearSearch={() => this.clearSearch()}
                    handleSearch={(e) => this.handleSearch(e)}
                    isMobileOnly={isMobileOnly}
                    theme={theme}
                  />
                </div>
              </Container>
            </div>
            {this.state.showLoadingSpinner ? <Spinner /> : ""}
            {UrlConstants.isTastyRewards ? (
              <Dialog
                open={showLoginModal}
                onClose={() => {
                  this.setState({ showLoginModal: false });
                }}
                maxWidth={false}
                scroll={"body"}
                classes={{
                  paper: "modal-tr-container modal-paper modal-login",
                  root: "modal-stack-top modal-tr-top",
                }}
                aria-labelledby="signIn-dialogBox"
              >
                <DialogContent>
                  <TRLogin
                    onClickForgot={() => {
                      this.setState({
                        showLoginModal: false,
                        showTRForgotPasswordModal: true,
                      });
                    }}
                    onClickSignup={() => {
                      this.setState({
                        showLoginModal: false,
                        showSignup: true,
                      });
                    }}
                  />
                  <Button
                    className="icn-close"
                    id="LoginClose"
                    aria-label="Login Dialog Close"
                    onClick={() => {
                      this.setState({ showLoginModal: false });
                    }}
                  >
                    <CloseIcon />
                  </Button>
                </DialogContent>
              </Dialog>
            ) : (
              <Dialog
                open={showLoginModal}
                onClose={() => {
                  this.setState({ showLoginModal: false });
                }}
                maxWidth={false}
                scroll={"body"}
                classes={{
                  paper: "modal-container modal-paper modal-login",
                  root: "modal-stack-top",
                }}
                aria-labelledby="signIn-dialogBox"
              >
                <DialogContent>
                  <Login
                    loginClicked={(response) => this.onLoginSuccess(response)}
                    changeForgotToLogin={() => {}}
                    fromForgot={false}
                    closeLoginDialog={() =>
                      this.setState({
                        showLoginModal: false,
                      })
                    }
                  />
                  <Button
                    className="icn-close"
                    id="LoginClose"
                    aria-label="Login Dialog Close"
                    onClick={() => {
                      this.setState({ showLoginModal: false });
                    }}
                  >
                    <CloseIcon />
                  </Button>
                </DialogContent>
              </Dialog>
            )}
            <Dialog
              open={showTRForgotPasswordModal}
              onClose={() => {
                this.setState({ showTRForgotPasswordModal: false });
              }}
              maxWidth={false}
              scroll={"body"}
              classes={{
                paper: "modal-tr-forgot-container modal-paper modal-login",
                root: "modal-stack-top",
              }}
              aria-labelledby="signIn-dialogBox"
            >
              <DialogContent>
                <TRForgotPassword
                  onSuccess={() => {
                    this.setState({ showTRForgotPasswordModal: false });
                  }}
                  onClickSignUp={() => {
                    this.setState({
                      showTRForgotPasswordModal: false,
                      showSignup: true,
                    });
                  }}
                  onClickLogin={() => {
                    this.setState({
                      showTRForgotPasswordModal: false,
                      showLoginModal: true,
                    });
                  }}
                />
                <Button
                  className="icn-close"
                  id="LoginClose"
                  aria-label="Login Dialog Close"
                  onClick={() => {
                    this.setState({ showTRForgotPasswordModal: false });
                  }}
                >
                  <CloseIcon />
                </Button>
              </DialogContent>
            </Dialog>
            <Dialog
              open={showHybridLoginModal}
              onClose={() => this.hideLoginModal()}
              maxWidth={false}
              scroll={"body"}
              classes={{
                paper:
                  "modal-combined-container modal-paper modal-login is-cart",
                root: "modal-stack-top",
              }}
              aria-labelledby="signIn-dialogBox"
            >
              <DialogContent>
                <CombinedUserLogin
                  changeForgotToLogin={() => {}}
                  fromForgot={false}
                  closeLoginDialog={() => this.hideLoginModal()}
                  userEmail={userEmail}
                />
                <Button
                  className="icn-close"
                  id="LoginClose"
                  aria-label="Login Dialog Close"
                  onClick={() => this.hideLoginModal()}
                >
                  <CloseIcon />
                </Button>
              </DialogContent>
            </Dialog>
          </Toolbar>
        </AppBar>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.reducer.isAuthenticated,
    customerDetails: state.reducer.customerDetails,
    zipResponse: state.reducer.zipResponse,
    validationMessage: state.reducer.validationMessage,
    minPrice: state.reducer.minAmount,
    filterProducts: state.reducer.filterProducts,
    labelListItem: state.reducer.labelListItem,
    navigationData: state.reducer.navigationData,
  };
};

export default connect(mapStateToProps, {
  LogOut,
  actionGetCustomer,
  actionZipcodeVerification,
  actionGetMinAmount,
  SocialLoginAuth,
  LoginAuth,
  actiongetFilterData,
  actionLabelList,
  navigationAPIData,
})(withRouter(withStyles(styles)(withOktaAuth(Header))));
