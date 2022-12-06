import amplitude from "amplitude-js";
import * as ConfigAmplitude from "./ConfigAmplitude";

const genericInfo = {
  qty: 20,
  name: "Doritos Tortilla Chips Cool Ranch",
  productId: "10965500",
};

describe("ConfigAmplitude functions", () => {
  it("initAmplitude", () => {
    ConfigAmplitude.initAmplitude();
  });

  it("setAmplitudeUserId", () => {
    ConfigAmplitude.setAmplitudeUserId("8a7f598573094ca801733235bc200049");
  });

  it("regenerateAmplitudeDeviceId", () => {
    ConfigAmplitude.regenerateAmplitudeDeviceId();
  });

  it("setCustomUserId", () => {
    ConfigAmplitude.setCustomUserId("8a7f598573094ca801733235bc200049");
  });

  it("setAmplitudeUserProperties", () => {
    ConfigAmplitude.setAmplitudeUserProperties();
  });

  it("sendAmplitudeData", () => {
    ConfigAmplitude.sendAmplitudeData("Viewed_VarietyPack", {
      LanguagePreference: "en",
      Version: "Snacks.com-US-3.6.8",
      DomainName: "US site",
      PageTitle: "VarietyPack",
      OrderId: "",
      TotalPrice: "",
      OrderType: "",
      TotalQty: "",
      CartId: "1621939583667",
    });
  });

  it("logRevenueData", () => {
    ConfigAmplitude.logRevenueData(genericInfo);
  });
});
