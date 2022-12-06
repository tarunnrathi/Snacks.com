/**
 *
 * @description Redux reducer : all the cases of redux used in the entier project is defined here.
 */

import * as types from "../actions/actions";

/**
 * @description Initial state / default state value
 * @memberof: reducers
 * @constant products for the products in the application
 * @constant totalProduct for shwoing the initaial value
 * @constant createCustomer for customer detail initaily kept as an empty object.
 */
const initialState = {
  Products: [],
  loginResponse: "",
  isAuthenticated:
    localStorage.getItem("token") !== null &&
    localStorage.getItem("token").length > 0
      ? true
      : false,
  token: "",
  totalProduct: 0,
  customerDetails: undefined,
  createcustomerDetails: undefined,
  createCustomer: {},
  couponData: {},
  faqCategory: {},
  faqQuestions: {},
  removeCouponData: {},
  navigationData: [],
  bannerList: null,
};

const reducer = (state, action) => {
  if (typeof state === "undefined") {
    return initialState;
  }

  switch (action.type) {
    //set state data to initial state and return to action

    case types.PRODUCTS:
      return Object.assign({}, state, {
        Products: action.Products,
        totalProduct: action.totalProduct,
        ispagination: action.ispagination,
      });

    case types.PRODUCTDESCRIPTION:
      return Object.assign({}, state, {
        productdetails: action.productdetails,
      });

    case types.FILTERVALUES:
      return Object.assign({}, state, {
        filterProducts: action.filterProducts,
      });

    case types.ZIPCODE:
      return Object.assign({}, state, {
        zipResponse: action.zipResponse,
        validationMessage: action.validationMessage,
      });
    case types.LABEL_LIST:
      return Object.assign({}, state, {
        labelList: action.labelList,
      });
    case types.LABELLISTITEM:
      return Object.assign({}, state, {
        labelListItem: action.labelListItem,
      });
    case types.CREATECUSTOMER:
      return Object.assign({}, state, {
        createCustomer: action.createCustomer,
      });
    case types.MIN_AMOUNT:
      return Object.assign({}, state, {
        minAmount: action.minAmount,
      });
    case types.PRODUCT_AVAILABILITY:
      return Object.assign({}, state, {
        productInventory: action.productInventory,
      });
    case types.CONTENT_PRIVACY_POLICY:
      return Object.assign({}, state, {
        privacyPolicy: action.privacyPolicy,
      });
    case types.CONTACTUS:
      return Object.assign({}, state, {
        contactResponse: action.contactResponse,
      });
    case types.LOGIN:
      return Object.assign({}, state, {
        loginResponse: action.loginResponse,
        token: action.loginResponse.sessionToken,
        isAuthenticated: true,
      });
    case types.SOCIAL_LOGIN:
      return Object.assign({}, state, {
        loginResponse: "",
        token: "",
        isAuthenticated: true,
      });
    case types.LOGOUT:
      return Object.assign({}, state, {
        loginResponse: "",
        token: "",
        isAuthenticated: false,
        customerDetails: undefined,
      });
    case types.CUSTOMERDETAILS:
      return Object.assign({}, state, {
        customerDetails: action.customerDetails,
      });
    case types.CREATECUSTOMERDETAILS:
      return Object.assign({}, state, {
        createcustomerDetails: action.createcustomerDetails,
      });
    case types.ORDERHISTORY:
      return Object.assign({}, state, {
        orderHistory: action.orderHistory,
        validationMessage: action.validationMessage,
      });
    // case types.LOCATION_ID:
    //   return Object.assign({}, state, {
    //     locationDetail: action.locationDetail,
    //   });
    case types.COUPONCODE:
      return Object.assign({}, state, {
        couponData: action.couponData,
      });
    case types.FAQ_CATEGORY:
      return Object.assign({}, state, {
        faqCategory: action.faqCategory,
      });
    case types.FAQ_QUESTION:
      return Object.assign({}, state, {
        faqQuestions: action.faqQuestions,
      });
    case types.REMOVECOUPONCODE:
      return Object.assign({}, state, {
        removeCouponData: action.couponData,
        couponData: {},
      });

    case types.NAVIGATION_API_DATA:
      return Object.assign({}, state, {
        navigationData: action.navigationData,
      });
    
    case types.PLP_FILTERS_API_DATA:
      return Object.assign({}, state, {
        plpFiltersData: action.plpFiltersData,
      });

    case types.BANNER_LIST:
      return Object.assign({}, state, {
        bannerList: action.bannerList,
      });
    default:
      // need this for default case
      return state;
  }
};
export default reducer;
