import React from "react";
import QuantityCount from "./QuantityCount";
import { shallow, mount } from "enzyme";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

describe("Quantity Count Unit Test", () => {
  let wrapper;
  const cartItems = [
    {
      id: "99233",
      productId: "10857001",
      price: "3.29",
      size: "Big Bag (6.25oz)",
      title: "Lay's Baked Original Potato Crisps 6.25 Oz Plastic Bag",
      productDescription: "Baked Lay's Original Potato Chips",
      likes: 12,
      quantity: 2,
      brand: "BAKED, LAY'S",
      displaySequence: "",
      productClass: "SNACK FOODS",
      currency: "$",
      flavour: ",Plain,",
      backgroundColorRgb: "",
      backgroundColorA: "",
      primaryProduct: true,
      availableQty: "100",
      productEnableFor: "OfficeSnacks",
      stateCode: [],
      stateName: [],
      recommendedProduct: "0",
      overwriteDescription: null,
      bundleDescription: null,
      bundleDetailDescription: null,
      image:
        "https://ospep-develop.azurefd.net/products/US/00028400331548_C1C1.png",
    },
  ];
  const productInfo = {
    id: "99233",
    productId: "10857001",
    price: "3.29",
    size: "Big Bag (6.25oz)",
    title: "Lay's Baked Original Potato Crisps 6.25 Oz Plastic Bag",
    productDescription: "Baked Lay's Original Potato Chips",
    likes: 12,
    quantity: 0,
    brand: "BAKED, LAY'S",
    displaySequence: "",
    productClass: "SNACK FOODS",
    currency: "$",
    flavour: ",Plain,",
    backgroundColorRgb: "",
    backgroundColorA: "",
    primaryProduct: true,
    availableQty: "100",
    productEnableFor: "OfficeSnacks",
    stateCode: [],
    stateName: [],
    recommendedProduct: "0",
    overwriteDescription: null,
    bundleDescription: null,
    bundleDetailDescription: null,
    image:
      "https://ospep-develop.azurefd.net/products/US/00028400331548_C1C1.png",
  };
  const outofstockProduct = {
    id: "99233",
    productId: "10857001",
    price: "3.29",
    size: "Big Bag (6.25oz)",
    title: "Lay's Baked Original Potato Crisps 6.25 Oz Plastic Bag",
    productDescription: "Baked Lay's Original Potato Chips",
    likes: 12,
    quantity: 0,
    brand: "BAKED, LAY'S",
    displaySequence: "",
    productClass: "SNACK FOODS",
    currency: "$",
    flavour: ",Plain,",
    backgroundColorRgb: "",
    backgroundColorA: "",
    primaryProduct: true,
    availableQty: "100",
    productEnableFor: "OfficeSnacks",
    stateCode: [],
    stateName: [],
    recommendedProduct: "0",
    overwriteDescription: null,
    bundleDescription: null,
    bundleDetailDescription: null,
    image:
      "https://ospep-develop.azurefd.net/products/US/00028400331548_C1C1.png",
  };
  const availableQty = 1909;
  const sizeName = "Small Bag (1.875oz)";
  const price = 1.89;
  const currency = "$";
  const mockFn = jest.fn();
  const props = {
    productInfo: productInfo,
    availableQty: availableQty,
    sizeName: sizeName,
    price: price,
    currency: currency,
  };
  //Setup and Teardown
  beforeEach(() => {
    wrapper = shallow(<QuantityCount {...props} />);
  });

  it("Only one component is available", () => {
    expect(wrapper).toHaveLength(1); // Only one component
  });

  it("All the content should wrap inside quantity-count-contain class", () => {
    expect(wrapper.find(".quantity-count-contain")).toHaveLength(1);
  });

  it("Out Of Stock Product", () => {
    wrapper.setProps({ productInfo: outofstockProduct });
    wrapper.setProps({ availableQty: 0 });
    wrapper.setProps({ price: 3.79 });
    wrapper.setProps({ currency: "$" });
    wrapper.setProps({ sizeName: "Small" });
    expect(wrapper).toHaveLength(1);
  });

  it("Available Product", () => {
    wrapper.setProps({ productInfo: productInfo });
    expect(wrapper).toHaveLength(1);
  });

  it("all buttons exist", () => {
    wrapper.setProps({ availableQty: 10 });
    wrapper.setState({ quantity: 5 });

    expect(wrapper.contains(<AddIcon />)).toEqual(true);
    expect(wrapper.contains(<RemoveIcon />)).toEqual(true);
  });

  it("all functions should call correctly", () => {
    sessionStorage.setItem("multipackCartItems",JSON.stringify([{availableQty:100, quantity:1}]));
    sessionStorage.setItem("replaceMixItems",JSON.stringify([{availableQty:100, quantity:1}]));
    wrapper.instance().showInputBox();
    wrapper.instance().showTrashBtn();
    wrapper.instance().increment();
    wrapper.instance().decrement();
    wrapper.instance().deleteCart(productInfo.productId, cartItems);
    wrapper.instance().updateQuantity();
    wrapper.instance().updateObject(productInfo.productId, []);
    wrapper.instance().updateExistingQuantity();
    wrapper.instance().multipackCount();
    wrapper.instance().removeMixCount();
  });
});
