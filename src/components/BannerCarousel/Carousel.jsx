import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { trackEvent, EventNames } from "../../appinsights/EventTrack";
import { ClickedBanner } from "../../config/amplitude/SnacksAmplitude";
import { PAGENAME } from "../../config/amplitude/Taxonomy.constants";

import "./carousel.scss";

import useWindowDimensions from "../../utils/useWindowDimensions";
import { getLinkTag } from "../Utils";

const Carousel = (props) => {
  const { width } = useWindowDimensions();

  const { images } = props;

  const setting = {
    dots: true,
    centerMode: true,
    centerPadding: "0",
    initialSlide: 0,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 5000,
    accessibility: true,
    arrows: true,
    focusOnSelect: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // initialSlide: 0,
    prevArrow: <img src="www/images/redesign/home/arrow_left.svg" alt="img" />,
    nextArrow: <img src="www/images/redesign/home/arrow_right.svg" alt="img" />,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const bannerClickHandler = (buttonText, sectionDescription) => {
    const eventName = `${buttonText} from Carousel`;
    trackEvent(
      eventName,
      EventNames.Event.EVENT_BUTTON_PRESS,
      window.location.origin,
      window.location.pathname
    );
    ClickedBanner(
      buttonText.replace(/\s+/g, ""),
      PAGENAME.HOME,
      "Horizontal",
      sectionDescription
    );
  };

  return (
    <div className="banner">
      <Slider {...setting}>
        {images.map((item) => (
          <div key={item.id} className="slidecontant">
            <div
              className="container"
              style={{
                backgroundImage: `url(${
                  width > 376 ? item.src : item.mobile_src
                })`,
              }}
            >
              <div className="content">
                <div>
                  <h4
                    className="main_contant"
                    style={
                      item.heading_font_color
                        ? { color: item.heading_font_color }
                        : null
                    }
                  >
                    {item.heading}
                  </h4>
                  <p
                    className="text_contant"
                    style={
                      item.desc_font_color
                        ? { color: item.desc_font_color }
                        : null
                    }
                  >
                    {item.description}
                  </p>
                  {getLinkTag({
                    href: item.destination_link,
                    className: "Btn",
                    style: item.button_background
                      ? {
                          backgroundColor: item.button_background,
                          color: item.button_font_color,
                        }
                      : null,
                    label: item.button_text,
                    clickHandler: () =>
                      bannerClickHandler(item.button_text, item.heading),
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};
export default Carousel;
