import React from "react";
import { shallow } from "enzyme";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import Home from "./Home";
import APIUtil from "./../../../config/APIUtil";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const reducer = { minAmount: 15 };
const store = mockStore({ reducer });

describe("Home component", () => {
  window.localStorage.setItem("loginClicked", "checkout");
  const div = window.document.createElement("div");
  div.setAttribute("id", "body");
  window.document.body.appendChild(div);

  APIUtil.getMethod = jest.fn().mockImplementation(() =>
    Promise.resolve({
      data: {
        success: true,
        message: "",
        data: {
          Home: [
            {
              sectionName: "Shop By Category",
              textColor: "White",
              buttonText: "GET STARTED",
              filterLink: "/shopbycategory",
              sectionDescription:
                "Looking for a specific flavor? Got a movie night or cookout coming up? We\u2019ll take you step by step to find the right snacks for what you need, then save your order so next time everything will be ready to go. No fuss, just fun!",
              filterImage: "/www/images/shop-by-category.png",
              timeInterval: 7000,
            },
            {
              sectionName: "View All Snacks",
              textColor: "White",
              buttonText: "SHOP NOW",
              filterLink: "/productlist",
              sectionDescription:
                "Just jump in. All your favs(even the hard-to-find ones) are waiting. And who knows, maybe you\u0027ll find some new favs while you\u0027re at it.",
              filterImage: "/www/images/explore-all-snacks.png",
              timeInterval: 7000,
            },
          ],
          Messages: [
            {
              sectionName: "Order Confirmation",
              textColor: null,
              buttonText: null,
              filterLink: null,
              sectionDescription:
                "A confirmation email has been sent to the email provided.\nYou will receive your order in 4-5 business days.",
              filterImage: null,
              timeInterval: 7000,
            },
            {
              sectionName: "Thank You",
              textColor: null,
              buttonText: null,
              filterLink: null,
              sectionDescription: "Thank you for shopping with Frito Lay!",
              filterImage: null,
              timeInterval: 7000,
            },
            {
              sectionName: "Covid",
              textColor: null,
              buttonText: null,
              filterLink: null,
              sectionDescription:
                "Note: We are currently experiencing shipping delays due to COVID-19. All orders are processed in the order that they are received, and we are doing our best to ship all orders on time. Thank you for your patience.",
              filterImage: null,
              timeInterval: 7000,
            },
            {
              sectionName: "contactUsEmail",
              textColor: null,
              buttonText: null,
              filterLink: null,
              sectionDescription: "customersupport@fritolay.com",
              filterImage: null,
              timeInterval: 7000,
            },
          ],
          authHome: [
            {
              sectionName: "Flaming Hot",
              textColor: "White",
              buttonText: "Shop Flamin\u0027 Hot Snacks",
              filterLink: null,
              sectionDescription: null,
              filterImage:
                "https://share.snacks.com/images/flamin-hot-banner.png",
              timeInterval: 7000,
            },
            {
              sectionName: "show previous orders",
              textColor: null,
              buttonText: "CHECK IT OUT",
              filterLink: "/profile?order",
              sectionDescription:
                "No need to shop from scratch, re-order any of your past purchases!",
              filterImage: null,
              timeInterval: 7000,
            },
            {
              sectionName: "shop by category",
              textColor: null,
              buttonText: "GET STARTED",
              filterLink: "/shopbycategory",
              sectionDescription:
                "We\u2019ll take you step by step to help you find the right flavors for any occasion!",
              filterImage: null,
              timeInterval: 7000,
            },
          ],
        },
      },
    })
  );
  const responseData = {
    success: true,
    data: {
      minimumOrderAmount: "15",
      shippingCharges: "0",
      inventoryFlag: "true",
      contactUsToEmail: "FLNADTCsupport@pepsico.com",
      fritoLayLogo:
        "https://osstgaccount.blob.core.windows.net/share/images/logo.png",
      fritoLayAdress: "7701 Legacy Drive, Plano, TX 75024",
      fritoLayPhone: "+1 281-232-2363",
      frintoLayFrontend: "https://snacks.com",
      taxFlag: "true",
      contactUsSubject:
        " General Inquiry, Order Status, Order Issue, Technical Support, Login/SignUp Issues ",
      shippingImage:
        "https://osstgaccount.blob.core.windows.net/share/images/step-2.png",
      instrumentationKey: "5d55d161-4411-4f69-b440-acc12095fd76",
      maxShippingAddress: "5",
      shippingLimitMessage:
        "Maximum 5 shipping addresses. Please update an existing address.",
      covidOrderMessage:
        "Note: We are currently experiencing shipping delays due to COVID-19. All orders are processed in the order that they are received, and we are doing our best to ship all orders on time. Thank you for your patience.",
      mesgDisplayTimeout: "10000",
      oktaRevokeAccessUrl: "https://secure.snacks.com/oauth2/default/v1/revoke",
      oktaLogoutUrl: "https://secure.snacks.com/oauth2/default/v1/logout",
      createAccountEmailImage:
        "https://share.snacks.com/images/welcome_image.png",
      defaultZipCode: "75024",
      contactUsMsg:
        "Answers to most questions or concerns can be found by selecting a topic of interest.",
      displayVarietyPack: "true",
      shippingMinimum: "15",
      displayMerchandiseItems: "false",
      merchandiseSourceLocationId: "12205",
      inventoryJobFlag: "true",
      remittanceFlag: "true",
      clearCouponFlag: "true",
      holydayShopInventoryFlag: "true",
      holidayShopStockText: "sold out",
      cybersourceTargetOrigin: "https://www.snacks.com",
      sendContactUsToSalesforce: "true",
      flavorDropShopReleaseDate: "Apr 1, 2021 00:00:00",
      paymentLoadingMsg:
        "Your payment is being processed \u2013 please do not refresh the page or press the back button on your browser ",
      paymentInitiatedError:
        "Your order is currently being processed. Please check your email for order confirmation.",
      marketPlaceProductCheckoutErrorMsg:
        "Some of the items in your cart not available for selected state. Please review your cart.",
      stateAvailableMsg: "Shipped  only to",
      multipackTileLocation: "12199, 12205, 12213",
      multipackOutofstock: "false",
      voucherProduct: "69647",
      isMultiLanguage: "false",
      multipackOrderThreshold: "970",
      itemTypeToApplyAutoDiscount: "Multipack",
      discountCouponToAutoApply: "",
      oktaConsumerIssuer:
        "https://consumer-pepsico.okta.com/oauth2/ausfpgwi1k5ngnirB4x6",
      okta_consumer_clientId: "0oafpg33jCj968rKt4x6",
    },
  };
  const props = {
    actionLabelList: jest.fn(),
    actionGetBannerList: jest.fn(),
    history: {
      push: jest.fn(),
    },
    customerDetails: { shippingZipcode: "22030", locationId: "22131" },
    minPrice: [
      {
        minimumOrderAmount: "15",
        shippingMinimum: "2",
        shippingCharges: "3",
        holidayShopStockText: "holiday shop",
        contactUsMsg: "contact us",
      },
    ],
    labelListItem: [
      {
        sectionName: "heading",
        filterImage: "test.jpg",
        filterLink: "/home",
        sectionDescription: "descrip",
        buttonText: "build now",
      },
    ],
    bannerList: {
      slidingBanner: [
          {
              "src": "https://share.snacks.com/images/banner/banner-desktop-Cowboys-1440x500-C.jpg",
              "mobile_src": "https://share.snacks.com/images/bundles/Snacks.com-Mobile-Banner-Smartfood.jpg",
              "alt": null,
              "heading": "Ultimate summer snacks",
              "heading_font_color": "#ffffff",
              "description": "Savory? Sweet? Crunchy? Cheesy? Get all the snacks you love in one handy-dandy variety pack.",
              "desc_font_color": "#000000",
              "button_text": "Shop Now",
              "button_background": "#ffffff",
              "button_font_color": "#000000",
              "destination_link": "https://www.gogole.com"
          },
          {
              "src": "https://picsum.photos/800/300?random=2",
              "mobile_src": "",
              "alt": null,
              "heading": "Live from the Upside Down",
              "heading_font_color": "#000000",
              "description": "Savory? Sweet? Crunchy? Cheesy? Get all the snacks you love in one handy-dandy variety pack.",
              "desc_font_color": "",
              "button_text": "Shop Now",
              "button_background": "#110f0f",
              "button_font_color": "",
              "destination_link": "https://www.gogole.com"
          }
      ],
      "myovpBanner": {
          "src": "https://picsum.photos/800/300?random=2",
          "mobile_src": "",
          "alt": null,
          "heading": "MYOP",
          "heading_font_color": "#000000",
          "description": "Savory? Sweet? Crunchy? Cheesy? Get all the snacks you love in one handy-dandy variety pack.",
          "desc_font_color": "",
          "button_text": "Shop Now",
          "button_background": "#060606",
          "button_font_color": "",
          "destination_link": "https://www.gogole.com"
      }
    },
  };
  let wrapper = shallow(<Home.WrappedComponent store={store} {...props} />, {
    attachTo: document.getElementById("body"),
  });

  it("Home component should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("test scrollToContent function", () => {
    const div = window.document.createElement("div");
    div.setAttribute("id", "content");
    window.document.body.appendChild(div);
    wrapper.instance().scrollToContent();
  });

  it("test zipValidation function", () => {
    window.sessionStorage.setItem("Zipcode", "22030");
    const e = { preventDefault: jest.fn() };
    wrapper.instance().zipValidation(e, true, { replace: jest.fn() });
    // when fromCategory = false
    wrapper.instance().zipValidation(e, false, { replace: jest.fn() });
  });

  it("test actionGetMinAmount function", () => {
    const actionGetMinAmount = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve({ status: 200, data: responseData })
      );
    wrapper.setProps({ actionGetMinAmount: actionGetMinAmount });
    wrapper.instance().actionGetMinAmount();
  });

  it("test componentWillUnmount function", () => {
    wrapper.instance().componentWillUnmount();
  });

  it("test render function", () => {
    wrapper.setState({ isHomeContentLoading: true });
    wrapper.instance().render();

    wrapper.setProps({ labelListItem: [] });
    wrapper.instance().render();
  });
});
