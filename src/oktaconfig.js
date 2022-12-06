import UrlConstants from "./config/UrlConstants";

let ISSUER = "https://consumer-pepsico.okta.com/oauth2/ausfpgwi1k5ngnirB4x6";
let GOOGLE_IDP = "0oa5vgwghdnb3FYSs4x7";

let CLIENT_ID = UrlConstants.isTastyRewards ? "0oa5eulhfnlg2H6Xf4x7" : "0oafpg33jCj968rKt4x6";

if (
  window.location.hostname !== "shop.tastyrewards.com" &&
  window.location.hostname !== "shop-tastyrewards-us.azurefd.net" &&
  window.location.hostname !== "www.snacks.com"
) {
  ISSUER =
    "https://consumer-pepsico.oktapreview.com/oauth2/ausrloxoabq9JEmaf0h7";
    GOOGLE_IDP = "0oa13dkpjom8fnFm70h8";
    CLIENT_ID = UrlConstants.isTastyRewards ? "0oa12sonjxu9XuAmY0h8" : "0oas4x8e3qo3mcvoz0h7";
}

let oktaScopes = ["openid", "profile", "email"];
if (UrlConstants.isTastyRewards) {
  oktaScopes.push("TastyRewards");
}

export default {
  oidc: {
    issuer: ISSUER,
    clientId: CLIENT_ID,
    googleIDP: GOOGLE_IDP,
    redirectUri: window.location.origin + "/implicit/callback",
    postLogoutRedirectUri: window.location.origin + "/home",
    scopes: oktaScopes,
    //pkce: true,
    //disableHttpsCheck: OKTA_TESTING_DISABLEHTTPSCHECK,
    tokenManager: {
      autoRenew: false,
    },
    onSessionExpired: function () {
      //this.oktaAuth.tokenManager.remove('accessToken');
      //this.oktaAuth.tokenManager.remove('idToken');
      localStorage.removeItem("code");
      localStorage.removeItem("token");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("idToken");
      localStorage.removeItem("user");
      window.location.assign("/home");
    },
    logoutUrl: "",
    revokeTokenUrl: "",
  },
};
