import OktaApiUtil from "../config/OktaApiUtil";
import qs from "query-string";
/* 
import { useOktaAuth } from '@okta/okta-react';
import React, { useEffect } from 'react'; */

const LoginCallback = () => {
  let params = qs.parse(window.location.search);
  let code = params ? params.code : "";
  if (code) {
    // localStorage.setItem("code", code);
    OktaApiUtil.getToken(code).then(() => {
      const prevUrl = sessionStorage.getItem("prevUrl");
      if (prevUrl) {
        if (prevUrl === "/checkout" || prevUrl === "/cart-preview") {
          sessionStorage.removeItem("isPayment");
          window.location.assign("/checkout");
        } else if (prevUrl === "/cart") {
          window.location.assign("/cart");
        } else if (
          prevUrl === "/varietypack" ||
          prevUrl === "/varietypack?mymix"
        ) {
          window.location.assign(prevUrl);
        } else if (prevUrl === "/productlist") {
          window.location.assign("/productlist");
        } else if (prevUrl === "/flaminhot") {
          window.location.assign("/flaminhot");
        } else {
          window.location.assign("/home");
        }
      } else {
        window.location.assign("/home");
      }
    });
  } else {
    window.location.href = "/home";
  }
  return "";
};
export default LoginCallback;
