import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Grid,
  Button,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import ProductCarousel from "../commonComponents/ProductCarousel/ProductCarousel";
import Breadcrumbs from "../commonComponents/Breadcrumbs/Breadcrumbs";
import QuantityCount from "../commonComponents/quantityCount/QuantityCount";
import ImageTextGrid from "../commonComponents/ImageTextGrid/ImageTextGrid";
import SuggestedProductsPDP from "../commonComponents/suggestedProductsPDP/suggestedProductsPDP";
import Spinner from "../../components/Spinner";
import FlavorNotes from "./FlavorNotes/FlavorNotes";
import { getScrollEvent, productTitleSlug } from "../Utils";
import APIUtil from "../../config/APIUtil";
import UrlConstants from "../../config/UrlConstants";
import { PAGENAME } from "../../config/amplitude/Taxonomy.constants";
import {
  ViewedPage,
  ClickedButton,
} from "../../config/amplitude/SnacksAmplitude";
import validateAPIResponse from "../ApiHelper";
import "./PDP.scss";
import data from "./data.json";

const getProductGallery = (assets) => {
  const gallery = [];
  if (assets.Product_Image) {
    gallery.push({
      original: assets.Product_Image,
      thumbnail: assets.Product_Image,
    });
  }
  if (assets.Product_Back_Image) {
    gallery.push({
      original: assets.Product_Back_Image,
      thumbnail: assets.Product_Back_Image,
    });
  }
  if (assets.Other_Image) {
    assets.Other_Image.map((image) => {
      gallery.push({
        original: image,
        thumbnail: image,
      });
    });
  }
  if (assets.Product_Video_Thumbnail && assets.Product_Video) {
    gallery.push({
      isVideo: true,
      original: assets.Product_Video,
      thumbnail: assets.Product_Video_Thumbnail,
    });
  }
  return gallery;
};

const PDP = (props) => {
  const [productinfo, setProductinfo] = useState({});
  const [recommendedProducts, setRecommendedProducts] = useState(null);
  const [expandSizing, setExpandSizing] = useState(false);

  const [activeProductId, setActiveProductId] = useState(""); //props.match.params.id;

  const getProductDetails = useCallback((productId) => {
    // setProductinfo(data.productinfo);
    APIUtil.getMethod(
      `${UrlConstants.redesignProductDetailUrl}?${encodeURIComponent(
        `prodId=${productId}`
      )}`,
      {},
      true
    )
      .then((response) => {
        if (validateAPIResponse(response) && response.data.success) {
          setProductinfo(response.data.data);
        } else {
          setProductinfo({});
        }

        window.parent.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      })
      .catch(() => {
        setProductinfo({});
      });
  });

  const getRecommendedProducts = useCallback(() => {
    APIUtil.getMethod(
      `${UrlConstants.popularProductsList}?${encodeURIComponent(
        `limit=4&offset=0`
      )}`,
      {},
      true
    )
      .then((response) => {
        if (validateAPIResponse(response) && response.data.success) {
          setRecommendedProducts(response.data.data);
        } else {
          setRecommendedProducts(null);
        }
      })
      .catch(() => {
        setProductinfo({});
      });
  });

  useEffect(() => {
    try {
      let pID = props.match.params.id.slice(
        props.match.params.id.lastIndexOf("-") + 1
      );

      setActiveProductId(pID);
      getProductDetails(pID);
      getRecommendedProducts();

      ViewedPage(PAGENAME.HOLIDAYVILLAGEPRODUCTDETAIL, {
        details: {
          id: pID,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }, [props.match.params.id]);

  const getActiveProduct = () => {
    const activeProduct =
      productinfo && productinfo.groups
        ? productinfo.groups.filter((item) => item.productId == activeProductId)
        : null;

    return activeProduct ? activeProduct[0] : null;
  };

  const activeProduct = getActiveProduct();

  return (
    <>
      {data.crumbs && <Breadcrumbs crumbs={data.crumbs} />}
      <Container id="pdp-top" className="container-root">
        {!productinfo || !productinfo.productId || !activeProduct ? (
          <Spinner />
        ) : (
          <Grid container justifyContent="center" className="banner">
            {productinfo?.assets && (
              <Grid item md={6} sm={12} className="product-carousel">
                <h1 className="prod-title mobile">{productinfo.title || ""}</h1>
                <ProductCarousel
                  gallery={getProductGallery(productinfo?.assets)}
                />
              </Grid>
            )}
            <Grid item md={6} sm={12}>
              <div className="product-details">
                <Link
                  to={`/productlist/brand/${productinfo?.brand?.title}`}
                  className="topTag"
                >
                  Shop All {productinfo?.brand?.title.toLowerCase()}
                </Link>
                <h1 className="prod-title desktop">
                  {productinfo.title || ""}
                </h1>
                <div className="price-cont">
                  <span className="product-price">
                    {productinfo?.currency}
                    {productinfo?.price}
                  </span>
                </div>
                {!activeProduct.outOfStock && activeProduct.preOrderText && (
                  <div className="preorder">{activeProduct.preOrderText}</div>
                )}
                {productinfo?.groups && (
                  <div className="product-size-list">
                    {(productinfo.groups.length > 1 ||
                      productinfo.groups[0].size) && (
                      <div className="item-label">
                        Size
                        {productinfo.assets &&
                          productinfo.assets.Size_Chart_Image && (
                            <span
                              onClick={() => {
                                getScrollEvent("size-guide");
                                setExpandSizing(true);
                                ClickedButton(
                                  "SizeGuide",
                                  PAGENAME.HOLIDAYVILLAGEPRODUCTDETAIL,
                                  {
                                    PageTitle:
                                      PAGENAME.HOLIDAYVILLAGEPRODUCTDETAIL,
                                    productId: productinfo.productId,
                                  }
                                );
                              }}
                            >
                              Size Guide
                            </span>
                          )}
                      </div>
                    )}
                    <div className="size-container">
                      {productinfo?.groups.map((item) => {
                        if (!item.size) return "";
                        if (item.productId == activeProductId) {
                          return (
                            <Button
                              key={item.productId}
                              className={`active ${
                                item.outOfStock ? "disabled" : ""
                              }`}
                            >
                              {item.size}
                            </Button>
                          );
                        } else {
                          return (
                            <Link
                              key={item.productId}
                              to={`${
                                UrlConstants.holidayVillageProductDetailPage
                              }/${productTitleSlug(
                                item.productId,
                                item.title
                              )}`}
                              className={item.outOfStock ? "disabled" : ""}
                              onClick={() =>
                                ClickedButton(
                                  "HolidayVillageProductSize",
                                  PAGENAME.HOLIDAYVILLAGEPRODUCTDETAIL,
                                  {
                                    PageTitle:
                                      PAGENAME.HOLIDAYVILLAGEPRODUCTDETAIL,
                                    productId: item.productId,
                                    ProductSize: item.size,
                                    details: {
                                      id: item.id,
                                    },
                                  }
                                )
                              }
                            >
                              {item.size}
                            </Link>
                          );
                        }
                      })}
                    </div>
                  </div>
                )}
                {activeProduct && (
                  <QuantityCount
                    primaryProduct={productinfo}
                    productInfo={productinfo}
                    key={productinfo.productId}
                    warningMsgFunc={() => {}}
                    selectedItems={() => {}}
                    sizeName={productinfo?.size}
                    price={productinfo?.price}
                    availableQty={activeProduct.availableQty}
                    outOfStock={activeProduct.outOfStock}
                    currency={productinfo?.currency}
                    PageTitle={"Product detail"}
                    ProductType={"Snacks"}
                    showCountSelector={true}
                    preOrderText={activeProduct.preOrderText}
                    preOrder={activeProduct.preOrderText ? true : false}
                  />
                )}
              </div>
            </Grid>
          </Grid>
        )}
      </Container>
      <FlavorNotes
        flavorIcons={productinfo?.flavorNotes || []}
        shortDescription={productinfo?.shortDescription}
        longDescription={productinfo?.longDescription}
      />
      <Container className="container-root">
        <Grid className="servings-info">
          {productinfo.assets && productinfo.assets.Size_Chart_Image && (
            <Accordion
              classes={{
                root: "product-acc-root",
              }}
              id="size-guide"
              expanded={expandSizing}
              onChange={() => {
                setExpandSizing(!expandSizing);
                ClickedButton("Sizing", PAGENAME.HOLIDAYVILLAGEPRODUCTDETAIL, {
                  PageTitle: PAGENAME.HOLIDAYVILLAGEPRODUCTDETAIL,
                  productId: productinfo.productId,
                });
              }}
            >
              <AccordionSummary
                expandIcon={<KeyboardArrowDownIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <h2>Sizing</h2>
              </AccordionSummary>
              <AccordionDetails>
                <div className="product-acc-container">
                  <div className="product-acc-content">
                    <img src={productinfo.assets.Size_Chart_Image} />
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
          )}
          {(productinfo.materials || productinfo.dimensions) && (
            <Accordion
              classes={{
                root: "product-acc-root",
              }}
              onClick={() =>
                ClickedButton(
                  "ProductDetails",
                  PAGENAME.HOLIDAYVILLAGEPRODUCTDETAIL,
                  {
                    PageTitle: PAGENAME.HOLIDAYVILLAGEPRODUCTDETAIL,
                    productId: productinfo.productId,
                  }
                )
              }
            >
              <AccordionSummary
                expandIcon={<KeyboardArrowDownIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <h2>Product Details</h2>
              </AccordionSummary>
              <AccordionDetails>
                <div className="product-acc-container">
                  {productinfo.materials && (
                    <div className="product-acc-content">
                      Materials: {productinfo.materials}
                    </div>
                  )}
                  {productinfo.dimensions && (
                    <div className="product-acc-content">
                      Dimensions: {productinfo.dimensions}
                    </div>
                  )}
                </div>
              </AccordionDetails>
            </Accordion>
          )}

          <Accordion
            classes={{
              root: "product-acc-root",
            }}
          >
            <AccordionSummary
              expandIcon={<KeyboardArrowDownIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <h2>Dietary Considerations</h2>
            </AccordionSummary>
            <AccordionDetails>
              <div className="product-acc-content">
                Contains milk ingredients.
                <br />
                Gluten free.
                <br />
                Non-GMO ingredients.
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion
            classes={{
              root: "product-acc-root",
            }}
          >
            <AccordionSummary
              expandIcon={<KeyboardArrowDownIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <h2>Ingredients</h2>
            </AccordionSummary>
            <AccordionDetails>
              <div className="product-acc-content">
                Enriched corn meal (corn meal, ferrous sulfate, niacin, thiamin
                mononitrate, riboflavin, folic acid), vegetable oil (corn,
                canola, and/or sunflower oil), flamin’ hot seasoning
                (maltodextrin [made from corn], salt, sugar, monosodium
                glutamate, yeast extract, citric acid, artificial color [red 40
                lake, yellow 6 lake, yellow 6, yellow 5], sunflower oil, cheddar
                cheese [milk, cheese cultures, salt, enzymes], onion powder,
                whey, whey protein concentrate, garlic powder, natural flavor,
                buttermilk, sodium diacetate, disodium inosinate, disodium
                guanylate), and salt. CONTAINS MILK INGREDIENTS.
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion
            classes={{
              root: "product-acc-root",
            }}
          >
            <AccordionSummary
              expandIcon={<KeyboardArrowDownIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <h2>Nutritional facts</h2>
            </AccordionSummary>
            <AccordionDetails>
              <div className="product-acc-content">
                Enriched corn meal (corn meal, ferrous sulfate, niacin, thiamin
                mononitrate, riboflavin, folic acid), vegetable oil (corn,
                canola, and/or sunflower oil), flamin’ hot seasoning
                (maltodextrin [made from corn], salt, sugar, monosodium
                glutamate, yeast extract, citric acid, artificial color [red 40
                lake, yellow 6 lake, yellow 6, yellow 5], sunflower oil, cheddar
                cheese [milk, cheese cultures, salt, enzymes], onion powder,
                whey, whey protein concentrate, garlic powder, natural flavor,
                buttermilk, sodium diacetate, disodium inosinate, disodium
                guanylate), and salt. CONTAINS MILK INGREDIENTS.
              </div>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <div className="promotions">
          {productinfo.brand && (
            <ImageTextGrid
              image={productinfo.brand.image}
              heading={`About ${productinfo.brand.title}`}
              description={productinfo.brand.description}
              ctaLabel={productinfo.brand.buttonLabel}
              link={`/productlist/brand/${productinfo.brand.title}`}
              clickHandler={() =>
                ClickedButton("SHOP_THIS_BRAND", PAGENAME.PRODUCTDETAIL)
              }
            />
          )}
          {productinfo.recipe && (
            <ImageTextGrid
              image={productinfo.recipe.image}
              heading={productinfo.recipe.title}
              description={productinfo.recipe.description}
              ctaLabel={productinfo.recipe.buttonLabel}
              link={productinfo.recipe.link}
              reverse
              topImage={true}
              clickHandler={() =>
                ClickedButton("SEE_RECIPE", PAGENAME.PRODUCTDETAIL)
              }
            />
          )}
        </div>
        {recommendedProducts && (
          <Grid
            container
            spacing={0}
            justifyContent="center"
            className="suggested-products"
          >
            <SuggestedProductsPDP
              title="You may also like"
              data={recommendedProducts}
            />
          </Grid>
        )}
      </Container>
    </>
  );
};

export default PDP;
