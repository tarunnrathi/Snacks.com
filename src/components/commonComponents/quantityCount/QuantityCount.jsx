import "./quantityCount.scss";
import {
  DisplayHeading,
  RegexUtil,
} from "../../../config/constants/content.constant";
import { EventNames, trackEvent } from "../../../appinsights/EventTrack";
import React, { Component } from "react";
import AddIcon from '@mui/icons-material/Add';
import { AddRemoveProductToCart } from "../../../config/amplitude/SnacksAmplitude";
import CustomEvent from "custom-event";
import RemoveIcon from '@mui/icons-material/Remove';
import UrlConstants from "../../../config/UrlConstants";
import { Button } from "@mui/material";
export default class QuantityCount extends Component {
  state = {
    quantity: 0,
    initialQuantity: 1,
    warningMsg: "",
    disableIncrement: false,
    deleteClicked: false,
    isDeleted: 0,
    showDeletPrompt: false,
    packCount: 0,
    removeCount: 0,
    itemDeleted: "",
    quantityChanged: false,
  };

  componentDidMount() {
    this.updateExistingQuantity();
    this.multipackCount();
    let that = this;
    document.addEventListener("multipackCartItems", function (e) {
      that.multipackCount();
    });
    document.addEventListener("replaceMixItems", function (e) {
      that.removeMixCount();
    });
  }

  UNSAFE_componentWillReceiveProps() {
    this.updateExistingQuantity();
  }

  componentWillUnmount() {
    let that = this;
    document.removeEventListener("multipackCartItems", function (e) {
      that.multipackCount();
    });
    document.removeEventListener("replaceMixItems", function (e) {
      that.removeMixCount();
    });
  }

  multipackCount = () => {
    const multipackCartItem = JSON.parse(
      sessionStorage.getItem("multipackCartItems") || "[]"
    );
    let packCount = 0;
    multipackCartItem &&
      multipackCartItem.map((item) => {
        if (item.availableQty > 0)
          packCount = packCount + parseInt(item.quantity);
        return packCount;
      });
    this.setState({ packCount });
  };

  removeMixCount = () => {
    const replaceMixItems = JSON.parse(
      sessionStorage.getItem("replaceMixItems") || "[]"
    );
    let removeCount = 0;

    replaceMixItems.map((item) => {
      if (item.availableQty > 0)
        removeCount = removeCount + parseInt(item.quantity);
      return removeCount;
    });
    this.setState({ removeCount });
  };

  updateExistingQuantity = () => {
    const { multipack, replaceMix, productInfo } = this.props;
    let cartArray = replaceMix
      ? JSON.parse(sessionStorage.getItem("replaceMixItems") || "[]")
      : multipack
      ? JSON.parse(sessionStorage.getItem("multipackCartItems") || "[]")
      : JSON.parse(sessionStorage.getItem("cartItems") || "[]");

    const indexExist = cartArray.findIndex((item) =>
      item.bundleId
        ? item.bundleId === productInfo.bundleId
        : item.productId === productInfo.productId
    );
    if (indexExist === -1) this.setState({ quantity: 0 });
    else this.setState({ quantity: cartArray[indexExist].quantity });
  };

  /*
    Update the Object
  */
  updateObject = (id, cartItems) => {
    const { quantity } = this.state;
    const { passQtyToCart, selectedItems, multipack, replaceMix } = this.props;
    const objIndex = cartItems.findIndex((obj) =>
      obj.bundleId ? obj.bundleId === id : obj.productId === id
    );

    const updatedObj = {
      ...cartItems[objIndex],
      quantity: quantity,
      preOrder: this.props.preOrder,
      preOrderText: this.props.preOrderText,
    };

    const updatedCartItems = [
      ...cartItems.slice(0, objIndex),
      updatedObj,
      ...cartItems.slice(objIndex + 1),
    ];

    const filteredCartItems = updatedCartItems.filter(
      (item) => item.quantity !== 0
    );

    selectedItems && selectedItems(filteredCartItems);
    if (!multipack) {
      sessionStorage.setItem("cartItems", JSON.stringify(filteredCartItems));
      passQtyToCart && passQtyToCart(filteredCartItems);
      document.dispatchEvent(new CustomEvent("cartitem"));
    }

    if (multipack && !replaceMix) {
      sessionStorage.setItem(
        "multipackCartItems",
        JSON.stringify(filteredCartItems)
      );
      document.dispatchEvent(new CustomEvent("multipackCartItems"));
    }

    if (replaceMix) {
      sessionStorage.setItem(
        "replaceMixItems",
        JSON.stringify(filteredCartItems)
      );
      document.dispatchEvent(new CustomEvent("replaceMixItems"));
    }
  };

  /*
    Add or Update the product in the cartItems.
  */
  updateQuantity = (qty) => {
    const {
      productInfo,
      warningMsgFunc,
      multipack,
      replaceMix,
      updateSelectedMPProduct,
    } = this.props;

    let cartArray = replaceMix
      ? JSON.parse(sessionStorage.getItem("replaceMixItems") || "[]")
      : multipack
      ? JSON.parse(sessionStorage.getItem("multipackCartItems") || "[]")
      : JSON.parse(sessionStorage.getItem("cartItems") || "[]");
    updateSelectedMPProduct && updateSelectedMPProduct();
    const indexExist = cartArray.findIndex((item) =>
      item.bundleId
        ? item.bundleId === productInfo.bundleId
        : item.productId === productInfo.productId
    );

    if (indexExist === -1)
      cartArray.push({
        ...productInfo,
        image: productInfo?.assets?.Product_Image,
        productDescription: productInfo.title
      });
    const trimmedQty = qty && qty.trim();
    if (
      trimmedQty &&
      parseInt(trimmedQty) > parseInt(productInfo.availableQty)
    ) {
      this.setState({ warningMsg: UrlConstants.qtyAvailableMsg }, () => {
        warningMsgFunc(this.state.warningMsg, productInfo.availableQty);
      });
    }
    if (
      trimmedQty &&
      parseInt(trimmedQty) <= parseInt(productInfo.availableQty)
    ) {
      this.setState({ quantity: parseInt(qty) }, () => {
        this.updateObject(
          productInfo.bundleId || productInfo.productId,
          cartArray
        );
      });
    } else {
      this.updateObject(
        productInfo.bundleId || productInfo.productId,
        cartArray
      );
    }
  };

  deleteCart = (id, cartItems) => {
    let deletedProduct = [];
    const {
      passQtyToCart,
      selectedItems,
      PageTitle,
      multipack,
      ProductType,
      replaceMix,
    } = this.props;
    deletedProduct = cartItems.filter((item) =>
      item.bundleId ? item.bundleId === id : item.productId === id
    );
    cartItems = cartItems.filter((item) =>
      item.bundleId ? item.bundleId != id : item.productId !== id
    );
    selectedItems && selectedItems(cartItems);
    this.setState({
      showDeletPrompt: false,
      deleteClicked: false,
      quantity: 0,
      itemDeleted: `${
        deletedProduct && deletedProduct[0].title
      } item has been removed from cart`,
    });
    if (!multipack) {
      sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
      passQtyToCart && passQtyToCart(cartItems);
      document.dispatchEvent(new CustomEvent("cartitem"));
    }
    if (multipack && !replaceMix) {
      sessionStorage.setItem("multipackCartItems", JSON.stringify(cartItems));
      document.dispatchEvent(new CustomEvent("multipackCartItems"));
    }
    if (replaceMix) {
      sessionStorage.setItem("replaceMixItems", JSON.stringify(cartItems));
      document.dispatchEvent(new CustomEvent("replaceMixItems"));
    }
    AddRemoveProductToCart({
      Method: "Delete",
      ProductType,
      PageTitle,
      ...deletedProduct[0],
    });
    setTimeout(() => this.setState({ itemDeleted: "" }), 4000);
  };

  getProductDescription = () => {
    const { productInfo } = this.props;
    if (!productInfo) {
      return "";
    }
    return productInfo.productDescription
      ? productInfo.productDescription
          .replace(/(<([^>]+)>)/gi, "")
          .replace("&nbsp;", " ")
      : productInfo.shortDescription
      ? productInfo.shortDescription
          .replace(/(<([^>]+)>)/gi, "")
          .replace("&nbsp;", " ")
      : "";
  };

  /*
    Decrease quantity of a product
  */
  decrement = () => {
    const { quantity } = this.state;
    const { PageTitle, productInfo, ProductType } = this.props;

    if (quantity > 0) {
      let productInformation = { ...productInfo };
      //&& quantity <= this.props.productInfo.availableQty
      trackEvent(
        EventNames.Action.ACTION_PRODUCT_DECREASE_CART,
        EventNames.Event.EVENT_BUTTON_PRESS,
        window.location.origin,
        window.location.pathname,
        { product: productInformation }
      );

      this.setState(
        { disableIncrement: false, quantity: parseInt(quantity) - 1 },
        () => {
          this.updateQuantity(),
            AddRemoveProductToCart({
              Method: "Decrement",
              ProductType,
              PageTitle,
              ...productInformation,
              quantity: this.state.quantity,
            });
        }
      );
    }
  };

  /*
    Increase quantity of a product
  */
  increment = () => {
    const { quantity, initialQuantity } = this.state;
    const {
      productInfo,
      warningMsgFunc,
      PageTitle,
      ProductType,
      availableQty,
      preOrder,
    } = this.props;

    const prodDesc = this.getProductDescription();

    const updatedQuantity = parseInt(quantity) + initialQuantity;

    if (updatedQuantity >= 0 && (preOrder || updatedQuantity < availableQty)) {
      let productInformation = { ...productInfo };

      trackEvent(
        EventNames.Action.ACTION_PRODUCT_INCREASE_CART,
        EventNames.Event.EVENT_BUTTON_PRESS,
        window.location.origin,
        window.location.pathname,
        { product: productInformation }
      );

      this.setState({ quantity: updatedQuantity, initialQuantity: 1 }, () => {
        this.updateQuantity(),
          AddRemoveProductToCart({
            Method: "Increment",
            ProductType,
            PageTitle,
            ...productInformation,
            quantity: this.state.quantity,
          });
      });
    }
    if (!preOrder && availableQty <= updatedQuantity) {
      this.setState(
        { warningMsg: UrlConstants.qtyAvailableMsg, disableIncrement: true },
        () => {
          trackEvent(
            EventNames.Action.ACTION_PRODUCT_MAX_WARN,
            EventNames.Event.EVENT_BUTTON_PRESS,
            window.location.origin,
            window.location.pathname,
            { product: productInfo }
          );

          warningMsgFunc(this.state.warningMsg, productInfo.availableQty);
        }
      );
    }
  };

  incrementInitialQuantity = () => {
    this.setState((prevState) => ({
      initialQuantity: prevState.initialQuantity + 1,
    }));
  };

  decrementInitialQuantity = () => {
    this.setState((prevState) => ({
      initialQuantity: prevState.initialQuantity - 1,
    }));
  };

  showTrashBtn = () => {
    const { quantity } = this.state;
    const { sizeName, disableIncDec } = this.props;
    const prodDesc = this.getProductDescription() + " " + sizeName;

    return (
      <Button
        autoFocus={this.props.autoFocus ? this.props.autoFocus : false}
        aria-label={
          sizeName
            ? `on clicking on this button ${prodDesc} ${sizeName} Product Quantity will be decremented by 1`
            : `on clicking on this button ${prodDesc} Product Quantity will be decremented by 1`
        }
        onClick={this.decrement}
        disabled={disableIncDec || quantity === 0}
        className="decrement-btn"
        role="button"
        name="decrement"
      >
        <RemoveIcon />
      </Button>
    );
  };

  showInputBox = () => {
    const { multipack, productInfo, mainHeading } = this.props;
    const { quantity, quantityChanged } = this.state;
    let inputBoxId = !mainHeading
      ? `productListInput-${productInfo.productId}`
      : `productListInput-${productInfo.productId}-${mainHeading.replace(
          /\s+/g,
          "-"
        )}`;
    const prodDesc = this.getProductDescription();
    return (
      <>
        <div className="quantity-count-input">
          {RegexUtil.ZIP_CODE_OR_NUM.test(quantity) ? quantity : 0}
          &nbsp;&nbsp;&nbsp;
          <span>IN&nbsp;&nbsp;CART</span>
        </div>
        {/* <label htmlFor={inputBoxId} className="label-hidden">
          Product Quantity
        </label> */}
        {/* <input
          type="text"
          id={inputBoxId}
          value={
            RegexUtil.ZIP_CODE_OR_NUM.test(quantity) ? quantity + " IN CART" : 0
          }
          onChange={(e) => this.updateQuantity(e.target.value)}
          disabled={true}
        /> */}
      </>
    );
  };

  render() {
    const {
      quantity,
      disableIncrement,
      packCount,
      removeCount,
      quantityChanged,
      initialQuantity,
    } = this.state;
    const {
      productInfo,
      sizeName,
      price,
      availableQty,
      currency,
      multipack,
      multipackLimit,
      disableIncDec,
      replaceMix,
      outOfStock,
      preOrder,
      showCountSelector,
    } = this.props;
    let cartItems = replaceMix
      ? JSON.parse(sessionStorage.getItem("replaceMixItems") || "[]")
      : multipack
      ? JSON.parse(sessionStorage.getItem("multipackCartItems") || "[]")
      : JSON.parse(sessionStorage.getItem("cartItems") || "[]");
    const deleteMsg = this.state.deleteClicked
      ? " Are you sure you would like to remove this item from the cart?"
      : "Are you sure you would like to remove all items from the cart?";

    const prodDesc = this.getProductDescription();

    return (
      <div className="add-to-cart">
        {showCountSelector && quantity === 0 && (
          <div className="item-label">Qty.</div>
        )}
        <div
          className={`quantity-box ${
            showCountSelector ? "quantity-box-qty" : ""
          }`}
        >
          {showCountSelector && quantity === 0 && (
            <div className="count-selector">
              <Button
                aria-label={
                  sizeName
                    ? `on clicking on this button ${prodDesc} ${sizeName} Product Quantity will be decremented by 1`
                    : `on clicking on this button ${prodDesc} Product Quantity will be decremented by 1`
                }
                onClick={this.decrementInitialQuantity}
                disabled={disableIncDec || initialQuantity === 1}
                className="dec-btn"
                role="button"
                name="decrement"
              >
                <RemoveIcon />
              </Button>
              <span className="count-num">{initialQuantity}</span>
              <Button
                aria-label={
                  sizeName
                    ? `on clicking on this button ${prodDesc} ${sizeName} Product Quantity will be incremented by 1`
                    : `on clicking on this button ${prodDesc} Product Quantity will be incremented by 1`
                }
                onClick={this.incrementInitialQuantity}
                disabled={
                  outOfStock ||
                  disableIncDec ||
                  disableIncrement ||
                  (multipackLimit &&
                    (multipackLimit === packCount ||
                      multipackLimit === removeCount))
                }
                className={`inc-btn`}
                name="increment"
              >
                <AddIcon />
              </Button>
            </div>
          )}
          <div
            className={`quantity-count-contain ${
              outOfStock
                ? "disabled"
                : preOrder
                ? quantity > 0
                  ? ""
                  : "empty"
                : !availableQty
                ? "disabled"
                : quantity > 0
                ? ""
                : "empty"
            }`}
          >
            <div className="quantity-count-wrapper">
              {quantity > 0 && (
                <>
                  <Button
                    autoFocus={
                      this.props.autoFocus ? this.props.autoFocus : false
                    }
                    aria-label={
                      sizeName
                        ? `on clicking on this button ${prodDesc} ${sizeName} Product Quantity will be decremented by 1`
                        : `on clicking on this button ${prodDesc} Product Quantity will be decremented by 1`
                    }
                    onClick={this.decrement}
                    disabled={disableIncDec || quantity === 0}
                    className="decrement-btn"
                    role="button"
                    name="decrement"
                  >
                    <RemoveIcon />
                  </Button>
                </>
              )}
              {/* Input Box */}
              {quantity > 0 && this.showInputBox()}

              {outOfStock ? (
                <Button
                  disabled={true}
                  className={`increment-btn disabled`}
                  name="increment"
                >
                  {`${
                    productInfo.productType && productInfo.productType.toLowerCase() !== "snacks"
                      ? `SOLD OUT`
                      : `OUT OF STOCK`
                  }`}
                </Button>
              ) : (
                <Button
                  aria-label={
                    sizeName
                      ? `on clicking on this button ${prodDesc} ${sizeName} Product Quantity will be incremented by 1`
                      : `on clicking on this button ${prodDesc} Product Quantity will be incremented by 1`
                  }
                  onClick={this.increment}
                  disabled={
                    disableIncDec ||
                    disableIncrement ||
                    (multipackLimit &&
                      (multipackLimit === packCount ||
                        multipackLimit === removeCount))
                  }
                  className={`increment-btn ${
                    quantity > 0 ? "" : "add-to-card"
                  }`}
                  name="increment"
                >
                  {quantity > 0 ? <AddIcon /> : (preOrder ? "Pre-Order" : "add to cart")}
                </Button>
              )}

              {/* {availableQty > 0 ? (
                <Button
                  aria-label={
                    sizeName
                      ? `on clicking on this button ${prodDesc} ${sizeName} Product Quantity will be incremented by 1`
                      : `on clicking on this button ${prodDesc} Product Quantity will be incremented by 1`
                  }
                  onClick={this.increment}
                  disabled={
                    disableIncDec ||
                    disableIncrement ||
                    (multipackLimit &&
                      (multipackLimit === packCount ||
                        multipackLimit === removeCount))
                  }
                  className={`increment-btn ${
                    availableQty > 0 && quantity > 0 ? "" : "add-to-card"
                  }`}
                  name="increment"
                >
                  {availableQty > 0 && quantity > 0 ? (
                    <AddIcon />
                  ) : (
                    "add to cart"
                  )}
                </Button>
              ) : (
                <Button
                  onClick={this.increment}
                  disabled={true}
                  className={`increment-btn disabled`}
                  name="increment"
                >
                  SOLD OUT
                </Button>
              )} */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
