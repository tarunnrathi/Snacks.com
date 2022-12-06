import {
  sendAmplitudeData,
  setAmplitudeUserId,
  regenerateAmplitudeDeviceId,
  logRevenueData,
} from "./ConfigAmplitude";
import UrlConstants from "./../UrlConstants";

const defaultParam = {
  LanguagePreference: "en",
  Version: UrlConstants.BuildVersion,
  DomainName: "US site",
  LocationId: localStorage.getItem("_lo_No") || ""
};

export const ViewedPage = (pageName, orderInfo) => {
  sendAmplitudeData(`Viewed_${pageName}`, {
    ...defaultParam,
    PageTitle: pageName,
    OrderId: (orderInfo && orderInfo.orderId) || "",
    TotalPrice: (orderInfo && orderInfo.totalPrice) || "",
    OrderType: (orderInfo && orderInfo.orderType) || "",
    TotalQty: (orderInfo && orderInfo.totalQty) || "",
    CartId: sessionStorage.getItem("customerSessionId") || "",
    SourceWebsite: UrlConstants.isTastyRewards ? "Blended site" : "Snacks site",
    details: typeof orderInfo !== 'undefined' && orderInfo.details || ""
  });
};

export const SelectedLinkItem = (linkItem, Method, ProductInfo) => {
  sendAmplitudeData(`Selected_${linkItem}`, {
    Method,
    ItemName: (ProductInfo && ProductInfo.itemName) || "",
    ProductId: (ProductInfo && ProductInfo.productId) || "",
    PageTitle: (ProductInfo && ProductInfo.PageTitle) || "",
    DisplaySequence: (ProductInfo && ProductInfo.displaySequence) || "",
    SourceWebsite: UrlConstants.isTastyRewards ? "Blended site" : "Snacks site"
  });
};

export const SelectedSubCategory = (linkItem, categoryInfo) => {
  sendAmplitudeData(`Selected_${linkItem}`, {
    Method: (categoryInfo && categoryInfo.Method) || "",
    PageTitle: (categoryInfo && categoryInfo.PageTitle) || "",
    subCategory: (categoryInfo && categoryInfo.subCategory) || "",
    category: (categoryInfo && categoryInfo.category) || "",
    SourceWebsite: UrlConstants.isTastyRewards ? "Blended site" : "Snacks site"
  });
};

export const SearchEvent = (SearchString, Method, SearchInfo) => {
  sendAmplitudeData(`Search_String`, {
    SearchString,
    Method,
    PageTitle: SearchInfo.PageTitle || "",
    SourceWebsite: UrlConstants.isTastyRewards ? "Blended site" : "Snacks site"
  });
};

export const ClickedButton = (btnName, Method, ProductInfo) => {
  sendAmplitudeData(`Clicked_${btnName}`, {
    Method,
    ProductId: (ProductInfo && ProductInfo.productId) || "",
    MixId: (ProductInfo && ProductInfo.mixId) || "",
    PageTitle: (ProductInfo && ProductInfo.PageTitle) || "",
    CartId: sessionStorage.getItem("customerSessionId") || "",
    OrderId: (ProductInfo && ProductInfo.orderId) || "",
    ContactSubject: (ProductInfo && ProductInfo.subject) || "",
    ContactName: (ProductInfo && ProductInfo.name) || "",
    ContactEmail: (ProductInfo && ProductInfo.email) || "",
    ContactPhone: (ProductInfo && ProductInfo.phoneNo) || "",
    details: (ProductInfo && ProductInfo.details) || "",
    SourceWebsite: UrlConstants.isTastyRewards ? "Blended site" : "Snacks site"
  });
};

export const ClickedBanner = (buttonText, Method, Where,sectionDescription) => {
  sendAmplitudeData("Clicked_Banner", {
    BannerType: buttonText,
    Method,
    Where,
    Description: sectionDescription,
    SourceWebsite: UrlConstants.isTastyRewards ? "Blended site" : "Snacks site"
  });
};

export const ClickedFavoriteSnacks = (Text, PageTitle, Where) => {
  sendAmplitudeData("Home Page – Value Proposition Clicked", {
    FavoriteSnacks: Text,
    PageTitle: PageTitle,
    Where,
    SourceWebsite: UrlConstants.isTastyRewards ? "Blended site" : "Snacks site"
  });
};

export const UserInfo = (UserId) => {
  setAmplitudeUserId(UserId);
  regenerateAmplitudeDeviceId();
};

export const ProductListFilters = (filter) => {
  sendAmplitudeData(`Applied_Filters`, {
    BrandFilters: filter["Brand"] || "",
    SnackTypeFilters: filter["Snack Type"] || "",
    FlavorFilters: filter["Flavor"] || "",
    OccasionFilters: filter["Occasion"] || "",
    GlobalSearchString: filter["globalSearch"] || "",
    SourceWebsite: UrlConstants.isTastyRewards ? "Blended site" : "Snacks site"
  });
};

export const AddRemoveProductToCart = (ProductInformation) => {
  const {
    Method,
    PageTitle,
    productId,
    productDescription,
    price,
    shortDescription,
    quantity,
    size,
    ProductMarker,
    displaySequence,
    ProductType,
  } = ProductInformation;
  sendAmplitudeData(`Clicked_AddToCart`, {
    ProductId: productId,
    ProductSize: size,
    ProductMarker,
    ProductType,
    ProductPrice: price,
    PageTitle,
    Quantity: quantity,
    Method,
    DisplaySequence: displaySequence,
    ProductName: productDescription || shortDescription,
    SourceWebsite: UrlConstants.isTastyRewards ? "Blended site" : "Snacks site"
  });
};

export const RevenueData = (productId, price, qty) => {
  logRevenueData(productId, price, qty);
};

export const PurchaseCartItems = (OrderId, cartInfo) => {
  sendAmplitudeData("Purchased_CartItems", {
    OrderId: OrderId || sessionStorage.getItem("orderNumber"),
    CartId: sessionStorage.getItem("customerSessionId") || "",
    ProductPrice: cartInfo.price,
    Quantity: cartInfo.qty,
    ProductId: cartInfo.productId,
    ProductName: cartInfo.name,
    SourceWebsite: UrlConstants.isTastyRewards ? "Blended site" : "Snacks site"
  });
};

export const AddressHandling = (AddressInfo) => {
  sendAmplitudeData(`Address_Handling`, {
    AddressDescription: AddressInfo.msg || "",
    AddressType: AddressInfo.type || "",
    Status: AddressInfo.status || "",
    PageTitle: AddressInfo.PageTitle || "",
    FullAddress: AddressInfo.address || "",
    SourceWebsite: UrlConstants.isTastyRewards ? "Blended site" : "Snacks site"
  });
};

export const APIERROR = (apiResponse) => {
  const { error } = apiResponse;

  sendAmplitudeData(`Timeout`, {
    Status: (error.response && error.response.status) || "",
    Error: error || "No Error Tracked",
    ApiLink: (error.config && error.config.url) || "Unable to get the link",
    SourceWebsite: UrlConstants.isTastyRewards ? "Blended site" : "Snacks site"
  });
};

export const PaymentHandling = (payment) => {
  sendAmplitudeData(`Payments`, {
    OrderId: payment.orderId || sessionStorage.getItem("orderNumber"),
    CartId: payment.cartId || sessionStorage.getItem("customerSessionId"),
    PaymentMsg: payment.paymentMsg || "",
    SourceWebsite: UrlConstants.isTastyRewards ? "Blended site" : "Snacks site",
    BillingAddress: `${payment.billingAddressLine1}, ${
      payment.billingAddressLine2 || ""
    },
      ${payment.billingCountry},
    ${payment.billingState},
    ${payment.billingCity},
    ${payment.billingZipCode},`,
    ShippingAddress: `${payment.shippingAddressLine1}, ${
      payment.shippingAddressLine2 || ""
    },
      ${payment.shippingCountry},
    ${payment.shippingState},
    ${payment.shippingCity},
    ${payment.shippingZipCode},`,
    Status: payment.status || "",
    PageTitle: payment.PageTitle || "",
  });
};
