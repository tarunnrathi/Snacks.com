import APIUtil from "../../../config/APIUtil";
import UrlConstants from "../../../config/UrlConstants";
import validateAPIResponse from "./ApiHelper";

const checkMCProductAvailability = (payload) => {
  return APIUtil.postMethod(
    UrlConstants.checkItemAvailability,
    payload,
    true
  ).then((response) => {
    if (validateAPIResponse(response)) {
      sessionStorage.setItem(
        "alternateOrderLocationId",
        response.data.data.alternateOrderLocationId ||
          sessionStorage.getItem("_lo_No")
      );
      sessionStorage.setItem(
        "alternateMultipackLocationId",
        response.data.data.alternateMultipackLocationId ||
          sessionStorage.getItem("_lo_No")
      );
      return response;
    }
  });
};

export default checkMCProductAvailability;
