import jwt_decode from "jwt-decode";
import qs from "query-string";
import config from "../oktaconfig";
import OktaAuth from "@okta/okta-auth-js";

/* 
import { useOktaAuth } from '@okta/okta-react';
import React, { useEffect } from 'react'; */

const GoogleLoginCallback = () => {
  let params = qs.parse(window.location.search);
  let code = params ? params.code : "";
  let oktaAuth = new OktaAuth(config.oidc);
  oktaAuth.token
    .getWithPopup({
      responseType: "code",
      scopes: config.oidc.scopes,
      // or array of types
    })
    .then((res) => {
      var tokens = res.tokens;
      let claims = tokens.idToken.claims;
      let decode_token = jwt_decode(res.tokens.accessToken.value);
      localStorage.setItem("token", "Bearer " + res.tokens.accessToken.value);
      let accountId = decode_token.accountId;
      if (accountId) {
        oktaAuth.tokenManager.add("idToken", res.tokens.idToken);
        oktaAuth.tokenManager.add("accessToken", res.tokens.accessToken);
        localStorage.setItem("idToken", JSON.stringify(res.tokens.idToken));
        localStorage.setItem(
          "accessToken",
          JSON.stringify(res.tokens.accessToken)
        );
        localStorage.setItem("okta-token-storage", JSON.stringify(res.tokens));
        localStorage.setItem("isRefresh", true);
      } else {
        sessionStorage.setItem("claimsData", JSON.stringify(claims));
        oktaAuth.tokenManager.add("idToken", res.tokens.idToken);
        oktaAuth.tokenManager.add("accessToken", res.tokens.accessToken);
        localStorage.setItem("idToken", JSON.stringify(res.tokens.idToken));
        localStorage.setItem(
          "accessToken",
          JSON.stringify(res.tokens.accessToken)
        );
        localStorage.setItem("okta-token-storage", JSON.stringify(res.tokens));
      }
      window.location.assign("/home?src=social");
    })
    .catch((err) => {
      console.log("=====err====", err);
    });
  return "";
};
export default GoogleLoginCallback;
