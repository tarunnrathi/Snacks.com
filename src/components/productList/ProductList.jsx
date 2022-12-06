import React, { Component } from "reactn";
import { connect } from "react-redux";
import { isMobileOnly } from "react-device-detect";
import qs from "query-string";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  BUTTONNAME,
  PAGENAME,
} from "../../config/amplitude/Taxonomy.constants";
import {
  ClickedButton,
  ProductListFilters,
  SearchEvent,
  SelectedLinkItem,
  ViewedPage,
} from "../../config/amplitude/SnacksAmplitude";
import APIUtil from "../../config/APIUtil";
import UrlConstants from "../../config/UrlConstants";
import {
  actionCheckProductAvailability,
  actionGetMinAmount,
  actiongetProduct,
  actionGetPlpFiltersAPIData,
} from "../../actions/ProductAction";
import Breadcrumbs from "../../components/commonComponents/Breadcrumbs/Breadcrumbs";
import FilterList from "../../components/filters/filters";
import ProductTout from "../../components/commonComponents/ProductTout/ProductTout";
import validateAPIResponse from "../../components/ApiHelper";
import {
  deepLinkValidation,
  sanitizeString,
  saveDatalayer,
  getBannerData,
  plpQueryStringHeadingChange,
} from "../../components/Utils";
import PLPBanner from "./PLPBanner/PLPBanner";

import "./productList.scss";

import data from "./data.json";
import PLPBannerFilter from "./PLPBannerFilter/PLPBannerFilter";
import {
  Button,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  NativeSelect,
} from "@mui/material";

class ProductList extends Component {
  prodLimit =
    this.props.screenName && this.props.screenName == "flaminHot"
      ? 8
      : isMobileOnly
      ? UrlConstants.productsMobileLimit
      : UrlConstants.productsLimit;

  shouldSaveDatalayer = true;

  constructor(props) {
    super(props);
    this.state = {
      dialougeBoxOpen: false,
      selectedItems: [],
      showProductDetail: false,
      minOrder: "",
      currency: "",
      limit: this.prodLimit,
      locationNumber:
        sessionStorage.getItem("alternateOrderLocationId") ||
        localStorage.getItem("_lo_No") ||
        sessionStorage.getItem("_lo_No"),
      stateCode: sessionStorage.getItem("stateCode"),
      offset: 0,
      msg: null,
      totalProducts: null,
      productDetailIndex: "",
      filterData: {},
      productInfo: [],
      productsList: [],
      isProductLoading: true,
      isProductScrollable: false,
      totalProductsVisible: 0,
      lazyLoading: false,
      storeProductId: "",
      isProductScrolling: false,
      selectedSubmenu: "",
      isshopAllMenu: false,
      globalSearchText: "",
      globalSearchClear: false,
      filterExpanded: !isMobileOnly,
      loadMoreState: true,
      sortBy: 0,
      bannerData: {},
      filterOptionSearchedList: [],
      selectedFiltersArray: [],
      heading: "",
      isChecked: null,
    };
  }

  componentDidMount() {
    if (window.innerWidth < 1025) {
      this.setState({ filterExpanded: false });
    }
    ViewedPage(PAGENAME.SNACKS);
    //window.scrollTo(0, 0);
    if (!this.global.globalSearchText) {
      // this.getFilteredData(
      //   this.global?.selectedSubmenu,
      //   this.global?.selectedMenu
      // );
      this.getProductList("", 0);
    }

    //if(!this.props.plpFiltersData)
    this.props.actionGetPlpFiltersAPIData();

    const initialSearchParams = new URLSearchParams(this.props.location.search);
    if (this.props.plpFiltersData) {
      this.setState(
        {
          filterOptionSearchedList: this.props.plpFiltersData,
        },
        () => {
          let filterOptionSearchedListTemp = [
            ...this.state.filterOptionSearchedList,
          ];
          filterOptionSearchedListTemp.filter((item, index) => {
            item.showSearchBox =
              item.categoryId &&
              item.subCategories.length > UrlConstants.showSearchForFilterLimit;
          });
          this.setState({
            filterOptionSearchedList: filterOptionSearchedListTemp,
          });
          this.getFiltersFromUrl(initialSearchParams.toString());
        }
      );
    }
  }

  handleGlobalSearch = () => {
    // if (this.global.globalSearchText) {
    //   if (this.global?.globalSearchText !== this.state.globalSearchText) {
    //     this.setState({
    //       globalSearchText: this.global?.globalSearchText,
    //     });
    //     this.selectedFilter("", this.global?.globalSearchText);
    //   }
    // }
  };

  componentDidUpdate(prevProps, prevState) {
    debugger;
    if (
      this?.props?.plpFiltersData?.length > 0 &&
      prevState?.filterOptionSearchedList?.length === 0
    ) {
      this.setState({ filterOptionSearchedList: this.props.plpFiltersData });
    }
    let filterOptionSearchedList = [...this.state.filterOptionSearchedList];
    const paramsString = this.props.location.search;
    const searchParams = new URLSearchParams(paramsString);
    if (
      this?.state?.heading &&
      prevState?.productsContainer?.FilterRecords?.filter(
        (x) => x.title === this?.state?.heading
      )[0]?.subCategories?.length !==
        this?.state?.productsContainer?.FilterRecords?.filter(
          (x) => x.title === this?.state?.heading
        )[0]?.subCategories?.length
    ) {
      debugger;
      if (
        searchParams.toString() !== "" &&
        searchParams.toString() !== null &&
        searchParams.toString() !== undefined
      ) {
        for (const param of searchParams) {
          let heading = plpQueryStringHeadingChange(param[0]);
          filterOptionSearchedList.map((item, index) => {
            debugger;
            if (plpQueryStringHeadingChange(item?.title) === heading) {
              if (this.state.isChecked) {
                filterOptionSearchedList[index].subCategories =
                  item?.subCategories?.filter(
                    (x) => x?.isSelected === this.state.isChecked
                  );
              } else {
                if (
                  item?.subCategories?.filter((x) => x.isSelected === true)
                    ?.length === 0
                ) {
                  filterOptionSearchedList[index].subCategories =
                    this?.state?.productsContainer?.FilterRecords?.filter(
                      (x) => x.title === item?.title
                    )[0]?.subCategories;
                } else {
                  filterOptionSearchedList[index].subCategories =
                    item?.subCategories?.filter((x) => x?.isSelected === true);
                }
              }
            } else {
              if (
                item?.subCategories?.filter((x) => x.isSelected === true)
                  ?.length === 0
              ) {
                filterOptionSearchedList[index].subCategories =
                  this?.state?.productsContainer?.FilterRecords?.filter(
                    (x) => x.title === item?.title
                  )[0]?.subCategories;
              } else {
                if (!searchParams.has(plpQueryStringHeadingChange(heading))) {
                  filterOptionSearchedList[index].subCategories =
                    this?.state?.productsContainer?.FilterRecords?.filter(
                      (x) => x.title === item?.title
                    );
                }
              }
            }
          });
        }
      } else {
        filterOptionSearchedList =
          this?.state?.productsContainer?.FilterRecords;
      }
      this.setState({
        filterOptionSearchedList: filterOptionSearchedList,
        heading: "",
        isChecked: null,
      });
    }
  }

  UNSAFE_componentWillMount() {
    if (this.props.location && this.props.location.search) {
      deepLinkValidation(this.props.location);
    }
    this.actionGetMinAmount();
  }

  componentWillUnmount() {
    this.setGlobal({
      selectedSubmenu: null,
      selectedMenu: null,
      globalSearchText: null,
    });
    sessionStorage.removeItem("selectedCategory");
  }

  productListAPICall = (callFrom) => {
    let payload = this.state.filterData;

    const { limit, offset, locationNumber, productsList, stateCode } =
      this.state;
    let initialLimit = limit;
    if (callFrom != "lazy" && this.props.screenName == "flaminHot") {
      initialLimit = initialLimit + 1;
    } else if (callFrom == "lazy" && this.props.screenName == "flaminHot") {
      payload.limit = limit;
      this.setState({ filterData: payload });
    }

    if (!payload.hasOwnProperty("limit")) {
      payload = {
        limit: initialLimit,
        offset,
        locationNumber,
        varietyPackCookie: true,
        stateCode,
        globalSearch: payload.globalSearch,
      };
      this.setState({ filterData: payload });
    }

    if (callFrom === "lazy") {
      payload = {
        ...payload,
        stateCode,
        offset: this.state.offset,
      };
    }

    if (this.props.screenName && this.props.screenName == "flaminHot") {
      payload.promotions = ["FlaminHot"];
    }
    let productsData =
      !!productsList && productsList.length > 0 ? productsList : [];
    let parsedQueryString =
      this.props.location && this.props.location.search
        ? qs.parse(this.props.location.search)
        : "";
    if (
      parsedQueryString &&
      parsedQueryString.productName &&
      callFrom != "appliedFilter"
    ) {
      payload.globalSearch = parsedQueryString.productName;
    }
    APIUtil.postMethod(UrlConstants.ProductsUrl, payload, true)
      .then((response) => {
        if (validateAPIResponse(response)) {
          let productListData = response.data.Groups || [];
          if (callFrom === "lazy") {
            this.shouldSaveDatalayer = true;
          }
          if (
            productsData.length > 0 &&
            productListData &&
            productListData.length > 0 &&
            callFrom !== "appliedFilter"
          ) {
            productListData.map((prods) => productsData.push(prods));
          } else {
            productsData = productListData;
          }
          this.setState({
            productsList: productsData,
            isProductLoading: false,
            totalProducts: response.data.totalProducts
              ? response.data.totalProducts
              : 0,
            lazyLoading: false,
            isProductScrolling: false,
            loadMoreState: false,
          });
        }
      })
      .catch((error) => {
        console.error("Products Group API", error);
      });
  };

  handleOnDocumentBottom = () => {
    const { offset, totalProducts, limit, stateCode, isProductLoading } =
      this.state;
    const totalCount = offset + limit;
    if (totalProducts > totalCount && !isProductLoading) {
      this.setState(
        {
          lazyLoading: true,
          offset: offset + this.prodLimit,
          isProductScrolling: true,
          stateCode,
          loadMoreState: true,
        },
        () => {
          setTimeout(() => {
            this.productListAPICall("lazy");
          }, 500);
        }
      );
    } else {
      this.setState({ lazyLoading: false });
    }
  };

  // getFilteredData = (subMenu, menu) => {
  //   this.setState({ isProductLoading: true });
  //   const selectedCategory = sessionStorage.getItem("selectedCategory")
  //     ? JSON.parse(sessionStorage.getItem("selectedCategory"))
  //     : [];
  //   let payload = {
  //     offset: this.state.offset,
  //     limit: this.state.limit,
  //     locationNumber:
  //       sessionStorage.getItem("alternateOrderLocationId") ||
  //       localStorage.getItem("_lo_No") ||
  //       sessionStorage.getItem("_lo_No"),
  //     stateCode: this.state.stateCode,
  //   };
  //   if (subMenu) {
  //     payload[menu] = [subMenu];
  //     payload.varietyPackCookie = true;
  //   }

  //   selectedCategory.map((item) => {
  //     const { categoryId, subCategoryIdList } = item;
  //     return (payload = {
  //       ...payload,
  //       varietyPackCookie: true,
  //       [categoryId]: subCategoryIdList,
  //     });
  //   });
  //   if ((selectedCategory && selectedCategory.length > 0) || subMenu) {
  //     this.setState(
  //       {
  //         filterData: payload,
  //       },
  //       () => {
  //         ProductListFilters(this.state.filterData);
  //         this.productListAPICall("appliedFilter");
  //       }
  //     );
  //   } else {
  //     this.productListAPICall();
  //   }
  // };

  actionGetMinAmount() {
    const { minPrice } = this.props;
    if (!sessionStorage.getItem("shippingMinimum")) {
      this.props.actionGetMinAmount("", "", "", "").then(() => {
        this.setState({
          minOrder: minPrice ? minPrice.shippingMinimum : "",
        });
        if (minPrice && Object.keys(minPrice).length > 0) {
          sessionStorage.setItem(
            "shippingMinimum",
            minPrice.shippingMinimum || null
          );
          sessionStorage.setItem(
            "shippingCharges",
            minPrice.shippingCharges || null
          );
        }
      });
    } else {
      this.setState({
        minOrder: sessionStorage.getItem("shippingMinimum") || "",
      });
    }
  }

  updateProductDetailStatus = (status) => {
    this.setState({ showProductDetail: status });
  };

  productDetail = (productInfo, index) => {
    const header = document.getElementsByTagName("header")[0];
    if (header) header.classList.add("header-popover");

    this.setState({
      showProductDetail: true,
      productInfo: productInfo,
      productDetailIndex: index,
    });
  };

  warningMsgFunc = (msg, availableQty) =>
    this.setState(
      {
        msg: msg.replace(
          /##QTY##/g,
          function () {
            return parseInt(availableQty);
          },
          document.getElementById("body").classList.add("has-toast")
        ),
      },
      () =>
        setTimeout(() => {
          this.setState({ msg: null });
          document.getElementById("body").classList.remove("has-toast");
        }, 3000)
    );

  selectedCartItems = (selectedItems) => {
    if (this.props.screenName && this.props.screenName == "flaminHot") {
      this.props.selectedCartItems(selectedItems);
    }
    this.setState({ selectedItems });
  };

  selectedFilter = (filters, search) => {
    ClickedButton(BUTTONNAME.APPLYFILTERS, PAGENAME.SNACKS, {
      PageTitle: PAGENAME.SNACKS,
    });
    this.setState(
      {
        filterData: {
          ...this.state.filterData,
          [UrlConstants.searchKey]: search.trim() || "",
          ...filters,
        },
        isProductLoading: true,
        offset: 0,
      },
      () => {
        ProductListFilters(this.state.filterData);
        SearchEvent(search, PAGENAME.SNACKS, {
          PageTitle: PAGENAME.SNACKS,
        });
        //this.productListAPICall("appliedFilter");
      }
    );
  };

  getProductList = (filterString, sortBy) => {
    this.setState({ isProductLoading: true });
    const queryString = filterString
      ? `?${filterString}&sortBy=${sortBy}`
      : `?sortby=${sortBy}`;
    APIUtil.getMethod(
      `${UrlConstants.productGroupList}${queryString}&limit=${this.state.limit}`,
      true,
      localStorage.getItem("_lo_No") || sessionStorage.getItem("_lo_No")
    ).then((response) => {
      if (validateAPIResponse(response)) {
        this.setState({
          productsContainer: response.data.data,
          isProductLoading: false,
          totalProducts: response.data.totalProducts,
          allDetails: response.data.data,
          loadMoreState:
            response?.data?.totalProducts > response?.data?.limit
              ? false
              : true,
        });
      }
    });
    // APIUtil.postMethod(UrlConstants.ProductsUrl, payload, true)
    //   .then((response) => {
    //     if (validateAPIResponse(response)) {
    //       var productListData = response.data.Groups || [];
    //       if (callFrom === "lazy") {
    //         this.shouldSaveDatalayer = true;
    //       }
    //       if (
    //         productsData.length > 0 &&
    //         productListData &&
    //         productListData.length > 0 &&
    //         callFrom !== "appliedFilter"
    //       ) {
    //         productListData.map((prods) => productsData.push(prods));
    //       } else {
    //         productsData = productListData;
    //       }
    //       this.setState({
    //         productsList: productsData,
    //         isProductLoading: false,
    //         totalProducts: response.data && response.data.totalProducts,
    //         lazyLoading: false,
    //         isProductScrolling: false,
    //         loadMoreState: false,
    //       });
    //     }
    //   })
    // .catch((error) => {
    //   console.error("Products Group API", error);
    // });
  };

  updateSelectedProduct = (storeProductId) => {
    this.setState({ storeProductId });
  };

  saveDatalayerItemList = (datalayerItemList) => {
    if (this.shouldSaveDatalayer) {
      saveDatalayer({ ecommerce: null });
      saveDatalayer({
        event: "view_item_list",
        ecommerce: {
          items: datalayerItemList,
        },
      });
      this.shouldSaveDatalayer = false;
    }
  };

  renderProductsList = (productsList) => {
    const { minPrice } = this.props;

    if (this.state.isProductLoading) {
      return this.loadSpinner();
    }
    const datalayerItemList = [];
    return productsList.map((prod, index) => {
      // console.log('prod>>>',prod);
      if (prod) {
        if (
          this.props.screenName &&
          this.props.screenName == "flaminHot" &&
          !prod.productId
        )
          return false;

        if (prod.bundledProduct) {
          return false;
        }

        if (prod.productId) {
          //let primaryIndex = prod.findIndex((obj) => obj.primaryProduct);
          const {
            productId,
            productDescription,
            shortDescription,
            price,
            brand,
            flavour,
          } = prod;
          const prodDesc = productDescription
            ? productDescription
                .replace(/(<([^>]+)>)/gi, "")
                .replace("&nbsp;", " ")
            : shortDescription
            ? shortDescription
                .replace(/(<([^>]+)>)/gi, "")
                .replace("&nbsp;", " ")
            : "";
          const datalayerItem = {
            item_name: prodDesc,
            item_id: productId,
            item_brand: brand,
            item_category: sanitizeString(flavour).replace(/^,+|,+$/g, ""),
            item_list_name: "view all snacks",
            price,
            index: datalayerItemList.length + 1,
          };
          datalayerItemList.push(datalayerItem);
          if (index === productsList.length - 1) {
            this.saveDatalayerItemList(datalayerItemList);
          }
        }

        return (
          <>
            <Grid
              item
              key={`product-${index}`}
              xs={6}
              md={this.state.filterExpanded ? 4 : 3}
              lg={this.state.filterExpanded ? 4 : 3}
            >
              <ProductTout
                productKey={`${prod.productId || prod.bundleId}-${index}`}
                productInfo={prod}
                index={index}
                selectedItems={this.selectedCartItems}
                detailedInfo={this.productDetail}
                warningMsgFunc={this.warningMsgFunc}
                updateSelectedProduct={this.updateSelectedProduct}
                storeProductId={this.state.storeProductId}
                PageTitle={PAGENAME.SNACKS}
                notifyMeHeading={minPrice ? minPrice.notifyMeHeading : ""}
                thanksToNotifyHeading={
                  minPrice ? minPrice.thanksToNotifyHeading : ""
                }
                thanksToNotifyMessage={
                  minPrice ? minPrice.thanksToNotifyMessage : ""
                }
                notifyMeTileDescription={
                  minPrice ? minPrice.notifyMeTileDescription : ""
                }
                notifyMeButtonText={minPrice ? minPrice.notifyMeButtonText : ""}
              ></ProductTout>
            </Grid>
          </>
        );
      }
      return (
        <Grid
          container
          justifyContent="center"
          className="noproducts-grid"
          key={index}
        >
          <Grid item>
            <h2 className="noproducts-text">No Products</h2>
          </Grid>
        </Grid>
      );
    });
  };

  updateDialogState = () => {
    this.setState({ dialougeBoxOpen: false });
  };

  loadSpinner = () => (
    <Grid
      container
      spacing={0}
      style={{ textAlign: "center" }}
      justifyContent="center"
      className="noproducts-grid"
    >
      <Grid item xs={12} sm={12} lg={12} className="loader-inline">
        <CircularProgress disableShrink />
      </Grid>
    </Grid>
  );

  getCloseCall = () => {
    this.setState({
      filterExpanded: !this.state.filterExpanded,
    });
  };

  handleSortByChange = (element) => {
    this.setState({ sortBy: element.target.value });
    this.getProductList(this.props.location.search, element.target.value);
  };

  getFiltersFromUrl = (
    queryString,
    heading = "",
    itemValue = "",
    isChecked = ""
  ) => {
    //debugger;
    queryString = queryString.replace(/%2C/g, ",");
    let totalFilterApplied = this.state.totalFilterApplied;
    // console.log("==queryString", this.props.plpFiltersData);
    // console.log(">>>>>queryString state", this.state.filterOptionSearchedList);
    const searchParams = new URLSearchParams(queryString);
    let filterOptionSearchedList = [...this.state.filterOptionSearchedList];
    //let filterOptionSearchedListTemp = [...this.state.filterOptionSearchedList];
    //let filterOptionSearchedListTemp = [...filterOptionSearchedList];
    //let selectedFiltersArray = [...this.state.selectedFiltersArray];
    let selectedFiltersArray = [];
    for (const param of searchParams) {
      //debugger
      let splittedFilters = param[1].split(",");
      filterOptionSearchedList.filter((item, index) => {
        //debugger;
        // item.title = item.title.toLowerCase();
        // if (item.title.includes("s", item.title.length - 1)) {
        //   item.title = item.title.slice(0, -1);
        // }
        if (
          item.title &&
          plpQueryStringHeadingChange(item?.title) ===
            plpQueryStringHeadingChange(param[0])
        ) {
          filterOptionSearchedList[index].subCategories = item.subCategories;
          return filterOptionSearchedList[index].subCategories.filter(
            (innerItem) => {
              //debugger;
              const isFilterIndexExist = selectedFiltersArray.findIndex(
                (x) => x.value.toLowerCase() === innerItem.value.toLowerCase()
              );
              // console.log("innerItem>1", splittedFilters);
              // console.log("innerItem>2", innerItem.value.toLowerCase());
              // console.log(
              //   "innerItem>4",
              //   splittedFilters.includes(innerItem.value.toLowerCase())
              // );
              if (splittedFilters.includes(innerItem.value.toLowerCase())) {
                totalFilterApplied++;
                // console.log("innerItem>", innerItem);
                innerItem.isSelected = queryString == "" ? false : true;
                if (isFilterIndexExist === -1) {
                  innerItem.title = param[0] && param[0].toLowerCase();
                  selectedFiltersArray.push(innerItem);
                }
              } else {
                innerItem.isSelected = false;
                if (isFilterIndexExist !== -1)
                  selectedFiltersArray.splice(isFilterIndexExist, 1);
              }
              return innerItem;
            }
          );
        }
        // else if(item.title.toLowerCase() === heading) {
        //     // console.log('item.=title=',item.title.toLowerCase());
        //     // console.log('item.=heading=',heading);
        //     // console.log('item.=',filterOptionSearchedList[index].subCategories);
        //     //return filterOptionSearchedList[index].subCategories.filter((option) => option.isSelected = false);
        // }
        return item;
      });
    }
    // console.log("===filterOptionSearchedListTemp isChecked", isChecked);
    if (isChecked === false) {
      filterOptionSearchedList.filter((item) => {
        if (item.categoryId && item.title.toLowerCase() === heading) {
          return item.subCategories.filter((innerItem) => {
            if (innerItem.value.toLowerCase() === itemValue) {
              innerItem.isSelected = false;
              return innerItem;
            }
          });
        }
      });
      console.log("===filterOptionSearchedListTemp", filterOptionSearchedList);
      // const filteredCategoryArray = filterOptionSearchedListTemp.filter((item) => item.categoryId && item.categoryId.toLowerCase() === heading);
      // console.log('=||==>filteredCategoryArray',filteredCategoryArray);
      // const filteredSubCategoryArray = filteredCategoryArray[0] && filteredCategoryArray[0].subCategories.filter((item) => item.value.toLowerCase() === itemValue);
      // console.log('=||==>filteredSubCategoryArray',filteredSubCategoryArray);
      //filteredSubCategoryArray[0].isSelected = false;
    }
    console.log("new", filterOptionSearchedList);

    this.setState({
      filterOptionSearchedList: filterOptionSearchedList,
      selectedFiltersArray: selectedFiltersArray,
    });
    // console.log(">>>>>selectedFiltersArray", this.state.selectedFiltersArray);
    return {
      filterOptionSearchedList,
      selectedFiltersArray,
    };

    // this.setState({
    //   totalFilterApplied,
    //   filterOptionSearchedList,
    //   selectedFiltersArray
    // });
  };

  createSearchURL = (heading, item, isChecked) => {
    debugger;
    this.setState({ heading: heading, isChecked: isChecked });
    heading = heading.toLowerCase();
    const paramsString = this.props.location.search;
    const searchParams = new URLSearchParams(paramsString);
    if (searchParams.has(plpQueryStringHeadingChange(heading))) {
      let paramValues = searchParams
        .get(plpQueryStringHeadingChange(heading))
        .split(",");
      const valueIndex = paramValues.indexOf(item);
      if (valueIndex !== -1) {
        paramValues.splice(valueIndex, 1);
        searchParams.delete(plpQueryStringHeadingChange(heading));
      } else {
        paramValues.push(item);
      }
      if (paramValues.length !== 0) {
        searchParams.set(
          plpQueryStringHeadingChange(heading),
          paramValues.toString()
        );
      }
    } else {
      searchParams.append(plpQueryStringHeadingChange(heading), item);
    }

    let updatedFiltersArray = this.getFiltersFromUrl(
      searchParams.toString(),
      heading,
      item,
      isChecked
    );
    if (isChecked) {
      const sP = new URLSearchParams(searchParams.toString());
      const newSearchParams = new URLSearchParams(paramsString);
      for (const param of sP) {
        param[0] = plpQueryStringHeadingChange(param[0]);
        newSearchParams.set(param[0], param[1]);
      }
      this.props.history.push({
        pathname: this.props.location.pathname,
        search: newSearchParams.toString(),
      });
      this.getProductList(newSearchParams.toString(), this.state.sortBy);
      return {
        searchParams: newSearchParams.toString(),
        ...updatedFiltersArray,
      };
    } else {
      this.props.history.push({
        pathname: this.props.location.pathname,
        search: searchParams.toString(),
      });
      this.getProductList(searchParams.toString(), this.state.sortBy);
      return {
        searchParams: searchParams.toString(),
        ...updatedFiltersArray,
      };
    }
  };

  render() {
    const {
      productsContainer,
      lazyLoading,
      isProductLoading,
      offset,
      limit,
      bannerData,
    } = this.state;

    const totalCount = offset + limit;
    const { plpFiltersData } = this.props;
    const parsedUrlNavigationParamsArr =
      this.props.location.pathname.split("/productlist");
    return (
      <>
        <div
          className={
            bannerData.bannerTxtColor
              ? "plp-banner-wrapper white"
              : "plp-banner-wrapper white"
          } // white
          style={{
            backgroundColor: bannerData.bannerBgColor, // "#51127F",
            // backgroundColor: "#51127F",
            color: bannerData.bannerTxtColor, //"#fff",
          }}
        >
          {parsedUrlNavigationParamsArr[1] && (
            <>
              <Breadcrumbs crumbs={data.crumbs} />
              <PLPBannerFilter
                bannerData={bannerData}
                data={data.banner}
                parsedUrlNavigationParamsArr={parsedUrlNavigationParamsArr}
                filterOptionSearchedList={this.state.filterOptionSearchedList}
                createSearchURL={this.createSearchURL}
                selectedFiltersArray={this.state.selectedFiltersArray}
              />
            </>
          )}
        </div>
        <div className="page-product-listing">
          <Container className="container-root">
            {/* {msg && <SnacksAlertMessage fullWidth msg={msg} />} */}
            <section className="plp-wrapper">
              {this.state.filterExpanded && (
                <FilterList
                  getProductList={this.getProductList}
                  closeFilter={this.getCloseCall}
                  createSearchURL={this.createSearchURL}
                  getFiltersFromUrl={this.getFiltersFromUrl}
                  filterOptionList={this.state.filterOptionSearchedList}
                  selectedFiltersArray={this.state.selectedFiltersArray}
                />
              )}
              <div className="plp-products">
                <div className="plp-products-header">
                  <div className="plp-filter-block">
                    <Button
                      onClick={() => {
                        this.setState({
                          filterExpanded: !this.state.filterExpanded,
                        });
                      }}
                      className="plp-filter-toggle"
                    >
                      <div
                        className={`plp-filter-web ${
                          this.state.filterExpanded ? "expanded" : "collapsed"
                        }`}
                      >
                        <img src="/svg/arrowleft.svg" alt="Arrow Left" />
                        {this.state.filterExpanded ? "Hide" : "Show"} Filters
                      </div>
                      <div className="plp-filter-mob">
                        <img src="/svg/filter.svg" alt="filter" /> Filters (1)
                      </div>
                    </Button>
                  </div>
                  <div className="text-center plp-filter-count">
                    {!this.state.isProductLoading
                      ? this.state?.totalProducts + " Items"
                      : ""}
                  </div>
                  <div className="text-right plp-filter-sort">
                    <div className="inline-sort">
                      <label className="static-label" htmlFor="sortProducts">
                        <span className="sort-web">Sort By:</span>
                        <span className="sort-mob">
                          Sort <KeyboardArrowDownIcon />
                        </span>
                      </label>
                      <FormControl className="sort-dropdown">
                        <NativeSelect
                          name="SortBy"
                          inputProps={{ "aria-label": "sort by" }}
                          id="sortProducts"
                          onChange={this.handleSortByChange}
                        >
                          <option value="0">Relevance</option>
                          <option value="1">Most Popular</option>
                          <option value="2">Highest Rated</option>
                          <option value="a-z">A-Z</option>
                          <option value="z-a">Z-A</option>
                          <option value="l-h">Price L-H</option>
                          <option value="h-l">Price H-L</option>
                        </NativeSelect>
                      </FormControl>
                    </div>
                  </div>
                </div>

                <Grid
                  container
                  spacing={3}
                  id="productGridContainer"
                  className="product-grid-container lists"
                >
                  {productsContainer &&
                  productsContainer?.products?.length > 0 ? (
                    this.renderProductsList(productsContainer.products)
                  ) : isProductLoading ? (
                    this.loadSpinner()
                  ) : (
                    <Grid
                      container
                      justifyContent="center"
                      className="noproducts-grid"
                    >
                      <Grid item>
                        <h2 className="noproducts-text">No Products</h2>
                      </Grid>
                    </Grid>
                  )}
                </Grid>
                <Grid className="plp-load-more-outer">
                  {!this.state.isProductLoading && (
                    <div className="plp-product-count">
                      {`Showing ${totalCount}`} of
                      {` ${this.state.totalProducts}`}
                    </div>
                  )}

                  {!this.state.loadMoreState &&
                  this.state.productsList.length !==
                    this.state.totalProducts ? (
                    <Button
                      className="plp-load-more"
                      onClick={this.handleOnDocumentBottom}
                    >
                      Load More
                    </Button>
                  ) : (
                    ""
                  )}
                </Grid>

                {lazyLoading && this.loadSpinner()}
              </div>
            </section>
          </Container>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.reducer.Products || [],
    totalProduct: state.reducer.totalProduct,
    filterProducts: state.reducer.filterProducts,
    minPrice: state.reducer.minAmount,
    productInventory: state.reducer.productInventory,
    plpFiltersData: state.reducer.plpFiltersData,
  };
};

export default connect(mapStateToProps, {
  actiongetProduct,
  actionCheckProductAvailability,
  actionGetMinAmount,
  actionGetPlpFiltersAPIData,
})(ProductList);
