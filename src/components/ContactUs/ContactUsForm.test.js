import React from "react";
import { shallow } from "enzyme";
import ContactUs from "./ContactUsForm";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("ContactUs component", () => {
  let wrapper;
  const reducer = {
    contactResponse: { success: "200" },
  };
  const store = mockStore({ reducer });

  let returnData = {
    success: true,
    taxFree: false,
    taxSuccess: true,
    taxErrorMessage: "",
    zipSuccess: true,
    zipErrorMessage: "",
    addressSuccess: false,
    candidateFound: false,
    addressErrorMessage: "",
    addressVerificationRequired: false,
    data: {
      address: {
        success: true,
        message: null,
        http_code: 200,
        data: {
          XAVResponse: {
            Response: { ResponseStatus: { Code: "1", Description: "Success" } },
            ValidAddressIndicator: "",
            Candidate: {
              AddressKeyFormat: {
                AddressLine: "205 W SERVICE RD",
                PoliticalDivision2: "CHAMPLAIN",
                PoliticalDivision1: "NY",
                PostcodePrimaryLow: "12919",
                PostcodeExtendedLow: "4443",
                Region: "CHAMPLAIN NY 12919-4443",
                CountryCode: "US",
              },
            },
          },
        },
      },
      tax: {
        saleMessage: "QUOTATION",
        lineItems: [
          {
            product: { productClass: "SNACK FOODS", value: "0028400183826" },
            quantity: 6,
            unitPrice: 3.29,
            totalTax: 0,
            extendedPrice: 19.74,
            fairMarketValue: 19.74,
            lineItemNumber: 1,
            taxes: [
              {
                jurisdiction: { jurisdictionLevel: "STATE", value: "NEW YORK" },
                calculatedTax: 0,
                effectiveRate: 0,
                taxable: 0,
                taxRuleId: "13504",
                taxResult: "NONTAXABLE",
                taxType: "SELLER_USE",
              },
              {
                jurisdiction: { jurisdictionLevel: "COUNTY", value: "CLINTON" },
                calculatedTax: 0,
                effectiveRate: 0,
                taxable: 0,
                taxRuleId: "149755",
                taxResult: "NONTAXABLE",
                taxType: "SELLER_USE",
              },
            ],
          },
          {
            product: {
              productClass: "SHIPPING DESTINATION",
              value: "00028400480369",
            },
            quantity: 1,
            unitPrice: 4.99,
            totalTax: 0,
            extendedPrice: 4.99,
            fairMarketValue: 4.99,
            lineItemNumber: 2,
            taxes: [
              {
                jurisdiction: { jurisdictionLevel: "STATE", value: "NEW YORK" },
                calculatedTax: 0,
                effectiveRate: 0,
                taxable: 0,
                taxRuleId: "452185",
                taxResult: "NONTAXABLE",
                taxType: "SELLER_USE",
              },
              {
                jurisdiction: { jurisdictionLevel: "COUNTY", value: "CLINTON" },
                calculatedTax: 0,
                effectiveRate: 0,
                taxable: 0,
                taxRuleId: "149755",
                taxResult: "NONTAXABLE",
                taxType: "SELLER_USE",
              },
            ],
          },
        ],
        totalGrossAmount: 19.740000000000002,
        netTotalAmount: 19.740000000000002,
        totalTaxAmount: 0,
        transactionType: "SALE",
        totalDiscount: 0,
        totalAmount: "19.74",
      },
    },
  };
  const ab = { contactUsSubject: "324 primeavanue, tx" };
  const props = {
    actionGetMinAmount: jest
      .fn()
      .mockImplementation(() => Promise.resolve({ data: { success: true } })),
  };
  wrapper = shallow(
    <ContactUs.WrappedComponent contactSub={ab} {...props} store={store} />
  );

  it("renders ContactUs components without crashing", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("test nameCheck function", () => {
    let e = { target: { value: "John_" } };
    wrapper.instance().nameCheck(e, jest.fn());
    e = { target: { value: "" } };
    wrapper.instance().nameCheck(e, jest.fn());
  });

  it("test orderNumberCheck function", () => {
    let e = { target: { value: "1224323" } };
    wrapper.instance().orderNumberCheck(e, jest.fn());
    e = { target: { value: "323$ff" } };
    wrapper.instance().orderNumberCheck(e, jest.fn());
  });

  it("test contactCheck function", () => {
    let e = { target: { value: "22030" } };
    wrapper.instance().contactCheck(e, jest.fn());
    e = { target: { value: "" } };
    wrapper.instance().contactCheck(e, jest.fn());
    //with zipcode.length <= 10
    e = { target: { value: "220z#dh" } };
    wrapper.instance().contactCheck(e, jest.fn());
    //when zipcode.length > 10
    e = { target: { value: "12123243234" } };
    wrapper.instance().contactCheck(e, jest.fn());
  });

  it("test checkFormInput function", () => {
    document.body.innerHTML = `
    <form autoComplete="on" id="startContactUs" name="form1">
      <select name="subject" id="outlined-subject-native">
        <option value="General Inquiry" selected="selected">General Inquiry</option>
        <option value="Order Status">Order Status</option>
        <option value="Order Issue">Order Issue</option>
        <option value="Technical Support">Technical Support</option>
        <option value="Login/Sign Up Issues">Login/Sign Up Issues</option>
      </select>
      <input type="text" name="firstname" id="firstname" value="name1" />
      <input type="email" name="email" id="email" value="name1.test@gmail.com" />
      <select name="countryCode" id="countryCode">
        <option value="+1" selected="selected">+1</option>
      </select>
      <input type="text" name="contact" id="contact" value="3423423423" />
      <input type="text" name="orderId" id="orderId" />
      <textarea id="description" name="description" rows="4"></textarea>
    </form>
  `;
    wrapper.instance().checkFormInput();
  });
});
