import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { trackEvent, EventNames } from "../../../appinsights/EventTrack";
import { ClickedBanner } from "../../../config/amplitude/SnacksAmplitude";
import { PAGENAME } from "../../../config/amplitude/Taxonomy.constants";
import "./snacksCarousel.scss";

const defaultInterval = 5000;
const defaultChangeInterval = 100;
const mobileWH = { width: 375, height: 495 };
const desktopWH = { width: 720, height: 680 };
export default class SnacksCarousel extends Component {
  state = {
    timerLeft: "0",
    timerIndexLeft: 1,
    timerRight: "0",
    timerIndexRight: 1,
    timerMobile: "0",
    timerIndexMobile: 1,
    timeIntervalMobile: defaultInterval,
    timeIntervalLeft: defaultInterval,
    timeIntervalRight: defaultInterval,
  };

  componentDidMount() {
    this.props.direction === "vertical" &&
      (this.setTimeLeft = setTimeout(
        this.changeLeftSlide,
        this.state.timeIntervalLeft
      ));
    this.props.direction === "verticalReverse" &&
      (this.setTimeRight = setTimeout(
        this.changeRightSlide,
        this.state.timeIntervalRight
      ));
    this.props.direction === "horizontal" &&
      (this.setTimeMobile = setTimeout(
        this.changeMobileSlide,
        this.state.timeIntervalMobile
      ));
  }

  componentWillUnmount() {
    this.updateCarouselTimer();
    clearTimeout(this.setTimeRight);
    clearTimeout(this.setTimeLeft);
    clearTimeout(this.setTimeMobile);
  }

  UNSAFE_componentWillMount() {
    this.updateCarouselTimer();
  }

  updateCarouselTimer = () => {
    const { direction, content } = this.props;
    const interval = content[0].timeInterval || defaultInterval;
    if (direction === "verticalReverse") {
      this.setState({
        timerRight: "-" + (content.length - 1) * 100 + "%",
        timeIntervalRight: interval,
        timerIndexRight: content.length - 1,
      });
    }
    if (direction === "horizontal")
      this.setState({
        timeIntervalMobile: interval,
      });

    if (direction === "vertical")
      this.setState({
        timeIntervalLeft: interval,
      });
  };

  setMobileTime = (timeIntervalMobile) => this.setState({ timeIntervalMobile });

  changeMobileSlide = () => {
    const { content, direction } = this.props;
    const divider = direction === "horizontal" ? content.length : 7;

    if (this.state.timerIndexMobile / divider === 1) {
      this.setMobileTime(defaultChangeInterval);
      this.setState({
        timerMobile: "0",
        timerIndexMobile: 1,
      });
    } else {
      this.setMobileTime(content[0].timeInterval || defaultInterval);
      let timerSingleMobile = 100 * this.state.timerIndexMobile;
      this.setState({
        timerMobile: "-" + timerSingleMobile + "%",
        timerIndexMobile: this.state.timerIndexMobile + 1,
      });
    }

    setTimeout(this.changeMobileSlide, this.state.timeIntervalMobile);
  };

  setLeftTime = (timeIntervalLeft) => this.setState({ timeIntervalLeft });

  changeLeftSlide = () => {
    const { content, direction } = this.props;
    const divider = direction === "vertical" ? content.length : 4;

    if (this.state.timerIndexLeft / divider === 1) {
      this.setLeftTime(defaultChangeInterval);
      this.setState({
        timerLeft: "0",
        timerIndexLeft: 1,
      });
    } else {
      this.setLeftTime(content[0].timeInterval || defaultInterval);
      let timerSingle = 100 * this.state.timerIndexLeft;
      this.setState({
        timerLeft: "-" + timerSingle + "%",
        timerIndexLeft: this.state.timerIndexLeft + 1,
      });
    }

    setTimeout(this.changeLeftSlide, this.state.timeIntervalLeft);
  };

  setRightTime = (timeIntervalRight) => this.setState({ timeIntervalRight });

  changeRightSlide = () => {
    const { content, direction } = this.props;
    const divider = direction === "verticalReverse" ? content.length : 4;
    if (this.state.timerIndexRight / divider === 0) {
      this.setRightTime(defaultChangeInterval);
      this.setState({
        timerRight: "-" + (divider - 1) * 100 + "%",
        timerIndexRight: divider - 1,
      });
    } else {
      this.setRightTime(content[0].timeInterval || defaultInterval);
      let timerSingleRight = this.state.timerIndexRight - 1;
      this.setState({
        timerRight: "-" + 100 * timerSingleRight + "%",
        timerIndexRight: timerSingleRight,
      });
    }

    setTimeout(this.changeRightSlide, this.state.timeIntervalRight);
  };

  renderImage = (content, device, dimension) => {
    const { direction } = this.props;
    return content.map((item, index) => {
      const { filterImage, filterLink, textColor, buttonText, sectionDescription, btnBackgroundColorRgb } = item;
      if (filterLink && filterImage) {
        let buttonAriaLable;
        if(!buttonText){
          buttonAriaLable = `${sectionDescription} Shop Now`
          if(filterLink == "/varietypack") {
            buttonAriaLable = "Varietypack"
          }
          
        } 
        return (
          <li key={`${index}-${direction}`}>
            <NavLink
              className="block-link"
              to={filterLink}
              aria-label={`${buttonText ? sectionDescription+" "+buttonText : buttonAriaLable}`}
              onClick={() => {
                const eventName = `${buttonText} from Carousel`;
                trackEvent(
                  eventName,
                  EventNames.Event.EVENT_BUTTON_PRESS,
                  window.location.origin,
                  window.location.pathname
                );
                ClickedBanner(buttonText, PAGENAME.HOME, direction, sectionDescription);
              }}
            >
              <img
                className="hero-background"
                src={filterImage}
                alt={`${buttonText ? sectionDescription+" "+buttonText : buttonAriaLable}`}
                role="presentation"
                width={dimension.width}
                height={dimension.height}
              />
              {buttonText && (
                <span
                  style={{ color: textColor, borderColor: textColor, backgroundColor: btnBackgroundColorRgb }}
                  className="brand-name"
                >
                  {buttonText}
                </span>
              )}
            </NavLink>
          </li>
        );
      }
    });
  };

  render() {
    const { content, carouselCustomClass, direction } = this.props;

    if (direction === "verticalReverse") {
      return (
        <div className={`carousel-single-wrapper ${carouselCustomClass}`}>
          <ul
            className={`carousel-single slide-${this.state.timerIndexRight} ${
              this.state.timerIndexRight === content.length - 1
                ? "last-slide"
                : ""
            }`}
            style={{
              transform: `translate3d(0px, ${this.state.timerRight}, 0px)`,
            }}
          >
            {this.renderImage(content, "desktop", desktopWH)}
          </ul>
        </div>
      );
    }

    if (direction === "vertical") {
      return (
        <div className={`carousel-single-wrapper ${carouselCustomClass}`}>
          <ul
            className={`carousel-single slide-${this.state.timerIndexLeft}`}
            style={{
              transform: `translate3d(0px, ${this.state.timerLeft}, 0px)`,
            }}
          >
            {this.renderImage(content, "desktop", desktopWH)}
          </ul>
        </div>
      );
    }

    return (
      <div className={`carousel-single-wrapper ${carouselCustomClass}`}>
        <ul
          className={`carousel-single slide-${this.state.timerIndexMobile}`}
          style={{
            transform: `translate3d(${this.state.timerMobile}, 0px, 0px)`,
          }}
        >
          {this.renderImage(content, "mobile", mobileWH)}
        </ul>
      </div>
    );
  }
}
