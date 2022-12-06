import React from "react";
import { shallow } from "enzyme";
import * as SnacksAmplitude from "./SnacksAmplitude";
import UrlConstants from "./../UrlConstants";

const defaultParam = {
  LanguagePreference: "en",
  Version: UrlConstants.BuildVersion,
  DomainName: "US site",
};

const productInfo = {
  ...defaultParam,
  ProductId: "10965500",
  ProductSize: "Small Bag",
  ProductPrice: "0.65",
  PageTitle: "VarietyPack",
  Quantity: 20,
  Method: "Increment",
  ProductName: "Doritos Tortilla Chips Cool Ranch",
};

const genericInfo = {
  ...defaultParam,
  orderId: 2131233424,
  totalPrice: 20,
  orderType: "web",
  totalQty: 5,
  PageTitle: "VarietyPack",
  subCategory: "",
  category: "",
  itemName: "",
  productId: "10965500",
  displaySequence: "",
  mixId: 12323,
  qty: 20,
  name: "Doritos Tortilla Chips Cool Ranch",
  msg: "",
  type: "",
  status: 200,
  paymentMsg: "Payment is successfull",
  cartId: 1621939583667,
  Method: "ProductTile",
};

describe("Amplitude functions", () => {
  it("ViewedPage", () => {
    SnacksAmplitude.ViewedPage("ThankYou", genericInfo);
  });

  it("SelectedLinkItem", () => {
    SnacksAmplitude.SelectedLinkItem("NavigationLink", genericInfo);
  });

  it("SelectedSubCategory", () => {
    SnacksAmplitude.SelectedSubCategory("Brand", genericInfo);
  });

  it("SearchEvent", () => {
    SnacksAmplitude.SearchEvent("doritos", "", genericInfo);
  });

  it("ClickedButton", () => {
    SnacksAmplitude.ClickedButton("ClickedButton", "", genericInfo);
  });

  it("ClickedBanner", () => {
    SnacksAmplitude.ClickedBanner("SHOP", "HomePage", "vertical");
  });

  it("UserInfo", () => {
    SnacksAmplitude.UserInfo("8a7f598573094ca801733235bc200049");
  });

  it("ProductListFilters", () => {
    SnacksAmplitude.ProductListFilters({ Brand: "Doritos" });
  });

  it("AddRemoveProductToCart", () => {
    SnacksAmplitude.AddRemoveProductToCart(productInfo);
  });

  it("RevenueData", () => {
    SnacksAmplitude.RevenueData(genericInfo);
  });

  it("PurchaseCartItems", () => {
    SnacksAmplitude.PurchaseCartItems("3123213123", genericInfo);
  });

  it("AddressHandling", () => {
    SnacksAmplitude.AddressHandling(genericInfo);
  });

  it("APIERROR", () => {
    let error = {
      error: "Error: Network Error",
      config: {
        url: "https://snackapp-admin-develop.azurefd.net/services/labelslist?locationNumber=12199",
      },
      response: "",
    };
    SnacksAmplitude.APIERROR(error);
  });

  it("PaymentHandling", () => {
    SnacksAmplitude.PaymentHandling(genericInfo);
  });
});
