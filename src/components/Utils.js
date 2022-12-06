import React from "react";
import { Link } from "react-router-dom";
//This file will only have functions which are commonly used.
import { BANNER_CONFIG_LIST } from "../config/constants/content.constant";

import { ViewedPage } from "../config/amplitude/SnacksAmplitude";

// Function For Update Price
export function updatePrice(response) {
  sessionStorage.setItem(
    "totalAmount",
    response.data.data.tax.totalAmount || sessionStorage.getItem("total") || 0
  );
  sessionStorage.setItem("tax", response.data.data.tax.totalTaxAmount);
  sessionStorage.setItem("total", response.data.data.tax.netTotalAmount);
  sessionStorage.setItem("subtotal", response.data.data.tax.totalGrossAmount);
  sessionStorage.setItem(
    "totalDiscount",
    response.data.data.tax.totalDiscount || 0
  );
}

/* CONVERT HEXA COLOR TO RGBA */
export function hexToRgbA(hex) {
  let c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("");
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = "0x" + c.join("");
    return (
      "rgba(" + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") + ",0.7)"
    );
  }
  throw new Error("Bad Hex");
}

/* Delete Cart */
export function deleteCart(productId, cartItems) {
  cartItems = cartItems.filter(function (item) {
    return item.productId !== productId;
  });
  sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
}

export function updateCart(productId, cartItems) {
  cartItems = cartItems.filter(function (item) {
    if (item.productId == productId) {
      item.quantity = item.quantity + 1;
    }
    return item;
  });
  sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
}

export function reduceCart(productId, cartItems) {
  cartItems = cartItems.filter(function (item) {
    if (item.productId == productId) {
      item.quantity = item.quantity - 1;
    }
    return item;
  });
  sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
}

export function deepLinkValidation(location) {
  const staticCatList = ["Brand", "Snack Type", "Flavor", "Occasion"];
  if (location && location.pathname === "/productlist") {
    const { search } = location;
    const filterList = search.split("&&");

    if (search.includes("deepLink") && filterList[0] === "?deepLink=true") {
      let filterArray = [];
      filterList.forEach((filter) => {
        if (filter !== "?deepLink=true") {
          const filterSplit = filter.split("=");
          const category = decodeURI(filterSplit[0]);
          const subCategory = decodeURI(filterSplit[1]).split(",");
          staticCatList.includes(category) &&
            (filterArray = [
              ...filterArray,
              {
                categoryId: category,
                subCategoryIdList: subCategory,
              },
            ]);
        }
      });
      filterArray.length > 0 &&
        sessionStorage.setItem("selectedCategory", JSON.stringify(filterArray));
    }
  }
}

export function lineItemsListObject(cartItems) {
  let lineItemsList = {},
    products = [],
    multipack = [],
    bundle = [];
  cartItems.map((item) => {
    if (item.multipack) {
      let list = [];
      item.multipackList.map(
        (subItem) =>
          (list = [
            ...list,
            {
              lineItemNumber: cartItems.length,
              productId: subItem.productId,
              quantity: subItem.quantity,
              unitPrice: subItem.price,
              id: subItem.id,
              total: subItem.quantity * subItem.price,
              name: subItem.currentTitle || subItem.productDescription,
            },
          ])
      );
      multipack = [
        ...multipack,
        {
          multipackId: item.productId,
          quantity: item.quantity,
          multipackList: list,
          zNonSku: item.zNonSku,
        },
      ];
    } else if (item.bundleId) {
      let list = [];
      item.products.map(
        (subItem) =>
          (list = [
            ...list,
            {
              lineItemNumber: cartItems.length,
              productId: subItem.productId,
              quantity: subItem.quantity,
              unitPrice: subItem.price,
              id: subItem.id,
              total: subItem.quantity * subItem.price,
              name: subItem.title || subItem.shortDescription,
            },
          ])
      );
      bundle = [
        ...bundle,
        {
          bundleId: item.bundleId,
          quantity: item.quantity,
          bundleList: list,
          virtualSku: item.virtualSku,
        },
      ];
    } else {
      products = [
        ...products,
        {
          lineItemNumber: cartItems.length,
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.currentPrice || item.price,
          id: item.id,
          total: item.quantity * (item.currentPrice || item.price),
          name: item.currentTitle || item.productDescription,
          preOrder: item.preOrder ? item.preOrder : false,
        },
      ];
    }
  });

  lineItemsList = { ...lineItemsList, products, multipack, bundle };
  return lineItemsList;
}

export function getOrderTaxPayload(values, isAddress) {
  let cartItems = sessionStorage.getItem("cartItems")
    ? JSON.parse(sessionStorage.getItem("cartItems"))
    : [];
  let country = "",
    state = "",
    city = "",
    zipCode = "",
    addressLine1 = "",
    addressLine2 = "",
    payload = {};
  if (values) {
    zipCode = values.shippingZipCode;
    state = values.shippingState;
    city = values.shippingCity;
    country = values.shippingCountry;
    addressLine1 = values.shippingAddressLine1;
    addressLine2 = values.shippingAddressLine2 || "";
  }

  if (isAddress === "billing" && values) {
    zipCode = values.billingZipCode;
    state = values.billingState;
    city = values.billingCity;
    country = values.billingCountry;
    addressLine1 = values.billingAddressLine1;
    addressLine2 = values.billingAddressLine2 || "";
  }
  payload = {
    destination: {
      postalArea: values.shippingZipCode || sessionStorage.getItem("Zipcode"),
      stateOrProvinceName: state,
    },
    Address: {
      Region: `${city}, ${state}, ${zipCode}`,
      CountryCode: country,
      AddressLine: [`${addressLine1} ${addressLine2}`],
    },
    documentDate: new Date(),
    transactionType: "SALE",
    sourceLocationId: sessionStorage.getItem("_lo_No") || null,
    isAddress: addressLine1 && country && state && city && zipCode,
    lineItems: lineItemsListObject(cartItems),
    shippingSku: sessionStorage.getItem("shippingSku"),
    alternateOrderLocationId:
      sessionStorage.getItem("alternateOrderLocationId") || "",
    multipackLocationId:
      sessionStorage.getItem("alternateMultipackLocationId") || "",
    isUpsAddress: values.isUpsAddress || false,
    validateZipcode: true,
  };
  if (sessionStorage.getItem("coupon")) {
    payload = {
      ...payload,
      voucherToken: sessionStorage.getItem("coupon"),
    };
  }
  return payload;
}

export function addressVerification(response) {
  //sessionStorage.removeItem("addressVerificationRequired");
  if (response.data) {
    sessionStorage.setItem(
      "addressVerificationRequired",
      response.data.addressVerificationRequired
    );
  }
}

export function removeSessionWhichStarts(str) {
  Object.keys(sessionStorage).forEach(function (key) {
    if (key.indexOf(str) === 0) {
      //if (/^shippingSku/.test(key))
      sessionStorage.removeItem(key);
    }
  });
}

export function shippingCostCalculator(shippingInfo) {
  const { isMultipackExist, shippingTax, totalAmount, cartItems } =
    shippingInfo;

  let freeShip = cartItems
    ? cartItems.filter((item) => item.freeShipping === true)
    : [];

  if (isMultipackExist && isMultipackExist.length === 0) {
    shippingTax.map((shipping) => {
      if (shipping.active && totalAmount > 1) {
        let pStart = parseFloat(shipping.taxPriceStart);
        let pEnd = parseFloat(shipping.taxPriceEnd);
        if (pStart < totalAmount && totalAmount <= pEnd) {
          freeShip.length > 0
            ? ""
            : sessionStorage.setItem("shippingSku", shipping.shippingSku);
          freeShip.length > 0
            ? ""
            : sessionStorage.setItem(
                "shippingSkuCost",
                parseFloat(shipping.shippingCharge)
              );
        }
      }
    });
  }
}

export function cardExpValidator(expMonth, expYear) {
  let todaysDate = new Date();
  let currentYear = todaysDate.getFullYear();
  let currentMonth = todaysDate.getMonth() + 1;
  if (
    expYear > currentYear ||
    (expYear >= currentYear && expMonth >= currentMonth)
  ) {
    return true;
  }
  return false;
}

export function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export function getDateFormat(val) {
  var today = new Date(val);
  var dd = today.getDate();
  var mm = today.getMonth() + 1;

  var yyyy = today.getFullYear();
  if (mm < 10) {
    mm = "0" + mm;
  }
  if (dd < 10) {
    dd = "0" + dd;
  }
  return mm + "/" + dd + "/" + yyyy;
}

export function calculateAge(birthday) {
  // it will accept two types of format yyyy-mm-dd and yyyy/mm/dd
  var optimizedBirthday = birthday.replace(/-/g, "/");

  //set date based on birthday at 01:00:00 hours GMT+0100 (CET)
  var myBirthday = new Date(optimizedBirthday);

  // set current day on 01:00:00 hours GMT+0100 (CET)
  var currentDate = new Date().toJSON().slice(0, 10) + " 01:00:00";

  // calculate age comparing current date and borthday
  var myAge = ~~((Date.now(currentDate) - myBirthday) / 31557600000);
  return myAge;
}

export function getYearsArray(startYear = 1909) {
  return Array(new Date().getFullYear() + 1 - startYear)
    .fill("")
    .flatMap((_, i) => [startYear + i])
    ?.reverse();
}

export const getChunkSizeArray = (arr, chunkSize = 10) => {
  if (!arr) return [];
  const groups = arr
    ?.map((e, i) => {
      return i % chunkSize === 0 ? arr?.slice(i, i + chunkSize) : null;
    })
    .filter((e) => {
      return e;
    });
  return groups;
};
export function getFullFirstName(name) {
  let newName = name.split(" "); //split with space
  newName.pop(); // Remove last element from array
  let nName = newName.join(" "); // convert into string
  return nName;
}
export function getFullLastName(name) {
  let newLastName = name.split(" "); //split with space
  return newLastName[newLastName.length - 1];
}

export function sanitizeString(str) {
  return str ? str.trim().replace(/\s\s+/g, " ") : "";
}

export function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export function toUpperString(str) {
  let newStr = str ? str.toUpperCase() : str;

  return newStr;
}

export function saveDatalayer(args) {
  if (args) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(args);
  }
}

export function getNavListName(str) {
  let expctVal = ["brand", "brands", "Brand", "Brands"];

  let val = str ? expctVal.includes(str) : str;

  return val;
}

export function getBannerData(title) {
  let obj = [];
  if (title) {
    obj = BANNER_CONFIG_LIST.filter((i) => i.bannerTitle === title);
  }

  return obj.length > 0 ? obj[0] : {};
}

export function getSequenceSubcategory(SelectedObject) {
  let sortObject = SelectedObject;
  let paraentCatArr = [];
  if (sortObject.parentCategory.length > 0) {
    sortObject = sortObject.parentCategory.map((data, index) => {
      let myObj = data.subCategories.sort(
        (a, b) => a.displaySequence - b.displaySequence
      );

      paraentCatArr.push({
        title: data.title,
        subCategories: myObj,
      });
    });
  }

  let newArr = { ...SelectedObject, parentCategory: paraentCatArr };
  return newArr;
}

export const getLinkTag = (attrs) => {
  if (!attrs) return "";
  if (attrs.href && attrs.href.includes("http")) {
    return (
      <a
        href={attrs.href}
        className={attrs.className}
        target="_blank"
        rel="noopener noreferrer"
        onClick={attrs.clickHandler || null}
        style={attrs.style}
      >
        {attrs.label}
      </a>
    );
  } else {
    return (
      <Link
        to={attrs.href}
        className={attrs.className}
        onClick={attrs.clickHandler || null}
        style={attrs.style}
      >
        {attrs.label}
      </Link>
    );
  }
};

export const getScrollEvent = (id, pageName, appleCheck) => {
  if (appleCheck) {
    document.getElementById(id).scrollIntoView(true);
  } else {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  }

  if (pageName) {
    ViewedPage(pageName);
  }
};

export const productTitleSlug = (id, productTitle) => {
  if (!id || !productTitle) return "";
  let spChar = productTitle.replace(/[^a-zA-Z0-9]/g, " ");
  return spChar.replace(/ /g, "-").toLowerCase() + "-" + id;
};

export const plpQueryStringHeadingChange = (param) => {
  param = param.toLowerCase().replace(/\s/g, "");
  if (param.includes("s", param.length - 1)) {
    param = param.slice(0, -1);
  }
  return param;
};
