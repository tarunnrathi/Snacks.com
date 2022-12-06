import axios from "axios";
import APIUtil from "./APIUtil";
import UrlConstants from "./UrlConstants";

jest.mock("axios");
describe("test APIUtil file", () => {
  const getApiResponse = {
    success: true,
    message: "Customer details retrieved successfully",
    data: {
      id: "8a7f618a7853af7701785f36fa570077",
      accountType: "D2C",
      createdDt: "2021-03-23T13:12:22Z",
      updatedDt: "2021-03-23T13:12:22Z",
      status: "ACTIVE",
      accountContacts: [
        {
          id: "8a7f618a7853af7701785f36fa570078",
          contactType: "CONSUMER",
          firstName: "Robin",
          lastName: "BT",
          email: "robin200@gmail.com",
          phone: "",
        },
      ],
      accountUsers: [
        {
          id: "8a7f618a7853af7701785f36fa860079",
          userId: "robin200@gmail.com",
          createdDt: "2021-03-23T13:12:22Z",
          updatedDt: "2021-03-23T13:12:22Z",
        },
      ],
      accountAddresses: [{ addressType: "SHIPPING_ADDRESS" }],
      locationId: "",
      shippingZipcode: "",
    },
  };
  const postApiResponse = {
    success: true,
    message: "",
    offset: 0,
    limit: 36,
    totalProducts: 9,
    Groups: [
      [
        {
          id: 126834,
          mixCountName: "30 COUNT ",
          zNonSku: "00028400480369",
          mixCount: 30,
          price: "19.5",
          currency: "$",
          shortDescription: "Variety Pack",
          longDescription:
            "Looking for Lay\u2019s? Fired up for Fritos? You choose which of your snack-sized favorites go in your customized 30-count Variety Pack.",
          productTitle: "Custom 30ct Variety Pack",
          heading: "Make Your Own",
          multipackCartHeading: "Pick your favorite snacks!",
          multipackCartItemsOut: "items out of 30",
          multipackId: "MYOMP-30",
          image: "/www/images/30-count-multipack.png",
          confirmationHeading: "",
          confirmationDesc:
            "Head to the checkout or keep browsing all of your favorite Frito-Lay snacks.",
          confirmationSubHeading:
            "Congratulations, you\u2019ve hit the snackpot!",
          confirmationContinueBtn: "Continue Shopping",
          confirmationCheckoutBtn: "Proceed to checkout",
          disableMultipack: false,
          disableMultipackCoupon: false,
          buildText: "Get Started",
          notifyMeText: "notify me",
          varietyPackAvailableQty: "100",
          confirmationImage: "/www/images/30-count-multipack.png",
          promotionalPrice: "17.5",
          limitedOffer: "*Limited Time Offer",
          seeBelowInfo: "*See below for packaging information",
          outOfStock: "Out Of Stock",
          saveMixNameBtn: "Save \u0026 Name your  Variety Pack",
          saveMixSuccessMsg: "Variety Pack will be saved to Your Mixes.",
          mixNameTitle: "Name your custom Variety Pack to save it for later.",
          continueCartCount: "Keep em\u2019 comin\u2019",
          completeCartCount: "View my mix",
          newTabTitle: "Newly Added",
          myMixTabTitle: "My Mix",
          allSnacksTabTitle: "All Snacks",
        },
      ],
      [
        {
          id: "7874",
          productId: "08104500",
          price: "3.79",
          size: "Big Bag (7.75oz)",
          title:
            "Lay\u0027s Potato Chips Cheddar and Sour Cream Flavored 7.75 Oz",
          productDescription:
            "Lay\u0027s Cheddar \u0026 Sour Cream Flavored Potato Chips",
          likes: 12,
          quantity: 0,
          brand: "LAY\u0027S",
          displaySequence: "",
          productClass: "SNACK FOODS",
          currency: "$",
          flavour: ",Cheesy,",
          backgroundColorRgb: "c0c0c0",
          backgroundColorA: "ff",
          primaryProduct: true,
          availableQty: "617",
          productEnableFor: "OfficeSnacks",
          stateCode: [],
          stateName: [],
          recommendedProduct: "0",
          overwriteDescription: null,
          bundleDescription: null,
          bundleDetailDescription: null,
          image:
            "https://ospep-develop.azurefd.net/products/US/00028400199988_C1C1.png",
        },
      ],
      [
        {
          id: "7905",
          productId: "10054600",
          price: "1.89",
          size: "Small Bag (2.625oz)",
          title: "Lay\u0027s Potato Chips, Honey Barbecue Flavored, 2.625 Oz",
          productDescription: "Lay\u0027s Honey BBQ Flavored Potato Chips",
          likes: 12,
          quantity: 0,
          brand: "LAY\u0027S",
          displaySequence: "1",
          productClass: "SNACK FOODS",
          currency: "$",
          flavour: ",Barbecue,",
          backgroundColorRgb: "",
          backgroundColorA: "",
          primaryProduct: true,
          availableQty: "3365",
          productEnableFor: "OfficeSnacks",
          stateCode: [],
          stateName: [],
          recommendedProduct: "0",
          overwriteDescription: null,
          bundleDescription: null,
          bundleDetailDescription: null,
          image:
            "https://ospep-develop.azurefd.net/products/US/00028400323819_C1C1.png",
        },
      ],
      [
        {
          id: "7841",
          productId: "10083200",
          price: "1.89",
          size: "Small Bag (3.25oz)",
          title: "Cheetos Crunchy Cheese Flavored Snacks 8.5 Oz",
          productDescription: "Cheetos Crunchy Cheese Flavored Snacks",
          likes: 12,
          quantity: 0,
          brand: "CHEETOS",
          displaySequence: "2",
          productClass: "SNACK FOODS",
          currency: "$",
          flavour: ",Cheesy,",
          backgroundColorRgb: "",
          backgroundColorA: "",
          primaryProduct: true,
          availableQty: "6950",
          productEnableFor: "OfficeSnacks",
          stateCode: [],
          stateName: [],
          recommendedProduct: "0",
          overwriteDescription: null,
          bundleDescription: null,
          bundleDetailDescription: null,
          image:
            "https://ospep-develop.azurefd.net/products/US/00028400589864_C1C1.png",
        },
      ],
      [
        {
          id: "7844",
          productId: "10084600",
          price: "1.89",
          size: "Small Bag (3.25oz)",
          title: "Cheetos Crunchy Flamin Hot Limon 8.5 Ounce Plastic Bag",
          productDescription:
            "Cheetos Crunchy Flamin\u0027 Hot Limon Cheese Flavored Snacks",
          likes: 12,
          quantity: 0,
          brand: "CHEETOS",
          displaySequence: "2",
          productClass: "SNACK FOODS",
          currency: "$",
          flavour: ",Spicy,Tangy,",
          backgroundColorRgb: "",
          backgroundColorA: "",
          primaryProduct: true,
          availableQty: "1988",
          productEnableFor: "OfficeSnacks",
          stateCode: [],
          stateName: [],
          recommendedProduct: "0",
          overwriteDescription: null,
          bundleDescription: null,
          bundleDetailDescription: null,
          image:
            "https://ospep-develop.azurefd.net/products/US/00028400590020_C1C1.png",
        },
      ],
      [
        {
          id: "7922",
          productId: "10266400",
          price: "1.89",
          size: "Small Bag (2.5oz)",
          title: null,
          productDescription: null,
          likes: 12,
          quantity: 0,
          brand: "",
          displaySequence: "",
          productClass: "",
          currency: "$",
          flavour: "",
          backgroundColorRgb: "",
          backgroundColorA: "",
          primaryProduct: true,
          availableQty: "2928",
          productEnableFor: "",
          stateCode: [],
          stateName: [],
          recommendedProduct: "0",
          overwriteDescription: null,
          bundleDescription: null,
          bundleDetailDescription: null,
          image: "",
        },
      ],
      [
        {
          id: "7742",
          productId: "06270300",
          price: "0.50",
          size: "Dip (9oz)",
          title: "Fritos Bean Dip Original Flavor 9 Oz",
          productDescription: "Fritos Original Bean Dip",
          likes: 12,
          quantity: 0,
          brand: "FRITOS",
          displaySequence: "6",
          productClass: "FOOD IN HOME",
          currency: "$",
          flavour: ",Everything Else,",
          backgroundColorRgb: "",
          backgroundColorA: "",
          primaryProduct: true,
          availableQty: "19",
          productEnableFor: "OfficeSnacks",
          stateCode: [],
          stateName: [],
          recommendedProduct: "0",
          overwriteDescription: null,
          bundleDescription: null,
          bundleDetailDescription: null,
          image:
            "https://ospep-develop.azurefd.net/Snacks2UImages/US/00028400000789_C1C1.jpg?v=1",
        },
      ],
      [
        {
          id: "7796",
          productId: "09207200",
          price: "1.99",
          size: "Other (6oz)",
          title: "Spitz Sunflower Seeds Cracked Pepper Flavored 6 Oz",
          productDescription: "Spitz Cracked Pepper Flavored Sunflower Seeds",
          likes: 12,
          quantity: 0,
          brand: "SPITZ",
          displaySequence: "29",
          productClass: "SNACK FOODS",
          currency: "$",
          flavour: ",Plain,",
          backgroundColorRgb: "",
          backgroundColorA: "",
          primaryProduct: true,
          availableQty: "540",
          productEnableFor: "OfficeSnacks",
          stateCode: [],
          stateName: [],
          recommendedProduct: "1",
          overwriteDescription: null,
          bundleDescription: null,
          bundleDetailDescription: null,
          image:
            "https://ospep-develop.azurefd.net/products/US/00028400096720_C1C1.png",
        },
      ],
      [
        {
          id: "7826",
          productId: "09816001",
          price: "5.45",
          size: "Multipack (2.875oz, 5 count)",
          title: "Grandma\u0027s Cookies Peanut Butter 2.875 Oz",
          productDescription: "Grandma\u0027s Peanut Butter Cookies",
          likes: 12,
          quantity: 0,
          brand: "GRANDMA\u0027S",
          displaySequence: "31",
          productClass: "COOKIES PLAIN",
          currency: "$",
          flavour: ",Everything Else,",
          backgroundColorRgb: "",
          backgroundColorA: "",
          primaryProduct: true,
          availableQty: 0,
          productEnableFor: "OfficeSnacks",
          stateCode: [],
          stateName: [],
          recommendedProduct: "0",
          overwriteDescription: null,
          bundleDescription: null,
          bundleDetailDescription: null,
          image:
            "https://ospep-develop.azurefd.net/products/US/00028400259552_C1C1.png",
        },
      ],
      [
        {
          id: "7781",
          productId: "08668700",
          price: "1.79",
          size: "Other (0.84oz)",
          title: "Quaker Chewy Granola Bar, S\u0027mores, 0.84 Oz",
          productDescription: "Quaker Chewy S\u0027mores Flavored Granola Bar",
          likes: 12,
          quantity: 0,
          brand: "QUAKER",
          displaySequence: "33",
          productClass: "CANDY WITH FLOUR",
          currency: "$",
          flavour: ",Everything Else,",
          backgroundColorRgb: "",
          backgroundColorA: "",
          primaryProduct: true,
          availableQty: "2496",
          productEnableFor: "OfficeSnacks",
          stateCode: [],
          stateName: [],
          recommendedProduct: "0",
          overwriteDescription: null,
          bundleDescription: null,
          bundleDetailDescription: null,
          image:
            "https://ospep-develop.azurefd.net/products/US/00030000007686_C1C1.png",
        },
      ],
    ],
  };
  const putApiResponse = {
    success: true,
    message: "Customer account updated successfully",
    data: {
      id: "8a7fc3a079379d1c01793c6bded30146",
      contactType: "CONSUMER",
      firstName: "Shawn",
      lastName: "mills",
      middleInit: null,
      gender: null,
      email: "shawn22@gmail.com",
      phone: "3012211222",
      source: null,
      login: "Snacksca.",
      phone2: null,
      birthDate: null,
      birthMonth: null,
      birthDay: null,
      birthYear: null,
      languageCode: null,
      languageName: null,
      occupation: null,
      optins: null,
      optin2: null,
      optOuts: null,
      createdDt: null,
      updatedDt: "2021-05-06T05:19:52.494Z",
    },
  };

  it("test checAPIData function", () => {
    APIUtil.checAPIData();
    window.sessionStorage.setItem("_ss_i", "KJBHHEJKG786ER7G6RE");
    window.sessionStorage.setItem("_rr_n_dts", "JHVFJW8766587W6");
    window.sessionStorage.setItem("_en_cs", "OPKKOPWIEJIR6576");
    APIUtil.checAPIData();
  });

  it("test externalAPI function", () => {
    axios.mockImplementationOnce(() => Promise.resolve(getApiResponse));
    APIUtil.externalAPI(UrlConstants.GetCustomer, true);

    axios.mockImplementationOnce(() =>
      Promise.reject({ response: { success: false } })
    );
    APIUtil.externalAPI(UrlConstants.GetCustomer, true);
  });

  it("test getMethod function", () => {
    axios.mockImplementationOnce(() => Promise.resolve(getApiResponse));
    APIUtil.getMethod(UrlConstants.GetCustomer, true);

    axios.mockImplementationOnce(() =>
      Promise.reject({ response: { success: false } })
    );
    APIUtil.getMethod(UrlConstants.GetCustomer, true);
  });

  it("test inValidToken function", () => {
    APIUtil.inValidToken();
  });

  it("test postAPIKeyMethod function", () => {
    axios.mockImplementationOnce(() => Promise.resolve(postApiResponse));
    APIUtil.postAPIKeyMethod(UrlConstants.ProductsUrl, {}, true);

    axios.mockImplementationOnce(() =>
      Promise.reject({ response: { success: false } })
    );
    APIUtil.postAPIKeyMethod(UrlConstants.ProductsUrl, {}, true);
  });

  it("test postMethod function", () => {
    axios.mockImplementationOnce(() => Promise.resolve(postApiResponse));
    APIUtil.postMethod(UrlConstants.ProductsUrl, {}, true);

    axios.mockImplementationOnce(() =>
      Promise.reject({ response: { success: false } })
    );
    APIUtil.postMethod(UrlConstants.ProductsUrl, {}, true);
  });

  it("test locationReload function", () => {
    APIUtil.locationReload();
  });

  it("test putMethod function", () => {
    window.sessionStorage.setItem("_ss_i", "KJBHHEJKG786ER7G6RE");
    window.sessionStorage.setItem("_rr_n_dts", "JHVFJW8766587W6");
    window.sessionStorage.setItem("_en_cs", "OPKKOPWIEJIR6576");

    const reqData = {
      customer: {
        accountId: "8a7fc3a079379d1c01793c6bded30144",
        id: "8a7fc3a079379d1c01793c6bded30146",
        customerfirstname: "Shawn",
        customerlastname: "mills",
        customeremail: "shawn22@gmail.com",
        customerPhone1: "3012211222",
        birthDate: null,
        birthMonth: null,
        birthYear: null,
        gender: "M",
      },
    };
    axios.mockImplementationOnce(() => Promise.resolve(putApiResponse));
    APIUtil.putMethod(UrlConstants.updateAccount, reqData, true);

    axios.mockImplementationOnce(() =>
      Promise.reject({ response: { success: false } })
    );
    APIUtil.putMethod(UrlConstants.updateAccount, reqData, true);
  });

  it("test deleteMethod function", () => {
    axios.mockImplementationOnce(() =>
      Promise.resolve({
        data: { success: true, message: "Record deleted successfully" },
      })
    );
    APIUtil.deleteMethod(UrlConstants.deleteAddress, {}, true);

    axios.mockImplementationOnce(() =>
      Promise.reject({ response: { success: false } })
    );
    APIUtil.deleteMethod(UrlConstants.deleteAddress, {}, true);
  });

  it("test postFormDataMethod function", () => {
    axios.mockImplementationOnce(() => Promise.resolve(postApiResponse));
    APIUtil.postFormDataMethod(UrlConstants.ProductsUrl, {}, true);

    axios.mockImplementationOnce(() =>
      Promise.reject({ response: { success: false } })
    );
    APIUtil.postFormDataMethod(UrlConstants.ProductsUrl, {}, true);
  });
});
