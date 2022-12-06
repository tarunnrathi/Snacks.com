import CustomEvent from "custom-event";
import { APIERROR } from "../config/amplitude/SnacksAmplitude";

const validateAPIResponse = (apiResponse) => {
  // console.log("in validateAPIResponse()", apiResponse);
  if (apiResponse.showApiFailAlert) {
    sessionStorage.setItem("isApiFailed", true);
    let errorMessage = apiResponse.error.toString();
    //console.log("isApiFailed = "+sessionStorage.getItem('isApiFailed'));
    APIERROR(apiResponse);
    var event = new CustomEvent("showApiFailAlert");
    document.dispatchEvent(event);
    //if(apiResponse.error) console.log(apiResponse.error);
    return false;
  }
  return true;
};

export default validateAPIResponse;
