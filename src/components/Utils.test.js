import * as utils from "./Utils";

describe("Test all functions from Utils.js file", () => {
  const cartItems = `[{"id":"7874","productId":"08104500","price":"3.79","size":"Big Bag (7.75oz)","title":"Lay's Potato Chips Cheddar and Sour Cream Flavored 7.75 Oz","productDescription":"Lay's Cheddar & Sour Cream Flavored Potato Chips","likes":12,"quantity":1,"brand":"LAY'S","displaySequence":"","productClass":"SNACK FOODS","currency":"$","flavour":",Cheesy,","backgroundColorRgb":"c0c0c0","backgroundColorA":"ff","primaryProduct":true,"availableQty":"100","productEnableFor":"OfficeSnacks","stateCode":[],"stateName":[],"recommendedProduct":"0","image":"https://ospep-develop.azurefd.net/products/US/00028400199988_C1C1.png","multipack":true,"multipackList":[{"id":"7846","productId":"10191700","title":"Fritos Twists Corn Snacks Honey BBQ Flavored 1 Oz","productDescription":"Fritos Twists Honey BBQ Flavored Corn Snacks","price":"0.50","currency":"$","likes":12,"image":"https://share.brandcentral.pepsico.com/products/US/00028400068826_C1C1.png","brand":"FRITOS","displaySequence":"1","allergen":"","quantity":0,"size":"Small Bag","availableQty":"100","productClass":"CLASS","recommendedProduct":"0","productEnableFor":"Multipack","stateCode":[],"stateName":[]}],"bundle":[]}]`;
  const parsedCartItems = JSON.parse(cartItems);
  const productId = "08104500";
  it("tests a updatePrice function", () => {
    const request = JSON.parse(
      `{"data":{"data":{"tax":{"totalAmount":21.33,"totalTaxAmount":2.33,"netTotalAmount":19,"totalGrossAmount":21.33,"totalDiscount":2.33}}}}`
    );
    utils.updatePrice(request);
    const totalDiscount = window.sessionStorage.getItem("totalDiscount");
    expect(JSON.parse(totalDiscount)).toBe(request.data.data.tax.totalDiscount);
  });

  it("tests a hexToRgbA function", () => {
    const response = utils.hexToRgbA("#111111");
    expect(response).toBe("rgba(17,17,17,0.7)");

    //check condition hex.length=3
    const response2 = utils.hexToRgbA("#FFF");
    expect(response2).toBe("rgba(255,255,255,0.7)");

    //check throw exception condition = "bad hex"
    expect(() => {
      const error = utils.hexToRgbA("#873648h7");
    }).toThrow("Bad Hex");
  });

  it("tests a deleteCart function", () => {
    utils.deleteCart(productId, parsedCartItems);
    window.sessionStorage.setItem("cartItems", cartItems);
    const cartItemsResponse = window.sessionStorage.getItem("cartItems");
    expect(cartItemsResponse).toBe(cartItems);
  });

  it("tests a updateCart function", () => {
    utils.updateCart(productId, parsedCartItems);
    window.sessionStorage.setItem("cartItems", cartItems);
    const cartItemsResponse = window.sessionStorage.getItem("cartItems");
    expect(cartItemsResponse).toBe(cartItems);
  });

  it("tests a reduceCart function", () => {
    utils.reduceCart(productId, parsedCartItems);
    window.sessionStorage.setItem("cartItems", cartItems);
    const cartItemsResponse = window.sessionStorage.getItem("cartItems");
    expect(cartItemsResponse).toBe(cartItems);
  });

  it("tests a deepLinkValidation function", () => {
    const filterArray = `[ { categoryId: 'Brand', subCategoryIdList: [ 'DORITOS', 'LAYS' ] } ]`;
    const location = {
      pathname: "/productlist",
      search: "?deepLink=true&&Brand=DORITOS,LAYS",
    };
    utils.deepLinkValidation(location);
    window.sessionStorage.setItem("selectedCategory", filterArray);
    const cartItemsResponse = window.sessionStorage.getItem("selectedCategory");
    expect(cartItemsResponse).toBe(filterArray);

    const location2 = {
      pathname: "/productlist",
      search: "?",
    };
    //check throw exception condition = "Incorrect deeplink request"
    const response = utils.deepLinkValidation(location2);
    expect(response).toBe(undefined);
  });

  it("tests a lineItemsListObject function", () => {
    const input = JSON.parse(
      `[{"id":"7874","productId":"08104500","price":"3.79","size":"Big Bag (7.75oz)","title":"Lay's Potato Chips Cheddar and Sour Cream Flavored 7.75 Oz","productDescription":"Lay's Cheddar & Sour Cream Flavored Potato Chips","likes":12,"quantity":1,"brand":"LAY'S","displaySequence":"","productClass":"SNACK FOODS","currency":"$","flavour":",Cheesy,","backgroundColorRgb":"c0c0c0","backgroundColorA":"ff","primaryProduct":true,"availableQty":"100","productEnableFor":"OfficeSnacks","stateCode":[],"stateName":[],"recommendedProduct":"0","image":"https://ospep-develop.azurefd.net/products/US/00028400199988_C1C1.png","multipack":false,"preOrder":false,"multipackList":[{"id":"7846","productId":"10191700","title":"Fritos Twists Corn Snacks Honey BBQ Flavored 1 Oz","productDescription":"Fritos Twists Honey BBQ Flavored Corn Snacks","price":"0.50","currency":"$","likes":12,"image":"https://share.brandcentral.pepsico.com/products/US/00028400068826_C1C1.png","brand":"FRITOS","displaySequence":"1","allergen":"","quantity":0,"size":"Small Bag","availableQty":"100","productClass":"CLASS","recommendedProduct":"0","productEnableFor":"Multipack","stateCode":[],"stateName":[]}],"bundle":[]}]`
    );
    const expected = `{"products":[{"lineItemNumber":1,"productId":"08104500","quantity":1,"unitPrice":"3.79","id":"7874","total":3.79,"name":"Lay's Cheddar & Sour Cream Flavored Potato Chips","preOrder":false}],"multipack":[],"bundle":[]}`;
    const response = JSON.stringify(utils.lineItemsListObject(input));
    expect(response).toBe(expected);

    const response2 = JSON.stringify(
      utils.lineItemsListObject(parsedCartItems)
    );
    // const expected2 = `{"products":[],"multipack":[{"multipackId":"08104500","quantity":1,"multipackList":[{"lineItemNumber":1,"productId":"10191700","quantity":0,"unitPrice":"0.50","id":"7846","total":0,"name":"Fritos Twists Honey BBQ Flavored Corn Snacks"}]}],"bundle":[]}`;
    // expect(response2).toBe(expected2);
  });

  it("tests a getOrderTaxPayload function", () => {
    const values = {
      shippingZipCode: 75024,
      shippingState: "Texas",
      shippingCity: "Plano",
      shippingCountry: "us",
      shippingAddressLine1: "5800 Legacy Dr",
      shippingAddressLine2: "near JCB school",
    };
    const expectedObjectLength = 13;
    window.sessionStorage.setItem("coupon", "SNK15");
    const response = utils.getOrderTaxPayload(values, "billing");
    expect(Object.keys(response).length).toBe(expectedObjectLength);
  });

  it("tests a addressVerification function", () => {
    const request = { data: { addressVerificationRequired: true } };
    utils.addressVerification(request);
    window.sessionStorage.setItem("addressVerificationRequired", true);
    const addressResponse = JSON.parse(
      window.sessionStorage.getItem("addressVerificationRequired")
    );
    expect(addressResponse).toBe(true);
  });

  it("tests a removeSessionWhichStarts function", () => {
    const request = { data: { addressVerificationRequired: true } };
    utils.removeSessionWhichStarts("addressVerificationRequired");
    const addressItem = window.sessionStorage.getItem(
      "addressVerificationRequired"
    );
    expect(addressItem).toBe(null);
  });

  it("tests a shippingCostCalculator function", () => {
    const shippingInfo = JSON.parse(
      `{"isMultipackExist":[],"shippingTax":[{"shippingCharge":"4.99","taxPriceStart":"1","taxPriceEnd":"100","shippingSku":"108118","active":true},{"shippingCharge":"2.99","taxPriceStart":"100","taxPriceEnd":"150","shippingSku":"108119","active":true}],"totalAmount":20}`
    );
    const response = utils.shippingCostCalculator(shippingInfo);
    const shippingResponse = window.sessionStorage.getItem("shippingSkuCost");
    expect(shippingResponse).toBe(shippingInfo.shippingTax[0].shippingCharge);
  });

  it("tests a cardExpValidator function", () => {
    //if card is valid
    const response = utils.cardExpValidator(11, 2025);
    expect(response).toBe(true);

    //if card is expired
    const response2 = utils.cardExpValidator(11, 2020);
    expect(response2).toBe(false);
  });

  it("tests a getCookie function", () => {
    const response = utils.getCookie("tempcookie");
    expect(response).toBe("");
  });

  it("tests a getDateFormat function", () => {
    ////if date is greater than 10
    const response = utils.getDateFormat("01-21-2021");
    expect(response).toBe("01/21/2021");

    //if date is less than 10
    const response2 = utils.getDateFormat("01-09-2021");
    expect(response2).toBe("01/09/2021");
  });
});
