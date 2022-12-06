import { getAppInsights } from "../TelemetryService";

let appInsights = null;

export const EventNames = {
  Action: {
    ACTION_CANCEL_CREATE_ACCOUNT: "cancel create account",
    ACTION_CREATE_ACCOUNT: "create account",
    ACTION_ADD_ZIPCODE: "add zip code",
    ACTION_UPDATE_ZIPCODE: "update zip code",
    ACTION_ADD_TO_CART: "add to cart",
    ACTION_PRIVACY_POLICY: "privacy policy",
    ACTION_TERMS: "terms & conditions",
    ACTION_GET_STARTED: "get started",
    ACTION_HEADER_ADD_TO_CART: "header add to cart",
    ACTION_HEADER_LOGIN: "login from header",
    ACTION_HEADER_LOGO: "header logo",
    ACTION_HEADER_CREATE_ACCOUNT: "header create account",
    ACTION_HEADER_HOME: "header home",
    ACTION_HEADER_PRODUCTS: "header products",
    ACTION_HEADER_LOGOUT: "header logout",
    ACTION_HEADER_PROFILE: "header profile",
    ACTION_FILTER_BRAND: "filter brand",
    ACTION_FILTER_SIZE: "filter size",
    ACTION_CLEAR_FILTER: "clear filter",
    ACTION_PRODUCT_DETAILS: "product details",
    ACTION_CLEAR_CART: "clear cart",
    ACTION_CART_ON_CHECKOUT: "cart on checkout",
    ACTION_KEEP_SHOPPING: "keep shopping",
    ACTION_LOGIN: "login",
    ACTION_FORGOT_PASSWORD: "forgot password",
    ACTION_ADD_SHIPPING_ADDRESS: "add shipping address",
    ACTION_ADD_BILLING_ADDRESS: "add billing address",
    ACTION_REMOVE_ADDRESS: "remove address",
    ACTION_UPDATE_CUSTOMER: "update customer",
    ACTION_UPDATE_SHIPPING_ADDRESS: "update shipping address",
    ACTION_UPDATE_BILLING_ADDRESS: "update billing address",
    ACTION_CHECKOUT: "checkout",
    ACTION_PAYMENT_SUCCESS: "payment success",
    ACTION_PAYMENT_FAILURE: "payment fail",
    ACTION_THANK_YOU: "thank you done",
    ACTION_TAB_PROFILE: "profile tab",
    ACTION_TAB_ORDER_HISTORY: "order history tab",
    ACTION_TAB_CHANGE_PASSWORD: "change password tab",
    ACTION_CHANGE_PASSWORD: "change passoword",
    ACTION_ORDER_HISTORY_FILTER: "order history filter",
    ACTION_LOGIN_POPUP: "login popup",
    ACTION_ZIP_CODE_POPUP: "zip code popup",
    ACTION_SHOW_EVERYTHING: "show everything",
    ACTION_SHOW_PREVIOUS_ORDERS: "show previous orders",
    ACTION_REPLACE_ORDER: "replace order in cart",
    ACTION_EDIT_CART: "edit cart",
    ACTION_CHECKOUT_LOGIN: "login from checkout",
    ACTION_PRODUCT_MAX_WARN: "max product qty warning",
    ACTION_PRODUCT_INCREASE_CART: "increase product qty",
    ACTION_PRODUCT_DECREASE_CART: "decrease product qty",
    ACTION_PRODUCT_DELETE_CART: "remove product from cart",
    ACTION_FAQ_YES: "faq yes",
    ACTION_FAQ_NO: "faq no",
    ACTION_HOLIDAYSHOP_PAGE: "merchandise page",
    ACTION_HOLIDAYSHOP_PRODUCT_DETAIL: "merchandise product detail",
    ACTION_HOLIDAYSHOP_PRODUCT_SEARCH: "merchandise product search",
    ACTION_MULTIPACK_PRODUCT: "variety pack page",
    ACTION_MULTIPACK_PRODUCT_DETAIL: "variety pack product detail",
    ACTION_MULTIPACK_PRODUCT_SEARCH: "variety pack product search",
    ACTION_CHECKOUT_SHIPPING_ADDRESS_SUCCESS:
      "shipping address validation success",
    ACTION_CHECKOUT_SHIPPING_ADDRESS_POPUP: "shipping address validation popup",
    ACTION_CHECKOUT_SHIPPING_ADDRESS_FAIL: "shipping address validation fail",
    ACTION_CHECKOUT_BILLING_ADDRESS_SUCCESS:
      "billing address validation success",
    ACTION_CHECKOUT_BILLING_ADDRESS_FAIL: "billing address validation fail",
    ACTION_FLAVOR_DROPSHOP: "flavor drop shop",
    ACTION_TWISTED_LIME: "Twisted Lime",
  },
  Event: {
    EVENT_BUTTON_PRESS: "Button Click",
    EVENT_CHECK_CHANGE: "Checkbox Change",
    EVENT_PAGE_VIEW: "View Screen",
    EVENT_PAYMENT_CALLBACK: "Payment Callback",
    EVENT_DROPDOWN_CHANGE: "Select Change",
    EVENT_FAVORITE_SNACKS: "Favorite Snacks",
  },
};

export const trackEvent = (
  eventName,
  eventValue,
  originName,
  screenName,
  other
) => {
  if (appInsights === null) appInsights = getAppInsights();
  if (appInsights !== null)
    appInsights.trackEvent(
      { name: eventName },
      {
        ...other,
        origin: originName,
        screen:
          screenName.length > 0
            ? screenName.substring(1, screenName.length)
            : screenName,
        action: eventValue,
      }
    );
};

export const trackScreenView = (screenName, url) => {
  if (appInsights === null) appInsights = getAppInsights();
  if (appInsights !== null) {
    if (url.length > 0) appInsights.trackPageView({ name: screenName }, url);
    else appInsights.trackPageView({ name: screenName });
  }
};

export const trackScreenDuration = (screenName, url, isForStart) => {
  if (appInsights === null) appInsights = getAppInsights();
  if (appInsights !== null) {
    if (isForStart) appInsights.startTrackPage(screenName);
    else appInsights.stopTrackPage(screenName, url);
  }
};
