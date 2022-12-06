import React, { PureComponent } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NavLink } from "react-router-dom";
import { trackEvent, EventNames } from "../../../appinsights/EventTrack";
import { ClickedBanner } from "../../../config/amplitude/SnacksAmplitude";
import { PAGENAME } from "../../../config/amplitude/Taxonomy.constants";
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Button, Grid, Tooltip } from "@mui/material";

export default class HomeSlider extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      playAndPause: true,
      activeSlide: 0,
      activeSlide2: 0,
    };
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
  }
  play() {
    this.slider.slickPlay();
    this.setState({
      playAndPause: true,
    });
  }
  pause() {
    this.slider.slickPause();
    this.setState({
      playAndPause: false,
    });
  }

  renderImage = (content) => {
    return content.map((item, index) => {
      const {
        filterImage,
        filterLink,
        textColor,
        buttonText,
        sectionDescription,
        btnBackgroundColorRgb,
        buttonPosition,
      } = item;
      if (filterLink && filterImage) {
        let buttonAriaLable;
        if (!buttonText) {
          buttonAriaLable = `${sectionDescription} Shop Now`;
          if (filterLink == "/varietypack") {
            buttonAriaLable = "Varietypack";
          }
        }
        return (
          <div key={`${index}`}>
            <NavLink
              tabIndex="-1"
              className="block-link"
              to={filterLink}
              aria-label={`${
                buttonText
                  ? sectionDescription + " " + buttonText
                  : buttonAriaLable
              }`}
              onClick={() => {
                const eventName = `${buttonText} from Carousel`;
                trackEvent(
                  eventName,
                  EventNames.Event.EVENT_BUTTON_PRESS,
                  window.location.origin,
                  window.location.pathname
                );
                ClickedBanner(
                  buttonText,
                  PAGENAME.HOME,
                  "Horizontal",
                  sectionDescription
                );
              }}
            >
              <img
                className="hero-background"
                src={filterImage}
                alt={`${
                  buttonText
                    ? sectionDescription + " " + buttonText
                    : buttonAriaLable
                }`}
                role="presentation"
              />
              {buttonText && (
                <span
                  style={{
                    color: textColor,
                    borderColor: textColor,
                    backgroundColor: btnBackgroundColorRgb,
                    left: buttonPosition
                      ? `${buttonPosition}%`
                      : `${this.props.defaultLeft}%`,
                  }}
                  className="brand-name"
                  tabIndex={0}
                  aria-label="Shop Now"
                >
                  {buttonText}
                </span>
              )}
            </NavLink>
          </div>
        );
      }
    });
  };
  render() {
    const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
      <Tooltip placeholder="top" title={`Previous`}>
        <button
          {...props}
          className={"slick-prev slick-arrow" + (currentSlide === 0 ? "" : "")}
          aria-hidden="true"
          type="button"
          aria-label={"Carousel Previous"}
        >
          Previous
        </button>
      </Tooltip>
    );
    const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
      <Tooltip placeholder="top" title={`Next`}>
        <button
          {...props}
          className={
            "slick-next slick-arrow" +
            (currentSlide === slideCount - 1 ? "" : "")
          }
          aria-hidden="true"
          type="button"
          aria-label={"Carousel Next"}
        >
          Next
        </button>
      </Tooltip>
    );
    const settings = {
      className: "center",
      centerMode: true,
      infinite: true,
      centerPadding: "0",
      slidesToShow: 1,
      initialSlide: 0,
      slidesToScroll: 1,
      dots: true,
      autoplay: true,
      autoplaySpeed: 5000,
      accessibility: true,
      arrows: true,
      focusOnSelect: true,
      prevArrow: <SlickArrowLeft />,
      nextArrow: <SlickArrowRight />,
      beforeChange: (current, next) => this.setState({ activeSlide: next }),
      afterChange: (current) => this.setState({ activeSlide2: current }),
      customPaging: (index) => {
        return (
          <Tooltip placeholder="top" title={`Slide ${index + 1}`}>
            <button
              role="tab"
              aria-label={`Carousel ${index + 1}`}
              aria-selected={
                this.state.activeSlide2 == index ? "true" : "false"
              }
            >
              {index + 1}
            </button>
          </Tooltip>
        );
      },
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
    const { content } = this.props;
    return (
      <>
        <Slider ref={(slider) => (this.slider = slider)} {...settings}>
          {this.renderImage(content)}
        </Slider>
        <Grid item xs={12}>
          <Tooltip
            placeholder="top"
            id="playAndPause"
            title={this.state.playAndPause ? "Pause" : "Play"}
          >
            <Button
              className="play-pause"
              role="button"
              name={this.state.playAndPause ? "Pause" : "Play"}
              aria-label={this.state.playAndPause ? "Carousel" : "Carousel"}
              onClick={() => {
                this.state.playAndPause ? this.pause() : this.play();
              }}
            >
              {this.state.playAndPause ? (
                <PauseIcon fontSize="small" />
              ) : (
                <PlayArrowIcon fontSize="small" />
              )}
            </Button>
          </Tooltip>
        </Grid>
      </>
    );
  }
}
