import OktaAuth from "@okta/okta-auth-js";
import config from "./../oktaconfig";

class OktaApiUtil {
  oktaAuth = new OktaAuth(config.oidc);
  userLogin(email, password) {
    const prevUrl = sessionStorage.getItem("prevUrl");
    if (
      window.location.pathname !== "/create-account" &&
      (prevUrl === null || prevUrl !== "/cart-preview")
    ) {
      if (!(prevUrl && prevUrl.includes("varietypack")))
        sessionStorage.setItem("prevUrl", window.location.pathname);
    }
    return this.oktaAuth
      .signIn({ username: email, password: password })
      .then((response) => response)
      .catch((error) => {
        if (error.message) {
          if (error.message === "Invalid token.") {
            const res = this.getToken();
            if (res.tokens !== undefined) {
              this.userLogin(email, password);
            }
          } else {
            return error.message;
          }
        } else {
          return { status: "404" };
        }
      });
  }

  getToken(authCode) {
    return this.oktaAuth.token
      .parseFromUrl({
        grantType: "authorization_code",
        code: authCode,
      })
      .then((res) => {
        // manage token or tokens
        var tokens = res.tokens;
        this.oktaAuth.tokenManager.add("idToken", tokens.idToken);
        this.oktaAuth.tokenManager.add("accessToken", tokens.accessToken);
        localStorage.setItem("idToken", JSON.stringify(tokens.idToken));
        localStorage.setItem("accessToken", JSON.stringify(tokens.accessToken));
        return res;
      })
      .catch((err) => {
        return err;
      });
  }

  async renewToken() {
    if (localStorage.getItem("accessToken")) {
      const accessTokenObject = await JSON.parse(
        localStorage.getItem("accessToken")
      ).accessToken;
      var tokenToRenew = {
        accessToken: accessTokenObject,
        scopes: config.oidc.scopes,
      };

      return this.oktaAuth.token
        .renew(tokenToRenew)
        .then(function (freshToken) {
          localStorage.setItem("accessToken", JSON.stringify(freshToken));
          this.oktaAuth.tokenManager.add("accessToken", freshToken);
          return freshToken;
        })
        .catch(function (err) {
          // handle OAuthError
          if (this.oktaAuth !== null) {
            this.oktaAuth.tokenManager.remove("accessToken");
            this.oktaAuth.tokenManager.remove("idToken");
          }
          localStorage.removeItem("token");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("idToken");
          localStorage.removeItem("user");
          return null;
        });
    } else {
      if (this.oktaAuth !== null) {
        this.oktaAuth.tokenManager.remove("accessToken");
        this.oktaAuth.tokenManager.remove("idToken");
      }
      localStorage.removeItem("token");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("idToken");
      localStorage.removeItem("user");
    }
  }

  async userLogout() {
    if (localStorage.getItem("idToken")) {
      const idTokenObject = await JSON.parse(localStorage.getItem("idToken"));

      return this.oktaAuth
        .signOut({
          idToken: idTokenObject,
          postLogoutRedirectUri: `${window.location.origin}/home`,
        })
        .then((res) => {
          if (this.oktaAuth !== null) {
            this.oktaAuth.tokenManager.remove("accessToken");
            this.oktaAuth.tokenManager.remove("idToken");
          }
          localStorage.removeItem("token");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("idToken");
          localStorage.removeItem("user");
          localStorage.removeItem("code");

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
          return res;
        })
        .catch((error) => {
          if (error.message) {
            return { status: "404", message: error.message };
          } else {
            return { status: "404", message: error };
          }
        });
    }
  }
}
export default new OktaApiUtil();
