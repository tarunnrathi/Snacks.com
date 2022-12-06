class UrlConstants {
  constructor() {
    //Application Site URL
    //this.SiteUrl = process.env.REACT_APP_SITE_URL + "/#";
    this.protocol = `${window.location.protocol}//`;
    this.host = this.protocol + window.location.host;
    this.SiteUrl = this.host;

    this.isTastyRewards =
      window.location.hostname === "shop-tastyrewards-dev.azurefd.net" ||
      window.location.hostname === "shop.tastyrewards.com";

    /* API Host URL */
    //this.pimHostUrl = process.env.REACT_APP_OFFICE_SNACKS_PIMCORE;

    this.pimHost =
      window.location.hostname === "localhost"
        ? this.isTastyRewards
          ? "https://shop-tastyrewards-dev.azurefd.net"
          : "https://snackapp-admin-develop.azurefd.net"
        : this.protocol + window.location.hostname;

    this.pimHostUrl = `${this.pimHost}/webservices/`;
    this.cybersourceBackResponse = this.pimHost + "/officesnacks/backresponse";
    this.cachedUrl = `${this.pimHost}/services/`;
    this.dopHostUrl = `${this.pimHost}/v2/dopservice/`;

    this.dopHostUrlV3 = `${this.pimHost}/v3/dopservice/b2c/`;
    //this.PimAPIKey = process.env.REACT_APP_OFFICE_SNACKS_PIMAPIKEY;

    /* Snacks URL */
    this.snacksUrl =
      window.location.hostname === "localhost" ||
      window.location.hostname === "ospep-develop.azurefd.net" ||
      window.location.hostname === "shop-tastyrewards-dev.azurefd.net"
        ? "https://ospep-develop.azurefd.net"
        : "https://snacks.com";

    /* Tasty Reward URL */
    this.tastyRewardUrl =
      window.location.hostname === "localhost" ||
      window.location.hostname === "shop-tastyrewards-dev.azurefd.net"
        ? "https://tastyrewards-staging.bamstrategy.com"
        : "https://www.tastyrewards.com";

    this.shopTastyRewardsForgotPasswordUrl =
      window.location.host === "www.snacks.com"
        ? "https://shop.tastyrewards.com/forgotpassword"
        : "https://shop-tastyrewards-dev.azurefd.net/forgotpassword";

    /* API Host URL */
    //this.pimHostUrl = process.env.REACT_APP_OFFICE_SNACKS_PIMCORE;

    //PimCore API Endpoints
    this.ProductsUrl = `${this.pimHostUrl}productgrouplist`; // productlist
    this.ProductDetailUrl = `${this.pimHostUrl}productdetail`;
    this.BundleDetailUrl = `${this.dopHostUrl}bundledetail`;
    this.OrderHistory = `${this.pimHostUrl}orderhistory`;
    this.PopularProducts = `${this.pimHostUrl}popularproductgroups`; // popularproducts
    this.SubmitOrder = `${this.pimHostUrl}submitorder`;
    this.FilterProducts = `${this.pimHostUrl}filterlist`;
    this.ZipValidation = `${this.pimHostUrl}zipcodevalidate`;
    this.MinAmount = `${this.cachedUrl}configlist`;
    this.contentList = `${this.cachedUrl}contentlist`;
    this.LabelsList = `${this.cachedUrl}labelslist`;
    this.CreateCustomer = `${this.pimHostUrl}createcustomer`;
    this.CreateAddress = `${this.pimHostUrl}createaddress`;
    this.ProductInventory = `${this.pimHostUrl}cartreview/productinventory`;
    this.PaymentStatus = `${this.pimHostUrl}paymentstatus`;
    this.contactus = `${this.pimHostUrl}contactus`;
    this.orderTax = `${this.pimHostUrl}ordertax`;
    this.handshaking = `${this.pimHostUrl}handshaking`;
    this.forgotpassword = `${this.pimHostUrl}forgotpassword`;
    this.verifyemailfortastyrewards = `${this.pimHostUrl}verifyemailfortastyrewards`;
    this.resetpassword = `${this.pimHostUrl}resetpassword`;
    this.GetCustomer = `${this.pimHostUrl}getcustomer`;
    this.EmailValidate = `${this.pimHostUrl}emailvalidate`;
    this.updateAccount = `${this.pimHostUrl}updateaccount`;
    this.updateAddress = `${this.pimHostUrl}updateaddress`;
    this.deleteAddress = `${this.pimHostUrl}deleteaddress`;
    this.changePassword = `${this.pimHostUrl}changepassword`;
    this.CreateProfile = `${this.pimHostUrl}createprofile`;
    this.ShopByCategory = `${this.pimHostUrl}categoryfilters`;
    this.FavouriteProducts = `${this.pimHostUrl}favouriteproducts`;
    this.geoIp = `${this.pimHostUrl}geoIp`;
    this.CouponCode = `${this.pimHostUrl}validatevoucher`;
    this.RemovecouponCode = `${this.pimHostUrl}removetoken`;
    this.FaqCategory = `${this.pimHostUrl}faqcategory`;
    this.FaqQuestions = `${this.pimHostUrl}faqquestion`;
    this.multipackPopularSnacks = `${this.pimHostUrl}multipackpopularproductlist`;
    this.multipackViewAllSnacks = `${this.pimHostUrl}multipackproductlist`;
    this.multipackConfig = `${this.pimHostUrl}multipacklist`;
    this.multipackDetailUrl = `${this.pimHostUrl}multipackdetail`;
    this.shippingFee = `${this.pimHostUrl}shippingcharge`;
    this.holidayShop = `${this.pimHostUrl}merchandisegrouplist`;
    this.holidayShopProductDetail = `${this.pimHostUrl}merchandiseproductdetail`;
    this.captureContextUrl = `${this.pimHostUrl}capturecontext`;
    this.Labeltranslation = `${this.pimHostUrl}labeltranslation`;
    this.newSubmitOrder = `${this.pimHostUrl}submittedorder`;
    this.deleteCard = `${this.pimHostUrl}deletepaymentaccount`;
    this.notifyMe = `${this.pimHostUrl}notifyme`;
    this.checkItemAvailability = `${this.dopHostUrl}checkitemsavailability`;
    this.mixpackList = `${this.pimHostUrl}mixpacklist`;
    this.createMixpack = `${this.pimHostUrl}createmixpack`;
    this.viewMixpack = `${this.pimHostUrl}viewmixpack`;
    this.updateMixpack = `${this.pimHostUrl}updatemixpack`;
    this.deleteMixpack = `${this.pimHostUrl}deletemixpack`;
    this.giftCardList = `${this.pimHostUrl}giftcardlist`;
    this.verifyEmailForTastyrewards = `${this.pimHostUrl}verifyemailfortastyrewards`;
    this.snacksOptin = "100038489_SNACKS_NEWSLETTER_SNACKSNEWS_20220217";
    this.tastyRewardsOptin = "100022221_PTR_NEWSLETTER_PEPSICOTRNEWS_20200819";

    /* New EndPoint for redesign */
    this.categoryfilters = `${this.dopHostUrlV3}navigationlist`;
    this.allBrandsList = `${this.dopHostUrlV3}allbrands`;
    this.bannerlist = `${this.dopHostUrlV3}home/bannerlist`;
    this.homeData = `${this.dopHostUrlV3}home/datalist`;
    this.bestsellerList = `${this.dopHostUrlV3}home/bestsellerlist`;
    this.popularProductsList = `${this.dopHostUrlV3}popularproducts`;
    this.redesignProductDetailUrl = `${this.dopHostUrlV3}productdetail`;
    this.plpFiltersList = `${this.dopHostUrlV3}plpfilterlist`;
    this.productGroupList = `${this.dopHostUrlV3}productgrouplist`;

    // Qty available msg
    this.qtyAvailableMsg =
      "The maximum quantity you can order of this item is ##QTY##.";
    this.multipackAvailableQty =
      "The maximum quantity you can order of this variety pack item is ##QTY##.";
    this.errorMsg = "Something went to wrong on server, please try again";
    this.poBoxErrorMsg =
      "Cannot ship to P.O. Box. Please provide another ##ADDTYPE## address.";
    this.addressInvalid =
      "Please check that your city, state and zip code match for your address.";
    this.cityApoMessage =
      "Cannot ship to P.O. Box. Please provide another shipping address.";
    this.forgotPasswordSuccMsg =
      "An email has been sent to your account to reset your password.";
    this.userAccountLocked =
      "Your account has been locked due to too many incorrect password attempts";
    this.marketPlaceProductCheckoutErrorMsg =
      "Some of the items in your cart not available for selected state. Please review your cart.";
    this.outOfStockproductCheckoutErrorMsg =
      "Some of the items in your cart are not in stock for selected location. Please review your cart.";
    this.outOfStockMPproductCheckoutErrorMsg =
      "Some of the items in variety pack are not in stock for selected location. Please review your cart.";
    this.noCartItemErrorMsg =
      "No items in your cart. Select at least 1 item to check out.";
    this.outOfStockMPSubItemCheckoutErrorMsg =
      "This item is not in stock for selected location.";
    this.outOfStockMPCheckoutErrorMsg =
      "This variety pack is not in stock for selected location. Please remove it, or try different zipcode.";
    this.formFieldsInvalidMessage =
      "Please fill out all mandatory fields before proceeding.";
    this.outOfStockBundleproductCheckoutErrorMsg =
      "Some of the items in bundle are not in stock for selected location. Please review your cart.";
    this.noShippingStates = ["hi", "ak"];
    this.productsLimit = 36;
    this.productsMobileLimit = 18;
    this.multipackProductsLimit = 72;
    this.popularProductsLimit = 8;
    this.showSearchForFilterLimit = 5;
    this.showMoreSubFiltersLimit = 10;
    this.bestSellingProductsLimit = 4;
    this.searchKey = "globalSearch";
    this.searchKeyTimeout = "500";
    this.titleTag = "Snacks.com";
    this.isTaxFree = false;
    this.defaultCountry = "US";
    this.defaultDropShopReleaseDate = "April 1, 2021 00:00:00";
    this.englishLanguage = "en-us";
    this.spanishLanguage = "es";
    this.BuildVersion = `${this.titleTag}-${this.defaultCountry}-5.9.10`;
  }
}
export default new UrlConstants();
