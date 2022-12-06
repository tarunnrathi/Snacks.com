import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ScrollAnimation from "react-animate-on-scroll";
import ProductTout from "../ProductTout/ProductTout";
import "./suggestedProductsPDP.scss";
import { Grid } from "@mui/material";

const SuggestedItems = ({ title, data }) => {
  if (!data || data.length === 0) {
    return null;
  }
  const settings = {
    infinite: false,
    dots: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    prevArrow: null,
    nextArrow: null,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 635,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          dots: true,
        },
      },
      {
        breakpoint: 380,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
          dots: true,
        },
      },
    ],
  };

  return (
    <>
      <h3 className="suggestions-heading">{title}</h3>
      <Grid container className="suggested-carousel">
        <Slider {...settings}>
          {data.map((prod, index) => {
            return (
              <div key={`product-${index}`}>
                <ScrollAnimation
                  animateIn={"animate__fadeInDown"}
                  initiallyVisible={true}
                  animateOnce={true}
                  offset={300}
                  className="scrollAnimate"
                >
                  <ProductTout
                    xs={6}
                    md={3}
                    lg={3}
                    productKey={`${prod.productId || prod.bundleId}-${index}`}
                    productInfo={prod}
                    index={index}
                    PageTitle=""
                    selectedItems={() => {}}
                    detailedInfo={() => {}}
                    warningMsgFunc={() => {}}
                    updateSelectedProduct={() => {}}
                    storeProductId={""}
                    notifyMeHeading={""}
                    thanksToNotifyHeading={""}
                    thanksToNotifyMessage={""}
                    notifyMeTileDescription={""}
                    notifyMeButtonText={""}
                  ></ProductTout>
                </ScrollAnimation>
              </div>
            );
          })}
        </Slider>
      </Grid>
    </>
  );
};

export default SuggestedItems;
