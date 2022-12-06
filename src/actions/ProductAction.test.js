import APIUtil from "./../config/APIUtil";
import * as ProductAction from "./ProductAction";

describe("ProductAction component", () => {
  const dispatch = jest.fn();

  it("test actiongetProduct function", () => {
    const input = {
      limit: 12,
    };
    //mocking productgrouplist API with response 200
    APIUtil.postMethod = jest.fn().mockImplementation(() =>
      Promise.resolve({
        status: 200,
        data: {
          success: true,
          message: "",
          offset: 0,
          limit: 36,
          totalProducts: 142,
          Groups: [
            [
              {
                id: 126834,
                mixCountName: "30 COUNT ",
                zNonSku: "00028400480368",
                mixCount: 30,
                price: "19.5",
                currency: "$",
                shortDescription: "",
                longDescription:
                  "Looking for Lay’s? Fired up for Fritos? You choose which of your snack-sized favorites go in your personalized 30-count Variety Pack.",
                productTitle: "Custom 30ct Variety Pack",
                heading: "Make Your Own Variety Pack",
                multipackCartHeading:
                  "Pick 30 items to build your customized Variety Pack",
                multipackCartItemsOut: "items out of 30",
                multipackId: "MYOMP-30",
                image:
                  "https://ospep-develop.azurefd.net/www/images/30-count-multipack.png",
                confirmationHeading: "CONGRATULATIONS",
                confirmationDesc:
                  "Head to the check out or keep browsing all of your favorite Frito-Lay snacks.",
                confirmationSubHeading: "You’ve hit the snackpot!",
                confirmationContinueBtn: "Continue Shopping",
                confirmationCheckoutBtn: "Proceed to checkout",
                disableMultipack: false,
                buildText: "build",
                notifyMeText: "notify me",
                varietyPackAvailableQty: "100",
                confirmationImage:
                  "https://ospep-develop.azurefd.net/www/images/30-count-multipack.png",
                promotionalPrice: "17.5",
                limitedOffer: "Limited Time Offer!",
                seeBelowInfo: "*See below for packaging information",
                outOfStock: "Out Of Stock",
              },
            ],
          ],
        },
      })
    );
    ProductAction.actiongetProduct(input)(dispatch);

    //mocking productgrouplist API with response != 200
    APIUtil.postMethod = jest.fn().mockImplementation(() =>
      Promise.resolve({
        status: 500,
        data: {
          success: true,
          message: "",
          offset: 0,
          limit: 36,
          totalProducts: 142,
          Groups: [
            [
              {
                id: 126834,
                mixCountName: "30 COUNT ",
                zNonSku: "00028400480368",
                mixCount: 30,
                price: "19.5",
                currency: "$",
                shortDescription: "",
                longDescription:
                  "Looking for Lay’s? Fired up for Fritos? You choose which of your snack-sized favorites go in your personalized 30-count Variety Pack.",
                productTitle: "Custom 30ct Variety Pack",
                heading: "Make Your Own Variety Pack",
                multipackCartHeading:
                  "Pick 30 items to build your customized Variety Pack",
                multipackCartItemsOut: "items out of 30",
                multipackId: "MYOMP-30",
                image:
                  "https://ospep-develop.azurefd.net/www/images/30-count-multipack.png",
                confirmationHeading: "CONGRATULATIONS",
                confirmationDesc:
                  "Head to the check out or keep browsing all of your favorite Frito-Lay snacks.",
                confirmationSubHeading: "You’ve hit the snackpot!",
                confirmationContinueBtn: "Continue Shopping",
                confirmationCheckoutBtn: "Proceed to checkout",
                disableMultipack: false,
                buildText: "build",
                notifyMeText: "notify me",
                varietyPackAvailableQty: "100",
                confirmationImage:
                  "https://ospep-develop.azurefd.net/www/images/30-count-multipack.png",
                promotionalPrice: "17.5",
                limitedOffer: "Limited Time Offer!",
                seeBelowInfo: "*See below for packaging information",
                outOfStock: "Out Of Stock",
              },
            ],
          ],
        },
      })
    );
    ProductAction.actiongetProduct(input)(dispatch);
  });

  it("test actiongetProductDetail function", () => {
    const payload = {
      prodId: "1232",
      locationNumber: "22030",
    };
    //mocking productdetail API with response 200
    const responseData = {
      success: true,
      message: "",
      offset: 0,
      limit: 72,
      totalProducts: 24,
      data: [
        {
          id: "129803",
          productId: "10248800",
          title: "Lay's Potato Chips Honey Barbecue Flavored 1 Oz",
          productDescription: "Lay's Honey BBQ Flavored Potato Chips",
          price: "0.50",
          currency: "$",
          likes: 12,
          image: "https://www.snacks.com/products/US/00028400376761_C1C1.png",
          brand: "LAY'S",
          displaySequence: "1",
          allergen: "",
          quantity: 0,
          size: "Small Bag",
          availableQty: "3693",
          productClass: "CLASS",
          recommendedProduct: null,
          productEnableFor: "Multipack",
          stateCode: [],
          stateName: [],
        },
        {
          id: "7847",
          productId: "10191800",
          title: "Fritos Original Corn Chips 1 Ounce Plastic Bag",
          productDescription: "Fritos Original Corn Chips",
          price: "0.50",
          currency: "$",
          likes: 12,
          image: "https://www.snacks.com/products/US/00028400040037_C1C1.png",
          brand: "FRITOS",
          displaySequence: "6",
          allergen: "",
          quantity: 0,
          size: "Small Bag",
          availableQty: "528",
          productClass: "CLASS",
          recommendedProduct: "0",
          productEnableFor: "Multipack",
          stateCode: [],
          stateName: [],
        },
      ],
    };
    APIUtil.postMethod = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve({ status: 200, data: responseData })
      );
    ProductAction.actiongetProductDetail(payload)(dispatch);

    //mocking productdetail API with response != 200
    APIUtil.postMethod = jest.fn().mockImplementation(() =>
      Promise.resolve({
        status: 500,
        data: { success: false, error: "Something went wrong" },
      })
    );
    ProductAction.actiongetProductDetail(payload)(dispatch);
  });

  it("test actiongetFilter function", () => {
    //mocking filterlist API with response 200
    const responseData = {
      success: true,
      data: {
        Brand: [
          "BAKED",
          "BAKEN-ETS",
          "BARE",
          "CAP\u0027N CRUNCH",
          "CHEETOS",
          "CHESTER\u0027S",
          "DORITOS",
          "FRITO LAY",
          "FRITOS",
          "FUNYUNS",
          "Frito Lay Variety Pack",
          "GRANDMA\u0027S",
          "LAY\u0027S",
          "MATADOR",
          "MISS VICKIE\u0027S",
          "MUNCHIES",
          "MUNCHOS",
          "NUT HARVEST",
          "Off The Eaten Path",
          "PASTA RONI",
          "QUAKER",
          "RANCHERITOS",
          "RICE A RONI",
          "ROLD GOLD",
          "RUFFLES",
          "SABRITAS",
          "SABRITONES",
          "SANTITAS",
          "SIMPLY",
          "SPITZ",
          "STACY\u0027S",
          "Smartfood",
          "Sunchips",
          "TOSTITOS",
        ],
        "Snack Type": [
          "Cereal",
          "Cheese Puffs",
          "Cookies \u0026 Crackers",
          "Corn Chips",
          "Fruit \u0026 Veggie Chips",
          "Meat Snacks",
          "Multigrain Snacks",
          "Multipack",
          "Nuts \u0026 Seeds",
          "Other",
          "Pita Chips",
          "Popcorn",
          "Pork Rinds",
          "Potato Chips",
          "Pretzels",
          "Rice \u0026 Pasta",
          "Tortilla Chips",
        ],
        Flavor: [
          "Barbecue",
          "Cheesy",
          "Everything Else",
          "Plain",
          "Spicy",
          "Tangy",
        ],
        Occasion: [
          "Entertaining",
          "Gaming",
          "Movie Night",
          "On The Go",
          "Work/Study Break",
        ],
      },
    };
    APIUtil.getMethod = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve({ status: 200, data: responseData })
      );
    ProductAction.actiongetFilter()(dispatch);

    //mocking filterlist API with response != 200
    APIUtil.getMethod = jest.fn().mockImplementation(() =>
      Promise.resolve({
        status: 500,
        data: { success: false, error: "Something went wrong" },
      })
    );
    ProductAction.actiongetFilter()(dispatch);
  });

  it("test actionZipcodeVerification function", () => {
    const values = {
      zipcode: "75024",
    };
    //mocking zipcodevalidate API with response 200
    const responseData = { success: true, data: { validate: true } };
    APIUtil.postMethod = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve({ status: 200, data: responseData })
      );
    ProductAction.actionZipcodeVerification(values)(dispatch);

    //mocking zipcodevalidate API with response != 200
    APIUtil.postMethod = jest.fn().mockImplementation(() =>
      Promise.resolve({
        status: 500,
        data: { success: false, error: "Something went wrong" },
      })
    );
    ProductAction.actionZipcodeVerification(values)(dispatch);
  });

  it("test actionLabelList function", () => {
    //mocking labelslist API with response 200
    const responseData = {
      success: true,
      message: "",
      data: {
        HeroBannerLeft: [
          {
            sectionName: "Hero Banner 0",
            textColor: "White",
            buttonText: null,
            filterLink: "/varietypack",
            sectionDescription: "MYOVP",
            filterImage:
              "https://share.snacks.com/images/hero/HomePage-Hero-Desktop-Varietypack-left.jpg",
            timeInterval: 7000,
          },
          {
            sectionName: "Hero Banner 1",
            textColor: null,
            buttonText: null,
            filterLink:
              "/productlist?deepLink=true\u0026\u0026Brand=CHEETOS,Sunchips,DORITOS,SMARTFOOD,OFF THE EATEN PATH,TOSTITOS",
            sectionDescription: null,
            filterImage: "/www/images/hero/HomePage-Hero-NewFlavors-left.jpg",
            timeInterval: 7000,
          },
          {
            sectionName: "Hero Banner 3",
            textColor: "Red",
            buttonText: " SHOP NOW",
            filterLink:
              "/productlist?deepLink=true\u0026\u0026Brand=LAY\u0027S",
            sectionDescription: null,
            filterImage: "/www/images/hero/HomePage-Hero-Lays.jpg",
            timeInterval: 7000,
          },
          {
            sectionName: "Hero Banner 4",
            textColor: "White",
            buttonText: "SHOP NOW",
            filterLink: "/productlist?deepLink=true\u0026\u0026Brand=BARE",
            sectionDescription: null,
            filterImage: "/www/images/hero/HomePage-Hero-Bare.jpg",
            timeInterval: 7000,
          },
        ],
        HeroBannerMobile: [
          {
            sectionName: "Hero Banner 0",
            textColor: "White",
            buttonText: "BUILD NOW",
            filterLink: "/varietypack",
            sectionDescription: "MYOVP",
            filterImage:
              "https://share.snacks.com/images/hero/HomePage-Hero-VarietyPack-Mobile.jpg",
            timeInterval: 7000,
          },
          {
            sectionName: "Hero Banner 1",
            textColor: "White",
            buttonText: "SHOP NOW",
            filterLink:
              "/productlist?deepLink=true\u0026\u0026Brand=CHEETOS,Sunchips,DORITOS,SMARTFOOD,OFF THE EATEN PATH,TOSTITOS",
            sectionDescription: null,
            filterImage: "/www/images/hero/Molibe-NewFlavors.jpg",
            timeInterval: 7000,
          },
          {
            sectionName: "Hero Banner 3",
            textColor: "Red",
            buttonText: "SHOP NOW",
            filterLink:
              "/productlist?deepLink=true\u0026\u0026Brand=LAY\u0027S",
            sectionDescription: null,
            filterImage: "/www/images/hero/Mobile-Lays.jpg",
            timeInterval: 7000,
          },
          {
            sectionName: "Hero Banner 4",
            textColor: "White",
            buttonText: "SHOP NOW",
            filterLink: "/productlist?deepLink=true\u0026\u0026Brand=DORITOS",
            sectionDescription: null,
            filterImage: "/www/images/hero/Mobile-Doritos.jpg",
            timeInterval: 7000,
          },
          {
            sectionName: "Hero Banner 5",
            textColor: "White",
            buttonText: "SHOP NOW",
            filterLink: "/productlist?deepLink=true\u0026\u0026Brand=BARE",
            sectionDescription: null,
            filterImage: "/www/images/hero/Mobile-Bare.jpg",
            timeInterval: 7000,
          },
          {
            sectionName: "Hero Banner 6",
            textColor: "Black",
            buttonText: "SHOP NOW",
            filterLink: "/productlist?deepLink=true\u0026\u0026Brand=SMARTFOOD",
            sectionDescription: null,
            filterImage: "/www/images/hero/Mobile-SmartFood.jpg",
            timeInterval: 7000,
          },
        ],
        HeroBannerRight: [
          {
            sectionName: "Hero Banner 4",
            textColor: "Black",
            buttonText: "SHOP NOW",
            filterLink: "/productlist?deepLink=true\u0026\u0026Brand=SMARTFOOD",
            sectionDescription: null,
            filterImage: "/www/images/hero/HomePage-Hero-SmartFood.jpg",
            timeInterval: 7000,
          },
          {
            sectionName: "Hero Banner 3",
            textColor: "White",
            buttonText: "SHOP NOW",
            filterLink: "/productlist?deepLink=true\u0026\u0026Brand=DORITOS",
            sectionDescription: null,
            filterImage: "/www/images/hero/HomePage-Hero-Doritos.jpg",
            timeInterval: 7000,
          },
          {
            sectionName: "Hero Banner 1",
            textColor: "White",
            buttonText: "SHOP NOW",
            filterLink:
              "/productlist?deepLink=true\u0026\u0026Brand=CHEETOS,Sunchips,DORITOS,SMARTFOOD,OFF THE EATEN PATH,TOSTITOS",
            sectionDescription: null,
            filterImage: "/www/images/hero/HomePage-Hero-NewFlavors-right.jpg",
            timeInterval: 7000,
          },
          {
            sectionName: "Hero Banner 0",
            textColor: "White",
            buttonText: "BUILD NOW",
            filterLink: "/varietypack",
            sectionDescription: "MYOVP",
            filterImage:
              "https://share.snacks.com/images/hero/HomePage-Hero-Desktop-Varietypack-right.jpg",
            timeInterval: 7000,
          },
        ],
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
    };
    APIUtil.getMethod = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve({ status: 200, data: responseData })
      );
    ProductAction.actionLabelList()(dispatch);

    //mocking labelslist API with response != 200
    APIUtil.getMethod = jest.fn().mockImplementation(() =>
      Promise.resolve({
        status: 500,
        data: { success: false, error: "Something went wrong" },
      })
    );
    ProductAction.actionLabelList()(dispatch);
  });

  it("test actionCreateCustomer function", () => {
    const fields = {
      firstname: "john",
      lastname: "will",
      email: "john@gmail.com",
      shippingZipCode: "22030",
      contact: "3012233222",
      shippingFirstname: "John",
      shippingLastname: "will",
      shippingAddressLine1: "222 la linda",
      shippingAddressLine2: "",
      shippingCountry: "us",
      shippingState: "california",
      shippingCity: "san marcos",
      shippingZipCode: "92078",
    };
    window.localStorage.setItem("accountId", "123234");
    //mocking createaddress API with response 200
    const responseData = {
      success: true,
      message: "Customer Addresses created successfully",
      data: {
        shipping: {
          id: "8a7f53897894acd00178cf635d2f0570",
          addressType: "SHIPPING_ADDRESS",
          name: "Jack William",
          addressLine1: "2735 190TH ST",
          addressLine2: "",
          city: "REDONDO BEACH",
          state: "CA",
          zip: "90278",
          country: "US",
          effectiveDt: "2021-04-14T07:58:18.926Z",
          effectiveEndDt: null,
          primaryAddr: true,
          createdDt: "2021-04-14T07:58:18.873Z",
          updatedDt: "2021-04-14T07:58:18.873Z",
        },
      },
    };
    APIUtil.postMethod = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve({ status: 200, data: responseData })
      );
    APIUtil.putMethod = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve({ status: 200, data: responseData })
      );
    ProductAction.actionCreateCustomer(fields, true, true)(dispatch);

    //mocking createaddress API with response != 200
    APIUtil.postMethod = jest.fn().mockImplementation(() =>
      Promise.resolve({
        status: 500,
        data: { success: false, error: "Something went wrong" },
      })
    );
    APIUtil.putMethod = jest.fn().mockImplementation(() =>
      Promise.resolve({
        status: 500,
        data: { success: false, error: "Something went wrong" },
      })
    );
    ProductAction.actionCreateCustomer(fields, true, true)(dispatch);

    //mocking updateaddress API with response 200
    APIUtil.postMethod = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve({ status: 200, data: responseData })
      );
    ProductAction.actionCreateCustomer(fields, true, false)(dispatch);

    //mocking updateaddress API with response != 200
    APIUtil.postMethod = jest.fn().mockImplementation(() =>
      Promise.resolve({
        status: 500,
        data: { success: false, error: "Something went wrong" },
      })
    );
    ProductAction.actionCreateCustomer(fields, true, false)(dispatch);

    window.localStorage.removeItem("accountId");
    //mocking updateaddress API with response = 200
    APIUtil.postMethod = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve({ status: 200, data: responseData })
      );
    ProductAction.actionCreateCustomer(fields, true, false)(dispatch);

    //mocking updateaddress API with response != 200
    APIUtil.postMethod = jest.fn().mockImplementation(() =>
      Promise.resolve({
        status: 500,
        data: { success: false, error: "Something went wrong" },
      })
    );
    ProductAction.actionCreateCustomer(fields, true, false)(dispatch);
  });

  it("test actiongetFilterData function", () => {
    //mocking filterlist API with response 200
    const responseData = {
      success: true,
      data: {
        Brand: [
          "BAKED",
          "BAKEN-ETS",
          "BARE",
          "CAP\u0027N CRUNCH",
          "CHEETOS",
          "CHESTER\u0027S",
          "DORITOS",
          "FRITO LAY",
          "FRITOS",
          "FUNYUNS",
          "Frito Lay Variety Pack",
          "GRANDMA\u0027S",
          "LAY\u0027S",
          "MATADOR",
          "MISS VICKIE\u0027S",
          "MUNCHIES",
          "MUNCHOS",
          "NUT HARVEST",
          "Off The Eaten Path",
          "PASTA RONI",
          "QUAKER",
          "RANCHERITOS",
          "RICE A RONI",
          "ROLD GOLD",
          "RUFFLES",
          "SABRITAS",
          "SABRITONES",
          "SANTITAS",
          "SIMPLY",
          "SPITZ",
          "STACY\u0027S",
          "Smartfood",
          "Sunchips",
          "TOSTITOS",
        ],
        "Snack Type": [
          "Cereal",
          "Cheese Puffs",
          "Cookies \u0026 Crackers",
          "Corn Chips",
          "Fruit \u0026 Veggie Chips",
          "Meat Snacks",
          "Multigrain Snacks",
          "Multipack",
          "Nuts \u0026 Seeds",
          "Other",
          "Pita Chips",
          "Popcorn",
          "Pork Rinds",
          "Potato Chips",
          "Pretzels",
          "Rice \u0026 Pasta",
          "Tortilla Chips",
        ],
        Flavor: [
          "Barbecue",
          "Cheesy",
          "Everything Else",
          "Plain",
          "Spicy",
          "Tangy",
        ],
        Occasion: [
          "Entertaining",
          "Gaming",
          "Movie Night",
          "On The Go",
          "Work/Study Break",
        ],
      },
    };
    APIUtil.postMethod = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve({ status: 200, data: responseData })
      );
    ProductAction.actiongetFilterData()(dispatch);

    //mocking filterlist API with response != 200
    APIUtil.postMethod = jest.fn().mockImplementation(() =>
      Promise.resolve({
        status: 500,
        data: { success: false, error: "Something went wrong" },
      })
    );
    ProductAction.actiongetFilterData()(dispatch);
  });

  it("test actionGetMinAmount function", () => {
    //mocking configlist API with response 200
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
        oktaRevokeAccessUrl:
          "https://secure.snacks.com/oauth2/default/v1/revoke",
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
    APIUtil.getMethod = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve({ status: 200, data: responseData })
      );
    ProductAction.actionGetMinAmount()(dispatch);

    //mocking configlist API with response != 200
    APIUtil.getMethod = jest.fn().mockImplementation(() =>
      Promise.resolve({
        status: 500,
        data: { success: false, error: "Something went wrong" },
      })
    );
    ProductAction.actionGetMinAmount()(dispatch);
  });

  it("test actionCheckProductAvailability function", () => {
    //mocking productinventory API with response 200
    const responseData = {
      success: true,
      message: "",
      offset: 0,
      limit: 72,
      totalProducts: 24,
      data: [
        {
          id: "129803",
          productId: "10248800",
          title: "Lay's Potato Chips Honey Barbecue Flavored 1 Oz",
          productDescription: "Lay's Honey BBQ Flavored Potato Chips",
          price: "0.50",
          currency: "$",
          likes: 12,
          image: "https://www.snacks.com/products/US/00028400376761_C1C1.png",
          brand: "LAY'S",
          displaySequence: "1",
          allergen: "",
          quantity: 0,
          size: "Small Bag",
          availableQty: "3693",
          productClass: "CLASS",
          recommendedProduct: null,
          productEnableFor: "Multipack",
          stateCode: [],
          stateName: [],
        },
        {
          id: "7847",
          productId: "10191800",
          title: "Fritos Original Corn Chips 1 Ounce Plastic Bag",
          productDescription: "Fritos Original Corn Chips",
          price: "0.50",
          currency: "$",
          likes: 12,
          image: "https://www.snacks.com/products/US/00028400040037_C1C1.png",
          brand: "FRITOS",
          displaySequence: "6",
          allergen: "",
          quantity: 0,
          size: "Small Bag",
          availableQty: "528",
          productClass: "CLASS",
          recommendedProduct: "0",
          productEnableFor: "Multipack",
          stateCode: [],
          stateName: [],
        },
      ],
    };
    APIUtil.postMethod = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve({ status: 200, data: responseData })
      );
    ProductAction.actionCheckProductAvailability()(dispatch);

    //mocking productinventory API with response != 200
    APIUtil.postMethod = jest.fn().mockImplementation(() =>
      Promise.resolve({
        status: 500,
        data: { success: false, error: "Something went wrong" },
      })
    );
    ProductAction.actionCheckProductAvailability()(dispatch);
  });

  it("test actionContentListPrivacyPolicy function", () => {
    //mocking privacypolicy API with response 200
    const responseData = {
      success: true,
      message: null,
      data: [
        {
          contentHeading: "PEPSICO UNITED STATES PRIVACY POLICY",
          content: "<p><strong>Updated: December 31, 2019</strong></p>\n\n<p>",
        },
      ],
    };
    APIUtil.postMethod = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve({ status: 200, data: responseData })
      );
    ProductAction.actionContentListPrivacyPolicy()(dispatch);

    //mocking privacypolicy API with response != 200
    APIUtil.postMethod = jest.fn().mockImplementation(() =>
      Promise.resolve({
        status: 500,
        data: { success: false, error: "Something went wrong" },
      })
    );
    ProductAction.actionContentListPrivacyPolicy()(dispatch);
  });

  it("test actionContactUs function", () => {
    //mocking contactus API with response 200
    const responseData = {
      success: true,
      message: null,
      data: [
        {
          contentHeading: "PEPSICO UNITED STATES PRIVACY POLICY",
          content: "<p><strong>Updated: December 31, 2019</strong></p>\n\n<p>",
        },
      ],
    };
    APIUtil.postMethod = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve({ status: 200, data: responseData })
      );
    ProductAction.actionContactUs()(dispatch);

    //mocking productinventory API with response != 200
    APIUtil.postMethod = jest.fn().mockImplementation(() =>
      Promise.resolve({
        status: 500,
        data: { success: false, error: "Something went wrong" },
      })
    );
    ProductAction.actionContactUs()(dispatch);
  });

  it("test actionGetCustomer function", () => {
    window.localStorage.setItem("accessToken", "kjebrfhe");
    //mocking getCustomer API with success response
    const responseData1 = {
      success: true,
      message: "Customer details retrieved successfully",
      data: {
        id: "8a7f54877894a0550178cf62e06c05a3",
        accountType: "D2C",
        createdDt: "2021-04-14T07:57:47Z",
        updatedDt: "2021-04-14T07:57:47Z",
        status: "ACTIVE",
        accountContacts: [
          {
            id: "8a7f54877894a0550178cf62e06c05a4",
            contactType: "CONSUMER",
            firstName: "Jack",
            lastName: "William",
            email: "robin2002@gmail.com",
            phone: "",
          },
        ],
        accountUsers: [
          {
            id: "8a7f54877894a0550178cf62e09d05a5",
            userId: "robin2002@gmail.com",
            createdDt: "2021-04-14T07:57:47Z",
            updatedDt: "2021-04-14T07:57:47Z",
          },
        ],
        accountAddresses: [
          {
            id: "8a7f53897894acd00178cf635d2f0570",
            addressType: "SHIPPING_ADDRESS",
            name: "Jack William",
            addressLine1: "2735 190TH ST",
            addressLine2: "",
            city: "REDONDO BEACH",
            state: "CA",
            zip: "90278",
            country: "US",
            effectiveDt: "2021-04-14T07:58:19Z",
            effectiveEndDt: null,
            primaryAddr: true,
          },
        ],
        locationId: "12212",
        shippingZipcode: "90278",
      },
    };
    APIUtil.getMethod = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve({ status: 200, data: responseData1 })
      );
    ProductAction.actionGetCustomer()(dispatch);

    //mocking getCustomer API with error response
    const responseData2 = {
      success: false,
      message: "Expired token",
      data: {
        id: "8a7f54877894a0550178cf62e06c05a3",
        accountType: "D2C",
        createdDt: "2021-04-14T07:57:47Z",
        updatedDt: "2021-04-14T07:57:47Z",
        status: "ACTIVE",
        accountContacts: [
          {
            id: "8a7f54877894a0550178cf62e06c05a4",
            contactType: "CONSUMER",
            firstName: "Jack",
            lastName: "William",
            email: "robin2002@gmail.com",
            phone: "",
          },
        ],
        accountUsers: [
          {
            id: "8a7f54877894a0550178cf62e09d05a5",
            userId: "robin2002@gmail.com",
            createdDt: "2021-04-14T07:57:47Z",
            updatedDt: "2021-04-14T07:57:47Z",
          },
        ],
        accountAddresses: [
          {
            id: "8a7f53897894acd00178cf635d2f0570",
            addressType: "SHIPPING_ADDRESS",
            name: "Jack William",
            addressLine1: "2735 190TH ST",
            addressLine2: "",
            city: "REDONDO BEACH",
            state: "CA",
            zip: "90278",
            country: "US",
            effectiveDt: "2021-04-14T07:58:19Z",
            effectiveEndDt: null,
            primaryAddr: true,
          },
        ],
        locationId: "12212",
        shippingZipcode: "90278",
      },
    };
    APIUtil.getMethod = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve({ status: 200, data: responseData2 })
      );
    ProductAction.actionGetCustomer()(dispatch);

    //mocking getCustomer API with error response
    const responseData3 = {
      success: false,
      message: "Something went wrong",
      data: {
        id: "8a7f54877894a0550178cf62e06c05a3",
        accountType: "D2C",
        createdDt: "2021-04-14T07:57:47Z",
        updatedDt: "2021-04-14T07:57:47Z",
        status: "ACTIVE",
        accountContacts: [
          {
            id: "8a7f54877894a0550178cf62e06c05a4",
            contactType: "CONSUMER",
            firstName: "Jack",
            lastName: "William",
            email: "robin2002@gmail.com",
            phone: "",
          },
        ],
        accountUsers: [
          {
            id: "8a7f54877894a0550178cf62e09d05a5",
            userId: "robin2002@gmail.com",
            createdDt: "2021-04-14T07:57:47Z",
            updatedDt: "2021-04-14T07:57:47Z",
          },
        ],
        accountAddresses: [
          {
            id: "8a7f53897894acd00178cf635d2f0570",
            addressType: "SHIPPING_ADDRESS",
            name: "Jack William",
            addressLine1: "2735 190TH ST",
            addressLine2: "",
            city: "REDONDO BEACH",
            state: "CA",
            zip: "90278",
            country: "US",
            effectiveDt: "2021-04-14T07:58:19Z",
            effectiveEndDt: null,
            primaryAddr: true,
          },
        ],
        locationId: "12212",
        shippingZipcode: "90278",
      },
    };
    APIUtil.getMethod = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve({ status: 200, data: responseData3 })
      );
    ProductAction.actionGetCustomer()(dispatch);

    window.localStorage.removeItem("accessToken");
    //mocking getCustomer API with response != 200
    APIUtil.getMethod = jest.fn().mockImplementation(() =>
      Promise.resolve({
        status: 500,
        data: { success: false, error: "Something went wrong" },
      })
    );
    ProductAction.actionGetCustomer()(dispatch);
  });

  it("test actionCreateProfile function", () => {
    //mocking createprofile API with response 200
    const responseData = {
      success: true,
      message: "Consumer Profile created successfully for robin2004@gmail.com",
      data: {
        id: "8a7fc0ab7894a7c80178cf914e39059d",
        accountType: "D2C",
        createdDt: "2021-04-14T08:48:29.752Z",
        updatedDt: "2021-04-14T08:48:29.752Z",
        status: "ACTIVE",
        accountContacts: [
          {
            id: "8a7fc0ab7894a7c80178cf914e39059e",
            contactType: "CONSUMER",
            firstName: "Robin",
            lastName: "BT",
            email: "robin2004@gmail.com",
            phone: "",
          },
        ],
        accountUsers: [
          {
            id: "8a7fc0ab7894a7c80178cf914e88059f",
            userId: "robin2004@gmail.com",
            createdDt: "2021-04-14T08:48:29.832Z",
            updatedDt: "2021-04-14T08:48:29.832Z",
          },
        ],
        accountAddresses: [],
      },
    };
    APIUtil.postMethod = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve({ status: 200, data: responseData })
      );
    const data = {};
    ProductAction.actionCreateProfile(data)(dispatch);
  });

  it("test LoginAuth function", () => {
    const response = { status: "SUCCESS" };
    ProductAction.LoginAuth(response)(dispatch);
  });

  it("test LogOut function", () => {
    ProductAction.LogOut()(dispatch);
  });

  it("test fetchOrderDetails function", () => {
    const accessToken = { accessToken: "hbwer3jgv43gjv3gv" };
    window.localStorage.setItem("accessToken", JSON.stringify(accessToken));
    //mocking OrderHistory API with response 200
    const responseData = {
      success: true,
      message: "",
      data: [
        {
          orderId: "1617705864260",
          orderDate: "2021-04-06T10:44:24.000000Z",
          subTotalPrice: 18.95,
          totalPrice: 23.94,
          shippingCharges: 4.99,
          customerEmail: "walter@gmail.com",
          orderSate: "Submitted",
          currency: "$",
          orderImage: "",
          trackingId: "",
          shipping: {
            shippingFirstname: "Walter",
            shippingLastname: "John",
            shippingCountry: "US",
            shippingState: "NY",
            shippingCity: "CHAMPLAIN",
            shippingZipCode: "12919",
            shippingAddressLine1: "205 W SERVICE RD",
            shippingAddressLine2: "",
          },
          items: [
            {
              productId: "08103100",
              title: "Lay's Potato Chips Barbecue Flavored 7.75 Oz",
              quantity: 5,
              totalPrice: 18.95,
              image:
                "https://share.brandcentral.pepsico.com/products/US/00028400199612_C1C1.png",
              productDescription: "Lay's Barbecue Flavored Potato Chips...",
              price: "3.79",
              currency: "$",
              likes: 12,
              brand: ["LAY'S"],
              displaySequence: "",
              size: "Big Bag",
              availableQty: "",
              isHolidayShopProduct: false,
              productClass: "SNACK FOODS",
              productEnableFor: "OfficeSnacks",
              stateCode: [],
              stateName: [],
            },
          ],
          multipack: [],
        },
      ],
    };
    APIUtil.postMethod = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve({ status: 200, data: responseData })
      );
    ProductAction.fetchOrderDetails()(dispatch);

    APIUtil.postMethod = jest.fn().mockImplementation(() =>
      Promise.resolve({
        status: 500,
        data: { success: false, error: "Something went wrong" },
      })
    );
    ProductAction.fetchOrderDetails("brand")(dispatch);
  });

  it("test actionCouponCode function", () => {
    //mocking validatevoucher API with response 200
    const responseData = {
      success: true,
      message: "Coupon code applied.",
      data: [],
    };
    APIUtil.postMethod = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve({ status: 200, data: responseData })
      );
    ProductAction.actionCouponCode()(dispatch);

    APIUtil.postMethod = jest.fn().mockImplementation(() =>
      Promise.resolve({
        status: 500,
        data: { success: false, error: "Something went wrong" },
      })
    );
    ProductAction.actionCouponCode("brand")(dispatch);
  });

  it("test actionFaqCategory function", () => {
    //mocking faqcategory API with response 200
    const responseData = {
      success: true,
      message: "",
      data: [
        { id: 126839, name: "Ordering \u0026 Shipping" },
        { id: 126851, name: "Password" },
        { id: 126853, name: "Returns" },
        { id: 126856, name: "Shopping Tools \u0026 Tips" },
      ],
    };
    APIUtil.getMethod = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve({ status: 200, data: responseData })
      );
    ProductAction.actionFaqCategory()(dispatch);

    APIUtil.getMethod = jest.fn().mockImplementation(() =>
      Promise.resolve({
        status: 500,
        data: { success: false, error: "Something went wrong" },
      })
    );
    ProductAction.actionFaqCategory()(dispatch);
  });

  it("test actionFaqQuestions function", () => {
    //mocking faqquestions API with response 200
    const responseData = {
      success: true,
      message: "",
      data: {
        "Ordering \u0026 Shipping": [
          {
            question: "Can I change something on my order after I submit?",
            answer:
              "\u003Cp\u003EUnfortunately, an order cannot be changed once it has been submitted. Please contact our \u003Ca href=\u0022https://ospep-dev.azurefd.net/contactform\u0022 tabindex=\u0022-1\u0022\u003ECustomer Service\u003C/a\u003E, if you have any questions regarding your order.\u003C/p\u003E\n",
            id: 126840,
          },
          {
            question:
              "Can I combine different types of payment when paying for my order?",
            answer:
              "\u003Cp\u003E\u003Cspan style=\u0022font-size:16px\u0022\u003E\u003Cspan style=\u0022color:#3c3c3c\u0022\u003E\u003Cspan style=\u0022font-family:Poppins,serif\u0022\u003ECurrently, we are not able to accept various forms of payment for a single order. To keep the purchasing experience simple and efficient for you, all orders are processed using a single payment method (either debit or credit).\u003C/span\u003E\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\n",
            id: 126841,
          },
          {
            question: "Can products be shipped to my country?",
            answer:
              "\u003Cp\u003EAt present, Frito-Lay products are available for residential delivery only in the US (excluding Alaska, Hawaii, and Puerto Rico). Otherwise, you can continue to find your favorite brands at your local retailers.\u003C/p\u003E\n",
            id: 126842,
          },
          {
            question: "Do you deliver to my state?",
            answer:
              "\u003Cp\u003ECurrently, we deliver to all lower 48 states, but we are unable to deliver to any P.O. boxes. We do not currently ship to Alaska, Hawaii, or International locations.\u003C/p\u003E\n",
            id: 126843,
          },
          {
            question: "How are taxes calculated?",
            answer:
              "\u003Cp\u003ETax rates are calculated based on the state the order is shipped to.\u003C/p\u003E\n",
            id: 126849,
          },
          {
            question: "How do I become a wholesaler?",
            answer:
              "\u003Cp\u003ETo order Frito-Lay products for re-sale, please visit our Retailer eCommerce site at\u0026nbsp;\u003Ca href=\u0022https://www.fls2u.com/\u0022 tabindex=\u0022-1\u0022 target=\u0022_blank\u0022\u003E\u003Cu\u003Ewww.fls2u.com\u003C/u\u003E\u003C/a\u003E. You can sign-up as retailer and order products shipped directly to your store.\u003C/p\u003E\n",
            id: 126850,
          },
          {
            question: "How do I track my order?",
            answer:
              "\u003Cp\u003EYou will also get a shipment confirmation email with tracking information as soon as your order is shipped. Orders are typically shipped 2-3 business days after order placement.\u003C/p\u003E\n\n\u003Cp\u003E\u0026nbsp;\u003C/p\u003E\n\n\u003Cp\u003EIf you have questions, please \u003Ca href=\u0022https://ospep-dev.azurefd.net/contactform\u0022 tabindex=\u0022-1\u0022\u003Econtact us\u003C/a\u003E and we will be in touch with you shortly.\u003C/p\u003E\n\n\u003Cp\u003E\u0026nbsp;\u003C/p\u003E\n\n\u003Cp\u003ENote: We are currently experiencing shipping delays due to COVID-19. All orders are processed in the order that they are received, and we are doing our best to ship all orders on time. Thank you for your patience!\u003C/p\u003E\n",
            id: 126846,
          },
          {
            question: "How will I know if my order shipped?",
            answer:
              "\u003Cp\u003EYou will receive an email with tracking information as soon as your order is shipped. If you have any questions, please submit a form regarding order shipment information.\u003C/p\u003E\n",
            id: 126845,
          },
          {
            question: "How will I know if my order was submitted?",
            answer:
              "\u003Cp\u003EWithin minutes of placing your order, you will receive an email confirmation that your order has been accepted. Please contact us if you have not received this email.\u003C/p\u003E\n",
            id: 126844,
          },
          {
            question: "What are your shipping prices?",
            answer:
              "\u003Cp\u003EFor a limited time, we are offering free shipping for orders over $10!\u003C/p\u003E\n",
            id: 126848,
          },
          {
            question: "Why did I not get everything I ordered?",
            answer:
              "\u003Cp\u003EWe strive to make you smile with every single product you buy from us. While not common, we may sometimes ship your order without an item from your order. However, we will only bill you for the items we have shipped.\u003C/p\u003E\n\n\u003Cp\u003EIf you have any issues with billing, please \u003Ca href=\u0022https://ospep-dev.azurefd.net/contactform\u0022 tabindex=\u0022-1\u0022\u003Econtact us\u0026nbsp;\u003C/a\u003E and one of our representatives will be happy to address your concerns.\u003C/p\u003E\n",
            id: 126847,
          },
        ],
      },
    };
    APIUtil.postMethod = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve({ status: 200, data: responseData })
      );
    ProductAction.actionFaqQuestions()(dispatch);

    APIUtil.postMethod = jest.fn().mockImplementation(() =>
      Promise.resolve({
        status: 500,
        data: { success: false, error: "Something went wrong" },
      })
    );
    ProductAction.actionFaqQuestions()(dispatch);
  });

  it("test actionRemoveCouponCode function", () => {
    //mocking removetoken API with response 200
    const responseData = {
      success: true,
      message: "Token removed from cart successfully.",
      data: [],
    };
    APIUtil.postMethod = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve({ status: 200, data: responseData })
      );
    ProductAction.actionRemoveCouponCode()(dispatch);

    APIUtil.postMethod = jest.fn().mockImplementation(() =>
      Promise.resolve({
        status: 500,
        data: { success: false, error: "Something went wrong" },
      })
    );
    ProductAction.actionRemoveCouponCode()(dispatch);
  });
});
