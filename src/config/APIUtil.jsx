import Axios from "axios";
import UrlConstants from "./UrlConstants";
var accessToken = !!localStorage.getItem("accessToken")
  ? JSON.parse(localStorage.getItem("accessToken")).accessToken
  : "";
var headersSet = {
  Accept: "application/json",
  "Content-Type": "application/json",
};
class APIUtil {
  checAPIData() {
    sessionStorage.setItem("isApiFailed", false);
    if (
      !!sessionStorage.getItem("_ss_i") &&
      !!sessionStorage.getItem("_rr_n_dts") &&
      !!sessionStorage.getItem("_en_cs")
    ) {
      return true;
    } else {
      window.location.hash = "#404";
      // window.location.reload();
    }
  }

  externalAPI(url, auth) {
    const apicheck = this.checAPIData();
    if (apicheck) {
      if (auth) {
        headersSet["sessionId"] = sessionStorage.getItem("_ss_i");
        headersSet["rnduts"] = sessionStorage.getItem("_rr_n_dts");
        headersSet["encstr"] = sessionStorage.getItem("_en_cs");
      }
      return Axios({
        method: "get",
        url: url,
        headers: headersSet,
      })
        .then((response) => response)
        .catch((error) => {
          if (error.response.statusText === "Forbidden") {
            this.locationReload();
          } else if (error.response) {
            return error.response;
          } else {
            return { status: "404" };
          }
        });
    }
  }

  getMethod(url, auth, val) {
    const apicheck = this.checAPIData();
    if (apicheck) {
      if (auth) {
        //headersSet['Authorization']  = accessToken;
        headersSet["sessionId"] = sessionStorage.getItem("_ss_i");
        headersSet["rnduts"] = sessionStorage.getItem("_rr_n_dts");
        headersSet["encstr"] = sessionStorage.getItem("_en_cs");
        headersSet["X-Auth-Token"] = accessToken;
        headersSet["location"] = val;
      }

      return Axios({
        method: "get",
        url: url,
        headers: headersSet,
      })
        .then((response) => response)
        .catch((error) => {
          return { showApiFailAlert: true, error: error };
        });
    }
  }

  inValidToken() {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("usertype");
    window.location.href = UrlConstants.SiteUrl + "login";
    window.location.reload();
  }

  postAPIKeyMethod(url, data, auth) {
    return Axios({
      method: "post",
      url: url,
      headers: headersSet,
      data: data,
    })
      .then((response) => response)
      .catch((error) => {
        return { showApiFailAlert: true, error: error };
      });
  }

  postMethod(url, data, auth) {
    const apicheck = this.checAPIData();
    if (apicheck) {
      if (auth) {
        headersSet["sessionId"] = sessionStorage.getItem("_ss_i");
        headersSet["rnduts"] = sessionStorage.getItem("_rr_n_dts");
        headersSet["encstr"] = sessionStorage.getItem("_en_cs");
        headersSet["X-Auth-Token"] = accessToken;
      }

      return Axios({
        method: "post",
        url: url,
        headers: headersSet,
        data: data,
      })
        .then((response) => response)
        .catch((error) => {
          return { showApiFailAlert: true, error: error };
        });
    }
  }

  locationReload() {
    sessionStorage.removeItem("_ss_i");
    sessionStorage.removeItem("_rr_n_dts");
    sessionStorage.removeItem("_en_cs");
    window.location.reload();
  }

  putMethod(url, data, auth) {
    const apicheck = this.checAPIData();
    if (apicheck) {
      var headersSet = {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-api-key": UrlConstants.PimAPIKey,
      };
      if (auth) {
        headersSet["sessionId"] = sessionStorage.getItem("_ss_i");
        headersSet["rnduts"] = sessionStorage.getItem("_rr_n_dts");
        headersSet["encstr"] = sessionStorage.getItem("_en_cs");
        headersSet["X-Auth-Token"] = accessToken;
      }

      return Axios({
        method: "PUT",
        url: url,
        headers: headersSet,
        data: data,
      })
        .then((response) => response)
        .catch((error) => {
          return { showApiFailAlert: true, error: error };
        });
    }
  }

  deleteMethod(url, auth, data) {
    const apicheck = this.checAPIData();
    if (apicheck) {
      if (auth) {
        headersSet["sessionId"] = sessionStorage.getItem("_ss_i");
        headersSet["rnduts"] = sessionStorage.getItem("_rr_n_dts");
        headersSet["encstr"] = sessionStorage.getItem("_en_cs");
        headersSet["X-Auth-Token"] = accessToken;
      }

      return Axios({
        method: "DELETE",
        url: url,
        data: data ? data : null,
        headers: headersSet,
      })
        .then((response) => response)
        .catch((error) => {
          if (error.response.statusText === "Forbidden") {
            this.locationReload();
          } else if (error.response) {
            if (error.response.data === "Invalid token.") {
              this.inValidToken();
            } else {
              return error.response;
            }
          } else {
            return { status: "404" };
          }
        });
    }
  }

  postFormDataMethod(url, data, auth) {
    const apicheck = this.checAPIData();
    if (apicheck) {
      var headersSet = {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      };
      if (auth) {
        //var accessToken = sessionStorage.getItem("token");
        //headersSet['Authorization']  = accessToken;
        headersSet["sessionId"] = sessionStorage.getItem("_ss_i");
        headersSet["rnduts"] = sessionStorage.getItem("_rr_n_dts");
        headersSet["encstr"] = sessionStorage.getItem("_en_cs");
      }

      return Axios({
        method: "post",
        url: url,
        headers: headersSet,
        data: data,
      })
        .then((response) => response)
        .catch((error) => {
          if (error.response.statusText === "Forbidden") {
            this.locationReload();
          } else if (error.response) {
            if (error.response.data === "Invalid token.") {
              this.inValidToken();
            } else {
              return error.response;
            }
          } else {
            return { status: "404" };
          }
        });
    }
  }
}
export default new APIUtil();
