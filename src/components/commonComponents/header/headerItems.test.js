import * as React from "react";
import { shallow } from "enzyme";
import Header from "./header";
import configureMockStore from "redux-mock-store";
import { BrowserRouter } from "react-router-dom";

import UrlConstants from "./../../../config/UrlConstants";
import APIUtil from "./../../../config/APIUtil";

const mockStore = configureMockStore();
const reducer = {
  isAuthenticated: true,
  navigationData: [],
};
const store = mockStore({ reducer });

describe("<HeaderItems/>", () => {
  // const elementMock = { addEventListener: jest.fn() };
  // jest.spyOn(document, 'getElementById').mockImplementation(() => elementMock);
  const div = window.document.createElement("div");
  div.setAttribute("id", "body");
  window.document.body.appendChild(div);

  const div3 = window.document.createElement("div");
  div3.setAttribute("id", "zipcode");
  window.document.body.appendChild(div3);

  const cartItems = [
    {
      id: "7874",
      productId: "08104500",
      price: "3.79",
      size: "Big Bag (7.75oz)",
      title: "Lay's Potato Chips Cheddar and Sour Cream Flavored 7.75 Oz",
      productDescription: "Lay's Cheddar & Sour Cream Flavored Potato Chips",
      likes: 12,
      quantity: 1,
      brand: "LAY'S",
      displaySequence: "",
      productClass: "SNACK FOODS",
      currency: "$",
      flavour: ",Cheesy,",
      backgroundColorRgb: "c0c0c0",
      backgroundColorA: "ff",
      primaryProduct: true,
      availableQty: "100",
      productEnableFor: "OfficeSnacks",
      stateCode: [],
      stateName: [],
      recommendedProduct: "0",
      image:
        "https://ospep-develop.azurefd.net/products/US/00028400199988_C1C1.png",
      multipack: true,
      multipackList: [
        {
          id: "7846",
          productId: "10191700",
          title: "Fritos Twists Corn Snacks Honey BBQ Flavored 1 Oz",
          productDescription: "Fritos Twists Honey BBQ Flavored Corn Snacks",
          price: "0.50",
          currency: "$",
          likes: 12,
          image:
            "https://share.brandcentral.pepsico.com/products/US/00028400068826_C1C1.png",
          brand: "FRITOS",
          displaySequence: "1",
          allergen: "",
          quantity: 0,
          size: "Small Bag",
          availableQty: "100",
          productClass: "CLASS",
          recommendedProduct: "0",
          productEnableFor: "Multipack",
          stateCode: [],
          stateName: [],
        },
      ],
    },
  ];
  window.sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
  window.localStorage.setItem("token", "skjhfgjb3hj4bh33");
  window.localStorage.setItem(
    "accessToken",
    JSON.stringify({ token: "JNIJBD7687GCFFD", expiresAt: "1618651078" })
  );
  const ref = React.createRef();

  const props = {
    history: {
      listen: jest.fn(),
    },
    location: {
      search: "?productName=Tostitos%20Strips%20Tortilla%20Chips",
    },
    actiongetFilterData: jest.fn(),
    actionLabelList: jest.fn(),
    navigationAPIData: jest.fn(),
  };
  const returnData = {
    data: {
      success: true,
      message: "",
      data: {
        HeroBannerLeft: [
          {
            sectionName: "Hero Banner 0",
            textColor: "White",
            buttonText: "SHOP NOW",
            buttonPosition: 0,
            btnBackgroundColorRgb: "#007cbd",
            filterLink: "/varietypack",
            sectionDescription: "MYOVP",
            filterImage:
              "/www/images/hero/Hero-Desktop-Innovation-left-2.jpg?asd=213",
            timeInterval: 7000,
          },
          {
            sectionName: "Hero Banner 1",
            textColor: "White",
            buttonText: "SHOP NOW",
            buttonPosition: 0,
            btnBackgroundColorRgb: "#007cbd",
            filterLink: "/productlist?deepLink=true&&Brand=TOSTITOS",
            sectionDescription: "Tostitos",
            filterImage: "/www/images/hero/HomePage-Hero-Lays-2.jpg?asd=213",
            timeInterval: 7000,
          },
          {
            sectionName: "Hero Banner 2",
            textColor: null,
            buttonText: "SHOP NOW",
            buttonPosition: 0,
            btnBackgroundColorRgb: "#007cbd",
            filterLink:
              "/productlist?deepLink=true&&Brand=CHEETOS,Sunchips,DORITOS,SMARTFOOD,OFF THE EATEN PATH,TOSTITOS",
            sectionDescription: "New Flavors",
            filterImage: "/www/images/hero/HomePage-Hero-NewFlavors-left-2.jpg",
            timeInterval: 7000,
          },
          {
            sectionName: "Hero Banner 3",
            textColor: "White",
            buttonText: "SHOP NOW",
            buttonPosition: 0,
            btnBackgroundColorRgb: "#007cbd",
            filterLink: "/productlist?deepLink=true&&Brand=LAY'S",
            sectionDescription: "Lays",
            filterImage: "/www/images/hero/Hero-Desktop-Innovation-left-2.jpg",
            timeInterval: 7000,
          },
          {
            sectionName: "Hero Banner 4",
            textColor: "White",
            buttonText: " SHOP NOW",
            buttonPosition: 0,
            btnBackgroundColorRgb: "#007cbd",
            filterLink: "/productlist?deepLink=true&&Brand=LAY'S",
            sectionDescription: "Lays",
            filterImage: "/www/images/hero/Hero-Desktop-Innovation-left-2.jpg",
            timeInterval: 7000,
          },
          {
            sectionName: "Hero Banner 5",
            textColor: "White",
            buttonText: "SHOP NOW",
            buttonPosition: 0,
            btnBackgroundColorRgb: "#007cbd",
            filterLink: "/productlist?deepLink=true&&Brand=BARE",
            sectionDescription: "Bare",
            filterImage: "/www/images/hero/HomePage-Hero-Lays-2.jpg",
            timeInterval: 7000,
          },
        ],
        HeroBannerMobile: [
          {
            sectionName: "Hero Banner 0",
            textColor: "White",
            buttonText: "BUILD NOW",
            buttonPosition: 0,
            btnBackgroundColorRgb: "#007cbd",
            filterLink: "/ruffles",
            sectionDescription: "MYOVP",
            filterImage:
              "/www/images/hero/HomePage-Hero-VarietyPack-Mobile.jpg?ssdff=32",
            timeInterval: 7000,
          },
        ],
        HeroBannerRight: [
          {
            sectionName: "Hero Banner 5",
            textColor: "Black",
            buttonText: "SHOP NOW",
            buttonPosition: 0,
            btnBackgroundColorRgb: "#a7a9ae",
            filterLink: "/productlist?deepLink=true&&Brand=SMARTFOOD",
            sectionDescription: "Smartfood",
            filterImage: "/www/images/hero/HomePage-Hero-SmartFood.jpg",
            timeInterval: 7000,
          },
          {
            sectionName: "Hero Banner 4",
            textColor: "White",
            buttonText: "SHOP NOW",
            buttonPosition: 0,
            btnBackgroundColorRgb: "#1aa01d",
            filterLink: "/productlist?deepLink=true&&Brand=DORITOS",
            sectionDescription: "Lays",
            filterImage: "/www/images/hero/HomePage-Hero-Doritos.jpg",
            timeInterval: 7000,
          },
          {
            sectionName: "Hero Banner 2",
            textColor: "White",
            buttonText: "SHOP NOW",
            buttonPosition: 0,
            btnBackgroundColorRgb: "#c32828",
            filterLink:
              "/productlist?deepLink=true&&Brand=CHEETOS,Sunchips,DORITOS,SMARTFOOD,OFF THE EATEN PATH,TOSTITOS",
            sectionDescription: "New Flavors",
            filterImage: "/www/images/hero/HomePage-Hero-NewFlavors-right.jpg",
            timeInterval: 7000,
          },
          {
            sectionName: "Hero Banner 1",
            textColor: null,
            buttonText: null,
            buttonPosition: 0,
            btnBackgroundColorRgb: "",
            filterLink: "/productlist?deepLink=true&&Brand=TOSTITOS",
            sectionDescription: "Tostitos",
            filterImage:
              "https://share.snacks.com/images/hero/HomePage-Hero-Cinco2-Desktop-right.jpg",
            timeInterval: 7000,
          },
          {
            sectionName: "Hero Banner 0",
            textColor: "White",
            buttonText: "BUILD NOW",
            buttonPosition: 0,
            btnBackgroundColorRgb: "#ac15c2",
            filterLink: "/varietypack",
            sectionDescription: "MYOVP",
            filterImage:
              "/www/images/hero/HomePage-Hero-Desktop-Varietypack-right.webp?ssdff=32",
            timeInterval: 7000,
          },
        ],
        Home: [
          {
            sectionName: "Shop By Category",
            textColor: "White",
            buttonText: "GET STARTED",
            buttonPosition: 0,
            filterLink: "/shopbycategory",
            sectionDescription:
              "Looking for a specific flavor? Got a movie night or cookout coming up? We’ll take you step by step to find the right snacks for what you need, then save your order so next time everything will be ready to go. No fuss, just fun!",
            filterImage: "/www/images/shop-by-category.png",
            timeInterval: 7000,
          },
          {
            sectionName: "View All Snacks",
            textColor: "White",
            buttonText: "SHOP NOW",
            buttonPosition: 0,
            filterLink: "/productlist",
            sectionDescription:
              "Just jump in. All your favs(even the hard-to-find ones) are waiting. And who knows, maybe you'll find some new favs while you're at it.",
            filterImage: "/www/images/explore-all-snacks.png",
            timeInterval: 7000,
          },
        ],
        authHome: [
          {
            sectionName: "Flaming Hot",
            textColor: "White",
            buttonText: "Shop Flamin' Hot Snacks",
            buttonPosition: 0,
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
            buttonPosition: 0,
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
            buttonPosition: 0,
            filterLink: "/shopbycategory",
            sectionDescription:
              "We’ll take you step by step to help you find the right flavors for any occasion!",
            filterImage: null,
            timeInterval: 7000,
          },
        ],
      },
    },
    status: 200,
    statusText: "",
    headers: {
      "cache-control": "no-cache, private",
      "content-language": "en",
      "content-type": "application/json",
    },
    config: {
      url: "https://snackapp-admin-develop.azurefd.net/services/labelslist?locationNumber=12199",
      method: "get",
      headers: {
        Accept: "application/json",
        sessionId: "_ss_1646294796785ie140fe66bb897",
        rnduts:
          "w12o0WqoY2eaqJ7bv3WAyKbkrnOwdmegwuN4v9txqpGp28XHsJeTeJ6gh5mUwrq1q7mhh5x6oKaFq6yv",
        encstr:
          "bLNqqL6r3JWnZNSEzI12aouE03aWlllUj5Pbln2le6aRt6TYlaeAkauZ1YF9d9K9cYKqk5xnaGmcamxrmYaa3A==",
        "X-Auth-Token": "",
      },
      transformRequest: [null],
      transformResponse: [null],
      timeout: 0,
      xsrfCookieName: "XSRF-TOKEN",
      xsrfHeaderName: "X-XSRF-TOKEN",
      maxContentLength: -1,
      maxBodyLength: -1,
      transitional: {
        silentJSONParsing: true,
        forcedJSONParsing: true,
        clarifyTimeoutError: false,
      },
    },
    request: {
      ajaxData: null,
    },
  };
  APIUtil.getMethod = jest
    .fn()
    .mockImplementation(() => Promise.resolve({ data: returnData }));

  let wrapper = shallow(<Header.WrappedComponent store={store} {...props} />, {
    attachTo: document.getElementById("body"),
  })
    .dive()
    .dive();
  const history = { push: jest.fn() };
  wrapper.setProps({ history: history });

  it("test getFreeShippingAlert function", () => {
    const div = window.document.createElement("div");
    div.setAttribute("id", "body");
    window.document.body.appendChild(div);
    wrapper.instance().getFreeShippingAlert();
  });

  it("Header component should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("test UNSAFE_componentWillReceiveProps function", () => {
    wrapper.instance().UNSAFE_componentWillReceiveProps({ minPrice: [15] });
  });

  it("test componentWillUnmount function", () => {
    wrapper.instance().componentWillUnmount();
  });

  it("test validateUserSession function", () => {
    wrapper.instance().validateUserSession();
  });

  it("test toggleDrawer function", () => {
    const event = {
      currentTarget: "/",
    };
    wrapper.instance().toggleDrawer(event);
  });

  it("test zipValidation function", () => {
    window.sessionStorage.setItem("Zipcode", "22030");
    let e = { target: { text: "Shop By Category" }, preventDefault: jest.fn() };
    wrapper.instance().zipValidation(e);
    e = { target: { text: "View All Snacks" }, preventDefault: jest.fn() };
    wrapper.instance().zipValidation(e);
  });

  it("test cartZipValidation function", () => {
    window.sessionStorage.setItem("Zipcode", "22030");
    const cartItems = [
      {
        id: "7874",
        productId: "08104500",
        price: "3.79",
        size: "Big Bag (7.75oz)",
        title: "Lay's Potato Chips Cheddar and Sour Cream Flavored 7.75 Oz",
        productDescription: "Lay's Cheddar & Sour Cream Flavored Potato Chips",
        likes: 12,
        quantity: 1,
        brand: "LAY'S",
        displaySequence: "",
        productClass: "SNACK FOODS",
        currency: "$",
        flavour: ",Cheesy,",
        backgroundColorRgb: "c0c0c0",
        backgroundColorA: "ff",
        primaryProduct: true,
        availableQty: "100",
        productEnableFor: "OfficeSnacks",
        stateCode: [],
        stateName: [],
        recommendedProduct: "0",
        image:
          "https://ospep-develop.azurefd.net/products/US/00028400199988_C1C1.png",
        multipack: true,
        multipackList: [
          {
            id: "7846",
            productId: "10191700",
            title: "Fritos Twists Corn Snacks Honey BBQ Flavored 1 Oz",
            productDescription: "Fritos Twists Honey BBQ Flavored Corn Snacks",
            price: "0.50",
            currency: "$",
            likes: 12,
            image:
              "https://share.brandcentral.pepsico.com/products/US/00028400068826_C1C1.png",
            brand: "FRITOS",
            displaySequence: "1",
            allergen: "",
            quantity: 0,
            size: "Small Bag",
            availableQty: "100",
            productClass: "CLASS",
            recommendedProduct: "0",
            productEnableFor: "Multipack",
            stateCode: [],
            stateName: [],
          },
        ],
      },
    ];
    window.sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
    wrapper.instance().cartZipValidation();
    //when zipcode is not set
    window.sessionStorage.removeItem("Zipcode");
    wrapper.instance().cartZipValidation();
    wrapper.find("#cartButton").simulate("click");
  });

  it("test cartZipValidation function", () => {
    window.sessionStorage.setItem("Zipcode", "22030");
    wrapper.instance().cartZipValidation();
    //when zipcode is not set
    window.sessionStorage.removeItem("Zipcode");
    wrapper.instance().cartZipValidation();
  });

  it("test getCount function", () => {
    wrapper.instance().getCount();
  });

  it("test openLoginModal function", () => {
    window.localStorage.setItem("loginClicked", "checkout");
    const events = { preventDefault: jest.fn() };
    wrapper.instance().openLoginModal(events);
    // when loginClicked != checkout
    window.localStorage.setItem("loginClicked", "pay");
    wrapper.instance().openLoginModal(events);
  });

  it("test hideUserDropdown function", () => {
    wrapper.instance().hideUserDropdown({ keyCode: 27 });
  });

  it("test onLoginSuccess function", () => {
    wrapper.instance().onLoginSuccess({});
    window.sessionStorage.setItem("Zipcode", "22030");
    window.localStorage.setItem(
      "accessToken",
      JSON.stringify({ token: "JNIJBD7687GCFFD", expiresAt: "1618651078" })
    );
    wrapper.instance().onLoginSuccess({});
  });

  it("test getUserDetails function", () => {
    window.localStorage.setItem("token", "IBSIBUIHB4J54HJ5BJH");
    window.localStorage.setItem(
      "accessToken",
      JSON.stringify({ token: "JNIJBD7687GCFFD", expiresAt: "1618651078" })
    );
    wrapper.instance().getUserDetails();
  });

  it("test userLogout function", () => {
    const events = { preventDefault: jest.fn() };
    const authService = {
      logout: jest
        .fn()
        .mockImplementation(() => Promise.resolve({ data: { success: true } })),
    };
    wrapper.setProps({ authService: authService });
    wrapper.setProps({ LogOut: jest.fn() });
    wrapper.instance().userLogout(events);
    //when returns error
    const authService1 = {
      logout: jest
        .fn()
        .mockImplementation(() => Promise.reject({ data: { success: false } })),
    };
    wrapper.setProps({ authService: authService1 });
    wrapper.instance().userLogout(events);
  });

  // it('test zipPopoverClose function', () => {
  //   const e = {currentTarget: "/home"}
  //   const doc = window.document.getElementById;
  //   doc.classList = jest.fn();
  //   // doc = jest.fn().mockImplementation(() => return {
  //   //   classList: jest.fn()
  //   // });
  //   let elem = window.document.createElement("div");
  //   elem.setAttribute('id', 'body');
  //   //document.getElementById("body").classList.add("mystyle");
  //   elem.classList = jest.fn();

  //   wrapper.instance().zipPopoverClose(e);
  // });

  // it('test zipPopoverUpdate function', () => {
  //   wrapper.instance().zipPopoverUpdate();
  // });

  it("test handleClickAway function", () => {
    wrapper.instance().handleClickAway();
  });

  it("test handleClick function", () => {
    wrapper.instance().handleClick();
  });

  // it('test navigationList function', () => {
  //   //wrapper.instance().navigationList();
  //   //wrapper.find('.menu-link').first().simulate('click');
  //   const mockOnClick = jest.fn();
  //   const wrapper = shallow(<NavLink onClick={mockOnClick} />)
  //   wrapper.find('.menu-link').simulate('click')
  //   expect(mockOnClick.mock.calls.length).toEqual(1)
  // });

  it("test displayProfileInfo function", () => {
    wrapper.instance().displayProfileInfo("jack Smith");
  });
});

describe("Tasty Rewards Header component", () => {
  UrlConstants.isTastyRewards = true;
  const props = {
    history: {
      listen: jest.fn(),
    },
    location: {
      search: "?productName=Tostitos%20Strips%20Tortilla%20Chips",
    },
    actiongetFilterData: jest.fn(),
    actionLabelList: jest.fn(),
  };
  let wrapper = shallow(
    <BrowserRouter>
      <Header.WrappedComponent store={{}} {...props} />
    </BrowserRouter>
  );
  it("Header component should renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("Tasy Rewards Header component should render Sign In button", () => {
    let linkNode = wrapper.find("#signInBtn");
    expect(linkNode.exists()).toBe(false);
  });
});
