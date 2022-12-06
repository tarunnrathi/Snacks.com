import * as types from "./actions";
import APIUtil from "./../config/APIUtil";
import UrlConstants from "./../config/UrlConstants";
import config from "./../oktaconfig";
import { UserInfo } from "../config/amplitude/SnacksAmplitude";
import { sanitizeString } from "../components/Utils";
import validateAPIResponse from "../components/ApiHelper";

export function actiongetProduct(data) {
  if (!!data && data.limit > 0) {
    let url = UrlConstants.ProductsUrl;
    return function (dispatch) {
      return APIUtil.postMethod(url, data, true).then((response) => {
        let products = response.data ? response.data : "";
        if (response.status === 200) {
          dispatch({
            type: types.PRODUCTS,
            Products: products,
            totalProduct: products.totalProducts,
          });
        } else {
          dispatch({
            type: types.PRODUCTS,
            Products: [],
            totalProduct: 0,
          });
        }
        return products;
      });
    };
  }
}

export function actiongetProductDetail(payload) {
  let url = UrlConstants.ProductDetailUrl;
  return function (dispatch) {
    return APIUtil.postMethod(url, payload, true).then((response) => {
      let products = response.data.data;
      products = [].concat(products);

      if (response.status === 200) {
        dispatch({
          type: types.PRODUCTDETAILS,
          Products: products,
        });
      } else {
        dispatch({
          type: types.PRODUCTDETAILS,
          Products: [],
        });
      }
      return products;
    });
  };
}

export function actiongetBundleDetail(payload) {
  let url = UrlConstants.BundleDetailUrl;
  return function (dispatch) {
    return APIUtil.postMethod(url, payload, true).then((response) => {
      let products = response.data.data;
      products = [].concat(products);

      if (response.status === 200) {
        dispatch({
          type: types.PRODUCTDETAILS,
          Products: products,
        });
      } else {
        dispatch({
          type: types.PRODUCTDETAILS,
          Products: [],
        });
      }
      return products;
    });
  };
}

export function actiongetFilter() {
  let url = UrlConstants.FilterProducts;
  return function (dispatch) {
    return APIUtil.getMethod(url, true, false).then((response) => {
      if (response.status === 200) {
        dispatch({
          type: types.FILTERVALUES,
          filterProducts: response.data.data,
        });
      } else {
        dispatch({
          type: types.FILTERVALUES,
        });
      }
      return "";
    });
  };
}

export function actionZipcodeVerification(values) {
  let postData = {
    zipcode: values.zipcode,
  };
  let url = UrlConstants.ZipValidation;
  return function (dispatch) {
    return APIUtil.postMethod(url, postData, true).then((response) => {
      if (response.status === 200) {
        dispatch({
          type: types.ZIPCODE,
          zipResponse: response,
        });
      } else {
        dispatch({
          type: types.ZIPCODE,
          zipResponse: "",
        });
      }
    });
  };
}

export function actionLabelList() {
  let url = `${UrlConstants.LabelsList}?locationNumber=${
    localStorage.getItem("_lo_No") || sessionStorage.getItem("_lo_No")
  }`;

  return function (dispatch) {
    return APIUtil.getMethod(url, true, true).then((response) => {
      if (response.status === 200) {
        dispatch({
          type: types.LABELLISTITEM,
          labelListItem: response.data.data,
        });
      } else {
        dispatch({
          type: types.LABELLISTITEM,
          labelListItem: "",
        });
      }
    });
  };
}

export function actionCreateCustomer(
  fields,
  isGuest,
  isForFormSubmit,
  contact
) {
  let customerPostData = {
    guestCheckout: isGuest,
    customer: {
      customerfirstname: sanitizeString(fields.firstname),
      customerlastname: sanitizeString(fields.lastname),
      customeremail: sanitizeString(fields.email),
      login: sanitizeString(fields.email),
      customercompany: "",
      customerstreet: "",
      customercountry: "",
      customerstate: "",
      customercity: "",
      customerzip: fields.shippingZipCode,
      customerPhone1: fields.contact,
      source: UrlConstants.isTastyRewards ? "TastyRewardsUS" : "Snacks.com",
      sourceID: UrlConstants.isTastyRewards
        ? "US_SNACKS_SHOPTRWEB_DYNAMIC_20220224"
        : "US_SNACKS_SNACKSWEB_DYNAMIC_20220224",
    },
  };

  if (localStorage.getItem("accountId") !== null) {
    let customerData = {
      ...customerPostData.customer,
      id: isForFormSubmit
        ? localStorage.getItem("accountId")
        : localStorage.getItem("contactId"),
      accountId: localStorage.getItem("accountId"),
    };

    customerPostData = {
      ...customerPostData,
      customer: customerData,
    };

    if (isForFormSubmit) {
      let shipData = {
        ...customerPostData,

        shipping: {
          shippingFirstname: sanitizeString(fields.shippingFirstname),
          shippingLastname: sanitizeString(fields.shippingLastname),
          shippingAddressLine1: fields.shippingAddressLine1,
          shippingAddressLine2: fields.shippingAddressLine2,
          shippingCountry: fields.shippingCountry,
          shippingState: fields.shippingState,
          shippingCity: fields.shippingCity,
          shippingZipCode: fields.shippingZipCode,
        },
      };

      customerPostData = {
        ...shipData,
      };
    }
  }

  return function (dispatch) {
    let url = UrlConstants.CreateAddress;
    if (localStorage.getItem("accountId") !== null) {
      if (isForFormSubmit) {
        return APIUtil.putMethod(url, customerPostData, true).then(
          (response) => {
            if (response.showApiFailAlert) return response; //when API throws error
            if (response.status === 200) {
              dispatch({
                type: types.CREATECUSTOMER,
                createCustomer: response.data,
              });
            } else {
              dispatch({
                type: types.CREATECUSTOMER,
                createCustomer: "",
              });
            }
          }
        );
      } else {
        let payload = customerPostData;
        if (contact) {
          payload = {
            ...customerPostData,
            customer: {
              ...customerPostData.customer,
              ...contact,
              sourceID: UrlConstants.isTastyRewards
                ? "US_SNACKS_SHOPTRWEB_DYNAMIC_20220224"
                : "US_SNACKS_SNACKSWEB_DYNAMIC_20220224",
            },
          };
        }
        let url = UrlConstants.updateAccount;
        return APIUtil.postMethod(url, payload, true).then((response) => {
          if (response.showApiFailAlert) return response; //when API throws error
          if (response.status === 200) {
            dispatch({
              type: types.CREATECUSTOMER,
              createCustomer: response.data,
            });
          } else {
            dispatch({
              type: types.CREATECUSTOMER,
              createCustomer: "",
            });
          }
        });
      }
    } else {
      let url = UrlConstants.CreateCustomer;
      return APIUtil.postMethod(url, customerPostData, true).then(
        (response) => {
          if (response.showApiFailAlert) return response; //when API throws error
          if (response.status === 200) {
            dispatch({
              type: types.CREATECUSTOMER,
              createCustomer: response.data,
            });
          } else {
            dispatch({
              type: types.CREATECUSTOMER,
              createCustomer: "",
            });
          }
        }
      );
    }
  };
}

export function actiongetFilterData() {
  let url = UrlConstants.FilterProducts;
  const postData = {
    locationNumber:
      sessionStorage.getItem("alternateOrderLocationId") ||
      sessionStorage.getItem("_lo_No") ||
      localStorage.getItem("_lo_No"),
  };
  return function (dispatch) {
    return APIUtil.postMethod(url, postData, true).then((response) => {
      if (response.status === 200) {
        dispatch({
          type: types.FILTERVALUES,
          filterProducts: response.data.data,
        });
      } else {
        dispatch({
          type: types.FILTERVALUES,
        });
      }
      return "";
    });
  };
}

export function actionGetMinAmount() {
  let url = UrlConstants.MinAmount;
  return function (dispatch) {
    return APIUtil.getMethod(url, true, false).then((response) => {
      if (response.status === 200) {
        let configData = response.data.data;
        sessionStorage.setItem("IsTRSyncEnabled", configData.IsTRSyncEnabled);
        sessionStorage.setItem(
          "holidayShopEnable",
          (configData && configData.displayMerchandiseItems) || false
        );
        sessionStorage.setItem(
          "contactSupportForCustomAddress",
          configData && configData.addressSuggestionCancelMsg
        );
        sessionStorage.setItem(
          "flavorDropShopPimId",
          configData && configData.flavorDropShopPimId
        );
        sessionStorage.setItem(
          "enableTangyPickleGiveAwayMessage",
          configData && configData.enableTangyPickleGiveAwayMessage
        );
        sessionStorage.setItem(
          "googlePayButtonEnable",
          configData && configData.googlePayButtonEnable
        );
        sessionStorage.setItem(
          "applePayButtonEnable",
          configData && configData.applePayButtonEnable
        );
        sessionStorage.setItem(
          "freeShipping",
          configData && configData.freeShipping
        );
        if (
          config.oidc.logoutUrl === undefined ||
          config.oidc.logoutUrl === null ||
          config.oidc.logoutUrl.length === 0
        ) {
          config.oidc = {
            ...config.oidc,
            logoutUrl: configData.oktaLogoutUrl,
            revokeTokenUrl: configData.oktaRevokeAccessUrl,
          };
        }
        dispatch({
          type: types.MIN_AMOUNT,
          minAmount: response.data.data,
        });
      } else {
        dispatch({
          type: types.MIN_AMOUNT,
          minAmount: {},
        });
      }
    });
  };
}

export function actionCheckProductAvailability(postData) {
  let url = UrlConstants.ProductInventory;
  return function (dispatch) {
    return APIUtil.postMethod(url, postData, true).then((response) => {
      if (response.status === 200) {
        dispatch({
          type: types.PRODUCT_AVAILABILITY,
          productInventory: response.data.data,
        });
      } else {
        dispatch({
          type: types.PRODUCT_AVAILABILITY,
          productInventory: {},
        });
      }
    });
  };
}

export function actionContentListPrivacyPolicy(postData) {
  let url = UrlConstants.contentList;
  return function (dispatch) {
    return APIUtil.postMethod(url, postData, true).then((response) => {
      if (response.status === 200) {
        dispatch({
          type: types.CONTENT_PRIVACY_POLICY,
          privacyPolicy: response.data,
        });
      } else {
        dispatch({
          type: types.CONTENT_PRIVACY_POLICY,
          privacyPolicy: {},
        });
      }
    });
  };
}

export function actionContactUs(postData) {
  let url = UrlConstants.contactus;
  return function (dispatch) {
    return APIUtil.postMethod(url, postData, true).then((response) => {
      if (response.status === 200) {
        dispatch({
          type: types.CONTACTUS,
          contactResponse: response,
        });
      } else {
        dispatch({
          type: types.CONTACTUS,
          contactResponse: {},
        });
      }
    });
  };
}

export function actionGetCustomer() {
  let url = UrlConstants.GetCustomer;
  return function (dispatch) {
    if (localStorage.getItem("accessToken")) {
      return APIUtil.getMethod(url, true, true).then((response) => {
        let res = response.data;
        if (!!res && !!res.message && res.message === "Expired token") {
          localStorage.clear();
          dispatch({
            type: types.LOGOUT,
          });
        } else if (response.status === 200 && res.success) {
          const custData =
            response.data && response.data.data
              ? response.data.data
              : response.data;
          custData.accountAddresses.forEach((address, i) => {
            if (address.addressType === "PROFILE_ADDRESS") {
              custData.accountAddresses.splice(i, 1);
            }
          });
          dispatch({
            type: types.CUSTOMERDETAILS,
            customerDetails: custData,
          });

          response.data && response.data.data
            ? UserInfo(response.data.data.accountUsers[0].id)
            : UserInfo(response.data.accountUsers[0].id);
        } else {
          dispatch({
            type: types.CUSTOMERDETAILS,
            customerDetails: null,
          });
        }
        return "";
      });
    } else {
      /* dispatch({
				type: types.CUSTOMERDETAILS,
				customerDetails: null,
			}); */
      localStorage.removeItem("token");
      localStorage.removeItem("idToken");
      localStorage.removeItem("user");
      dispatch({
        type: types.LOGOUT,
      });
    }
  };
}

export function actionCreateProfile(data) {
  let url = UrlConstants.CreateProfile;
  data.sourceID = UrlConstants.isTastyRewards
    ? "US_SNACKS_SHOPTRWEB_DYNAMIC_20220224"
    : "US_SNACKS_SNACKSWEB_DYNAMIC_20220224";
  return function (dispatch) {
    return APIUtil.postMethod(url, data, true).then((response) => {
      dispatch({
        type: types.CREATECUSTOMERDETAILS,
        createcustomerDetails: response.data,
      });
      return "";
    });
  };
}

export function LoginAuth(response) {
  return function (dispatch) {
    if (response !== null && response.status === "SUCCESS") {
      dispatch({
        type: types.LOGIN,
        loginResponse: response,
      });
    } /*  else {
			dispatch({
				type: types.LOGIN,
			});
		} */
  };
}

/**
 *
 * @description action performed for login.
  @response {} postData : For getting the login response value.
 * @let url: For setting the RacksUrl .
 * @returns login credential response 
 * 
 */
export function SocialLoginAuth(response) {
  return function (dispatch) {
    if (response.code !== null) {
      dispatch({
        type: types.SOCIAL_LOGIN,
        loginResponse: response,
      });
    } /*  else {
        dispatch({
          type: types.LOGIN,
        });
      } */
  };
}

export function LogOut() {
  return function (dispatch) {
    //if (response !== null && response.status === 200) {
    dispatch({
      type: types.LOGOUT,
    });
    //}
  };
}

export function fetchOrderDetails(fliterValue) {
  let url = UrlConstants.OrderHistory;
  const jwtAccessToken = localStorage.getItem("accessToken");
  const payload = {
    loggedinUserJwt: JSON.parse(jwtAccessToken).accessToken || "",
    filterBy: fliterValue,
  };
  return function (dispatch) {
    return APIUtil.postMethod(url, payload, true).then((response) => {
      if (response.status === 200) {
        dispatch({
          type: types.ORDERHISTORY,
          orderHistory: response.data.data,
        });
      } else {
        dispatch({
          type: types.ORDERHISTORY,
          orderHistory: { message: "Some Error Occured" },
        });
      }
    });
  };
}

export function actionCouponCode(data) {
  let url = UrlConstants.CouponCode;
  return function (dispatch) {
    return APIUtil.postMethod(url, data, true).then((response) => {
      let res = response.data;
      if (response.status === 200 && res.success) {
        dispatch({
          type: types.COUPONCODE,
          couponData: response.data.data,
        });
      } else {
        dispatch({
          type: types.COUPONCODE,
          couponData: response.data,
        });
      }
      return "";
    });
  };
}

export function actionFaqCategory() {
  let url = UrlConstants.FaqCategory;
  return function (dispatch) {
    return APIUtil.getMethod(url, true, false).then((response) => {
      if (response.status === 200) {
        dispatch({
          type: types.FAQ_CATEGORY,
          faqCategory: response.data,
        });
      } else {
        dispatch({
          type: types.FAQ_CATEGORY,
          faqCategory: {},
        });
      }
    });
  };
}

export function actionFaqQuestions(id) {
  let url = UrlConstants.FaqQuestions;
  const payload = {
    categoryId: id,
  };
  return function (dispatch) {
    return APIUtil.postMethod(url, payload, true).then((response) => {
      if (response.status === 200) {
        dispatch({
          type: types.FAQ_QUESTION,
          faqQuestions: response.data,
        });
      } else {
        dispatch({
          type: types.FAQ_QUESTION,
          faqQuestions: {},
        });
      }
    });
  };
}

export function actionRemoveCouponCode(data) {
  let url = UrlConstants.RemovecouponCode;
  return function (dispatch) {
    return APIUtil.postMethod(url, data, true).then((response) => {
      let res = response.data;
      if (response.status === 200 && res.success) {
        dispatch({
          type: types.REMOVECOUPONCODE,
          removeCouponData: response.data.data,
        });
      } else {
        dispatch({
          type: types.REMOVECOUPONCODE,
          removeCouponData: response.data,
        });
      }
      return "";
    });
  };
}

export function navigationAPIData() {
  return function (dispatch) {
    return APIUtil.getMethod(
      `${UrlConstants.categoryfilters}`,
      true,
      localStorage.getItem("_lo_No") || sessionStorage.getItem("_lo_No")
    ).then((response) => {
      if (validateAPIResponse(response)) {
        if (response.data && response.data.data.length > 0) {
          let newArr = response.data.data.sort((a, b) => a.menuSeq - b.menuSeq);

          dispatch({
            type: types.NAVIGATION_API_DATA,
            navigationData: newArr,
          });
        }
      }
    });
  };
}

export function actionGetBannerList() {
  return function (dispatch) {
    return APIUtil.getMethod(
      `${UrlConstants.bannerlist}`,
      true,
      localStorage.getItem("_lo_No") || sessionStorage.getItem("_lo_No")
    ).then((response) => {
      if (validateAPIResponse(response)) {
        if (response.data && response.data.data) {
          dispatch({
            type: types.BANNER_LIST,
            bannerList: response.data.data,
          });
        }
      }
    });
  };
}

export function actionGetPlpFiltersAPIData() {
  return function (dispatch) {
    return APIUtil.getMethod(
      `${UrlConstants.plpFiltersList}`,
      true,
      localStorage.getItem("_lo_No") || sessionStorage.getItem("_lo_No")
    ).then((response) => {
      console.log('response', response);
      if (validateAPIResponse(response)) {
        if (response.data && response.data.data.length > 0) {
          dispatch({
            type: types.PLP_FILTERS_API_DATA,
            plpFiltersData: response.data.data,
          });
        }
      }
    });
  };
}