import "./productTout.scss";
import {
  BUTTONNAME,
  METHOD,
  PAGENAME,
  PRODUCTTYPE,
} from "../../../config/amplitude/Taxonomy.constants";
import {
  ClickedButton,
  SelectedLinkItem,
} from "../../../config/amplitude/SnacksAmplitude";
import React, { Component } from "react";
import APIUtil from "../../../config/APIUtil";
//import BundlesProductTout from "../../bundlesProductTout/bundlesProductTout";
import { DisplayHeading } from "../../../config/constants/content.constant";
import { Link } from "react-router-dom";
import MultipackTout from "../../multipack/multipackTout";
import ProductRating from "../ProductRating/ProductRating";
//import NotifyMe from "../commonComponents/notifyMe/NotifyMe";
import QuantityCount from "../../commonComponents/quantityCount/QuantityCount";
import Truncate from "react-truncate";
import UrlConstants from "../../../config/UrlConstants";
import { isMobile } from "react-device-detect";
import validateAPIResponse from "../../ApiHelper";
import { withRouter } from "react-router-dom";
import { Button, Card, Tooltip } from "@mui/material";

class ProductTout extends Component {
  state = {
    colors: [],
    isFavourite: false,
    showSizeList: false,
    showNotifyProductModal: false,
  };

  openDetailView = () => {
    const { detailedInfo, productInfo, index, PageTitle } = this.props;
    ClickedButton(BUTTONNAME.PRODUCTDETAILPOPUP, METHOD.PRODUCTTILE, {
      productId: productInfo.productId,
      PageTitle,
    });
    detailedInfo(productInfo, index);
  };

  onSelectedProduct = (productInfo, availableQtyLength) => {
    alert(1);
    const productState =
      availableQtyLength === 0 ? "OutOfStockProduct" : "Product";
    SelectedLinkItem(productState, METHOD.PRODUCTTILE, {
      ...productInfo,
      PageTitle: this.props.PageTitle,
    });
    this.props.updateSelectedProduct(
      productInfo.productId,
      productInfo.backgroundColorRgb
    );
  };

  changeFavStatus = (productKeyValue, isFavValue) => {
    const payload = {
      productKey: productKeyValue,
      isFave: isFavValue,
    };
    APIUtil.postMethod(UrlConstants.FavouriteProducts, payload, true)
      .then((response) => {
        if (validateAPIResponse(response)) {
          if (response.data.success) {
            this.setState({
              isFavourite: isFavValue,
            });
          }
        }
      })
      .catch((error) => {
        this.setState({
          isFavourite: isFavValue,
        });
      });
  };

  getQuantitySection = (primaryIndex, availableQtyList, showNotifyMe) => {
    const {
      warningMsgFunc,
      productInfo,
      selectedItems,
      isHolidayShopProduct,
      PageTitle,
    } = this.props;
    let ProductType = PRODUCTTYPE.SNACKS;

    //return productInfo.map((product, index) => {
    if (isHolidayShopProduct) {
      productInfo.isHolidayShopProduct = true;
      ProductType = PRODUCTTYPE.HOLIDAY;
    }
    productInfo.multipack && (ProductType = PRODUCTTYPE.VARIETY);

    return (
      <QuantityCount
        primaryProduct={productInfo}
        productInfo={productInfo}
        key={productInfo.id}
        warningMsgFunc={warningMsgFunc}
        selectedItems={selectedItems}
        sizeName={productInfo.bundleId ? productInfo.subText : productInfo.size}
        price={productInfo.price}
        availableQty={productInfo.availableQty}
        currency={productInfo.currency}
        PageTitle={PageTitle}
        ProductType={ProductType}
        availableQtyList={availableQtyList}
        showNotifyMe={showNotifyMe}
      />
    );
    // });
  };

  productAlreadyExists = (productInfo) => {
    const cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];
    let arraySum = [];
    //productInfo.forEach((product) => {
    const filteredArray = cartItems.filter(
      (item) => item.productId === productInfo.productId
    );
    arraySum = [...arraySum, ...filteredArray];
    //});
    return arraySum.length;
  };

  handleCODRulesClick = (productId) => {
    const { pageTitle } = this.props;
    ClickedButton(BUTTONNAME.PRODUCTTILELABEL, METHOD.PRODUCTTILELABEL, {
      productId: productId,
      pageTitle,
    });
    this.props.history.push("/call-of-duty-rules");
  };

  renderBox = () => {
    const {
      horizontalView,
      productInfo,
      storeProductId,
      isHolidayShopProduct,
      notifyMeHeading,
      thanksToNotifyHeading,
      thanksToNotifyMessage,
      notifyMeTileDescription,
      notifyMeButtonText,
    } = this.props;

    // const primaryIndex = productInfo.bundleId
    //   ? 0
    //   : productInfo.findIndex((obj) => obj.primaryProduct);
    const availableQtyList = productInfo.availableQty > 0 ? productInfo : [];

    const { showSizeList } = this.state;

    if (productInfo) {
      const {
        id,
        productId,
        bundleId,
        productDescription,
        shortDescription,
        bundleDescription,
        image,
        price,
        size,
        currency,
        backgroundColorRgb,
        showNotifyMe,
        outOfStock,
      } = productInfo;

      const prodDesc = productDescription
        ? productDescription.replace(/(<([^>]+)>)/gi, "").replace("&nbsp;", " ")
        : shortDescription
        ? shortDescription.replace(/(<([^>]+)>)/gi, "").replace("&nbsp;", " ")
        : "";
      const selectedProduct =
        (storeProductId && storeProductId === productId) || bundleId;
      const styleBg =
        selectedProduct || bundleDescription
          ? backgroundColorRgb
            ? "#" + backgroundColorRgb
            : ""
          : "transparent";
      const showSelectText =
        this.productAlreadyExists(productInfo) > 0
          ? DisplayHeading.SELECTED
          : DisplayHeading.SELECT;
      return (
        <>
          {/* Regular product notify me modal */}
          {/* <NotifyMe
            pageName={PAGENAME.PRODUCTLIST}
            buttonName={BUTTONNAME.NOTIFYME}
            displayButtonText={DisplayHeading.NOTIFY_ME}
            productType="Regular"
            openNotifyModal={this.state.showNotifyProductModal}
            closeNotifyModal={(val) => {
              this.setState({ showNotifyProductModal: val });
            }}
            notifyMePlaceholderImage={image}
            notifyMeHeading={notifyMeHeading || ""}
            thanksToNotifyHeading={thanksToNotifyHeading || ""}
            thanksToNotifyMessage={thanksToNotifyMessage || ""}
            productInfo={productInfo[primaryIndex]}
          /> */}
          <Card
            className={`product-box-bundle-card bundle-card ${
              bundleDescription ? "special-bundle-product" : "regular-product"
            } ${horizontalView ? "horizontal-bundle-card" : ""}`}
            //key={productId}
            style={{
              backgroundColor: styleBg,
            }}
          >
            <div className={`product-content-wrapper`}>
              {!selectedProduct &&
                !horizontalView &&
                productInfo.enablePromotional &&
                productInfo.enablePromotional.toLowerCase() == "cod" &&
                productInfo.promotionalCodeText.trim() && (
                  <div className="product-badge yellow">
                    {productInfo.promotionalCodeText}
                  </div>
                )}
              {outOfStock && !selectedProduct && (
                <div className="product-badge grey">
                  {DisplayHeading.OUT_OF_STOCK}
                </div>
              )}
              <Link
                tabIndex={this.props.tabIndex ? -1 : 0}
                id={`productDetailDialog-${productId ? productId : bundleId}`}
                name={`productDetailDialog-${productId ? productId : bundleId}`}
                className="media-card-wrapper"
                to={`/product/${productId}`}
              >
                <img
                  className="product-img"
                  alt={`${prodDesc} ${productId}`}
                  src={
                    typeof image === "string"
                      ? image
                      : "../images/product-placeholder.png"
                  }
                />
              </Link>

              {!horizontalView && <div className="shadow"></div>}
              <div
                className={`product-information ${
                  showSizeList ? "show-scroll" : ""
                } ${availableQtyList.length > 3 ? "align-top" : ""}`}
              >
                {/* {!selectedProduct && ( */}
                <>
                  <Tooltip placement="top" title={prodDesc}>
                    <div
                      className={`product-heading ${
                        availableQtyList.length === 0 && showNotifyMe
                          ? "notifyMeTileHeading"
                          : ""
                      }`}
                    >
                      <Truncate lines={2} ellipsis="...">
                        {prodDesc}
                      </Truncate>
                    </div>
                  </Tooltip>
                </>

                <>
                  {/* {bundleDescription && (
                    <div className="tile-bundle-description">
                      {bundleDescription}
                    </div>
                  )} */}
                  <div className="product-star-row">
                    <div className="product-price">
                      {productInfo.size} | ${productInfo.price}
                    </div>
                    <div className="product-star">
                      <ProductRating value={4} />
                    </div>
                  </div>
                  {!outOfStock &&
                    this.getQuantitySection(availableQtyList, showNotifyMe)}
                  {/* {productInfo[primaryIndex].enablePromotional &&
                    productInfo[primaryIndex].enablePromotional.toLowerCase() ==
                      "cod" &&
                    productInfo[primaryIndex].promotionalCodeText.trim() && (
                      <Link
                        className="cod-rules-link"
                        onClick={() =>
                          this.handleCODRulesClick(
                            productInfo[primaryIndex].productId
                          )
                        }
                      >
                        Learn More - Official Call of Duty&reg; Rules
                      </Link>
                    )} */}
                </>
                {/* )} */}

                {(!isHolidayShopProduct ||
                  !sessionStorage.getItem("holidayShopStockText")) &&
                  availableQtyList.length === 0 &&
                  !outOfStock &&
                  !selectedProduct && (
                    <div className="quantity-count-contain empty outlined">
                      {showNotifyMe ? (
                        <Button
                          className="theme-btn theme-btn-bordered"
                          aria-label={`${showSelectText} ${productInfo.title}`}
                        >
                          {notifyMeButtonText || `NOTIFY ME`}
                        </Button>
                      ) : (
                        <Button
                          className="theme-btn theme-btn-bordered"
                          disabled
                        >
                          Sold Out
                        </Button>
                      )}
                    </div>
                  )}
                {isHolidayShopProduct &&
                  sessionStorage.getItem("holidayShopStockText") &&
                  availableQtyList.length === 0 && (
                    <div className="selected-product">
                      {sessionStorage.getItem("holidayShopStockText")}
                    </div>
                  )}
              </div>
            </div>{" "}
          </Card>
        </>
      );
    }
    return "";
  };

  render() {
    const { productInfo, warningMsgFunc, selectedItems } = this.props;
    //const primaryIndex = productInfo.findIndex((obj) => obj.primaryProduct);

    if (productInfo.hasOwnProperty("isHolidayShop")) {
      let holidayShopObj = productInfo;
      let productObj = [
        {
          heading: holidayShopObj.title,
          shortDescription: holidayShopObj.shortDescription,
          image: holidayShopObj.image
            ? holidayShopObj.image
            : "/www/images/holiday-tout.png",
          backgroundImage: holidayShopObj.backgroundImage
            ? holidayShopObj.backgroundImage
            : "/www/images/holiday-tout-bg.png",
          buttonText: holidayShopObj.buttonText
            ? holidayShopObj.buttonText
            : "Enter",
          isHolidayShop: true,
        },
      ];
      return <MultipackTout productInfo={productObj} />;
    }

    if (productInfo.multipackId) {
      return <MultipackTout productInfo={productInfo} />;
    }

    // if (primaryIndex === -1 && productInfo[0].bundleId) {
    //   return (
    //     <BundlesProductTout
    //       bundleInfo={productInfo}
    //       updateSelectedProduct={this.props.updateSelectedProduct}
    //       storeProductId={this.props.storeProductId}
    //       warningMsgFunc={warningMsgFunc}
    //       selectedItems={selectedItems}
    //       openDetailView={this.openDetailView}
    //     />
    //   );
    // }
    return this.renderBox();
  }
}

export default withRouter(ProductTout);
